import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BannerFilter } from '../banner-filter';
import { BannerService } from '../banner.service';
import { Banner } from '../banner';

@Component({
    selector: 'banner',
    templateUrl: 'banner-list.component.html'
})
export class BannerListComponent {

    filter = new BannerFilter();
    selectedBanner: Banner;

    get bannerList(): Banner[] {
        return this.bannerService.bannerList;
    }

    constructor(private bannerService: BannerService) {
    }

    ngOnInit() {
    }

    search(): void {
        this.bannerService.load(this.filter);
    }

    select(selected: Banner): void {
        this.selectedBanner = selected;
    }

}
