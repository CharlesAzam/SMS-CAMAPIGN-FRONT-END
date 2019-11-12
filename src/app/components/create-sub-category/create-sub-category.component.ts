import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-sub-category',
  templateUrl: './create-sub-category.component.html',
  styleUrls: ['./create-sub-category.component.css']
})
export class CreateSubCategoryComponent implements OnInit {

  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,) { }

  getSubCategories($event){
    console.log("Button was clicked ",$event);
       this.router.navigate(['subCategory'], { relativeTo: this.activatedRoute });
  }

  ngOnInit() {
  }

}
