import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VodService } from '../vod.service';
import { Vod } from '../vod';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub.categories.service';
import { MobileTagsService } from 'src/app/services/mobile-tags.service';
import { PackageService } from '../../package/package.service';
import { LanguageService } from 'src/app/services/language.service';
import { CountryService } from 'src/app/services/coutry.service';
import { VideoLibraryService } from '../../video-library/video-library.service';


@Component({
    selector: 'vod-edit',
    templateUrl: './vod-edit.component.html'
})
export class VodEditComponent implements OnInit {

    isNewForm: boolean = false;
    isRadioForm: boolean = false;
    isVideoForm: boolean = false;
    isLiveTvForm: boolean = false;
    isSeriesForm: boolean = false;

    formType: string = "";

    contentForm = new FormGroup({});

    id: string;
    vod: Vod;
    errors: string;
    vodType: string


    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];


    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.tags.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(tag): void {
        const index = this.tags.indexOf(tag);

        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    }


    constructor(
        private route: ActivatedRoute,
        private vodService: VodService,
        private dialog: MatDialog,
        private categoriesService: CategoriesService,
        private subCategoriesService: SubCategoriesService,
        private tagsService: MobileTagsService,
        private packageService: PackageService,
        private languageService: LanguageService,
        private countryService: CountryService,
        private cdnService: VideoLibraryService,
        private router: Router
    ) {
    }


    languages: any[] = [];
    tags: any[] = []
    categories: any[] = []
    countries: any[] = []
    packages: any[] = []
    subCategories: any[] = []
    cdns: any[] = []
    boxes: string[] = ['HORIZONTAL_CARD', 'VERTICAL_CARD', 'BANNER', 'LOGO'];
    seasons: any[] = [];

    vodTypes: string[] = [
        "VIDEOS",
        "LIVETV",
        "SERIES"
    ]

    ngOnInit() {
        this.getCategories();
        this.getCountries();
        this.getSubCategories();
        this.getPackages();
        this.getTags();
        this.getLanguages();
        this.getCDNLibrary();

        this.route.params.subscribe((params: any) => {
            switch (params.id) {
                case "RADIO":
                    this.formType = 'Radio'
                    this.contentForm = new FormGroup({
                        title: new FormControl('', [Validators.required]),
                        description: new FormControl('', [Validators.required]),
                        tags: new FormControl('', [Validators.required]),
                        releaseDate: new FormControl(''),
                        duration: new FormControl(),
                        starring: new FormControl('', [Validators.required]),
                        director: new FormControl('', [Validators.required]),
                        categories: new FormControl('', [Validators.required]),
                        country: new FormControl('', [Validators.required]),
                        subCategories: new FormControl('', [Validators.required]),
                        language: new FormControl('', [Validators.required]),
                        isFree: new FormControl('', [Validators.required]),
                        priceDetail: new FormGroup({
                            price: new FormControl('', [Validators.required]),
                            currency: new FormControl('', [Validators.required])
                        }),
                        isFreeAzam: new FormControl('', [Validators.required]),
                        isSeries: new FormControl('', [Validators.required]),
                        status: new FormControl('', [Validators.required]),
                        boundingBox: new FormControl('', [Validators.required]),
                        cdnID: new FormControl('', [Validators.required]),
                        series: new FormControl('', [Validators.required]),
                        images: new FormControl(''),
                        imageThumb: new FormControl('', [Validators.required]),
                        packageID: new FormControl(''),
                        createdBy: new FormControl(''),
                        vodType: new FormControl('', [Validators.required])
                    })
                    break;
                case "SERIES":
                    this.formType = 'Series';
                    this.isSeriesForm = !this.isSeriesForm;
                    this.contentForm = new FormGroup({
                        title: new FormControl('', [Validators.required]),
                        description: new FormControl('', [Validators.required]),
                        tags: new FormControl('', [Validators.required]),
                        releaseDate: new FormControl('', Validators.required),
                        duration: new FormControl(),
                        starring: new FormControl('', [Validators.required]),
                        director: new FormControl('', [Validators.required]),
                        categories: new FormControl('', [Validators.required]),
                        country: new FormControl('', [Validators.required]),
                        subCategories: new FormControl('', [Validators.required]),
                        language: new FormControl('', [Validators.required]),
                        isFree: new FormControl('', [Validators.required]),
                        priceDetail: new FormGroup({
                            price: new FormControl('', [Validators.required]),
                            currency: new FormControl('', [Validators.required])
                        }),
                        isFreeAzam: new FormControl('', [Validators.required]),
                        isSeries: new FormControl('', [Validators.required]),
                        status: new FormControl('', [Validators.required]),
                        boundingBox: new FormControl('', [Validators.required]),
                        cdnID: new FormControl('', [Validators.required]),
                        series: new FormControl('', [Validators.required]),
                        images: new FormControl(''),
                        imageThumb: new FormControl('', [Validators.required]),
                        packageID: new FormControl(''),
                        createdBy: new FormControl(''),
                        vodType: new FormControl('', [Validators.required])
                    })
                    break;
                case "NEWS":
                    this.formType = 'News'
                    this.contentForm = new FormGroup({
                        title: new FormControl('', [Validators.required]),
                        description: new FormControl('', [Validators.required]),
                        tags: new FormControl('', [Validators.required]),
                        releaseDate: new FormControl('', Validators.required),
                        duration: new FormControl(),
                        starring: new FormControl('', [Validators.required]),
                        director: new FormControl('', [Validators.required]),
                        categories: new FormControl('', [Validators.required]),
                        country: new FormControl('', [Validators.required]),
                        subCategories: new FormControl('', [Validators.required]),
                        language: new FormControl('', [Validators.required]),
                        isFree: new FormControl('', [Validators.required]),
                        priceDetail: new FormGroup({
                            price: new FormControl('', [Validators.required]),
                            currency: new FormControl('', [Validators.required])
                        }),
                        isFreeAzam: new FormControl('', [Validators.required]),
                        isSeries: new FormControl('', [Validators.required]),
                        status: new FormControl('', [Validators.required]),
                        boundingBox: new FormControl('', [Validators.required]),
                        cdnID: new FormControl('', [Validators.required]),
                        series: new FormControl('', [Validators.required]),
                        images: new FormControl('', [Validators.required]),
                        imageThumb: new FormControl('', [Validators.required]),
                        packageID: new FormControl(''),
                        createdBy: new FormControl(''),
                        vodType: new FormControl('', [Validators.required])
                    })
                    break;

                case "VIDEOONDEMAND":
                    this.formType = "Video On Demand"
                    this.contentForm = new FormGroup({
                        title: new FormControl('', [Validators.required]),
                        description: new FormControl('', [Validators.required]),
                        tags: new FormControl('', [Validators.required]),
                        releaseDate: new FormControl('', Validators.required),
                        duration: new FormControl(),
                        starring: new FormControl('', [Validators.required]),
                        director: new FormControl('', [Validators.required]),
                        categories: new FormControl('', [Validators.required]),
                        country: new FormControl('', [Validators.required]),
                        subCategories: new FormControl('', [Validators.required]),
                        language: new FormControl('', [Validators.required]),
                        isFree: new FormControl('', [Validators.required]),
                        priceDetail: new FormGroup({
                            price: new FormControl('', [Validators.required]),
                            currency: new FormControl('', [Validators.required])
                        }),
                        isFreeAzam: new FormControl('', [Validators.required]),
                        isSeries: new FormControl('', [Validators.required]),
                        status: new FormControl('', [Validators.required]),
                        boundingBox: new FormControl('', [Validators.required]),
                        cdnID: new FormControl('', [Validators.required]),
                        series: new FormControl('', [Validators.required]),
                        images: new FormControl(''),
                        imageThumb: new FormControl('', [Validators.required]),
                        packageID: new FormControl(''),
                        createdBy: new FormControl(''),
                        vodType: new FormControl('', [Validators.required])
                    })
                    break;


                default:
                    break;
            }
        })
    }

    save() {
        this.vodService.save(this.checkIfValueIsEmpty(this.contentForm.value)).subscribe(
            vod => {
                this.errors = 'Save was successful!';
                this.back();
            },
            err => {
                this.errors = 'Error saving';
            }
        );
    }

    getCategories() {
        this.categoriesService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.categories = response.data;
            }
        },
            error => console.error(error));
    }

    getTags() {
        this.tagsService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.tags = response.data;
            }
        },
            error => console.error(error));
    }

    getSubCategories() {
        this.subCategoriesService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.subCategories = response.data;
            }
        },
            error => console.error(error));
    }

    getPackages() {
        this.packageService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.packages = response.data;
            }
        },
            error => console.error(error));
    }

    getLanguages() {
        this.languageService.list().subscribe((response: any) => {
            if (response.status === 200) {
                this.languages = response.data;
            }
        },
            error => console.error(error));
    }

    getCountries() {
        this.countryService.list().subscribe((response: any) => {
            if (response.status === 200) {
                this.countries = response.data;
            }
        },
            error => console.error(error));
    }

    getCDNLibrary() {
        this.cdnService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.cdns = response.data;
            }
        },
            error => console.error(error))
    }



    openDialog() {
        const dialogRef = this.dialog.open(AddSeasonsDialog, {
            width: '800px',
            data: {}
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result)
            this.seasons.push(result)
        })
    }

    back() {
        this.router.navigate(['home/content']);
    }

    checkIfValueIsEmpty(data) {
        for (let key in data) {
            if (data[key] === "" || data[key] === null) {
                delete data[key];
            }
        }
        return data;
    }


}

