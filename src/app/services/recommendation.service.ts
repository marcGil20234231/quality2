import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course.model';
import { staticData } from '../../assets/data/static-data';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  constructor() {}

  getRecommendedCourses(studentId: number): Observable<Course[]> {
    // Get student's enrolled courses
    const studentEnrollments = staticData.enrollments.filter(e => e.studentId === studentId);
    const enrolledCourseIds = studentEnrollments.map(e => e.courseId);

    // Get all courses
    const allCourses = staticData.courses;

    // Filter out enrolled courses
    const availableCourses = allCourses.filter(course => !enrolledCourseIds.includes(course.id));

    // Sort by rating and return top 3
    const recommendedCourses = availableCourses
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);

    return of(recommendedCourses);
  }

  getPopularCourses(): Observable<Course[]> {
    // Sort courses by rating and return top 3
    const popularCourses = staticData.courses
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);

    return of(popularCourses);
  }

  getNewCourses(): Observable<Course[]> {
    // Sort courses by creation date and return top 3
    const newCourses = staticData.courses
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 3);

    return of(newCourses);
  }
} 