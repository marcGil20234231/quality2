import { Course } from "../../app/models/course.model";
import { Student } from "../../app/models/student.model";
import { Teacher } from "../../app/models/teacher.model";
import { Resource } from "../../app/models/resource.model";

export const staticData: {
  courses: Course[];
  students: Student[];
  teachers: Teacher[];
  resources: Resource[];
  enrollments: any[];
} = {
  courses: [
    {
      id: 1,
      title: "Introduction to Programming",
      description: "Learn the basics of programming with this comprehensive course",
      instructor: "John Doe",
      duration: "8 weeks",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&auto=format",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&auto=format",
      videoUrl: "https://www.youtube.com/embed/sample1",
      teacherId: 1,
      price: 0,
      enrolledStudents: [],
      level: "Beginner",
      category: "Programming",
      createdAt: new Date().toISOString(),
      rating: 4.5,
      code: "CS101",
      credits: 3,
      objectives: ["Learn programming fundamentals", "Build basic applications"],
      requirements: ["No prior experience needed"],
      instructorName: "John Doe"
    },
    {
      id: 2,
      title: "Web Development Fundamentals",
      description: "Master the core concepts of web development",
      instructor: "Jane Smith",
      duration: "12 weeks",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format",
      videoUrl: "https://www.youtube.com/embed/sample2",
      teacherId: 2,
      price: 0,
      enrolledStudents: [],
      level: "Intermediate",
      category: "Web Development",
      createdAt: new Date().toISOString(),
      rating: 4.8,
      code: "WD101",
      credits: 4,
      objectives: ["Master HTML, CSS, and JavaScript", "Build responsive websites"],
      requirements: ["Basic computer knowledge"],
      instructorName: "Jane Smith"
    },
    {
      id: 3,
      title: "Data Science Essentials",
      description: "Learn data analysis, visualization, and machine learning basics",
      instructor: "Maria Garcia",
      duration: "10 weeks",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format",
      price: 0,
      enrolledStudents: [],
      level: "Intermediate",
      category: "Data Science",
      createdAt: new Date().toISOString(),
      rating: 4.7,
      code: "DS101",
      credits: 4,
      objectives: ["Data analysis techniques", "Machine learning fundamentals"],
      requirements: ["Basic programming knowledge", "Mathematics background"]
    },
    {
      id: 4,
      title: "Mobile App Development",
      description: "Build cross-platform mobile applications",
      instructor: "David Chen",
      duration: "12 weeks",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&auto=format",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&auto=format",
      price: 0,
      enrolledStudents: [],
      level: "Advanced",
      category: "Mobile Development",
      createdAt: new Date().toISOString(),
      rating: 4.6,
      code: "MD101",
      credits: 4,
      objectives: ["Cross-platform development", "Native app features"],
      requirements: ["JavaScript knowledge", "Basic programming concepts"]
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      description: "Master the art of user interface and experience design",
      instructor: "Jane Smith",
      duration: "8 weeks",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&auto=format",
      imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&auto=format",
      price: 0,
      enrolledStudents: [],
      level: "Beginner",
      category: "Design",
      createdAt: new Date().toISOString(),
      rating: 4.9,
      code: "UX101",
      credits: 3,
      objectives: ["Design principles", "User research methods"],
      requirements: ["No prior experience needed"]
    }
  ],
  teachers: [
    {
      id: 1,
      name: "John Doe",
      fullName: "John Doe, Ph.D.",
      email: "john.doe@example.com",
      teachingSubjects: ["Programming", "Computer Science", "Data Structures"],
      profileImage: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg",
      imageUrl: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg",
      specialization: "Computer Science",
      bio: "Dr. John Doe has over 15 years of experience in teaching computer science and programming. He holds a Ph.D. in Computer Science and has published numerous research papers in the field of educational technology.",
      courses: [1]
    },
    {
      id: 2,
      name: "Jane Smith",
      fullName: "Jane Smith, M.Sc.",
      email: "jane.smith@example.com",
      teachingSubjects: ["Web Development", "UI/UX Design", "Frontend Technologies"],
      profileImage: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg",
      imageUrl: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg",
      specialization: "Web Development",
      bio: "Jane Smith is a seasoned web developer with 10 years of industry experience. She specializes in modern frontend technologies and has helped numerous students launch their careers in web development.",
      courses: [2]
    },
    {
      id: 3,
      name: "Maria Garcia",
      fullName: "Maria Garcia, M.Ed.",
      email: "maria.garcia@example.com",
      teachingSubjects: ["Mathematics", "Statistics", "Data Analysis"],
      profileImage: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg",
      imageUrl: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg",
      specialization: "Mathematics Education",
      bio: "Maria Garcia is passionate about making mathematics accessible to all students. With her innovative teaching methods and real-world examples, she helps students overcome their fear of mathematics.",
      courses: []
    },
    {
      id: 4,
      name: "David Chen",
      fullName: "David Chen, MBA",
      email: "david.chen@example.com",
      teachingSubjects: ["Business Analytics", "Project Management", "Digital Marketing"],
      profileImage: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg",
      imageUrl: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg",
      specialization: "Business Education",
      bio: "David Chen brings his extensive industry experience to the classroom. His practical approach to teaching business concepts helps students develop real-world skills.",
      courses: []
    }
  ],
  students: [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      enrolledCourses: [1],
      image: "https://xsgames.co/randomusers/assets/avatars/female/3.jpg",
      studentId: "S001",
      yearLevel: "Sophomore",
      program: "Computer Science",
      major: "Software Engineering",
      profileImage: "https://xsgames.co/randomusers/assets/avatars/female/3.jpg",
      bio: "Passionate about software development",
      academicInterests: ["Web Development", "Machine Learning"],
      achievements: [
        {
          title: "Dean's List",
          description: "Academic excellence award",
          type: "Academic",
          date: "2023-12-15"
        }
      ]
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob@example.com",
      enrolledCourses: [1, 2],
      image: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg",
      studentId: "S002",
      yearLevel: "Junior",
      program: "Information Technology",
      major: "Web Development",
      profileImage: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg",
      bio: "Web development enthusiast",
      academicInterests: ["Frontend Development", "UI/UX Design"],
      achievements: [
        {
          title: "Hackathon Winner",
          description: "First place in university hackathon",
          type: "Competition",
          date: "2023-11-20"
        }
      ]
    }
  ],
  resources: [
    {
      id: 1,
      title: "Programming Basics PDF",
      type: "PDF",
      url: "assets/resources/programming-basics.pdf",
      courseId: 1,
      description: "Introduction to programming concepts",
      thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&auto=format",
      author: "John Doe",
      tags: ["programming", "basics"],
      createdAt: "2024-01-01",
      downloadCount: 0,
      isPublic: true
    },
    {
      id: 2,
      title: "Web Development Guide",
      type: "PDF",
      url: "assets/resources/web-dev-guide.pdf",
      courseId: 2,
      description: "Comprehensive web development guide",
      thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format",
      author: "Jane Smith",
      tags: ["web", "development"],
      createdAt: "2024-01-15",
      downloadCount: 0,
      isPublic: true
    },
    {
      id: 3,
      title: "Data Science Cheat Sheet",
      type: "PDF",
      url: "assets/resources/data-science-cheat-sheet.pdf",
      courseId: 3,
      description: "Quick reference for data science concepts",
      thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format",
      author: "Maria Garcia",
      tags: ["data science", "machine learning"],
      createdAt: "2024-02-01",
      downloadCount: 0,
      isPublic: true
    },
    {
      id: 4,
      title: "Mobile Development Best Practices",
      type: "PDF",
      url: "assets/resources/mobile-dev-best-practices.pdf",
      courseId: 4,
      description: "Guidelines for mobile app development",
      thumbnailUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&auto=format",
      author: "David Chen",
      tags: ["mobile", "development"],
      createdAt: "2024-02-15",
      downloadCount: 0,
      isPublic: true
    },
    {
      id: 5,
      title: "UI/UX Design Patterns",
      type: "PDF",
      url: "assets/resources/design-patterns.pdf",
      courseId: 5,
      description: "Common UI/UX design patterns and examples",
      thumbnailUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&auto=format",
      author: "Jane Smith",
      tags: ["design", "ui", "ux"],
      createdAt: "2024-03-01",
      downloadCount: 0,
      isPublic: true
    },
    {
      id: 6,
      title: "Advanced JavaScript Concepts",
      type: "Video",
      url: "https://www.youtube.com/embed/sample3",
      courseId: 2,
      description: "Deep dive into advanced JavaScript features",
      thumbnailUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop&auto=format",
      author: "Jane Smith",
      tags: ["javascript", "programming"],
      createdAt: "2024-03-10",
      downloadCount: 0,
      isPublic: true
    },
    {
      id: 7,
      title: "Machine Learning Fundamentals",
      type: "Video",
      url: "https://www.youtube.com/embed/sample4",
      courseId: 3,
      description: "Introduction to machine learning concepts",
      thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format",
      author: "Maria Garcia",
      tags: ["machine learning", "data science"],
      createdAt: "2024-03-15",
      downloadCount: 0,
      isPublic: true
    },
    {
      id: 8,
      title: "Mobile UI Design Patterns",
      type: "PDF",
      url: "assets/resources/mobile-ui-patterns.pdf",
      courseId: 4,
      description: "Common UI patterns for mobile applications",
      thumbnailUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&auto=format",
      author: "David Chen",
      tags: ["mobile", "ui", "design"],
      createdAt: "2024-03-20",
      downloadCount: 0,
      isPublic: true
    }
  ],
  enrollments: [
    {
      id: 1,
      studentId: 1,
      courseId: 1,
      enrollmentDate: '2024-03-15T10:00:00Z',
      status: 'active',
      progress: 35,
      lastAccessed: '2024-03-20T15:30:00Z',
      grade: 'B+',
      completedModules: ['Introduction', 'Basic Syntax'],
      assignments: [
        { id: 1, name: 'Hello World Program', score: 95, submitted: true },
        { id: 2, name: 'Variables Exercise', score: 88, submitted: true }
      ]
    },
    {
      id: 2,
      studentId: 1,
      courseId: 2,
      enrollmentDate: '2024-03-16T11:00:00Z',
      status: 'active',
      progress: 45,
      lastAccessed: '2024-03-21T14:20:00Z',
      grade: 'A-',
      completedModules: ['HTML Basics', 'CSS Fundamentals'],
      assignments: [
        { id: 3, name: 'Personal Portfolio', score: 92, submitted: true },
        { id: 4, name: 'Responsive Layout', score: null, submitted: false }
      ]
    },
    {
      id: 3,
      studentId: 2,
      courseId: 1,
      enrollmentDate: '2024-02-01T09:00:00Z',
      status: 'completed',
      progress: 100,
      lastAccessed: '2024-03-15T16:45:00Z',
      grade: 'A',
      completedModules: ['Introduction', 'Basic Syntax', 'Advanced Topics', 'Final Project'],
      assignments: [
        { id: 5, name: 'Hello World Program', score: 100, submitted: true },
        { id: 6, name: 'Variables Exercise', score: 98, submitted: true },
        { id: 7, name: 'Final Project', score: 95, submitted: true }
      ]
    },
    {
      id: 4,
      studentId: 2,
      courseId: 2,
      enrollmentDate: '2024-02-15T10:30:00Z',
      status: 'active',
      progress: 65,
      lastAccessed: '2024-03-22T11:15:00Z',
      grade: 'B',
      completedModules: ['HTML Basics', 'CSS Fundamentals', 'JavaScript Intro'],
      assignments: [
        { id: 8, name: 'Personal Portfolio', score: 85, submitted: true },
        { id: 9, name: 'Responsive Layout', score: 88, submitted: true },
        { id: 10, name: 'Interactive Form', score: null, submitted: false }
      ]
    },
    {
      id: 5,
      studentId: 1,
      courseId: 2,
      enrollmentDate: '2024-01-10T08:00:00Z',
      status: 'dropped',
      progress: 15,
      lastAccessed: '2024-01-25T09:30:00Z',
      grade: 'W',
      completedModules: ['HTML Basics'],
      assignments: [
        { id: 11, name: 'Personal Portfolio', score: 75, submitted: true },
        { id: 12, name: 'Responsive Layout', score: null, submitted: false }
      ]
    }
  ]
}; 