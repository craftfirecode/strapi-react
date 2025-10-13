import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageService } from '../signal/page.service';
import { WysiwygComponent } from './ui/wysiwyg.component';
import { ImageComponent } from './ui/image.component';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule, WysiwygComponent, ImageComponent],
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
              <app-wysiwyg [content]="zone.wysiwyg"></app-wysiwyg>
            }
            @if (zone.__typename === 'ComponentCmsImage' && zone.image) {
              <app-image [image]="zone.image"></app-image>
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
}
