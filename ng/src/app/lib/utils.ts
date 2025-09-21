// Utility functions for CSS classes (similar to clsx and tailwind-merge)

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim();
}

export function clsx(...classes: (string | undefined | null | boolean)[]): string {
  return cn(...classes);
}

// Simple class merging utility
export function mergeClasses(baseClasses: string, additionalClasses?: string): string {
  if (!additionalClasses) return baseClasses;
  return `${baseClasses} ${additionalClasses}`.trim();
}
