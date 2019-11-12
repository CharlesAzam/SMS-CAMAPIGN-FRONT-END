import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RadioService } from '../radio.service';
import { Radio } from '../radio';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'radio-edit',
  templateUrl: './radio-edit.component.html'
})
export class RadioEditComponent implements OnInit {

    id: string;
    radio: Radio;
    errors: string;

    constructor(
        private route: ActivatedRoute,
        private radioService: RadioService) { 
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    if (id === 'new') return of(new Radio());
                    return this.radioService.findById(id)
                })
            )
            .subscribe(
                radio => { 
                    this.radio = radio; 
                    this.errors = ''; 
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );
    }

    save() {
        this.radioService.save(this.radio).subscribe(
            radio => { 
                this.radio = radio; 
                this.errors = 'Save was successful!'; 
            },
            err => { 
                this.errors = 'Error saving'; 
            }
        );
    }
}