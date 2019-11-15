import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-news-tag',
  templateUrl: './news-tag.component.html',
  styleUrls: ['./news-tag.component.css']
})
export class NewsTagComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
  }

  routeToCategoryForm(){
    console.log("To news tag Form ");
    this.router.navigate(['home/NewsTagsForms']);
  }

}
