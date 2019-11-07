//
import { Routes } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesEditComponent } from './movies-edit/movies-edit.component';

export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    component: MoviesListComponent
  },
  {
    path: 'movies',
    component: MoviesListComponent
  },
  {
    path: 'movies/:id',
    component: MoviesEditComponent
  }
]
