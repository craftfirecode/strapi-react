import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = "";

@Injectable({ providedIn: 'root' })
export class PageService {
  navData = signal<any[]>([]);
  pageData = signal<number | null>(null);

  constructor(

  ) {
    this.loadNav();
    this.loadPage();
  }

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer`
    });
  }

  async loadNav() {
  }

  async loadPage() {
  }
}
