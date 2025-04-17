// src/app/components/students/student-list/student-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Student } from '../../../models/student.model';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">Students Directory</h2>
        <div class="d-flex">
          <div class="input-group me-2">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Search students..." 
              [(ngModel)]="searchQuery"
              (ngModelChange)="filterStudents()"
            >
            <button class="btn btn-outline-secondary" type="button">
              <i class="bi bi-search"></i>
            </button>
          </div>
          <div class="dropdown">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Filter
            </button>
            <ul class="dropdown-menu" aria-labelledby="filterDropdown">
              <li><a class="dropdown-item" (click)="setYearFilter('')">All Years</a></li>
              <li><a class="dropdown-item" (click)="setYearFilter('1')">First Year</a></li>
              <li><a class="dropdown-item" (click)="setYearFilter('2')">Second Year</a></li>
              <li><a class="dropdown-item" (click)="setYearFilter('3')">Third Year</a></li>
              <li><a class="dropdown-item" (click)="setYearFilter('4')">Fourth Year</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" (click)="setMajorFilter('')">All Majors</a></li>
              <li *ngFor="let major of availableMajors">
                <a class="dropdown-item" (click)="setMajorFilter(major)">{{ major }}</a>
              </li>
            </ul>
          </div>
          <a *ngIf="isAdmin" [routerLink]="['/students/new']" class="btn btn-danger ms-2">
            <i class="bi bi-plus-circle"></i> Add Student
          </a>
        </div>
      </div>

      <div *ngIf="loading" class="text-center my-5">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="!loading && filteredStudents.length === 0" class="alert alert-info">
        No students found matching your criteria.
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div *ngFor="let student of filteredStudents" class="col">
          <div class="card h-100 border-danger">
            <div class="row g-0">
              <div class="col-md-4">
                <img [src]="student.profileImage" class="img-fluid rounded-start" [alt]="student.name">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title text-danger">{{ student.name }}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">{{ student.studentId }}</h6>
                  <p class="card-text">
                    <span class="badge bg-secondary me-1">{{ student.yearLevel }}</span>
                    <span class="badge bg-info">{{ student.major }}</span>
                  </p>
                  <a [routerLink]="['/students', student.id]" class="btn btn-sm btn-outline-danger">View Profile</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav *ngIf="totalPages > 1" aria-label="Student pagination" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" [class.disabled]="currentPage === 1">
            <a class="page-link" (click)="changePage(currentPage - 1)" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li *ngFor="let page of getPageNumbers()" class="page-item" [class.active]="page === currentPage">
            <a class="page-link" (click)="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" [class.disabled]="currentPage === totalPages">
            <a class="page-link" (click)="changePage(currentPage + 1)" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: [`
    .pagination .page-link {
      cursor: pointer;
      color: #dc3545;
    }
    .pagination .active .page-link {
      background-color: #dc3545;
      border-color: #dc3545;
      color: white;
    }
  `]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  availableMajors: string[] = ['Computer Science', 'Information Technology', 'Software Engineering'];
  searchQuery: string = '';
  yearFilter: string = '';
  majorFilter: string = '';
  loading: boolean = true;
  isAdmin: boolean = true;
  
  // Pagination
  studentsPerPage: number = 9;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students.map(student => ({
          ...student,
          profileImage: student.profileImage || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        }));
        this.filteredStudents = this.students;
        this.totalPages = Math.ceil(this.students.length / this.studentsPerPage);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.loading = false;
      }
    });
  }

  extractAvailableMajors(): void {
    const majors = new Set<string>();
    this.students.forEach(student => {
      if (student.major) {
        majors.add(student.major);
      }
    });
    this.availableMajors = Array.from(majors).sort();
  }

  filterStudents(): void {
    let filtered = this.students;
    
    // Apply search query filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(query) || 
        student.studentId.toLowerCase().includes(query) || 
        student.email.toLowerCase().includes(query)
      );
    }
    
    // Apply year level filter
    if (this.yearFilter) {
      filtered = filtered.filter(student => student.yearLevel === this.yearFilter);
    }
    
    // Apply major filter
    if (this.majorFilter) {
      filtered = filtered.filter(student => student.major === this.majorFilter);
    }
    
    // Update pagination
    this.totalPages = Math.ceil(filtered.length / this.studentsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
    }
    
    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.studentsPerPage;
    this.filteredStudents = filtered.slice(startIndex, startIndex + this.studentsPerPage);
  }

  setYearFilter(year: string): void {
    this.yearFilter = year;
    this.currentPage = 1;
    this.filterStudents();
  }

  setMajorFilter(major: string): void {
    this.majorFilter = major;
    this.currentPage = 1;
    this.filterStudents();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterStudents();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;
    
    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}