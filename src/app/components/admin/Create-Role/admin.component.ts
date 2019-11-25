import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Users} from '../../../models/'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  createUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),  
  })

 
  roles: any[]=[
    'SUPER ADMIN',
    'ADMIN',
  ]


  constructor() 
  {

   }

  ngOnInit() {
    

  }

  
  
  //Route To category List
  routeToCategoryList() {
    console.log("Something ..");
  }

  onSubmit() {
   


  }


  


  

}
