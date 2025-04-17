import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { Resource } from '../../models/resource.model';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';
import { SearchResult } from '../../services/search.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SearchBarComponent],
  template: `
    <div class="container py-5">
      <header class="text-center mb-5">
        <h1 class="display-4">Educational Resources</h1>
        <p class="lead">Access quality learning materials to support your education journey</p>
      </header>

      <!-- Search and Filter Section -->
      <div class="row mb-4">
        <div class="col-md-6 mb-3 mb-md-0">
          <app-search-bar
            placeholder="Search resources..."
            (search)="onSearch($event)"
          ></app-search-bar>
        </div>
        <div class="col-md-6">
          <select class="form-select" [(ngModel)]="selectedCategory" (change)="filterByCategory()">
            <option value="">All Categories</option>
            <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
          </select>
        </div>
      </div>

      <!-- Search Results Summary -->
      <div *ngIf="currentSearchTerm" class="alert alert-info mb-4">
        Showing results for: "{{ currentSearchTerm }}"
        <button class="btn btn-sm btn-outline-info ms-2" (click)="clearSearch()">Clear Search</button>
      </div>

      <!-- Resources Grid -->
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" *ngFor="let resource of filteredResources">
          <div class="card h-100 shadow-sm">
            <!-- Resource Type Badge -->
            <div class="position-absolute top-0 end-0 m-2">
              <span class="badge" [ngClass]="{
                'bg-info': resource.type === 'PDF',
                'bg-danger': resource.type === 'Video',
                'bg-success': resource.type === 'Article',
                'bg-warning': resource.type === 'Link'
              }">
                {{ resource.type }}
              </span>
            </div>

            <!-- Thumbnail -->
            <div class="resource-thumbnail">
              <img
                [src]="resource.thumbnailUrl || getDefaultThumbnail(resource.type)"
                [alt]="resource.title"
                class="card-img-top"
                style="height: 200px; object-fit: cover;"
              >
            </div>

            <div class="card-body">
              <h5 class="card-title">{{ resource.title }}</h5>
              <p class="card-text">{{ resource.description }}</p>
              
              <!-- Tags -->
              <div class="mb-3">
                <span 
                  *ngFor="let tag of resource.tags" 
                  class="badge bg-light text-dark me-1"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Metadata -->
              <div class="small text-muted mb-3">
                <div><i class="bi bi-calendar"></i> {{ resource.createdAt | date }}</div>
                <div *ngIf="resource.author">
                  <i class="bi bi-person"></i> {{ resource.author }}
                </div>
                <div *ngIf="resource.downloadCount !== undefined">
                  <i class="bi bi-download"></i> {{ resource.downloadCount }} downloads
                </div>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="card-footer bg-white border-top-0">
              <a
                [href]="resource.url"
                target="_blank"
                class="btn btn-outline-danger w-100"
                (click)="onResourceClick(resource)"
              >
                <i class="bi" [ngClass]="{
                  'bi-file-earmark-pdf': resource.type === 'PDF',
                  'bi-play-circle': resource.type === 'Video',
                  'bi-file-text': resource.type === 'Article',
                  'bi-link': resource.type === 'Link'
                }"></i>
                {{ getActionText(resource.type) }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredResources.length === 0" class="text-center py-5">
        <i class="bi bi-inbox display-1 text-muted"></i>
        <p class="lead mt-3">No resources found</p>
        <button class="btn btn-danger" (click)="resetFilters()">Clear Filters</button>
      </div>
    </div>
  `,
  styles: [`
    .resource-thumbnail {
      position: relative;
      overflow: hidden;
    }

    .resource-thumbnail::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
      pointer-events: none;
    }
  `]
})
export class ResourcesComponent implements OnInit {
  resources: Resource[] = [];
  filteredResources: Resource[] = [];
  currentSearchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = [
    'Programming',
    'Web Development',
    'Mathematics',
    'Science',
    'Language Learning',
    'Teaching Materials'
  ];

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.resourceService.getResources().subscribe({
      next: (resources) => {
        this.resources = resources;
        this.filteredResources = resources;
      },
      error: (error) => {
        console.error('Error loading resources:', error);
      }
    });
  }

  onSearch(result: SearchResult): void {
    this.currentSearchTerm = result.searchTerm;
    
    if (!this.currentSearchTerm.trim()) {
      this.filteredResources = this.resources;
      return;
    }

    this.resourceService.searchResources(this.currentSearchTerm).subscribe({
      next: (resources) => {
        console.log('Search results:', resources);
        this.filteredResources = resources;
      },
      error: (error) => {
        console.error('Error searching resources:', error);
        this.filteredResources = [];
      }
    });
  }

  clearSearch(): void {
    this.currentSearchTerm = '';
    this.filteredResources = this.resources;
  }

  filterByCategory(): void {
    if (!this.selectedCategory) {
      this.filteredResources = this.resources;
      return;
    }

    this.resourceService.filterByCategory(this.selectedCategory).subscribe({
      next: (resources) => {
        this.filteredResources = resources;
      },
      error: (error) => {
        console.error('Error filtering resources:', error);
      }
    });
  }

  resetFilters(): void {
    this.selectedCategory = '';
    this.currentSearchTerm = '';
    this.loadResources();
  }

  onResourceClick(resource: Resource): void {
    this.resourceService.incrementDownloadCount(resource.id).subscribe();
  }

  getDefaultThumbnail(type: string): string {
    switch (type) {
      case 'PDF':
        return 'https://cdn-icons-png.flaticon.com/512/337/337946.png';
      case 'Video':
        return 'https://cdn-icons-png.flaticon.com/512/1666/1666998.png';
      case 'Article':
        return 'https://cdn-icons-png.flaticon.com/512/2965/2965879.png';
      case 'Link':
        return 'https://cdn-icons-png.flaticon.com/512/1828/1828954.png';
      default:
        return 'https://cdn-icons-png.flaticon.com/512/2965/2965879.png';
    }
  }

  getActionText(type: string): string {
    switch (type) {
      case 'PDF':
        return 'Download PDF';
      case 'Video':
        return 'Watch Video';
      case 'Article':
        return 'Read Article';
      case 'Link':
        return 'Visit Link';
      default:
        return 'Access Resource';
    }
  }
} 