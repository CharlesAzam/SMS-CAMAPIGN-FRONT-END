import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-news-story',
  templateUrl: './newsStoryIdeaForm.component.html',
  styleUrls: ['./newsStoryIdeaForm.component.css']
})
export class CreateNewsStoryComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  toppings = new FormControl();
  options =new FormControl();
  toppingList: string[] = ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5', 'tag 6'];
  toppingList2: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'];
  languages: string[]=["English",'Swahili'];
  
  back(){
    this.router.navigate(['home/StoriesIdea']);
  }
  ngOnInit() {
  }

}
