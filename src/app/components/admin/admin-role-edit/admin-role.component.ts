import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import { Role } from '../Role';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from 'src/app/validators/no-whitespace.validator';

@Component({
    selector: 'admin-edit-role',
    templateUrl: './admin-role.component.html',
    styleUrls: ['./admin.component.css']
})
export class RoleEditComponent implements OnInit {

    roleModel = new Role();
    roleName = new FormControl('', [Validators.required, NoWhitespaceValidator()]);
    showCreate=null
    showEdit=null;
    selectedModulesAndActions: any[] = [];

    @Input () heading: String=null;
    @Input () placeHolderValue: String=null;

    modulesAndActions: any[] = []
    previousUrl: string;
    constructor(private router: Router, private roleService: AdminService,private activatedRoute : ActivatedRoute) {
        this.activatedRoute.url.subscribe(url =>{
            if(url[1].path!='new'){
                this.showCreate=false
                this.showEdit=true
                this.heading="Edit";
                this.placeHolderValue="Edting role name"
                const  Role=JSON.stringify(url[1].path).toString()
                const  l=Role.length
                let ch1=Role.charAt(0)
                let ch2=Role.charAt(l-1)
                let roleName=Role.slice(1,l-1)
                  
                // console.log("Calling service to populate and edit current role")
                this.roleName.setValue(roleName)
                this.roleService.getRolePermission(roleName).subscribe((response: any) => {
                    if (response.status === 200)
                        console.log("Response Data")
                        // console.log(response.data)
                        //this.getModulesAndActions2
                        this.modulesAndActions=response.data
                        console.log(this.modulesAndActions)
                }, error => console.log(error))
             
            }else{
                this.showCreate=true
                this.showEdit=false
                this.heading="Add";
                this.placeHolderValue="Enter name"
                // console.log("This is the current route \n" +JSON.stringify(url[1].path));
                // console.log("Calling service to populate and create new role")
                this.getModulesAndActions();
            }
            
    ngOnInit() {
        this.getModulesAndActions();
    }

    getModulesAndActions() {
        this.roleService.getModulesAndActions().subscribe((response: any) => {
            if (response.status === 200)
                this.modulesAndActions = response.data;

        },

            error => console.log('error', error));
    }

    savePermissionSet(event) {
        if (event.state) {
            if (this.selectedModulesAndActions.find(modAndActions => modAndActions.module === event.module))
                this.selectedModulesAndActions.map((modAndAction) => {
                    if (modAndAction.module === event.module) {
                        modAndAction.actions.push(event.action);
                        return modAndAction;
                    }
                });
            else {
                let arr = [];
                arr.push(event.action)
                this.selectedModulesAndActions.push({ module: event.module, actions: arr })
            }
        } else {
            this.selectedModulesAndActions.map((modAndAction) => {
                if (modAndAction.module === event.module) {
                    modAndAction.actions.splice(modAndAction.actions.indexOf(event.action), 1);
                    return modAndAction;
                }
            });
        }
        this.roleModel.moduleAndActions = this.selectedModulesAndActions;
    }

    onSubmit() {
        this.roleModel.roleName = this.roleName.value;
        
        this.roleService.createRole(this.roleModel).subscribe((response: any) => {
            if (response.status === 200)
                this.router.navigate(['home/admin/roles'])
        }, error => console.log(error));
    }

}
