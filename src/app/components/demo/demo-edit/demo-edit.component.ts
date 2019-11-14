import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from '../demo.service';
import { Demo } from '../demo';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'demo-edit',
  templateUrl: './demo-edit.component.html'
})
export class DemoEditComponent implements OnInit {

    id: string;
    demo: Demo;
    errors: string;

    constructor(
        private route: ActivatedRoute,
        private demoService: DemoService) { 
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    if (id === 'new') return of(new Demo());
                    return this.demoService.findById(id)
                })
            )
            .subscribe(
                demo => { 
                    this.demo = demo; 
                    this.errors = ''; 
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );
    }

    save() {
        this.demoService.save(this.demo).subscribe(
            demo => { 
                this.demo = demo; 
                this.errors = 'Save was successful!'; 
            },
            err => { 
                this.errors = 'Error saving'; 
            }
        );
    }
}