import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Resource } from '../models/resource.model';
import { staticData } from '../../assets/data/static-data';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  constructor() {}

  getResources(): Observable<Resource[]> {
    return of(staticData.resources);
  }

  getResource(id: number): Observable<Resource> {
    const resource = staticData.resources.find(r => r.id === id);
    if (!resource) {
      return throwError(() => new Error('Resource not found'));
    }
    return of(resource);
  }

  createResource(resource: Partial<Resource>): Observable<Resource> {
    const newResource = {
      ...resource,
      id: Math.max(...staticData.resources.map(r => r.id)) + 1
    } as Resource;
    staticData.resources.push(newResource);
    return of(newResource);
  }

  updateResource(id: number, resource: Partial<Resource>): Observable<Resource> {
    const index = staticData.resources.findIndex(r => r.id === id);
    if (index === -1) {
      return throwError(() => new Error('Resource not found'));
    }
    staticData.resources[index] = { ...staticData.resources[index], ...resource };
    return of(staticData.resources[index]);
  }

  deleteResource(id: number): Observable<void> {
    const index = staticData.resources.findIndex(r => r.id === id);
    if (index === -1) {
      return throwError(() => new Error('Resource not found'));
    }
    staticData.resources.splice(index, 1);
    return of(undefined);
  }

  searchResources(term: string): Observable<Resource[]> {
    const filteredResources = staticData.resources.filter(resource => 
      resource.title.toLowerCase().includes(term.toLowerCase())
    );
    return of(filteredResources);
  }

  filterByCategory(category: string): Observable<Resource[]> {
    const filteredResources = staticData.resources.filter(resource => 
      resource.type.toLowerCase() === category.toLowerCase()
    );
    return of(filteredResources);
  }

  incrementDownloadCount(id: number): Observable<Resource> {
    const index = staticData.resources.findIndex(r => r.id === id);
    if (index === -1) {
      return throwError(() => new Error('Resource not found'));
    }
    const resource = staticData.resources[index];
    resource.downloadCount = (resource.downloadCount || 0) + 1;
    return of(resource);
  }

  getCourses(): Observable<Course[]> {
    return of(staticData.courses);
  }
} 