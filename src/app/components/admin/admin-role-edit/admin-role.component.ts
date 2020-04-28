import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
//import { map, switchMap, filter } from 'rxjs/operators';
//import { of, Observable, from } from 'rxjs';
//import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import { Role } from '../Role';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { NoWhitespaceValidator } from 'src/app/validators/no-whitespace.validator';
import { MatDialog } from '@angular/material/dialog';
import { RoleEditDialogComponent } from '../admin-role-edit-dialog/role-edit-dialog/role-edit-dialog.component'


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
    permissions = []
    selectedModulesAndActions: any[] = [];
    modulesAndActions: any[] = [];

    @Input() heading: String = null;
    @Input() placeHolderValue: String = null;
    @Input() permissionByModule: any[] = [];
    @Input() AllRolePermissions: any[] = [];
    @Input() RoleName: string;
    @Input() EmptyStringMsg: String = null
    @Input() Checked: boolean= true;


    previousUrl: string;
    constructor(private router: Router, private roleService: AdminService, private activatedRoute: ActivatedRoute,public dialog: MatDialog) {
        this.router.events.subscribe((event) => {
          //  console.log("Router events \n", event)
            // if (event instanceof NavigationEnd) {
            //    // Trick the Router into believing it's last link wasn't previously loaded
            //    this.router.navigated = false;
            // }
        });

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
                this.RoleName = roleName;
                this.roleName.setValue(roleName)
                this.roleService.getRolePermission(roleName).subscribe((response: any) => {
                    if (response.status === 200)
                        console.log("Response Data")
                    // console.log(response.data)
                    //this.getModulesAndActions2
                    let arr = [];
                    let moduleArr = [];
                    //console.log(response.data)

                    Object.keys(response.data).forEach((key) => {
                        // console.log("Iterator function "+key)
                        arr.push({
                            module: key,
                            actions: response.data[key],
                        })
                    });

                    this.modulesAndActions = arr;
                    // console.log('Filter module list \n')
                    this.modulesAndActions.forEach((c) => {
                        // console.log(c.module)
                        moduleArr.push(c.module)
                    });

                    //console.log('Filter module \n', moduleArr)
                    this.getModulesAndActionsUpdate(moduleArr);
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

    getModulesAndActionsUpdate(x) {
        this.roleService.getModulesAndActions().subscribe((response: any) => {
            if (response.status === 200)
                this.AllRolePermissions = response.data;
            let arr1_copy = []
            arr1_copy = this.AllRolePermissions;
            let arr2 = [];
            arr2 = x,

                //Filter All permissions based on selected roles
                arr2.forEach((element1) => {

                    arr1_copy.forEach((element2, index) => {
                        //console.log(`element2 at ${JSON.stringify(element2.module,null,2)} at ${index}`)
                        if (element1 == element2.module) {
                            //  console.log(`Match found for ${JSON.stringify(element2,null,2)} at ${index} \n`)
                            this.AllRolePermissions.splice(index, 1)
                        } else {
                            return
                        }
                    })

                })
            //console.log(`final result ${JSON.stringify(this.AllRolePermissions,null,2)} \n`)       
                //console.log(`final result ${JSON.stringify(this.AllRolePermissions,null,2)} \n`)       
            //console.log(`final result ${JSON.stringify(this.AllRolePermissions,null,2)} \n`)       
        },
            error => console.log('error', error));
    }


    fetchModulePermssion(module: string) {
        // console.log("fetchModulePermssion function "+module)
        this.roleService.getModulePermission(module).subscribe((response: any) => {
            // console.log("response result" +JSON.stringify(response))
            // console.log("------------------")
            //
            if (response.status === 200) {
                //  console.log("Module Permission Result")
                // console.log(JSON.stringify(this.permissionByModule,null,2))
                return this.permissionByModule[0] = this.permissions = response.data.actions;

            } else if (response.status != 200) {
                error => console.log('error', error);
                
                let message=`${module} has not been assigned any permission`
                this.openDialog(message)

            }


        },

            error => console.log('error', error));
    }

    AddPermission(event) {
        if (event.state) {
            console.log("Add permission Current event state")
            console.log(event.state)
            console.log("-------------------")
            //console.log(event.mod)
        } else {

        }
    }

    removeModule(param) {
        let rolename = this.RoleName
        let module = param;
        console.log("Removing module " + module + ` for role name ${rolename}`);
        //this.modulesAndActions.po
        this.roleService.RemoveSingleModule(rolename, module).subscribe((response: any) => {
            console.log("response result" + JSON.stringify(response))
            console.log("------------------")
            //
            if (response.status === 200) {
                let rolename = this.RoleName
                console.log(`Module ${module} removed.`)
                console.log(JSON.stringify(this.permissionByModule, null, 2))

                //this.router.navigate(['/role',`${rolename}`]); 
                this.router.navigate([this.router.url])
                //return this.permissionByModule[0]=this.permissions=response.data.actions;

            } else if (response.status != 200) {
                //error => console.log('error', error);
                let message=`${module}` + " could not be removed!"
                this.openDialog(message)

            }


        },
            error => console.log('error', error));
    }

    pushSinglePermission(param, param2) {
        let arrPemHolder = [];
        let pushPermission = JSON.stringify(param);
        const l = pushPermission.length
        let permission = pushPermission.slice(1, l - 1)
        console.log("Adding permission " + permission + " module " + param2)
        for (let i = 0; i < this.modulesAndActions.length; i++) {
            console.log(`#######################################`)
            console.log(`permision array \n` + JSON.stringify(this.permissionByModule[i], null, 2))
            console.log(`#######################################`)
            if (this.modulesAndActions[i].module == param2) {
                console.log(`Match found pushing ${param}` + " " + "to module \n" + JSON.stringify(this.modulesAndActions[i], null, 2))
                arrPemHolder[0] = this.modulesAndActions[i].actions;

                console.log("arrPem values ==> " + arrPemHolder)

                console.log(`----------------------------------------`)
                for (let i = 0; i < this.modulesAndActions[i].actions.length; i++) {
                    console.log(`cheking permission ${param} in array ` + this.modulesAndActions[i].actions)
                    const found = arrPemHolder[0].find(item => item == param)
                    console.log("found permisiion " + found);
                    if (found == null) {
                        console.log(`pushing permission ${param} in` + this.modulesAndActions[i].actions)
                        /*push permission to db here*/
                        this.updateModuleAction(param2, permission)


                    } else if (found != null) {
                        alert(`Permission ${param} is already present!.`)
                        //this.modulesAndActions[i].actions.pop()
                        // let   index= this.modulesAndActions[i].actions.indexOf(this.modulesAndActions[i].actions[i]);
                        console.log(`Duplicate permission ` + this.modulesAndActions[i].actions[i])//+` at index ${index}`)
                        return;
                        // console.log(`Removing duplicate permission `+this.modulesAndActions[i].actions[i]+` at index ${index}`)
                    }

                }


                //this.modulesAndActions.push(pushPermission) 
              //this.modulesAndActions.push(pushPermission) 
                //this.modulesAndActions.push(pushPermission) 
            }
        }

    }

    addModule(module, action) {

        let rolename = this.RoleName
        this.roleService.AddSingleModule(rolename, module, action).subscribe((response: any) => {
            console.log("response result" + JSON.stringify(response))
            console.log("------------------")
            //
            if (response.status === 200) {
                console.log(`Module ${module} Added.`)
                //console.log(JSON.stringify(this.permissionByModule,null,2))
                //return this.permissionByModule[0]=this.permissions=response.data.actions;
                //let rolename=this.RoleName
                this.router.navigate([this.router.url])

                //console.log('this url --> ', this.router.url)
                // location.reload(); 
                //return response.actions

            } else if (response.status != 200) {
                //error => console.log('error', error);
                let message=`${module} already added!`
                this.openDialog(message)

            }


        },

            error => console.log('error', error));



    }



    savePermissionSet(event) {
        console.log("event status \n" + JSON.stringify(event, null, 2))
        if (event.state) {
            // console.log("Current event state")
            // console.log(event.state)
            // console.log("-------------------")
            // console.log("event module " + event.module)
            // console.log("event action " + event.action)
            // console.log("-------------------")
            // console.log("-------------------")
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

    updateModuleAction(moduleName, action) {
        var Rolename = this.RoleName
        this.roleService.updateSinglePermission(Rolename, moduleName, action).subscribe((response: any) => {
            console.log("response result" + JSON.stringify(response))
            console.log("------------------")
            //
            if (response.status === 200) {
               // console.log(`Module ${module} Added.`)
                //console.log(JSON.stringify(this.permissionByModule,null,2))
                //return this.permissionByModule[0]=this.permissions=response.data.actions;
                let rolename = this.RoleName
                //this.router.navigateByUrl(`role/${rolename}`, { skipLocationChange: true }).then(() => {
                    this.router.navigate([this.router.url]);
                //});
                //return response.actions

            } else if (response.status != 200) {
                //error => console.log('error', error);
              //  alert(`${module}` + " already added!")

            }


        },

            error => console.log('error', error));
    }


 onSubmit() {
        console.log("OnSubmit..")
        this.roleModel.roleName = this.roleName.value;
        this.roleService.createRole(this.roleModel).subscribe((response: any) => {
            if (response.status === 200)
                this.router.navigate(['home/admin/roles'])
        }, (error) => {
            console.log("Error message from on submit \n" + JSON.stringify(error, null, 2))
        });
    }

    openDialog(message) {
        const dialogRef = this.dialog.open(RoleEditDialogComponent,{
          data:{
            message: `${message}`,
            buttonText: {
              ok: 'ok',
              cancel: 'cancel'
            }
          }
        })}

    

    
    removeModulePermission(module, action,actions) {
        var Rolename = this.RoleName
        let ac=[]
        ac=actions;

        console.log('array of actions ',ac);
        let permissions=ac.length-1;
        console.log(`permission present ${permissions}`)
        console.log("Remove Module Permission " + action + " module " + module)

            if(permissions==1)
            {
               // console.log(`permission present ${permissions}`)
               let message=`Deleting permission ${action} will result in module being removed ?`;
               this.openDialog(message)
              
            }
            this.roleService.deleteSinglePermission(Rolename, module, action).subscribe((response: any) => {
               // console.log("response result" + JSON.stringify(response))
                //console.log("------------------")
                //
                if (response.status === 200) {
                    //console.log(`Module ${module} Added.`)
                    //console.log(JSON.stringify(this.permissionByModule,null,2))
                    //return this.permissionByModule[0]=this.permissions=response.data.actions;
                    //this.router.navigateByUrl(`role/${rolename}`, { skipLocationChange: true }).then(() => {
                        this.router.navigate([this.router.url]);
                    // });
                    //return response.actions
    
                } else if (response.status != 200) {
                    //error => console.log('error', error);
                    //alert(`${action}` + " already removed! from " + `${module}`)
                    let message=`${action} already removed from ${module}!`
                    this.openDialog(message)
                    this.router.navigate([this.router.url]);
    
                }
    
    
            },
    
                error => console.log('error', error));
        // }else{
        //     //Open Dialog
        //     this.openDialog;
        // }
      
    }

    
    //Called by edit Role Button For Bulk editing 
    onSubmitUpdate() {
        var oldRoleName = this.RoleName
        var newRoleName = this.roleModel.roleName = this.roleName.value;
        console.log("Update Role name to " + newRoleName + " from " + oldRoleName)
        this.roleService.UpdateRoleName(oldRoleName, newRoleName).subscribe((response: any) => {
            if (response.status === 200)
                this.router.navigate(['home/admin/roles'])
        }, (error) => {
            let message=` Error updating role name \n" + ${error}`
            this.openDialog(message)
            console.log("Error message from on submit \n" + JSON.stringify(error, null, 2))
        });
    }

}
