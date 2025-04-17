import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="jumbotron text-center">
        <h1 class="display-4">Welcome to Quality Education PH</h1>
        <p class="lead">Empowering Filipinos through accessible education</p>
        <hr class="my-4">
        <p>Explore our courses and start your learning journey today.</p>
        <a class="btn btn-danger btn-lg" routerLink="/courses" role="button">Browse Courses</a>
      </div>

      <div class="row mt-5">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Quality Courses</h5>
              <p class="card-text">Access high-quality educational content designed for Filipino learners.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Expert Teachers</h5>
              <p class="card-text">Learn from experienced educators passionate about teaching.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Free Resources</h5>
              <p class="card-text">Get access to supplementary learning materials and resources.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .jumbotron {
      padding: 4rem 2rem;
      margin-bottom: 2rem;
      background-color: #f8f9fa;
      border-radius: .3rem;
    }
    .card {
      transition: transform .2s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class HomeComponent {}