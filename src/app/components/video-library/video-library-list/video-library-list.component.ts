import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VideoLibraryFilter } from '../video-library-filter';
import { VideoLibraryService } from '../video-library.service';
import { VideoLibrary } from '../video-library';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'video-library',
    templateUrl: 'video-library-list.component.html'
})
export class VideoLibraryListComponent {
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    filter = new VideoLibraryFilter();
    selectedVideoLibrary: VideoLibrary;
    dataSource = new MatTableDataSource<VideoLibrary>(this.videoLibraryList);

    displayedColumns: string[] = ['id', 'title', 'streamURL', 'jwMediaID', 'duration', 'action']



    get videoLibraryList(): VideoLibrary[] {
        // return this.videoLibraryService.videoLibraryList;
        return [
            { id: '1', title: 'Dolemite Movie', streamURL: 'https://google.com', jwMediaID: 'jw1234', duration: '2 hours' },
            { id: '1', title: 'Dolemite Movie', streamURL: 'https://google.com', jwMediaID: 'jw1234', duration: '2 hours' },
            { id: '1', title: 'Dolemite Movie', streamURL: 'https://google.com', jwMediaID: 'jw1234', duration: '2 hours' },
            { id: '1', title: 'Dolemite Movie', streamURL: 'https://google.com', jwMediaID: 'jw1234', duration: '2 hours' }
        ]
    }

    constructor(private videoLibraryService: VideoLibraryService) {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    search(): void {
        this.videoLibraryService.load(this.filter);
    }

    select(selected: VideoLibrary): void {
        this.selectedVideoLibrary = selected;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
