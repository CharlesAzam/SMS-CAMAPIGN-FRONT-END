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

    isNewsForm: boolean = false;
    isRadioForm: boolean = false;
    isVideoForm: boolean = false;
    isLiveTvForm: boolean = false;
    isSeriesForm: boolean = false;

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

    vodTypes: string[] = [
        "VIDEO",
        "LIVETV",
        "SERIES"
    ]

    ngOnInit() {
        this.getCategories();
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
                    this.initiliazeRadioForm();

                    break;
                case "SERIES":
                    this.formType = 'Series';
                    this.contentType = 'VOD';
                    this.vodType = "SERIES";
                    this.isSeriesForm = !this.isSeriesForm;
                    this.initializeSeriesForm()

                    break;
                case "NEWS":
                    this.formType = 'News'
                    this.contentType = 'NEWS';
                    this.isNewsForm = !this.isNewsForm;
                    this.initializeNewsForm()

                    break;

                case "VIDEOONDEMAND":
                    this.formType = "Video On Demand"
                    this.contentType = 'VOD';
                    this.vodType = "VIDEO";
                    this.isVideoForm = !this.isVideoForm;
                    this.initializeVideoForm()
                    break;

                case "LIVETV":
                    this.formType = "Live TV"
                    this.contentType = 'VOD';
                    this.vodType = "LIVETV";
                    this.isLiveTvForm = !this.isLiveTvForm;
                    this.initializeLiveTVForm();
                    break;


                default:
                    this.vodService.findById(params.id).subscribe((response: any) => {
                        if (response.status === 200) {
                            // console.log(response)
                            this.vod = response.data[0];
                            this.imageUrl = this.vod.imageThumb;
                            console.log(this.vod.subCategories.map((subs) => subs._id))
                            if (this.vod.contentType === 'VOD') {
                                switch (this.vod.vodType) {
                                    case "VIDEO":
                                        this.formType = "Video On Demand"
                                        this.contentType = 'VOD';
                                        this.vodType = "VIDEO";
                                        this.isVideoForm = !this.isVideoForm;
                                        this.initializeVideoForm()

                                        this.contentForm.setValue({
                                            title: this.vod.title ? this.vod.title : '',
                                            description: this.vod.description ? this.vod.description : '',
                                            tags: this.vod.tags ? this.vod.tags : [],
                                            releaseDate: this.vod.releaseDate ? this.vod.releaseDate : '',
                                            duration: this.vod.duration ? this.vod.duration : '',
                                            starring: this.vod.starring ? this.vod.starring : '',
                                            director: this.vod.director ? this.vod.starring : '',
                                            categories: this.vod.categories ? this.vod.categories.map((categor) => categor._id) : '',
                                            country: this.vod.country ? this.vod.country : '',
                                            subCategories: this.vod.subCategories ? this.vod.categories.map((subs) => subs._id) : '',
                                            language: this.vod.language ? this.vod.language : '',
                                            isFree: String(this.vod.isFree) ? String(this.vod.isFree) : '',
                                            price: {
                                                price: this.vod.priceDetail[0] ? this.vod.priceDetail[0].price : '',
                                                currency: this.vod.priceDetail[0] ? this.vod.priceDetail[0].currency : '',
                                                noOfDays: this.vod.priceDetail[0] ? this.vod.priceDetail[0].noOfDays : '',
                                            },
                                            isFreeAzam: String(this.vod.isFreeForAzam) ? String(this.vod.isFreeForAzam) : '',
                                            isSeries: String(this.vod.isSeries) ? String(this.vod.isSeries) : '',
                                            status: String(this.vod.status) ? String(this.vod.status) : '',
                                            boundingBox: this.vod.boundingBox ? this.vod.boundingBox : '',
                                            cdnID: this.vod.cdnID ? this.vod.cdnID : '',
                                            series: this.vod.series ? this.vod.series : [],
                                            images: this.vod.images ? this.vod.images : [],
                                            imageThumb: this.vod.imageThumb ? '' : '',
                                            packageID: this.vod.packageID ? this.vod.packageID : '',
                                            createdBy: this.vod.createdBy ? this.vod.createdBy : '',
                                        })

                                        break;

                                    case "SERIES": 
                                        this.formType = 'Series';
                                        this.contentType = 'VOD';
                                        this.vodType = "SERIES";
                                        this.isSeriesForm = !this.isSeriesForm;
                                        this.initializeSeriesForm()
                                        this.seasons = this.vod.series[0].season;
                                        this.contentForm.setValue({
                                            title: this.vod.title ? this.vod.title : '',
                                            description: this.vod.description ? this.vod.description : '',
                                            tags: this.vod.tags ? this.vod.tags : [],
                                            releaseDate: this.vod.releaseDate ? this.vod.releaseDate : '',
                                            duration: this.vod.duration ? this.vod.duration : '',
                                            starring: this.vod.starring ? this.vod.starring : '',
                                            director: this.vod.director ? this.vod.starring : '',
                                            categories: this.vod.categories.map((categor) => categor._id) ? this.vod.categories.map((categor) => categor._id) : '',
                                            country: this.vod.country ? this.vod.country : '',
                                            subCategories: this.vod.subCategories ? this.vod.categories.map((subs) => subs._id) : '',
                                            language: this.vod.language ? this.vod.language : '',
                                            isFree: String(this.vod.isFree) ? String(this.vod.isFree) : '',
                                            price: {
                                                price: this.vod.priceDetail[0] ? this.vod.priceDetail[0].price : '',
                                                currency: this.vod.priceDetail[0] ? this.vod.priceDetail[0].currency : '',
                                                noOfDays: this.vod.priceDetail[0] ? this.vod.priceDetail[0].noOfDays : '',
                                            },
                                            isFreeAzam: String(this.vod.isFreeForAzam) ? String(this.vod.isFreeForAzam) : '',
                                            isSeries: String(this.vod.isSeries) ? String(this.vod.isSeries) : '',
                                            status: String(this.vod.status) ? String(this.vod.status) : '',
                                            boundingBox: this.vod.boundingBox ? this.vod.boundingBox : '',
                                            cdnID: this.vod.cdnID ? this.vod.cdnID : '',
                                            series: this.vod.series ? this.vod.series : [],
                                            images: this.vod.images ? this.vod.images : [],
                                            imageThumb: this.vod.imageThumb ? '' : '',
                                            packageID: this.vod.packageID ? this.vod.packageID : '',
                                            createdBy: this.vod.createdBy ? this.vod.createdBy : '',
                                        })


                                        break;

                                    case "LIVETV":
                                        this.formType = "Live TV"
                                        this.contentType = 'VOD';
                                        this.vodType = "LIVETV";
                                        this.isLiveTvForm = !this.isLiveTvForm;
                                        this.initializeLiveTVForm();
                                        this.contentForm.setValue({
                                            title: this.vod.title ? this.vod.title : '',
                                            description: this.vod.description ? this.vod.description : '',
                                            tags: this.vod.tags ? this.vod.tags : [],
                                            releaseDate: this.vod.releaseDate ? this.vod.releaseDate : '',
                                            duration: this.vod.duration ? this.vod.duration : '',
                                            starring: this.vod.starring ? this.vod.starring : '',
                                            director: this.vod.director ? this.vod.starring : '',
                                            categories: this.vod.categories.map((categor) => categor._id) ? this.vod.categories.map((categor) => categor._id) : '',
                                            country: this.vod.country ? this.vod.country : '',
                                            subCategories: this.vod.subCategories ? this.vod.categories.map((subs) => subs._id) : '',
                                            language: this.vod.language ? this.vod.language : '',
                                            isFree: String(this.vod.isFree) ? String(this.vod.isFree) : '',
                                            price: {
                                                price: this.vod.priceDetail[0] ? this.vod.priceDetail[0].price : '',
                                                currency: this.vod.priceDetail[0] ? this.vod.priceDetail[0].currency : '',
                                                noOfDays: this.vod.priceDetail[0] ? this.vod.priceDetail[0].noOfDays : '',
                                            },
                                            isFreeAzam: String(this.vod.isFreeForAzam) ? String(this.vod.isFreeForAzam) : '',
                                            isSeries: String(this.vod.isSeries) ? String(this.vod.isSeries) : '',
                                            status: String(this.vod.status) ? String(this.vod.status) : '',
                                            boundingBox: this.vod.boundingBox ? this.vod.boundingBox : '',
                                            cdnID: this.vod.cdnID ? this.vod.cdnID : '',
                                            series: this.vod.series ? this.vod.series : [],
                                            images: this.vod.images ? this.vod.images : [],
                                            imageThumb: this.vod.imageThumb ? '' : '',
                                            packageID: this.vod.packageID ? this.vod.packageID : '',
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
                                this.contentForm.setValue({
                                    title: this.vod.title ? this.vod.title : '',
                                    description: this.vod.description ? this.vod.description : '',
                                    tags: this.vod.tags ? this.vod.tags : [],
                                    duration: this.vod.duration ? this.vod.duration : '',
                                    starring: this.vod.starring ? this.vod.starring : '',
                                    director: this.vod.director ? this.vod.starring : '',
                                    categories: this.vod.categories.map((categor) => categor._id) ? this.vod.categories.map((categor) => categor._id) : '',
                                    country: this.vod.country ? this.vod.country : '',
                                    subCategories: this.vod.subCategories ? this.vod.categories.map((subs) => subs._id) : '',
                                    language: this.vod.language ? this.vod.language : '',
                                    isFree: String(this.vod.isFree) ? String(this.vod.isFree) : '',
                                    price: {
                                        price: this.vod.priceDetail[0] ? this.vod.priceDetail[0].price : '',
                                        currency: this.vod.priceDetail[0] ? this.vod.priceDetail[0].currency : '',
                                        noOfDays: this.vod.priceDetail[0] ? this.vod.priceDetail[0].noOfDays : '',
                                    },
                                    isFreeAzam: String(this.vod.isFreeForAzam) ? String(this.vod.isFreeForAzam) : '',
                                    isSeries: String(this.vod.isSeries) ? String(this.vod.isSeries) : '',
                                    status: String(this.vod.status) ? String(this.vod.status) : '',
                                    boundingBox: this.vod.boundingBox ? this.vod.boundingBox : '',
                                    cdnID: this.vod.cdnID ? this.vod.cdnID : '',
                                    series: this.vod.series ? this.vod.series : [],
                                    images: this.vod.images ? this.vod.images : [],
                                    imageThumb: this.vod.imageThumb ? '' : '',
                                    packageID: this.vod.packageID ? this.vod.packageID : '',
                                    createdBy: this.vod.createdBy ? this.vod.createdBy : '',
                                })

                            } else if (this.vod.contentType === 'NEWS') {
                                this.formType = 'News'
                                this.contentType = 'NEWS';
                                this.initializeNewsForm()
                                this.isNewsForm = !this.isNewsForm;
                                this.contentForm.setValue({
                                    title: this.vod.title ? this.vod.title : '',
                                    description: this.vod.description ? this.vod.description : '',
                                    tags: this.vod.tags ? this.vod.tags : [],

                                    categories: this.vod.categories.map((categor) => categor._id) ? this.vod.categories.map((categor) => categor._id) : '',
                                    subCategories: this.vod.subCategories ? this.vod.categories.map((subs) => subs._id) : '',
                                    isFree: String(this.vod.isFree) ? String(this.vod.isFree) : '',
                                    price: {
                                        price: this.vod.priceDetail[0] ? this.vod.priceDetail[0].price : '',
                                        currency: this.vod.priceDetail[0] ? this.vod.priceDetail[0].currency : '',
                                        noOfDays: this.vod.priceDetail[0] ? this.vod.priceDetail[0].noOfDays : '',
                                    },
                                    isFreeAzam: String(this.vod.isFreeForAzam) ? String(this.vod.isFreeForAzam) : '',
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
            else
                console.log(response)
        }, error => {
            this.isUploading = false;
            console.log("=======>", error);
        });
    }

    save() {
        if (this.imageUrl && !this.isNewsForm)
            this.contentForm.value['imageThumb'] = this.imageUrl;

        this.contentForm.value['contentType'] = this.contentType;
        if (this.vodType)
            this.contentForm.value['vodType'] = this.vodType
        
        if(this.isSeriesForm){
            this.contentForm.value.series = {
                "season": this.seasons
              };
            console.log('Season=',this.seasons);    
        }

        console.log(this.contentForm.value)
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
            console.log('Form Value=',this.contentForm.value);
            
           // return false;
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

    getCategories() {
        this.route.params.subscribe((params: any) => {
            let type = params.id;
            if (type == "LIVETV" || type == "SERIES" || type == "VIDEOONDEMAND") {
              type = "VOD";
            }
      
            this.categoriesService.findByType(type).subscribe(
              (response: any) => {
                if (response.status === 200) {
                  this.categorys = response.data;
                }
              },
              error => console.error(error)
            );
          });
    }

    getTags() {
        this.tagsService.find().subscribe((response: any) => {
            if (response.status === 200) {
                this.tagss = response.data;
            }
        },
            error => console.error(error));
    }

    getSubCategories(event) { 
        this.subCategoriesService.findByCategory(event.value).subscribe((response: any) => {
            if (response.status === 200) {
                this.subCategorie = response.data;
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



    openDialog(season?: any) {
        const dialogRef = this.dialog.open(AddSeasonsDialog, {
            width: '800px',
            data: season ? season : null
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.seasons.push(result);
            }

        })
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
                price: new FormControl('', [Validators.required]),
                currency: new FormControl('', [Validators.required]),
                noOfDays: new FormControl('', [Validators.required])
            }),
            isFreeAzam: new FormControl('', [Validators.required]),
            isSeries: new FormControl('true'),
            status: new FormControl('', [Validators.required]),
            boundingBox: new FormControl('', [Validators.required]),
            cdnID: new FormControl('', [Validators.required]),
            series: new FormControl([]),
            images: new FormControl([]),
            imageThumb: new FormControl('', [Validators.required]),
            packageID: new FormControl(''),
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
            isFreeAzam: new FormControl('', [Validators.required]),
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
            starring: new FormControl('', [Validators.required]),
            director: new FormControl('', [Validators.required]),
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
            isFreeAzam: new FormControl('', [Validators.required]),
            isSeries: new FormControl('false'),
            status: new FormControl('', [Validators.required]),
            boundingBox: new FormControl('', [Validators.required]),
            cdnID: new FormControl('', [Validators.required]),
            series: new FormControl([]),
            images: new FormControl([]),
            imageThumb: new FormControl('', [Validators.required]),
            packageID: new FormControl(''),
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
            price: new FormGroup({
                price: new FormControl('', [Validators.required]),
                currency: new FormControl('', [Validators.required]),
                noOfDays: new FormControl('', [Validators.required])
            }),
            isFreeAzam: new FormControl('', [Validators.required]),
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
            duration: new FormControl(),
            starring: new FormControl('', [Validators.required]),
            director: new FormControl('', [Validators.required]),
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
            isFreeAzam: new FormControl('', [Validators.required]),
            isSeries: new FormControl('false'),
            status: new FormControl('', [Validators.required]),
            boundingBox: new FormControl('', [Validators.required]),
            cdnID: new FormControl('', [Validators.required]),
            series: new FormControl([]),
            images: new FormControl([]),
            imageThumb: new FormControl('', [Validators.required]),
            packageID: new FormControl(''),
            createdBy: new FormControl(''),
        })
    }

    initializeLiveTVForm() {
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
                price: new FormControl('', [Validators.required]),
                currency: new FormControl('', [Validators.required]),
                noOfDays: new FormControl('', [Validators.required])
            }),
            isFreeAzam: new FormControl('', [Validators.required]),
            isSeries: new FormControl('false'),
            status: new FormControl('', [Validators.required]),
            boundingBox: new FormControl('', [Validators.required]),
            cdnID: new FormControl('', [Validators.required]),
            series: new FormControl([]),
            images: new FormControl([]),
            imageThumb: new FormControl('', [Validators.required]),
            packageID: new FormControl(''),
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

    constructor(
        public dialogRef: MatDialogRef<AddSeasonsDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private dialog: MatDialog
    ) {
        if (data !== null) {
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
                 console.log('Epidode=',result.content)
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

        return {
            title: this.seasonForm.value.title,
            price: priceArray,
            episode: this.episode
        };
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