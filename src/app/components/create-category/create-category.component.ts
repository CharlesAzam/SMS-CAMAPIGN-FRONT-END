import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor() { }

  isShow = false;
 
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
