import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { PeriodicElement } from './InterphacePeriodicElement'
import { MatTableDataSource } from '@angular/material/table';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoryFilter } from '../homepage/category/category-filter';


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, private categoryService: CategoriesService) { }

  displayedColumns: string[] = ['position', 'name', 'Status', 'symbol'];
  dataSource = new MatTableDataSource<any>();


  isShow = true;
  isTableShowFull = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
    this.toggleDisplayTable();
  }

  toggleDisplayTable() {
    this.isTableShowFull = !this.isTableShowFull;
  }

  deleteCategory(row) {
  }

  editCategory(row) {
  }

  routeToCategoryForm() {
    this.router.navigate(['home/CategoryForm']);

  }

  //
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    let categoryFilter = new CategoryFilter();
    categoryFilter.categoryName = "";
    this.categoryService.find(categoryFilter).subscribe((result: any) => {
      if(result.status == 200){
        this.dataSource = new MatTableDataSource<any>(result.data);
      }
    })
  }


}
