import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

const modules = [
    NzTableModule,
]

@NgModule({
    imports: modules,
    exports: modules,
})

export class NZorroModules { }