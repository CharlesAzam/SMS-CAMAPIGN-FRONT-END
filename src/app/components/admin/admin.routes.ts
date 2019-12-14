import { Routes } from '@angular/router';
import { AdminUsersListComponent } from './admin-users-list/admin-list.component';
import { AdminEditComponent } from './admin-users-edit/admin-edit.component';
import { RoleEditComponent } from './admin-role-edit/admin-role.component';
import { RoleListComponent } from './admin-roles-list/admin-roles.component';
// import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';


export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: 'users',
    component: AdminUsersListComponent
  },
  {
    path: 'users/:id',
    component: AdminEditComponent
  },
  {
    path: 'role/:id',
    component: RoleEditComponent
  },
  {
    path: 'roles',
    component: RoleListComponent
  }

]
