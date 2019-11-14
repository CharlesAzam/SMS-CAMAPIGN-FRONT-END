import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CreateCategoriesFilter } from '../create-categories-filter';
import { CreateCategoriesService } from '../create-categories.service';
import { CreateCategories } from '../create-categories';

@Component({
    selector: 'create-categories',
    templateUrl: 'create-categories-list.component.html'
})
export class CreateCategoriesListComponent {

    filter = new CreateCategoriesFilter();
    selectedCreateCategories: CreateCategories;

    get createCategoriesList(): CreateCategories[] {
        return this.createCategoriesService.createCategoriesList;
    }

    constructor(private createCategoriesService: CreateCategoriesService) {
    }

    ngOnInit() {
    }

    search(): void {
        this.createCategoriesService.load(this.filter);
    }

    select(selected: CreateCategories): void {
        this.selectedCreateCategories = selected;
    }

}
