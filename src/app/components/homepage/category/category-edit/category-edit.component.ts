import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'category-edit',
  templateUrl: './category-edit.component.html'
})
export class CategoryEditComponent implements OnInit {

    id: string;
    category: Category;
    errors: string;

    constructor(
        private route: ActivatedRoute,
        private categoryService: CategoryService) { 
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    if (id === 'new') return of(new Category());
                    return this.categoryService.findById(id)
                })
            )
            .subscribe(
                category => { 
                    this.category = category; 
                    this.errors = ''; 
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );
    }

    save() {
        this.categoryService.save(this.category).subscribe(
            category => { 
                this.category = category; 
                this.errors = 'Save was successful!'; 
            },
            err => { 
                this.errors = 'Error saving'; 
            }
        );
    }
}