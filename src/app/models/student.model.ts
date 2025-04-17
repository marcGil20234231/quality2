export interface Student {
  id: number;
  name: string;
  email: string;
  enrolledCourses: number[];
  image: string;
  studentId: string;
  yearLevel: string;
  program: string;
  major: string;
  profileImage: string;
  bio: string;
  academicInterests: string[];
  achievements: Achievement[];
}

export interface Achievement {
  title: string;
  description: string;
  type: string;
  date: string;
}