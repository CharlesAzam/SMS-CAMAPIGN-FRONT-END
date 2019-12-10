import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VodService } from '../vod.service';
import { Vod } from '../vod';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { of, ReplaySubject, Subject } from 'rxjs';
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

    isNewsForm: boolean = false;
    isRadioForm: boolean = false;
    isVideoForm: boolean = false;
    isLiveTvForm: boolean = false;
    isSeriesForm: boolean = false;

    filterCategoriesCtrl: FormControl = new FormControl();
    filterCountryCtrl: FormControl = new FormControl();
    filterSubCategoryCtrl: FormControl = new FormControl();
    filterCdnCtrl: FormControl = new FormControl();
    filterTagsCtrl: FormControl = new FormControl();

    filteredCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    filteredSubCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    filteredCdns: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    filteredTags: ReplaySubject<any[]> = new ReplaySubject<any[]>();

    protected _onDestroy = new Subject<void>();



    formType: string = "";

    contentForm = new FormGroup({});

    id: string;
    vod: Vod;
    errors: string;
    vodType: string;
    contentType: string;

    isUploading: boolean = false;
    imageUrl: string = "";
    fileToUpload: any = null;

    currencies: string[] = [
        "TZS",
        "USD"
    ]


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
            this.tagss.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(tag): void {
        const index = this.tagss.indexOf(tag);

        if (index >= 0) {
            this.tagss.splice(index, 1);
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
        this.initializeForm()
    }


    languages: any[] = [];
    tagss: any[] = []
    categorys: any[] = []
    countries: any[] = []
    packages: any[] = []
    subCategorie: any[] = []
    cdns: any[] = []
    boxes: string[] = ['HORIZONTAL_CARD', 'VERTICAL_CARD', 'BANNER', 'LOGO'];
    seasons: any[] = [];
    images: string[] = []

    vodTypes: string[] = [
        "VIDEO",
        "LIVETV",
        "SERIES"
    ]

    ngOnInit() {

        this.getCountries();
        // this.getSubCategories();
        this.getPackages();
        this.getTags();
        this.getLanguages();
        this.getCDNLibrary();

        this.route.params.subscribe((params: any) => {
            switch (params.id) {
                case "RADIO":
                    this.formType = 'Radio';
                    this.contentType = 'RADIO';
                    this.isRadioForm = !this.isRadioForm;
                    this.getCategories("RADIO");
                    this.initiliazeRadioForm();

                    break;
                case "SERIES":
                    this.formType = 'Series';
                    this.contentType = 'VOD';
                    this.vodType = "SERIES";
                    this.isSeriesForm = !this.isSeriesForm;
                    this.getCategories("SERIES");
                    this.initializeSeriesForm()

                    break;
                case "NEWS":
                    this.formType = 'News'
                    this.contentType = 'NEWS';
                    this.isNewsForm = !this.isNewsForm;
                    this.getCategories('NEWS');
                    this.initializeNewsForm()

                    break;

                case "VIDEOONDEMAND":
                    this.formType = "Video On Demand"
                    this.contentType = 'VOD';
                    this.vodType = "VIDEO";
                    this.isVideoForm = !this.isVideoForm;
                    this.getCategories('VOD');
                    this.initializeVideoForm()
                    break;

                case "LIVETV":
                    this.formType = "Live TV"
                    this.contentType = 'VOD';
                    this.vodType = "LIVETV";
                    this.isLiveTvForm = !this.isLiveTvForm;
                    this.getCategories('VOD');
                    this.initializeLiveTVForm();
                    break;


                default:
                    this.vodService.findById(params.id).subscribe((response: any) => {
                        if (response.status === 200) {
                            this.vod = response.data[0];
                            this.getCategories(this.vod.contentType);
                            this.imageUrl = this.vod.imageThumb;
                            if (this.vod.contentType === 'VOD') {
                                switch (this.vod.vodType) {
                                    case "VIDEO":
                                        this.formType = "Video On Demand"
                                        this.contentType = 'VOD';
                                        this.vodType = "VIDEO";
                                        this.isVideoForm = !this.isVideoForm;
                                        this.initializeVideoForm()
                                        this.getSubCategories({ value: this.vod.categories.map((categor) => categor._id) });
                                        this.contentForm.setValue({
                                            title: this.vod.title ? this.vod.title : '',
                                            description: this.vod.description ? this.vod.description : '',
                                            tags: this.vod.tags ? this.vod.tags : [],
                                            releaseDate: this.vod.releaseDate ? this.vod.releaseDate : '',
                                            duration: this.vod.duration ? this.vod.duration : '',
                                            starring: this.vod.starring ? this.vod.starring : '',
                                            director: this.vod.director ? this.vod.starring : '',
                                            categories: this.vod.categories.map((categor) => categor._id) ? this.vod.categories.map((categor) => { return categor._id }) : '',
                                            country: this.vod.country ? this.vod.country.map((country) => { return country._id }) : '',

                                            subCategories: this.vod.subCategories ? this.vod.subCategories.map((subs) => subs._id) : '',
                                            language: this.vod.language ? this.vod.language : '',
                                            isFree: String(this.vod.isFree) ? String(this.vod.isFree) : '',
                                            price: {
                                                price: this.vod.priceDetail[0] ? this.vod.priceDetail[0].price : '',
                                                currency: this.vod.priceDetail[0] ? this.vod.priceDetail[0].currency : '',
                                                noOfDays: this.vod.priceDetail[0] ? this.vod.priceDetail[0].noOfDays : '',
                                            },
                                            isFreeForAzam: String(this.vod.isFreeForAzam) ? String(this.vod.isFreeForAzam) : '',
                                            isEpisode: String(this.vod.isEpisode) ? String(this.vod.isEpisode) : '',
                                            isSeries: String(this.vod.isSeries) ? String(this.vod.isSeries) : '',
                                            status: String(this.vod.status) ? String(this.vod.status) : '',
                                            boundingBox: this.vod.boundingBox ? this.vod.boundingBox : '',
                                            cdnID: this.vod.cdnID ? this.vod.cdnID : '',
                                            series: this.vod.series ? this.vod.series : [],
                                            images: this.vod.images ? this.vod.images : [],
                                            imageThumb: this.vod.imageThumb ? '' : '',
                                            //  packageID: this.vod.packageID ? this.vod.packageID : '',
                                            createdBy: this.vod.createdBy ? this.vod.createdBy : '',
                                        })

                                        break;

                                    case "SERIES":
                                        this.formType = 'Series';
                                        this.contentType = 'VOD';
                                        this.vodType = "SERIES";
                                        this.isSeriesForm = !this.isSeriesForm;
                                        this.initializeSeriesForm()
                                        this.getSubCategories({ value: this.vod.categories.map((categor) => categor._id) });
                                        this.seasons = this.vod.series[0].season;
                                        this.contentForm.setValue({
                                            title: this.vod.title ? this.vod.title : '',
                                            description: this.vod.description ? this.vod.description : '',
                                            tags: this.vod.tags ? this.vod.tags : [],
                                            releaseDate: this.vod.releaseDate ? this.vod.releaseDate : '',
                                            duration: this.vod.duration ? this.vod.duration : '',
                                            starring: this.vod.starring ? this.vod.starring : '',
                                            director: this.vod.director ? this.vod.starring : '',
                                            categories: this.vod.categories.map((categor) => categor._id) ? this.vod.categories.map((categor) => { return categor._id }) : '',
                                            country: this.vod.country ? this.vod.country.map((country) => { return country._id }) : '',
                                            subCategories: this.vod.subCategories ? this.vod.subCategories.map((subs) => subs._id) : '',
                                            language: this.vod.language ? this.vod.language : '',
                                            isFree: String(this.vod.isFree) ? String(this.vod.isFree) : '',
                                            price: {
                                                price: this.vod.priceDetail[0] ? this.vod.priceDetail[0].price : '',
                                                currency: this.vod.priceDetail[0] ? this.vod.priceDetail[0].currency : '',
                                                noOfDays: this.vod.priceDetail[0] ? this.vod.priceDetail[0].noOfDays : '',
                                            },
                                            isFreeForAzam: String(this.vod.isFreeForAzam) ? String(this.vod.isFreeForAzam) : '',
                                            isSeries: String(this.vod.isSeries) ? String(this.vod.isSeries) : '',
                                            status: String(this.vod.status) ? String(this.vod.status) : '',
                                            boundingBox: this.vod.boundingBox ? this.vod.boundingBox : '',
                                            cdnID: this.vod.cdnID ? this.vod.cdnID : '',
                                            series: this.vod.series ? this.vod.series : [],
                                            images: this.vod.images ? this.vod.images : [],
                                            imageThumb: this.vod.imageThumb ? '' : '',
                                            //  packageID: this.vod.packageID ? this.vod.packageID : '',
                                            createdBy: this.vod.createdBy ? this.vod.createdBy : '',
                                        })


                                        break;

                                    case "LIVETV":
                                        this.formType = "Live TV"
                                        this.contentType = 'VOD';
                                        this.vodType = "LIVETV";
                                        this.isLiveTvForm = !this.isLiveTvForm;
                                        this.initializeLiveTVForm();
                                        this.getSubCategories({ value: this.vod.categories.map((categor) => categor._id) });
                                        this.contentForm.setValue({
                                            title: this.vod.title ? this.vod.title : '',
                                            description: this.vod.description ? this.vod.description : '',
                                            tags: this.vod.tags ? this.vod.tags : [],
                                            releaseDate: this.vod.releaseDate ? this.vod.releaseDate : '',
                                            duration: this.vod.duration ? this.vod.duration : '',
                                            starring: this.vod.starring ? this.vod.starring : '',
                                            director: this.vod.director ? this.vod.starring : '',
                                            categories: this.vod.categories ? this.vod.categories.map((categor) => { return categor._id }) : '',
                                            country: this.vod.country ? this.vod.country.map((country) => { return country._id }) : '',                                            
                                            subCategories: this.vod.subCategories ? this.vod.subCategories.map((subs) => subs._id) : '',
                                            language: this.vod.language ? this.vod.language : '',
                                            isFree: String(this.vod.isFree) ? String(this.vod.isFree) : '',
                                            price: {
                                                price: this.vod.priceDetail[0] ? this.vod.priceDetail[0].price : '',
                                                currency: this.vod.priceDetail[0] ? this.vod.priceDetail[0].currency : '',
                                                noOfDays: this.vod.priceDetail[0] ? this.vod.priceDetail[0].noOfDays : '',
                                            },
                                            isFreeForAzam: String(this.vod.isFreeForAzam) ? String(this.vod.isFreeForAzam) : '',
                                            isSeries: String(this.vod.isSeries) ? String(this.vod.isSeries) : '',
                                            status: String(this.vod.status) ? String(this.vod.status) : '',
                                            boundingBox: this.vod.boundingBox ? this.vod.boundingBox : '',
                                            cdnID: this.vod.cdnID ? this.vod.cdnID : '',
                                            series: this.vod.series ? this.vod.series : [],
                                            images: this.vod.images ? this.vod.images : [],
                                            imageThumb: this.vod.imageThumb ? '' : '',
                                            //  packageID: this.vod.packageID ? this.vod.packageID : '',
                                            createdBy: this.vod.createdBy ? this.vod.createdBy : '',
                                        })

                                        break;

                                    default:
                                        break;
                                }
                            } else if (this.vod.contentType === 'RADIO') {
                                this.formType = 'Radio';
                                this.contentType = 'RADIO';
                                this.isRadioForm = !this.isRadioForm
                                this.initiliazeRadioForm();
                                this.getSubCategories({ value: this.vod.categories.map((categor) => categor._id) });
                                this.contentForm.setValue({
                                    title: this.vod.title ? this.vod.title : '',
                                    description: this.vod.description ? this.vod.description : '',
                                    tags: this.vod.tags ? this.vod.tags : [],
                                    duration: this.vod.duration ? this.vod.duration : '',
                                    starring: this.vod.starring ? this.vod.starring : '',
                                    director: this.vod.director ? this.vod.starring : '',
                                    categories: this.vod.categories.map((categor) => categor._id) ? this.vod.categories.map((categor) => categor._id) : '',
                                    country: this.vod.country ? this.vod.country.map((country) => { return country._id }) : '',                                    
                                    subCategories: this.vod.subCategories ? this.vod.subCategories.map((subs) => subs._id) : '',
                                    language: this.vod.language ? this.vod.language : '',
                                    isFree: String(this.vod.isFree) ? String(this.vod.isFree) : '',
                                    price: {
                                        price: this.vod.priceDetail[0] ? this.vod.priceDetail[0].price : '',
                                        currency: this.vod.priceDetail[0] ? this.vod.priceDetail[0].currency : '',
                                        noOfDays: this.vod.priceDetail[0] ? this.vod.priceDetail[0].noOfDays : '',
                                    },
                                    isFreeForAzam: String(this.vod.isFreeForAzam) ? String(this.vod.isFreeForAzam) : '',
                                    isSeries: String(this.vod.isSeries) ? String(this.vod.isSeries) : '',
                                    status: String(this.vod.status) ? String(this.vod.status) : '',
                                    boundingBox: this.vod.boundingBox ? this.vod.boundingBox : '',
                                    cdnID: this.vod.cdnID ? this.vod.cdnID : '',
                                    series: this.vod.series ? this.vod.series : [],
                                    images: this.vod.images ? this.vod.images : [],
                                    imageThumb: this.vod.imageThumb ? '' : '',
                                    // packageID: this.vod.packageID ? this.vod.packageID : '',
                                    createdBy: this.vod.createdBy ? this.vod.createdBy : '',
                                })

                            } else if (this.vod.contentType === 'NEWS') {
                                this.formType = 'News'
                                this.contentType = 'NEWS';
                                this.initializeNewsForm()
                                this.getSubCategories({ value: this.vod.categories.map((categor) => categor._id) });
                                this.isNewsForm = !this.isNewsForm;
                                this.images = this.vod.images;
                                this.contentForm.setValue({
                                    title: this.vod.title ? this.vod.title : '',
                                    description: this.vod.description ? this.vod.description : '',
                                    tags: this.vod.tags ? this.vod.tags : [],

                                    categories: this.vod.categories.map((categor) => categor._id) ? this.vod.categories.map((categor) => categor._id) : '',
                                    subCategories: this.vod.subCategories ? this.vod.subCategories.map((subs) => subs._id) : '',
                                    isFree: String(this.vod.isFree) ? String(this.vod.isFree) : '',
                                    isFreeForAzam: String(this.vod.isFreeForAzam) ? String(this.vod.isFreeForAzam) : '',
                                    isSeries: String(this.vod.isSeries) ? String(this.vod.isSeries) : '',
                                    status: String(this.vod.status) ? String(this.vod.status) : '',
                                    series: this.vod.series ? this.vod.series : [],
                                    images: this.vod.images ? this.vod.images : [],
                                    imageThumb: this.vod.imageThumb ? '' : '',
                                })

                            }

                        }
                    });
                    break;
            }
        })

        this.filterTagsCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterTags();
            })

        this.filterCategoriesCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterCategories();
            })

        this.filterSubCategoryCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterSubCategories();
            })

        this.filterCdnCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterCdn();
            })

        this.filterCountryCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
            this.filterCountry();
        })
    }


    handelImageChange(files: FileList) {
        this.fileToUpload = files.item(0);
        this.fileToUpload.mimeType = this.fileToUpload.type;
        this.uploadFileToActivity();
    }

    uploadFileToActivity() {
        this.isUploading = true;
        this.vodService.uploadUrl(this.fileToUpload).subscribe((response: any) => {

            this.isUploading = false;
            if (response.status == 200 || response.success) {
                this.imageUrl = response.fileUrl;
            }

        }, error => {
            this.isUploading = false;
        });
    }

    save() {
        if (this.imageUrl)
            this.contentForm.value['imageThumb'] = this.imageUrl;

        this.contentForm.value['contentType'] = this.contentType;
        if (this.vodType)
            this.contentForm.value['vodType'] = this.vodType

        if (this.isSeriesForm) {
            this.contentForm.value.series = {
                "season": this.seasons
            };

        }
        if (this.isNewsForm) {
            this.contentForm.value['images'] = this.images;
        }
        if (this.vod) {
            Object.assign(this.vod, this.contentForm.value);

            this.vodService.update(this.checkIfValueIsEmpty(this.vod)).subscribe(
                vod => {
                    this.errors = 'Save was successful!';
                    this.back();
                },
                err => {
                    this.errors = 'Error saving';
                }
            );
        } else {
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
    }

    getCategories(type) {
        if (type == "LIVETV" || type == "SERIES" || type == "VIDEOONDEMAND") {
            type = "VOD";
        }
        this.categoriesService.findByType(type).subscribe((response: any) => {
            if (response.status === 200) {
                this.categorys = response.data;
                this.filteredCategories.next(this.categorys.slice());
            }
        },
            error => console.error(error)
        );
    }

    getTags() {
        this.tagsService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.tagss = response.data;
                this.filteredTags.next(this.tagss.slice());
            }
        },
            error => console.error(error));
    }

    getSubCategories(event) {
        this.subCategoriesService.findByCategory(event.value).subscribe((response: any) => {
            if (response.status === 200) {
                const tmpArr = [];
                const currentSelection = this.contentForm.controls.subCategories;
                this.subCategorie = response.data.map((sub)=>{
                   if(currentSelection.value.indexOf(sub._id) >= 0){
                    tmpArr.push(sub._id);
                   }
                   return sub;
                });        
                this.contentForm.patchValue({subCategories :tmpArr}); 
                this.filteredSubCategories.next(this.subCategorie)
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
            console.log(response)
            if (response.status === 200) {
                this.countries = response.data;
                this.filteredCountries.next(this.countries.slice())
                console.log('----------->',this.countries)

            }
        },
            error => console.error(error));
    }

    getCDNLibrary() {
        this.cdnService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.cdns = response.data;
                this.filteredCdns.next(this.cdns.slice())
            }
        },
            error => console.error(error))
    }

    filterSubCategories() {
        if (!this.subCategorie)
            return;

        let search: string = this.filterSubCategoryCtrl.value;
        if (!search) {
            this.filteredSubCategories.next(this.subCategorie.slice())
        } else {
            search = search.toLowerCase();
        }

        this.filteredSubCategories.next(
            this.subCategorie.filter(sub => sub.name.toLowerCase().indexOf(search) > -1)
        )
    }

    filterTags() {
        if (!this.tagss)
            return;

        let search = this.filterTagsCtrl.value;
        if (!search) {
            this.filteredTags.next(this.tagss.slice());
            return;
        } else {
            search = search.toLowerCase();
        }

        this.filteredTags.next(
            this.tagss.filter(cont =>
                cont.name ?
                    cont.name.toLowerCase().indexOf(search) > -1 :
                    ''
            )
        )
    }

    filterCdn() {
        if (!this.cdns)
            return;

        let search = this.filterCdnCtrl.value;
        if (!search) {
            this.filteredCdns.next(this.cdns.slice());
            return;
        } else {
            search = search.toLowerCase();
        }

        this.filteredCdns.next(
            this.cdns.filter(cont =>
                cont.name ?
                    cont.name.toLowerCase().indexOf(search) > -1 :
                    ''
            )
        )
    }

    filterCountry() {
        if (!this.countries)
            return;

        let search = this.filterCountryCtrl.value;
        if (!search) {
            this.filteredCountries.next(this.countries.slice());
            return;
        } else {
            search = search.toLowerCase();
        }

        this.filteredCountries.next(
            this.countries.filter(cont =>
                cont.country ?
                    cont.country.toLowerCase().indexOf(search) > -1 :
                    ''
            )
        )
    }


    filterCategories() {
        if (!this.categorys)
            return;

        let search: string = this.filterCategoriesCtrl.value;
        if (!search) {
            this.filteredCategories.next(this.categorys.slice())
        } else {
            search = search.toLowerCase();
        }

        this.filteredCategories.next(
            this.categorys.filter(category => category.name.toLowerCase().indexOf(search) > -1)
        )
    }



    openDialog(i?) {
        console.log(String(i))
        const index = i;

        const dialogRef = this.dialog.open(AddSeasonsDialog, {
            width: '800px',
            data: String(index) !== 'undefined' ? this.seasons[index] : null
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                if (String(index) !== 'undefined') {
                    this.seasons[index] = result;
                } else {
                    this.seasons.push(result);

                }
            }

        })
    }

    openImagesDialog() {
        const dialogRef = this.dialog.open(AddMultipleImages, {
            width: '800px',
            data: null
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.images = result;
            }

        })
    }

    removeImage(index) {
        this.images.splice(index, 1);

    }

    removeSeason(index) {
        this.seasons.splice(index, 1);
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

    initializeSeriesForm() {
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
            price: new FormGroup({
                price: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
                currency: new FormControl('', [Validators.required]),
                noOfDays: new FormControl('', [Validators.required])
            }),
            isFreeForAzam: new FormControl('', [Validators.required]),
            isSeries: new FormControl('true'),
            status: new FormControl('', [Validators.required]),
            boundingBox: new FormControl('', [Validators.required]),
            cdnID: new FormControl('', [Validators.required]),
            series: new FormControl([]),
            images: new FormControl([]),
            imageThumb: new FormControl('', [Validators.required]),
            // packageID: new FormControl(''),
            createdBy: new FormControl(''),
        })
    }

    initializeForm() {
        this.contentForm = new FormGroup({
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            tags: new FormControl('', [Validators.required]),

            categories: new FormControl('', [Validators.required]),
            subCategories: new FormControl('', [Validators.required]),
            isFree: new FormControl('', [Validators.required]),
            price: new FormGroup({
                price: new FormControl('', [Validators.required]),
                currency: new FormControl('', [Validators.required]),
                noOfDays: new FormControl('', [Validators.required])
            }),
            isFreeForAzam: new FormControl('', [Validators.required]),
            isSeries: new FormControl('false'),
            status: new FormControl('', [Validators.required]),
            series: new FormControl([]),
            images: new FormControl([]),
            imageThumb: new FormControl('', [Validators.required]),
        })
    }

    initiliazeRadioForm() {

        this.contentForm = new FormGroup({
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            tags: new FormControl('', [Validators.required]),
            duration: new FormControl(),
            starring: new FormControl(''),
            director: new FormControl(''),
            categories: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            subCategories: new FormControl('', [Validators.required]),
            language: new FormControl('', [Validators.required]),
            isFree: new FormControl('', [Validators.required]),
            price: new FormGroup({
                price: new FormControl('', [Validators.required]),
                currency: new FormControl('', [Validators.required]),
                noOfDays: new FormControl('', [Validators.required])
            }),
            isFreeForAzam: new FormControl('', [Validators.required]),
            isSeries: new FormControl('false'),
            status: new FormControl('', [Validators.required]),
            boundingBox: new FormControl('', [Validators.required]),
            cdnID: new FormControl('', [Validators.required]),
            series: new FormControl([]),
            images: new FormControl([]),
            imageThumb: new FormControl('', [Validators.required]),
            // packageID: new FormControl(''),
            createdBy: new FormControl(''),
        })

    }

    initializeNewsForm() {
        this.contentForm = new FormGroup({
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            tags: new FormControl('', [Validators.required]),

            categories: new FormControl('', [Validators.required]),
            subCategories: new FormControl('', [Validators.required]),
            isFree: new FormControl('', [Validators.required]),
            isFreeForAzam: new FormControl('', [Validators.required]),
            isSeries: new FormControl('false'),
            status: new FormControl('', [Validators.required]),
            series: new FormControl([]),
            images: new FormControl([]),
            imageThumb: new FormControl('', [Validators.required]),
        })
    }

    initializeVideoForm() {
        this.contentForm = new FormGroup({
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            tags: new FormControl('', [Validators.required]),
            releaseDate: new FormControl('', Validators.required),
            duration: new FormControl(''),
            starring: new FormControl(''),
            director: new FormControl(''),
            categories: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            subCategories: new FormControl('', [Validators.required]),
            language: new FormControl('', [Validators.required]),
            isFree: new FormControl('', [Validators.required]),
            price: new FormGroup({
                price: new FormControl('', [Validators.required]),
                currency: new FormControl('', [Validators.required]),
                noOfDays: new FormControl('', [Validators.required])
            }),
            isFreeForAzam: new FormControl('', [Validators.required]),
            isSeries: new FormControl('false'),
            isEpisode: new FormControl('false'),
            status: new FormControl('', [Validators.required]),
            boundingBox: new FormControl('', [Validators.required]),
            cdnID: new FormControl('', [Validators.required]),
            series: new FormControl([]),
            images: new FormControl([]),
            imageThumb: new FormControl('https://s3.eu-west-1.amazonaws.com/com.azamtv2019/DOCUBOXHD-350x200-LOGOS-29b70b951bf81cc6045631f83c2868b0.jpg', [Validators.required]),
            //  packageID: new FormControl(''),
            createdBy: new FormControl(''),
        })
    }

    initializeLiveTVForm() {
        this.contentForm = new FormGroup({
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            tags: new FormControl('', [Validators.required]),
            releaseDate: new FormControl('', Validators.required),
            duration: new FormControl(''),
            starring: new FormControl(''),
            director: new FormControl(''),
            categories: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            subCategories: new FormControl('', [Validators.required]),
            language: new FormControl('', [Validators.required]),
            isFree: new FormControl('', [Validators.required]),
            price: new FormGroup({
                price: new FormControl('', [Validators.required]),
                currency: new FormControl('', [Validators.required]),
                noOfDays: new FormControl('', [Validators.required])
            }),
            isFreeForAzam: new FormControl('', [Validators.required]),
            isSeries: new FormControl('false'),
            status: new FormControl('', [Validators.required]),
            boundingBox: new FormControl('', [Validators.required]),
            cdnID: new FormControl('', [Validators.required]),
            series: new FormControl([]),
            images: new FormControl([]),
            imageThumb: new FormControl('', [Validators.required]),
            //  packageID: new FormControl(''),
            createdBy: new FormControl(''),
        })
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
    episode: any[] = [];
    currencies: any[] = [
        "TZS",
        "USD"
    ];
    seasonEditObject: Object = null;

    constructor(
        public dialogRef: MatDialogRef<AddSeasonsDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private dialog: MatDialog
    ) {
        console.log(data);
        if (data) {
            this.seasonEditObject = data;
            this.seasonForm.setValue({
                title: data.title,
                currency: data.price[0].currency,
                noOfDays: data.price[0].noOfDays,
                price: data.price[0].price
            })
            this.episode = data.episode;
        }

    }

    openAddSeasonsDialog() {
        const dialogRef = this.dialog.open(AddEpisodesDialog, {
            width: '800px',
            data: {}
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                result.content.id = result.content._id;
                this.episode.push(result.content);
            }

        })
    }

    removeEpisode(index) {
        this.episode.splice(index, 1);
    }

    getData() {
        let priceArray = [];
        priceArray.push({
            price: this.seasonForm.value.price,
            currency: this.seasonForm.value.currency,
            noOfDays: this.seasonForm.value.noOfDays
        })
        // this.seasonForm.value['episodes'] = this.episodes;
        let result = {
            title: this.seasonForm.value.title,
            price: priceArray,
            episode: this.episode,
        };
        if (this.seasonEditObject !== null) {
            Object.assign(this.seasonEditObject, result)
            return this.seasonEditObject;
        } else {
            return result;
        }

    }
}

