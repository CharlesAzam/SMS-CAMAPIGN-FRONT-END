import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { PackageFilter } from "../package-filter";
import { PackageService } from "../package.service";
import { Package } from "../package";
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialog,
} from "@angular/material";
import { Router } from "@angular/router";
import { tap, startWith } from "rxjs/operators";
import { WarningDialog } from "../../warning-dialog/dialog-warning";
import { AuthenticationService } from "../../login/login.service";

@Component({
  selector: "package",
  templateUrl: "package-list.component.html",
})
export class PackageListComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    // let pageIndex = this.paginator.pageIndex + 1

    this.paginator.page
      .pipe(
        startWith(null),
        tap(() =>
          this.getPackageList(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          )
        )
      )
      .subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  count: number;
  filterText: string;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  filter = new PackageFilter();
  selectedPackage: Package;
  planInfo = null;

  searchTimeout = null;

  dataSource = new MatTableDataSource<any>([]);

  displayedColumns: string[] = ["No", "name", "description", "action"];
  constructor(
    private packageService: PackageService,
    private dialog: MatDialog,
    private router: Router,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // this.getPlanInfo();
    // this.dataSource.paginator = this.paginator;
    this.getPackageCount();
    // this.dataSource.sort = this.sort;
  }

  getPackageList(index, size, filterText?) {
    if (this.filterText) filterText = this.filterText;
    this.packageService.findPackageList(index, size, filterText).subscribe(
      (response) => {
        this.dataSource = response.data;
        this.count = response.count;
      },
      (err) => {
        console.log("=========>", err);
      }
    );
  }
  getPlanInfo() {
    this.packageService.findAzamPackageMappingList().subscribe(
      (planInfo) => {
        this.planInfo = planInfo.data;
      },
      (err) => {
        console.log(err);
        // this.router.navigate([''])
      }
    );
  }

  removePackage(row, index?) {
    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: "Warning",
          message: `Are you sure want to delete ${row.name} program`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.packageService.delete(row).subscribe((response: any) => {
            if (response.status === 200) {
              this.getPackageCount();
              this.getPackageList(
                this.paginator.pageIndex + 1,
                this.paginator.pageSize
              );
            }
          });
        }
      });
  }

  getPackageCount() {
    this.packageService.getCount().subscribe(
      (response: any) => {
        if (response.success) this.count = response.count;
      },
      (error) => console.error(error)
    );
  }

  search(): void {
    this.packageService.load(this.filter);
  }

  select(selected: Package): void {
    this.selectedPackage = selected;
  }
  applyFilter(filterValue: string) {
    this.filterText = filterValue;
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.getPackageList(
        1,
        this.paginator.pageSize,
        this.filterText.trim().toLowerCase()
      );
    }, 500);
  }
}
