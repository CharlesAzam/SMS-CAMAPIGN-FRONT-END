import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { ActivatedRoute, Router, UrlSerializer, DefaultUrlSerializer } from "@angular/router";
import { VodService } from "../vod.service";
import { Vod } from "../vod";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { of, ReplaySubject, Subject } from "rxjs";
import {
  MatChipInputEvent,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatSelect,
  MatOption
} from "@angular/material";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoriesService } from "src/app/services/categories.service";
import { SubCategoriesService } from "src/app/services/sub.categories.service";
import { MobileTagsService } from "src/app/services/mobile-tags.service";
import { PackageService } from "../../package/package.service";
import { LanguageService } from "src/app/services/language.service";
import { CountryService } from "src/app/services/coutry.service";
import { VideoLibraryService } from "../../video-library/video-library.service";

@Component({
  selector: "vod-edit",
  templateUrl: "./vod-edit.component.html"
})
export class VodEditComponent implements OnInit {
  isNewsForm: boolean = false;
  isRadioForm: boolean = false;
  isVideoForm: boolean = false;
  isLiveTvForm: boolean = false;
  isSeriesForm: boolean = false;

  filterEnglishCategoriesCtrl: FormControl = new FormControl();
  filterSwahiliCategoriesCtrl: FormControl = new FormControl();
  filterCountryCtrl: FormControl = new FormControl();
  filterRegionsCtrl: FormControl = new FormControl();
  filterEnglishSubCategoryCtrl: FormControl = new FormControl();
  filterSwahiliSubCategoryCtrl: FormControl = new FormControl();
  filterCdnCtrl: FormControl = new FormControl();
  filterTagsCtrl: FormControl = new FormControl();
  filterOriginCountryCtrl: FormControl = new FormControl();
  filterPackagesCtrl: FormControl = new FormControl();

  filteredEnglishCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredSwahiliCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredRegions: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredEnglishSubCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredSwahiliSubCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredCdns: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredTags: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredOriginCountry: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredPackages: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  protected _onDestroy = new Subject<void>();

  formType: string = "";

  contentForm = new FormGroup({});

  priceArray: any[] = [];

  id: string;
  vod: Vod;
  errors: string;
  vodType: string;
  contentType: string;

  isUploading: boolean = false;
  imageUrl: string = "";
  fileToUpload: any = null;

