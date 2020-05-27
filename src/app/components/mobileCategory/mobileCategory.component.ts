import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { CategoriesService } from "src/app/services/categories.service";
import { MatPaginator, MatDialog, PageEvent } from "@angular/material";
import { startWith, tap } from "rxjs/operators";
import { LanguageService } from "src/app/services/language.service";
import { WarningDialog } from "../warning-dialog/dialog-warning";
import { AuthenticationService } from "../login/login.service";
@Component({
  selector: "app-create-category",
  templateUrl: "./mobileCategory.html",
  styleUrls: ["./mobileCategory.css"],
})
export class CreateCategoryComponent implements OnInit, AfterViewInit {
  categories: any[] = [];
  pageEvent: PageEvent;
  pageIndex = 0;

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
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
                      this.getCategories(
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
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  searchTimeout = null;
  filterText: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoriesService,
    private languageService: LanguageService,
    public checkPermissionService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = ["position", "name", "Status", "symbol"];
  languages: any[] = [];
  count: number;
  datasource = new MatTableDataSource<any>([]);

  selectedLanguageId: string;

  onTabChanged(event) {
    this.pageIndex = 0;
    this.selectedLanguageId = this.languages[event.index]._id;
    this.datasource = new MatTableDataSource<any>([]);
    this.datasource.paginator = this.paginator;
    this.getCategories(this.selectedLanguageId, 1, 10);
  }

  /*Table logic*/
  deleteCategory(row) {
    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: "Warning",
          message: `Are you sure want to delete ${row.name} category`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.categoryService.delete(row._id).subscribe(
            (response: any) => {
              if (response.status === 200)
                this.getCategoryCount(this.selectedLanguageId);
              this.getCategories(
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

  editCategory(row) {
    this.router.navigate(["home/CategoryForm", row._id]);
  }

  routeToCategoryForm() {
    this.router.navigate(["home/CategoryForm"]);
  }

  applyFilter(filterValue: string) {
    if (
      filterValue.trim().length >= 3 ||
      filterValue.length < this.filterText.length
    ) {
      this.filterText = filterValue;
      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.getCategories(this.selectedLanguageId, 1, this.paginator.pageSize);
      }, 500);
    }
  }

  /*Table logic*/

  ngOnInit() {}

  getCategories(language, pageNumber, size) {
    this.categoryService
      .find(pageNumber, size, language, this.filterText)
      .subscribe(
        (result: any) => {
          if (result.success) {
            this.datasource.data = result.data;
            this.categories = result.data;
            this.count = result.count;
          }
        },
        (error) => console.log(error)
      );
  }

  getCategoryCount(language) {
    return this.categoryService.getCount(language);
  }

  getServerData(data) {
    this.pageIndex = data.pageIndex;
    this.getCategories(
      this.selectedLanguageId,
      data.pageIndex + 1,
      data.pageSize
    );
  }
  getLanguages() {
    return this.languageService.list();
  }
}
