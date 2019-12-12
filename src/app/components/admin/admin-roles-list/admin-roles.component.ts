import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AdminFilter } from '../admin-filter';
import { AdminService } from '../admin.service';
import { Admin } from '../admin';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { startWith, tap } from 'rxjs/operators';


@Component({
    selector: 'admin-roles',
    templateUrl: 'admin-roles.component.html',
    styleUrls: ['./user-list.component.css']
})
export class RoleListComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        // let pageIndex = this.paginator.pageIndex + 1

        this.paginator.page.pipe(
            startWith(null),
            tap(() => this.getRoles(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
    }
    @ViewChild(MatPaginator, { static: false })
    paginator: MatPaginator

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private roleService: AdminService) { }

    displayedColumns: string[] = ['position', 'name'];
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
    }

    getRoles(pageNumber, size) {
        this.roleService.listRoles(pageNumber, size).subscribe((response: any) => {
            if (response.status === 200) {
                this.dataSource = response.data;
            }
        });
    }

    getCategoryCount() {

    }

}
