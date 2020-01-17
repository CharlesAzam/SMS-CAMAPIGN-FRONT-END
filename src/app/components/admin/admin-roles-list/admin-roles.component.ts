import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AdminFilter } from '../admin-filter';
import { AdminService } from '../admin.service';
import { Admin } from '../admin';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { startWith, tap } from 'rxjs/operators';
import { WarningDialog } from '../../warning-dialog/dialog-warning';


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
        private adminService: AdminService,
        private dialog: MatDialog) { }

    displayedColumns: string[] = ['position', 'name', 'actions'];
    count: number
    dataSource = new MatTableDataSource<any>([]);

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    /*Table logic*/

    ngOnInit() {
    }

    deleteRole(row) {
        console.log(row)
        this.dialog
        .open(WarningDialog, {
            width: "400px",
            data: {
                title: "Warning",
                message: `Are you sure want to delete ${row} `
            }
        })
        .afterClosed()
        .subscribe(result => {
            if (result) {
                this.adminService.deleteRole(row).subscribe((response: any) => {
                    if (response.status === 200) {
                        this.getRoles();
                    }
                }, error => console.log(error));
            }
        });
    }

    getRoles(pageNumber?, size?) {
        this.adminService.listRoles(pageNumber, size).subscribe((response: any) => {
            console.log(response)
            if (response.status === 200) {
                this.dataSource = response.data;
            }
        }, error => console.error(error));
    }



}
