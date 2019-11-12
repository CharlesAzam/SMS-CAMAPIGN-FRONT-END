import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from '../package.service';
import { Package } from '../package';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'package-edit',
  templateUrl: './package-edit.component.html'
})
export class PackageEditComponent implements OnInit {

    id: string;
    packageDef: Package;
    errors: string;

    constructor(
        private route: ActivatedRoute,
        private packageService: PackageService) { 
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    if (id === 'new') return of(new Package());
                    return this.packageService.findById(id)
                })
            )
            .subscribe(
                packageDef => { 
                    this.packageDef = packageDef; 
                    this.errors = ''; 
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );
    }

    save() {
        this.packageService.save(this.packageDef).subscribe(
            packageDef => { 
                this.packageDef = packageDef; 
                this.errors = 'Save was successful!'; 
            },
            err => { 
                this.errors = 'Error saving'; 
            }
        );
    }
}