  currencies: string[] = ['USD', 'TZS', 'KES', 'UGX', 'MWK', 'RWF', 'BIF'];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.tagss.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(tag): void {
    if (confirm("Are you sure to remove  this?")) {
      const index = this.tagss.indexOf(tag);
      if (index >= 0) {
        this.tagss.splice(index, 1);
      }
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
    this.initializeForm();
  }

  enId: string;
  swaId: string;
  languages: any[] = [];
  tagss: any[] = [];
  englishCategorys: any[] = [];
  swahiliCategorys: any[] = [];
  channels: any[] = [];
  countries: any[] = [];
  regionss: any[] = [];
  packages: any[] = [];
  englishSubCategorie: any[] = [];
  swahiliSubCategorie: any[] = [];
  cdns: any[] = [];
  boxes: string[] = ["HORIZONTAL_CARD", "VERTICAL_CARD", "BANNER", "LOGO"];
  seasons: any[] = [];
  links: any[] = [];
  images: string[] = [];
  allSelected = false;
  @ViewChild("countrySelection", null) countrySelection: MatSelect;

  vodTypes: string[] = ["VIDEO", "LIVETV", "SERIES"];

  ngOnInit() {
    this.getCountries();
    this.getRegions();
    // this.getSubCategories();
    this.getLanguages();

    this.route.params.subscribe((params: any) => {
      switch (params.id) {
        case "RADIO":
          this.getChannels();
          this.getPackages();
          this.getTags();
          this.getCDNLibrary();
          this.formType = "Radio";
          this.contentType = "RADIO";
          this.isRadioForm = !this.isRadioForm;
          this.getCategories("RADIO");
          this.initiliazeRadioForm();

          break;
        case "SERIES":
          this.getChannels();
          this.getPackages();
          this.getTags();
          this.getCDNLibrary();
          this.formType = "Series";
          this.contentType = "VOD";
          this.vodType = "SERIES";
          this.isSeriesForm = !this.isSeriesForm;
          this.getCategories("SERIES");
          this.initializeSeriesForm();

          break;
        case "NEWS":
          this.getTags();
          this.formType = "News";
          this.contentType = "NEWS";
          this.isNewsForm = !this.isNewsForm;
          this.getCategories("NEWS");
          this.initializeNewsForm();

          break;

        case "VIDEOONDEMAND":
          this.getChannels();
          this.getPackages();
          this.getTags();
          this.getCDNLibrary();
          this.formType = "Video On Demand";
          this.contentType = "VOD";
          this.vodType = "VIDEO";
          this.isVideoForm = !this.isVideoForm;
          this.getCategories("VOD");
          this.initializeVideoForm();
          break;

        case "LIVETV":
          this.getChannels();
          this.getPackages();
          this.getTags();
          this.getCDNLibrary();
          this.formType = "Live TV";
          this.contentType = "VOD";
          this.vodType = "LIVETV";
          this.isLiveTvForm = !this.isLiveTvForm;
          this.getCategories("VOD");
          this.initializeLiveTVForm();
          break;

        default:
          this.vodService.findById(params.id).subscribe((response: any) => {
            if (response.status === 200) {
              this.vod = response.data[0];
              this.getCategories(this.vod.contentType);
              this.imageUrl = this.vod.imageThumb;
              if (this.vod.contentType === "VOD") {
                this.getChannels();
                this.getPackages();
                this.getTags();
                this.getCDNLibrary();
                switch (this.vod.vodType) {
                  case "VIDEO":
                    this.formType = "Video On Demand";
                    this.contentType = "VOD";
                    this.vodType = "VIDEO";
                    this.isVideoForm = !this.isVideoForm;
                    this.initializeVideoForm();
                    this.getSubCategories({
                      value: this.vod.categories.map(categor => categor._id)
                    });
                    this.contentForm.setValue({
                      title: this.vod.title ? this.vod.title : "",
                      description: this.vod.description
                        ? this.vod.description
                        : "",
                      tags: this.vod.tags ? this.vod.tags : [],
                      releaseDate: this.vod.releaseDate
                        ? this.vod.releaseDate
                        : "",
                      duration: this.vod.duration ? this.vod.duration : "",
                      starring: this.vod.starring ? this.vod.starring : "",
                      director: this.vod.director ? this.vod.director : "",
                      enCategories: this.vod.categories.map(
                        categor => categor._id
                      )
                        ? this.vod.categories.filter(cat => cat.language === this.enId).map(categor => {
                          return categor._id;
                        })
                        : "",
                      swCategories: this.vod.categories.map(
                        categor => categor._id
                      )
                        ? this.vod.categories.filter(cat => cat.language === this.swaId).map(categor => {
                          return categor._id;
                        })
                        : "",
                      region:
                        this.vod.region.length > 0
                          ? this.vod.region.map(region => region._id)
                          : [],
                      country: this.vod.country
                        ? this.vod.country.map(country => {
                          if (country._id != 0) return country._id;
                        })
                        : "",

                      enSubCategories: this.vod.subCategories
                        ? this.vod.subCategories.filter(cat => cat.language === this.enId).map(subs => {
                          return subs._id
                        })
                        : "",
                      swSubCategories: this.vod.subCategories
                        ? this.vod.subCategories.filter(cat => cat.language === this.swaId).map(subs => {
                          if (subs.language === this.swaId)
                            return subs._id
                        })
                        : "",
                      language: this.vod.language ? this.vod.language : [],
                      isFree: String(this.vod.isFree)
                        ? String(this.vod.isFree)
                        : "",
                      price: {
                        price: this.vod.priceDetail[0]
                          ? this.vod.priceDetail[0].price
                          : "",
                        currency: this.vod.priceDetail[0]
                          ? this.vod.priceDetail[0].currency
                          : "",
                        noOfDays: this.vod.priceDetail[0]
                          ? this.vod.priceDetail[0].noOfDays
                          : ""
                      },
                      isFreeForAzam: String(this.vod.isFreeForAzam)
                        ? String(this.vod.isFreeForAzam)
                        : "",
                      isEpisode: String(this.vod.isEpisode)
                        ? String(this.vod.isEpisode)
                        : "",
                      isSeries: String(this.vod.isSeries)
                        ? String(this.vod.isSeries)
                        : "",
                      status: String(this.vod.status)
                        ? String(this.vod.status)
                        : "",
                      boundingBox: this.vod.boundingBox
                        ? this.vod.boundingBox
                        : "",
                      cdnID: this.vod.cdnID ? this.vod.cdnID : "",
                      series: this.vod.series ? this.vod.series : [],
                      images: this.vod.images ? this.vod.images : [],
                      imageThumb: this.vod.imageThumb ? "" : "",
                      packageID: this.vod.packageID ? this.vod.packageID.map((pack) => pack._id) : '',
                      createdBy: this.vod.createdBy ? this.vod.createdBy : ""
                    });
                    this.priceArray = this.vod.priceDetail;

                    break;

                  case "SERIES":
                    this.formType = "Series";
                    this.contentType = "VOD";
                    this.vodType = "SERIES";
                    this.isSeriesForm = !this.isSeriesForm;
                    this.initializeSeriesForm();
                    this.getSubCategories({
                      value: this.vod.categories.map(categor => categor._id)
                    });
                    this.seasons = this.vod.series[0].season;
                    this.contentForm.setValue({
                      title: this.vod.title ? this.vod.title : "",
                      description: this.vod.description
                        ? this.vod.description
                        : "",
                      tags: this.vod.tags ? this.vod.tags : [],
                      releaseDate: this.vod.releaseDate
                        ? this.vod.releaseDate
                        : "",
                      duration: this.vod.duration ? this.vod.duration : "",
                      starring: this.vod.starring ? this.vod.starring : "",
                      director: this.vod.director ? this.vod.director : "",
                      enCategories: this.vod.categories.map(
                        categor => categor._id
                      )
                        ? this.vod.categories.filter(cat => cat.language === this.enId).map(categor => {
                          return categor._id;
                        })
                        : "",
                      swCategories: this.vod.categories.map(
                        categor => categor._id
                      )
                        ? this.vod.categories.filter(cat => cat.language === this.swaId).map(categor => {
                          return categor._id;
                        })
                        : "",
                      region:
                        this.vod.region.length > 0
                          ? this.vod.region.map(region => region._id)
                          : [],
                      country: this.vod.country
                        ? this.vod.country.map(country => {
                          if (country._id != 0) return country._id;
                        })
                        : "",
                      enSubCategories: this.vod.subCategories
                        ? this.vod.subCategories.filter(cat => cat.language === this.enId).map(subs => {
                          return subs._id
                        })
                        : "",
                      swSubCategories: this.vod.subCategories
                        ? this.vod.subCategories.filter(cat => cat.language === this.swaId).map(subs => {
                          if (subs.language === this.swaId)
                            return subs._id
                        })
                        : "",
                      language: this.vod.language ? this.vod.language : [],
                      isFree: String(this.vod.isFree)
                        ? String(this.vod.isFree)
                        : "",
                      price: {
                        price: this.vod.priceDetail[0]
                          ? this.vod.priceDetail[0].price
                          : "",
                        currency: this.vod.priceDetail[0]
                          ? this.vod.priceDetail[0].currency
                          : "",
                        noOfDays: this.vod.priceDetail[0]
                          ? this.vod.priceDetail[0].noOfDays
                          : ""
                      },
                      isFreeForAzam: String(this.vod.isFreeForAzam)
                        ? String(this.vod.isFreeForAzam)
                        : "",
                      isSeries: String(this.vod.isSeries)
                        ? String(this.vod.isSeries)
                        : "",
                      status: String(this.vod.status)
                        ? String(this.vod.status)
                        : "",
                      boundingBox: this.vod.boundingBox
                        ? this.vod.boundingBox
                        : "",
                      cdnID: this.vod.cdnID ? this.vod.cdnID : "",
                      series: this.vod.series ? this.vod.series : [],
                      images: this.vod.images ? this.vod.images : [],
                      imageThumb: this.vod.imageThumb ? "" : "",
                      packageID: this.vod.packageID ? this.vod.packageID.map((pack) => pack._id) : '',
                      createdBy: this.vod.createdBy ? this.vod.createdBy : ""
                    });
                    this.priceArray = this.vod.priceDetail;

                    break;

                  case "LIVETV":
                    this.formType = "Live TV";
                    this.contentType = "VOD";
                    this.vodType = "LIVETV";
                    this.isLiveTvForm = !this.isLiveTvForm;
                    this.initializeLiveTVForm();
                    this.getSubCategories({
                      value: this.vod.categories.map(categor => categor._id)
                    });
                    this.contentForm.setValue({
                      title: this.vod.title ? this.vod.title : "",
                      description: this.vod.description
                        ? this.vod.description
                        : "",
                      tags: this.vod.tags ? this.vod.tags : [],
                      releaseDate: this.vod.releaseDate
                        ? this.vod.releaseDate
                        : "",
                      duration: this.vod.duration ? this.vod.duration : "",
                      starring: this.vod.starring ? this.vod.starring : "",
                      director: this.vod.director ? this.vod.director : "",
                      enCategories: this.vod.categories.map(
                        categor => categor._id
                      )
                        ? this.vod.categories.filter(cat => cat.language === this.enId).map(categor => {
                          return categor._id;
                        })
                        : "",
                      swCategories: this.vod.categories.map(
                        categor => categor._id
                      )
                        ? this.vod.categories.filter(cat => cat.language === this.swaId).map(categor => {
                          return categor._id;
                        })
                        : "",
                      region:
                        this.vod.region.length > 0
                          ? this.vod.region.map(region => region._id)
                          : [],
                      country: this.vod.country
                        ? this.vod.country.map(country => {
                          if (country._id != 0) return country._id;
                        })
                        : "",
                      enSubCategories: this.vod.subCategories
                        ? this.vod.subCategories.filter(cat => cat.language === this.enId).map(subs => {
                          return subs._id
                        })
                        : "",
                      swSubCategories: this.vod.subCategories
                        ? this.vod.subCategories.filter(cat => cat.language === this.swaId).map(subs => {
                          if (subs.language === this.swaId)
                            return subs._id
                        })
                        : "",
                      language: this.vod.language ? this.vod.language : [],
                      referenceChannelID: parseInt(
                        this.vod.referenceChannelID,
                        10
                      )
                        ? parseInt(this.vod.referenceChannelID, 10)
                        : "",
                      isFree: String(this.vod.isFree)
                        ? String(this.vod.isFree)
                        : "",
                      price: {
                        price: this.vod.priceDetail[0]
                          ? this.vod.priceDetail[0].price
                          : "",
                        currency: this.vod.priceDetail[0]
                          ? this.vod.priceDetail[0].currency
                          : "",
                        noOfDays: this.vod.priceDetail[0]
                          ? this.vod.priceDetail[0].noOfDays
                          : ""
                      },
                      isFreeForAzam: String(this.vod.isFreeForAzam)
                        ? String(this.vod.isFreeForAzam)
                        : "",
                      isSeries: String(this.vod.isSeries)
                        ? String(this.vod.isSeries)
                        : "",
                      status: String(this.vod.status)
                        ? String(this.vod.status)
                        : "",
                      boundingBox: this.vod.boundingBox
                        ? this.vod.boundingBox
                        : "",
                      cdnID: this.vod.cdnID ? this.vod.cdnID : "",
                      series: this.vod.series ? this.vod.series : [],
                      images: this.vod.images ? this.vod.images : [],
                      imageThumb: this.vod.imageThumb ? "" : "",
                      packageID: this.vod.packageID ? this.vod.packageID.map((pack) => pack._id) : '',
                      createdBy: this.vod.createdBy ? this.vod.createdBy : ""
                    });
                    this.priceArray = this.vod.priceDetail;

                    break;

                  default:
                    break;
                }
              } else if (this.vod.contentType === "RADIO") {
                this.getChannels();
                this.getPackages();
                this.getTags();
                this.getCDNLibrary();
                this.formType = "Radio";
                this.contentType = "RADIO";
                this.isRadioForm = !this.isRadioForm;
                this.initiliazeRadioForm();
                this.getSubCategories({
                  value: this.vod.categories.map(categor => categor._id)
                });
                this.contentForm.setValue({
                  title: this.vod.title ? this.vod.title : "",
                  description: this.vod.description ? this.vod.description : "",
                  tags: this.vod.tags ? this.vod.tags : [],
                  duration: this.vod.duration ? this.vod.duration : "",
                  starring: this.vod.starring ? this.vod.starring : "",
                  director: this.vod.director ? this.vod.director : "",
                  enCategories: this.vod.categories.map(
                    categor => categor._id
                  )
                    ? this.vod.categories.filter(cat => cat.language === this.enId).map(categor => {
                      return categor._id;
                    })
                    : "",
                  swCategories: this.vod.categories.map(
                    categor => categor._id
                  )
                    ? this.vod.categories.filter(cat => cat.language === this.swaId).map(categor => {
                      return categor._id;
                    })
                    : "",
                  region:
                    this.vod.region.length > 0 ? this.vod.region.map(region => region._id) : [],
                  country: this.vod.country
                    ? this.vod.country.map(country => {
                      if (country._id != 0) return country._id;
                    })
                    : "",
                  enSubCategories: this.vod.subCategories
                    ? this.vod.subCategories.filter(cat => cat.language === this.enId).map(subs => {
                      return subs._id
                    })
                    : "",
                  swSubCategories: this.vod.subCategories
                    ? this.vod.subCategories.filter(cat => cat.language === this.swaId).map(subs => {
                      if (subs.language === this.swaId)
                        return subs._id
                    })
                    : "",
                  language: this.vod.language ? this.vod.language : [],
                  isFree: String(this.vod.isFree)
                    ? String(this.vod.isFree)
                    : "",
                  price: {
                    price: this.vod.priceDetail[0]
                      ? this.vod.priceDetail[0].price
                      : "",
                    currency: this.vod.priceDetail[0]
                      ? this.vod.priceDetail[0].currency
                      : "",
                    noOfDays: this.vod.priceDetail[0]
                      ? this.vod.priceDetail[0].noOfDays
                      : ""
                  },
                  isFreeForAzam: String(this.vod.isFreeForAzam)
                    ? String(this.vod.isFreeForAzam)
                    : "",
                  isSeries: String(this.vod.isSeries)
                    ? String(this.vod.isSeries)
                    : "",
                  status: String(this.vod.status)
                    ? String(this.vod.status)
                    : "",
                  boundingBox: this.vod.boundingBox ? this.vod.boundingBox : "",
                  cdnID: this.vod.cdnID ? this.vod.cdnID : "",
                  series: this.vod.series ? this.vod.series : [],
                  images: this.vod.images ? this.vod.images : [],
                  imageThumb: this.vod.imageThumb ? "" : "",
                  packageID: this.vod.packageID ? this.vod.packageID.map((pack) => pack._id) : '',
                  createdBy: this.vod.createdBy ? this.vod.createdBy : ""
                });
                this.priceArray = this.vod.priceDetail;
              } else if (this.vod.contentType === "NEWS") {
                this.getTags();
                this.formType = "News";
                this.contentType = "NEWS";
                this.links = this.vod.links;
                this.initializeNewsForm();
                this.getSubCategories({
                  value: this.vod.categories.map(categor => categor._id)
                });
                this.isNewsForm = !this.isNewsForm;
                this.images = this.vod.images;
                this.contentForm.setValue({
                  title: this.vod.title ? this.vod.title : "",
                  description: this.vod.description ? this.vod.description : "",
                  tags: this.vod.tags ? this.vod.tags : [],
                  region:
                    this.vod.region.length > 0 ? this.vod.region.map(region => region._id) : [],
                  country: this.vod.country
                    ? this.vod.country.map(country => {
                      if (country._id != 0) return country._id;
                    })
                    : "",
                  countryOrigin: this.vod.countryOrigin
                    ? this.vod.countryOrigin
                    : "",

                  enCategories: this.vod.categories.map(
                    categor => categor._id
                  )
                    ? this.vod.categories.filter(cat => cat.language === this.enId).map(categor => {
                      return categor._id;
                    })
                    : "",
                  swCategories: this.vod.categories.map(
                    categor => categor._id
                  )
                    ? this.vod.categories.filter(cat => cat.language === this.swaId).map(categor => {
                      return categor._id;
                    })
                    : "",
                  enSubCategories: this.vod.subCategories
                    ? this.vod.subCategories.filter(cat => cat.language === this.enId).map(subs => {
                      return subs._id
                    })
                    : "",
                  swSubCategories: this.vod.subCategories
                    ? this.vod.subCategories.filter(cat => cat.language === this.swaId).map(subs => {
                      if (subs.language === this.swaId)
                        return subs._id
                    })
                    : "",
                  isFree: String(this.vod.isFree)
                    ? String(this.vod.isFree)
                    : "",
                  isFreeForAzam: String(this.vod.isFreeForAzam)
                    ? String(this.vod.isFreeForAzam)
                    : "",
                  isSeries: String(this.vod.isSeries)
                    ? String(this.vod.isSeries)
                    : "",
                  status: String(this.vod.status)
                    ? String(this.vod.status)
                    : "",
                  language: this.vod.language
                    ? this.vod.language
                    : "",
                  links: this.vod.links ? this.vod.links : [],
                  series: this.vod.series ? this.vod.series : [],
                  images: this.vod.images ? this.vod.images : [],
                  imageThumb: this.vod.imageThumb ? "" : ""
                });
              }
            }
          });
          break;
      }
    });

    this.filterPackagesCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterPackages();
      });

