import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material';
import { startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  ngAfterViewInit(): void {
    // let pageIndex = this.paginator.pageIndex + 1

    this.paginator.page.pipe(
      startWith(null),
      tap(() => this.getCategories(this.paginator.pageIndex+1, this.paginator.pageSize))).subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  displayedColumns: string[] = ['position', 'name', 'Status', 'symbol'];
  count: number
  dataSource = new MatTableDataSource<any>([]);
  

  /*Table logic*/
  deleteCategory(row) {
    
  }

  editCategory(row) {
    this.router.navigate(['home/CategoryForm', row._id]);
  }

  routeToCategoryForm() {
    this.router.navigate(['home/Admin']);

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
   
  }

  getCategoryCount() {
    
  }
  

}
