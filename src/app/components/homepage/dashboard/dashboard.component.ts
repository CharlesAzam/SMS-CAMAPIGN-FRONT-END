import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../login/login.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {

  }

  userDetails: any;

  ngOnInit() {
    this.userDetails = this.authenticationService.currentUserValue.userInfo;
  }

}










