import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PackageFilter } from '../package-filter';
import { PackageService } from '../package.service';
import { Package } from '../package';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'package',
    templateUrl: 'package-list.component.html'
})
export class PackageListComponent {

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    filter = new PackageFilter();
    selectedPackage: Package;
    planInfo = null;

    dataSource = new MatTableDataSource<Package>(this.packageList);

    displayedColumns: string[] = ['id', 'name', 'description', 'channels', 'status', 'action']

    get packageList(): Package[] {
        // return this.packageService.packageList;
        return [

            { id: "1", name: "Silver Package", description: "Silver package description", content: ['ITV', 'TBC'], free: false, azamPacakgeMappingName:"TAC",isVodAllowed: true, status: true, isVodContentsUnlimited: true, noOfDaysValidity: "20 days", noOfVodContents: "9" },
            { id: "1", name: "Silver Package", description: "Silver package description", content: ['ITV', 'TBC'], free: false, azamPacakgeMappingName:"TAC",isVodAllowed: true, status: true, isVodContentsUnlimited: true, noOfDaysValidity: "20 days", noOfVodContents: "9" },
            { id: "1", name: "Silver Package", description: "Silver package description", content: ['ITV', 'TBC'], free: false, azamPacakgeMappingName:"TAC",isVodAllowed: true, status: true, isVodContentsUnlimited: true, noOfDaysValidity: "20 days", noOfVodContents: "9" },
            { id: "1", name: "Silver Package", description: "Silver package description", content: ['ITV', 'TBC'], free: false, azamPacakgeMappingName:"TAC",isVodAllowed: true, status: true, isVodContentsUnlimited: true, noOfDaysValidity: "20 days", noOfVodContents: "9" },
            { id: "1", name: "Silver Package", description: "Silver package description", content: ['ITV', 'TBC'], free: false, azamPacakgeMappingName:"TAC",isVodAllowed: true, status: true, isVodContentsUnlimited: true, noOfDaysValidity: "20 days", noOfVodContents: "9" },

        ]
    }

    constructor(private packageService: PackageService, private router: Router) {
    }

    ngOnInit() {
        this.getPlanInfo();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getPlanInfo() {
        this.packageService.findAzamPackageMappingList()
        .subscribe(
            planInfo => {
                console.log("planInfo---->",planInfo.data)
                this.planInfo = planInfo.data
            },
            err => {
                console.log(err)
                // this.router.navigate([''])

            }
        )
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
