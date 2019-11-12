import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VodListComponent } from './vod-list/vod-list.component';
import { VodEditComponent } from './vod-edit/vod-edit.component';
import { VodService } from './vod.service';
import { VOD_ROUTES } from './vod.routes';
import { MaterialModule } from 'src/app/modules/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(VOD_ROUTES),
  ],
  declarations: [
    VodListComponent,
    VodEditComponent
  ],
  providers: [
    VodService
  ],
  exports: [
  ]
})
export class VodModule { }
