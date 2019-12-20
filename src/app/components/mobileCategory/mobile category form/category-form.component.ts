import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MobileCategories } from "../../../models/mobile-categories";
import { SubCategoriesService } from "src/app/services/sub.categories.service";
import { BannerService } from "../../banner/banner.service";
import { CategoriesService } from "src/app/services/categories.service";
import { Categories } from "src/app/models/categories";
import { LanguageService } from "src/app/services/language.service";
import { takeUntil, take } from "rxjs/operators";
import { Subject, ReplaySubject } from "rxjs";
@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.css"]
})
export class CategoryFormComponent implements OnInit, AfterViewInit {
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    // banner: new FormControl(''),
    language: new FormControl("", [Validators.required]),
    priority: new FormControl("", [Validators.required]),
    icon: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    // subCategories: new FormControl(''),
    isHome: new FormControl(true, [Validators.required]),
    isLeague: new FormControl(false, [Validators.required]),
    leagueType: new FormControl(""),
    imageThumb: new FormControl(""),
    leagueTypeImageThumb: new FormControl(""),
    status: new FormControl(true, [Validators.required])
  });

  filterTypesCtrl: FormControl = new FormControl();
  filterLanguageCtrl: FormControl = new FormControl();

  filteredTypes: ReplaySubject<String[]> = new ReplaySubject<String[]>();
  filteredLanguages: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  protected _onDestroy = new Subject<void>();

  languages: any[] = [];
  subCategories: any[] = [];
  banners: any[] = [];
  categoryModel: Categories;
  isUploading_leagueTypeImageThumb: boolean = false;
  isUploading_imageThumb: boolean = false;
  fileToUpload: any = null;
  uploadImageURL: any = {};
  types: string[] = ["RADIO", "NEWS", "TVGUIDE", "VOD"];
  icons: any[] = [
    { key: "ic_home", value: "HOME" },
    { key: "ic_movie", value: "MOVIES" },
    { key: "ic_sport", value: "SPORTS" },
    { key: "ic_livetv", value: "LIVETV" },
    { key: "ic_more", value: "MORE" }
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subCategoryService: SubCategoriesService,
    private bannerService: BannerService,
    private categoryService: CategoriesService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    // this.getSubCategories();
    // this.getBanners();
    this.getLanguages();

    this.activatedRoute.params.subscribe(params => {
      if (params.id !== "new") {
        this.categoryService.findById(params.id).subscribe(
          (response: any) => {
            if (response.status === 200) {
              console.log(response.data);
              this.categoryModel = response.data[0];
              this.uploadImageURL[
                "leagueTypeImageThumb"
              ] = this.categoryModel.leagueTypeImageThumb;
              this.uploadImageURL["imageThumb"] = this.categoryModel.imageThumb;
              this.categoryForm.setValue({
                name: this.categoryModel.name ? this.categoryModel.name : "",
                language: this.categoryModel.language
                  ? this.categoryModel.language
                  : "",
                type: this.categoryModel.type ? this.categoryModel.type : "",
                icon: this.categoryModel.icon ? this.categoryModel.icon : "",
                priority: this.categoryModel.priority
                  ? this.categoryModel.priority
                  : "",
                isHome: String(this.categoryModel.isHome)
                  ? String(this.categoryModel.isHome)
                  : "",
                status: String(this.categoryModel.status)
                  ? String(this.categoryModel.status)
                  : "",

                isLeague: String(this.categoryModel.isLeague)
                  ? String(this.categoryModel.isLeague)
                  : false,

                leagueType: String(this.categoryModel.leagueType)
                  ? String(this.categoryModel.leagueType)
                  : "",
                imageThumb: this.categoryModel.imageThumb
                  ? this.categoryModel.imageThumb
                  : "",
                leagueTypeImageThumb: this.categoryModel.leagueTypeImageThumb
                  ? this.categoryModel.leagueTypeImageThumb
                  : ""
              });
            }
          },
          error => console.error(error)
        );
      }
    });

    this.filteredTypes.next(this.types.slice());

    this.filterTypesCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterTypes();
      });

    this.filterLanguageCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterLanguages();
      });
  }

  ngAfterViewInit() {}

  filterTypes() {
    if (!this.types) return;

    let search = this.filterTypesCtrl.value;
    if (!search) {
      this.filteredTypes.next(this.types.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredTypes.next(
      this.types.filter(type => type.toLowerCase().indexOf(search) > -1)
    );
  }

  filterLanguages() {
    if (!this.languages) return;

    let search = this.filterLanguageCtrl.value;
    if (!search) {
      this.filteredLanguages.next(this.languages.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredLanguages.next(
      this.languages.filter(
        language => language.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  getBanners() {
    this.bannerService.find().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.banners = response.data;
        }
      },
      error => console.error(error)
    );
  }

  getSubCategories() {
    this.subCategoryService.find().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.subCategories = response.data;
        }
      },
      error => console.error(error)
    );
  }

  //Route To category List
  routeToCategoryList() {
    this.router.navigate(["home/category"]);
  }

  onSubmit() {
    if (this.uploadImageURL["leagueTypeImageThumb"]) {
      this.categoryForm.value["leagueTypeImageThumb"] = this.uploadImageURL[
        "leagueTypeImageThumb"
      ];
    }
    if (this.uploadImageURL["imageThumb"]) {
      this.categoryForm.value["imageThumb"] = this.uploadImageURL["imageThumb"];
    }
    if (this.categoryModel) {
      Object.assign(this.categoryModel, this.categoryForm.value);
      this.categoryService.update(this.categoryModel).subscribe(
        (response: any) => {
          if (response.status === 200) this.routeToCategoryList();
          else console.log(response);
        },
        error => console.error(error)
      );
    } else {
      this.categoryService
        .save(this.checkIfValueIsEmpty(this.categoryForm.value))
        .subscribe(
          (response: any) => {
            if (response.status === 200) this.routeToCategoryList();
            else console.log(response);
          },
          error => console.error(error)
        );
    }
  }

  getLanguages() {
    this.languageService.list().subscribe(
      response => {
        if (response.status === 200) {
          this.languages = response.data;
          this.filteredLanguages.next(this.languages.slice());
        }
      },
      error => {
        console.log("Error! ", error);
      }
    );
  }
  handelImageChange(files: FileList, controlName: string) {
    this.fileToUpload = files.item(0);
    this.fileToUpload.mimeType = this.fileToUpload.type;
    this.uploadFileToActivity(controlName);
  }

  uploadFileToActivity(controlName: any) {
    if (controlName === "imageThumb") {
      this.isUploading_imageThumb = true;
    } else if (controlName === "leagueTypeImageThumb") {
      this.isUploading_leagueTypeImageThumb = true;
    }

    this.categoryService.uploadUrl(this.fileToUpload).subscribe(
      data => {
        this.uploadImageURL[controlName] = data["fileUrl"]; // ? data.fileUrl : "";
        if (controlName === "imageThumb") {
          this.isUploading_imageThumb = false;
        } else if (controlName === "leagueTypeImageThumb") {
          this.isUploading_leagueTypeImageThumb = false;
        }
      },
      error => {
        if (controlName === "imageThumb") {
          this.isUploading_imageThumb = false;
        } else if (controlName === "leagueTypeImageThumb") {
          this.isUploading_leagueTypeImageThumb = false;
        }
      }
    );
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
