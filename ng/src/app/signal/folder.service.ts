import { Injectable, signal } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

// GraphQL Query Interface für bessere Typisierung
interface GraphQLResponse {
  pages: {
    data: Array<{
      id: string;
      attributes: {
        indicator: string;
        zone: any[];
        settings: {
          title: string;
          description: string;
          slug: string;
        };
      };
    }>;
  };
}

const GET_PAGES_WITH_ZONES = gql`
  query GetPagesWithZones {
     pages {
    zone {
      ... on ComponentCmsContent {
        wysiwyg
      }
    }
  }
  }
`;

@Injectable({ providedIn: 'root' })
export class FolderService {
  folderList = signal<any[]>([]);

  constructor(
    private apollo: Apollo,
  ) {
    this.loadFolders();
  }

  async loadFolders() {
    try {
      const result = await firstValueFrom(
        this.apollo.query<GraphQLResponse>({
          query: GET_PAGES_WITH_ZONES,
          context: {
            headers: new HttpHeaders({
              'Authorization': `Bearer c3dac4704febc44ae2923f730220a1447f0db4527a4a119815713e189f2a7524904e2055a42fe5f8c219e075b88e4446996cfc9a252aadc88d094a4e6e353d28932ac4861d2aa81f306f1ea3c6baac46586007bc8e67928943fe448a96ed91dea42d97152e5121615afba58394ca704c9b9ac3b1064d8b25648a137b339b16e0`
            })
          }
        })
      );

      console.log('GraphQL Result:', result);
      console.log('Pages with Zones:', result.data?.pages?.data);

      // Verarbeite die Zone-Daten für bessere Nutzung
      const processedPages = result.data?.pages?.data?.map((page) => ({
        id: page.id,
        indicator: page.attributes.indicator,
        zones: page.attributes.zone || [],
        settings: page.attributes.settings
      })) || [];

      this.folderList.set(processedPages);
    } catch (e) {
      console.error('GraphQL Error:', e);
      this.folderList.set([]);
    }
  }
}
