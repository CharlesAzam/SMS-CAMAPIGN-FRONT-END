import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VodFilter } from '../vod-filter';
import { VodService } from '../vod.service';
import { Vod } from '../vod';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

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


    displayedColumns: string[] = ['id', 'Title', 'Category', 'subCategoryID', 'status'];

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

    constructor(private vodService: VodService) {
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
