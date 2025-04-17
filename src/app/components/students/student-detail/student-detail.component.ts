// src/app/components/students/student-detail/student-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Student } from '../../../models/student.model';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div *ngIf="loading" class="text-center my-5">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="!loading && !student" class="alert alert-danger">
        Student not found or has been removed.
      </div>

      <div *ngIf="student" class="row">
        <div class="col-md-4 mb-4">
          <div class="card border-danger">
            <img [src]="student.profileImage" class="card-img-top" [alt]="student.name">
            <div class="card-body">
              <h3 class="card-title text-danger">{{ student.name }}</h3>
              <h6 class="card-subtitle mb-2 text-muted">{{ student.program }}</h6>
              <p class="card-text"><strong>Student ID:</strong> {{ student.studentId }}</p>
              <p class="card-text"><strong>Year Level:</strong> {{ student.yearLevel }}</p>
              <p class="card-text"><strong>Major:</strong> {{ student.major }}</p>
              <p class="card-text"><strong>Email:</strong> {{ student.email }}</p>
            </div>
          </div>

          <div class="mt-3">
            <a [routerLink]="['/students']" class="btn btn-outline-secondary me-2">
              <i class="bi bi-arrow-left"></i> Back to Students
            </a>
            <a *ngIf="isAdmin" [routerLink]="['/students/edit', student.id]" class="btn btn-outline-danger">
              <i class="bi bi-pencil"></i> Edit Profile
            </a>
          </div>
        </div>

        <div class="col-md-8">
          <div class="card mb-4">
            <div class="card-header bg-danger text-white">
              <h4 class="mb-0">About</h4>
            </div>
            <div class="card-body">
              <p class="card-text">{{ student.bio }}</p>
            </div>
          </div>

          <div class="card mb-4">
            <div class="card-header bg-danger text-white">
              <h4 class="mb-0">Academic Interests</h4>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li *ngFor="let interest of student.academicInterests" class="list-group-item">
                  {{ interest }}
                </li>
              </ul>
            </div>
          </div>

          <div class="card">
            <div class="card-header bg-danger text-white">
              <h4 class="mb-0">Enrolled Courses</h4>
            </div>
            <div class="card-body">
              <div *ngIf="enrolledCourses.length === 0" class="alert alert-info">
                No courses currently enrolled.
              </div>
              <div class="table-responsive">
                <table *ngIf="enrolledCourses.length > 0" class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Title</th>
                      <th>Credits</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let course of enrolledCourses">
                      <td>{{ course['code'] }}</td>
                      <td>{{ course.title }}</td>
                      <td>{{ course['credits'] }}</td>
                      <td>
                        <a [routerLink]="['/courses', course.id]" class="btn btn-sm btn-outline-danger">
                          View Course
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div *ngIf="isAdmin || isOwnProfile" class="card mt-4">
            <div class="card-header bg-danger text-white">
              <h4 class="mb-0">Academic Achievements</h4>
            </div>
            <div class="card-body">
              <div *ngIf="student.achievements && student.achievements.length === 0" class="alert alert-info">
                No achievements recorded yet.
              </div>
              <ul class="list-group list-group-flush">
                <li *ngFor="let achievement of student.achievements" class="list-group-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 class="mb-1">{{ achievement.title }}</h5>
                      <p class="mb-1">{{ achievement.description }}</p>
                      <small class="text-muted">{{ achievement.date | date:'longDate' }}</small>
                    </div>
                    <span class="badge bg-success rounded-pill">{{ achievement.type }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class StudentDetailComponent implements OnInit {
  student: Student | null = null;
  enrolledCourses: Course[] = [];
  loading = true;
  isAdmin = false;
  isOwnProfile = false;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // In a real app, you would check if user is admin or the logged-in student
    this.isAdmin = localStorage.getItem('userRole') === 'admin';
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const userId = localStorage.getItem('userId');
        if (userId && userId === id) {
          this.isOwnProfile = true;
        }
        
        this.loadStudent(+id);
      } else {
        this.loading = false;
      }
    });
  }

  loadStudent(id: number): void {
    this.loading = true;
    this.studentService.getStudent(id).subscribe({
      next: (student) => {
        this.student = student;
        if (student && student.enrolledCourses && student.enrolledCourses.length > 0) {
          this.loadEnrolledCourses(student.enrolledCourses);
        } else {
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error fetching student:', error);
        this.loading = false;
      }
    });
  }

  loadEnrolledCourses(courseIds: number[]): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.enrolledCourses = courses.filter(course => courseIds.includes(course.id));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        this.loading = false;
      }
    });
  }
}