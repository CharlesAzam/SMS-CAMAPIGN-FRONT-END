import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {

    id: string;
    product: Product;
    errors: string;
    currencies: any[] = [
        'TZS',
        'USD'
    ]

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService) { 
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    if (id === 'new') return of(new Product());
                    return this.productService.findById(id)
                })
            )
            .subscribe(
                product => { 
                    this.product = product; 
                    this.errors = ''; 
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );
    }

    save() {
        this.productService.save(this.product).subscribe(
            product => { 
                this.product = product; 
                this.errors = 'Save was successful!'; 
            },
            err => { 
                this.errors = 'Error saving'; 
            }
        );
    }
}