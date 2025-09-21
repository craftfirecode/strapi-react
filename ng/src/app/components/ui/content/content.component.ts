import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [innerHTML]="sanitizedContent"></div>
  `,
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() data: any;

  constructor(private sanitizer: DomSanitizer) {}

  get sanitizedContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.data?.wysiwyg || '');
  }
}
