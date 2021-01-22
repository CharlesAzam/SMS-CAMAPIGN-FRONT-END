import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl } from "@angular/forms";
import { SubCategoriesService } from "src/app/services/sub.categories.service";
import { MatTableDataSource } from "@angular/material/table";
import { startWith, tap } from "rxjs/operators";
import { MatPaginator, MatDialog, PageEvent } from "@angular/material";
import { LanguageService } from "src/app/services/language.service";
import { WarningDialog } from "../warning-dialog/dialog-warning";
import { AuthenticationService } from "../login/login.service";
@Component({
  selector: "app-mobile-sub-categories-component",
  templateUrl: "./MobileSubCategoriesComponent.html",
  styleUrls: ["./MobileSubCategoriesComponent.css"],
})
export class MobileSubCategoriesComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subCategoryService: SubCategoriesService,
    private languageService: LanguageService,
    private dialog: MatDialog,
    public checkPermissionService: AuthenticationService
  ) {}

  languages: any[] = [];
  displayedColumns: string[] = [
    "position",
    "name",
    "category",
    "Status",
    "symbol",
  ];
  datasource = new MatTableDataSource<any>([]);
  subCategories: any[] = [];
  selectedLanguageId: string;
  pageEvent: PageEvent;
  pageIndex = 0;

  count: number;
  searchTimeout = null;
  filterText: string = "";

  routeToCategoryForm() {
    this.router.navigate(["home/subCategoryForm"]);
  }
  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getLanguages().subscribe(
      (result: any) => {
        if (result.status === 200) {
          this.languages = result.data;
          this.selectedLanguageId = result.data[0]._id;
          this.getCategoryCount(this.selectedLanguageId).subscribe(
            (response: any) => {
              if (response.success) {
                this.count = response.count;
                this.paginator.page
                  .pipe(
                    startWith(null),
                    tap(() =>
                      this.getSubCategories(
                        this.selectedLanguageId,
                        this.paginator.pageIndex + 1,
                        this.paginator.pageSize
                      )
                    )
                  )
                  .subscribe();
              }
            },
            (error) => console.log(error)
          );
        }
      },
      (error) => console.log(error)
    );
  }

  onTabChanged(event) {
    this.pageIndex = 0;
    this.selectedLanguageId = this.languages[event.index]._id;
    this.paginator.pageIndex = 0;
    this.datasource = new MatTableDataSource<any>([]);
    this.getSubCategories(this.selectedLanguageId, 1, 10);
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  deleteCategory(row) {
    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: "Warning",
          message: `Are you sure want to delete ${row.name} subcategory`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.subCategoryService.delete(row._id).subscribe(
            (response: any) => {
              if (response.status === 200)
                this.getCategoryCount(this.selectedLanguageId);
              this.getSubCategories(
                this.selectedLanguageId,
                this.paginator.pageIndex + 1,
                this.paginator.pageSize
              );
            },
            (error) => console.error(error)
          );
        }
      });
  }

  applyFilter(filterValue: string) {
    if (
      filterValue.trim().length >= 3 ||
      filterValue.length < this.filterText.length
    ) {
      this.filterText = filterValue;
      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.getSubCategories(
          this.selectedLanguageId,
          1,
          this.paginator.pageSize
        );
      }, 500);
    }
  }

  getSubCategories(language, pageNumber, size) {
    this.subCategoryService
      .find(pageNumber, size, language, this.filterText)
      .subscribe(
        (result: any) => {
          if (result.success) {
            this.datasource = result.data;
            this.subCategories = result.data;
            this.count = result.count;
          }
        },
        (error) => console.log(error)
      );
  }

  getCategoryCount(language) {
    return this.subCategoryService.getCount(language);
  }

  getLanguages() {
    return this.languageService.list();
  }

  getServerData(data: PageEvent) {
    this.pageIndex = data.pageIndex;

    this.getSubCategories(
      this.selectedLanguageId,
      data.pageIndex + 1,
      data.pageSize
    );
    return data;
  }
}
