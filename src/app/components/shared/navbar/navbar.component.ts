import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SearchBarComponent],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/courses" routerLinkActive="active">Courses</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/teachers" routerLinkActive="active">Teachers</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/resources" routerLinkActive="active">Resources</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/about-topic" routerLinkActive="active">About SDG 4</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/about-authors" routerLinkActive="active">About Authors</a>
            </li>
            <li class="nav-item" *ngIf="authService.isAdmin()">
              <a class="nav-link" routerLink="/students" routerLinkActive="active">Students</a>
            </li>
          </ul>
          <app-search-bar></app-search-bar>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .active {
      font-weight: bold;
      color: #dc3545 !important;
    }
  `]
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
}