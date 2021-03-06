import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { DashboardComponent } from "./components/homepage/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { CreateCategoryComponent } from "./components/mobileCategory/mobileCategory.component";
import { CategoryFormComponent } from "./components/mobileCategory/mobile category form/category-form.component";
import { MobileTagsComponent } from "./components/mobileTags/mobile-tags.component";
import { MobileTagFormComponent } from "./components/mobileTags/mobileTagsForm/mobileTagsFormComponent";
import { MobileSubCategoriesComponent } from "./components/mobileSubCategories/MobileSubCategoriesComponent";
import { MobileSubCategoriesFormComponent } from "./components/mobileSubCategories/mobileSubCategoriesForm/mobile-sub-categories-form.component";
import { ContentSuggestionConfigComponent } from './components/content-suggestion-config/content-suggestion-config.component';
import { SmsCampaignComponent } from "./components/sms-campaign/list-campaign/sms-campaign.component";
import {CreateCampaignComponent} from "./components/sms-campaign/create-campaign/create-campaign.component"

import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";
import { CanActivateViaAuthGuard } from "./guards/PermissionGuard";

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
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "content",
        loadChildren: "./components/vod/vod.module#VodModule",
        canActivate: [AuthGuard],
      },
      {
        path: "package",
        loadChildren: "./components/package/package.module#PackageModule",
        canActivate: [AuthGuard, CanActivateViaAuthGuard],
        data: { moduleData: ["package"] },
      },
      {
        path: "video-library",
        loadChildren:
          "./components/video-library/video-library.module#VideoLibraryModule",
        canActivate: [AuthGuard, CanActivateViaAuthGuard],
        data: { moduleData: ["cdn"] },
      },
      {
        path: "banner",
        loadChildren: "./components/banner/banner.module#BannerModule",
        canActivate: [AuthGuard, CanActivateViaAuthGuard],
        data: { moduleData: ["banner"] },
      },
      {
        path: "tv-guide",
        loadChildren: "./components/tv-guide/tv-guide.module#GuideModule",
        canActivate: [AuthGuard, CanActivateViaAuthGuard],
        data: { moduleData: ["Program"] },
      },
      {
        path: "category",
        component: CreateCategoryComponent,
        canActivate: [AuthGuard, CanActivateViaAuthGuard],
        data: { moduleData: ["category"] },
      },
      {
        path: "subCategory",
        component: MobileSubCategoriesComponent,
        canActivate: [AuthGuard, CanActivateViaAuthGuard],
        data: { moduleData: ["subcategory", "read"] },
      },
      {
        path: "subCategoryForm/:id/:lang",
        component: MobileSubCategoriesFormComponent,
        canActivate: [AuthGuard, CanActivateViaAuthGuard],
        data: { moduleData: ["subcategory", "create"] },
      },
      {
        path: "MobileTags",
        component: MobileTagsComponent,
        canActivate: [AuthGuard, CanActivateViaAuthGuard],
        data: { moduleData: ["tag", "read"] },
      },
      {
        path: "reports",
        loadChildren: "./components/reports/reports.module#ReportsModule",
        canActivate: [AuthGuard, CanActivateViaAuthGuard],
        data: { moduleData: ["reports-portal"] },
      },
      {
        path: "support",
        loadChildren: "./components/support/support.module#SupportModule",
        canActivate: [AuthGuard, CanActivateViaAuthGuard],
        data: { moduleData: ["customer-support"] },
      },
      {
        path: "MobileTagForm/:id",
        component: MobileTagFormComponent,
        canActivate: [AuthGuard, CanActivateViaAuthGuard],
        data: { moduleData: ["tag", "create"] },
      },
      {
        path: "CategoryForm/:id",
        component: CategoryFormComponent,
        canActivate: [AuthGuard, CanActivateViaAuthGuard],
        data: { moduleData: ["category", "create"] },
      },
      {
        path: "content-suggestion",
        component: ContentSuggestionConfigComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "admin",
        loadChildren: "./components/admin/admin.module#AdminModule",
        canActivate: [AuthGuard],
      },
      {
        path:"list-campaign",
        component:SmsCampaignComponent,
      },
      {
        path:"create-campaign",
        component:CreateCampaignComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
