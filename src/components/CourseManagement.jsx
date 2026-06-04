import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Plus, Search, Edit2, Trash2, BookOpen, Star, Sparkles, X } from 'lucide-react';

const GRADIENT_PRESETS = [
  { name: 'Indigo Dream', value: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' },
  { name: 'Ocean Breeze', value: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' },
  { name: 'Emerald Glow', value: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
  { name: 'Sunset Fusion', value: 'linear-gradient(135deg, #f59e0b 0%, #e11d48 100%)' }
];

export default function CourseManagement() {
  const { courses, addCourse, updateCourse, deleteCourse } = useAcademy();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Development');
  const [formLevel, setFormLevel] = useState('Beginner');
  const [formPrice, setFormPrice] = useState(99);
  const [formStatus, setFormStatus] = useState('Draft');
  const [formGradient, setFormGradient] = useState(GRADIENT_PRESETS[0].value);
  const [formLessons, setFormLessons] = useState([]);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('20m');

  // Open modal for Adding Course
  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setFormTitle('');
    setFormCategory('Development');
    setFormLevel('Beginner');
    setFormPrice(99);
    setFormStatus('Draft');
    setFormGradient(GRADIENT_PRESETS[0].value);
    setFormLessons([
      { id: 'l1', title: 'Bài học 1: Giới thiệu & Tổng quan', duration: '15m', completed: false }
    ]);
    setIsModalOpen(true);
  };

  // Open modal for Editing Course
  const handleOpenEditModal = (course) => {
    setEditingCourse(course);
    setFormTitle(course.title);
    setFormCategory(course.category);
    setFormLevel(course.level);
    setFormPrice(course.price);
    setFormStatus(course.status);
    setFormGradient(course.gradient || GRADIENT_PRESETS[0].value);
    setFormLessons(course.lessons || []);
    setIsModalOpen(true);
  };

  // Add lesson to course form
  const handleAddLessonToForm = (e) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;
    const newLesson = {
      id: 'l_' + Date.now(),
      title: newLessonTitle.trim(),
      duration: newLessonDuration,
      completed: false
    };
    setFormLessons(prev => [...prev, newLesson]);
    setNewLessonTitle('');
  };

  // Remove lesson from course form
  const handleRemoveLessonFromForm = (lessonId) => {
    setFormLessons(prev => prev.filter(l => l.id !== lessonId));
  };

  // Save Form
  const handleSaveCourse = () => {
    if (!formTitle.trim()) {
      alert('Vui lòng nhập tên khóa học');
      return;
    }

    const courseData = {
      title: formTitle,
      category: formCategory,
      level: formLevel,
      price: Number(formPrice),
      status: formStatus,
      gradient: formGradient,
      lessons: formLessons
    };

    if (editingCourse) {
      updateCourse({
        ...editingCourse,
        ...courseData
      });
    } else {
      addCourse(courseData);
    }
    setIsModalOpen(false);
  };

  // Delete course with confirmation
  const handleDeleteCourse = (id, title) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa khóa học "${title}"?`)) {
      deleteCourse(id);
    }
  };

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="course-management-view">
      <div className="page-title-section">
        <h1 className="page-title">Quản Lý Khóa Học</h1>
        <p className="page-subtitle">Thêm mới, cập nhật nội dung bài học, thiết lập đơn giá và theo dõi sĩ số khóa học.</p>
      </div>

      {/* Filter and Add bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <div className="header-search" style={{ width: '250px' }}>
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Tìm kiếm khóa học..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '0.5rem 1rem 0.5rem 2.2rem' }}
            />
          </div>

          <select 
            className="input-styled"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">Tất cả danh mục</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Business">Business</option>
            <option value="Marketing">Marketing</option>
          </select>

          <select 
            className="input-styled"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="All">Tất cả cấp độ</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          <Plus size={18} />
          <span>Tạo Khóa Học Mới</span>
        </button>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div className="course-card" key={course.id}>
              {/* Cover Banner */}
              <div className="course-card-banner" style={{ background: course.gradient }}>
                <span className="course-category-badge">{course.category}</span>
                {course.rating > 0 && (
                  <span className="course-rating-badge">
                    <Star size={12} fill="#fbbf24" stroke="none" />
                    {course.rating}
                  </span>
                )}
                <h3 className="course-card-title">{course.title}</h3>
              </div>

              {/* Course Info */}
              <div className="course-card-content">
                <div className="course-metadata">
                  <span className="badge badge-level">{course.level}</span>
                  <span className={`badge ${course.status === 'Published' ? 'badge-published' : 'badge-draft'}`}>
                    {course.status === 'Published' ? 'Đã Xuất Bản' : 'Bản Nháp'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span>Sĩ số: <strong>{course.enrolledCount}</strong></span>
                  <span>Bài học: <strong>{course.lessons?.length || 0} bài</strong></span>
                </div>

                {/* Lesson Preview */}
                <div className="course-lessons-list">
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Mục lục bài học:</span>
                  {course.lessons && course.lessons.slice(0, 3).map((lesson, idx) => (
                    <div className="course-lesson-item" key={lesson.id || idx}>
                      <BookOpen size={12} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {lesson.title}
                      </span>
                    </div>
                  ))}
                  {course.lessons && course.lessons.length > 3 && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontStyle: 'italic' }}>
                      và {course.lessons.length - 3} bài khác...
                    </span>
                  )}
                </div>
              </div>

              {/* Price and Action Footer */}
              <div className="course-card-footer">
                <div className="course-price">
                  {course.price === 0 ? 'Miễn Phí' : `$${course.price}`}
                </div>
                <div className="course-actions">
                  <button 
                    className="btn-icon" 
                    title="Chỉnh sửa khóa học"
                    onClick={() => handleOpenEditModal(course)}
                    style={{ color: 'var(--primary)' }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    className="btn-icon" 
                    title="Xóa khóa học"
                    onClick={() => handleDeleteCourse(course.id, course.title)}
                    style={{ color: 'var(--danger)' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <BookOpen size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>Không tìm thấy khóa học nào phù hợp</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Hãy thử thay đổi từ khóa hoặc bộ lọc của bạn.</p>
        </div>
      )}

      {/* Add / Edit Course Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} style={{ color: 'var(--primary)' }} />
                {editingCourse ? 'Chỉnh Sửa Khóa Học' : 'Tạo Khóa Học Mới'}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Tên Khóa Học *</label>
                <input 
                  type="text" 
                  className="input-styled" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ví dụ: Lập trình Javascript căn bản..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Danh mục</label>
                  <select 
                    className="input-styled"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Cấp độ</label>
                  <select 
                    className="input-styled"
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Học phí ($ USD)</label>
                  <input 
                    type="number" 
                    className="input-styled" 
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Trạng thái hiển thị</label>
                  <select 
                    className="input-styled"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                  >
                    <option value="Published">Đã xuất bản (Published)</option>
                    <option value="Draft">Bản nháp (Draft)</option>
                  </select>
                </div>
              </div>

              {/* Theme Gradient Selection */}
              <div className="form-group">
                <label>Giao diện bìa (Gradient Preset)</label>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                  {GRADIENT_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      style={{
                        height: '40px',
                        flexGrow: 1,
                        background: preset.value,
                        borderRadius: 'var(--radius-sm)',
                        border: formGradient === preset.value ? '2px solid white' : '1px solid var(--border-color)',
                        boxShadow: formGradient === preset.value ? '0 0 10px var(--primary)' : 'none',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                      }}
                      onClick={() => setFormGradient(preset.value)}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lessons Editor */}
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Mục Lục Bài Học ({formLessons.length})</h4>
                
                {/* Add Lesson inline form */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input 
                    type="text" 
                    className="input-styled" 
                    style={{ flexGrow: 1 }}
                    placeholder="Tên bài học mới..."
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="input-styled" 
                    style={{ width: '80px' }}
                    placeholder="Đ.lượng (15m)"
                    value={newLessonDuration}
                    onChange={(e) => setNewLessonDuration(e.target.value)}
                  />
                  <button className="btn btn-secondary" onClick={handleAddLessonToForm}>
                    Thêm
                  </button>
                </div>

                {/* Lesson List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
                  {formLessons.map((lesson, idx) => (
                    <div 
                      key={lesson.id || idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'var(--bg-input)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{idx + 1}.</span>
                        <span>{lesson.title}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({lesson.duration})</span>
                      </div>
                      <button 
                        style={{ color: 'var(--danger)' }}
                        onClick={() => handleRemoveLessonFromForm(lesson.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                Hủy Bỏ
              </button>
              <button className="btn btn-primary" onClick={handleSaveCourse}>
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