@Component({
    selector: 'dialog-content-type',
    templateUrl: '../dialog-content-add-episodes.html',
})
export class AddEpisodesDialog {

    episodeForm = new FormGroup({
        content: new FormControl('', [Validators.required])
    })

    contents: any[] = []

    getLanguages() {
        this.contentService.find('vod').subscribe((response: any) => {
            if (response.status === 200) {
                this.contents = response.data;
            }
        },
            error => console.error(error));
    }




    constructor(
        public dialogRef: MatDialogRef<AddEpisodesDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private contentService: VodService,

    ) {
        this.getLanguages();
    }



}


@Component({
    selector: 'dialog-content-type',
    templateUrl: '../dialog-content-add-images.html',
})
export class AddMultipleImages {

    images: string[] = [];
    isUploading: boolean = false;
    fileToUpload: any = null;

    constructor(
        public dialogRef: MatDialogRef<AddMultipleImages>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private vodService: VodService
    ) {

    }


    handelImageChange(files: FileList) {
        for (let index = 0; index < files.length; index++) {
            this.fileToUpload = files.item(index)
            this.fileToUpload.mimeType = this.fileToUpload.type;
            this.uploadFileToActivity();
        }
        // this.fileToUpload = files.item(0);

    }

    uploadFileToActivity() {
        this.isUploading = true;
        this.vodService.uploadUrl(this.fileToUpload).subscribe((response: any) => {

            this.isUploading = false;
            if (response.status == 200 || response.success) {
                this.images.push(response.fileUrl);
            }

        }, error => {
            this.isUploading = false;
        });
    }


    removeImage(index) {
        this.images.splice(index, 1);

    }
}