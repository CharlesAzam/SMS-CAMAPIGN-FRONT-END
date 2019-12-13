import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { DashboardComponent } from "./components/homepage/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { CreateCategoryComponent } from "./components/mobileCategory/mobileCategory.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { CreateTagsComponent } from "./components/newsTags/newsTagForm/newsTagForm.component";
import { ChannelComponent } from "./components/channels/channel.component";
import { CreateChannelsComponentForm } from "./components/channels/channelForm/create-channels.component";
import { CreateNewsStoryComponent } from "./components/newsStroyIdea/newsStoryIdeaForm/newsStoryIdeaForm.component";
import { CreateNewsVideosComponent } from "./components/newsVideos/newsVideos.component";
import { CreateNewsPhotosComponent } from "./components/newsPhotos/newsPhotosForms/create-news-photos.component";
import { CategoryFormComponent } from "./components/mobileCategory/mobile category form/category-form.component";
// import { CreateCategoriesModule } from "./components/homepage/Demo2/create-categories.module";
import { MobileTagsComponent } from "./components/mobileTags/mobile-tags.component";
import { MobileTagFormComponent } from "./components/mobileTags/mobileTagsForm/mobileTagsFormComponent";
import { MobileSubCategoriesComponent } from "./components/mobileSubCategories/MobileSubCategoriesComponent";
import { MobileSubCategoriesFormComponent } from "./components/mobileSubCategories/mobileSubCategoriesForm/mobile-sub-categories-form.component";
import { NewsTagComponent } from "./components/newsTags/news-tag/news-tag.component";
import { NewsStroyIdeaComponent } from "./components/newsStroyIdea/news-stroy-idea/news-stroy-idea.component";
import { NewsPhotosComponent } from "./components/newsPhotos/news-photos/news-photos.component";

import { LeagueComponent } from "./components/league/league-form/league.component";
import { LeaguelistComponent } from "./components/league/league-list/leaguelist.component";
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "home",
    component: HomepageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        component: DashboardComponent
        , canActivate: [AuthGuard],



      },
      {
        path: "movies",
        loadChildren: "./components/movie/movies.module#MoviesModule"
        , canActivate: [AuthGuard],

      },
      {
        path: "categories",
        loadChildren:
          "./components/homepage/categories/categories.module#CategoriesModule", canActivate: [AuthGuard],

      },
      {
        path: "content",
        loadChildren: "./components/vod/vod.module#VodModule", canActivate: [AuthGuard],

      },
      {
        path: "package",
        loadChildren: "./components/package/package.module#PackageModule", canActivate: [AuthGuard],

      },
      {
        path: "coupon",
        loadChildren: "./components/coupon/coupon.module#CouponModule", canActivate: [AuthGuard],

      },
      // {
      //   path: "radio",
      //   loadChildren: "./components/radio/radio.module#RadioModule"
      // },
      {
        path: "product",
        loadChildren: "./components/product/product.module#ProductModule", canActivate: [AuthGuard],

      },
      {
        path: "video-library",
        loadChildren:
          "./components/video-library/video-library.module#VideoLibraryModule", canActivate: [AuthGuard],

      },
      {
        path: "banner",
        loadChildren: "./components/banner/banner.module#BannerModule", canActivate: [AuthGuard],

      },
      {
        path: "program",
        loadChildren: "./components/programs/program.module#ProgramModule", canActivate: [AuthGuard],

      },
      {
        path: "category",
        component: CreateCategoryComponent, canActivate: [AuthGuard],

      },
      {
        path: "sideBar",
        component: SideNavComponent, canActivate: [AuthGuard],

      },
      {
        path: "subCategory",
        component: MobileSubCategoriesComponent, canActivate: [AuthGuard],

      },
      {
        path: "subCategoryForm/:id",
        component: MobileSubCategoriesFormComponent, canActivate: [AuthGuard],

      },
      {
        path: "NewsTags",
        component: NewsTagComponent, canActivate: [AuthGuard],

      },
      {
        path: "NewsTagsForms",
        component: CreateTagsComponent, canActivate: [AuthGuard],

      },
      {
        path: "MobileTags",
        component: MobileTagsComponent, canActivate: [AuthGuard],

      },
      {
        path: "MobileTagForm/:id",
        component: MobileTagFormComponent, canActivate: [AuthGuard],

      },
      {
        path: "Channels",
        component: ChannelComponent, canActivate: [AuthGuard],

      },
      {
        path: "ChannelsForm",
        component: CreateChannelsComponentForm, canActivate: [AuthGuard],

      },
      {
        path: "StoriesIdea",
        component: NewsStroyIdeaComponent, canActivate: [AuthGuard],

      },
      {
        path: "StoriesIdeaForm",
        component: CreateNewsStoryComponent, canActivate: [AuthGuard],

      },
      {
        path: "NewsVideos",
        component: CreateNewsVideosComponent, canActivate: [AuthGuard],

      },
      {
        path: "NewsPhoto",
        component: NewsPhotosComponent, canActivate: [AuthGuard],

      },
      {
        path: "NewsPhotoForm",
        component: CreateNewsPhotosComponent, canActivate: [AuthGuard],

      },
      {
        path: "CategoryForm/:id",
        component: CategoryFormComponent, canActivate: [AuthGuard],

      },
      {
        path: "Demo2",
        loadChildren:
          "./components/homepage/Demo2/create-categories.module#CreateCategoriesModule"
      },
      {
        path: "admin",
        loadChildren:
          "./components/admin/admin.module#AdminModule", canActivate: [AuthGuard],

      },
      {
        path: "LeagueList",
        component: LeaguelistComponent, canActivate: [AuthGuard],

      },
      {
        path: "CreateLeague",
        component: LeagueComponent, canActivate: [AuthGuard],

      },
      {
        path: "CreateLeague/:id",
        component: LeagueComponent, canActivate: [AuthGuard],

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
