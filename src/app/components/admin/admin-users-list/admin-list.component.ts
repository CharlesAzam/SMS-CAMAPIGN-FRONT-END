import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AdminFilter } from '../admin-filter';
import { AdminService } from '../admin.service';
import { Admin } from '../admin';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { startWith, tap } from 'rxjs/operators';


@Component({
    selector: 'admin-users',
    templateUrl: 'admin-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class AdminUsersListComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        // let pageIndex = this.paginator.pageIndex + 1

        this.paginator.page.pipe(
            startWith(null),
            tap(() => this.getCategories(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
    }
    @ViewChild(MatPaginator, { static: false })
    paginator: MatPaginator

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute, ) { }

    displayedColumns: string[] = ['position', 'name', 'Status', 'symbol'];
    count: number
    dataSource = new MatTableDataSource<any>([]);


    /*Table logic*/
    deleteCategory(row) {

    }

    editCategory(row) {
        this.router.navigate(['home/CategoryForm', row._id]);
    }

    routeToCategoryForm() {
        this.router.navigate(['home/admin/new']);

    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    /*Table logic*/

    ngOnInit() {
        this.getCategoryCount();
        // this.getCategories(1, 5);
    }

    getCategories(pageNumber, size) {

    }

    getCategoryCount() {

    }

}
