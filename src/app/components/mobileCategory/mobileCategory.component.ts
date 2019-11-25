import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriesService } from 'src/app/services/categories.service';
import { MatPaginator } from '@angular/material';
import { startWith, tap } from 'rxjs/operators';
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
    private activatedRoute: ActivatedRoute, private categoryService: CategoriesService) { }

  displayedColumns: string[] = ['position', 'name', 'Status', 'symbol'];
  count: number
  dataSource = new MatTableDataSource<any>([]);


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
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /*Table logic*/

  ngOnInit() {
    this.getCategoryCount();
    // this.getCategories(1, 5);
  }

  getCategories(pageNumber, size) {
    this.categoryService.find(pageNumber, size).subscribe((result: any) => {
      if (result.status == 200) {
        this.dataSource = new MatTableDataSource<any>(result.data);
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



}
