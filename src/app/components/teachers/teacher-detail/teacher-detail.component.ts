// src/app/components/teachers/teacher-detail/teacher-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Teacher } from '../../../models/teacher.model';
import { TeacherService } from '../../../services/teacher.service';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div *ngIf="loading" class="text-center my-5">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="!loading && !teacher" class="alert alert-danger">
        Teacher not found or has been removed.
      </div>

      <div *ngIf="teacher" class="row">
        <div class="col-md-4 mb-4">
          <div class="card border-danger">
            <img [src]="teacher.imageUrl" class="card-img-top" [alt]="teacher.name" 
                 style="height: 300px; object-fit: cover;">
            <div class="card-body">
              <h3 class="card-title text-danger">{{ teacher.fullName }}</h3>
              <h6 class="card-subtitle mb-2 text-muted">{{ teacher.specialization }}</h6>
              <p class="card-text"><strong>Email:</strong> {{ teacher.email }}</p>
              <div class="mt-3">
                <h6>Teaching Subjects:</h6>
                <div class="d-flex flex-wrap gap-2">
                  <span class="badge bg-secondary" *ngFor="let subject of teacher.teachingSubjects">
                    {{ subject }}
                  </span>
                </div>
              </div>
              <p class="card-text mt-3"><strong>Courses:</strong> {{ teacher.courses.length || 0 }}</p>
            </div>
          </div>

          <div class="mt-3">
            <a [routerLink]="['/teachers']" class="btn btn-outline-secondary me-2">
              <i class="bi bi-arrow-left"></i> Back to Teachers
            </a>
            <a *ngIf="authService.isAdmin()" 
               [routerLink]="['/teachers/edit', teacher.id]" 
               class="btn btn-outline-danger">
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
              <p class="card-text">{{ teacher.bio }}</p>
            </div>
          </div>

          <div class="card">
            <div class="card-header bg-danger text-white">
              <h4 class="mb-0">Courses</h4>
            </div>
            <div class="card-body">
              <div *ngIf="courses.length === 0" class="alert alert-info">
                No courses currently assigned.
              </div>
              <div class="table-responsive">
                <table *ngIf="courses.length > 0" class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Level</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let course of courses">
                      <td>{{ course.title }}</td>
                      <td>{{ course.category }}</td>
                      <td>{{ course.level }}</td>
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
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TeacherDetailComponent implements OnInit {
  teacher: Teacher | null = null;
  courses: Course[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private courseService: CourseService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadTeacher(+id);
      } else {
        this.loading = false;
      }
    });
  }

  loadTeacher(id: number): void {
    this.teacherService.getTeacher(id).subscribe({
      next: (teacher) => {
        this.teacher = teacher;
        this.loadTeacherCourses(teacher.courses || []);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading teacher:', error);
        this.loading = false;
      }
    });
  }

  loadTeacherCourses(courseIds: number[]): void {
    if (courseIds.length === 0) {
      this.courses = [];
      return;
    }

    const courseObservables = courseIds.map(id => 
      this.courseService.getCourse(id)
    );

    Promise.all(courseObservables.map(obs => obs.toPromise()))
      .then(courses => {
        this.courses = courses.filter(course => course !== undefined) as Course[];
      })
      .catch(error => {
        console.error('Error loading courses:', error);
        this.courses = [];
      });
  }
}