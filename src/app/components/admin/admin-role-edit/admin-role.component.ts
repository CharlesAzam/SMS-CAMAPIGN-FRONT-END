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

    constructor(private router: Router, private roleService: AdminService) { }

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
