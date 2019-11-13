import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavItem } from '../menu-list-item/nav-item';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  toggle = nav => nav.open = !nav.open;

  navItems: NavItem[] = [
    {
      displayName: "News",
      route: '',
      children: [
        {
          displayName: "Categories",
          route: ''
        },
        {
          displayName: "Story Idea",
          route: ''
        },
        {
          displayName: "Tags",
          route: ''
        },
        {
          displayName: "Videos",
          route: ''
        },
        {
          displayName: "Photos",
          route: ''
        }
      ]
    },
    {
      displayName: "Mobile",
      route: '',
      children: [
        {
          displayName: "Categories",
          route: ''
        },
        {
          displayName: "Sub Categories",
          route: ''
        },
        {
          displayName: "Tags",
          route: ''
        },
        {
          displayName: "Banner",
          route: 'banner'
        },
        {
          displayName: "Banner Mapping",
          route: ''
        },
        {
          displayName: "Package",
          route: 'package'
        },
        {
          displayName: "Coupons",
          route: 'coupon'
        },
        {
          displayName: "Video On Demand",
          route: 'vod'
        },
        {
          displayName: "Radio",
          route: 'radio'
        },
        {
          displayName: "In-App Purchase Products",
          route: 'products'
        },
        {
          displayName: "Video Library",
          route: 'video-library'
        },
        
      ]
    },
  ]

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  opened = false;

  getCategories($event) {
    console.log("Button was clicked ", $event);
    this.router.navigate(['category'], { relativeTo: this.activatedRoute });
  }

  sideBarTrigger($event) {
    console.log("Dash board side button clicked");
    //    this.router.navigate(['sideBar'], { relativeTo: this.activatedRoute });
  }

  submit() {
    console.log("as");
    this.router.navigate(['movies'], { relativeTo: this.activatedRoute });
  }
}
