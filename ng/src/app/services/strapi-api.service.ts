import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrapiApiService {
  private readonly apiUrl = environment.strapiApiUrl;
  private readonly apiKey = environment.strapiApiKey;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.apiKey}`
  });

  constructor(private http: HttpClient) {}

  private fetchData(url: string, params?: any): Observable<any> {
    const queryParams = new URLSearchParams(params).toString();
    const fullUrl = `${this.apiUrl}${url}${queryParams ? `?${queryParams}` : ''}`;

    return this.http.get(fullUrl, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error(`Error fetching data from ${url}:`, error);
        return of(null);
      })
    );
  }

  getPageData(urlFilter: string): Observable<any> {
    return this.fetchData(
      `/api/pages?filters[url][$eq]=${urlFilter}&customPopulate=nested`
    );
  }

  getPostData(urlFilter: string): Observable<any> {
    return this.fetchData(
      `/api/posts?filters[url][$eq]=${urlFilter}&customPopulate=nested`
    );
  }

  getPostListData(): Observable<any> {
    return this.fetchData(`/api/posts?customPopulate=nested`);
  }

  getBlogData(urlFilter: string): Observable<any> {
    return this.fetchData(
      `/api/blogs?filters[url][$eq]=${urlFilter}&customPopulate=nested`
    );
  }

  getBlogListData(): Observable<any> {
    return this.fetchData(`/api/blogs?customPopulate=nested`);
  }

  getSettingsData(): Observable<any> {
    return this.fetchData(`/api/navigation?customPopulate=nested`);
  }

  getStyleSettings(): Observable<any> {
    return this.fetchData(`/api/style-setting`);
  }

  getPageByHref(url: string | string[]): Observable<any> {
    return this.fetchData(`/api/navigation?populate[top][populate]=*`);
  }

  getPageIndexData(): Observable<any> {
    return this.fetchData(`/api/navigation?populate[index][populate]=*`);
  }

  getPageDataByDocumentID(documentId: string): Observable<any> {
    return this.fetchData(`/api/pages/${documentId}?customPopulate=nested`);
  }
}
