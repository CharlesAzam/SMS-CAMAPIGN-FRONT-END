import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VideoLibraryFilter } from '../video-library-filter';
import { VideoLibraryService } from '../video-library.service';
import { VideoLibrary } from '../video-library';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';


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

    displayedColumns: string[] = ['id', 'title', 'streamURL', 'action']



    get videoLibraryList(): VideoLibrary[] {
        // return this.videoLibraryService.videoLibraryList;
        return [
            {  title: 'Dolemite Movie', streamURL: 'https://google.com' },
            {  title: 'Dolemite Movie', streamURL: 'https://google.com' },
            {  title: 'Dolemite Movie', streamURL: 'https://google.com' },
            {  title: 'Dolemite Movie', streamURL: 'https://google.com' }
        ]
    }

    constructor(private videoLibraryService: VideoLibraryService, private router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.getVideoLibrary();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }



    delete(id){
        this.videoLibraryService.delete(id).subscribe(
            response => {
                console.log(response);
                this.getVideoLibrary()
            },
            err =>{
                console.log(err);
            }
        )
    }

    getVideoLibrary() {
        this.videoLibraryService.find().subscribe((response: any) => {
          if (response.status === 200) {
              console.log("-------------", response);
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

}
