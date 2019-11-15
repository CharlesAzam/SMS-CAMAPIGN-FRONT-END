import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-create-news-photos',
  templateUrl: './create-news-photos.component.html',
  styleUrls: ['./create-news-photos.component.css']
})
export class CreateNewsPhotosComponent implements OnInit {

  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,) { }

  toppings = new FormControl();
  options =new FormControl();
  toppingList: string[] = ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5', 'tag 6'];
  toppingList2: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'];

  back(){
    //console.log("+++++");
    this.router.navigate(['home/NewsPhoto']);
  }

  ngOnInit() {
  }

}