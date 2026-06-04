import React, { useState, useEffect, useRef } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { MessageSquare, Send, CheckCircle, FileText, SendHorizontal, AlertCircle } from 'lucide-react';

export default function StudentHub() {
  const { 
    students, 
    courses, 
    messages, 
    sendMessage, 
    submissions, 
    gradeSubmission,
    selectedStudentId,
    setSelectedStudentId
  } = useAcademy();

  // Chat Input State
  const [chatInput, setChatInput] = useState('');
  
  // Grading form states
  const [gradingSubId, setGradingSubId] = useState(null);
  const [gradeInput, setGradeInput] = useState('A');
  const [feedbackInput, setFeedbackInput] = useState('');

  // Scroll ref for chat messages
  const chatEndRef = useRef(null);

  // Selected Student
  const selectedStudent = students.find(s => s.id === selectedStudentId);

  // Filter messages for current student
  const currentMessages = messages.filter(m => m.studentId === selectedStudentId);

  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedStudentId) return;

    sendMessage(selectedStudentId, 'instructor', chatInput.trim());
    setChatInput('');
  };

  // Scroll chat to bottom when messages update
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedStudentId]);

  // Handle grade submission
  const handleGradeSubmit = (submissionId) => {
    if (!gradeInput) {
      alert('Vui lòng chọn điểm số');
      return;
    }
    gradeSubmission(submissionId, gradeInput, feedbackInput);
    setGradingSubId(null);
    setFeedbackInput('');
    setGradeInput('A');
  };

  return (
    <div className="student-hub-view">
      <div className="page-title-section">
        <h1 className="page-title">Tương Tác Học Viên</h1>
        <p className="page-subtitle">Theo dõi tiến trình học tập, chấm điểm bài tập thực hành và hỗ trợ giải đáp trực tiếp.</p>
      </div>

      <div className="student-hub-grid">
        {/* Left Side: Directory & Submissions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Student Table */}
          <div className="app-card">
            <div className="app-card-header">
              <h3 className="app-card-title">Danh Sách Học Viên ({students.length})</h3>
            </div>
            <div className="app-card-body" style={{ padding: 0 }}>
              <div className="student-list-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Học viên</th>
                      <th>Khóa học tham gia</th>
                      <th>Tiến độ</th>
                      <th>Điểm</th>
                      <th>Tương tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => {
                      // Get names of courses student is enrolled in
                      const enrolledCourseNames = student.enrolledCourses.map(cid => {
                        const course = courses.find(c => c.id === cid);
                        return course ? course.title.substring(0, 15) + '...' : cid;
                      });

                      return (
                        <tr 
                          key={student.id} 
                          style={{ 
                            backgroundColor: selectedStudentId === student.id ? 'var(--primary-glow)' : 'transparent' 
                          }}
                        >
                          <td>
                            <div className="student-row-info">
                              <div 
                                className="avatar-circle" 
                                style={{ backgroundColor: student.avatarColor || '#a855f7' }}
                              >
                                {student.name.split(' ').pop().substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div style={{ fontWeight: 600 }}>{student.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              {enrolledCourseNames.map((name, i) => (
                                <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>• {name}</span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className="progress-bar-container">
                              <div className="progress-track">
                                <div className="progress-fill" style={{ width: `${student.progress}%` }}></div>
                              </div>
                              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{student.progress}%</span>
                            </div>
                          </td>
                          <td>
                            <span 
                              className="badge" 
                              style={{ 
                                backgroundColor: student.grade === 'A+' || student.grade === 'A' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                                color: student.grade === 'A+' || student.grade === 'A' ? 'var(--success)' : 'var(--primary)'
                              }}
                            >
                              {student.grade || 'Chưa có'}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="btn btn-secondary" 
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                              onClick={() => setSelectedStudentId(student.id)}
                            >
                              <MessageSquare size={12} />
                              <span>Nhắn tin</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Submissions Reviewer */}
          <div className="app-card submission-review-card">
            <div className="app-card-header">
              <h3 className="app-card-title">
                <FileText size={18} style={{ color: 'var(--secondary)' }} />
                Bài Tập Học Viên Đã Nộp
              </h3>
            </div>
            <div className="app-card-body">
              <div className="submissions-list">
                {submissions.length > 0 ? (
                  submissions.map(sub => (
                    <div className="submission-item" key={sub.id}>
                      <div className="submission-header">
                        <div>
                          <span className="submission-title">{sub.assignmentTitle}</span>
                          <div className="submission-meta">
                            Người nộp: <strong>{sub.studentName}</strong> • Lớp: {sub.courseTitle}
                          </div>
                        </div>
                        <span className={`badge ${sub.status === 'Graded' ? 'badge-published' : 'badge-draft'}`}>
                          {sub.status === 'Graded' ? `Đã chấm (${sub.grade})` : 'Chờ chấm'}
                        </span>
                      </div>

                      <div className="submission-content-text">
                        {sub.content}
                      </div>

                      {/* Grading form or Feedback Display */}
                      {sub.status === 'Pending' ? (
                        <div>
                          {gradingSubId === sub.id ? (
                            <div className="grading-form" style={{ marginTop: '0.75rem', gap: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div className="grading-input-group">
                                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Điểm số:</label>
                                  <select 
                                    className="input-styled" 
                                    style={{ padding: '0.3rem 0.75rem' }}
                                    value={gradeInput}
                                    onChange={(e) => setGradeInput(e.target.value)}
                                  >
                                    <option value="A+">A+</option>
                                    <option value="A">A</option>
                                    <option value="B+">B+</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="F">F (Không đạt)</option>
                                  </select>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>* Điểm số sẽ tự động cập nhật tiến độ học viên.</span>
                              </div>

                              <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                                <input 
                                  type="text" 
                                  className="input-styled" 
                                  style={{ flexGrow: 1, padding: '0.4rem 0.8rem' }}
                                  placeholder="Lời nhận xét của giảng viên..." 
                                  value={feedbackInput}
                                  onChange={(e) => setFeedbackInput(e.target.value)}
                                />
                                <button className="btn btn-primary" onClick={() => handleGradeSubmit(sub.id)}>
                                  Xác nhận
                                </button>
                                <button className="btn btn-secondary" onClick={() => setGradingSubId(null)}>
                                  Hủy
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button 
                              className="btn btn-primary" 
                              style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                              onClick={() => {
                                setGradingSubId(sub.id);
                                setGradeInput('A');
                                setFeedbackInput('');
                              }}
                            >
                              Chấm điểm & Nhận xét
                            </button>
                          )}
                        </div>
                      ) : (
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '4px', borderLeft: '3px solid var(--success)', fontSize: '0.85rem' }}>
                          <div><strong>Nhận xét từ giảng viên:</strong> {sub.feedback || 'Không có nhận xét.'}</div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    Chưa có bài tập nào được nộp.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Simulated Chat */}
        <div className="chat-simulator-container">
          <div className="app-card chat-simulator-card">
            {selectedStudent ? (
              <>
                {/* Chat Header */}
                <div className="chat-header">
                  <div className="chat-recipient-info">
                    <div 
                      className="avatar-circle" 
                      style={{ 
                        backgroundColor: selectedStudent.avatarColor || '#6366f1', 
                        width: '40px', 
                        height: '40px' 
                      }}
                    >
                      {selectedStudent.name.split(' ').pop().substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700 }}>{selectedStudent.name}</h4>
                      <span className="chat-status">
                        <span className="chat-status-dot"></span>
                        Đang trực tuyến (Mock)
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Hoạt động cuối: {selectedStudent.lastActive}
                  </span>
                </div>

                {/* Chat Messages */}
                <div className="chat-messages-container">
                  {currentMessages.length > 0 ? (
                    currentMessages.map(msg => (
                      <div 
                        key={msg.id} 
                        className={`message-bubble ${msg.sender === 'instructor' ? 'instructor' : 'student'}`}
                      >
                        <div>{msg.text}</div>
                        <div className="message-time">{msg.timestamp}</div>
                      </div>
                    ))
                  ) : (
                    <div className="chat-empty-state">
                      <MessageSquare size={36} />
                      <p>Chưa có lịch sử hội thoại. Hãy gửi tin nhắn đầu tiên để kết nối bài học!</p>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <form className="chat-input-area" onSubmit={handleSendMessage}>
                  <input 
                    type="text" 
                    placeholder={`Gửi phản hồi cho ${selectedStudent.name}...`}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1rem' }}>
                    <Send size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div className="chat-empty-state" style={{ flexGrow: 1 }}>
                <MessageSquare size={64} style={{ color: 'var(--border-color)', marginBottom: '1rem' }} />
                <h3>Hộp Thư Tương Tác</h3>
                <p style={{ maxWidth: '300px', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                  Vui lòng chọn học viên từ danh sách bên cạnh để bắt đầu nhắn tin và giải đáp thắc mắc.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--primary-glow)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.85rem', color: 'var(--primary)', marginTop: '1.5rem', maxWidth: '320px' }}>
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span><strong>Gợi ý:</strong> Chat thử và đợi 1.5 giây, học viên sẽ tự động phản hồi thông minh!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
