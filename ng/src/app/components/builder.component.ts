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
