import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CategoriesFilter } from '../categories-filter';
import { CategoriesService } from '../../../../services/categories.service'
import { Categories } from '../../../../models/categories';

@Component({
    selector: 'categories',
    templateUrl: 'categories-list.component.html'
})
export class CategoriesListComponent {

    filter = new CategoriesFilter();
    selectedCategories: Categories;

    get categoriesList(): Categories[] {
        return this.categoriesService.categoriesList;
    }

    constructor(private categoriesService: CategoriesService) {
    }

    ngOnInit() {
    }

    search(): void {
        // this.categoriesService.load(this.filter);
    }

    select(selected: Categories): void {
        this.selectedCategories = selected;
    }

}
