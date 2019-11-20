
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SubCategoriesService } from 'src/app/services/sub.categories.service';
import { MatTableDataSource } from '@angular/material/table';
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

  routeToCategoryForm() {
    console.log("Route to sub category");
    this.router.navigate(['home/subCategoryForm']);

  }

  //Sub Categories Table Data Logic


  ngOnInit() {
    this.getSubCategories();
  }

  deleteCategory(id) {
    this.subCategoryService.delete(id).subscribe((response: any) => {
      if (response.status === 200) {
        this.getSubCategories();
      }
    },
      error => console.error(error))
  }

  getSubCategories() {
    this.subCategoryService.find().subscribe((response: any) => {
      if (response.status === 200) {
        this.dataSource = new MatTableDataSource<any>(response.data)
      }
    }, error => console.log(error))
  }

}
