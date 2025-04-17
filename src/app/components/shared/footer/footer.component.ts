import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-light py-4 mt-auto">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h5>Quality Education PH</h5>
            <p class="text-muted">Empowering Filipinos through accessible education</p>
          </div>
          <div class="col-md-4">
            <h5>Quick Links</h5>
            <ul class="list-unstyled">
              <li><a routerLink="/about-topic" class="text-muted">About</a></li>
              <li><a routerLink="/courses" class="text-muted">Courses</a></li>
              <li><a routerLink="/resources" class="text-muted">Resources</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h5>Contact</h5>
            <p class="text-muted">
              Email: contact&#64;example.com<br>
              Phone: +63 123 456 7890
            </p>
          </div>
        </div>
        <hr>
        <div class="text-center text-muted">
          <small>&copy; 2024 Quality Education PH. All rights reserved.</small>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      border-top: 1px solid #dee2e6;
    }
  `]
})
export class FooterComponent {}