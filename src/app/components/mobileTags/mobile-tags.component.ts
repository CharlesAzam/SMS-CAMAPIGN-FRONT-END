import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MobileTags } from "../../models/mobile-tags";
import { MatTableDataSource } from "@angular/material/table";
import { MobileTagsService } from "../../../app/services/mobile-tags.service";
import { startWith, tap } from "rxjs/operators";
import { MatPaginator } from "@angular/material";
import { LanguageService } from "src/app/services/language.service";

export class mobileTagFilter {
  name: string = "";
}

@Component({
  selector: "app-mobile-tags",
  templateUrl: "./mobile-tags.component.html",
  styleUrls: ["./mobile-tags.component.css"]
})
export class MobileTagsComponent implements OnInit, AfterViewInit {
  selectedLanguageId: string;

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
                        this.paginator.pageSize
                      )
                    )
                  )
                  .subscribe();
              }
            },
            error => console.log(error)
          );
        }
      },
      error => console.log(error)
    );
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tagService: MobileTagsService,
    private languageService: LanguageService
  ) {}
  TagModel: MobileTags = new MobileTags();
  displayedColumns: string[] = ["id", "name", "type", "action"];
  dataSource = new MatTableDataSource<any>([]);
  count: number;
  /*Table logic*/
  deleteCategory(row) {
    if (confirm("Are you sure to delete this Tag?")) {
      this.tagService.delete(row._id).subscribe((result: any) => {
        if (result.status == 200) {
          this.getTagCount(this.selectedLanguageId);
          this.getTags(
            this.selectedLanguageId,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          );
          // this.dataSource.data
        }
      });
    }
  }

  routeToTagForm() {
    this.router.navigate(["MobileTagForm"], { queryParams: { id: "new" } });
  }

  editTag(row) {
    this.router.navigate(["home/MobileTagForm"], row._id);
  }

  getTags(language, pageIndex, size) {
    this.tagService.find(pageIndex, size, language).subscribe((result: any) => {
      if (result.status == 200) {
        this.datasource = result.data;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  onTabChanged(event) {
    this.selectedLanguageId = this.languages[event.index]._id;
    this.paginator.pageIndex = 0;
    this.datasource = new MatTableDataSource<any>([]);
    this.getTagCount(this.selectedLanguageId).subscribe(
      (response: any) => {
        if (response.success) {
          this.count = response.count;
          this.getTags(this.selectedLanguageId, 1, 10);
        }
      },
      error => console.log(error)
    );
  }

  ngOnInit() {}

  getTagCount(language) {
    return this.tagService.getCount(language);
  }

  getLanguages() {
    return this.languageService.list();
  }
}
