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
import {CreateNewsTagComponent} from './components/create-news-tag/create-news-tag.component'
import {CreateNewsStoryComponent} from './components/create-news-story/create-news-story.component'
import {CreateNewsVideosComponent} from './components/create-news-videos/create-news-videos.component'
import {CreateNewsPhotosComponent} from './components/create-news-photos/create-news-photos.component'
import {CategoryFormComponent} from './components/category-form/category-form.component'
import {CreateCategoriesModule} from './components/homepage/Demo2/create-categories.module'

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
      },
      {
        path: "product",
        loadChildren: "./components/product/product.module#ProductModule"
      },
      {
        path: "video-library",
        loadChildren: "./components/video-library/video-library.module#VideoLibraryModule"
      },
      {
        path: "category",
        component: CreateCategoryComponent
      },
      {
        path: 'sideBar',
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
        path:'Tag',
        component:CreateNewsTagComponent

      },
      {
        path:'Channels',
        component:CreateChannelsComponent
      },
      {
        path: 'StoriesIdea',
        component:CreateNewsStoryComponent
      },
      {
        path:'NewsVideos',
        component:CreateNewsVideosComponent
      },
      {
        path:'NewsPhoto',
        component:CreateNewsPhotosComponent

      },
      {
        path:'CategoryForm',
        component:CategoryFormComponent
      },
      {
        path:'Demo2',
        loadChildren:'./components/homepage/Demo2/create-categories.module#CreateCategoriesModule'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
