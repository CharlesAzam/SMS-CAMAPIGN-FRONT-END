import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MobileTags } from "../../models/mobile-tags";
import { MatTableDataSource } from "@angular/material/table";
import { MobileTagsService } from "../../../app/services/mobile-tags.service";
import { startWith, tap } from "rxjs/operators";
import { MatPaginator, MatDialog, PageEvent } from "@angular/material";
import { LanguageService } from "src/app/services/language.service";
import { WarningDialog } from "../warning-dialog/dialog-warning";
import { AuthenticationService } from "../login/login.service";

export class mobileTagFilter {
  name: string = "";
}

@Component({
  selector: "app-mobile-tags",
  templateUrl: "./mobile-tags.component.html",
  styleUrls: ["./mobile-tags.component.css"],
})
export class MobileTagsComponent implements OnInit, AfterViewInit {
  selectedLanguageId: string;
  tags: any[] = [];
  searchTimeout = null;
  filterText: string = "";
  pageEvent: PageEvent;
  pageIndex = 0;

  ngAfterViewInit(): void {
    // let pageIndex = this.paginator.pageIndex + 1
    this.getLanguages().subscribe(
      (result: any) => {
        if (result.status === 200) {
          this.languages = result.data;
          this.selectedLanguageId = result.data[0]._id;
          this.getTagCount(this.selectedLanguageId).subscribe(
            (response: any) => {
              if (response.success) {
                this.count = response.count;
                this.paginator.page
                  .pipe(
                    startWith(null),
                    tap(() =>
                      this.getTags(
                        this.selectedLanguageId,
                        this.paginator.pageIndex + 1,
                        this.paginator.pageSize,
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tagService: MobileTagsService,
    private languageService: LanguageService,
    private dialog: MatDialog,
    public authenticationService: AuthenticationService
  ) {}
  TagModel: MobileTags = new MobileTags();
  displayedColumns: string[] = ["id", "name", "type", "action"];
  datasource = new MatTableDataSource<any>([]);
  languages: any[] = [];
  swahiliTagCount: number;
  englishTagCount: number;
  count: number;

  /*Table logic*/

  deleteCategory(row) {
    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: "Warning",
          message: `Are you sure want to delete ${row.name} tag`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.tagService.delete(row._id).subscribe(
            (result: any) => {
              if (result.status == 200) {
                this.getTagCount(this.selectedLanguageId);
                this.getTags(
                  this.selectedLanguageId,
                  this.paginator.pageIndex + 1,
                  this.paginator.pageSize,
                );
              }
            },
            (error) => console.log(error)
          );
        }
      });
  }

  routeToTagForm() {
    this.router.navigate(["MobileTagForm"], { queryParams: { id: "new" } });
  }

  editTag(row) {
    this.router.navigate(["home/MobileTagForm"], row._id);
  }

  getTags(language, pageIndex, size) {
    this.tagService.find(pageIndex, size, language, this.filterText).subscribe(
      (result: any) => {
        if (result.status == 200) {
          this.datasource = result.data;
          this.tags = result.data;
          this.count = result.count;
        }
      },
      (error) => console.log(error)
    );
  }

  applyFilter(filterValue: string) {
    if (filterValue.trim().length >= 3 || filterValue.length < this.filterText.length) {
      this.filterText = filterValue;
      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.getTags(
          this.selectedLanguageId,
          1,
          this.paginator.pageSize
        );
      }, 500);
    }
  }

  onTabChanged(event) {
    this.pageIndex = 0;
    this.selectedLanguageId = this.languages[event.index]._id;
    this.paginator.pageIndex = 0;
    this.datasource = new MatTableDataSource<any>([]);
    this.getTags(this.selectedLanguageId, 1, 10);
  }

  ngOnInit() {}

  getTagCount(language) {
    return this.tagService.getCount(language);
  }

  getLanguages() {
    return this.languageService.list();
  }

  getServerData(data) {
    this.pageIndex = data.pageIndex;
    this.getTags(
      this.selectedLanguageId,
      data.pageIndex + 1,
      data.pageSize
    );
  }
}
