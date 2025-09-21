import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="getButtonClasses()"
      [type]="type"
      [disabled]="disabled"
      (click)="onClick()">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className = '';

  onClick() {
    // Handle click events if needed
  }

  getButtonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]';

    const variantClasses = {
      default: 'bg-[var(--btn-default-bg)] hover:bg-[var(--btn-hover-default-bg)] text-[var(--btn-default-color)] hover:text-[var(--btn-hover-default-color)] border-1 border-[#00c16a] rounded-md shadow-xs',
      destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90',
      outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
      primary: 'border border-black border-1 text-black hover:bg-black hover:text-white shadow-xs',
      secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground hover:underline',
      link: 'text-primary underline-offset-4 hover:underline'
    };

    const sizeClasses = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 gap-1.5 px-3',
      lg: 'h-10 px-6',
      icon: 'size-9'
    };

    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]} ${this.className}`;
  }
}
