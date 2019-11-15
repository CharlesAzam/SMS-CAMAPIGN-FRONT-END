import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-create-tags',
  templateUrl: './newsTagForm.component.html',
  styleUrls: ['./newsTagForm.component.css']
})
export class CreateTagsComponent implements OnInit {


  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,) { }
    toppings = new FormControl();
  languages: string[]=["English",'Swahili'];
 
 
  back() {
        this.router.navigate(['home/NewsTags']);
  }

  ngOnInit() {
  }

}
