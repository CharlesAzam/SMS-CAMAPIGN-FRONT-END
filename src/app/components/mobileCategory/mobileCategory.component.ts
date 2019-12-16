
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
    this.getLanguages().subscribe((result: any) => {
      if (result.status === 200) {
        this.languages = result.data;
        this.selectedLanguageId = result.data[0]._id;
        this.getCategoryCount(this.selectedLanguageId).subscribe((response: any) => {
          if (response.success) {
            this.count = response.count
            this.paginator.page.pipe(
              startWith(null),
              tap(() => this.getCategories(this.selectedLanguageId, this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();

          }
        }, error => console.log(error))
      }
    }, error => console.log(error))




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
  datasource = new MatTableDataSource<any>([]);

  selectedLanguageId: string;

  onTabChanged(event) {
    this.selectedLanguageId = this.languages[event.index]._id;
    this.paginator.pageIndex = 0;
    this.datasource = new MatTableDataSource<any>([]);
    this.getCategoryCount(this.selectedLanguageId).subscribe((response: any) => {
      if (response.success) {
        this.count = response.count;
        this.getCategories(this.selectedLanguageId, 1, 10)
      }
    },
      error => console.log(error));

  }


  /*Table logic*/
  deleteCategory(row) {
    this.categoryService.delete(row._id).subscribe((response: any) => {
      if (response.status === 200)
        this.getCategories(this.selectedLanguageId, 1, 10);

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
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  /*Table logic*/

  ngOnInit() {
  }

  getCategories(language, pageNumber, size) {
    this.categoryService.find(pageNumber, size, language).subscribe((result: any) => {
      if (result.status == 200) {
        this.datasource = result.data;
      }
    },
      error => console.log(error))
  }

  getCategoryCount(language) {
    return this.categoryService.getCount(language);
  }

  getLanguages() {
    return this.languageService.list();
  }
}
