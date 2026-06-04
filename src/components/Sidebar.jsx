import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  GraduationCap, 
  MessageSquare, 
  BookOpenCheck,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  const { activeTab, setActiveTab, role, logout } = useAcademy();

  const instructorMenuItems = [
    { id: 'dashboard', label: 'Tổng Quan', icon: LayoutDashboard },
    { id: 'courses', label: 'Khóa Học', icon: BookOpen },
    { id: 'students', label: 'Tương Tác Học Viên', icon: Users },
  ];

  const studentMenuItems = [
    { id: 'classroom', label: 'Lớp Học Của Tôi', icon: GraduationCap },
    { id: 'chat', label: 'Hỏi Đáp Giảng Viên', icon: MessageSquare },
  ];

  const menuItems = role === 'instructor' ? instructorMenuItems : studentMenuItems;

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">
          <GraduationCap size={24} />
        </div>
        <span className="logo-text">Academy</span>
      </div>

      <nav style={{ flexGrow: 1 }}>
        <ul className="sidebar-menu">
          {role === 'instructor' ? (
            instructorMenuItems.map(item => {
              const Icon = item.icon;
              return (
                <li key={item.id} className={`menu-item ${activeTab === item.id ? 'active' : ''}`}>
                  <button onClick={() => setActiveTab(item.id)}>
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })
          ) : (
            <li className="menu-item active">
              <button>
                <GraduationCap size={20} />
                <span>Student Hub</span>
              </button>
            </li>
          )}
        </ul>
      </nav>

      <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div className="user-profile-preview">
            <div className="avatar-circle" style={{ backgroundColor: role === 'instructor' ? '#6366f1' : '#10b981', fontWeight: 600 }}>
              {role === 'instructor' ? 'AM' : 'HV'}
            </div>
            <div className="user-info">
              <span className="user-name">
                {role === 'instructor' ? 'Alex Morgan' : 'Học Viên Demo'}
              </span>
              <span className="user-role">
                {role === 'instructor' ? 'Giám đốc Học viện' : 'Student (Mock)'}
              </span>
            </div>
          </div>
          <button 
            className="btn-toggle" 
            title="Đăng xuất tài khoản" 
            onClick={logout} 
            style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
