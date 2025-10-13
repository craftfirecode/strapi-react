import { Component, OnInit, inject } from '@angular/core';
import { IndexPageService } from '../signal/index-page.service';
import { BuilderComponent } from './builder.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [BuilderComponent],
  template: `

        <app-builder [documentId]="indexPageService.documentId()" />

  `,
  styles: [`
    .index-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
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
      text-align: center;
    }

    .error h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
    }

    .error p {
      margin: 0;
    }
  `]
})
export class IndexComponent implements OnInit {
  indexPageService = inject(IndexPageService);

  ngOnInit(): void {
    this.indexPageService.loadIndexPage();
  }
}

