import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CategoryFilter } from '../category-filter';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
    selector: 'category',
    templateUrl: 'category-list.component.html'
})
export class CategoryListComponent {

    filter = new CategoryFilter();
    selectedCategory: Category;

    get categoryList(): Category[] {
        return this.categoryService.categoryList;
    }

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {
    }

    search(): void {
        this.categoryService.load(this.filter);
    }

    select(selected: Category): void {
        this.selectedCategory = selected;
    }

}
