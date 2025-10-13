import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

const API_URL = 'http://localhost:1337/api';

@Injectable({ providedIn: 'root' })

export class FolderService {
  folderList = signal<any[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.loadFolders();
  }

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer c3dac4704febc44ae2923f730220a1447f0db4527a4a119815713e189f2a7524904e2055a42fe5f8c219e075b88e4446996cfc9a252aadc88d094a4e6e353d28932ac4861d2aa81f306f1ea3c6baac46586007bc8e67928943fe448a96ed91dea42d97152e5121615afba58394ca704c9b9ac3b1064d8b25648a137b339b16e0`
    });
  }

  async loadFolders() {
    try {
      const folders: any = await firstValueFrom(
        this.http.get(`${API_URL}/pages`, { headers: this.getHeaders() })
      );
      console.log(folders);
      this.folderList.set(folders);
    } catch (e) {
      this.folderList.set([]);
    }
  }
}
