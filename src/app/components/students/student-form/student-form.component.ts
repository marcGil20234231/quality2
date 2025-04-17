// src/app/components/students/student-form/student-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card border-danger">
            <div class="card-header bg-danger text-white">
              <h3 class="mb-0">{{ isEditMode ? 'Edit Student' : 'Add New Student' }}</h3>
            </div>
            <div class="card-body">
              <div *ngIf="loading" class="text-center my-5">
                <div class="spinner-border text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

              <form *ngIf="!loading" [formGroup]="studentForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="name" class="form-label">Full Name <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    formControlName="name"
                    [class.is-invalid]="submitted && f['name'].errors"
                  >
                  <div *ngIf="submitted && f['name'].errors" class="invalid-feedback">
                    <div *ngIf="f['name'].errors['required']">Name is required</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="studentId" class="form-label">Student ID <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="studentId" 
                    formControlName="studentId"
                    [class.is-invalid]="submitted && f['studentId'].errors"
                  >
                  <div *ngIf="submitted && f['studentId'].errors" class="invalid-feedback">
                    <div *ngIf="f['studentId'].errors['required']">Student ID is required</div>
                    <div *ngIf="f['studentId'].errors['pattern']">Student ID must be alphanumeric</div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="yearLevel" class="form-label">Year Level <span class="text-danger">*</span></label>
                    <select 
                      class="form-select" 
                      id="yearLevel" 
                      formControlName="yearLevel"
                      [class.is-invalid]="submitted && f['yearLevel'].errors"
                    >
                      <option value="">Select Year</option>
                      <option value="1">First Year</option>
                      <option value="2">Second Year</option>
                      <option value="3">Third Year</option>
                      <option value="4">Fourth Year</option>
                    </select>
                    <div *ngIf="submitted && f['yearLevel'].errors" class="invalid-feedback">
                      <div *ngIf="f['yearLevel'].errors['required']">Year level is required</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label for="program" class="form-label">Program <span class="text-danger">*</span></label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="program" 
                      formControlName="program"
                      [class.is-invalid]="submitted && f['program'].errors"
                    >
                    <div *ngIf="submitted && f['program'].errors" class="invalid-feedback">
                      <div *ngIf="f['program'].errors['required']">Program is required</div>
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="major" class="form-label">Major <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="major" 
                    formControlName="major"
                    [class.is-invalid]="submitted && f['major'].errors"
                  >
                  <div *ngIf="submitted && f['major'].errors" class="invalid-feedback">
                    <div *ngIf="f['major'].errors['required']">Major is required</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    formControlName="email"
                    [class.is-invalid]="submitted && f['email'].errors"
                  >
                  <div *ngIf="submitted && f['email'].errors" class="invalid-feedback">
                    <div *ngIf="f['email'].errors['required']">Email is required</div>
                    <div *ngIf="f['email'].errors['email']">Please enter a valid email</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="profileImage" class="form-label">Profile Image URL</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="profileImage" 
                    formControlName="profileImage"
                  >
                  <small class="form-text text-muted">Enter a URL for the student's profile image</small>
                </div>

                <div class="mb-3">
                  <label for="bio" class="form-label">Biography</label>
                  <textarea 
                    class="form-control" 
                    id="bio" 
                    rows="4" 
                    formControlName="bio"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label class="form-label">Academic Interests</label>
                  <div formArrayName="academicInterests">
                    <div *ngFor="let interest of academicInterests.controls; let i = index" class="input-group mb-2">
                      <input 
                        type="text" 
                        class="form-control" 
                        [formControlName]="i"
                      >
                      <button 
                        class="btn btn-outline-danger" 
                        type="button"
                        (click)="removeInterest(i)"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                  <button type="button" class="btn btn-outline-secondary" (click)="addInterest()">
                    <i class="bi bi-plus-circle"></i> Add Interest
                  </button>
                </div>

                <div class="mb-3">
                  <label class="form-label">Achievements</label>
                  <div formArrayName="achievements">
                    <div *ngFor="let achievement of achievements.controls; let i = index">
                      <div [formGroupName]="i" class="card mb-3">
                        <div class="card-body">
                          <div class="mb-2">
                            <label class="form-label">Title <span class="text-danger">*</span></label>
                            <input 
                              type="text" 
                              class="form-control" 
                              formControlName="title"
                            >
                          </div>
                          <div class="mb-2">
                            <label class="form-label">Description</label>
                            <textarea 
                              class="form-control" 
                              rows="2" 
                              formControlName="description"
                            ></textarea>
                          </div>
                          <div class="row mb-2">
                            <div class="col-md-6">
                              <label class="form-label">Type</label>
                              <select class="form-select" formControlName="type">
                                <option value="Academic">Academic</option>
                                <option value="Sports">Sports</option>
                                <option value="Arts">Arts</option>
                                <option value="Leadership">Leadership</option>
                                <option value="Community">Community Service</option>
                              </select>
                            </div>
                            <div class="col-md-6">
                              <label class="form-label">Date</label>
                              <input 
                                type="date" 
                                class="form-control" 
                                formControlName="date"
                              >
                            </div>
                          </div>
                          <button 
                            type="button" 
                            class="btn btn-sm btn-outline-danger"
                            (click)="removeAchievement(i)"
                          >
                            <i class="bi bi-trash"></i> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-outline-secondary" (click)="addAchievement()">
                    <i class="bi bi-plus-circle"></i> Add Achievement
                  </button>
                </div>

                <div class="d-flex justify-content-between mt-4">
                  <a [routerLink]="isEditMode ? ['/students', studentId] : ['/students']" class="btn btn-secondary">
                    Cancel
                  </a>
                  <button type="submit" class="btn btn-danger">
                    {{ isEditMode ? 'Update Student' : 'Create Student' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode = false;
  studentId: number | null = null;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {
    this.studentForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.studentId = +id;
        this.loadStudent(+id);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      studentId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      yearLevel: ['', Validators.required],
      program: ['', Validators.required],
      major: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profileImage: [''],
      bio: [''],
      academicInterests: this.fb.array([]),
      achievements: this.fb.array([])
    });
  }

  get f() { return this.studentForm.controls; }
  get academicInterests() { return this.f['academicInterests'] as FormArray; }
  get achievements() { return this.f['achievements'] as FormArray; }

  loadStudent(id: number): void {
    this.loading = true;
    this.studentService.getStudent(id).subscribe({
      next: (student) => {
        // Reset the form arrays first
        while (this.academicInterests.length) {
          this.academicInterests.removeAt(0);
        }
        while (this.achievements.length) {
          this.achievements.removeAt(0);
        }
        
        // Populate form with student data
        this.studentForm.patchValue({
          name: student.name,
          studentId: student.studentId,
          yearLevel: student.yearLevel,
          program: student.program,
          major: student.major,
          email: student.email,
          profileImage: student.profileImage,
          bio: student.bio
        });
        
        // Add academic interests
        if (student.academicInterests && student.academicInterests.length > 0) {
          student.academicInterests.forEach((interest: any) => {
            this.academicInterests.push(this.fb.control(interest));
          });
        }
        
        // Add achievements
        if (student.achievements && student.achievements.length > 0) {
          student.achievements.forEach((achievement: { title: any; description: any; type: any; date: string; }) => {
            this.achievements.push(
              this.fb.group({
                title: [achievement.title, Validators.required],
                description: [achievement.description],
                type: [achievement.type],
                date: [this.formatDate(achievement.date)]
              })
            );
          });
        }
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.loading = false;
        this.router.navigate(['/students']);
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  addInterest(): void {
    this.academicInterests.push(this.fb.control(''));
  }

  removeInterest(index: number): void {
    this.academicInterests.removeAt(index);
  }

  addAchievement(): void {
    this.achievements.push(
      this.fb.group({
        title: ['', Validators.required],
        description: [''],
        type: ['Academic'],
        date: [this.formatDate(new Date().toString())]
      })
    );
  }

  removeAchievement(index: number): void {
    this.achievements.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.studentForm.invalid) {
      // Scroll to the first invalid control
      const firstInvalidElement = document.querySelector('.is-invalid');
      if (firstInvalidElement) {
        firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    const studentData: Student = {
      ...this.studentForm.value,
      id: this.isEditMode ? this.studentId! : Math.floor(Math.random() * 10000) // In a real app, the backend would generate this
    };
    
    if (this.isEditMode) {
      this.updateStudent(studentData);
    } else {
      this.createStudent(studentData);
    }
  }

  createStudent(student: Student): void {
    this.loading = true;
    this.studentService.addStudent(student).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error('Error creating student:', error);
        this.loading = false;
      }
    });
  }

  updateStudent(student: Student): void {
    this.loading = true;
    this.studentService.updateStudent(this.studentId!, student).subscribe({
      next: () => {
        this.router.navigate(['/students', this.studentId]);
      },
      error: (error) => {
        console.error('Error updating student:', error);
        this.loading = false;
      }
    });
  }
}