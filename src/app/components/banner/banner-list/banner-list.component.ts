import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BannerFilter } from '../banner-filter';
import { BannerService } from '../banner.service';
import { Banner } from '../banner';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { startWith, tap } from 'rxjs/operators';

@Component({
    selector: 'banner',
    templateUrl: 'banner-list.component.html'
})
export class BannerListComponent {

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    ngAfterViewInit(): void {

        this.paginator.page.pipe(
            startWith(null),
            tap(() => this.getBanners(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
    }
    @ViewChild(MatPaginator, { static: false })
    paginator: MatPaginator

    filter = new BannerFilter();
    selectedBanner: Banner;
    dataSource = new MatTableDataSource<Banner>([]);
    count: number;

    displayedColumns: string[] = ['id', 'name', 'description', 'status', 'action']

    constructor(private bannerService: BannerService) {
    }

    delete(row) {
        this.bannerService.delete(row._id).subscribe((response: any) => {
            if (response.status === 200) {
                this.getBanners(this.paginator.pageIndex, this.paginator.pageSize);
            }
        },
            error => console.error(error))
    }

    ngOnInit() {
        this.getCount();
        // this.getBanners(this.paginator.pageIndex, this.paginator.pageSize);
        // this.dataSource.paginator = this.paginator;
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

    getBanners(index, size) {
        this.bannerService.find(index, size).subscribe((response: any) => {
            if (response.status === 200) {
                this.dataSource = new MatTableDataSource(response.data)
            }
        },
            error => console.error(error))
    }

    getCount() {
        this.bannerService.getCount().subscribe((response: any) => {
            console.log(response)
            if (response.success) {
                this.count = response.count;
                console.log(this.count)
            }
        },
            error => console.error(error))
    }

}
