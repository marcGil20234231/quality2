import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';
import { staticData } from '../../assets/data/static-data';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  constructor() {}

  enrollStudent(studentId: number, courseId: number): Observable<Enrollment> {
    return this.getStudentEnrollments(studentId).pipe(
      map(enrollments => {
        // Check if student is already enrolled in this course
        const existingEnrollment = enrollments.find(e => e.courseId === courseId && e.status === 'active');
        if (existingEnrollment) {
          throw new Error('Already enrolled in this course');
        }
        
        // If not enrolled, create new enrollment
        const enrollment: Enrollment = {
          id: Math.max(...staticData.enrollments.map(e => Number(e.id)), 0) + 1,
          studentId,
          courseId,
          enrollmentDate: new Date().toISOString(),
          status: 'active',
          progress: 0,
          lastAccessed: new Date().toISOString()
        };

        // Update static data
        staticData.enrollments.push(enrollment);
        
        // Update student's enrolled courses
        const student = staticData.students.find(s => s.id === studentId);
        if (student && !student.enrolledCourses.includes(courseId)) {
          student.enrolledCourses.push(courseId);
        }

        return enrollment;
      }),
      catchError(error => throwError(() => error))
    );
  }

  getStudentEnrollments(studentId: number): Observable<Enrollment[]> {
    const enrollments = staticData.enrollments.filter(e => e.studentId === studentId);
    return of(enrollments);
  }

  getCourseEnrollments(courseId: number): Observable<Enrollment[]> {
    const enrollments = staticData.enrollments.filter(e => e.courseId === courseId);
    return of(enrollments);
  }

  updateEnrollmentStatus(enrollmentId: number, status: string): Observable<Enrollment> {
    const enrollment = staticData.enrollments.find(e => e.id === enrollmentId);
    if (!enrollment) {
      return throwError(() => new Error('Enrollment not found'));
    }
    enrollment.status = status as 'active' | 'completed' | 'dropped';
    return of(enrollment);
  }
} 