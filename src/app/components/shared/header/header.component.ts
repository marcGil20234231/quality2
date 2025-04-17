import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="bg-danger text-white py-3">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="mb-0"><a routerLink="/" class="text-white text-decoration-none">Quality Education PH</a></h1>
            <p class="mb-0">Empowering Filipinos through accessible education</p>
          </div>
          <div class="col-md-6 text-md-end">
            <ng-container *ngIf="(authService.currentUser$ | async) as user; else loginLinks">
              <span class="me-2">Welcome, {{ user.fullName }}</span>
              <button class="btn btn-outline-light btn-sm me-2" [routerLink]="['/dashboard', user.isAdmin ? 'admin-dashboard' : 'user-dashboard']">Dashboard</button>
              <button class="btn btn-outline-light btn-sm" (click)="logout()">Logout</button>
            </ng-container>
            <ng-template #loginLinks>
              <a routerLink="/auth/login" class="btn btn-outline-light btn-sm me-2">Login</a>
              <a routerLink="/auth/register" class="btn btn-outline-light btn-sm">Register</a>
            </ng-template>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    header {
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
  `]
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
