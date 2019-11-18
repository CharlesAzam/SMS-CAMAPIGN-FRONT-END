import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MobileCategories} from '../../../models/mobile-categories';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,private fb:FormBuilder) { }


    mobileCategoryForm: FormGroup;

  // toppings = new FormControl();
  // options =new FormControl();
  Tags: string[] = ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5', 'tag 6'];
  Categories: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'];
  languages: string[]=["English",'Swahili'];

  //Route To category List
  routeToCategoryList(){
    console.log("To category list");
    this.router.navigate(['home/category']);
    
    
  } 

  //Validation logic start
  ALPHA_REGEX = "/^[a-zA-Z0-8]*$/"; 
 

  
  titleFormControll = new FormControl('',[Validators.required,Validators.pattern(this.ALPHA_REGEX)]);
  //mobileCategoryModel=new MobileCategories("Wasafi","Tv Channe","wasafi_thumb.png","wasafi.png",["BongoHits,Radio,Tv,"],"Entertainment","Swahili");
   
  //Validation logic end

  onSubmit(){
    console.log("Submiting form")
  }

  
  ngOnInit() {
    this.mobileCategoryForm=this.fb.group({
      //Populate with data via service
      Title: ["",[Validators.required,Validators.pattern(this.ALPHA_REGEX)]],
      Description: ["",[Validators.required,Validators.pattern(this.ALPHA_REGEX)]],
      ImageThumb: ["Lamp.png"],
      Images: ["Wamp.png"],
      Tags: [this.Tags],
      Category: [this.Categories],
      Language: [this.languages],
    });
  }

}  
 