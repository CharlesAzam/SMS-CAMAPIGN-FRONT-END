import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { VideoLibraryFilter } from "../video-library-filter";
import { VideoLibraryService } from "../video-library.service";
import { VideoLibrary } from "../video-library";
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialog
} from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { startWith, tap } from "rxjs/operators";
import { WarningDialog } from "../../warning-dialog/dialog-warning";

@Component({
  selector: "video-library",
  templateUrl: "video-library-list.component.html"
})
export class VideoLibraryListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngAfterViewInit(): void {
    // let pageIndex = this.paginator.pageIndex + 1

    this.paginator.page
      .pipe(
        startWith(null),
        tap(() =>
          this.getVideoLibrary(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          )
        )
      )
      .subscribe();
  }

  filter = new VideoLibraryFilter();
  filterText: string;
  selectedVideoLibrary: VideoLibrary;
  dataSource = new MatTableDataSource<VideoLibrary>([]);

  displayedColumns: string[] = ["id", "title", "action"];
  count: number;
  searchTimeout = null;

  constructor(
    private videoLibraryService: VideoLibraryService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCount();
    this.dataSource.sort = this.sort;
  }

  delete(data) {
    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: "Warning",
          message: `Are you sure want to delete ${data.name} video library`
        }
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.videoLibraryService.delete(data._id).subscribe(
            response => {
              console.log(response);
              this.getVideoLibrary(
                this.paginator.pageIndex + 1,
                this.paginator.pageSize
              );
            },
            err => {
              console.log(err);
            }
          );
        }
      });
  }

  getVideoLibrary(index, size, filterValue?) {
    this.videoLibraryService.find(index, size, this.filterText).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.dataSource = new MatTableDataSource<any>(response.data);
        }
      },
      error => console.log(error)
    );
  }

  select(selected: VideoLibrary): void {
    this.selectedVideoLibrary = selected;
  }

  applyFilter(filterValue: string) {
    this.filterText = filterValue.trim().toLowerCase();
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.getVideoLibrary(1, this.paginator.pageSize, this.filterText);
    }, 500);
  }

  getCount() {
    this.videoLibraryService.getCount().subscribe((response: any) => {
      if (response.success) {
        this.count = response.count;
      }
    });
  }
}
