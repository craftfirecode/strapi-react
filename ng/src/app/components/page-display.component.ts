import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderService } from '../signal/folder.service';
import { ZoneRendererComponent } from './zone-renderer.component';

@Component({
  selector: 'app-page-display',
  standalone: true,
  imports: [CommonModule, ZoneRendererComponent],
  template: `
    <div class="page-container">
      <h1>Strapi Pages mit Zone-Inhalten</h1>

      @if (folderService.folderList().length === 0) {
        <div class="loading">Lade Seiten...</div>
      } @else {
        @for (page of folderService.folderList(); track page.id) {
          <div class="page-item">
            <div class="page-header">
              <h2>{{ page.settings?.title || 'Unbenannte Seite' }}</h2>
              <p class="page-meta">
                <strong>Indicator:</strong> {{ page.indicator }}<br>
                <strong>Slug:</strong> {{ page.settings?.slug }}<br>
                <strong>Beschreibung:</strong> {{ page.settings?.description }}
              </p>
            </div>

            <div class="page-zones">
              <h3>Zone-Inhalte ({{ page.zones?.length || 0 }} Elemente):</h3>
              @if (page.zones && page.zones.length > 0) {
                <app-zone-renderer [zones]="page.zones"></app-zone-renderer>
              } @else {
                <div class="no-zones">Keine Zone-Inhalte gefunden</div>
              }
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      font-size: 1.2rem;
      color: #666;
    }

    .page-item {
      margin-bottom: 3rem;
      padding: 2rem;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      background-color: #fafafa;
    }

    .page-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #ddd;
    }

    .page-header h2 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .page-meta {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .page-zones h3 {
      margin-bottom: 1rem;
      color: #555;
    }

    .no-zones {
      padding: 1rem;
      background-color: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 4px;
      color: #856404;
      text-align: center;
    }
  `]
})
export class PageDisplayComponent {
  folderService = inject(FolderService);
}
