// src/app/components/teachers/teacher-list/teacher-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../models/teacher.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container my-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Our Teachers</h1>
        <div *ngIf="authService.isAdmin()" class="action-buttons">
          <a routerLink="/teachers/new" class="btn btn-danger">
            <i class="bi bi-plus-circle me-2"></i>Add New Teacher
          </a>
        </div>
      </div>

      <div *ngIf="isLoading" class="text-center my-5">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="!isLoading && teachers.length === 0" class="alert alert-info">
        No teachers found.
      </div>

      <div class="row">
        <div *ngFor="let teacher of teachers" class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100">
            <img [src]="teacher.imageUrl" class="card-img-top" [alt]="teacher.name" 
                 style="height: 200px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">{{ teacher.fullName }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ teacher.specialization }}</h6>
              <p class="card-text">{{ teacher.bio | slice:0:150 }}...</p>
              <div class="mt-3">
                <span class="badge bg-secondary me-2" *ngFor="let subject of teacher.teachingSubjects">
                  {{ subject }}
                </span>
              </div>
              <div class="mt-3">
                <span class="badge bg-danger">{{ teacher.courses.length || 0 }} Courses</span>
              </div>
            </div>
            <div class="card-footer bg-light">
              <a [routerLink]="['/teachers', teacher.id]" class="btn btn-outline-danger btn-sm me-2">
                View Profile
              </a>
              <button *ngIf="authService.isAdmin()" 
                      [routerLink]="['/teachers/edit', teacher.id]" 
                      class="btn btn-outline-dark btn-sm me-2">
                Edit
              </button>
              <button *ngIf="authService.isAdmin()" 
                      (click)="deleteTeacher(teacher.id)" 
                      class="btn btn-outline-danger btn-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];
  isLoading: boolean = true;

  constructor(
    private teacherService: TeacherService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
        this.isLoading = false;
      }
    });
  }

  deleteTeacher(id: number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.deleteTeacher(id).subscribe({
        next: () => {
          this.teachers = this.teachers.filter(teacher => teacher.id !== id);
        },
        error: (error) => {
          console.error('Error deleting teacher:', error);
        }
      });
    }
  }
}