    this.filterTagsCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterTags();
      });

    this.filterEnglishCategoriesCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterEnglishCategories();
      });

    this.filterEnglishSubCategoryCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterEnglishSubCategories();
      });

    this.filterSwahiliCategoriesCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterEnglishCategories();
      });

    this.filterSwahiliSubCategoryCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterEnglishSubCategories();
      });


    this.filterCdnCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCdn();
      });

    this.filterCountryCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountry();
      });

    this.filterRegionsCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterRegion();
      });

    this.filterOriginCountryCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterOriginCountry();
      });
  }

  handelImageChange(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileToUpload.mimeType = this.fileToUpload.type;
    this.uploadFileToActivity();
  }
  toggleAllSelection() {
    this.allSelected = !this.allSelected; // to control select-unselect

    if (this.allSelected) {
      this.countrySelection.options.forEach((item: MatOption) => {
        if (item.value != 0) {
          console.log("item", item);
          item.select();
        } else {
          item.deselect();
        }
      });
      console.log("this.countrySelection", this.countrySelection.options);
    } else {
      this.countrySelection.options.forEach((item: MatOption) => {
        item.deselect();
      });
    }
  }
  uploadFileToActivity() {
    this.isUploading = true;
    this.vodService.uploadUrl(this.fileToUpload).subscribe(
      (response: any) => {
        this.isUploading = false;
        if (response.status == 200 || response.success) {
          this.imageUrl = response.fileUrl;
        }
      },
      error => {
        this.isUploading = false;
      }
    );
  }

  save() {
    if (this.imageUrl) this.contentForm.value["imageThumb"] = this.imageUrl;

    this.contentForm.value["contentType"] = this.contentType;
    if (this.vodType) this.contentForm.value["vodType"] = this.vodType;

    if (this.isSeriesForm) {
      this.contentForm.value.series = {
        season: this.seasons
      };
    }

    if (this.priceArray.length > 0) {
      this.contentForm.value['price'] = this.priceArray;
    }

    if (this.isNewsForm) {
      this.contentForm.value["images"] = this.images;
    }

    if (this.links.length > 0) {
      this.contentForm.value["links"] = this.links;
    }

    this.contentForm.value["categories"] = this.contentForm.value['enCategories'].concat(this.contentForm.value['swCategories']);
    this.contentForm.value["subCategories"] = this.contentForm.value['enSubCategories'].concat(this.contentForm.value['swSubCategories']);

    if (this.vod) {
      Object.assign(this.vod, this.contentForm.value);

      this.vodService.update(this.checkIfValueIsEmpty(this.vod)).subscribe(
        vod => {
          this.errors = "Save was successful!";
          this.back();
        },
        err => {
          this.errors = "Error saving";
        }
      );
    } else {
      this.vodService
        .save(this.checkIfValueIsEmpty(this.contentForm.value))
        .subscribe(
          vod => {
            this.errors = "Save was successful!";
            this.back();
          },
          err => {
            this.errors = "Error saving";
          }
        );
    }
  }

  getCategories(type) {
    if (type == "LIVETV" || type == "SERIES" || type == "VIDEOONDEMAND") {
      type = "VOD";
    }
    this.categoriesService.findByType(type).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.englishCategorys = response.data.filter(category => category.language === this.enId);
          this.swahiliCategorys = response.data.filter(category => category.language === this.swaId);
          this.filteredEnglishCategories.next(this.englishCategorys.slice());
          this.filteredSwahiliCategories.next(this.swahiliCategorys.slice());
        }
      },
      error => console.error(error)
    );
  }

  getTags() {
    this.tagsService.find().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.tagss = response.data;
          this.filteredTags.next(this.tagss.slice());
        }
      },
      error => console.error(error)
    );
  }

  selectCountriesRegion(event) {
    this.contentForm.get('country').setValue([]);
    if (event.value.length > 0) {
      for (let index = 0; index < event.value.length; index++) {
        const element = event.value[index];
        let result = this.regionss.find(region => region._id === element);
        const data = result.countries.map(count => count._id).concat(this.contentForm.get('country').value ? this.contentForm.get('country').value : [])
        this.contentForm
          .get("country")
          .patchValue(data);
      }
    }
  }

  getSubCategories(event, lang?) {
    this.subCategoriesService.findByCategory(event.value).subscribe(
      (response: any) => {
        if (response.status === 200) {
          const enTmpArr = [];
          const swTmpArr = [];
          const enCurrSelection = this.contentForm.controls.enSubCategories;
          const swCurrSelection = this.contentForm.controls.swSubCategories;


          response.data.forEach((sub) => {
            if (enCurrSelection.value.indexOf(sub._id) >= 0 && sub.language === this.enId) {
              enTmpArr.push(sub._id);
            }

            if (sub.language === this.enId) {
              this.englishSubCategorie.push(sub);
            }

            if (swCurrSelection.value.indexOf(sub._id) >= 0 && sub.language === this.swaId) {
              swTmpArr.push(sub._id);
            }

            if (sub.language === this.swaId) {
              this.swahiliSubCategorie.push(sub);
            }
          })

          this.contentForm.patchValue({ enSubCategories: enTmpArr });
          this.filteredEnglishSubCategories.next(this.englishSubCategorie);
          this.contentForm.patchValue({ swSubCategories: swTmpArr });
          this.filteredSwahiliSubCategories.next(this.swahiliSubCategorie);


        }
      },
      error => console.error(error)
    );
  }

  getEnglishSubCategories(event, lang?) {
    this.subCategoriesService.findByCategory(event.value).subscribe(
      (response: any) => {
        if (response.status === 200) {
          const enTmpArr = [];
          const enCurrSelection = this.contentForm.controls.enSubCategories;

          response.data.forEach((sub) => {
            if (enCurrSelection.value.indexOf(sub._id) >= 0 && sub.language === this.enId) {
              enTmpArr.push(sub._id);
            }

            if (sub.language === this.enId) {
              this.englishSubCategorie.push(sub);
            }
          })

          // if (lang == this.enId) {
          this.contentForm.patchValue({ enSubCategories: enTmpArr });
          this.filteredEnglishSubCategories.next(this.englishSubCategorie);


        }
      },
      error => console.error(error)
    );
  }

  getSwahiliSubCategories(event, lang?) {
    this.subCategoriesService.findByCategory(event.value).subscribe(
      (response: any) => {
        if (response.status === 200) {
          const swTmpArr = [];
          const swCurrSelection = this.contentForm.controls.swSubCategories;


          response.data.forEach((sub) => {

            if (swCurrSelection.value.indexOf(sub._id) >= 0 && sub.language === this.swaId) {
              swTmpArr.push(sub._id);
            }

            if (sub.language === this.swaId) {
              this.swahiliSubCategorie.push(sub);
            }
          })

          this.contentForm.patchValue({ swSubCategories: swTmpArr });
          this.filteredSwahiliSubCategories.next(this.swahiliSubCategorie);

        }
      },
      error => console.error(error)
    );
  }

  getPackages() {
    this.packageService.find().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.packages = response.data;
          this.filteredPackages.next(this.packages.slice());
        }
      },
      error => console.error(error)
    );
  }

  getChannels() {
    this.vodService.getChannels().subscribe(
      (response: any) => {
        this.channels = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getLanguages() {
    this.languageService.list().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.languages = response.data;
          this.swaId = this.languages.find((lang) => lang.abbreviation === 'sw')._id;
          this.enId = this.languages.find((lang) => lang.abbreviation === 'en')._id;
        }
      },
      error => console.error(error)
    );
  }

  getCountries() {
    this.countryService.list().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.countries = response.data;
          this.filteredCountries.next(this.countries.slice());
          this.filteredOriginCountry.next(this.countries.slice());
        }
      },
      error => console.error(error)
    );
  }

  getRegions() {
    this.countryService.regions().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.regionss = response.data;
          this.filteredCountries.next(this.countries.slice());
        }
      },
      error => console.error(error)
    );
  }

  getCDNLibrary() {
    this.cdnService.find().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.cdns = response.data;
          this.filteredCdns.next(this.cdns.slice());
        }
      },
      error => console.error(error)
    );
  }

  filterEnglishSubCategories() {
    if (!this.englishSubCategorie) return;

    let search: string = this.filterEnglishSubCategoryCtrl.value;
    if (!search) {
      this.filteredEnglishSubCategories.next(this.englishSubCategorie.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredEnglishSubCategories.next(
      this.englishSubCategorie.filter(
        sub => sub.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  filterSwahiliSubCategories() {
    if (!this.swahiliSubCategorie) return;

    let search: string = this.filterSwahiliSubCategoryCtrl.value;
    if (!search) {
      this.filteredSwahiliSubCategories.next(this.swahiliSubCategorie.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredSwahiliSubCategories.next(
      this.swahiliSubCategorie.filter(
        sub => sub.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  filterPackages() {
    if (!this.packages) return;

    let search: string = this.filterPackagesCtrl.value;
    if (!search) {
      this.filteredPackages.next(this.packages.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredPackages.next(
      this.packages.filter(
        pack => pack.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  filterTags() {
    if (!this.tagss) return;

    let search = this.filterTagsCtrl.value;
    if (!search) {
      this.filteredTags.next(this.tagss.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredTags.next(
      this.tagss.filter(cont =>
        cont.name ? cont.name.toLowerCase().indexOf(search) > -1 : ""
      )
    );
  }

  filterCdn() {
    if (!this.cdns) return;

    let search = this.filterCdnCtrl.value;
    if (!search) {
      this.filteredCdns.next(this.cdns.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCdns.next(
      this.cdns.filter(cont =>
        cont.name ? cont.name.toLowerCase().indexOf(search) > -1 : ""
      )
    );
  }

  filterRegion() {
    if (!this.countries) return;

    let search = this.filterRegionsCtrl.value;
    if (!search) {
      this.filteredRegions.next(this.regionss.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredRegions.next(
      this.regionss.filter(cont =>
        cont.name ? cont.name.toLowerCase().indexOf(search) > -1 : ""
      )
    );
  }

  filterCountry() {
    if (!this.countries) return;

    let search = this.filterCountryCtrl.value;
    if (!search) {
      this.filteredCountries.next(this.countries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCountries.next(
      this.countries.filter(cont =>
        cont.country ? cont.country.toLowerCase().indexOf(search) > -1 : ""
      )
    );
  }

  filterOriginCountry() {
    if (!this.countries) return;

    let search = this.filterOriginCountryCtrl.value;
    if (!search) {
      this.filteredOriginCountry.next(this.countries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredOriginCountry.next(
      this.countries.filter(cont =>
        cont.country ? cont.country.toLowerCase().indexOf(search) > -1 : ""
      )
    );
  }

  filterEnglishCategories() {
    if (!this.englishCategorys) return;

    let search: string = this.filterEnglishCategoriesCtrl.value;
    if (!search) {
      this.filteredEnglishCategories.next(this.englishCategorys.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredEnglishCategories.next(
      this.englishCategorys.filter(
        category => category.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  filterSwahiliCategories() {
    if (!this.swahiliCategorys) return;

    let search: string = this.filterSwahiliCategoriesCtrl.value;
    if (!search) {
      this.filteredSwahiliCategories.next(this.swahiliCategorys.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredSwahiliCategories.next(
      this.swahiliCategorys.filter(
        category => category.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  openDialog(i?) {
    const index = i;
    const dialogRef = this.dialog.open(AddSeasonsDialog, {
      width: "800px",
      data: String(index) !== "undefined" ? this.seasons[index] : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (String(index) !== "undefined") {
          this.seasons[index] = result;
        } else {
          this.seasons.push(result);
        }
      }
    });
  }

  openPriceDialog(i?) {
    const index = i;
    const dialogRef = this.dialog.open(AddPricesDialog, {
      width: "800px",
      data: String(index) !== "undefined" ? this.priceArray[index] : null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (String(index) !== "undefined") {
          this.priceArray[index] = result;
        } else {
          this.priceArray.push(result);
        }
      }
    });
  }

  openLinksDialog(i?) {
    const index = i;
    const dialogRef = this.dialog.open(AddNewLinks, {
      width: "800px",
      data: String(index) !== "undefined" ? this.links[index] : null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (String(index) !== "undefined") {
          this.links[index] = result;
        } else {
          this.links.push(result);
        }
      }
    });
  }

  openImagesDialog() {
    const dialogRef = this.dialog.open(AddMultipleImages, {
      width: "800px",
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.images = result;
      }
    });
  }

  removeImage(index) {
    if (confirm("Are you sure to remove this File?")) {
      this.images.splice(index, 1);
    }
  }

  removeSeason(index) {
    if (confirm("Are you sure to remove this Season?")) {
      this.seasons.splice(index, 1);
    }
  }

  removeLinks(index) {
    if (confirm("Are you sure to remove this Link?")) {
      this.links.splice(index, 1);
    }
  }

  back() {
    this.router.navigate(["home/content"]);
  }

  checkIfValueIsEmpty(data) {
    for (let key in data) {
      if (data[key] === "" || data[key] === null) {
        delete data[key];
      }
    }
    return data;
  }

  removePrice(index) {
    if (confirm("Are you sure to remove this price Object?")) {
      this.priceArray.splice(index, 1);
    }
  }

  initializeSeriesForm() {
    this.contentForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      tags: new FormControl("", [Validators.required]),
      releaseDate: new FormControl("", Validators.required),
      duration: new FormControl(),
      starring: new FormControl("", [Validators.required]),
      director: new FormControl("", [Validators.required]),
      enCategories: new FormControl("", [Validators.required]),
      swCategories: new FormControl("", [Validators.required]),
      region: new FormControl(""),
      country: new FormControl("", [Validators.required]),
      enSubCategories: new FormControl("", [Validators.required]),
      swSubCategories: new FormControl("", [Validators.required]),
      language: new FormControl("", [Validators.required]),
      isFree: new FormControl("", [Validators.required]),
      price: new FormGroup({
        price: new FormControl("", [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]),
        currency: new FormControl("", [Validators.required]),
        noOfDays: new FormControl("", [Validators.required])
      }),
      isFreeForAzam: new FormControl("", [Validators.required]),
      isSeries: new FormControl("true"),
      status: new FormControl("", [Validators.required]),
      boundingBox: new FormControl("", [Validators.required]),
      cdnID: new FormControl("", [Validators.required]),
      series: new FormControl([]),
      images: new FormControl([]),
      imageThumb: new FormControl("", [Validators.required]),
      packageID: new FormControl(''),
      createdBy: new FormControl("")
    });
  }

  initializeForm() {
    this.contentForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      tags: new FormControl("", [Validators.required]),

      enCategories: new FormControl("", [Validators.required]),
      swCategories: new FormControl("", [Validators.required]),
      enSubCategories: new FormControl("", [Validators.required]),
      swSubCategories: new FormControl("", [Validators.required]),
      isFree: new FormControl("", [Validators.required]),
      price: new FormGroup({
        price: new FormControl("", [Validators.required]),
        currency: new FormControl("", [Validators.required]),
        noOfDays: new FormControl("", [Validators.required])
      }),
      isFreeForAzam: new FormControl("", [Validators.required]),
      isSeries: new FormControl("false"),
      status: new FormControl("", [Validators.required]),
      series: new FormControl([]),
      images: new FormControl([]),
      imageThumb: new FormControl("", [Validators.required])
    });
  }

  initiliazeRadioForm() {
    this.contentForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      tags: new FormControl("", [Validators.required]),
      duration: new FormControl(),
      starring: new FormControl(""),
      director: new FormControl(""),
      enCategories: new FormControl("", [Validators.required]),
      swCategories: new FormControl("", [Validators.required]),
      region: new FormControl(""),
      country: new FormControl("", [Validators.required]),
      enSubCategories: new FormControl("", [Validators.required]),
      swSubCategories: new FormControl("", [Validators.required]),
      language: new FormControl([], [Validators.required]),
      isFree: new FormControl("", [Validators.required]),
      price: new FormGroup({
        price: new FormControl("", [Validators.required]),
        currency: new FormControl("", [Validators.required]),
        noOfDays: new FormControl("", [Validators.required])
      }),
      isFreeForAzam: new FormControl("", [Validators.required]),
      isSeries: new FormControl("false"),
      status: new FormControl("", [Validators.required]),
      boundingBox: new FormControl("", [Validators.required]),
      cdnID: new FormControl("", [Validators.required]),
      series: new FormControl([]),
      images: new FormControl([]),
      imageThumb: new FormControl(""),
      packageID: new FormControl(''),
      createdBy: new FormControl("")
    });
  }

  initializeNewsForm() {
    this.contentForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      tags: new FormControl("", [Validators.required]),
      region: new FormControl(""),
      country: new FormControl("", [Validators.required]),
      countryOrigin: new FormControl("", [Validators.required]),
      enCategories: new FormControl("", [Validators.required]),
      swCategories: new FormControl("", [Validators.required]),
      enSubCategories: new FormControl("", [Validators.required]),
      swSubCategories: new FormControl("", [Validators.required]),
      isFree: new FormControl("", [Validators.required]),
      isFreeForAzam: new FormControl("", [Validators.required]),
      isSeries: new FormControl("false"),
      status: new FormControl("", [Validators.required]),
      language: new FormControl("", [Validators.required]),
      links: new FormControl([], [Validators.required]),
      series: new FormControl([]),
      images: new FormControl([]),
      imageThumb: new FormControl("", [Validators.required])
    });
  }

  initializeVideoForm() {
    this.contentForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      tags: new FormControl("", [Validators.required]),
      releaseDate: new FormControl("", Validators.required),
      duration: new FormControl(""),
      starring: new FormControl(""),
      director: new FormControl(""),
      enCategories: new FormControl("", [Validators.required]),
      swCategories: new FormControl("", [Validators.required]),
      region: new FormControl(""),
      country: new FormControl("", [Validators.required]),
      enSubCategories: new FormControl("", [Validators.required]),
      swSubCategories: new FormControl("", [Validators.required]),
      language: new FormControl([], [Validators.required]),
      isFree: new FormControl("", [Validators.required]),
      price: new FormGroup({
        price: new FormControl("", [Validators.required]),
        currency: new FormControl("", [Validators.required]),
        noOfDays: new FormControl("", [Validators.required])
      }),
      isFreeForAzam: new FormControl("", [Validators.required]),
      isSeries: new FormControl("false"),
      isEpisode: new FormControl("false"),
      status: new FormControl("", [Validators.required]),
      boundingBox: new FormControl("", [Validators.required]),
      cdnID: new FormControl("", [Validators.required]),
      series: new FormControl([]),
      images: new FormControl([]),
      imageThumb: new FormControl(
        "https://s3.eu-west-1.amazonaws.com/com.azamtv2019/DOCUBOXHD-350x200-LOGOS-29b70b951bf81cc6045631f83c2868b0.jpg",
        [Validators.required]
      ),
      packageID: new FormControl(''),
      createdBy: new FormControl("")
    });
  }

  initializeLiveTVForm() {
    this.contentForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      tags: new FormControl("", [Validators.required]),
      releaseDate: new FormControl("", Validators.required),
      duration: new FormControl(""),
      starring: new FormControl(""),
      director: new FormControl(""),
      enCategories: new FormControl("", [Validators.required]),
      swCategories: new FormControl("", [Validators.required]),
      region: new FormControl(""),
      country: new FormControl("", [Validators.required]),
      referenceChannelID: new FormControl("", [Validators.required]),
      enSubCategories: new FormControl("", [Validators.required]),
      swSubCategories: new FormControl("", [Validators.required]),
      language: new FormControl([], [Validators.required]),
      isFree: new FormControl("", [Validators.required]),
      price: new FormGroup({
        price: new FormControl("", [Validators.required]),
        currency: new FormControl("", [Validators.required]),
        noOfDays: new FormControl("", [Validators.required])
      }),
      isFreeForAzam: new FormControl("", [Validators.required]),
      isSeries: new FormControl("false"),
      status: new FormControl("", [Validators.required]),
      boundingBox: new FormControl("", [Validators.required]),
      cdnID: new FormControl("", [Validators.required]),
      series: new FormControl([]),
      images: new FormControl([]),
      imageThumb: new FormControl("", [Validators.required]),
      packageID: new FormControl(''),
      createdBy: new FormControl("")
    });
  }

  getLanguageName(id) {
    let lang = this.languages.find((lang) => lang._id === id);
    return lang.name;
  }
}

@Component({
  selector: "dialog-content-type",
  templateUrl: "../dialog-content-add-season.html"
})
export class AddSeasonsDialog {
  seasonForm = new FormGroup({
    title: new FormControl(""),
    price: new FormControl(""),
    currency: new FormControl(""),
    noOfDays: new FormControl("")
  });
  episode: any[] = [];
  currencies: any[] = ['USD', 'TZS', 'KES', 'UGX', 'MWK', 'RWF', 'BIF'];
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
      });
      this.episode = data.episode;
    }
  }

  openAddSeasonsDialog() {
    const dialogRef = this.dialog.open(AddEpisodesDialog, {
      width: "800px",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.content.id = result.content._id;
        this.episode.push(result.content);
      }
    });
  }

  removeEpisode(index) {
    if (confirm("Are you sure to remove this Episode?")) {
      this.episode.splice(index, 1);
    }
  }

  getData() {
    let priceArray = [];
    priceArray.push({
      price: this.seasonForm.value.price,
      currency: this.seasonForm.value.currency,
      noOfDays: this.seasonForm.value.noOfDays
    });
    // this.seasonForm.value['episodes'] = this.episodes;
    let result = {
      title: this.seasonForm.value.title,
      price: priceArray,
      episode: this.episode
    };
    if (this.seasonEditObject !== null) {
      Object.assign(this.seasonEditObject, result);
      return this.seasonEditObject;
    } else {
      return result;
    }
  }
}

@Component({
  selector: "dialog-content-type",
  templateUrl: "../dialog-content-add-episodes.html"
})
export class AddEpisodesDialog {
  episodeForm = new FormGroup({
    content: new FormControl("", [Validators.required])
  });

  contents: any[] = [];

  getLanguages() {
    this.contentService.find("vod").subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.contents = response.data;
        }
      },
      error => console.error(error)
    );
  }

  constructor(
    public dialogRef: MatDialogRef<AddEpisodesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private contentService: VodService
  ) {
    this.getLanguages();
  }
}

@Component({
  selector: "dialog-content-type",
  templateUrl: "../dialog-content-add-images.html"
})
export class AddMultipleImages {
  images: string[] = [];
  isUploading: boolean = false;
  fileToUpload: any = null;

  constructor(
    public dialogRef: MatDialogRef<AddMultipleImages>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vodService: VodService
  ) { }

  handelImageChange(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      this.fileToUpload = files.item(index);
      this.fileToUpload.mimeType = this.fileToUpload.type;
      this.uploadFileToActivity();
    }
    // this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.isUploading = true;
    this.vodService.uploadUrl(this.fileToUpload).subscribe(
      (response: any) => {
        this.isUploading = false;
        if (response.status == 200 || response.success) {
          this.images.push(response.fileUrl);
        }
      },
      error => {
        this.isUploading = false;
      }
    );
  }

  removeImage(index) {
    if (confirm("Are you sure to remove this File?")) {
      this.images.splice(index, 1);
    }
  }
}

@Component({
  selector: "dialog-content-type",
  templateUrl: "../dialog-content-add-price.html"
})
export class AddPricesDialog {
  priceForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    price: new FormControl(""),
    currency: new FormControl(""),
    noOfDays: new FormControl("")
  });
  episode: any[] = [];
  currencies: any[] = ['USD', 'TZS', 'KES', 'UGX', 'MWK', 'RWF', 'BIF'];
  editPackageObject: Object = null;

  constructor(
    public dialogRef: MatDialogRef<AddPricesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialog: MatDialog
  ) {
    console.log(data);
    if (data) {
      this.editPackageObject = data;
      this.priceForm.setValue({
        title: data.title ? data.title : "",
        description: data.description ? data.description : "",
        currency: data.currency ? data.currency : "",
        noOfDays: data.noOfDays ? data.noOfDays : "",
        price: data.price ? data.price : ""
      });
      this.episode = data.episode;
    }
  }

  getData() {
    if (this.editPackageObject !== null) {
      return this.priceForm.value;
    } else {
      return this.priceForm.value;
    }
  }
}
@Component({
  selector: "dialog-news-links",
  templateUrl: "../dialog-news-add-links.html"
})
export class AddNewLinks {
  images: string = '';
  isUploading: boolean = false;
  fileToUpload: any = null;
  isDisabled: boolean = true;

  linksForm = new FormGroup({
    videoLink: new FormControl("", [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddNewLinks>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vodService: VodService,
  ) {
    if (data) {
      this.linksForm.setValue({
        videoLink: data.videoLink,
      });

      this.images = data.thumbnail
      this.isDisabled = false;
    }

  }

  handelImageChange(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      this.fileToUpload = files.item(index);
      this.fileToUpload.mimeType = this.fileToUpload.type;
      this.uploadFileToActivity();
    }
  }

  uploadFileToActivity() {
    this.isUploading = true;
    this.vodService.uploadUrl(this.fileToUpload).subscribe(
      (response: any) => {
        this.isUploading = false;
        if (response.status == 200 || response.success) {
          this.images = response.fileUrl;
        }
      },
      error => {
        this.isUploading = false;
      }
    );
  }

  removeImage() {
    if (confirm("Are you sure to remove this File?")) {
      this.images = '';
    }
  }

  getResult() {
    let str = this.getYoutubeCode(this.linksForm.value['videoLink'])
    return {
      videoLink: this.linksForm.value['videoLink'],
      thumbnail: this.images,
      code: str
    }
  }

  getYoutubeCode(link: string) {

    const codeString = link.split('?')[1];
    let code = null;
    if (codeString && codeString.split('&').length > 0) {
      let codes = codeString.split('&');
      codes.forEach((str) => {

        if (str.split('=')[0] === 'v') {

          code = str.split('=')[1];
        }
      });
    }

    return code;
  }

}

