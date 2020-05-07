import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { GuideListComponent } from "./tv-guide-list/tv-guide-list.component";
import { GuideEditComponent } from "./tv-guide-edit/tv-guide-edit.component";
import { GuideService } from "./tv-guide.service";
import { GUIDE_ROUTES } from "./tv-guide.routes";
import { MaterialModule } from "src/app/modules/app-material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(GUIDE_ROUTES),
  ],
  declarations: [GuideListComponent, GuideEditComponent],
  providers: [GuideService],
  exports: [],
})
export class GuideModule {}
