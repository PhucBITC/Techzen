export const INITIAL_COURSES = [
  {
    id: "c1",
    title: "UI/UX Design Masterclass 2026",
    category: "Design",
    level: "Intermediate",
    instructor: "Alex Morgan",
    price: 99,
    gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    status: "Published",
    enrolledCount: 145,
    rating: 4.8,
    lessons: [
      { id: "c1-l1", title: "Introduction to Modern UI/UX Trends", duration: "15m", completed: true },
      { id: "c1-l2", title: "Figma Fundamentals & Auto-layout", duration: "45m", completed: true },
      { id: "c1-l3", title: "Designing with Grid Systems", duration: "30m", completed: false },
      { id: "c1-l4", title: "Prototyping Micro-interactions", duration: "40m", completed: false },
      { id: "c1-l5", title: "Usability Testing & Design Handoff", duration: "25m", completed: false }
    ]
  },
  {
    id: "c2",
    title: "Fullstack React & Node.js Developer",
    category: "Development",
    level: "Advanced",
    instructor: "Sarah Connor",
    price: 149,
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    status: "Published",
    enrolledCount: 382,
    rating: 4.9,
    lessons: [
      { id: "c2-l1", title: "React 19 & Next.js 15 Concepts", duration: "20m", completed: true },
      { id: "c2-l2", title: "State Management in Scale", duration: "50m", completed: true },
      { id: "c2-l3", title: "RESTful & GraphQL API Architecture", duration: "35m", completed: true },
      { id: "c2-l4", title: "Database modeling with PostgreSQL", duration: "40m", completed: false },
      { id: "c2-l5", title: "CI/CD Pipeline with Docker", duration: "30m", completed: false }
    ]
  },
  {
    id: "c3",
    title: "AI Prompt Engineering for Businesses",
    category: "Business",
    level: "Beginner",
    instructor: "Dr. Ethan Hunt",
    price: 79,
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    status: "Published",
    enrolledCount: 220,
    rating: 4.7,
    lessons: [
      { id: "c3-l1", title: "AI Fundamentals & LLM Landscape", duration: "10m", completed: true },
      { id: "c3-l2", title: "Crafting High-Performance Prompts", duration: "25m", completed: true },
      { id: "c3-l3", title: "Automating Workflows with Zapier & AI", duration: "40m", completed: true },
      { id: "c3-l4", title: "AI Ethics and Governance", duration: "20m", completed: true }
    ]
  },
  {
    id: "c4",
    title: "Growth Hacking & Digital Marketing",
    category: "Marketing",
    level: "Intermediate",
    instructor: "Emma Watson",
    price: 59,
    gradient: "linear-gradient(135deg, #f59e0b 0%, #e11d48 100%)",
    status: "Draft",
    enrolledCount: 0,
    rating: 0,
    lessons: [
      { id: "c4-l1", title: "SEO Secrets: Outranking Competitors", duration: "20m", completed: false },
      { id: "c4-l2", title: "Viral Loop Marketing & Referral Programs", duration: "30m", completed: false },
      { id: "c4-l3", title: "A/B Testing Copywriting at Scale", duration: "15m", completed: false }
    ]
  }
];

export const INITIAL_STUDENTS = [
  {
    id: "s1",
    name: "Nguyễn Văn Anh",
    email: "vananh.nguyen@academy.com",
    avatarColor: "#6366f1",
    enrolledCourses: ["c1", "c2"],
    progress: 75,
    grade: "A",
    lastActive: "15 phút trước"
  },
  {
    id: "s2",
    name: "Trần Thị Bình",
    email: "binh.tran@academy.com",
    avatarColor: "#06b6d4",
    enrolledCourses: ["c1", "c3"],
    progress: 45,
    grade: "B+",
    lastActive: "2 giờ trước"
  },
  {
    id: "s3",
    name: "Lê Hoàng Long",
    email: "long.lehoang@academy.com",
    avatarColor: "#10b981",
    enrolledCourses: ["c2"],
    progress: 90,
    grade: "A+",
    lastActive: "Hôm qua"
  },
  {
    id: "s4",
    name: "Phạm Minh Thư",
    email: "thuminh.pham@academy.com",
    avatarColor: "#f59e0b",
    enrolledCourses: ["c3"],
    progress: 100,
    grade: "A+",
    lastActive: "3 ngày trước"
  },
  {
    id: "s5",
    name: "Vũ Quốc Khánh",
    email: "khanh.vu@academy.com",
    avatarColor: "#ec4899",
    enrolledCourses: ["c1"],
    progress: 20,
    grade: "C",
    lastActive: "5 giờ trước"
  }
];

