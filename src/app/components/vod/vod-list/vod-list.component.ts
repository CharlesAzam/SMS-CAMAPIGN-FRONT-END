import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VodFilter } from '../vod-filter';
import { VodService } from '../vod.service';
import { Vod } from '../vod';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'vod',
    templateUrl: 'vod-list.component.html'
})
export class VodListComponent implements OnInit {

    typeControl = new FormControl();

    types: string[] = [
        "vod",
        "series",
        "radio",
        "news"
    ]

    selectedType: string;


    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    ngOnInit(): void {
        this.selectedType = this.types[0];
        this.getData(this.selectedType)

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort


    }
    filter = new VodFilter();
    selectedVod: Vod;
    dataSource = new MatTableDataSource<any>([]);

    getContentType(event) {
        this.selectedType = event.value;
        this.getData(event.value)

    }


    openDialog() {
        const dialogRef = this.dialog.open(ContentDialog, {
            width: '400px',
            data: {}
        })
    }

    getData(type) {
        this.vodService.find(type, new VodFilter()).subscribe((response: any) => {
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
        "NEWS",
        "VOD",
        "RADIO",
    ];

    vodTypes: any[] = [
        'VIDEO',
        'LIVETV',
        'SERIES'
    ];

    constructor(
        public dialogRef: MatDialogRef<ContentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router
    ) { }

    onSelectedCategoryForm(formType) {
        this.router.navigate(['home/content/vod', formType]);
        this.dialogRef.close();
    }

}