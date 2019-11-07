import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryService } from './category.service';
import { CATEGORY_ROUTES } from './category.routes';
import { CategoryComponent } from './component/category/category.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(CATEGORY_ROUTES)
  ],
  declarations: [
    CategoryListComponent,
    CategoryEditComponent,
    CategoryComponent
  ],
  providers: [
    CategoryService
  ],
  exports: [
  ]
})
export class CategoryModule { }
