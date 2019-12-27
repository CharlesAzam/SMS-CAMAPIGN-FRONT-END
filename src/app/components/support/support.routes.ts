import { Routes } from '@angular/router';
import { LoggedSupportComponent } from './logged-support/logged-support.component';
import { UserInformationComponent } from './user-information/user-informationcomponent';
import { DetailedInformationComponent } from './detailed-information/detailed-information.component';


export const SUPPORT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'logged-support'
  },
  {
    path: 'logged-support',
    component: LoggedSupportComponent
  },
  {
    path: 'user-information',
    component: UserInformationComponent
  },
  {
    path: 'detailed-information/:id',
    component: DetailedInformationComponent
  }
]
