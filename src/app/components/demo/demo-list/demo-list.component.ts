import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DemoFilter } from '../demo-filter';
import { DemoService } from '../demo.service';
import { Demo } from '../demo';

@Component({
    selector: 'demo',
    templateUrl: 'demo-list.component.html'
})
export class DemoListComponent {

    filter = new DemoFilter();
    selectedDemo: Demo;

    get demoList(): Demo[] {
        return this.demoService.demoList;
    }

    constructor(private demoService: DemoService) {
    }

    ngOnInit() {
    }

    search(): void {
        this.demoService.load(this.filter);
    }

    select(selected: Demo): void {
        this.selectedDemo = selected;
    }

}
