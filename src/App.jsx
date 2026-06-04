import React from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CourseManagement from './components/CourseManagement';
import StudentHub from './components/StudentHub';
import StudentPortal from './components/StudentPortal';

function AppContent() {
  const { role, activeTab } = useAcademy();

  return (
    <div className="app-layout">
      {/* Side Navigation panel */}
      <Sidebar />

      {/* Main viewport area */}
      <div className="main-wrapper">
        {/* Top header bar */}
        <Header />

        {/* Content body based on active role & tab */}
        <main className="content-body">
          {role === 'instructor' ? (
            <>
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'courses' && <CourseManagement />}
              {activeTab === 'students' && <StudentHub />}
            </>
          ) : (
            <StudentPortal />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AcademyProvider>
      <AppContent />
    </AcademyProvider>
  );
}
