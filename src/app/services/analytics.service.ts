import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private router: Router) {
    if (environment.analytics.enabled) {
      this.initGoogleAnalytics();
    }
  }

  private initGoogleAnalytics(): void {
    // Initialize Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.analytics.trackingId}`;
    document.head.appendChild(script);

    // Configure Google Analytics
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', environment.analytics.trackingId, {
      send_page_view: false
    });

    // Track page views
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      gtag('config', environment.analytics.trackingId, {
        page_path: event.urlAfterRedirects
      });
    });
  }

  // Track custom events
  trackEvent(eventName: string, eventCategory: string, eventAction: string, eventLabel?: string): void {
    if (environment.analytics.enabled) {
      gtag('event', eventName, {
        event_category: eventCategory,
        event_action: eventAction,
        event_label: eventLabel
      });
    }
  }

  // Track user timing
  trackTiming(category: string, variable: string, value: number, label?: string): void {
    if (environment.analytics.enabled) {
      gtag('event', 'timing_complete', {
        name: variable,
        value: value,
        event_category: category,
        event_label: label
      });
    }
  }
} 