import { MegaMenuItem } from 'primeng/api';

interface NavItem {
  __typename?: string;
  url: string;
  label: string;
  page?: {
    __typename?: string;
    documentId: string;
  };
  children?: Array<{
    __typename?: string;
    category?: string;
    sub?: Array<{
      __typename?: string;
      url: string;
      label: string;
      page?: {
        __typename?: string;
        documentId: string;
      };
    }>;
  }>;
}

export class MenuAdapter {
  /**
   * Konvertiert Navigation-Daten in PrimeNG MegaMenu-Format mit Kategorien
   * @param navData Array von Navigation-Items aus Strapi
   * @returns Array von MegaMenuItem für PrimeNG
   */
  static toMegaMenu(navData: NavItem[]): MegaMenuItem[] {
    return navData.map(navItem => {
      const megaMenuItem: MegaMenuItem = {
        label: navItem.label,
        root: true,
        routerLink: navItem.url ? `/${navItem.url}` : undefined,
      };

      // Prüfen ob Children/Sub-Items vorhanden sind
      if (navItem.children && navItem.children.length > 0) {
        // Jede Kategorie wird zu einer Spalte
        const columns: any[][] = navItem.children
          .filter(child => child.sub && child.sub.length > 0)
          .map(child => {
            const columnItems = child.sub!.map(subItem => ({
              label: subItem.label,
              routerLink: subItem.url ? `/${subItem.url}` : undefined,
              icon: 'pi pi-arrow-right',
              subtext: subItem.page?.documentId ? `Doc: ${subItem.page.documentId}` : undefined
            }));

            return [{
              label: child.category, // Kategorie-Name als Überschrift
              items: columnItems
            }];
          });

        if (columns.length > 0) {
          megaMenuItem.items = columns;
        }
      }

      return megaMenuItem;
    });
  }

  /**
   * Alternative Konvertierung mit flacher Struktur ohne Kategorie-Überschriften
   * Alle Sub-Items werden in separaten Spalten nach Kategorie gruppiert
   */
  static toMegaMenuFlat(navData: NavItem[]): MegaMenuItem[] {
    return navData.map(navItem => {
      const megaMenuItem: MegaMenuItem = {
        label: navItem.label,
        root: true,
        routerLink: navItem.url ? `/${navItem.url}` : undefined,
      };

      if (navItem.children && navItem.children.length > 0) {
        // Alle Sub-Items in einer Spalte ohne Kategorie-Trennung
        const allSubItems = navItem.children
          .filter(child => child.sub && child.sub.length > 0)
          .flatMap(child => child.sub!);

        if (allSubItems.length > 0) {
          megaMenuItem.items = [[{
            items: allSubItems.map(subItem => ({
              label: subItem.label,
              routerLink: subItem.url ? `/${subItem.url}` : undefined,
              icon: 'pi pi-arrow-right',
            }))
          }]];
        }
      }

      return megaMenuItem;
    });
  }
}
