import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow">
            <div class="card-header bg-danger text-white text-center py-3">
              <h2 class="mb-0">Login</h2>
            </div>
            <div class="card-body p-4">
              <div class="alert alert-danger" *ngIf="error">{{ error }}</div>
              
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input 
                    type="email" 
                    id="email" 
                    formControlName="email" 
                    class="form-control" 
                    [ngClass]="{'is-invalid': submitted && f['email'].errors}"
                    placeholder="Enter your email"
                  >
                  <div class="invalid-feedback" *ngIf="submitted && f['email'].errors">
                    <div *ngIf="f['email'].errors['required']">Email is required</div>
                    <div *ngIf="f['email'].errors['email']">Please enter a valid email address</div>
                  </div>
                </div>
                
                <div class="mb-4">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    formControlName="password" 
                    class="form-control" 
                    [ngClass]="{'is-invalid': submitted && f['password'].errors}"
                    placeholder="Enter your password"
                  >
                  <div class="invalid-feedback" *ngIf="submitted && f['password'].errors">
                    <div *ngIf="f['password'].errors['required']">Password is required</div>
                  </div>
                </div>
                

                <div class="d-grid gap-2">
                  <button 
                    type="submit" 
                    class="btn btn-danger" 
                    [disabled]="loading"
                  >
                    <span *ngIf="loading" class="spinner-border spinner-border-sm me-1"></span>
                    Login
                  </button>
                </div>
              </form>
              
              <div class="text-center mt-3">
                <p class="mb-0">Don't have an account? <a routerLink="/auth/register" class="text-danger">Register</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  get f() { return this.loginForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.error = '';
    
    this.authService.login(this.f['email'].value, this.f['password'].value)
      .subscribe({
        next: () => {
          this.loading = false;
        },
        error: err => {
          this.error = err.message || 'Login failed. Please check your credentials.';
          this.loading = false;
        }
      });
  }
}