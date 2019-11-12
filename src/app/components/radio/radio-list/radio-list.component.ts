import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RadioFilter } from '../radio-filter';
import { RadioService } from '../radio.service';
import { Radio } from '../radio';

@Component({
    selector: 'radio',
    templateUrl: 'radio-list.component.html'
})
export class RadioListComponent {

    filter = new RadioFilter();
    selectedRadio: Radio;

    get radioList(): Radio[] {
        return this.radioService.radioList;
    }

    constructor(private radioService: RadioService) {
    }

    ngOnInit() {
    }

    search(): void {
        this.radioService.load(this.filter);
    }

    select(selected: Radio): void {
        this.selectedRadio = selected;
    }

}
