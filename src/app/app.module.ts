import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import {EditorModule} from '@tinymce/tinymce-angular';

import { MoviesService} from './services/movies.service';
import { MoviesModule } from './components/movie/movies.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './modules/app-material.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DashboardComponent } from './components/homepage/dashboard/dashboard.component';
import { CategoriesModule } from './components/homepage/categories/categories.module';
import { VodModule } from '../app/components/vod/vod.module';
import { PackageModule } from '../app/components/package/package.module';
import { CouponModule } from '../app/components/coupon/coupon.module';
import { RadioModule } from '../app/components/radio/radio.module';
import {CreateCategoryComponent} from './components/mobileCategory/mobileCategory.component'
import {CardComponentComponent} from './components/card-component/card-component.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { CreateSubCategoryComponent } from './components/create-sub-category/create-sub-category.component';
import { CreateTagsComponent } from './components/create-tags/create-tags.component';
import { CreateChannelsComponent } from './components/channels/create-channels.component'
import { ProductModule } from '../app/components/product/product.module';
import { VideoLibraryModule } from '../app/components/video-library/video-library.module';
import { BannerModule } from '../app/components/banner/banner.module';
import { CreateNewsStoryComponent } from './components/create-news-story/create-news-story.component';
import { CreateNewsVideosComponent } from './components/create-news-videos/create-news-videos.component';
import { CreateNewsPhotosComponent } from './components/create-news-photos/create-news-photos.component';
import { SelectionModel } from '@angular/cdk/collections';
import { CategoryFormComponent } from './components/mobileCategory/mobile category form/category-form.component';
import { CreateCategoriesModule } from './components/homepage/Demo2/create-categories.module';
import { MobileTagsComponent } from './components/mobileTags/mobile-tags.component';
import {MobileTagFormComponent} from './components/mobileTags/mobileTagsForm/mobileTagsFormComponent'
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
    CreateSubCategoryComponent,
    CreateTagsComponent,
    CreateChannelsComponent,
    CreateNewsStoryComponent,
    CreateNewsVideosComponent,
    CreateNewsPhotosComponent,
    CategoryFormComponent,
    MobileTagsComponent,
    MobileTagFormComponent
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
    CreateCategoriesModule,
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
