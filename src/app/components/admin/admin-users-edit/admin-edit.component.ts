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

    userForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        roles: new FormControl('', [Validators.required])
    })

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private adminService: AdminService) { }

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

}
