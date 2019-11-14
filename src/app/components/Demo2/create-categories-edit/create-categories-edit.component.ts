import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateCategoriesService } from '../create-categories.service';
import { CreateCategories } from '../create-categories';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'create-categories-edit',
  templateUrl: './create-categories-edit.component.html'
})
export class CreateCategoriesEditComponent implements OnInit {

    id: string;
    createCategories: CreateCategories;
    errors: string;

    constructor(
        private route: ActivatedRoute,
        private createCategoriesService: CreateCategoriesService) { 
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    if (id === 'new') return of(new CreateCategories());
                    return this.createCategoriesService.findById(id)
                })
            )
            .subscribe(
                createCategories => { 
                    this.createCategories = createCategories; 
                    this.errors = ''; 
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );
    }

    save() {
        this.createCategoriesService.save(this.createCategories).subscribe(
            createCategories => { 
                this.createCategories = createCategories; 
                this.errors = 'Save was successful!'; 
            },
            err => { 
                this.errors = 'Error saving'; 
            }
        );
    }
}