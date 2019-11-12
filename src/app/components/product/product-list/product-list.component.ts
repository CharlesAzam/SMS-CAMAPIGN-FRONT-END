import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProductFilter } from '../product-filter';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
    selector: 'product',
    templateUrl: 'product-list.component.html'
})
export class ProductListComponent {

    filter = new ProductFilter();
    selectedProduct: Product;

    get productList(): Product[] {
        return this.productService.productList;
    }

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
    }

    search(): void {
        this.productService.load(this.filter);
    }

    select(selected: Product): void {
        this.selectedProduct = selected;
    }

}
