import React from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  BookOpen, 
  MessageSquare, 
  FileCheck, 
  TrendingUp, 
  Users, 
  Award 
} from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="landing-page-container">
      {/* Background Blobs */}
      <div className="landing-blob landing-blob-1"></div>
      <div className="landing-blob landing-blob-2"></div>

      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="landing-nav-logo">
          <div className="logo-icon" style={{ width: '38px', height: '38px' }}>
            <GraduationCap size={20} />
          </div>
          <span className="logo-text" style={{ fontSize: '1.25rem' }}>Academy</span>
        </div>
        <div>
          <button 
            className="btn btn-secondary" 
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
            onClick={() => onStart('login')}
          >
            Đăng Nhập
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        <div className="landing-badge">
          <Award size={14} />
          <span>Academy LMS - Phiên Bản Trải Nghiệm Prototype</span>
        </div>
        <h1 className="landing-title">
          Hệ Thống Quản Lý Giáo Dục<br />
          & Khóa Học Thế Hệ Mới
        </h1>
        <p className="landing-subtitle">
          Tối ưu hóa quy trình tương tác giữa giảng viên và học viên. Quản lý danh mục bài giảng, chấm điểm bài tập trực quan và nhắn tin hỗ trợ thời gian thực trên cùng một hệ thống.
        </p>
        <div className="landing-hero-actions">
          <button 
            className="btn btn-primary" 
            style={{ padding: '0.8rem 2rem', fontSize: '1rem', gap: '0.75rem' }}
            onClick={() => onStart('login')}
          >
            <span>Bắt Đầu Trải Nghiệm</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </header>

      {/* Features Grid */}
      <section className="landing-features-section">
        <h2 className="landing-section-title">Các Phân Hệ Tính Năng Cốt Lõi</h2>
        <div className="landing-features-grid">
          
          <div className="landing-feature-card">
            <div className="landing-feature-icon-box">
              <BookOpen size={24} />
            </div>
            <h3 className="landing-feature-title">Quản Lý Khóa Học & Bài Giảng</h3>
            <p className="landing-feature-desc">
              Tạo lập khóa học nhanh chóng, thiết lập mức phí, đính kèm chương trình học gồm nhiều bài giảng chi tiết và kiểm soát trạng thái xuất bản bản nháp linh hoạt.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon-box" style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)' }}>
              <MessageSquare size={24} />
            </div>
            <h3 className="landing-feature-title">Hỗ Trợ & Chat Học Viên</h3>
            <p className="landing-feature-desc">
              Kênh CRM giao tiếp trực tiếp với học viên. Đặc biệt hỗ trợ hệ thống chat mô phỏng với cơ chế phản hồi tự động thông minh sau 1.5 giây để đánh giá UX.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon-box" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #d946ef 100%)' }}>
              <FileCheck size={24} />
            </div>
            <h3 className="landing-feature-title">Chấm Điểm & Theo Dõi Tiến Độ</h3>
            <p className="landing-feature-desc">
              Tiếp nhận các dự án thực hành (Figma/Github) do học viên nộp, tiến hành cho điểm và nhận xét. Điểm số sẽ tự động cập nhật tiến độ học tập của học viên thời gian thực.
            </p>
          </div>

        </div>
      </section>

      {/* Statistics Section */}
      <section className="landing-stats-section">
        <div className="landing-stats-grid">
          <div className="landing-stat-item">
            <span className="landing-stat-number">5,000+</span>
            <span className="landing-stat-label">Học viên tham gia</span>
          </div>
          <div className="landing-stat-item">
            <span className="landing-stat-number">120+</span>
            <span className="landing-stat-label">Khóa học phong phú</span>
          </div>
          <div className="landing-stat-item">
            <span className="landing-stat-number">99.8%</span>
            <span className="landing-stat-label">Tỷ lệ hoàn thành khóa học</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 Academy LMS Project. Thiết kế mẫu phục vụ đánh giá năng lực của Nhà Tuyển Dụng.</p>
      </footer>
    </div>
  );
}
