import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/modules/app-material.module';
import { ADMIN_ROUTES } from './admin.routes';
import { AdminService } from './admin.service';
import { AdminEditComponent } from './admin-users-edit/admin-edit.component';
import { AdminUsersListComponent } from './admin-users-list/admin-list.component';
import { RoleEditComponent } from './admin-role-edit/admin-role.component';
import { RoleListComponent } from './admin-roles-list/admin-roles.component';
import { CheckBoxComponent } from './checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  declarations: [
    CheckBoxComponent,
    AdminEditComponent,
    AdminUsersListComponent,
    RoleEditComponent,
    RoleListComponent
  ],
  providers: [
    AdminService
  ],
  exports: [
  ]
})
export class AdminModule { }
