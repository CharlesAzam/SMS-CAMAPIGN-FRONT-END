import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RadioFilter } from '../radio-filter';
import { RadioService } from '../radio.service';
import { Radio } from '../radio';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'radio',
    templateUrl: 'radio-list.component.html'
})
export class RadioListComponent {


    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    filter = new RadioFilter();
    selectedRadio: Radio;

    dataSource = new MatTableDataSource<Radio>(this.radioList);
    displayedColumns: string[] = ['id', 'name', 'description', 'status', 'channelUrl', 'action']



    get radioList(): Radio[] {
        // return this.radioService.radioList;
        return [
            { id: "1", name: "Silver Package", description: "Silver package description", channelUrl: 'http://google.com', logo: 'azam', status: true },
            { id: "1", name: "Silver Package", description: "Silver package description", channelUrl: 'http://google.com', logo: 'azam', status: true },
            { id: "1", name: "Silver Package", description: "Silver package description", channelUrl: 'http://google.com', logo: 'azam', status: true },
            { id: "1", name: "Silver Package", description: "Silver package description", channelUrl: 'http://google.com', logo: 'azam', status: true },
            { id: "1", name: "Silver Package", description: "Silver package description", channelUrl: 'http://google.com', logo: 'azam', status: true },
        ]
    }

    constructor(private radioService: RadioService) {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    search(): void {
        this.radioService.load(this.filter);
    }

    select(selected: Radio): void {
        this.selectedRadio = selected;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
