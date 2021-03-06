import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/app-material.module";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { DashboardComponent } from "./components/homepage/dashboard/dashboard.component";
import { VodModule } from "../app/components/vod/vod.module";
import { PackageModule } from "../app/components/package/package.module";
import { CreateCategoryComponent } from "./components/mobileCategory/mobileCategory.component";

import { VideoLibraryModule } from "../app/components/video-library/video-library.module";
import { BannerModule } from "../app/components/banner/banner.module";
import { CategoryFormComponent } from "./components/mobileCategory/mobile category form/category-form.component";
import { MobileTagsComponent } from "./components/mobileTags/mobile-tags.component";
import { MobileTagFormComponent } from "./components/mobileTags/mobileTagsForm/mobileTagsFormComponent";
import { MobileSubCategoriesComponent } from "./components/mobileSubCategories/MobileSubCategoriesComponent";
import { MobileSubCategoriesFormComponent } from "./components/mobileSubCategories/mobileSubCategoriesForm/mobile-sub-categories-form.component";
import { LanguageService } from "./services/language.service";
import { CountryService } from "./services/coutry.service";
import {SmsCampaignService} from "./services/sms-campaign.service";
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
import { TicketDescriptionDialog } from "./components/ticket-description/dialog-ticket-description";
import { CategoriesService } from "./services/categories.service";
import { CanActivateViaAuthGuard } from "./guards/PermissionGuard";
import { NoWhitespaceDirective } from "./validators/no-whitespace.directive";
import { GuideModule } from "./components/tv-guide/tv-guide.module";
import { ContentSuggestionConfigComponent } from './components/content-suggestion-config/content-suggestion-config.component';
import {ContentSuggestionService} from './services/suggestion.service';
import { SmsCampaignComponent } from './components/sms-campaign/list-campaign/sms-campaign.component';
import { MultiSelectDropdownComponent } from './components/sms-campaign/multi-select-dropdown/multi-select-dropdown.component';
import { CreateCampaignComponent } from './components/sms-campaign/create-campaign/create-campaign.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SmsCampaignModalComponent } from './components/sms-campaign/modals/sms-campaign-modal/sms-campaign-modal.component';
// import { TopnavComponent } from './components/topnav/topnav.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    DashboardComponent,
    CreateCategoryComponent,
    CategoryFormComponent,
    MobileTagsComponent,
    MobileTagFormComponent,
    MobileSubCategoriesComponent,
    MobileSubCategoriesFormComponent,
    
    ErrorDialog,
    WarningDialog,
    TicketDescriptionDialog,
    ContentSuggestionConfigComponent,
    SmsCampaignComponent,
    MultiSelectDropdownComponent,
    CreateCampaignComponent,
    SmsCampaignModalComponent,
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
    VodModule,
    PackageModule,
    NgxMatSelectSearchModule,
    VideoLibraryModule,
    BannerModule,
    GuideModule,
    ReactiveFormsModule,
    ReportsModule,
    SupportModule,
    MatInputModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [ErrorDialog, WarningDialog, TicketDescriptionDialog,SmsCampaignModalComponent],
  providers: [
    LanguageService,
    CountryService,
    LeagueService,
    CategoriesService,
    ContentSuggestionService,
    CanActivateViaAuthGuard,
    SmsCampaignService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
