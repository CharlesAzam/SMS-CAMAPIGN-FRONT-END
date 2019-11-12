import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  title:string = "Dashbord";

  categories: any[] = [
    "Live TV",
    "Movies",
    "Sports",
    "TV Series",
    "News",
    "Radio",
    "TV Guide"
  ]


  ngOnInit() {
  }

}
