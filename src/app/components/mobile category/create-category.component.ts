import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import {PeriodicElement} from './InterphacePeriodicElement'
import {MatTableDataSource} from '@angular/material/table';

var ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,  name: 'Sports', Status: "Enabled", symbol: 'H'},
  {position: 2,  name: 'Bongo', Status: "Enabled", symbol: 'H'},
  {position: 3,  name: 'TPL', Status: "Enabled", symbol: 'H'},
  {position: 4,  name: 'K TV', Status: "Enabled", symbol: 'H'},
  {position: 5,  name: 'Bongo Movie', Status: "Enabled", symbol: 'H'},
  {position: 6,  name: 'EPL', Status: "Enabled", symbol: 'H'},
];



@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) { }
  
  displayedColumns: string[] = ['position', 'name', 'Status', 'symbol'];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  toppings = new FormControl();
  options =new FormControl();
  toppingList: string[] = ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5', 'tag 6'];
  toppingList2: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'];

  isShow = true;
  isTableShowFull=false;
 
  toggleDisplay() {
    this.isShow = !this.isShow;
    this.toggleDisplayTable();
  }

  toggleDisplayTable(){
    this.isTableShowFull = !this.isTableShowFull;
  }
  
  DeleteCategory(row){
    console.log("Delete form button clicked "+"\n");
    console.log("Deleting object row data "+JSON.stringify(row.position)+"\n");
  }

  EditCategory(row){
    console.log("Editing object row data "+JSON.stringify(row.name)+"\n");
  }

  routeToCategoryForm(){
    console.log("Route to category clicked");
    this.router.navigate(['home/CategoryForm']);
    
  }

  //
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnInit() {
  }
  

}
