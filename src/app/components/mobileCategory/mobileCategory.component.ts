
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { PeriodicElement } from './mobileCategoryInterphace'
import { MatTableDataSource } from '@angular/material/table';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoryFilter } from '../homepage/category/category-filter';

var ELEMENT_DATA: any[] = [];



@Component({
  selector: 'app-create-category',
  templateUrl: './mobileCategory.html',
  styleUrls: ['./mobileCategory.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, private categoryService: CategoriesService) { }

  displayedColumns: string[] = ['position', 'name', 'Status', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  toppings = new FormControl();
  options = new FormControl();
  toppingList: string[] = ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5', 'tag 6'];
  toppingList2: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'];

  isShow = true;
  isTableShowFull = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
    this.toggleDisplayTable();
  }

  toggleDisplayTable() {
    this.isTableShowFull = !this.isTableShowFull;
  }

  DeleteCategory(row) {
    console.log("Delete form button clicked " + "\n");
    console.log("Deleting object row data " + JSON.stringify(row.position) + "\n");
  }

  EditCategory(row) {
    console.log("Editing object row data " + JSON.stringify(row.name) + "\n");
  }

  routeToCategoryForm() {
    console.log("Route to category clicked");
    this.router.navigate(['home/CategoryForm']);

  }

  //
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    let categoryFilter = new CategoryFilter();
    categoryFilter.categoryName = "";
    this.categoryService.find().subscribe((result: any) => {
      if(result.status == 200){
        console.log(result.data)
        this.dataSource = new MatTableDataSource(result.data);
      }
    })
  }


}
