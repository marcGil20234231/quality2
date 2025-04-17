export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  image: string;
  imageUrl?: string;
  price: number;
  enrolledStudents: number[];
  level: string;
  category: string;
  createdAt: string;
  rating: number;
  code: string;
  credits: number;
  objectives: string[];
  requirements: string[];
  videoUrl?: string;
  teacherId?: number;
  instructorName?: string;
}