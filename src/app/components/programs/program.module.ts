import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramEditComponent } from './program-edit/program-edit.component';
import { ProgramService } from './program.service';
import { PRGORAM_ROUTES } from './program.routes';
import { MaterialModule } from 'src/app/modules/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRGORAM_ROUTES)
  ],
  declarations: [
    ProgramListComponent,
    ProgramEditComponent,
  ],
  providers: [
    ProgramService
  ],
  exports: [
  ]
})
export class ProgramModule { }
