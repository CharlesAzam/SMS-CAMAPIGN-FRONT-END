import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, filter } from 'rxjs/operators';
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
    showCreate = null
    showEdit = null;
    permissions=[]
    selectedModulesAndActions: any[] = [];
    modulesAndActions: any[] = [];

    @Input() heading: String = null;
    @Input() placeHolderValue: String = null;
    @Input() permissionByModule: any[]=[];
    @Input() AllRolePermissions: any[] = [];
    @Input() RoleName: string;
 
   
    previousUrl: string;
    constructor(private router: Router, private roleService: AdminService, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.url.subscribe(url => {
            if (url[1].path != 'new') {
                this.showCreate = false
                this.showEdit = true
                this.heading = "Edit";
                this.placeHolderValue = "Edting role name"
                const Role = JSON.stringify(url[1].path).toString()
                const l = Role.length
                // let ch1=Role.charAt(0)
                // let ch2=Role.charAt(l-1)
                let roleName = Role.slice(1, l - 1)

                // console.log("Calling service to populate and edit current role")
                this.RoleName=roleName;
                this.roleName.setValue(roleName)
                this.roleService.getRolePermission(roleName).subscribe((response: any) => {
                    if (response.status === 200)
                        console.log("Response Data")
                    // console.log(response.data)
                    //this.getModulesAndActions2
                    let arr = [];
                    console.log(response.data)

                    Object.keys(response.data).forEach((key) => {
                    console.log("Iterator function "+key)
                        arr.push({
                            module: key,
                            actions: response.data[key],
                        })
                    });

                    this.modulesAndActions = arr;
                    console.log("iterator function value \n "+JSON.stringify(this.modulesAndActions,null,2));
                    this.getModulesAndActionsUpdate();
                }, error => console.log(error))

            } else {
                this.showCreate = true
                this.showEdit = false
                this.heading = "Add";
                this.placeHolderValue = "Enter name"
                // console.log("This is the current route \n" +JSON.stringify(url[1].path));
                // console.log("Calling service to populate and create new role")
                this.getModulesAndActions();
            }

        });
    }

    ngOnInit() {
        //this.getModulesAndActions();
    }

    getModulesAndActions() {
        this.roleService.getModulesAndActions().subscribe((response: any) => {
            if (response.status === 200)
                this.modulesAndActions = response.data;
                // this. AllRolePermissions=response.data;
            console.log("Module Actions Result")
            console.log(this.modulesAndActions)
           
        },

            error => console.log('error', error));
    }

    getModulesAndActionsUpdate() {
        this.roleService.getModulesAndActions().subscribe((response: any) => {
            if (response.status === 200)
                this.AllRolePermissions = response.data;
        },

            error => console.log('error', error));
    }
    

    fetchModulePermssion(module: string){
        console.log("fetchModulePermssion function "+module)
        this.roleService.getModulePermission(module).subscribe((response: any) => {
            if (response.status === 200){
                 console.log("Module Permission Result")
                console.log(JSON.stringify(this.permissionByModule,null,2))
                return this.permissionByModule[0]=this.permissions=response.data.actions;
               
            }
                

        },

            error => console.log('error', error));
    }

    AddPermission(event) {
       if(event.state){
        console.log("Add permission Current event state")
        console.log(event.state)
        console.log("-------------------")
        //console.log(event.mod)
       }else{

       }
    }



    savePermissionSet(event) {
        if (event.state) {
            console.log("Current event state")
            console.log(event.state)
            console.log("-------------------")
            console.log(event.module)
            if (this.selectedModulesAndActions.find(modAndActions => modAndActions.module === event.module))
                this.selectedModulesAndActions.map((modAndAction) => {
                    if (modAndAction.module === event.module) {
                        modAndAction.actions.push(event.action);
                        console.log(modAndAction)
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
        console.log("OnSubmit..")
        this.roleModel.roleName = this.roleName.value;
        this.roleService.createRole(this.roleModel).subscribe((response: any) => {
            if (response.status === 200)
                this.router.navigate(['home/admin/roles'])
        }, (error) => {
            console.log("Error message from on submit \n"+ JSON.stringify(error,null,2))
        });
    }
    removeModulePermission(event){
        console.log("Remove Module Permission")
    }
    //Called by edit Role Button For Bulk editing 
    onSubmitUpdate(){
        this.roleModel.roleName = this.roleName.value;
        console.log("Update Role name to " + this.roleModel.roleName)
    }

}
