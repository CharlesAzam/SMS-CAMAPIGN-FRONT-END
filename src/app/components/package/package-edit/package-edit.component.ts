
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../package.service';
import { Package } from '../package';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { VodService } from '../../vod/vod.service';
import { CountryService } from 'src/app/services/coutry.service';

@Component({
    selector: 'package-edit',
    templateUrl: './package-edit.component.html'
})
export class PackageEditComponent implements OnInit {

    id: string;
    packageDef: Package;
    errors: string;
    azamPackages: any[];
    countries: any[];
    currencies: any[] = [
        'TZS',
        'USD'
    ]
    // languages: any[] = []
    contents: any[] = []

    constructor(
        private route: ActivatedRoute,
        private packageService: PackageService,
        private contentService: VodService,
        private languageService: LanguageService,
        private countryService: CountryService,
        private router: Router) {
    }

    packageForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        price: new FormControl(''),
        currency: new FormControl(''),
        isFree: new FormControl(''),
        azamPackageMappingName: new FormControl(''),
        isVodAllowed: new FormControl(''),
        noOfDays: new FormControl(''),
        countryDetail: new FormControl(''),
        // link: new FormControl(''),
        validityInDays: new FormControl(''),
        status: new FormControl(""),
        content: new FormControl('')
    })


    IsFreeToggleFormHide() {
        console.log("hide");
        // this.PackageEditForm.get('free').value
    }

    IsFreeToggleFormShow() {
        console.log("show");
    }

    hidden = false;

    ngOnInit() {
        this.getPlanInfo();
        // this.getCountryCode();
        this.getContents();
        this.getCountries();
        // this.getLanguages();
        this
            .route
            .params
            .subscribe((params: any) => {
                if (params.id !== 'new') {
                    this.getSelectedPage(params.id);
                }
            })
    }

    getSelectedPage(id) {
        this.packageService.findById(id).subscribe((response: any) => {
            if (response.status === 200) {
                this.packageDef = response.data[0];
                this.packageForm.setValue({
                    name: this.packageDef.name ? this.packageDef.name : '',
                    description: this.packageDef.description ? this.packageDef.description : '',
                    isFree: String(this.packageDef.isFree) ? String(this.packageDef.isFree) : '',
                    content: this.packageDef.content ? this.packageDef.content : '',
                    azamPackageMappingName: this.packageDef.azamPackageMappingName ? this.packageDef.azamPackageMappingName : '',
                    isVodAllowed: String(this.packageDef.isVodAllowed) ? String(this.packageDef.isVodAllowed) : '',
                    // link: this.packageDef.link ? this.packageDef.link : '',
                    noOfDays: this.packageDef.price[0].noOfDays ? this.packageDef.price[0].noOfDays : '',
                    countryDetail: this.packageDef.countryDetail ? this.packageDef.countryDetail : '',
                    validityInDays: String(this.packageDef.validityInDays) ? String(this.packageDef.validityInDays) : '',
                    status: this.packageDef.status ? this.packageDef.status : '',
                    price: this.packageDef.price[0].price ? this.packageDef.price[0].price : '',
                    currency: this.packageDef.price[0].currency ? this.packageDef.price[0].currency : '',
                });
            }
        }, error => console.error(error))
    }

    getPlanInfo() {
        this.packageService.findAzamPackageMappingList()
            .subscribe(
                planInfo => {
                    this.azamPackages = planInfo.data
                },
                err => {
                    console.log(err)
                    // this.router.navigate([''])

                }
            )
    }

    getContents() {
        this.contentService.find('vod').subscribe(
            (result: any) => {
                this.contents = result.data;
            }, err => {
                console.log("------->", err)
            }
        )
    }
    getCountryCode() {
        this.packageService.findCountryCodes().subscribe(
            country => {
                console.log(country)
                this.currencies = country.data
            }, err => {
                console.log("err----->", err);
            }
        )
    }

    getCountries() {
        this.countryService.list().subscribe(
            country => {
                console.log(country)
                this.countries = country.data
            }, err => {
                console.log("err----->", err);
            }
        )
    }

    back() {
        this.router.navigate(['home/package']);
    }

    save() {
        let price = this.packageForm.value.price;

        let priceArray = []
        priceArray.push({
            price: price,
            currency: this.packageForm.value.currency,
            noOfDays: this.packageForm.value.noOfDays
        })

        this.packageForm.value.price = priceArray;
        if (this.packageDef) {

            Object.assign(this.packageDef, this.packageForm.value);
            this.packageService.update(this.packageDef).subscribe(
                (response: any) => {
                    console.log(response)
                    if (response.status || response.Code) {
                        this.errors = 'Updarte was successful!';
                        this.back();
                    }
                },
                err => {
                    this.errors = 'Error saving';
                }
            );
        } else {
            this.packageService.save(this.packageForm.value).subscribe(
                (response: any) => {
                    console.log(response)
                    if (response.status || response.Code) {
                        this.errors = 'Save was successful!';
                        this.back();
                    }
                },
                err => {
                    this.errors = 'Error saving';
                }
            );
        }
    }
}