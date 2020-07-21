import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VodListComponent, ContentDialog } from './vod-list/vod-list.component';
import { VodEditComponent, AddSeasonsDialog, AddEpisodesDialog, AddMultipleImages, AddNewLinks, AddPricesDialog } from './vod-edit/vod-edit.component';
import { VodService } from './vod.service';
import { VOD_ROUTES } from './vod.routes';
import { MaterialModule } from 'src/app/modules/app-material.module';
import { NZorroModules } from 'src/app/modules/app-nzorro.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(VOD_ROUTES),
  ],
  declarations: [
    VodListComponent,
    VodEditComponent,
    AddSeasonsDialog,
    ContentDialog,
    AddEpisodesDialog,
    AddMultipleImages,
    AddPricesDialog,
    AddNewLinks
  ],
  providers: [
    VodService
  ],
  entryComponents: [
    ContentDialog,
    AddSeasonsDialog,
    AddEpisodesDialog,
    AddMultipleImages,
    AddPricesDialog,
    AddNewLinks
  ],
  exports: [
  ]
})
export class VodModule { }
