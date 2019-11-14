import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemoListComponent } from './demo-list/demo-list.component';
import { DemoEditComponent } from './demo-edit/demo-edit.component';
import { DemoService } from './demo.service';
import { DEMO_ROUTES } from './demo.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(DEMO_ROUTES)
  ],
  declarations: [
    DemoListComponent,
    DemoEditComponent
  ],
  providers: [
    DemoService
  ],
  exports: [
  ]
})
export class DemoModule { }
