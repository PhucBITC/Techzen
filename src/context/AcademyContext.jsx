import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COURSES, INITIAL_STUDENTS, INITIAL_MESSAGES, INITIAL_SUBMISSIONS, AUTO_RESPONSES } from '../mockData';

const AcademyContext = createContext();

export const AcademyProvider = ({ children }) => {
  // Theme, Role & Screen States
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [role, setRole] = useState(() => localStorage.getItem('role') || 'instructor');
  const [screen, setScreen] = useState(() => localStorage.getItem('screen') || 'landing');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Core Data States (Sync from LocalStorage or mockData)
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  // Student specific navigation states
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentActiveCourseId, setStudentActiveCourseId] = useState('c1');
  const [studentActiveLessonId, setStudentActiveLessonId] = useState('c1-l1');

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('screen', screen);
  }, [screen]);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Actions: Courses
  const addCourse = (courseData) => {
    const newCourse = {
      id: 'c_' + Date.now(),
      title: courseData.title || 'Khóa học mới',
      category: courseData.category || 'Development',
      level: courseData.level || 'Beginner',
      instructor: courseData.instructor || 'Giảng viên ẩn danh',
      price: Number(courseData.price) || 0,
      gradient: courseData.gradient || 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      status: courseData.status || 'Draft',
      enrolledCount: 0,
      rating: 0,
      lessons: courseData.lessons || []
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const updateCourse = (updatedCourse) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  // Actions: Messages (Instructor sends message or Student sends message)
  const sendMessage = (studentId, sender, text) => {
    const newMsg = {
      id: 'm_' + Date.now(),
      studentId,
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);

    // Simulate student response if instructor sends message
    if (sender === 'instructor') {
      setTimeout(() => {
        // Pick a random response
        const randomText = AUTO_RESPONSES[Math.floor(Math.random() * AUTO_RESPONSES.length)];
        const autoMsg = {
          id: 'm_' + (Date.now() + 1),
          studentId,
          sender: 'student',
          text: randomText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, autoMsg]);

        // Cập nhật hoạt động cuối cùng của học viên
        setStudents(prev => prev.map(s => {
          if (s.id === studentId) {
            return { ...s, lastActive: 'Vừa xong' };
          }
          return s;
        }));
      }, 1500);
    }
  };

  // Actions: Submissions & Grading
  const gradeSubmission = (submissionId, grade, feedback) => {
    // 1. Update submission details
    let studentId = '';
    let courseId = '';
    
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === submissionId) {
        studentId = sub.studentId;
        courseId = sub.courseId;
        return {
          ...sub,
          status: 'Graded',
          grade,
          feedback
        };
      }
      return sub;
    });

    setSubmissions(updatedSubmissions);

    // 2. Adjust Student progress and grade based on grade
    if (studentId && courseId) {
      setStudents(prev => prev.map(stud => {
        if (stud.id === studentId) {
          // If graded, bump progress slightly or set standard grade
          const currentProgress = stud.progress;
          const newProgress = Math.min(100, currentProgress + 10);
          return {
            ...stud,
            progress: newProgress,
            grade: grade,
            lastActive: 'Vừa xong'
          };
        }
        return stud;
      }));
    }
  };

  // Actions: Student submits new assignment from Portal
  const submitAssignment = (studentId, studentName, courseId, courseTitle, assignmentTitle, content) => {
    const newSub = {
      id: 'sub_' + Date.now(),
      studentId,
      studentName,
      courseId,
      courseTitle,
      assignmentTitle,
      submittedAt: 'Vừa xong',
      status: 'Pending',
      grade: '',
      feedback: '',
      content
    };

    setSubmissions(prev => [newSub, ...prev]);

    // Update last active for student
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, lastActive: 'Vừa xong' };
      }
      return s;
    }));
  };

  // Logout Action
  const logout = () => {
    setScreen('landing');
    setSelectedStudentId(null);
  };

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <AcademyContext.Provider value={{
      theme,
      toggleTheme,
      role,
      setRole,
      screen,
      setScreen,
      logout,
      activeTab,
      setActiveTab,
      
      courses,
      addCourse,
      updateCourse,
      deleteCourse,
      
      students,
      setStudents,
      selectedStudentId,
      setSelectedStudentId,
      
      messages,
      sendMessage,
      
      submissions,
      gradeSubmission,
      submitAssignment,

      // Student view helpers
      studentActiveCourseId,
      setStudentActiveCourseId,
      studentActiveLessonId,
      setStudentActiveLessonId
    }}>
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
