import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  BookOpen, 
  Users, 
  FileCheck, 
  Star, 
  ArrowUpRight, 
  TrendingUp, 
  MessageSquare,
  ClipboardList
} from 'lucide-react';

export default function Dashboard() {
  const { courses, students, submissions, messages, setActiveTab } = useAcademy();

  // Metrics calculations
  const totalCourses = courses.length;
  const activeStudents = students.length;
  const pendingSubmissions = submissions.filter(s => s.status === 'Pending');
  
  const publishedCourses = courses.filter(c => c.status === 'Published');
  const avgRating = publishedCourses.length > 0 
    ? (publishedCourses.reduce((sum, c) => sum + c.rating, 0) / publishedCourses.length).toFixed(1)
    : 'N/A';

  // Dynamic activity feed building
  const recentActivities = [];
  
  // 1. Add submissions to activity
  submissions.forEach(sub => {
    recentActivities.push({
      id: sub.id,
      type: 'submission',
      time: sub.submittedAt,
      rawTime: sub.id.startsWith('sub_') ? parseInt(sub.id.split('_')[1]) : Date.now() - 3600000 * 2, // fallback
      text: `Học viên **${sub.studentName}** đã nộp bài tập "${sub.assignmentTitle}" trong khóa **${sub.courseTitle}**`,
      status: sub.status,
      icon: ClipboardList,
      color: '#06b6d4',
      bg: 'rgba(6, 182, 212, 0.1)'
    });
  });

  // 2. Add recent messages to activity (only student messages)
  messages.filter(m => m.sender === 'student').forEach(msg => {
    const student = students.find(s => s.id === msg.studentId);
    const studentName = student ? student.name : 'Học viên';
    recentActivities.push({
      id: msg.id,
      type: 'message',
      time: msg.timestamp,
      rawTime: msg.id.startsWith('m_') ? parseInt(msg.id.split('_')[1]) : Date.now() - 3600000 * 4,
      text: `Học viên **${studentName}** gửi tin nhắn: "${msg.text.substring(0, 45)}${msg.text.length > 45 ? '...' : ''}"`,
      icon: MessageSquare,
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.1)'
    });
  });

  // Sort activities: most recent first
  const sortedActivities = recentActivities
    .sort((a, b) => b.rawTime - a.rawTime)
    .slice(0, 5);

  // SVG Chart Mock Data Points (Jan - Jun Enrollments)
  const chartData = [100, 150, 120, 240, 290, 380];
  const chartLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];

  return (
    <div className="dashboard-view">
      <div className="page-title-section">
        <h1 className="page-title">Học Viện Thống Kê</h1>
        <p className="page-subtitle">Chào mừng trở lại, Alex Morgan. Đây là tình hình học viện hôm nay.</p>
      </div>

      {/* Metrics Row */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => setActiveTab('courses')} style={{ cursor: 'pointer' }}>
          <div className="stat-content">
            <span className="stat-label">Khóa Học Đang Dạy</span>
            <span className="stat-value">{totalCourses}</span>
            <span className="stat-change up">
              <TrendingUp size={14} />
              <span>+1 mới tháng này</span>
            </span>
          </div>
          <div className="stat-icon-box" style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' }}>
            <BookOpen size={24} />
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveTab('students')} style={{ cursor: 'pointer' }}>
          <div className="stat-content">
            <span className="stat-label">Học Viên Hoạt Động</span>
            <span className="stat-value">{activeStudents}</span>
            <span className="stat-change up">
              <TrendingUp size={14} />
              <span>+12% so với tuần trước</span>
            </span>
          </div>
          <div className="stat-icon-box" style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: 'var(--secondary)' }}>
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveTab('students')} style={{ cursor: 'pointer' }}>
          <div className="stat-content">
            <span className="stat-label">Bài Tập Chờ Chấm</span>
            <span className="stat-value">{pendingSubmissions.length}</span>
            <span className="stat-change down" style={{ color: pendingSubmissions.length > 0 ? 'var(--warning)' : 'var(--success)' }}>
              <span>{pendingSubmissions.length} bài cần xem xét</span>
            </span>
          </div>
          <div className="stat-icon-box" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' }}>
            <FileCheck size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Đánh Giá Trung Bình</span>
            <span className="stat-value">{avgRating} / 5.0</span>
            <span className="stat-change up">
              <TrendingUp size={14} />
              <span>Đánh giá xuất sắc</span>
            </span>
          </div>
          <div className="stat-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)' }}>
            <Star size={24} />
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="analytics-grid">
        {/* SVG Chart Card */}
        <div className="app-card">
          <div className="app-card-header">
            <h3 className="app-card-title">
              <TrendingUp size={18} style={{ color: 'var(--primary)' }} />
              Tăng Trưởng Học Viên Đăng Ký
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>6 tháng gần nhất</span>
          </div>
          <div className="app-card-body">
            <div className="chart-container">
              <svg className="chart-svg" viewBox="0 0 600 240">
                <defs>
                  <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Grid Lines */}
                <line x1="50" y1="30" x2="550" y2="30" className="chart-grid-line" />
                <line x1="50" y1="90" x2="550" y2="90" className="chart-grid-line" />
                <line x1="50" y1="150" x2="550" y2="150" className="chart-grid-line" />
                <line x1="50" y1="210" x2="550" y2="210" className="chart-grid-line" />
                
                {/* Area under the line */}
                <path 
                  d="M 50 210 L 50 170 L 150 140 L 250 160 L 350 90 L 450 60 L 550 20 L 550 210 Z" 
                  className="chart-path-area" 
                />
                
                {/* Chart Line */}
                <path 
                  d="M 50 170 L 150 140 L 250 160 L 350 90 L 450 60 L 550 20" 
                  className="chart-path-line"
                  strokeDasharray="800"
                  strokeDashoffset="800"
                />
                
                {/* Interaction Dots */}
                <circle cx="50" cy="170" r="5" className="chart-dot" title="Tháng 1: 100 học viên" />
                <circle cx="150" cy="140" r="5" className="chart-dot" title="Tháng 2: 150 học viên" />
                <circle cx="250" cy="160" r="5" className="chart-dot" title="Tháng 3: 120 học viên" />
                <circle cx="350" cy="90" r="5" className="chart-dot" title="Tháng 4: 240 học viên" />
                <circle cx="450" cy="60" r="5" className="chart-dot" title="Tháng 5: 290 học viên" />
                <circle cx="550" cy="20" r="5" className="chart-dot" title="Tháng 6: 380 học viên" />
                
                {/* Labels */}
                <text x="50" y="232" textAnchor="middle" fill="var(--text-muted)" fontSize="11">T1</text>
                <text x="150" y="232" textAnchor="middle" fill="var(--text-muted)" fontSize="11">T2</text>
                <text x="250" y="232" textAnchor="middle" fill="var(--text-muted)" fontSize="11">T3</text>
                <text x="350" y="232" textAnchor="middle" fill="var(--text-muted)" fontSize="11">T4</text>
                <text x="450" y="232" textAnchor="middle" fill="var(--text-muted)" fontSize="11">T5</text>
                <text x="550" y="232" textAnchor="middle" fill="var(--text-muted)" fontSize="11">T6</text>
                
                <text x="35" y="174" textAnchor="end" fill="var(--text-muted)" fontSize="10">100</text>
                <text x="35" y="144" textAnchor="end" fill="var(--text-muted)" fontSize="10">150</text>
                <text x="35" y="94" textAnchor="end" fill="var(--text-muted)" fontSize="10">240</text>
                <text x="35" y="24" textAnchor="end" fill="var(--text-muted)" fontSize="10">380</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Activity Feed Card */}
        <div className="app-card">
          <div className="app-card-header">
            <h3 className="app-card-title">
              <ClipboardList size={18} style={{ color: 'var(--accent)' }} />
              Hoạt Động Gần Đây
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Thời gian thực</span>
          </div>
          <div className="app-card-body" style={{ padding: '1.25rem 1.75rem' }}>
            <div className="recent-activity-list">
              {sortedActivities.length > 0 ? (
                sortedActivities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div className="activity-item" key={act.id}>
                      <div className="activity-icon-bullet" style={{ backgroundColor: act.bg, color: act.color }}>
                        <Icon size={16} />
                      </div>
                      <div className="activity-details">
                        <span 
                          className="activity-text" 
                          dangerouslySetInnerHTML={{ __html: act.text }} 
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className="activity-time">{act.time}</span>
                          {act.type === 'submission' && (
                            <span className={`badge ${act.status === 'Graded' ? 'badge-published' : 'badge-draft'}`} style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                              {act.status === 'Graded' ? 'Đã chấm' : 'Chưa chấm'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                  Không có hoạt động mới nào.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
