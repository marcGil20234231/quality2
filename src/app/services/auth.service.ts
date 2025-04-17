import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, throwError, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Check localStorage for existing user session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    // Mock validation
    if (!email || !password) {
      return throwError(() => new Error('Email and password are required'));
    }

    // Mock login - set as admin if using admin@example.com
    const isAdmin = email.toLowerCase() === 'admin@example.com';
    
    // Mock password validation (in real app, this would be done server-side)
    if (password.length < 6) {
      return throwError(() => new Error('Invalid credentials'));
    }

    const mockUser: User = {
      id: 1,
      username: isAdmin ? 'admin' : 'user',
      fullName: isAdmin ? 'Admin User' : 'Regular User',
      email: email,
      role: isAdmin ? 'admin' : 'user',
      isAdmin: isAdmin,
      createdAt: new Date().toISOString(),
      name: isAdmin ? 'Admin User' : 'Regular User',
      completedCourses: []
    };

    return of(mockUser).pipe(
      delay(800), // Simulate network delay
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.router.navigate(['/dashboard', isAdmin ? 'admin-dashboard' : 'user-dashboard']);
      })
    );
  }

  register(userData: Partial<User>): Observable<User> {
    if (!userData.email || !userData.fullName) {
      return throwError(() => new Error('Email and full name are required'));
    }

    const newUser: User = {
      id: Math.floor(Math.random() * 1000),
      username: userData.email.split('@')[0] || 'user',
      fullName: userData.fullName,
      email: userData.email,
      role: 'user',
      isAdmin: false,
      createdAt: new Date().toISOString(),
      name: userData.fullName,
      completedCourses: []
    };

    return of(newUser).pipe(delay(800));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.isAdmin;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}