import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VideoLibraryFilter } from '../video-library-filter';
import { VideoLibraryService } from '../video-library.service';
import { VideoLibrary } from '../video-library';

@Component({
    selector: 'video-library',
    templateUrl: 'video-library-list.component.html'
})
export class VideoLibraryListComponent {

    filter = new VideoLibraryFilter();
    selectedVideoLibrary: VideoLibrary;

    get videoLibraryList(): VideoLibrary[] {
        return this.videoLibraryService.videoLibraryList;
    }

    constructor(private videoLibraryService: VideoLibraryService) {
    }

    ngOnInit() {
    }

    search(): void {
        this.videoLibraryService.load(this.filter);
    }

    select(selected: VideoLibrary): void {
        this.selectedVideoLibrary = selected;
    }

}
