import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-create-news-tag',
  templateUrl: './mobileTagsFormComponent.html',
  styleUrls: ['./mobileTagsFormComponent.css']
})
export class MobileTagFormComponent implements OnInit {

  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,) { }
  
    toppings = new FormControl();
    languages: string[]=["English",'Swahili'];
 

  back(){
    console.log("To category list");
    this.router.navigate(['home/MobileTags']);
    
  }

  ngOnInit() {
  }

  

}
