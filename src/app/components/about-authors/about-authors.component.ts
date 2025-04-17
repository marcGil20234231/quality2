import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Author {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    email: string;
  };
}

@Component({
  selector: 'app-about-authors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5">
      <h1 class="text-center mb-5">Meet Our Team</h1>
      
      <div class="text-center mb-5">
        <p class="lead">
          We are a group of students passionate about leveraging technology to support quality education in the Philippines.
        </p>
        <p>
          This project was created as part of our coursework for Introduction to Applications Development (APPDEV1).
        </p>
      </div>
      
      <div class="row g-4">
        <div class="col-md-4" *ngFor="let author of authors">
          <div class="card h-100 shadow text-center">
            <img [src]="author.imageUrl" class="card-img-top rounded-circle mx-auto mt-4" style="width: 150px; height: 150px; object-fit: cover;" [alt]="author.name">
            <div class="card-body">
              <h4 class="card-title">{{ author.name }}</h4>
              <p class="text-muted">{{ author.role }}</p>
              <p class="card-text">{{ author.bio }}</p>
            </div>
            <div class="card-footer bg-white">
              <div class="d-flex justify-content-center gap-3">
                <a *ngIf="author.socialLinks.linkedin" [href]="author.socialLinks.linkedin" target="_blank" class="text-danger">
                  <i class="bi bi-linkedin fs-5"></i>
                </a>
                <a *ngIf="author.socialLinks.github" [href]="author.socialLinks.github" target="_blank" class="text-danger">
                  <i class="bi bi-github fs-5"></i>
                </a>
                <a [href]="'mailto:' + author.socialLinks.email" class="text-danger">
                  <i class="bi bi-envelope fs-5"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-5">
        <h2 class="text-center mb-4">Our Development Process</h2>
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="ratio ratio-16x9 shadow mb-4">
              <iframe 
                src="https://www.youtube.com/embed/_kZVMsMt86o" 
                title="Project Development Process" 
                allowfullscreen
                class="rounded"
              ></iframe>
            </div>
          </div>
        </div>
        <p class="text-center">
          This project was developed as a collaborative effort, using modern development practices including version control with GitHub,
          component architecture with Angular, and responsive design principles.
        </p>
      </div>
      
      <div class="row mt-5">
        <div class="col-md-8 offset-md-2">
          <div class="card shadow">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Acknowledgements</h3>
              <p>
                We would like to express our gratitude to:
              </p>
              <ul>
                <li>Our instructor, for their guidance and support throughout this project</li>
                <li>The Department of Education and CHED for valuable resources on Philippine education</li>
                <li>Our university for providing us with the opportunity to develop this application</li>
                <li>Our families and friends for their encouragement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AboutAuthorsComponent {
  authors: Author[] = [
    {
      name: 'Marc Gil Bawa-an',
      role: 'Lead Developer',
      imageUrl: 'https://xsgames.co/randomusers/assets/avatars/male/2.jpg',
      bio: 'Experienced full-stack developer specializing in Angular and Node.js',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/juan-dela-cruz',
        github: 'https://github.com/juandelacruz',
        email: 'juan@example.com'
      }
    },
    {
      name: 'Maria Santos',
      role: 'UI/UX Designer',
      imageUrl: 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg',
      bio: 'Creative designer with a passion for user-centered design',
      socialLinks: {
        github: 'https://github.com/mariasantos',
        email: 'maria@example.com'
      }
    },
    {
      name: 'Pedro Reyes',
      role: 'Backend Developer',
      imageUrl: 'https://xsgames.co/randomusers/assets/avatars/male/3.jpg',
      bio: 'Database expert and API architect',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/pedro-reyes',
        email: 'pedro@example.com'
      }
    },
    {
      name: 'Ana Gonzales',
      role: 'Quality Assurance',
      imageUrl: 'https://xsgames.co/randomusers/assets/avatars/female/3.jpg',
      bio: 'Ensuring high-quality software through rigorous testing',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ana-gonzales',
        github: 'https://github.com/anagonzales',
        email: 'ana@example.com'
      }
    },
    {
      name: 'Carlo Lim',
      role: 'Project Manager',
      imageUrl: 'https://xsgames.co/randomusers/assets/avatars/male/4.jpg',
      bio: 'Coordinating team efforts and ensuring project success',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/carlo-lim',
        github: 'https://github.com/carlolim',
        email: 'carlo@example.com'
      }
    }
  ];
}