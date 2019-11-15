import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mobile-sub-categories-form',
  templateUrl: './mobile-sub-categories-form.component.html',
  styleUrls: ['./mobile-sub-categories-form.component.css']
})
export class MobileSubCategoriesFormComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) { }
  toppings = new FormControl();
  options =new FormControl();
  Tags: string[] = ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5', 'tag 6'];
  Categories: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'];
  languages: string[]=["English",'Swahili'];
  
  back(){
    console.log("Back to Sub Category");
    this.router.navigate(['home/subCategory']);
    
  }
  
  ngOnInit() {
  }

}
