
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SubCategoriesService } from 'src/app/services/sub.categories.service';
import { MatTableDataSource } from '@angular/material/table';
import { startWith, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';
import { LanguageService } from 'src/app/services/language.service';
@Component({
  selector: 'app-mobile-sub-categories-component',
  templateUrl: './MobileSubCategoriesComponent.html',
  styleUrls: ['./MobileSubCategoriesComponent.css']
})
export class MobileSubCategoriesComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private subCategoryService: SubCategoriesService,
    private languageService: LanguageService) { }

  languages: any[] = []
  displayedColumns: string[] = ['position', 'name', 'category', 'Status', 'symbol'];
  datasourceEN = new MatTableDataSource<any>([]);
  datasourceSW = new MatTableDataSource<any>([]);
  swahiliCategoryCount: number;
  englishCategoryCount: number;

  count: number

  routeToCategoryForm() {
    this.router.navigate(['home/subCategoryForm']);

  }
  ngOnInit() {
    this.getCategoryCount()
  }

  ngAfterViewInit(): void {
    // let pageIndex = this.paginator.pageIndex + 1

    this.paginator.page.pipe(
      startWith(null),
      tap(() => this.getSubCategories(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator


  deleteCategory(id) {
    this.subCategoryService.delete(id).subscribe((response: any) => {
      if (response.status === 200) {
        this.getSubCategories(1, 10);
      }
    },
      error => console.error(error))
  }

  applyFilter(filterValue: string) {
    this.datasourceEN.filter = filterValue.trim().toLowerCase();
    this.datasourceSW.filter = filterValue.trim().toLowerCase();

  }


  getSubCategories(pageIndex, pageSize) {
    this.subCategoryService.find(pageIndex, pageSize).subscribe((result: any) => {
      if (result.status === 200) {
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
    }, error => console.log(error))
  }

  getCategoryCount() {
    this.subCategoryService.getCount().subscribe((result: any) => {
      if (result.success) {
        this.count = result.count;
      }
    })
  }

}
