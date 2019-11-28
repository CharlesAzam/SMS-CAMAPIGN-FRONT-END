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
    {name:"Live TV",ImageSrc:"https://img.icons8.com/color/96/000000/tv-show.png",notification:"10"},
    {name:"Video on Demand",ImageSrc:"https://img.icons8.com/color/96/000000/movie.png",notification:"12"},
    {name:"Sports",ImageSrc:"https://img.icons8.com/color/96/000000/sports-mode.png",notification:"13"},
    {name:"TV Series",ImageSrc:"https://img.icons8.com/color/96/000000/tv.png",notification:"13"},
    {name:"News",ImageSrc:"https://img.icons8.com/color/96/000000/news.png",notification:"14"},
    {name:"Radio",ImageSrc:"https://img.icons8.com/color/96/000000/tabletop-radio.png",notification:"15"},
    {name:"TV Guide",ImageSrc:"https://img.icons8.com/color/96/000000/overview-pages-4.png",notification:"16"},
    {name:"Home",ImageSrc:"https://img.icons8.com/color/96/000000/garage-closed.png",notification:"17"},
    {name:"Stories",ImageSrc:"https://img.icons8.com/color/96/000000/storytelling.png",notification:"19"},
  ]

  ngOnInit() {
  }

}










