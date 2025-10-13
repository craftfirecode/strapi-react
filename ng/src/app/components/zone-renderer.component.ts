import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zone-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="zone-container">
      @for (zone of zones; track zone.id) {
        <div class="zone-item" [ngSwitch]="zone.__typename">

          <!-- Content Component -->
          <div *ngSwitchCase="'ComponentCmsContent'"
               class="content-zone"
               [innerHTML]="zone.wysiwyg">
          </div>

          <!-- Image Component -->
          <div *ngSwitchCase="'ComponentCmsImage'" class="image-zone">
            <img [src]="'http://localhost:1337' + zone.image?.data?.attributes?.url"
                 [alt]="zone.image?.data?.attributes?.alternativeText || ''"
                 [width]="zone.image?.data?.attributes?.width"
                 [height]="zone.image?.data?.attributes?.height"
                 class="responsive-image">
          </div>

          <!-- Button Component -->
          <div *ngSwitchCase="'ComponentCmsButton'" class="button-zone">
            <a [href]="zone.url"
               [class]="'btn btn-' + (zone.variant || 'primary')">
              {{ zone.label }}
            </a>
          </div>

          <!-- Content Image Component -->
          <div *ngSwitchCase="'ComponentCmsContentImage'" class="content-image-zone">
            <div class="content" [innerHTML]="zone.content"></div>
            <img [src]="'http://localhost:1337' + zone.image?.data?.attributes?.url"
                 [alt]="zone.image?.data?.attributes?.alternativeText || ''"
                 class="responsive-image">
          </div>

          <!-- Space Component -->
          <div *ngSwitchCase="'ComponentCmsSpace'"
               class="space-zone"
               [style.height.px]="zone.height">
          </div>

          <!-- Post List Component -->
          <div *ngSwitchCase="'ComponentCmsPostList'" class="post-list-zone">
            <h3>{{ zone.title }}</h3>
            <!-- Hier würden Sie die Post-Liste implementieren -->
          </div>

          <!-- Accordion Component -->
          <div *ngSwitchCase="'ComponentCmsAccordion'" class="accordion-zone">
            <details>
              <summary>{{ zone.title }}</summary>
              <div [innerHTML]="zone.content"></div>
            </details>
          </div>

          <!-- Table Component -->
          <div *ngSwitchCase="'ComponentCmsTable'" class="table-zone">
            <div [innerHTML]="zone.data"></div>
          </div>

          <!-- Unknown Component -->
          <div *ngSwitchDefault class="unknown-zone">
            <p>Unbekannter Zone-Typ: {{ zone.__typename }}</p>
            <pre>{{ zone | json }}</pre>
          </div>

        </div>
      }
    </div>
  `,
  styles: [`
    .zone-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .zone-item {
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }

    .responsive-image {
      max-width: 100%;
      height: auto;
    }

    .btn {
      display: inline-block;
      padding: 0.5rem 1rem;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .content-image-zone {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      align-items: center;
    }

    .accordion-zone details {
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .accordion-zone summary {
      padding: 0.5rem;
      background-color: #f8f9fa;
      cursor: pointer;
    }

    .unknown-zone {
      background-color: #fff3cd;
      border-color: #ffeaa7;
      color: #856404;
    }
  `]
})
export class ZoneRendererComponent {
  @Input() zones: any[] = [];
}
