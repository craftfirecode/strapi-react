import { Injectable, signal } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

// GraphQL Query für Page-Daten
const GET_PAGE = gql`
  query GetPage($documentId: ID!) {
    page(documentId: $documentId) {
      documentId
      zone {
        __typename
        ... on ComponentCmsContent {
          wysiwyg
        }
        ... on ComponentCmsImage {
          image {
            __typename
            url
            alternativeText
            name
            width
            height
          }
        }
      }
      settings {
        title
        description
      }
    }
  }
`;

interface PageData {
  documentId: string;
  zone: Array<{
    __typename: string;
    wysiwyg?: string;
    image?: {
      __typename?: string;
      url: string;
      alternativeText?: string | null;
      name?: string;
      width?: number;
      height?: number;
    };
  }>;
  settings: {
    title?: string;
    description?: string;
  };
}

interface GraphQLPageResponse {
  page: PageData;
}

@Injectable({ providedIn: 'root' })
export class PageService {
  currentPage = signal<PageData | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private apollo: Apollo) {}

  async loadPage(documentId: string) {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const result: any = await firstValueFrom(
        this.apollo.query<GraphQLPageResponse>({
          query: GET_PAGE,
          variables: { documentId },
          context: {
            headers: new HttpHeaders({
              'Authorization': `Bearer c3dac4704febc44ae2923f730220a1447f0db4527a4a119815713e189f2a7524904e2055a42fe5f8c219e075b88e4446996cfc9a252aadc88d094a4e6e353d28932ac4861d2aa81f306f1ea3c6baac46586007bc8e67928943fe448a96ed91dea42d97152e5121615afba58394ca704c9b9ac3b1064d8b25648a137b339b16e0`
            })
          },
          fetchPolicy: 'network-only' // Immer frische Daten holen
        })
      );

      console.log(result);

      this.currentPage.set(result.data.page);
    } catch (e: any) {
      console.error('GraphQL Error beim Laden der Page:', e);
      this.error.set(e.message || 'Fehler beim Laden der Seite');
      this.currentPage.set(null);
    } finally {
      this.isLoading.set(false);
    }
  }

  clearPage() {
    this.currentPage.set(null);
    this.error.set(null);
  }
}
