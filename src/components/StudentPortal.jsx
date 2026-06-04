import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { BookOpen, CheckCircle, PlayCircle, Send, MessageSquare, Sparkles, Clipboard, ArrowRight, Info } from 'lucide-react';

export default function StudentPortal() {
  const { 
    courses, 
    messages, 
    sendMessage, 
    submitAssignment,
    submissions,
    students,
    studentActiveCourseId,
    setStudentActiveCourseId,
    studentActiveLessonId,
    setStudentActiveLessonId
  } = useAcademy();

  // Mock Active Student is "Nguyễn Văn Anh" (s1)
  const currentStudentId = "s1";
  const currentStudent = students.find(s => s.id === currentStudentId) || students[0];

  // States
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionContent, setSubmissionContent] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Active course
  const activeCourse = courses.find(c => c.id === studentActiveCourseId) || courses[0];
  
  // Enrolled courses of the student
  const enrolledCourses = courses.filter(c => currentStudent.enrolledCourses.includes(c.id));

  // Active Lesson
  const activeLesson = activeCourse?.lessons?.find(l => l.id === studentActiveLessonId) || activeCourse?.lessons?.[0];

  // Complete lesson handler (bumps student progress)
  const handleCompleteLesson = () => {
    if (!activeCourse || !activeLesson) return;
    
    // Toggle lesson completed state inside activeCourse
    const updatedLessons = activeCourse.lessons.map(l => {
      if (l.id === activeLesson.id) {
        return { ...l, completed: true };
      }
      return l;
    });

    // Update activeCourse lessons in global state
    activeCourse.lessons = updatedLessons;

    // Recalculate student progress
    const totalLessons = activeCourse.lessons.length;
    const completedLessons = activeCourse.lessons.filter(l => l.completed).length;
    const progressPercent = Math.round((completedLessons / totalLessons) * 100);

    // Update students progress
    currentStudent.progress = progressPercent;

    // Simple hack to trigger state update in Context by updating activeCourse
    setStudentActiveLessonId(activeLesson.id); // forces state reload
  };

  // Submit Assignment Handler
  const handleSubmission = (e) => {
    e.preventDefault();
    if (!submissionTitle.trim() || !submissionContent.trim()) {
      alert('Vui lòng điền đầy đủ thông tin bài nộp');
      return;
    }

    submitAssignment(
      currentStudentId,
      currentStudent.name,
      activeCourse.id,
      activeCourse.title,
      submissionTitle.trim(),
      submissionContent.trim()
    );

    setSubmissionTitle('');
    setSubmissionContent('');
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  // Send Student Message
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    sendMessage(currentStudentId, 'student', chatInput.trim());
    setChatInput('');
  };

  const studentMessages = messages.filter(m => m.studentId === currentStudentId);

  return (
    <div className="student-portal-wrapper">
      <div className="student-portal-tag">
        <Sparkles size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
        SIMULATOR MODE: HỌC VIÊN
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--primary-glow)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '0.9rem' }}>
        <Info size={20} style={{ flexShrink: 0 }} />
        <div>
          Bạn đang đóng vai là Học viên <strong>{currentStudent?.name}</strong>. Tại đây, bạn có thể học thử các bài học, nộp bài tập mới và nhắn tin với giảng viên. Trạng thái và bài nộp sẽ lập tức xuất hiện ở màn hình <strong>Giảng Viên</strong> (sử dụng thanh đổi vai trò ở tiêu đề).
        </div>
      </div>

      <div className="student-portal-grid">
        {/* Main Learning Classroom */}
        <div className="classroom-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.35rem' }}>
              <BookOpen size={20} style={{ color: 'var(--primary)' }} />
              {activeCourse?.title}
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Tiến độ của bạn: <strong>{currentStudent?.progress}%</strong>
            </span>
          </div>

          {/* Lesson Video Simulator */}
          {activeLesson ? (
            <div>
              <div className="lesson-player-box">
                <PlayCircle size={48} style={{ opacity: 0.8, cursor: 'pointer', color: 'var(--primary)' }} />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{activeLesson.title}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Thời lượng: {activeLesson.duration}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Trạng thái bài này: {activeLesson.completed ? (
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>✓ Đã hoàn thành</span>
                  ) : (
                    <span>Chưa hoàn thành</span>
                  )}
                </div>
                {!activeLesson.completed && (
                  <button className="btn btn-primary" onClick={handleCompleteLesson}>
                    <CheckCircle size={16} />
                    <span>Đánh dấu hoàn thành bài này</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              Chọn một bài học ở danh sách bên dưới để bắt đầu học.
            </div>
          )}

          {/* Lesson Navigation List */}
          <div className="lesson-navigation">
            <h4 style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>Nội dung chương trình học:</h4>
            {activeCourse?.lessons?.map((lesson, idx) => (
              <button 
                key={lesson.id} 
                className={`lesson-nav-item ${studentActiveLessonId === lesson.id ? 'active' : ''}`}
                onClick={() => setStudentActiveLessonId(lesson.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Bài {idx + 1}.</span>
                  <span>{lesson.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lesson.duration}</span>
                  {lesson.completed ? (
                    <CheckCircle size={14} style={{ color: 'var(--success)' }} />
                  ) : (
                    <PlayCircle size={14} style={{ color: 'var(--text-muted)' }} />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Assignment Submission Section */}
          <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '2.5rem', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Clipboard size={18} style={{ color: 'var(--accent)' }} />
              Nộp Bài Tập Khóa Học
            </h3>

            {submitSuccess && (
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} />
                <span>Nộp bài tập thành công! Chuyển sang vai <strong>Giảng viên &gt; Tương tác học viên</strong> để chấm bài này ngay.</span>
              </div>
            )}

            <form onSubmit={handleSubmission}>
              <div className="form-group">
                <label>Tên bài tập / Đề tài</label>
                <input 
                  type="text" 
                  className="input-styled" 
                  placeholder="Ví dụ: Thiết kế Dashboard Quản lý Tài chính cá nhân"
                  value={submissionTitle}
                  onChange={(e) => setSubmissionTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Nội dung bài làm / Link sản phẩm (Github, Figma, PDF...)</label>
                <textarea 
                  className="textarea-styled" 
                  placeholder="Điền nội dung báo cáo hoặc các đường link demo sản phẩm của bạn ở đây..."
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                <span>Nộp bài ngay</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar: Course switcher & Chat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Courses Switcher */}
          <div className="app-card">
            <div className="app-card-header">
              <h4 className="app-card-title">Khóa học đăng ký</h4>
            </div>
            <div className="app-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {enrolledCourses.map(course => (
                <button
                  key={course.id}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: studentActiveCourseId === course.id ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                    background: studentActiveCourseId === course.id ? 'var(--primary-glow)' : 'var(--bg-input)',
                    color: studentActiveCourseId === course.id ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: 600,
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    transition: 'all var(--transition-fast)'
                  }}
                  onClick={() => {
                    setStudentActiveCourseId(course.id);
                    setStudentActiveLessonId(course.lessons?.[0]?.id || '');
                  }}
                >
                  {course.title}
                </button>
              ))}
            </div>
          </div>

          {/* Student mini-chat window */}
          <div className="app-card" style={{ height: '420px', display: 'flex', flexDirection: 'column' }}>
            <div className="app-card-header">
              <h4 className="app-card-title" style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={16} />
                Trao đổi với giảng viên
              </h4>
            </div>
            <div className="chat-messages-container" style={{ flexGrow: 1, padding: '1rem', fontSize: '0.85rem' }}>
              {studentMessages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`message-bubble ${msg.sender === 'student' ? 'instructor' : 'student'}`}
                  style={{ 
                    // reverse the bubbles visual alignment since the student is looking from their perspective
                    alignSelf: msg.sender === 'student' ? 'flex-end' : 'flex-start',
                    background: msg.sender === 'student' ? 'linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%)' : 'var(--bg-input)'
                  }}
                >
                  <div>{msg.text}</div>
                  <div className="message-time">{msg.timestamp}</div>
                </div>
              ))}
            </div>
            <form 
              onSubmit={handleSendChat} 
              style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', borderTop: '1px solid var(--border-color)' }}
            >
              <input 
                type="text" 
                className="input-styled" 
                style={{ flexGrow: 1, padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                placeholder="Hỏi giảng viên..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem' }}>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
