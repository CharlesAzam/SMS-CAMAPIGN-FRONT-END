import { Component, OnInit, ViewChild } from "@angular/core";
import { BannerFilter } from "../banner-filter";
import { BannerService } from "../banner.service";
import { Banner } from "../banner";
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
  selector: "banner",
  templateUrl: "banner-list.component.html",
})
export class BannerListComponent {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchTimeout = null;

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith(null),
        tap(() =>
          this.getBanners(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize,
            ""
          )
        )
      )
      .subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  filter = new BannerFilter();
  selectedBanner: Banner;
  dataSource = new MatTableDataSource<Banner>([]);
  count: number;

  displayedColumns: string[] = [
    "No",
    "name",
    "description",
    "status",
    "action",
  ];

  constructor(
    private bannerService: BannerService,
    private dialog: MatDialog,
    public authenticationService: AuthenticationService
  ) {}

  delete(row) {
    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: "Warning",
          message: `Are you sure want to delete ${row.name} banner`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.bannerService.delete(row._id).subscribe(
            (response: any) => {
              if (response.status === 200) {
                this.getBanners(
                  this.paginator.pageIndex + 1,
                  this.paginator.pageSize,
                  ""
                );
              }
            },
            (error) => console.error(error)
          );
        }
      });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  search(): void {
    this.bannerService.load(this.filter);
  }

  select(selected: Banner): void {
    this.selectedBanner = selected;
  }

  applyFilter(filterValue: string) {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.getBanners(
        this.paginator.pageIndex + 1,
        this.paginator.pageSize,
        filterValue
      );
    }, 500);
  }

  getBanners(index, size, filter) {
    this.bannerService.find(index, size, filter).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.dataSource = new MatTableDataSource(response.data);
          this.count = response.count;
        }
      },
      (error) => console.error(error)
    );
  }

  getCount() {
    this.bannerService.getCount().subscribe(
      (response: any) => {
        console.log(response);
        if (response.success) {
          this.count = response.count;
          console.log(this.count);
        }
      },
      (error) => console.error(error)
    );
  }
}
