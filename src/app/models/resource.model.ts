export interface Resource {
  id: number;
  title: string;
  type: string;
  url: string;
  courseId: number;
  description: string;
  thumbnailUrl: string;
  author: string;
  tags: string[];
  createdAt: string;
  downloadCount: number;
  isPublic: boolean;
} 