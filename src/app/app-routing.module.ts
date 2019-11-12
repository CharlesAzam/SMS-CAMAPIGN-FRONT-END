import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { DashboardComponent } from './components/homepage/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import {CreateCategoryComponent} from './components/create-category/create-category.component'
import {SideNavComponent} from './components/side-nav/side-nav.component'
import {CreateSubCategoryComponent} from './components/create-sub-category/create-sub-category.component'
import {CreateTagsComponent} from './components/create-tags/create-tags.component';
import {CreateChannelsComponent} from './components/create-channels/create-channels.component'
const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {path:"login",component:LoginComponent},
  {
    path: "home",
    component: HomepageComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "movies",
        loadChildren: "./components/movie/movies.module#MoviesModule"
      },
      {
        path: "categories",
        loadChildren: "./components/homepage/categories/categories.module#CategoriesModule"
      },
      {
        path: "category",
        component: CreateCategoryComponent
      },
      {
        path:'sideBar',
        component: SideNavComponent
      },
      {
        path:'subCategory',
        component:CreateSubCategoryComponent
      },
      {
        path:'Tags',
        component:CreateTagsComponent
      },
      {
        path:'Channels',
        component:CreateChannelsComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
