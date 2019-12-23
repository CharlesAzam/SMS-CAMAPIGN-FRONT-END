
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SubCategoriesService } from 'src/app/services/sub.categories.service';
import { MatTableDataSource } from '@angular/material/table';
import { startWith, tap } from 'rxjs/operators';
import { MatPaginator, MatDialog } from '@angular/material';
import { WarningDialog } from '../warning-dialog/dialog-warning';
@Component({
  selector: 'app-mobile-sub-categories-component',
  templateUrl: './MobileSubCategoriesComponent.html',
  styleUrls: ['./MobileSubCategoriesComponent.css']
})
export class MobileSubCategoriesComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private subCategoryService: SubCategoriesService,
    private dialog: MatDialog) { }

  displayedColumns: string[] = ['position', 'name', 'category', 'Status', 'symbol'];
  dataSource = new MatTableDataSource<any>([]);

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


  deleteCategory(row) {

    this.dialog.open(WarningDialog, {
      width: '400px',
      data: { title: 'Warning', message: `Are you sure want to delete ${row.name} subcategory` }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.subCategoryService.delete(row._id).subscribe((response: any) => {
          if (response.status === 200)
            this.getSubCategories(1, 10);
        },
          error => console.error(error))
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getSubCategories(pageIndex, pageSize) {
    this.subCategoryService.find(pageIndex, pageSize).subscribe((response: any) => {
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