@Component({
    selector: 'dialog-content-type',
    templateUrl: '../dialog-content-add-season.html',
})
export class AddSeasonsDialog {

    seasonForm = new FormGroup({
        title: new FormControl(''),
        price: new FormControl(''),
        currency: new FormControl(''),
        noOfDays: new FormControl('')
    })
    episodes: any[] = [];
    currencies: any[] = [
        "TZS",
        "USD"
    ];

    constructor(
        public dialogRef: MatDialogRef<AddSeasonsDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private dialog: MatDialog
    ) { }

    openAddSeasonsDialog() {
        const dialogRef = this.dialog.open(AddEpisodesDialog, {
            width: '800px',
            data: {}
        })

        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            this.episodes.push(result);
        })
    }

    removeEpisode(index) {
        //Remove episode
    }

    getData() {
        this.seasonForm.value['episodes'] = this.episodes;
        return this.seasonForm.value;
    }
}

@Component({
    selector: 'dialog-content-type',
    templateUrl: '../dialog-content-add-episodes.html',
})
export class AddEpisodesDialog {

    episodeForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        tags: new FormControl('', [Validators.required]),
        releaseDate: new FormControl('', Validators.required),
        duration: new FormControl(),
        starring: new FormControl('', [Validators.required]),
        director: new FormControl('', [Validators.required]),
        categories: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        subCategories: new FormControl('', [Validators.required]),
        language: new FormControl('', [Validators.required]),
        isFree: new FormControl('', [Validators.required]),
        priceDetail: new FormGroup({
            price: new FormControl('', [Validators.required]),
            currency: new FormControl('', [Validators.required])
        }),
        isFreeAzam: new FormControl('', [Validators.required]),
        isSeries: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
        boundingBox: new FormControl('', [Validators.required]),
        cdnID: new FormControl('', [Validators.required]),
        series: new FormControl('', [Validators.required]),
        images: new FormControl(''),
        imageThumb: new FormControl('', [Validators.required]),
        packageID: new FormControl(''),
        createdBy: new FormControl(''),
        vodType: new FormControl('', [Validators.required])
    })

    languages: any[] = [];
    tags: any[] = []
    categories: any[] = []
    countries: any[] = []
    packages: any[] = []
    subCategories: any[] = []
    cdns: any[] = []
    boxes: string[] = ['HORIZONTAL_CARD', 'VERTICAL_CARD', 'BANNER', 'LOGO'];


    getCategories() {
        this.categoriesService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.categories = response.data;
            }
        },
            error => console.error(error));
    }

    getTags() {
        this.tagsService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.tags = response.data;
            }
        },
            error => console.error(error));
    }

    getSubCategories() {
        this.subCategoriesService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.subCategories = response.data;
            }
        },
            error => console.error(error));
    }

    getPackages() {
        this.packageService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.packages = response.data;
            }
        },
            error => console.error(error));
    }

    getLanguages() {
        this.languageService.list().subscribe((response: any) => {
            if (response.status === 200) {
                this.languages = response.data;
            }
        },
            error => console.error(error));
    }

    getCountries() {
        this.countryService.list().subscribe((response: any) => {
            if (response.status === 200) {
                this.countries = response.data;
            }
        },
            error => console.error(error));
    }

    getCDNLibrary() {
        this.cdnService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.cdns = response.data;
            }
        },
            error => console.error(error))
    }


    constructor(
        public dialogRef: MatDialogRef<AddEpisodesDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private categoriesService: CategoriesService,
        private subCategoriesService: SubCategoriesService,
        private tagsService: MobileTagsService,
        private packageService: PackageService,
        private languageService: LanguageService,
        private countryService: CountryService,
        private cdnService: VideoLibraryService,
    ) {
        this.getCategories();
        this.getCountries();
        this.getSubCategories();
        this.getPackages();
        this.getTags();
        this.getLanguages();
        this.getCDNLibrary();
    }



}