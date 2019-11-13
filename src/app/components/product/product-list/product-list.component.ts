import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProductFilter } from '../product-filter';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'product',
    templateUrl: 'product-list.component.html'
})
export class ProductListComponent {

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    dataSource = new MatTableDataSource<Product>(this.productList);

    displayedColumns: string[] = ['id', 'title', 'amount', 'currency', 'status', 'action']


    filter = new ProductFilter();
    selectedProduct: Product;

    get productList(): Product[] {
        // return this.productService.productList;
        return [
            { id: '1', title: 'Play', amount: '3,000', currency: 'TZS', status: true },
            { id: '1', title: 'Play', amount: '3,000', currency: 'TZS', status: true },
            { id: '1', title: 'Play', amount: '3,000', currency: 'TZS', status: true },
            { id: '1', title: 'Play', amount: '3,000', currency: 'TZS', status: true }
        ]
    }

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    search(): void {
        this.productService.load(this.filter);
    }

    select(selected: Product): void {
        this.selectedProduct = selected;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
