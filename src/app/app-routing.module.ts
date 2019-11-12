import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { DashboardComponent } from './components/homepage/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import {CreateCategoryComponent} from './components/create-category/create-category.component'
import {SideNavComponent} from './components/side-nav/side-nav.component'


const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
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
        path: "vod",
        loadChildren: "./components/vod/vod.module#VodModule"
      },
      {
        path: "package",
        loadChildren: "./components/package/package.module#PackageModule"
      },
      {
        path: "coupon",
        loadChildren: "./components/coupon/coupon.module#CouponModule"
      },
      {
        path: "radio",
        loadChildren: "./components/radio/radio.module#RadioModule"
      },{
        path: "category",
        component: CreateCategoryComponent
      },
      {
        path:'sideBar',
        component: SideNavComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
