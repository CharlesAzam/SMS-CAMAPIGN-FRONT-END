import { Routes } from '@angular/router';
import { DemoListComponent } from './demo-list/demo-list.component';
import { DemoEditComponent } from './demo-edit/demo-edit.component';

export const DEMO_ROUTES: Routes = [
  {
    path: 'demo',
    component: DemoListComponent
  },
  {
    path: 'demo/:id',
    component: DemoEditComponent
  }
]
