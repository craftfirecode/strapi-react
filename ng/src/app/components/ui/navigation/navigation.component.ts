import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Desktop Navigation -->
    <nav class="container hidden mx-auto md:flex items-center gap-2 pt-5">
      <!-- Logo -->
      <a routerLink="/" aria-label="Home">
        <div class="me-3 flex items-center gap-2 text-light font-bold text-[16px]">
          <svg
            class="brand"
            width="75"
            height="75"
            viewBox="0 0 57 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M46.1577 37.3289C51.4322 48.095 47.5178 60.0008 37.0082 65.4048C28.7176 69.6677 17.963 67.2454 12.0902 59.7928C6.5683 52.7853 6.0301 43.8742 10.6781 36.2199C12.8824 32.59 15.7141 29.3349 17.2061 24.9998C18.0741 26.618 17.8547 28.0776 17.6891 29.5291C17.3996 32.0665 17.5601 34.5121 19.2046 36.6282C19.6614 37.2158 20.1677 37.7839 21.1208 37.9604C21.5629 36.8312 21.1947 35.7116 20.8909 34.7177C18.7967 27.866 20.0878 21.6571 24.1896 15.9006C26.1815 13.1052 27.6689 10.1139 27.5596 6.53437C27.5039 4.70995 27.0463 3.01794 26.2663 1.38888C26.0748 0.989016 25.7262 0.632975 25.7887 0.0266113C26.9654 0.212634 27.8333 0.847154 28.6483 1.51138C34.046 5.91173 35.625 11.6146 34.3181 18.2924C33.9789 20.0253 33.2828 21.7332 33.9053 23.5486C34.1033 24.1258 34.2527 24.7177 34.9195 25.1537C36.2399 24.2732 36.7367 22.873 37.2011 21.4518C37.6584 20.0526 37.4244 18.5829 37.5296 17.1441C38.3385 17.0555 38.4476 17.6677 38.6791 18.0721C39.6081 19.6959 39.9958 21.4938 40.1083 23.3283C40.2874 26.2492 41.0605 28.9559 42.6104 31.4476C43.8011 33.3615 44.943 35.3056 46.1577 37.3289Z"
              fill="#ED5114"/>
            <path
              d="M50.4335 35.5531C49.0643 32.7826 47.3472 30.3694 45.2339 28.2806C44.2837 27.3413 44.3771 26.7158 45.1995 25.8301C46.2041 24.7484 46.7345 25.7822 47.2474 26.2805C51.4392 30.353 54.2148 35.2469 55.2656 41.0064C57.1214 51.1793 54.5179 60.0736 46.9023 67.1464C33.1891 79.8823 12.6723 76.0483 3.76908 60.3598C-2.33443 49.6046 -0.454403 36.1201 8.08409 27.2633C8.50705 26.8246 8.95443 26.4058 9.41931 26.0119C10.5907 25.0191 10.812 25.1073 11.691 26.3363C12.277 27.1556 11.8711 27.5622 11.3182 28.0927C8.07882 31.2008 5.64735 34.8316 4.26741 39.1325C-0.38709 53.6391 8.90444 68.9464 23.9334 71.5269C37.267 73.8164 50.5502 64.337 52.653 51.0039C53.4935 45.6733 52.8789 40.5296 50.4335 35.5531Z"
              fill="#ED9614"/>
          </svg>
          <div>CraftFire</div>
        </div>
      </a>

      <!-- Navigation Items -->
      @for (item of navigationData(); track item.id) {
        @if (!item.invisible) {
          @if (item.children.length === 0) {
            <!-- Simple Navigation Link -->
            <a
              [routerLink]="item.url"
              routerLinkActive="text-[#00c16a]"
              [routerLinkActiveOptions]="{exact: false}"
              class="text-light py-2 px-3 transition-colors duration-450 hover:text-[#00c16a]"
              [class.text-[#00c16a]]="isActive(item.url)">
              <div class="flex items-center gap-1.5">
                @if (item.icon) {
                  <!-- Icon placeholder - kann später durch Icon-Library ersetzt werden -->
                  <span class="icon">{{ item.icon }}</span>
                }
                {{ item.label }}
              </div>
            </a>
          } @else {
            <!-- Dropdown Menu (vereinfacht für den Anfang) -->
            <div class="relative group">
              <button
                class="flex h-10 items-center justify-center gap-1.5 rounded-md px-3.5 select-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 py-2 px-3 transition-colors duration-450"
                [class.text-[#00c16a]]="hasActiveChild(item)">
                @if (item.icon) {
                  <span class="icon">{{ item.icon }}</span>
                }
                {{ item.label }}
                <span class="ml-1">▼</span>
              </button>

              <!-- Dropdown Content (vereinfacht) -->
              <div class="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                @for (child of item.children; track child.id) {
                  <div class="px-4 py-2">
                    <h6 class="font-semibold text-sm text-gray-900 mb-2">{{ child.label }}</h6>
                    @for (sub of child.sub; track sub.id) {
                      <a
                        [routerLink]="item.url + '/' + sub.url"
                        class="block px-2 py-1 text-sm text-gray-700 hover:text-[#00c16a] hover:bg-gray-50 rounded">
                        {{ sub.label }}
                      </a>
                    }
                  </div>
                }
              </div>
            </div>
          }
        }
      }
    </nav>

    <!-- Mobile Navigation -->
    <nav class="md:hidden p-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a routerLink="/" aria-label="Home">
          <div class="flex items-center gap-2 text-light font-bold text-[16px]">
            <svg class="brand" width="40" height="40" viewBox="0 0 57 75" fill="none">
              <!-- Same SVG paths as above but smaller -->
            </svg>
            <div>CraftFire</div>
          </div>
        </a>

        <!-- Mobile Menu Toggle -->
        <button
          (click)="toggleMobileMenu()"
          class="p-2 rounded-md hover:bg-gray-100">
          <span class="block w-6 h-0.5 bg-gray-600 mb-1"></span>
          <span class="block w-6 h-0.5 bg-gray-600 mb-1"></span>
          <span class="block w-6 h-0.5 bg-gray-600"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      @if (mobileMenuOpen()) {
        <div class="mt-4 space-y-2">
          @for (item of navigationData(); track item.id) {
            @if (!item.invisible) {
              @if (item.children.length === 0) {
                <a
                  [routerLink]="item.url"
                  (click)="closeMobileMenu()"
                  class="block py-2 px-4 text-gray-700 hover:text-[#00c16a] hover:bg-gray-50 rounded">
                  {{ item.label }}
                </a>
              } @else {
                <div class="space-y-1">
                  <div class="py-2 px-4 font-semibold text-gray-900">{{ item.label }}</div>
                  @for (child of item.children; track child.id) {
                    @for (sub of child.sub; track sub.id) {
                      <a
                        [routerLink]="item.url + '/' + sub.url"
                        (click)="closeMobileMenu()"
                        class="block py-1 px-8 text-sm text-gray-600 hover:text-[#00c16a] hover:bg-gray-50 rounded">
                        {{ sub.label }}
                      </a>
                    }
                  }
                </div>
              }
            }
          }
        </div>
      }
    </nav>
  `,
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() set data(value: any[]) {
    this.navigationData.set(value || []);
  }

  navigationData = signal<any[]>([]);
  mobileMenuOpen = signal(false);

  constructor(private router: Router) {}

  isActive(path: string): boolean {
    return this.router.url.startsWith('/' + path);
  }

  hasActiveChild(item: any): boolean {
    return item.children?.some((child: any) =>
      child.sub?.some((sub: any) =>
        this.isActive(item.url + '/' + sub.url)
      )
    );
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
