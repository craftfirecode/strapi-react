import { Routes } from '@angular/router';
import { PageComponent } from './page/page.component';

export const routes: Routes = [
  {
    path: '',
    component: PageComponent
  },
  {
    path: 'blog',
    component: PageComponent
  },
  {
    path: 'blog/:id',
    component: PageComponent
  },
  {
    path: ':segment',
    component: PageComponent
  },
  {
    path: ':segment/:subsegment',
    component: PageComponent
  },
  {
    path: '**',
    component: PageComponent
  }
];
