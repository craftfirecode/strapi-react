import { Routes } from '@angular/router';
import { PageComponent } from './components/page.component';

export const routes: Routes = [
  {
    path: ':segment',
    component: PageComponent
  },
  {
    path: ':segment/:subsegment',
    component: PageComponent
  }
];
