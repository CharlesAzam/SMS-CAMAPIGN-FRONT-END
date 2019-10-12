import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
const routes: Routes = [
  //{ path: "", component: LoginComponent },
  {
    path: "",
    loadChildren: "./components/movies/movies.module#MoviesModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
