import { Component, OnInit, Input } from '@angular/core';
import {VodService} from '../../vod/vod.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

constructor(private VodServie: VodService) { 
  
}
  title:string = "Dashbord";
  protected LIVETV: any=null;
  
  
  ngOnInit() {
    console.log(this.getNotification('LIVETV'));

  }

  categories: any[] = [
    {name:"Live TV",ImageSrc:"https://img.icons8.com/color/96/000000/tv-show.png",notification:"?"},
    {name:"Video on Demand",ImageSrc:"https://img.icons8.com/color/96/000000/movie.png",notification:"12"},
    {name:"Sports",ImageSrc:"https://img.icons8.com/color/96/000000/sports-mode.png",notification:"13"},
    {name:"TV Series",ImageSrc:"https://img.icons8.com/color/96/000000/tv.png",notification:"13"},
    {name:"News",ImageSrc:"https://img.icons8.com/color/96/000000/news.png",notification:"14"},
    {name:"Radio",ImageSrc:"https://img.icons8.com/color/96/000000/tabletop-radio.png",notification:"15"},
    {name:"TV Guide",ImageSrc:"https://img.icons8.com/color/96/000000/overview-pages-4.png",notification:"16"},
    {name:"Home",ImageSrc:"https://img.icons8.com/color/96/000000/garage-closed.png",notification:"17"},
    {name:"Stories",ImageSrc:"https://img.icons8.com/color/96/000000/storytelling.png",notification:"19"},
  ]

  getNotification(Param: string){
    return this.VodServie.getCount(Param).subscribe((result: any) => {
      if (result.success) {
        //console.log(JSON.stringify(result.count))
        result.count;
      }
    })

  }

}










