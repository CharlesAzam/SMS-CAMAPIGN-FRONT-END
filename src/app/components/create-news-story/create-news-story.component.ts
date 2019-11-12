import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-create-news-story',
  templateUrl: './create-news-story.component.html',
  styleUrls: ['./create-news-story.component.css']
})
export class CreateNewsStoryComponent implements OnInit {

  constructor() { }

  toppings = new FormControl();
  options =new FormControl();
  toppingList: string[] = ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5', 'tag 6'];
  toppingList2: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'];

  isShow = true;

  ngOnInit() {
  }

}
