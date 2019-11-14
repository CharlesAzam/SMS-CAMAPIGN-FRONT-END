import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateCategoriesListComponent } from './create-categories-list/create-categories-list.component';
import { CreateCategoriesEditComponent } from './create-categories-edit/create-categories-edit.component';
import { CreateCategoriesService } from './create-categories.service';
import { CREATE-CATEGORIES_ROUTES } from './create-categories.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(CREATE-CATEGORIES_ROUTES)
  ],
  declarations: [
    CreateCategoriesListComponent,
    CreateCategoriesEditComponent
  ],
  providers: [
    CreateCategoriesService
  ],
  exports: [
  ]
})
export class CreateCategoriesModule { }
