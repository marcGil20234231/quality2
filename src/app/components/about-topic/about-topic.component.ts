import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-topic',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h1 class="text-center mb-5">About SDG 4: Quality Education</h1>
          
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">What is SDG 4?</h3>
              <p class="card-text">
                Sustainable Development Goal 4 (SDG 4) aims to "ensure inclusive and equitable quality education and 
                promote lifelong learning opportunities for all." This goal is crucial for sustainable development 
                and improving people's lives globally.
              </p>
            </div>
          </div>

          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Key Targets</h3>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <h5>Free Primary and Secondary Education</h5>
                  <p>Ensure free, equitable, and quality primary and secondary education for all.</p>
                </li>
                <li class="list-group-item">
                  <h5>Early Childhood Development</h5>
                  <p>Access to quality early childhood development, care, and pre-primary education.</p>
                </li>
                <li class="list-group-item">
                  <h5>Technical and Vocational Education</h5>
                  <p>Equal access to affordable technical, vocational, and higher education.</p>
                </li>
                <li class="list-group-item">
                  <h5>Relevant Skills for Decent Work</h5>
                  <p>Increase the number of youth and adults with relevant skills for employment.</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Our Contribution</h3>
              <p class="card-text">
                Quality Education PH contributes to SDG 4 by:
              </p>
              <ul>
                <li>Providing free access to quality educational resources</li>
                <li>Supporting teacher professional development</li>
                <li>Offering diverse learning opportunities through our platform</li>
                <li>Creating inclusive and accessible educational content</li>
                <li>Promoting lifelong learning through our courses and resources</li>
              </ul>
            </div>
          </div>

          <div class="text-center mt-5">
            <a routerLink="/courses" class="btn btn-danger btn-lg">
              Explore Our Courses
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .list-group-item h5 {
      color: #dc3545;
    }
  `]
})
export class AboutTopicComponent {}
