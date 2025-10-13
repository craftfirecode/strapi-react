import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FolderService} from './signal/folder.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng');
  folderService = inject(FolderService)

  log() {
    console.log(this.folderService.folderList());
  }
}
