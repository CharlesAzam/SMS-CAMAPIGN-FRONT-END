import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSidenav } from "@angular/material";
import { AuthenticationService } from "../login/login.service";
@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent implements OnInit {
  @ViewChild("sidenav", { static: false }) sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  showMobile: boolean = false;
  showReports: boolean = false;
  isShowing = false;
  userInfo = {};
  showSupport: boolean = false;
  showCollection: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  toggle = nav => (nav.open = !nav.open);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    const userDetails = JSON.parse(localStorage.getItem("currentUser"));
    this.userInfo = userDetails["userInfo"];
  }

  opened = false;

  getCategories($event) {
    console.log("Button was clicked ", $event);
    this.router.navigate(["category"], { relativeTo: this.activatedRoute });
  }

  sideBarTrigger($event) {
    console.log("Dash board side button clicked");
    //    this.router.navigate(['sideBar'], { relativeTo: this.activatedRoute });
  }

  routeToSubCategories($event) {
    this.router.navigate(["subCategory"], { relativeTo: this.activatedRoute });
  }

  routeToTags($event) {
    this.router.navigate(["Tags"], { relativeTo: this.activatedRoute });
  }

  routeToChannels($event) {
    this.router.navigate(["Channels"], { relativeTo: this.activatedRoute });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  submit() {
    this.router.navigate(["movies"], { relativeTo: this.activatedRoute });
  }

  isModulePermitted(moduleName: string) : boolean{
    return this.authService.isModuleAllowed(moduleName);
  }
}
