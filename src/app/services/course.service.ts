import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { staticData } from '../../assets/data/static-data';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor() {}

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }

  getCourses(): Observable<Course[]> {
    console.log('Fetching all courses from static data');
    return of(staticData.courses).pipe(
      tap(courses => console.log('Fetched courses:', courses)),
      catchError(this.handleError)
    );
  }

  getCourse(id: number): Observable<Course> {
    console.log('Fetching course from static data:', id);
    const course = staticData.courses.find(c => c.id === id);
    if (!course) {
      return throwError(() => new Error('Course not found'));
    }
    return of(course).pipe(
      tap(course => console.log('Raw course data received:', course)),
      catchError(this.handleError)
    );
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    const newId = Math.max(...staticData.courses.map(c => c.id), 0) + 1;
    const newCourse: Course = {
      id: newId,
      title: course.title || '',
      description: course.description || '',
      instructor: course.instructor || '',
      duration: course.duration || '',
      image: course.image || '',
      level: course.level || '',
      category: course.category || '',
      createdAt: new Date().toISOString(),
      rating: course.rating || 0,
      price: 0,
      code: '',
      credits: 0,
      objectives: [],
      requirements: [],
      enrolledStudents: [],
      instructorName: '',
      imageUrl: undefined,
      videoUrl: undefined,
      teacherId: undefined
    };
    
    staticData.courses.push(newCourse);
    return of(newCourse);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    const index = staticData.courses.findIndex(c => c.id === id);
    if (index === -1) {
      return throwError(() => new Error('Course not found'));
    }

    const updatedCourse = {
      ...staticData.courses[index],
      ...course
    };
    staticData.courses[index] = updatedCourse;
    return of(updatedCourse);
  }

  deleteCourse(id: number): Observable<void> {
    const index = staticData.courses.findIndex(c => c.id === id);
    if (index === -1) {
      return throwError(() => new Error('Course not found'));
    }
    staticData.courses.splice(index, 1);
    return of(undefined);
  }

  searchCourses(term: string): Observable<Course[]> {
    const filteredCourses = staticData.courses.filter(course => 
      course.title.toLowerCase().includes(term.toLowerCase()) ||
      course.description.toLowerCase().includes(term.toLowerCase())
    );
    return of(filteredCourses).pipe(
      catchError(this.handleError)
    );
  }

  isUserEnrolled(userId: number, courseId: number): Observable<boolean> {
    const student = staticData.students.find(s => s.id === userId);
    return of(student?.enrolledCourses.includes(courseId) || false);
  }

  enrollUserInCourse(userId: number, courseId: number): Observable<void> {
    const course = staticData.courses.find(c => c.id === courseId);
    const student = staticData.students.find(s => s.id === userId);
    
    if (!course || !student) {
      return throwError(() => new Error('Course or student not found'));
    }
    if (!student.enrolledCourses.includes(courseId)) {
      student.enrolledCourses.push(courseId);
    }
    
    return of(undefined);
  }

  getEnrolledCourses(userId: number): Observable<Course[]> {
    const student = staticData.students.find(s => s.id === userId);
    if (!student) {
      return of([]);
    }
    return of(staticData.courses.filter(course => 
      student.enrolledCourses.includes(course.id)
    ));
  }

  getRecommendedCourses(userId: string): Observable<Course[]> {
    const student = staticData.students.find(s => s.id === +userId);
    if (!student) {
      return of(staticData.courses.slice(0, 3));
    }
    return of(staticData.courses
      .filter(course => !student.enrolledCourses.includes(course.id))
      .slice(0, 3)
    );
  }

  updateCourseImage(id: number, imageUrl: string): Observable<Course> {
    const index = staticData.courses.findIndex(c => c.id === id);
    if (index === -1) {
      return throwError(() => new Error('Course not found'));
    }

    const updatedCourse = {
      ...staticData.courses[index],
      image: imageUrl
    };
    staticData.courses[index] = updatedCourse;
    return of(updatedCourse);
  }
}