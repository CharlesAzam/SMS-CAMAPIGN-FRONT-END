import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { DashboardComponent } from './components/homepage/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { CreateCategoryComponent } from './components/mobileCategory/mobileCategory.component'
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { CreateTagsComponent } from './components/newsTags/newsTagForm/newsTagForm.component';
import { ChannelComponent } from './components/channels/channel.component'
import { CreateChannelsComponentForm } from './components/channels/channelForm/create-channels.component'
import { CreateNewsStoryComponent } from './components/newsStroyIdea/newsStoryIdeaForm/newsStoryIdeaForm.component'
import { CreateNewsVideosComponent } from './components/newsVideos/newsVideos.component'
import { CreateNewsPhotosComponent } from './components/newsPhotos/newsPhotosForms/create-news-photos.component'
import { CategoryFormComponent } from './components/mobileCategory/mobile category form/category-form.component'
import { CreateCategoriesModule } from './components/homepage/Demo2/create-categories.module'
import { MobileTagsComponent } from './components/mobileTags/mobile-tags.component';
import { MobileTagFormComponent } from './components/mobileTags/mobileTagsForm/mobileTagsFormComponent'
import { MobileSubCategoriesComponent } from './components/mobileSubCategories/MobileSubCategoriesComponent';
import { MobileSubCategoriesFormComponent } from './components/mobileSubCategories/mobileSubCategoriesForm/mobile-sub-categories-form.component';
import { NewsTagComponent } from './components/newsTags/news-tag/news-tag.component';
import { NewsStroyIdeaComponent } from './components/newsStroyIdea/news-stroy-idea/news-stroy-idea.component';
import { NewsPhotosComponent } from './components/newsPhotos/news-photos/news-photos.component';
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
        path: "content",
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
      // {
      //   path: "radio",
      //   loadChildren: "./components/radio/radio.module#RadioModule"
      // },  
      {
        path: "product",
        loadChildren: "./components/product/product.module#ProductModule"
      },
      {
        path: "video-library",
        loadChildren: "./components/video-library/video-library.module#VideoLibraryModule"
      },
      {
        path: "banner",
        loadChildren: "./components/banner/banner.module#BannerModule"
      },
      {
        path: "program",
        loadChildren: "./components/programs/program.module#ProgramModule"
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
        path: 'subCategory',
        component: MobileSubCategoriesComponent
      },
      {
        path: 'subCategoryForm/:id',
        component: MobileSubCategoriesFormComponent
      },
      {
        path: 'NewsTags',
        component: NewsTagComponent
      },
      {
        path: 'NewsTagsForms',
        component: CreateTagsComponent
      },
      {
        path: 'MobileTags',
        component: MobileTagsComponent
      },
      {
        path: 'MobileTagForm/:id',
        component: MobileTagFormComponent

      },
      {
        path: 'Channels',
        component: ChannelComponent
      },
      {
        path: 'ChannelsForm',
        component: CreateChannelsComponentForm
      },
      {
        path: 'StoriesIdea',
        component: NewsStroyIdeaComponent
      },
      {
        path: 'StoriesIdeaForm',
        component: CreateNewsStoryComponent
      },
      {
        path: 'NewsVideos',
        component: CreateNewsVideosComponent
      },
      {
        path: 'NewsPhoto',
        component: NewsPhotosComponent
      },
      {
        path: 'NewsPhotoForm',
        component: CreateNewsPhotosComponent

      },
      {
        path: 'CategoryForm/:id',
        component: CategoryFormComponent
      },
      {
        path: 'Demo2',
        loadChildren: './components/homepage/Demo2/create-categories.module#CreateCategoriesModule'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
