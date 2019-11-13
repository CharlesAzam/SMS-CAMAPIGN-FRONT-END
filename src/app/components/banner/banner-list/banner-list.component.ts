import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BannerFilter } from '../banner-filter';
import { BannerService } from '../banner.service';
import { Banner } from '../banner';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'banner',
    templateUrl: 'banner-list.component.html'
})
export class BannerListComponent {

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    filter = new BannerFilter();
    selectedBanner: Banner;
    dataSource = new MatTableDataSource<Banner>(this.bannerList);

    displayedColumns: string[] = ['id', 'name', 'description', 'status', 'action']


    get bannerList(): Banner[] {
        // return this.bannerService.bannerList;
        return [
            { id: "1", name: "Silver Package", description: "Silver package description", image: 'http://google.com', isDeleted: false, priority: 1, status: true },
            { id: "1", name: "Silver Package", description: "Silver package description", image: 'http://google.com', isDeleted: false, priority: 1, status: true },
            { id: "1", name: "Silver Package", description: "Silver package description", image: 'http://google.com', isDeleted: false, priority: 1, status: true },
            { id: "1", name: "Silver Package", description: "Silver package description", image: 'http://google.com', isDeleted: false, priority: 1, status: true },
            { id: "1", name: "Silver Package", description: "Silver package description", image: 'http://google.com', isDeleted: false, priority: 1, status: true },
            { id: "1", name: "Silver Package", description: "Silver package description", image: 'http://google.com', isDeleted: false, priority: 1, status: true },
        ]
    }

    constructor(private bannerService: BannerService) {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    search(): void {
        this.bannerService.load(this.filter);
    }

    select(selected: Banner): void {
        this.selectedBanner = selected;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
