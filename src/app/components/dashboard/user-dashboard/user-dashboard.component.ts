import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { AuthService } from '../../../services/auth.service';
import { Course } from '../../../models/course.model';
import { Enrollment } from '../../../models/enrollment.model';
import { RecommendationService } from '../../../services/recommendation.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container my-4">
      <h1 class="mb-4">My Dashboard</h1>
      
      <!-- Loading Spinner -->
      <div *ngIf="isLoading" class="text-center my-5">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Error Message -->
      <div *ngIf="error && !isLoading" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- Enrolled Courses -->
      <div class="card mb-4">
        <div class="card-header bg-danger text-white">
          <h5 class="mb-0">My Enrolled Courses</h5>
        </div>
        <div class="card-body">
          <div *ngIf="enrolledCourses.length === 0" class="alert alert-info">
            You haven't enrolled in any courses yet. <a routerLink="/courses">Browse courses</a> to get started!
          </div>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div *ngFor="let course of enrolledCourses" class="col">
              <div class="card h-100">
                <img [src]="course.imageUrl" class="card-img-top" [alt]="course.title" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                  <h5 class="card-title">{{ course.title }}</h5>
                  <p class="card-text">{{ course.description }}</p>
                  <div class="progress mb-3">
                    <div class="progress-bar bg-danger" [style.width.%]="getCourseProgress(course.id)"></div>
                  </div>
                  <a [routerLink]="['/courses', course.id]" class="btn btn-danger">Continue Learning</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommended Courses -->
      <div class="card">
        <div class="card-header bg-danger text-white">
          <h5 class="mb-0">Recommended Courses</h5>
        </div>
        <div class="card-body">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div *ngFor="let course of recommendedCourses" class="col">
              <div class="card h-100">
                <img [src]="course.imageUrl" class="card-img-top" [alt]="course.title" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                  <h5 class="card-title">{{ course.title }}</h5>
                  <p class="card-text">{{ course.description }}</p>
                  <a [routerLink]="['/courses', course.id]" class="btn btn-outline-danger">View Course</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserDashboardComponent implements OnInit {
  enrolledCourses: Course[] = [];
  recommendedCourses: Course[] = [];
  popularCourses: Course[] = [];
  newCourses: Course[] = [];
  isLoading = true;
  error = '';
  currentUser: any;

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private authService: AuthService,
    private recommendationService: RecommendationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.loadDashboardData();
      this.loadRecommendedCourses();
      this.loadPopularCourses();
      this.loadNewCourses();
    }
  }

  loadDashboardData(): void {
    this.isLoading = true;
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      this.error = 'Please log in to view your dashboard';
      this.isLoading = false;
      return;
    }

    // Load enrolled courses
    this.enrollmentService.getStudentEnrollments(currentUser.id).subscribe({
      next: (enrollments) => {
        const courseIds = enrollments.map(e => e.courseId);
        this.courseService.getCourses().subscribe({
          next: (courses) => {
            this.enrolledCourses = courses.filter(course => courseIds.includes(course.id));
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error loading courses:', err);
            this.error = 'Failed to load courses';
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error loading enrollments:', err);
        this.error = 'Failed to load enrollments';
        this.isLoading = false;
      }
    });
  }

  loadRecommendedCourses(): void {
    this.recommendationService.getRecommendedCourses(this.currentUser.id)
      .subscribe(courses => {
        this.recommendedCourses = courses;
      });
  }

  loadPopularCourses(): void {
    this.recommendationService.getPopularCourses()
      .subscribe(courses => {
        this.popularCourses = courses;
      });
  }

  loadNewCourses(): void {
    this.recommendationService.getNewCourses()
      .subscribe(courses => {
        this.newCourses = courses;
      });
  }

  getCourseProgress(courseId: number): number {
    // This should be implemented based on actual progress tracking
    return Math.floor(Math.random() * 100); // Placeholder
  }
}


