import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
  }

  opened=false;

  getCategories($event){
    console.log("Button was clicked ",$event);
       this.router.navigate(['category'], { relativeTo: this.activatedRoute });
  }

  sideBarTrigger($event){
    console.log("Dash board side button clicked");
//    this.router.navigate(['sideBar'], { relativeTo: this.activatedRoute });
  }

  getSubCategories($event){
    console.log("Sub Category was clicked ",$event);
      this.router.navigate(['subCategory'], { relativeTo: this.activatedRoute });
  }

  submit() {
  console.log("as");
  this.router.navigate(['movies'], { relativeTo: this.activatedRoute });
  }
}
