
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
  datasource = new MatTableDataSource<any>([]);
  selectedLanguageId: string;


  count: number

  routeToCategoryForm() {
    this.router.navigate(['home/subCategoryForm']);

  }
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getLanguages().subscribe((result: any) => {
      if (result.status === 200) {
        this.languages = result.data;
        this.selectedLanguageId = result.data[0]._id;
        this.getCategoryCount(this.selectedLanguageId).subscribe((response: any) => {
          if (response.success) {
            this.count = response.count
            this.paginator.page.pipe(
              startWith(null),
              tap(() => this.getSubCategories(this.selectedLanguageId, this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();

          }
        }, error => console.log(error))
      }
    }, error => console.log(error))
  }

  onTabChanged(event) {
    this.selectedLanguageId = this.languages[event.index]._id;
    this.paginator.pageIndex = 0;
    this.datasource = new MatTableDataSource<any>([]);
    this.getCategoryCount(this.selectedLanguageId).subscribe((response: any) => {
      if (response.success) {
        this.count = response.count;
        this.getSubCategories(this.selectedLanguageId, 1, 10)
      }
    },
      error => console.log(error));

  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator


  deleteCategory(id) {
    this.subCategoryService.delete(id).subscribe((response: any) => {
      if (response.status === 200) {
        this.getSubCategories(1, 10, this.selectedLanguageId);
      }
    },
      error => console.error(error))
  }

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }


  getSubCategories(language, pageNumber, size) {
    this.subCategoryService.find(pageNumber, size, language).subscribe((result: any) => {
      if (result.status == 200) {
        this.datasource = result.data;
      }
    },
      error => console.log(error))
  }

  getCategoryCount(language) {
    return this.subCategoryService.getCount(language);
  }

  getLanguages() {
    return this.languageService.list();
  }

}
