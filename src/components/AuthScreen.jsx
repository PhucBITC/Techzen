import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { GraduationCap, ArrowLeft, Mail, Lock, User, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthScreen({ onLoginSuccess, onBackToLanding }) {
  const { setRole, students, setStudents } = useAcademy();

  // Screen modes: 'login' | 'register' | 'forgot'
  const [authMode, setAuthMode] = useState('login');

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState('instructor');

  // Feedback states
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Pre-fill quick demo accounts for recruiters
  const handleQuickLogin = (roleType) => {
    setErrorMsg('');
    setSuccessMsg('');
    if (roleType === 'instructor') {
      setEmail('instructor@academy.com');
      setPassword('••••••••');
      setRole('instructor');
      onLoginSuccess('instructor');
    } else {
      setEmail('student@academy.com');
      setPassword('••••••••');
      setRole('student');
      onLoginSuccess('student');
    }
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (authMode === 'login') {
      // Validate inputs
      if (!email.trim() || !password) {
        setErrorMsg('Vui lòng nhập đầy đủ Email và Mật khẩu.');
        return;
      }

      // Check predefined email mappings for demo role switching
      if (email.toLowerCase() === 'instructor@academy.com') {
        setRole('instructor');
        onLoginSuccess('instructor');
      } else if (email.toLowerCase() === 'student@academy.com') {
        setRole('student');
        onLoginSuccess('student');
      } else {
        // Fallback default: log in as instructor or student based on role state
        onLoginSuccess('instructor');
      }

    } else if (authMode === 'register') {
      if (!name.trim() || !email.trim() || !password) {
        setErrorMsg('Vui lòng điền đầy đủ tất cả các trường.');
        return;
      }

      // If registered as student, add them to mock database
      if (selectedRole === 'student') {
        const newStud = {
          id: 's_' + Date.now(),
          name: name.trim(),
          email: email.trim(),
          avatarColor: '#' + Math.floor(Math.random()*16777215).toString(16), // random color
          enrolledCourses: ['c1'], // auto-enroll in course 1
          progress: 0,
          grade: 'Chưa có',
          lastActive: 'Vừa mới đăng ký'
        };
        setStudents(prev => [...prev, newStud]);
      }

      setRole(selectedRole);
      setSuccessMsg('Đăng ký thành công! Đang chuyển hướng vào hệ thống...');
      setTimeout(() => {
        onLoginSuccess(selectedRole);
      }, 1200);

    } else if (authMode === 'forgot') {
      if (!email.trim()) {
        setErrorMsg('Vui lòng nhập địa chỉ Email của bạn.');
        return;
      }
      setSuccessMsg('Mã liên kết đặt lại mật khẩu đã được gửi đến Email của bạn.');
      setEmail('');
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-blob auth-blob-1"></div>
      <div className="auth-blob auth-blob-2"></div>

      <div className="auth-card">
        {/* Logo and Brand */}
        <div className="auth-header">
          <div className="auth-logo-box">
            <GraduationCap size={28} />
          </div>
          <h2 className="auth-title">Academy System</h2>
          <p className="auth-subtitle">
            {authMode === 'login' && 'Đăng nhập để bắt đầu phiên học tập'}
            {authMode === 'register' && 'Đăng ký tài khoản để học tập và giảng dạy'}
            {authMode === 'forgot' && 'Khôi phục mật khẩu tài khoản của bạn'}
          </p>
        </div>

        {/* Tab switchers (only visible for login / register modes) */}
        {authMode !== 'forgot' && (
          <div className="auth-tabs">
            <button 
              className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
              onClick={() => { setAuthMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              Đăng Nhập
            </button>
            <button 
              className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
              onClick={() => { setAuthMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              Đăng Ký
            </button>
          </div>
        )}

        {/* Error / Success feedback panels */}
        {errorMsg && (
          <div className="auth-alert-error" style={{ marginBottom: '1.25rem' }}>
            <ShieldAlert size={16} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div style={{ 
            backgroundColor: 'rgba(16, 185, 129, 0.15)', 
            border: '1px solid rgba(16, 185, 129, 0.2)', 
            color: 'var(--success)', 
            padding: '0.75rem 1rem', 
            borderRadius: 'var(--radius-md)', 
            fontSize: '0.85rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Main Forms */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {authMode === 'register' && (
            <div className="form-group">
              <label>Họ và Tên *</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="input-styled" 
                  style={{ width: '100%', paddingLeft: '2.5rem' }} 
                  placeholder="Nguyễn Văn A..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Địa chỉ Email *</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                className="input-styled" 
                style={{ width: '100%', paddingLeft: '2.5rem' }} 
                placeholder="example@academy.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {authMode !== 'forgot' && (
            <div className="form-group">
              <label>Mật khẩu *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="input-styled" 
                  style={{ width: '100%', paddingLeft: '2.5rem' }} 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          {authMode === 'register' && (
            <div className="form-group">
              <label>Vai trò tham gia</label>
              <select 
                className="input-styled"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="instructor">Giảng Viên (Instructor Dashboard)</option>
                <option value="student">Học Viên (Student Portal)</option>
              </select>
            </div>
          )}

          {authMode === 'login' && (
            <div className="auth-options">
              <span className="auth-link" onClick={() => setAuthMode('forgot')}>
                Quên mật khẩu?
              </span>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem', width: '100%' }}>
            {authMode === 'login' && 'Đăng Nhập'}
            {authMode === 'register' && 'Tạo Tài Khoản'}
            {authMode === 'forgot' && 'Gửi Yêu Cầu Khôi Phục'}
          </button>
        </form>

        {/* Quick Demo Login Options for Recruiters */}
        {authMode === 'login' && (
          <div style={{ marginTop: '1.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
              <Sparkles size={12} style={{ color: 'var(--primary)' }} />
              Dành cho Nhà Tuyển Dụng (Đăng nhập nhanh):
            </span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                type="button"
                className="btn btn-secondary" 
                style={{ flex: 1, fontSize: '0.75rem', padding: '0.5rem 0.25rem', fontWeight: 600 }}
                onClick={() => handleQuickLogin('instructor')}
              >
                Vai Giảng Viên
              </button>
              <button 
                type="button"
                className="btn btn-secondary" 
                style={{ flex: 1, fontSize: '0.75rem', padding: '0.5rem 0.25rem', fontWeight: 600 }}
                onClick={() => handleQuickLogin('student')}
              >
                Vai Học Viên
              </button>
            </div>
          </div>
        )}

        {authMode === 'forgot' && (
          <div className="auth-back-btn" onClick={() => setAuthMode('login')}>
            <ArrowLeft size={14} />
            <span>Quay lại trang Đăng Nhập</span>
          </div>
        )}

        {/* Back link to landing page */}
        <div className="auth-back-btn" onClick={onBackToLanding}>
          <ArrowLeft size={14} />
          <span>Quay lại trang Giới Thiệu (Landing)</span>
        </div>
      </div>
    </div>
  );
}
