import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';

import { MoviesService} from './services/movies.service';
import { MoviesModule } from './components/movie/movies.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './modules/app-material.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DashboardComponent } from './components/homepage/dashboard/dashboard.component';
import { CategoriesModule } from './components/homepage/categories/categories.module';
import {CreateCategoryComponent} from './components/create-category/create-category.component'
import {CardComponentComponent} from './components/card-component/card-component.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { CreateSubCategoryComponent } from './components/create-sub-category/create-sub-category.component';
import { CreateTagsComponent } from './components/create-tags/create-tags.component';
import { CreateChannelsComponent } from './components/create-channels/create-channels.component'
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
    CreateChannelsComponent
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
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
