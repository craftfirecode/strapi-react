import {Component, inject, OnInit, signal, computed} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {FolderService} from './signal/folder.service';
import {NavService} from './signal/nav.service';
import { MegaMenuModule } from 'primeng/megamenu';
import {NgClass, NgIf} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import { MegaMenu } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuAdapter } from './lib/menu-adapter';
import {PageService} from './signal/page.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ButtonModule, MegaMenuModule, NgClass, NgIf, Ripple, MegaMenu, CommonModule, AvatarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('ng');
  folderService = inject(FolderService);
  navService = inject(NavService);
  pageService = inject(PageService);

  // Computed Signal für reaktive Menu-Items basierend auf navService
  items = computed(() => {
    const navData = this.navService.navList();
    if (navData && navData.length > 0) {
      return MenuAdapter.toMegaMenu(navData);
    }
    return [];
  });

  ngOnInit() {
    // NavService lädt die Daten automatisch im Constructor
  }

  log() {
    console.log('folderList', this.folderService.folderList());
    console.log('navService', this.navService.navList());
    console.log('Converted Page:', this.pageService.currentPage());
  }
}
