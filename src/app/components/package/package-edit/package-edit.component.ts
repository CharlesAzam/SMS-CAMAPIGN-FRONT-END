
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from '../package.service';
import { Package } from '../package';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'package-edit',
    templateUrl: './package-edit.component.html'
})
export class PackageEditComponent implements OnInit {

    id: string;
    packageDef: Package;
    errors: string;
    currencies: string [] = [
        'TZS',
        'USD'
    ]
    channels: string[] = [
        "TBC",
        "ITV",
        "Channel 10"
    ]

    constructor(
        private route: ActivatedRoute,
        private packageService: PackageService) { 
    }


    //pacakge Form  Logic

    

        PackageEditForm= new FormGroup({
        name: new FormControl('Platinum News'),
        description:  new FormControl('New Premiun pafjejng g fgeorigjoejrge rge rgrggergno'),
        channels:  new FormControl(this.channels),
        currency: new FormControl(this.currencies),
        free:  new FormControl("true"),
        isVodAllowed:  new FormControl("true"),
        isVodContentsUnlimited:  new FormControl('true'),
        noOfVodContents:  new FormControl('10'),
        noOfDaysValidity:  new FormControl('20'),
        status:  new FormControl("true"),

    })

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