import { Routes } from "@angular/router";
import { GuideListComponent } from "./tv-guide-list/tv-guide-list.component";
import { GuideEditComponent } from "./tv-guide-edit/tv-guide-edit.component";

export const GUIDE_ROUTES: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "tv-guide",
  },
  {
    path: "tv-guide",
    component: GuideListComponent,
  },
  {
    path: "tv-guide/:id",
    component: GuideEditComponent,
  },
];