export const INITIAL_MESSAGES = [
  {
    id: "m1",
    studentId: "s1",
    sender: "student",
    text: "Thưa thầy, cho em hỏi ở bài Auto-layout trong Figma, làm sao để căn chỉnh khoảng cách giữa các phần tử tự động co giãn ạ?",
    timestamp: "10:30 AM"
  },
  {
    id: "m2",
    studentId: "s1",
    sender: "instructor",
    text: "Chào em, để làm được điều đó, trong phần Auto-layout panel, em chuyển chế độ khoảng cách từ 'Packed' sang 'Space between' nhé. Hoặc phím tắt là nhấn nút ba chấm bên cạnh Auto-layout rồi chỉnh ở đó.",
    timestamp: "10:35 AM"
  },
  {
    id: "m3",
    studentId: "s1",
    sender: "student",
    text: "Dạ em làm được rồi, em cảm ơn thầy nhiều ạ!",
    timestamp: "10:38 AM"
  },
  {
    id: "m4",
    studentId: "s2",
    sender: "student",
    text: "Thầy ơi, em nộp bài tập thiết kế Wireframe của khóa UI/UX rồi, thầy xem và cho em nhận xét với nhé.",
    timestamp: "Yesterday"
  },
  {
    id: "m5",
    studentId: "s3",
    sender: "student",
    text: "Em đang gặp lỗi khi config Docker cho NodeJS Server, cổng 5000 bị báo port already in use. Thầy hỗ trợ em với ạ.",
    timestamp: "2 days ago"
  }
];

export const INITIAL_SUBMISSIONS = [
  {
    id: "sub1",
    studentId: "s1",
    studentName: "Nguyễn Văn Anh",
    courseId: "c1",
    courseTitle: "UI/UX Design Masterclass 2026",
    assignmentTitle: "Thiết kế Wireframe Dashboard Quản lý Tài chính",
    submittedAt: "Hôm nay, 08:15 AM",
    status: "Pending",
    grade: "",
    feedback: "",
    content: "Dạ thưa thầy, em gửi bài làm thiết kế Wireframe trên Figma. Em đã tối ưu hóa lưới 12 cột và thiết kế dạng Dark mode theo xu hướng mới. Nhờ thầy góp ý phần căn chỉnh khoảng cách các widget ạ. Link Figma bài làm: figma.com/file/van-anh-wireframe-dashboard-financial"
  },
  {
    id: "sub2",
    studentId: "s2",
    studentName: "Trần Thị Bình",
    courseId: "c1",
    courseTitle: "UI/UX Design Masterclass 2026",
    assignmentTitle: "User Persona & User Flow ứng dụng bán đồ ăn",
    submittedAt: "Hôm qua, 03:30 PM",
    status: "Graded",
    grade: "B+",
    feedback: "User Flow của em vẽ rất rõ ràng, tuy nhiên phần Persona của người dùng mục tiêu cần mô tả sâu hơn về pain points (nỗi đau) của họ khi chọn nhà hàng. Cố gắng phát huy nhé!",
    content: "Em đã hoàn thành bài tập nghiên cứu Persona và xây dựng User Flow cho 3 trường hợp chính: Tìm kiếm đồ ăn, Thêm vào giỏ hàng và Thanh toán nhanh. File PDF đính kèm trong thư mục nộp bài."
  },
  {
    id: "sub3",
    studentId: "s3",
    studentName: "Lê Hoàng Long",
    courseId: "c2",
    courseTitle: "Fullstack React & Node.js Developer",
    assignmentTitle: "Xây dựng RESTful API CRUD quản lý khóa học",
    submittedAt: "2 ngày trước",
    status: "Graded",
    grade: "A+",
    feedback: "Code rất sạch, tổ chức thư mục chuẩn MVC. Có sử dụng TypeScript và validation đầy đủ bằng Zod. Rất tốt!",
    content: "Mã nguồn bài tập CRUD đã được em deploy lên Render và push lên Github. API bao gồm đầy đủ Validation, Error Handling và Swagger Docs. Link Github: github.com/longle/nodejs-crud-courses-api"
  },
  {
    id: "sub4",
    studentId: "s5",
    studentName: "Vũ Quốc Khánh",
    courseId: "c1",
    courseTitle: "UI/UX Design Masterclass 2026",
    assignmentTitle: "Bài tập Moodboard & Typography",
    submittedAt: "Hôm nay, 05:40 AM",
    status: "Pending",
    grade: "",
    feedback: "",
    content: "Em gửi link Moodboard Pinterest và các phông chữ em định phối hợp cho dự án Website du lịch. Em sử dụng phông Playfair Display cho Header và Inter cho Body."
  }
];

// Một số câu trả lời tự động mô phỏng từ phía học viên khi giảng viên nhắn tin
export const AUTO_RESPONSES = [
  "Dạ vâng ạ, để em thử lại theo hướng dẫn của thầy.",
  "Em hiểu rồi ạ. Cảm ơn thầy đã giải thích chi tiết!",
  "Thầy cho em hỏi thêm là phần này có cần lưu ý gì về responsive trên mobile không ạ?",
  "Dạ em vừa xem lại bài giảng và sửa được lỗi rồi ạ. Thầy chu đáo quá!",
  "Tuyệt vời quá thầy ơi, cách này nhanh hơn hẳn cách em tự mày mò.",
  "Dạ em sẽ hoàn thành bài nộp tiếp theo trước tối nay ạ!"
];
