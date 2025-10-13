import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-wysiwyg',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [innerHTML]="sanitizedContent"></div>
  `,
})
export class WysiwygComponent {
  @Input() set content(value: string | undefined) {
    this.sanitizedContent = value ? this.sanitizeHtml(value) : '';
  }

  private sanitizer = inject(DomSanitizer);
  sanitizedContent: SafeHtml = '';

  private sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
