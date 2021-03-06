import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { startWith, tap } from 'rxjs/operators';
import { WarningDialog } from '../../warning-dialog/dialog-warning';
import * as moment from 'moment'


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

    displayedColumns: string[] = ['position', 'name','Created','Updated', 'actions'];
    count: number
    dataSource = new MatTableDataSource<any>([]);

    DateFormatter(param){
        let date=param;
        return moment(date).format('MM/DD/YYYY h:mm A');
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    //Function to edit role 
    editRole(row){
        console.log("Editing user role "+JSON.stringify(row));
        this.router.navigate(['../role',`${row}`])
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
                this.dataSource = new MatTableDataSource<any>(response.data); 
                this.count = response.data.length
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
