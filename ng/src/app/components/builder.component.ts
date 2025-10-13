import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageService } from '../signal/page.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="builder-container">
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
        <div class="page-content">
          @for (zone of pageService.currentPage()?.zone; track $index) {
            @if (zone.__typename === 'ComponentCmsContent' && zone.wysiwyg) {
              <div class="zone-content" [innerHTML]="sanitizeHtml(zone.wysiwyg)"></div>
            }
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .builder-container {
      width: 100%;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      gap: 1rem;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading p {
      color: #666;
      font-size: 1rem;
    }

    .error {
      padding: 2rem;
      background-color: #fee;
      border: 1px solid #fcc;
      border-radius: 8px;
      color: #c33;
    }

    .error h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
    }

    .error p {
      margin: 0;
    }

    .page-content {
      width: 100%;
    }

    .zone-content {
      margin-bottom: 2rem;
    }

    /* Styling für WYSIWYG-Content */
    .zone-content ::ng-deep h1,
    .zone-content ::ng-deep h2,
    .zone-content ::ng-deep h3,
    .zone-content ::ng-deep h4,
    .zone-content ::ng-deep h5,
    .zone-content ::ng-deep h6 {
      margin: 1.5rem 0 1rem 0;
      font-weight: 600;
      line-height: 1.3;
    }

    .zone-content ::ng-deep h1 { font-size: 2.5rem; }
    .zone-content ::ng-deep h2 { font-size: 2rem; }
    .zone-content ::ng-deep h3 { font-size: 1.75rem; }
    .zone-content ::ng-deep h4 { font-size: 1.5rem; }
    .zone-content ::ng-deep h5 { font-size: 1.25rem; }
    .zone-content ::ng-deep h6 { font-size: 1rem; }

    .zone-content ::ng-deep p {
      margin: 1rem 0;
      line-height: 1.6;
    }

    .zone-content ::ng-deep ul,
    .zone-content ::ng-deep ol {
      margin: 1rem 0;
      padding-left: 2rem;
    }

    .zone-content ::ng-deep li {
      margin: 0.5rem 0;
      line-height: 1.6;
    }

    .zone-content ::ng-deep a {
      color: #3498db;
      text-decoration: none;
    }

    .zone-content ::ng-deep a:hover {
      text-decoration: underline;
    }

    .zone-content ::ng-deep img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }

    .zone-content ::ng-deep blockquote {
      margin: 1.5rem 0;
      padding: 1rem 1.5rem;
      border-left: 4px solid #3498db;
      background-color: #f9f9f9;
      font-style: italic;
    }

    .zone-content ::ng-deep code {
      padding: 0.2rem 0.4rem;
      background-color: #f4f4f4;
      border-radius: 3px;
      font-family: monospace;
      font-size: 0.9em;
    }

    .zone-content ::ng-deep pre {
      padding: 1rem;
      background-color: #f4f4f4;
      border-radius: 4px;
      overflow-x: auto;
    }

    .zone-content ::ng-deep pre code {
      padding: 0;
      background-color: transparent;
    }

    .zone-content ::ng-deep table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
    }

    .zone-content ::ng-deep th,
    .zone-content ::ng-deep td {
      padding: 0.75rem;
      border: 1px solid #ddd;
      text-align: left;
    }

    .zone-content ::ng-deep th {
      background-color: #f8f9fa;
      font-weight: 600;
    }

    .zone-content ::ng-deep hr {
      margin: 2rem 0;
      border: none;
      border-top: 1px solid #ddd;
    }
  `]
})
export class BuilderComponent implements OnChanges {
  @Input() documentId: string | null = null;

  pageService = inject(PageService);
  private sanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documentId'] && this.documentId) {
      this.pageService.loadPage(this.documentId);
    } else if (changes['documentId'] && !this.documentId) {
      this.pageService.clearPage();
    }
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
