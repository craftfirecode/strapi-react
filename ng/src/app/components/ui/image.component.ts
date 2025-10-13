import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ImageData {
  url?: string;
  alternativeText?: string | null;
  name?: string;
  width?: number;
  height?: number;
}

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="image-container my-4">
      <img
        [src]="imageUrl"
        [alt]="altText"
        class="w-full h-auto"
      />
    </div>
  `,
})
export class ImageComponent {
  @Input() set image(value: ImageData | undefined) {
    if (value) {
      this.imageUrl = this.getImageUrl(value);
      this.altText = value.alternativeText || value.name || 'Image';
    }
  }

  imageUrl: string = '';
  altText: string = 'Image';

  private getImageUrl(image: ImageData): string {
    if (!image?.url) return '';

    // Wenn es eine vollständige URL ist (beginnt mit http/https)
    if (image.url.startsWith('http')) {
      return image.url;
    }

    // Ansonsten relativ zur Strapi-API
    const strapiUrl = 'http://localhost:1337'; // TODO: Aus Environment/Config laden
    return `${strapiUrl}${image.url}`;
  }
}
