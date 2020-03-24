import { Component, OnInit ,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'admin-edit-users',
    templateUrl: './admin-edit.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminEditComponent implements OnInit {

    createUserModel = new Admin();
    roles = [];
    hide = true;
    showCreate = null
    showEdit = null;
    userId=null
    @Input() heading: String = null;
    @Input() placeHolderValue: String = null;

    userForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        roles: new FormControl('', [Validators.required])
    })

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private adminService: AdminService) {
     //Add form Routing Logic and processing
     this.activatedRoute.url.subscribe(url => {
        if (url[1].path != 'new') {
            this.showCreate = false
            this.showEdit = true
            this.heading = "Edit";
            //this.placeHolderValue = "Edting role name"
            console.log("This is the URL \n"+JSON.stringify(url,null,2))
            const id= JSON.stringify(url[1].path,null,2)
            let l =id.length
            let userId=id.slice(1,l-1)
           
            this.userId=userId;
            console.log("userId "+userId)
            
        } else {
            this.showCreate = true
            this.showEdit = false
            this.heading = "Add";
            //this.placeHolderValue = "Enter name"
           
            // console.log("This is the current route \n" +JSON.stringify(url[1].path));
            // console.log("Calling service to populate and create new role")
           
        }
    
    });
}
    ngOnInit() {
        this.getRoles();
    }

    getRoles() {
        this.adminService.listRoles().subscribe((response: any) => {
            if (response.status === 200) {
                this.roles = response.data;
            }
        }, error => console.log('error', error));
    }

    onSubmit() {
        let roleArray = [];
        roleArray.push(this.userForm.value['roles']);
        this.userForm.value['roles'] = roleArray;

        this.adminService.createUser(this.userForm.value).subscribe((response: any) => {
            if (response.status === 200) {
                this.router.navigate(['home/admin/users'])
            }
        }, error => console.log('error', error));
    }

    onUpdate() {
       
        console.log("This is the user form data tobe updated \n"+this.userForm.value)
        this.adminService.UpdateUserDetail(this.userId,this.userForm.value).subscribe((response: any) => {
            if (response.status === 200) {
                //console.log("Response server side \n"+JSON.stringify(response,null,2))
                this.router.navigate(['home/admin/users'])
            }
        }, error => console.log('error', error));
    }

}
