
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriesService } from 'src/app/services/categories.service';
import { MatPaginator } from '@angular/material';
import { startWith, tap } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language.service';
@Component({
  selector: 'app-create-category',
  templateUrl: './mobileCategory.html',
  styleUrls: ['./mobileCategory.css']
})
export class CreateCategoryComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    // let pageIndex = this.paginator.pageIndex + 1

    this.paginator.page.pipe(
      startWith(null),
      tap(() => this.getCategories(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoriesService,
    private languageService: LanguageService) { }

  displayedColumns: string[] = ['position', 'name', 'Status', 'symbol'];
  languages: any[] = [];
  count: number
  datasourceEN = new MatTableDataSource<any>([]);
  datasourceSW = new MatTableDataSource<any>([]);
  swahiliCategoryCount: number;
  englishCategoryCount: number;


  /*Table logic*/
  deleteCategory(row) {
    this.categoryService.delete(row._id).subscribe((response: any) => {
      if (response.status === 200)
        this.getCategories(1, 10);

    },
      error => console.error(error))
  }

  editCategory(row) {
    this.router.navigate(['home/CategoryForm', row._id]);
  }

  routeToCategoryForm() {
    this.router.navigate(['home/CategoryForm']);

  }

  applyFilter(filterValue: string) {
    this.datasourceEN.filter = filterValue.trim().toLowerCase();
    this.datasourceSW.filter = filterValue.trim().toLowerCase();
  }

  /*Table logic*/

  ngOnInit() {
    this.getCategoryCount();
  }

  getCategories(pageNumber, size) {
    this.categoryService.find(pageNumber, size).subscribe((result: any) => {
      if (result.status == 200) {
        this.languageService.list().subscribe(
          response => {
            if (response.status === 200) {
              this.languages = response.data;
              if (this.languages) {
                let en = this.languages.find(lang => lang.name.toLowerCase() === 'english');
                let sw = this.languages.find(lang => lang.name.toLowerCase() === 'swahili');

                this.datasourceSW = new MatTableDataSource<any>(result.data.filter((data) => {
                  if (data.language === sw._id) {
                    return data;
                  }
                }));
                this.swahiliCategoryCount = this.datasourceSW.data.length;

                this.datasourceEN = new MatTableDataSource<any>(result.data.filter((data) => {
                  if (data.language === en._id) {
                    return data;
                  }
                }));

                this.englishCategoryCount = this.datasourceEN.data.length;
              }
            }
          },
          error => {
            console.log("Error! ", error);
          }
        );

      }
    })
  }

  getCategoryCount() {
    this.categoryService.getCount().subscribe((result: any) => {
      if (result.success) {
        this.count = result.count;
      }
    })
  }

  getLanguages() {
    this.languageService.list().subscribe(
      response => {
        if (response.status === 200) {
          this.languages = response.data;
        }
      },
      error => {
        console.log("Error! ", error);
      }
    );
  }
}
