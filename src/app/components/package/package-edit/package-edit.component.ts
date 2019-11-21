
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
    planInfo: any[];
    currency: any [] = [
        'TZS',
        'USD'
    ]
    channels: any[] = [
        "TBC",
        "ITV",
        "Channel 10"
    ]

    constructor(
        private route: ActivatedRoute,
        private packageService: PackageService) { 
    }

    
    //pacakge Form  Logic
    packagepriceForm=false;
    toggleShow(){
        this.packagepriceForm=true;
    }

    toggleHidde(){
        this.packagepriceForm=false;
    }

    

        PackageEditForm= new FormGroup({
        name: new FormControl('Platinum News'),
        description:  new FormControl('New Premiun pafjejng g fgeorigjoejrge rge rgrggergno'),
        channels:  new FormControl(this.channels),
        currency: new FormControl(this.currency),
        free:  new FormControl("true"),
        azamPacakgeMappingName:new FormControl("fgerge"),
        //
        countrydetail: new FormGroup({
            code :new FormControl('2345'),
            name: new FormControl('Ethiopia'),
            currency: new FormControl('BIRR'),
        }),
         
        //
        packageprice: new FormGroup({
            price: new FormControl("34000"),
            currency: new FormControl("BIRR")
        }),


        //
        isVodAllowed:  new FormControl("true"),
        isVodContentsUnlimited:  new FormControl('true'),
        noOfVodContents:  new FormControl('10'),
        noOfDaysValidity:  new FormControl('20'),
        status:  new FormControl("true"),

    })


    IsFreeToggleFormHide(){
        console.log("hide");
        // this.PackageEditForm.get('free').value
    }

    IsFreeToggleFormShow(){
        console.log("show");
    }

    hidden=false;

    ngOnInit() {
        this.getPlanInfo();
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

    getPlanInfo() {
        this.packageService.findAzamPackageMappingList()
        .subscribe(
            planInfo => {
                console.log("planInfo---->",planInfo.data)
                this.planInfo = planInfo.data
            },
            err => {
                console.log(err)
                // this.router.navigate([''])

            }
        )
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