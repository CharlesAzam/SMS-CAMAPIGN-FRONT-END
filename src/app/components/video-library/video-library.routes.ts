import { Routes } from '@angular/router';
import { VideoLibraryListComponent } from './video-library-list/video-library-list.component';
import { VideoLibraryEditComponent } from './video-library-edit/video-library-edit.component';

export const VIDEOLIBRARY_ROUTES: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo:'video-library'
  },
  {
    path: 'video-library',
    component: VideoLibraryListComponent
  },
  {
    path: 'video-library/:id',
    component: VideoLibraryEditComponent
  }
]
