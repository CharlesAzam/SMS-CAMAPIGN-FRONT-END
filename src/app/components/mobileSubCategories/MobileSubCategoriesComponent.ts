
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SubCategoriesService } from 'src/app/services/sub.categories.service';
import { MatTableDataSource } from '@angular/material/table';
import { startWith, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';
@Component({
  selector: 'app-mobile-sub-categories-component',
  templateUrl: './MobileSubCategoriesComponent.html',
  styleUrls: ['./MobileSubCategoriesComponent.css']
})
export class MobileSubCategoriesComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, private subCategoryService: SubCategoriesService) { }

  displayedColumns: string[] = ['position', 'name', 'category', 'Status', 'symbol'];
  dataSource = new MatTableDataSource<any>([]);

  count: number
  searchTimeout = null

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
      tap(() => this.getSubCategories(this.paginator.pageIndex + 1, this.paginator.pageSize,''))).subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator


  deleteCategory(id) {
    this.subCategoryService.delete(id).subscribe((response: any) => {
      if (response.status === 200) {
        this.getSubCategories(1, 10,'');
      }
    },
      error => console.error(error))
  }

  applyFilter(filterValue: string) {
    if (this.searchTimeout) clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.getSubCategories(1,this.paginator.pageSize,filterValue.trim().toLowerCase())
    }, 500)
  }


  getSubCategories(pageIndex, pageSize,filter) {
    this.subCategoryService.find(pageIndex, pageSize,filter).subscribe((response: any) => {
      if (response.status === 200) {
        this.dataSource = new MatTableDataSource<any>(response.data)
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
