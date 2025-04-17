import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Teacher } from '../models/teacher.model';
import { staticData } from '../../assets/data/static-data';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor() {}

  getTeachers(): Observable<Teacher[]> {
    return of(staticData.teachers);
  }

  getTeacher(id: number): Observable<Teacher> {
    const teacher = staticData.teachers.find(t => t.id === id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    return of(teacher);
  }

  createTeacher(teacher: Partial<Teacher>): Observable<Teacher> {
    const newId = Math.max(...staticData.teachers.map(t => t.id), 0) + 1;
    const newTeacher: Teacher = {
      id: newId,
      name: teacher.name || '',
      email: teacher.email || '',
      teachingSubjects: teacher.teachingSubjects || [],
      profileImage: teacher.profileImage || 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg',
      specialization: teacher.specialization || '',
      bio: teacher.bio || '',
      courses: teacher.courses || [],
      imageUrl: teacher.imageUrl || 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg',
      fullName: teacher.fullName || teacher.name || ''
    };
    
    staticData.teachers.push(newTeacher);
    return of(newTeacher);
  }

  updateTeacher(id: number, teacher: Partial<Teacher>): Observable<Teacher> {
    const index = staticData.teachers.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Teacher not found');
    }
    
    const updatedTeacher: Teacher = {
      ...staticData.teachers[index],
      ...teacher,
      id // Ensure ID doesn't change
    };
    
    staticData.teachers[index] = updatedTeacher;
    return of(updatedTeacher);
  }

  deleteTeacher(id: number): Observable<void> {
    const index = staticData.teachers.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Teacher not found');
    }
    
    staticData.teachers.splice(index, 1);
    return of(void 0);
  }

  searchTeachers(term: string): Observable<Teacher[]> {
    const searchTerm = term.toLowerCase();
    const filteredTeachers = staticData.teachers.filter(teacher =>
      teacher.name.toLowerCase().includes(searchTerm) ||
      teacher.specialization.toLowerCase().includes(searchTerm) ||
      teacher.email.toLowerCase().includes(searchTerm)
    );
    return of(filteredTeachers);
  }
}