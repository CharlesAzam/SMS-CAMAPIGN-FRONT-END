import { Component, OnInit, Input} from '@angular/core';
import {VodService} from '../../vod/vod.service'
import {Subject} from 'rxjs'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
constructor(private VodServie: VodService) 
{ 
  //let m=this.getNotification2('LIVETV',this.tmp)
 
}
  title:string = "Dashbord";
  LIVETV: number;

  public tmp: any;
  category: Object;


  categorySubject= new Subject<any>();
  category$=this.categorySubject.asObservable();

  
  public categories: any[] = [
    {name:"Live TV",ImageSrc:"https://img.icons8.com/color/96/000000/tv-show.png",notification:'7'},
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
   // let m=this.getNotification2('LIVETV',this.tmp)
   // console.log("M=>"+m);
      console.log("M=>"+this.tmp);
  

  }

  getCount(category){
    this.VodServie.category$
    .subscribe(response=>{
    console.log("count response  "+response)  
    });
  }



  getNotification(Param: string){
  this.VodServie.getCount(Param).subscribe((result: any) => {
      if (result.success) {
        // if(Param=='LIVEV')
        // {
        //   this.categories[0].notification.push=result.count
        // }
         console.log("Test :"+JSON.stringify(result.count))
        //this.categories[0].notifcation = result.count;
        
      }
    })

  }

  getNotification2(Param: string,x){
    this.VodServie.getCount2(Param).subscribe((result: any) => {
           x=JSON.stringify(result.count)
           console.log("Test=> :"+x)
           return x;        
      })
  
    }

}










