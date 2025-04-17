export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: 'admin' | 'user';
  isAdmin: boolean;
  createdAt: string;
  name: string;
  completedCourses: number[];
}