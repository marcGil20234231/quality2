import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { staticData } from '../../assets/data/static-data';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor() {}

  getStudents(): Observable<Student[]> {
    return of(staticData.students);
  }

  getStudent(id: number): Observable<Student> {
    const student = staticData.students.find(s => s.id === id);
    if (!student) {
      return throwError(() => new Error('Student not found'));
    }
    return of(student);
  }

  createStudent(student: Partial<Student>): Observable<Student> {
    const newStudent = {
      ...student,
      id: Math.max(...staticData.students.map(s => s.id)) + 1,
      enrolledCourses: []
    } as Student;
    staticData.students.push(newStudent);
    return of(newStudent);
  }

  updateStudent(id: number, student: Partial<Student>): Observable<Student> {
    const index = staticData.students.findIndex(s => s.id === id);
    if (index === -1) {
      return throwError(() => new Error('Student not found'));
    }
    staticData.students[index] = { ...staticData.students[index], ...student };
    return of(staticData.students[index]);
  }

  deleteStudent(id: number): Observable<void> {
    const index = staticData.students.findIndex(s => s.id === id);
    if (index === -1) {
      return throwError(() => new Error('Student not found'));
    }
    staticData.students.splice(index, 1);
    return of(undefined);
  }

  searchStudents(term: string): Observable<Student[]> {
    const filteredStudents = staticData.students.filter(student => 
      student.name.toLowerCase().includes(term.toLowerCase()) ||
      student.email.toLowerCase().includes(term.toLowerCase())
    );
    return of(filteredStudents);
  }

  addStudent(student: Partial<Student>): Observable<Student> {
    return this.createStudent(student);
  }
}
