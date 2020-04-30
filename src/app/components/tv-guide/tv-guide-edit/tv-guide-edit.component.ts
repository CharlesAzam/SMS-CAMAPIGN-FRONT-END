import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GuideService } from "../tv-guide.service";
import { Guide } from "../tv-guide";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { of, ReplaySubject, Subject } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoriesService } from "src/app/services/categories.service";
import { SubCategoriesService } from "src/app/services/sub.categories.service";
import { VodService } from "../../vod/vod.service";

@Component({
  selector: "tv-guide-edit",
  templateUrl: "./tv-guide-edit.component.html",
})
export class GuideEditComponent implements OnInit {
  id: string;
  guideModel: Guide;
  errors: string;
  fileToUpload: any = null;
  isUploading: boolean = false;
  imageUrl: string = "";

  categorys: any[];
  subs: any[];
  types: string[] = ["package", "vod"];
  type = "vod";
  content: any[] = [];

  filterCategoriesCtrl: FormControl = new FormControl();
  filterSubCategoryCtrl: FormControl = new FormControl();
  filterContentCtrl: FormControl = new FormControl();

  filteredCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredSubCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredContent: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  protected _onDestroy = new Subject<void>();

  guideForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    subtitle: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    content: new FormControl(""),
    priority: new FormControl("", [Validators.required]),
    URL: new FormControl(""),
    categories: new FormControl("", [Validators.required]),
    //  subCategories: new FormControl('', [Validators.required]),
    image: new FormControl(""),
    status: new FormControl("", [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private guideService: GuideService,
    private categoryService: CategoriesService,
    private subCategoryService: SubCategoriesService,
    private contentService: VodService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getSubCategories();
    this.getContent();

    this.route.params.subscribe((params) => {
      if (params.id !== "new") {
        this.guideService.findById(params.id).subscribe(
          (response: any) => {
            if (response.status === 200) {
              this.guideModel = response.data[0];
              this.type = this.guideModel.type ? this.guideModel.type : "";
              this.imageUrl = this.guideModel.image;
              this.guideForm.setValue({
                name: this.guideModel.name ? this.guideModel.name : "",
                type: this.guideModel.type ? this.guideModel.type : "",
                description: this.guideModel.description
                  ? this.guideModel.description
                  : "",
                status: String(this.guideModel.status)
                  ? String(this.guideModel.status)
                  : "",
                image: this.guideModel.image ? this.guideModel.image : "",
                content: this.guideModel.content ? this.guideModel.content : "",
                subtitle: this.guideModel.subtitle
                  ? this.guideModel.subtitle
                  : "",
                priority: this.guideModel.priority
                  ? this.guideModel.priority
                  : "",
                URL: this.guideModel.URL ? this.guideModel.URL : "",
                categories: this.guideModel.categories._id
                  ? this.guideModel.categories._id
                  : "",
                /* subCategories: this.bannerModel.subCategories
                  ? this.bannerModel.subCategories
                  : "" */
              });
            }
          },
          (error) => console.error(error)
        );
      }
    });

    this.filterCategoriesCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCategories();
      });

    this.filterContentCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterContent();
      });

    this.filterSubCategoryCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSubCategories();
      });
  }

  getTypeOfGuide(event) {
    if (event.value === "vod") {
      this.guideForm.get("content").setValidators([Validators.required]);
      this.guideForm.get("URL").setValidators([]);
    } else {
      this.guideForm.get("content").setValidators([]);
      this.guideForm.get("URL").setValidators([Validators.required]);
    }
    this.guideForm.get("content").updateValueAndValidity();
    this.guideForm.get("URL").updateValueAndValidity();
    this.type = event.value;
  }
  filterCategories() {
    if (!this.categorys) return;

    let search: string = this.filterCategoriesCtrl.value;
    if (!search) {
      this.filteredCategories.next(this.categorys.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredCategories.next(
      this.categorys.filter(
        (category) => category.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  filterSubCategories() {
    if (!this.subs) return;

    let search: string = this.filterSubCategoryCtrl.value;
    if (!search) {
      this.filteredSubCategories.next(this.subs.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredSubCategories.next(
      this.subs.filter((sub) => sub.name.toLowerCase().indexOf(search) > -1)
    );
  }

  filterContent() {
    if (!this.content) return;

    let search = this.filterContentCtrl.value;
    if (!search) {
      this.filteredContent.next(this.content.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredContent.next(
      this.content.filter((cont) =>
        cont.title ? cont.title.toLowerCase().indexOf(search) > -1 : ""
      )
    );
  }

  back() {
    this.router.navigate(["home/tv-guide"]);
  }

  handelImageChange(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileToUpload.mimeType = this.fileToUpload.type;
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this.isUploading = true;
    this.guideService.uploadUrl(this.fileToUpload).subscribe(
      (response: any) => {
        this.isUploading = false;
        if (response.status == 200 || response.success) {
          this.imageUrl = response.fileUrl;
        } else console.log(response);
      },
      (error) => {
        this.isUploading = false;
      }
    );
  }
  save() {
    if (this.imageUrl) this.guideForm.value["image"] = this.imageUrl;
    if (this.guideModel) {
      Object.assign(this.guideModel, this.guideForm.value);
      this.guideService.update(this.guideModel).subscribe(
        (response: any) => {
          if (response.status === 200) this.back();
        },
        (error) => console.error(error)
      );
    } else {
      this.guideService.save(this.guideForm.value).subscribe(
        (guide) => {
          this.guideModel = guide;

          this.errors = "Save was successful!";
          this.back();
        },
        (err) => {
          this.errors = "Error saving";
        }
      );
    }
  }

  getCategories() {
    this.categoryService.find().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.categorys = response.data;
          this.filteredCategories.next(this.categorys.slice());
        }
      },
      (error) => console.error(error)
    );
  }

  getSubCategories() {
    this.subCategoryService.find().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.subs = response.data;
          this.filteredSubCategories.next(this.subs.slice());
        }
      },
      (error) => console.error(error)
    );
  }

  getContent() {
    this.contentService.find("vod").subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.content = response.data;
          this.filteredContent.next(this.content.slice());
        }
      },
      (error) => console.error(error)
    );
  }
}
