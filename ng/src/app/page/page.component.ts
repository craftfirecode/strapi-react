import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StrapiApiService } from '../services/strapi-api.service';
import { BuilderComponent } from '../components/ui/builder/builder.component';
import { NavigationComponent } from '../components/ui/navigation/navigation.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, BuilderComponent, NavigationComponent],
  template: `
    <!-- Navigation -->
    <app-navigation [data]="navigationData()"></app-navigation>

    <!-- Page Content -->
    <main class="container mx-auto px-4 py-8">
      @if (loading()) {
        <div class="flex justify-center items-center min-h-[200px]">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00c16a]"></div>
        </div>
      } @else if (error()) {
        <div class="text-center py-8">
          <h1 class="text-2xl font-bold text-red-600 mb-4">Fehler beim Laden der Seite</h1>
          <p class="text-gray-600">{{ error() }}</p>
        </div>
      } @else if (pageData()) {
        <app-builder [inputData]="pageData()"></app-builder>
      } @else {
        <div class="text-center py-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">404 - Seite nicht gefunden</h1>
          <p class="text-gray-600">Die angeforderte Seite konnte nicht gefunden werden.</p>
        </div>
      }
    </main>
  `,
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  private router = inject(Router);
  private strapiApi = inject(StrapiApiService);

  // Signals für State Management
  pageData = signal<any>(null);
  navigationData = signal<any[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed für abgeleitete Werte
  currentUrl = computed(() => {
    const segments = this.router.url.split('/').filter((segment: string) => segment);
    return segments.join('/') || 'home';
  });

  ngOnInit(): void {
    this.loadNavigationData();
    this.loadPageData();
  }

  private loadNavigationData(): void {
    this.strapiApi.getSettingsData().subscribe({
      next: (response: any) => {
        if (response?.data) {
          this.navigationData.set(response.data.top || []);
        }
      },
      error: (err: any) => {
        console.error('Fehler beim Laden der Navigation:', err);
      }
    });
  }

  private loadPageData(): void {
    this.loading.set(true);
    this.error.set(null);

    const url = this.currentUrl();

    // Versuche zuerst Seitendaten zu laden
    this.strapiApi.getPageData(url).subscribe({
      next: (response: any) => {
        if (response?.data && response.data.length > 0) {
          this.pageData.set(response.data[0]);
        } else {
          // Wenn keine Seite gefunden wird, versuche Blog-Daten
          this.loadBlogData(url);
          return;
        }
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Fehler beim Laden der Seitendaten:', err);
        this.loadBlogData(url);
      }
    });
  }

  private loadBlogData(url: string): void {
    this.strapiApi.getBlogData(url).subscribe({
      next: (response: any) => {
        if (response?.data && response.data.length > 0) {
          this.pageData.set(response.data[0]);
        } else {
          // Wenn auch keine Blog-Daten gefunden werden, versuche Post-Daten
          this.loadPostData(url);
          return;
        }
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Fehler beim Laden der Blog-Daten:', err);
        this.loadPostData(url);
      }
    });
  }

  private loadPostData(url: string): void {
    this.strapiApi.getPostData(url).subscribe({
      next: (response: any) => {
        if (response?.data && response.data.length > 0) {
          this.pageData.set(response.data[0]);
        } else {
          this.error.set('Seite nicht gefunden');
        }
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Fehler beim Laden der Post-Daten:', err);
        this.error.set('Fehler beim Laden der Seite');
        this.loading.set(false);
      }
    });
  }
}
