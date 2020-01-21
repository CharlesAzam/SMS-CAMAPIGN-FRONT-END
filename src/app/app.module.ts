import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { EditorModule } from "@tinymce/tinymce-angular";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/app-material.module";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { DashboardComponent } from "./components/homepage/dashboard/dashboard.component";
import { VodModule } from "../app/components/vod/vod.module";
import { PackageModule } from "../app/components/package/package.module";
import { CouponModule } from "../app/components/coupon/coupon.module";
import { CreateCategoryComponent } from "./components/mobileCategory/mobileCategory.component";
import { CardComponentComponent } from "./components/card-component/card-component.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { ProductModule } from "../app/components/product/product.module";
import { VideoLibraryModule } from "../app/components/video-library/video-library.module";
import { BannerModule } from "../app/components/banner/banner.module";
import { SelectionModel } from "@angular/cdk/collections";
import { CategoryFormComponent } from "./components/mobileCategory/mobile category form/category-form.component";
import { MobileTagsComponent } from "./components/mobileTags/mobile-tags.component";
import { MobileTagFormComponent } from "./components/mobileTags/mobileTagsForm/mobileTagsFormComponent";
import { MobileSubCategoriesComponent } from "./components/mobileSubCategories/MobileSubCategoriesComponent";
import { MobileSubCategoriesFormComponent } from "./components/mobileSubCategories/mobileSubCategoriesForm/mobile-sub-categories-form.component";
import { LanguageService } from "./services/language.service";
import { CountryService } from "./services/coutry.service";
import { ProgramModule } from "./components/programs/program.module";
import { LeagueComponent } from "./components/league/league-form/league.component";
import { LeaguelistComponent } from "./components/league/league-list/leaguelist.component";
import { MatInputModule } from "@angular/material";
import { LeagueService } from "./services/league.service";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";
import { JwtInterceptor } from "./services/interceptor.service";
import { ErrorInterceptor } from "./services/error-interceptor.service";
import { ErrorDialog } from "./components/error-dialog/dialog-error";
import { AdminModule } from "./components/admin/admin.module";
import { ReportsModule } from "./components/reports/reports.module";
import { SupportModule } from "./components/support/support.module";
import { WarningDialog } from "./components/warning-dialog/dialog-warning";
import { TicketDescriptionDialog } from './components/ticket-description/dialog-ticket-description';
import { CategoriesService } from './services/categories.service';
import { CanActivateViaAuthGuard } from './guards/PermissionGuard';

// import { TopnavComponent } from './components/topnav/topnav.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    DashboardComponent,
    CreateCategoryComponent,
    CardComponentComponent,
    SideNavComponent,
    CategoryFormComponent,
    MobileTagsComponent,
    MobileTagFormComponent,
    MobileSubCategoriesComponent,
    MobileSubCategoriesFormComponent,
    LeagueComponent,
    LeaguelistComponent,
    // TopnavComponent
    ErrorDialog,
    WarningDialog,
    TicketDescriptionDialog
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    // CategoriesModule,
    VodModule,
    PackageModule,
    NgxMatSelectSearchModule,
    CouponModule,
    ProductModule,
    VideoLibraryModule,
    BannerModule,
    EditorModule,
    ProgramModule,
    ReactiveFormsModule,
    ReportsModule,
    SupportModule,
    MatInputModule
  ],
  entryComponents: [ErrorDialog, WarningDialog,TicketDescriptionDialog],
  providers: [
    LanguageService,
    CountryService,
    LeagueService,
    CategoriesService,
    CanActivateViaAuthGuard,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
