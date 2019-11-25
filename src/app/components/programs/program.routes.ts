import { Routes } from '@angular/router';
import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramEditComponent } from './program-edit/program-edit.component';

export const PRGORAM_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'program'
  },
  {
    path: 'program',
    component: ProgramListComponent
  },
  {
    path: 'program/:id',
    component: ProgramEditComponent
  }
]
