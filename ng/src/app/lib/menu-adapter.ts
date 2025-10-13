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
   * Konvertiert Navigation-Daten in PrimeNG MegaMenu-Format
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
        const subItems = navItem.children[0]?.sub;

        if (subItems && subItems.length > 0) {
          // Organisiere Sub-Items in Spalten (hier: 3 Items pro Spalte)
          const itemsPerColumn = 3;
          const columns: any[][] = [];

          for (let i = 0; i < subItems.length; i += itemsPerColumn) {
            const columnItems = subItems.slice(i, i + itemsPerColumn).map(subItem => ({
              label: subItem.label,
              routerLink: subItem.url ? `/${subItem.url}` : undefined,
              icon: 'pi pi-arrow-right', // Standard-Icon, kann angepasst werden
              subtext: subItem.page?.documentId ? `Doc: ${subItem.page.documentId}` : undefined
            }));

            columns.push([{
              items: columnItems
            }]);
          }

          megaMenuItem.items = columns;
        }
      }

      return megaMenuItem;
    });
  }

  /**
   * Alternative Konvertierung mit flacher Struktur
   * Alle Sub-Items werden in einer einzigen Spalte angezeigt
   */
  static toMegaMenuFlat(navData: NavItem[]): MegaMenuItem[] {
    return navData.map(navItem => {
      const megaMenuItem: MegaMenuItem = {
        label: navItem.label,
        root: true,
        routerLink: navItem.url ? `/${navItem.url}` : undefined,
      };

      if (navItem.children && navItem.children.length > 0) {
        const subItems = navItem.children[0]?.sub;

        if (subItems && subItems.length > 0) {
          megaMenuItem.items = [[{
            items: subItems.map(subItem => ({
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

