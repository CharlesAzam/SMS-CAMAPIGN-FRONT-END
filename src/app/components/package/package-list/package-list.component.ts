import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PackageFilter } from '../package-filter';
import { PackageService } from '../package.service';
import { Package } from '../package';

@Component({
    selector: 'package',
    templateUrl: 'package-list.component.html'
})
export class PackageListComponent {

    filter = new PackageFilter();
    selectedPackage: Package;

    get packageList(): Package[] {
        return this.packageService.packageList;
    }

    constructor(private packageService: PackageService) {
    }

    ngOnInit() {
    }

    search(): void {
        this.packageService.load(this.filter);
    }

    select(selected: Package): void {
        this.selectedPackage = selected;
    }

}
