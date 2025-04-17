// src/app/components/teachers/teacher-form/teacher-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../models/teacher.model';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow">
            <div class="card-header bg-danger text-white">
              <h2 class="mb-0">{{ isEditMode ? 'Edit Teacher' : 'Add New Teacher' }}</h2>
            </div>
            <div class="card-body p-4">
              <form [formGroup]="teacherForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="name" class="form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    formControlName="name" 
                    class="form-control" 
                    [ngClass]="{'is-invalid': submitted && f['name'].errors}"
                  >
                  <div class="invalid-feedback" *ngIf="submitted && f['name'].errors">
                    <div *ngIf="f['name'].errors['required']">Name is required</div>
                    <div *ngIf="f['name'].errors['minlength']">Name must be at least 3 characters</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="fullName" class="form-label">Professional Title</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    formControlName="fullName" 
                    class="form-control" 
                    [ngClass]="{'is-invalid': submitted && f['fullName'].errors}"
                    placeholder="e.g. Dr. John Doe, Ph.D."
                  >
                  <div class="invalid-feedback" *ngIf="submitted && f['fullName'].errors">
                    <div *ngIf="f['fullName'].errors['required']">Professional title is required</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    formControlName="email" 
                    class="form-control" 
                    [ngClass]="{'is-invalid': submitted && f['email'].errors}"
                  >
                  <div class="invalid-feedback" *ngIf="submitted && f['email'].errors">
                    <div *ngIf="f['email'].errors['required']">Email is required</div>
                    <div *ngIf="f['email'].errors['email']">Please enter a valid email</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="specialization" class="form-label">Specialization</label>
                  <input 
                    type="text" 
                    id="specialization" 
                    formControlName="specialization" 
                    class="form-control" 
                    [ngClass]="{'is-invalid': submitted && f['specialization'].errors}"
                  >
                  <div class="invalid-feedback" *ngIf="submitted && f['specialization'].errors">
                    <div *ngIf="f['specialization'].errors['required']">Specialization is required</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="imageUrl" class="form-label">Profile Image URL</label>
                  <input 
                    type="text" 
                    id="imageUrl" 
                    formControlName="imageUrl" 
                    class="form-control" 
                    [ngClass]="{'is-invalid': submitted && f['imageUrl'].errors}"
                    placeholder="https://example.com/image.jpg"
                  >
                  <div class="invalid-feedback" *ngIf="submitted && f['imageUrl'].errors">
                    <div *ngIf="f['imageUrl'].errors['required']">Image URL is required</div>
                    <div *ngIf="f['imageUrl'].errors['pattern']">Please enter a valid URL</div>
                  </div>
                  <small class="form-text text-muted">
                    You can use a URL from randomuser.me or any other image hosting service
                  </small>
                </div>

                <div class="mb-3">
                  <label for="teachingSubjects" class="form-label">Teaching Subjects</label>
                  <div formArrayName="teachingSubjects">
                    <div *ngFor="let subject of teachingSubjectsArray.controls; let i=index" class="input-group mb-2">
                      <input 
                        [formControlName]="i"
                        class="form-control"
                        placeholder="Enter subject"
                      >
                      <button type="button" class="btn btn-outline-danger" (click)="removeSubject(i)">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                  <button type="button" class="btn btn-outline-secondary btn-sm" (click)="addSubject()">
                    <i class="bi bi-plus-circle me-1"></i>Add Subject
                  </button>
                </div>

                <div class="mb-3">
                  <label for="bio" class="form-label">Biography</label>
                  <textarea 
                    id="bio" 
                    formControlName="bio" 
                    class="form-control" 
                    rows="4"
                    [ngClass]="{'is-invalid': submitted && f['bio'].errors}"
                  ></textarea>
                  <div class="invalid-feedback" *ngIf="submitted && f['bio'].errors">
                    <div *ngIf="f['bio'].errors['required']">Biography is required</div>
                    <div *ngIf="f['bio'].errors['minlength']">Biography must be at least 50 characters</div>
                  </div>
                </div>

                <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-secondary" (click)="onCancel()">Cancel</button>
                  <button type="submit" class="btn btn-danger" [disabled]="loading">
                    <span *ngIf="loading" class="spinner-border spinner-border-sm me-1"></span>
                    {{ isEditMode ? 'Update' : 'Create' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TeacherFormComponent implements OnInit {
  teacherForm: FormGroup;
  isEditMode = false;
  submitted = false;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.teacherForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.*')]],
      teachingSubjects: this.fb.array([]),
      bio: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  get f() { return this.teacherForm.controls; }
  
  get teachingSubjectsArray() {
    return this.teacherForm.get('teachingSubjects') as FormArray;
  }

  addSubject() {
    this.teachingSubjectsArray.push(this.fb.control(''));
  }

  removeSubject(index: number) {
    this.teachingSubjectsArray.removeAt(index);
  }

  ngOnInit(): void {
    // Add at least one subject field
    if (this.teachingSubjectsArray.length === 0) {
      this.addSubject();
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadTeacher(+id);
    }
  }

  loadTeacher(id: number): void {
    this.teacherService.getTeacher(id).subscribe({
      next: (teacher) => {
        // Clear existing subjects
        while (this.teachingSubjectsArray.length) {
          this.teachingSubjectsArray.removeAt(0);
        }
        
        // Add each subject
        teacher.teachingSubjects.forEach(subject => {
          this.teachingSubjectsArray.push(this.fb.control(subject));
        });

        this.teacherForm.patchValue({
          name: teacher.name,
          fullName: teacher.fullName,
          email: teacher.email,
          specialization: teacher.specialization,
          imageUrl: teacher.imageUrl,
          bio: teacher.bio
        });
      },
      error: (error) => {
        console.error('Error loading teacher:', error);
        this.router.navigate(['/teachers']);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.teacherForm.invalid) {
      return;
    }

    this.loading = true;
    const formValue = this.teacherForm.value;
    const teacherData: Partial<Teacher> = {
      ...formValue,
      profileImage: formValue.imageUrl,
      courses: []
    };

    if (this.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.teacherService.updateTeacher(+id, teacherData).subscribe({
          next: () => {
            this.router.navigate(['/teachers']);
          },
          error: (error) => {
            this.error = error.message || 'Error updating teacher';
            this.loading = false;
          }
        });
      }
    } else {
      this.teacherService.createTeacher(teacherData).subscribe({
        next: () => {
          this.router.navigate(['/teachers']);
        },
        error: (error) => {
          this.error = error.message || 'Error creating teacher';
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/teachers']);
  }
}