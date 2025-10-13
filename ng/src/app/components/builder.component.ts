import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageService } from '../signal/page.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="">
      @if (pageService.isLoading()) {
        <div class="loading">
<!--          <div class="spinner"></div>-->
<!--          <p>Lade Inhalte...</p>-->
        </div>
      } @else if (pageService.error()) {
        <div class="error">
          <h2>Fehler beim Laden</h2>
          <p>{{ pageService.error() }}</p>
        </div>
      } @else if (pageService.currentPage()) {
        <div>
          @for (zone of pageService.currentPage()?.zone; track $index) {
            @if (zone.__typename === 'ComponentCmsContent' && zone.wysiwyg) {
              <div [innerHTML]="sanitizeHtml(zone.wysiwyg)"></div>
            }
            @if (zone.__typename === 'ComponentCmsImage' && zone.image) {
              <div class="image-container my-4">
                <img
                  [src]="getImageUrl(zone.image)"
                  [alt]="zone.image?.alternativeText || zone.image?.name || 'Image'"
                  class="w-full h-auto"
                />
              </div>
            }
          }
        </div>
      }
    </div>
  `,
})
export class BuilderComponent implements OnChanges {
  @Input() documentId: string | null = null;

  pageService = inject(PageService);
  private sanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documentId']) {
      const currentId = changes['documentId'].currentValue;
      const previousId = changes['documentId'].previousValue;

      // Nur laden wenn sich die ID wirklich geändert hat
      if (currentId && currentId !== previousId) {
        console.log('Loading page with documentId:', currentId);
        this.pageService.loadPage(currentId);
      } else if (!currentId && previousId) {
        // Nur clearen wenn vorher eine ID da war
        console.log('Clearing page');
        this.pageService.clearPage();
      }
    }
  }

  ngAfterViewInit() {
    // Debug: Zeige die geladenen Zonen
    console.log('Current Page Zones:', this.pageService.currentPage()?.zone);
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getImageUrl(image: any): string {
    console.log('Getting image URL for:', image);
    if (!image) return '';

    // Wenn es eine vollständige URL ist (beginnt mit http/https)
    if (image.url?.startsWith('http')) {
      return image.url;
    }

    // Ansonsten relativ zur Strapi-API
    const strapiUrl = 'http://localhost:1337'; // TODO: Aus Environment/Config laden
    const fullUrl = `${strapiUrl}${image.url}`;
    console.log('Generated image URL:', fullUrl);
    return fullUrl;
  }
}
