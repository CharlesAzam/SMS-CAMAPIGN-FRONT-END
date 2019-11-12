import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-create-news-tag',
  templateUrl: './create-news-tag.component.html',
  styleUrls: ['./create-news-tag.component.css']
})
export class CreateNewsTagComponent implements OnInit {

 


  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,) { }
  isShow = true;
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  ngOnInit() {
  }

  

}
