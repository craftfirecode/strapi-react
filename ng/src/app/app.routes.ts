import { Routes } from '@angular/router';
import { PageComponent } from './components/page.component';
import { IndexComponent } from './components/index.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: ':segment',
    component: PageComponent
  },
  {
    path: ':segment/:subsegment',
    component: PageComponent
  }
];
