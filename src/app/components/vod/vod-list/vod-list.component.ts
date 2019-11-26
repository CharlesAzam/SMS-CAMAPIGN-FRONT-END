import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VodFilter } from '../vod-filter';
import { VodService } from '../vod.service';
import { Vod } from '../vod';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
    selector: 'vod',
    templateUrl: 'vod-list.component.html'
})
export class VodListComponent implements OnInit {

    typeControl = new FormControl();
    count: number;

    types: string[] = [
        "VOD",
        "NEWS",
        "RADIO",
        "TVGUIDE"
    ]

    selectedType: string = this.types[0];


    @ViewChild(MatSort, { static: true }) sort: MatSort;

    ngAfterViewInit(): void {
        // let pageIndex = this.paginator.pageIndex + 1

        this.paginator.page.pipe(
            startWith(null),
            tap(() => { this.getData(this.selectedType, this.paginator.pageIndex + 1, this.paginator.pageSize) })).subscribe();
    }
    @ViewChild(MatPaginator, { static: false })
    paginator: MatPaginator

    ngOnInit(): void {
        this.getContentCount();
        this.selectedType = this.types[0];

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort


    }
    filter = new VodFilter();
    selectedVod: Vod;
    dataSource = new MatTableDataSource<any>([]);

    getContentType(event) {
        //Get count for particular vod type
        this.selectedType = event.value;
        this.getData(event.value, 1, this.paginator.pageSize)

    }


    openDialog() {
        const dialogRef = this.dialog.open(ContentDialog, {
            width: '400px',
            data: {}
        })
    }

    getData(type, page, size) {
        this.vodService.find(type, page, size).subscribe((response: any) => {
            if (response.status === 200) {
                this.dataSource = new MatTableDataSource<any>(response.data)
            }
        })
    }


    displayedColumns: string[] = ['id', 'title', 'type', 'vodType', 'status', 'action'];
    constructor(private vodService: VodService, private dialog: MatDialog) {
    }

    search(): void {
        // this.vodService.load(this.filter);
    }

    select(selected: Vod): void {
        this.selectedVod = selected;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getContentCount() {
        this.vodService.getCount().subscribe((result: any) => {
            if (result.success) {
                this.count = result.count;
            }
        })
    }

}

//Dialog
@Component({
    selector: 'dialog-content-type',
    templateUrl: '../dialog-content-type.html',
})
export class ContentDialog {

    categoryControl = new FormControl('', [Validators.required]);
    vodControl = new FormControl('', [Validators.required]);

    categories: any[] = [
        "VOD",
        "NEWS",
        "RADIO",
    ];

    vodTypes: any[] = [
        'VIDEOONDEMAND',
        'LIVETV',
        'SERIES'
    ];

    constructor(
        public dialogRef: MatDialogRef<ContentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router
    ) { }

    onSelectedCategoryForm(formType) {
        console.log(formType);
        this.router.navigate(['home/content/content', formType]);
        this.dialogRef.close();
    }

}