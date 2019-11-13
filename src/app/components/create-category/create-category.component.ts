import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {PeriodicElement} from './InterphacePeriodicElement'

var ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,  name: 'Sports', weight: "Enabled", symbol: 'H'},
];



@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor() { }
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
  toppings = new FormControl();
  options =new FormControl();
  toppingList: string[] = ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5', 'tag 6'];
  toppingList2: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'];

  
  
  isShow = true;
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  showForm(){
    console.log("Show form button clicked");
    this.isShow = !this.isShow;
  }
  ngOnInit() {
  }
  

}
