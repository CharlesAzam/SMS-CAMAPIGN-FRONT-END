import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PackageFilter } from '../package-filter';
import { PackageService } from '../package.service';
import { Package } from '../package';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'package',
    templateUrl: 'package-list.component.html'
})
export class PackageListComponent {

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    filter = new PackageFilter();
    selectedPackage: Package;

    dataSource = new MatTableDataSource<Package>(this.packageList);

    displayedColumns: string[] = ['id', 'name', 'description', 'channels', 'status', 'action']

    get packageList(): Package[] {
        // return this.packageService.packageList;
        return [
            { id: "1", name: "Silver Package", description: "Silver package description", channels: ['ITV', 'TBC'], free: false, isVodAllowed: true, status: true, isVodContentsUnlimited: true, noOfDaysValidity: "20 days", noOfVodContents: "9" },
            { id: "1", name: "Silver Package", description: "Silver package description", channels: ['ITV', 'TBC'], free: false, isVodAllowed: true, status: true, isVodContentsUnlimited: true, noOfDaysValidity: "20 days", noOfVodContents: "9" },
            { id: "1", name: "Silver Package", description: "Silver package description", channels: ['ITV', 'TBC'], free: false, isVodAllowed: true, status: true, isVodContentsUnlimited: true, noOfDaysValidity: "20 days", noOfVodContents: "9" },
            { id: "1", name: "Silver Package", description: "Silver package description", channels: ['ITV', 'TBC'], free: false, isVodAllowed: true, status: true, isVodContentsUnlimited: true, noOfDaysValidity: "20 days", noOfVodContents: "9" },
            { id: "1", name: "Silver Package", description: "Silver package description", channels: ['ITV', 'TBC'], free: false, isVodAllowed: true, status: true, isVodContentsUnlimited: true, noOfDaysValidity: "20 days", noOfVodContents: "9" },

        ]
    }

    constructor(private packageService: PackageService) {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
