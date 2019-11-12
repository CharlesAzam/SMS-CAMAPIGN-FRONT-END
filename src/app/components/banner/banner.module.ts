import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerEditComponent } from './banner-edit/banner-edit.component';
import { BannerService } from './banner.service';
import { BANNER_ROUTES } from './banner.routes';
import { MaterialModule } from 'src/app/modules/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(BANNER_ROUTES)
  ],
  declarations: [
    BannerListComponent,
    BannerEditComponent
  ],
  providers: [
    BannerService
  ],
  exports: [
  ]
})
export class BannerModule { }
