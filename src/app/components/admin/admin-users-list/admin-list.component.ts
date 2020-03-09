import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { startWith, tap } from 'rxjs/operators';
import { WarningDialog } from '../../warning-dialog/dialog-warning';


@Component({
    selector: 'admin-users',
    templateUrl: 'admin-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class AdminUsersListComponent implements OnInit {
    // ngAfterViewInit(): void {
    //     // let pageIndex = this.paginator.pageIndex + 1

    //     this.paginator.page.pipe(
    //         startWith(null),
    //         tap(() => this.getUserList(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
    // }
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator

    constructor(
        private dialog: MatDialog,
        private adminService: AdminService) { }

    displayedColumns: string[] = ['position','name','Role','Status', 'symbol'];
    count: number
    dataSource = new MatTableDataSource<any>([]);

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
        this.getUserList();
        this.dataSource.paginator = this.paginator;

    }

    getUserList(pageIndex?, pageSize?) {
        this.adminService.listUsers(pageIndex, pageSize).subscribe((response: any) => {
            if (response.status === 200) {
                this.dataSource = new MatTableDataSource<any>(response.data);
                this.count = response.data.length;
            }
        }, error => console.log(error));
    }

    removeUser(row) {

        this.dialog
            .open(WarningDialog, {
                width: "400px",
                data: {
                    title: "Warning",
                    message: `Are you sure want to delete ${row.username} `
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.adminService.deleteUser(row._id).subscribe((response: any) => {
                        if (response.status === 200) {
                            this.getUserList();
                        }
                    }, error => console.log(error));
                }
            });

    }

    editUser(row) {
        console.log("Editing Role"+JSON.stringify(row))
        // this.dialog
        //     .open(WarningDialog, {
        //         width: "400px",
        //         data: {
        //             title: "Warning",
        //             message: `Are you sure want to delete ${row.username} `
        //         }
        //     })
        //     .afterClosed()
        //     .subscribe(result => {
        //         if (result) {
        //             this.adminService.deleteUser(row._id).subscribe((response: any) => {
        //                 if (response.status === 200) {
        //                     this.getUserList();
        //                 }
        //             }, error => console.log(error));
        //         }
        //     });

    }

}
