import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {UserRoles} from '../../../models/user-roles'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  createUserModel=new UserRoles('','',[]);
  //roles: UserRoles
  roles=[
    'SUPER ADMIN',
    'ADMIN',
  ]

  

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) 
  {

   }

  ngOnInit() {
    

  }




  
  
  //Route To category List
  routeToCategoryList() {
    console.log("Something ..");
  }

  onSubmit() {
    console.log("Submit clicked"); 
  }


  


  

}
