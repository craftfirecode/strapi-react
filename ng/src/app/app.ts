import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FolderService} from './signal/folder.service';
import {NavService} from './signal/nav.service';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng');
  folderService = inject(FolderService);
  navService = inject(NavService);

  log() {
    console.log('folderList', this.folderService.folderList());
    console.log('navService', this.navService.navList());
  }
}
