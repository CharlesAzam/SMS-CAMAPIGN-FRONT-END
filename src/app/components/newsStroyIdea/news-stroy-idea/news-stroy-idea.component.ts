import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-stroy-idea',
  templateUrl: './news-stroy-idea.component.html',
  styleUrls: ['./news-stroy-idea.component.css']
})
export class NewsStroyIdeaComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) { }


  routeToCategoryForm(){
    console.log("----");
    this.router.navigate(['home/StoriesIdeaForm']);
  }

  ngOnInit() {
  }

}
