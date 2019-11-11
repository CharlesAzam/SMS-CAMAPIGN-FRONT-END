import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VodFilter } from '../vod-filter';
import { VodService } from '../vod.service';
import { Vod } from '../vod';

@Component({
    selector: 'vod',
    templateUrl: 'vod-list.component.html'
})
export class VodListComponent {

    filter = new VodFilter();
    selectedVod: Vod;

    get vodList(): Vod[] {
        return this.vodService.vodList;
    }

    constructor(private vodService: VodService) {
    }

    ngOnInit() {
    }

    search(): void {
        this.vodService.load(this.filter);
    }

    select(selected: Vod): void {
        this.selectedVod = selected;
    }

}
