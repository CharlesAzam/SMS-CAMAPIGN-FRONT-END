import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VideoLibraryFilter } from '../video-library-filter';
import { VideoLibraryService } from '../video-library.service';
import { VideoLibrary } from '../video-library';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { startWith, tap } from 'rxjs/operators';


@Component({
    selector: 'video-library',
    templateUrl: 'video-library-list.component.html'
})
export class VideoLibraryListComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

    ngAfterViewInit(): void {
        // let pageIndex = this.paginator.pageIndex + 1

        this.paginator.page.pipe(
            startWith(null),
            tap(() => this.getVideoLibrary(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
    }

    filter = new VideoLibraryFilter();
    selectedVideoLibrary: VideoLibrary;
    dataSource = new MatTableDataSource<VideoLibrary>([]);

    displayedColumns: string[] = ['id', 'title', 'streamURL', 'action']
    count: number


    constructor(private videoLibraryService: VideoLibraryService, private router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.getCount();
        this.dataSource.sort = this.sort;
    }



    delete(id) {
        this.videoLibraryService.delete(id).subscribe(
            response => {
                console.log(response);
                this.getVideoLibrary(this.paginator.pageIndex, this.paginator.pageSize)
            },
            err => {
                console.log(err);
            }
        )
    }

    getVideoLibrary(index, size) {
        this.videoLibraryService.find(index, size).subscribe((response: any) => {
            console.log(response)
            if (response.status === 200) {
                this.dataSource = new MatTableDataSource<any>(response.data)
            }
        }, error => console.log(error))
    }

    // search(): void {
    //     this.videoLibraryService.load(this.filter);
    // }

    select(selected: VideoLibrary): void {
        this.selectedVideoLibrary = selected;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getCount() {
        this.videoLibraryService.getCount().subscribe((response: any) => {
            console.log(response)
            if (response.success) {
                this.count = response.count;
            }
        })
    }

}
