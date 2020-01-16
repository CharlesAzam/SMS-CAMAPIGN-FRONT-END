import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { startWith, tap } from 'rxjs/operators';
import { WarningDialog } from '../../warning-dialog/dialog-warning';


@Component({
    selector: 'admin-roles',
    templateUrl: 'admin-roles.component.html',
    styleUrls: ['./user-list.component.css']
})
export class RoleListComponent implements OnInit, AfterViewInit {

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private adminService: AdminService,
        private dialog: MatDialog) { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.paginator.page.pipe(
            startWith(null),
            tap(() => this.getRoles(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
    }
    @ViewChild(MatPaginator, { static: false })
    paginator: MatPaginator

    displayedColumns: string[] = ['position', 'name', 'actions'];
    count: number
    dataSource = new MatTableDataSource<any>([]);

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteRole(row) {
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
                    }, error => this.displayErrorDialog(error));
                }
            });
    }

    getRoles(pageNumber?, size?) {
        this.adminService.listRoles(pageNumber, size).subscribe((response: any) => {
            if (response.status === 200) {
                this.dataSource = response.data;
            }
        }, error => this.displayErrorDialog(error));
    }


    displayErrorDialog(error) {
        this.dialog
            .open(WarningDialog, {
                width: "400px",
                data: {
                    title: "Error",
                    message: error.message
                }
            })
            .afterClosed()
            .subscribe();
    }



}
