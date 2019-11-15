import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mobile-tags',
  templateUrl: './mobile-tags.component.html',
  styleUrls: ['./mobile-tags.component.css']
})
export class MobileTagsComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

  routeToTagForm(){
    console.log("Routing to Tag form");
    this.router.navigate(['home/MobileTagForm']);
  }

  ngOnInit() {
  }

}
