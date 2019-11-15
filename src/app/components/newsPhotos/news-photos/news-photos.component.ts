import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

//Dont for get to add additional column for image display 
@Component({
  selector: 'app-news-photos',
  templateUrl: './news-photos.component.html',
  styleUrls: ['./news-photos.component.css']
})
export class NewsPhotosComponent implements OnInit {

  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,) { }

  routeToCategoryForm(){
    console.log("To category list");
    this.router.navigate(['home/NewsPhotoForm']);
  }

  ngOnInit() {
  }

}
