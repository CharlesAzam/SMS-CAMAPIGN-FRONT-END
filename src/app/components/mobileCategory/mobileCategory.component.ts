
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
<<<<<<< HEAD:src/app/components/mobile category/create-category.component.ts
=======
import { FormControl } from '@angular/forms';
import { PeriodicElement } from './mobileCategoryInterphace'
>>>>>>> feature/MobileCategory:src/app/components/mobileCategory/mobileCategory.component.ts
import { MatTableDataSource } from '@angular/material/table';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoryFilter } from '../homepage/category/category-filter';


@Component({
  selector: 'app-create-category',
  templateUrl: './mobileCategory.html',
  styleUrls: ['./mobileCategory.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, private categoryService: CategoriesService) { }

  displayedColumns: string[] = ['position', 'name', 'Status', 'symbol'];
<<<<<<< HEAD:src/app/components/mobile category/create-category.component.ts
  dataSource = new MatTableDataSource<any>([]);
=======
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
>>>>>>> feature/MobileCategory:src/app/components/mobileCategory/mobileCategory.component.ts

  deleteCategory(row) {
  }

  editCategory(row) {
  }

  routeToCategoryForm() {
    this.router.navigate(['home/CategoryForm']);

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    let categoryFilter = new CategoryFilter();
    categoryFilter.categoryName = "";
    this.categoryService.find().subscribe((result: any) => {
      if(result.status == 200){
<<<<<<< HEAD:src/app/components/mobile category/create-category.component.ts
        this.dataSource = new MatTableDataSource<any>(result.data);
=======
        console.log(result.data)
        this.dataSource = new MatTableDataSource(result.data);
>>>>>>> feature/MobileCategory:src/app/components/mobileCategory/mobileCategory.component.ts
      }
    })
  }


}
