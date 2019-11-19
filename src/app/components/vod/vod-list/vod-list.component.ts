import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VodFilter } from '../vod-filter';
import { VodService } from '../vod.service';
import { Vod } from '../vod';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'vod',
    templateUrl: 'vod-list.component.html'
})
export class VodListComponent implements OnInit {

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    filter = new VodFilter();
    selectedVod: Vod;
    dataSource = new MatTableDataSource<Vod>(this.vodList);


    openDialog() {
        const dialogRef = this.dialog.open(ContentDialog, {
            width: '400px',
            data: {}
        })
    }


    displayedColumns: string[] = ['id', 'Title', 'Category', 'subCategoryID', 'status', 'action'];

    get vodList(): Vod[] {
        return [{ id: "1", Status: 'ACTIVE', subCategoryID: ['Movies', 'Categories'], boundingBox: 'rectangle', categoryID: ['Movies', 'Categories'], cdnId: '1234', country: 'Tanzania', descriptions: 'demo', director: 'Mussa Banzi', duration: '12hrs', imageThumb: 'http://google.com/', isFree: true, isFreeForAzam: false, languageDetail: 'tz', releaseDate: '12/12/1212', starring: 'james bond', tags: ['action'], title: 'The end' },
        { id: "1", Status: 'ACTIVE', subCategoryID: ['Movies', 'Categories'], boundingBox: 'rectangle', categoryID: ['Movies', 'Categories'], cdnId: '1234', country: 'Tanzania', descriptions: 'demo', director: 'Mussa Banzi', duration: '12hrs', imageThumb: 'http://google.com/', isFree: true, isFreeForAzam: false, languageDetail: 'tz', releaseDate: '12/12/1212', starring: 'james bond', tags: ['action'], title: 'The end' },
        { id: "1", Status: 'ACTIVE', subCategoryID: ['Movies', 'Categories'], boundingBox: 'rectangle', categoryID: ['Movies', 'Categories'], cdnId: '1234', country: 'Tanzania', descriptions: 'demo', director: 'Mussa Banzi', duration: '12hrs', imageThumb: 'http://google.com/', isFree: true, isFreeForAzam: false, languageDetail: 'tz', releaseDate: '12/12/1212', starring: 'james bond', tags: ['action'], title: 'The end' },
        { id: "1", Status: 'ACTIVE', subCategoryID: ['Movies', 'Categories'], boundingBox: 'rectangle', categoryID: ['Movies', 'Categories'], cdnId: '1234', country: 'Tanzania', descriptions: 'demo', director: 'Mussa Banzi', duration: '12hrs', imageThumb: 'http://google.com/', isFree: true, isFreeForAzam: false, languageDetail: 'tz', releaseDate: '12/12/1212', starring: 'james bond', tags: ['action'], title: 'The end' },
        { id: "1", Status: 'ACTIVE', subCategoryID: ['Movies', 'Categories'], boundingBox: 'rectangle', categoryID: ['Movies', 'Categories'], cdnId: '1234', country: 'Tanzania', descriptions: 'demo', director: 'Mussa Banzi', duration: '12hrs', imageThumb: 'http://google.com/', isFree: true, isFreeForAzam: false, languageDetail: 'tz', releaseDate: '12/12/1212', starring: 'james bond', tags: ['action'], title: 'The end' },
        { id: "1", Status: 'ACTIVE', subCategoryID: ['Movies', 'Categories'], boundingBox: 'rectangle', categoryID: ['Movies', 'Categories'], cdnId: '1234', country: 'Tanzania', descriptions: 'demo', director: 'Mussa Banzi', duration: '12hrs', imageThumb: 'http://google.com/', isFree: true, isFreeForAzam: false, languageDetail: 'tz', releaseDate: '12/12/1212', starring: 'james bond', tags: ['action'], title: 'The end' },
        { id: "1", Status: 'ACTIVE', subCategoryID: ['Movies', 'Categories'], boundingBox: 'rectangle', categoryID: ['Movies', 'Categories'], cdnId: '1234', country: 'Tanzania', descriptions: 'demo', director: 'Mussa Banzi', duration: '12hrs', imageThumb: 'http://google.com/', isFree: true, isFreeForAzam: false, languageDetail: 'tz', releaseDate: '12/12/1212', starring: 'james bond', tags: ['action'], title: 'The end' },
        { id: "1", Status: 'ACTIVE', subCategoryID: ['Movies', 'Categories'], boundingBox: 'rectangle', categoryID: ['Movies', 'Categories'], cdnId: '1234', country: 'Tanzania', descriptions: 'demo', director: 'Mussa Banzi', duration: '12hrs', imageThumb: 'http://google.com/', isFree: true, isFreeForAzam: false, languageDetail: 'tz', releaseDate: '12/12/1212', starring: 'james bond', tags: ['action'], title: 'The end' },
        { id: "1", Status: 'ACTIVE', subCategoryID: ['Movies', 'Categories'], boundingBox: 'rectangle', categoryID: ['Movies', 'Categories'], cdnId: '1234', country: 'Tanzania', descriptions: 'demo', director: 'Mussa Banzi', duration: '12hrs', imageThumb: 'http://google.com/', isFree: true, isFreeForAzam: false, languageDetail: 'tz', releaseDate: '12/12/1212', starring: 'james bond', tags: ['action'], title: 'The end' },
        { id: "1", Status: 'ACTIVE', subCategoryID: ['Movies', 'Categories'], boundingBox: 'rectangle', categoryID: ['Movies', 'Categories'], cdnId: '1234', country: 'Tanzania', descriptions: 'demo', director: 'Mussa Banzi', duration: '12hrs', imageThumb: 'http://google.com/', isFree: true, isFreeForAzam: false, languageDetail: 'tz', releaseDate: '12/12/1212', starring: 'james bond', tags: ['action'], title: 'The end' },
        { id: "1", Status: 'ACTIVE', subCategoryID: ['Movies', 'Categories'], boundingBox: 'rectangle', categoryID: ['Movies', 'Categories'], cdnId: '1234', country: 'Tanzania', descriptions: 'demo', director: 'Mussa Banzi', duration: '12hrs', imageThumb: 'http://google.com/', isFree: true, isFreeForAzam: false, languageDetail: 'tz', releaseDate: '12/12/1212', starring: 'james bond', tags: ['action'], title: 'The end' }]

    }

    constructor(private vodService: VodService, private dialog: MatDialog) {
    }

    search(): void {
        this.vodService.load(this.filter);
    }

    select(selected: Vod): void {
        this.selectedVod = selected;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}

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