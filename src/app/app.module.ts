import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { EditorModule } from "@tinymce/tinymce-angular";

import { MoviesService } from "./services/movies.service";
import { MoviesModule } from "./components/movie/movies.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/app-material.module";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { DashboardComponent } from "./components/homepage/dashboard/dashboard.component";
import { CategoriesModule } from "./components/homepage/categories/categories.module";
import { VodModule } from "../app/components/vod/vod.module";
import { PackageModule } from "../app/components/package/package.module";
import { CouponModule } from "../app/components/coupon/coupon.module";
import { RadioModule } from "../app/components/radio/radio.module";
import { CreateCategoryComponent } from "./components/mobileCategory/mobileCategory.component";
import { CardComponentComponent } from "./components/card-component/card-component.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { CreateTagsComponent } from "./components/newsTags/newsTagForm/newsTagForm.component";
import { CreateChannelsComponentForm } from "./components/channels/channelForm/create-channels.component";
import { ProductModule } from "../app/components/product/product.module";
import { VideoLibraryModule } from "../app/components/video-library/video-library.module";
import { BannerModule } from "../app/components/banner/banner.module";
import { CreateNewsStoryComponent } from "./components/newsStroyIdea/newsStoryIdeaForm/newsStoryIdeaForm.component";
import { CreateNewsVideosComponent } from "./components/newsVideos/newsVideos.component";
import { CreateNewsPhotosComponent } from "./components/newsPhotos/newsPhotosForms/create-news-photos.component";
import { SelectionModel } from "@angular/cdk/collections";
import { CategoryFormComponent } from "./components/mobileCategory/mobile category form/category-form.component";
import { CreateCategoriesModule } from "./components/homepage/Demo2/create-categories.module";
import { MobileTagsComponent } from "./components/mobileTags/mobile-tags.component";
import { MobileTagFormComponent } from "./components/mobileTags/mobileTagsForm/mobileTagsFormComponent";
import { MobileSubCategoriesComponent } from "./components/mobileSubCategories/MobileSubCategoriesComponent";
import { MobileSubCategoriesFormComponent } from "./components/mobileSubCategories/mobileSubCategoriesForm/mobile-sub-categories-form.component";
import { ChannelComponent } from "./components/channels/channel.component";
import { NewsTagComponent } from "./components/newsTags/news-tag/news-tag.component";
import { NewsStroyIdeaComponent } from "./components/newsStroyIdea/news-stroy-idea/news-stroy-idea.component";
import { NewsPhotosComponent } from "./components/newsPhotos/news-photos/news-photos.component";
import { LanguageService } from "./services/language.service";
import { CountryService } from "./services/coutry.service";
import { ProgramModule } from "./components/programs/program.module";
import { AdminComponent } from "./components/admin/Create-Role/admin.component";
import { UserListComponent } from "./components/admin/user-list/user-list.component";
import { LeagueComponent } from "./components/league/league-form/league.component";
import { LeaguelistComponent } from "./components/league/league-list/leaguelist.component";
import { MatInputModule } from "@angular/material";
import { LeagueService } from "./services/league.service";

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
    CreateTagsComponent,
    CreateChannelsComponentForm,
    CreateNewsStoryComponent,
    CreateNewsVideosComponent,
    CreateNewsPhotosComponent,
    CategoryFormComponent,
    MobileTagsComponent,
    MobileTagFormComponent,
    MobileSubCategoriesComponent,
    MobileSubCategoriesFormComponent,
    ChannelComponent,
    NewsTagComponent,
    NewsStroyIdeaComponent,
    NewsPhotosComponent,
    AdminComponent,
    UserListComponent,
    LeagueComponent,
    LeaguelistComponent
    // TopnavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MoviesModule,
    MaterialModule,
    BrowserAnimationsModule,
    CategoriesModule,
    VodModule,
    PackageModule,
    CouponModule,
    RadioModule,
    ProductModule,
    VideoLibraryModule,
    BannerModule,
    EditorModule,
    ProgramModule,
    CreateCategoriesModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [MoviesService, LanguageService, CountryService, LeagueService],
  bootstrap: [AppComponent]
})
export class AppModule {}
