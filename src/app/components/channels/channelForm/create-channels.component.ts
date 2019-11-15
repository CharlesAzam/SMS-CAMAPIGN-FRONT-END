import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-channels',
  templateUrl: './create-channels.component.html',
  styleUrls: ['./create-channels.component.css']
})
export class CreateChannelsComponentForm implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) {
   // this.isShow=true;
   }

  toppings = new FormControl();
  options =new FormControl();
  toppingList: string[] = ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5', 'tag 6'];
  toppingList2: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'];
  toppingList3: string[] = ['Paid','Free'];


  back(){
    console.log("To category list");
    this.router.navigate(['home/Channels']);
    
  }

  

  ngOnInit() {
  }

}
