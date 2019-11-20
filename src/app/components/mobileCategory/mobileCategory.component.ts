import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  dataSource = new MatTableDataSource<any>([]);

  /*Table logic*/
  deleteCategory(row) {
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
    this.categoryService.find().subscribe((result: any) => {
      if(result.status == 200){
        this.dataSource = new MatTableDataSource<any>(result.data);
      }
    })
  }


}
