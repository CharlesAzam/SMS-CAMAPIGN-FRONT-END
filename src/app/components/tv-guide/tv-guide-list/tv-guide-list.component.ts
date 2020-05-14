import { Component, OnInit, ViewChild } from "@angular/core";
import { GuideFilter } from "../tv-guide-filter";
import { GuideService } from "../tv-guide.service";
import { Guide } from "../tv-guide";
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialog,
} from "@angular/material";
import { startWith, tap } from "rxjs/operators";
import { WarningDialog } from "../../warning-dialog/dialog-warning";
import { AuthenticationService } from "../../login/login.service";

@Component({
  selector: "tv-guide",
  templateUrl: "tv-guide-list.component.html",
})
export class GuideListComponent {
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith(null),
        tap(() =>
          this.getGuides(this.paginator.pageIndex + 1, this.paginator.pageSize)
        )
      )
      .subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  filter = new GuideFilter();
  selectedGuide: Guide;
  dataSource = new MatTableDataSource<Guide>([]);
  count: number;

  displayedColumns: string[] = [
    "No",
    "name",
    "synopsis",
    "duration",
    "time",
    "action",
  ];
  searchTimeout = null;
  filterText: string = "";

  constructor(
    private guideService: GuideService,
    private dialog: MatDialog,
    public authenticationService: AuthenticationService
  ) {}

  delete(row) {
    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: "Warning",
          message: `Are you sure want to delete ${row.name} guide`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.guideService.delete(row._id).subscribe(
            (response: any) => {
              if (response.status === 200) {
                this.getGuides(
                  this.paginator.pageIndex + 1,
                  this.paginator.pageSize
                );
              }
            },
            (error) => console.error(error)
          );
        }
      });
  }

  ngOnInit() {
    // this.getCount();
    // this.getBanners(this.paginator.pageIndex, this.paginator.pageSize);
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(): void {
    this.guideService.load(this.filter);
  }

  select(selected: Guide): void {
    this.selectedGuide = selected;
  }

  applyFilter(filterValue: string) {
    if (filterValue.trim().length >= 3 || filterValue.length < this.filterText.length) {
      this.filterText = filterValue;
      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.getGuides(
          1,
          this.paginator.pageSize,
        );
      }, 500);
    }
  }

  getGuides(index, size) {
    console.log(index);
    this.guideService.find(index, size, this.filterText).subscribe(
      (response: any) => {
        if (response.success) {
          this.dataSource = new MatTableDataSource(response.data);
          this.count = response.count;
        }
      },
      (error) => console.error(error)
    );
  }


}
