import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FolderService} from './signal/folder.service';
import {NavService} from './signal/nav.service';
import { MegaMenuModule } from 'primeng/megamenu';
import {NgClass, NgIf} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, MegaMenuModule, NgClass, NgIf, Ripple, MegaMenu, CommonModule, AvatarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('ng');
  folderService = inject(FolderService);
  navService = inject(NavService);
  items: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Company',
        root: true,
        items: [
          [
            {
              items: [
                { label: 'Features', icon: 'pi pi-list', subtext: 'Subtext of item' },
                { label: 'Customers', icon: 'pi pi-users', subtext: 'Subtext of item' },
                { label: 'Case Studies', icon: 'pi pi-file', subtext: 'Subtext of item' }
              ]
            }
          ],
          [
            {
              items: [
                { label: 'Solutions', icon: 'pi pi-shield', subtext: 'Subtext of item' },
                { label: 'Faq', icon: 'pi pi-question', subtext: 'Subtext of item' },
                { label: 'Library', icon: 'pi pi-search', subtext: 'Subtext of item' }
              ]
            }
          ],
          [
            {
              items: [
                { label: 'Community', icon: 'pi pi-comments', subtext: 'Subtext of item' },
                { label: 'Rewards', icon: 'pi pi-star', subtext: 'Subtext of item' },
                { label: 'Investors', icon: 'pi pi-globe', subtext: 'Subtext of item' }
              ]
            }
          ],
          [
            {
              items: [{ image: 'https://primefaces.org/cdn/primeng/images/uikit/uikit-system.png', label: 'GET STARTED', subtext: 'Build spectacular apps in no time.' }]
            }
          ]
        ]
      },
      {
        label: 'Resources',
        root: true
      },
      {
        label: 'Contact',
        root: true
      }
    ];
  }

  log() {
    console.log('folderList', this.folderService.folderList());
    console.log('navService', this.navService.navList());
  }
}
