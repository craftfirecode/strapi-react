import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, ContentComponent],
  template: `
    @if (hasValidData()) {
      @for (component of data().zone; track component.id || $index) {
        <section>
          @switch (component.__component) {
            @case ('cms.content') {
              <app-content [data]="component"></app-content>
            }
            @case ('cms.button') {
              <a
                [routerLink]="component.to"
                [target]="component.blank ? '_blank' : undefined">
                <app-button>{{ component.value }}</app-button>
              </a>
            }
            @default {
              <!-- Weitere Komponenten werden später hinzugefügt -->
            }
          }
        </section>
      }
    } @else {
      <div class="error-message">404 – Seite nicht gefunden</div>
    }
  `,
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent {
  @Input() set inputData(value: any) {
    this.data.set(value);
  }

  data = signal<any>(null);

  hasValidData = computed(() => {
    const currentData = this.data();
    return currentData && Array.isArray(currentData.zone);
  });
}
