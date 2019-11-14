import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  toppings = new FormControl();
  options =new FormControl();
  toppingList: string[] = ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5', 'tag 6'];
  toppingList2: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'];


  //Route To category List

  routeToCategoryList(){
    console.log("To category list");
    this.router.navigate(['home/category']);
    
  }
  ngOnInit() {
  }

}
