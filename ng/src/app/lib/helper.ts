// Helper functions for navigation and data processing

export function findByChildrenSubUrl(data: any[], url: string | string[]): any {
  const targetUrl = Array.isArray(url) ? url.join('/') : url;

  for (const item of data) {
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        if (child.sub && child.sub.length > 0) {
          const found = child.sub.find((sub: any) =>
            sub.url === targetUrl || `${item.url}/${sub.url}` === targetUrl
          );
          if (found) return found;
        }
      }
    }
  }
  return null;
}

export function findByCriteria(data: any[], criteria: { url: string | string[] }): any {
  const targetUrl = Array.isArray(criteria.url) ? criteria.url.join('/') : criteria.url;

  return data.find(item => item.url === targetUrl) || null;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
