import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Sun, Moon, Bell, Search, Shield, User } from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme, role, setRole, submissions } = useAcademy();

  const pendingSubmissionsCount = submissions.filter(s => s.status === 'Pending').length;

  return (
    <header className="header">
      <div className="header-search">
        <Search size={18} />
        <input type="text" placeholder="Tìm kiếm tài liệu, khóa học, học viên..." />
      </div>

      <div className="header-actions">
        {/* Role Switcher */}
        <div className="role-switcher">
          <button 
            className={`role-btn ${role === 'instructor' ? 'active' : ''}`}
            onClick={() => setRole('instructor')}
            title="Switch to Instructor Dashboard"
          >
            <Shield size={14} />
            <span>Giảng Viên</span>
          </button>
          <button 
            className={`role-btn ${role === 'student' ? 'active' : ''}`}
            onClick={() => setRole('student')}
            title="Switch to Student Portal"
          >
            <User size={14} />
            <span>Học Viên</span>
          </button>
        </div>

        {/* Theme Toggle */}
        <button className="btn-toggle" onClick={toggleTheme} title="Toggle Light/Dark Theme">
          {theme === 'dark' ? <Sun size={20} style={{ color: '#fbbf24' }} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="notification-badge-container">
          <button className="btn-toggle" title="Notifications">
            <Bell size={20} />
            {pendingSubmissionsCount > 0 && <span className="badge-dot" />}
          </button>
        </div>
      </div>
    </header>
  );
}
