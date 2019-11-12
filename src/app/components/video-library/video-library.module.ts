import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VideoLibraryListComponent } from './video-library-list/video-library-list.component';
import { VideoLibraryEditComponent } from './video-library-edit/video-library-edit.component';
import { VideoLibraryService } from './video-library.service';
import { VIDEOLIBRARY_ROUTES } from './video-library.routes';
import { MaterialModule } from 'src/app/modules/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(VIDEOLIBRARY_ROUTES)
  ],
  declarations: [
    VideoLibraryListComponent,
    VideoLibraryEditComponent
  ],
  providers: [
    VideoLibraryService
  ],
  exports: [
  ]
})
export class VideoLibraryModule { }
