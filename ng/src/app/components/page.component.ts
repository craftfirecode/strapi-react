import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavService } from '../signal/nav.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-page',
  standalone: true,
  template: `
    <div class="page-container">
      @if (documentId()) {
        <h1>Document ID: {{ documentId() }}</h1>
        <p>URL: {{ currentUrl() }}</p>
      } @else {
        <h1>Page nicht gefunden</h1>
        <p>Die URL konnte nicht in der Navigation gefunden werden.</p>
      }
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  `]
})
export class PageComponent {
  private route = inject(ActivatedRoute);
  private navService = inject(NavService);

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

    if (!params || !navList.length) {
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
