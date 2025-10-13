import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavService } from '../signal/nav.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { BuilderComponent } from './builder.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [BuilderComponent],
  template: `
    <div class="page-container">
        <app-builder [documentId]="documentId()" />
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .not-found {
      text-align: center;
      padding: 4rem 2rem;
    }

    .not-found h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .not-found p {
      color: #666;
      font-size: 1.1rem;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      gap: 1rem;
    }
    .d-none {
      display: none;
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
  `]
})
export class PageComponent {
  private route = inject(ActivatedRoute);
  private navService = inject(NavService);

  // Loading-Status aus dem NavService
  isLoading = this.navService.isLoading;

  // URL-Segmente als Signal
  private params = toSignal(
    this.route.paramMap.pipe(
      map((params: ParamMap) => ({
        segment: params.get('segment'),
        subsegment: params.get('subsegment')
      }))
    )
  );

  // Document ID basierend auf den URL-Segmenten
  documentId = computed(() => {
    const params = this.params();
    const navList = this.navService.navList();
    const loading = this.navService.isLoading();

    // Während des Ladens null zurückgeben
    if (loading || !params || !navList.length) {
      return null;
    }

    const { segment, subsegment } = params;

    // Suche in der Navigation
    for (const navItem of navList) {
      // Prüfe ob es ein Top-Level Match ist (nur segment)
      if (navItem.url === segment) {
        // Wenn kein subsegment vorhanden ist, gib die Document ID zurück
        if (!subsegment) {
          return navItem.page?.documentId || null;
        }

        // Wenn subsegment vorhanden ist, suche in children
        if (navItem.children && navItem.children.length > 0) {
          for (const child of navItem.children) {
            if (child.sub) {
              for (const subItem of child.sub) {
                if (subItem.url === subsegment) {
                  return subItem.page?.documentId || null;
                }
              }
            }
          }
        }
      }
    }

    return null;
  });

  // Aktuelle URL für Anzeige
  currentUrl = computed(() => {
    const params = this.params();
    if (!params) return '';

    const { segment, subsegment } = params;
    return subsegment ? `/${segment}/${subsegment}` : `/${segment}`;
  });
}
