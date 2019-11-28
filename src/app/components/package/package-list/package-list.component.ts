import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PackageFilter } from '../package-filter';
import { PackageService } from '../package.service';
import { Package } from '../package';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { tap, startWith } from 'rxjs/operators';

@Component({
    selector: 'package',
    templateUrl: 'package-list.component.html'
})
export class PackageListComponent implements OnInit, AfterViewInit {


    ngAfterViewInit(): void {
        // let pageIndex = this.paginator.pageIndex + 1

        this.paginator.page.pipe(
            startWith(null),
            tap(() => this.getPackageList(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
    }
    @ViewChild(MatPaginator, { static: false })
    paginator: MatPaginator

    count: number;

    @ViewChild(MatSort, { static: false }) sort: MatSort;


    filter = new PackageFilter();
    selectedPackage: Package;
    planInfo = null;

    dataSource = new MatTableDataSource<any>([]);

    displayedColumns: string[] = ['No', 'name', 'description', 'action']
    constructor(private packageService: PackageService, private router: Router) {
    }

    ngOnInit() {
        // this.getPlanInfo();
        // this.dataSource.paginator = this.paginator;
        this.getPackageCount();
        // this.dataSource.sort = this.sort;
    }


    getPackageList(index, size) {
        this.packageService.findPackageList(index, size).subscribe(
            response => {
                this.dataSource = response.data;
            }, err => {
                console.log('=========>', err)

            }
        )
    }
    getPlanInfo() {
        this.packageService.findAzamPackageMappingList()
            .subscribe(
                planInfo => {
                    this.planInfo = planInfo.data
                },
                err => {
                    console.log(err)
                    // this.router.navigate([''])

                }
            )
    }

    removePackage(pack, index) {
        this.packageService.delete(pack).subscribe((response: any) => {
            console.log(response)
            if (response.status === 200) {
                this.getPackageList(this.paginator.pageIndex, this.paginator.pageSize)
            }
        })
    }

    getPackageCount() {
        this.packageService.getCount().subscribe((response: any) => {
            if (response.success)
                this.count = response.count;
        },
            error => console.error(error));
    }

    search(): void {
        this.packageService.load(this.filter);
    }

    select(selected: Package): void {
        this.selectedPackage = selected;
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
