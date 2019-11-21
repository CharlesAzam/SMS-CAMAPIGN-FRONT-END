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
    dataSource = new MatTableDataSource<Banner>([]);

    displayedColumns: string[] = ['id', 'name', 'description', 'status', 'action']

    constructor(private bannerService: BannerService) {
    }

    delete(row) {
        this.bannerService.delete(row._id).subscribe((response: any) => {
            if (response.status === 200) {
                this.getBanners();
            }
        },
            error => console.error(error))
    }

    ngOnInit() {
        this.getBanners();
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

    getBanners() {
        this.bannerService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.dataSource = new MatTableDataSource(response.data)
            }
        },
            error => console.error(error))
    }

}
