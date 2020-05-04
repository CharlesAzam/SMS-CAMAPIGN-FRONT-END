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
    channel: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required]),
    date_time_in_gmt: new FormControl("", [Validators.required]),
    end_date_time_in_gmt: new FormControl(""),
    duration: new FormControl("", [Validators.required]),
    name: new FormControl(""),
    synopsis: new FormControl("", [Validators.required]),
    //  subCategories: new FormControl('', [Validators.required]),
    image: new FormControl(""),
    type: new FormControl("", [Validators.required]),
    laligalive: new FormControl("", [Validators.required]),
    tags: new FormControl("", [Validators.required]),
    program_type: new FormControl("", [Validators.required]),
    re_run: new FormControl("", [Validators.required]),
    re_run_date_time_gmt: new FormControl("", [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private guideService: GuideService,
    // private categoryService: CategoriesService,
    // private subCategoryService: SubCategoriesService,
    // private contentService: VodService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.getCategories();
    // this.getSubCategories();
    // this.getContent();

    this.route.params.subscribe((params) => {
      if (params.id !== "new") {
        this.guideService.findById(params.id).subscribe(
          (response: any) => {
            if (response.status === 200) {
              this.guideModel = response.data[0];
              console.log("this.guidemOdel", this.guideModel);
              this.type = this.guideModel.type ? this.guideModel.type : "";
              this.imageUrl = this.guideModel.image;
              this.guideForm.setValue({
                name: this.guideModel.name ? this.guideModel.name : "",
                type: this.guideModel.type ? this.guideModel.type : "",
                channel: this.guideModel.channel ? this.guideModel.channel : "",
                date: String(this.guideModel.date)
                  ? String(this.guideModel.date)
                  : "",
                image: this.guideModel.image ? this.guideModel.image : "",
                time: this.guideModel.time ? this.guideModel.time : "",
                date_time_in_gmt: this.guideModel.date_time_in_gmt
                  ? this.guideModel.date_time_in_gmt
                  : "",
                end_date_time_in_gmt: this.guideModel.end_date_time_in_gmt
                  ? this.guideModel.end_date_time_in_gmt
                  : "",
                synopsis: this.guideModel.synopsis
                  ? this.guideModel.synopsis
                  : "",
                laligalive: this.guideModel.laligalive
                  ? this.guideModel.laligalive
                  : "",
                tags: this.guideModel.tags ? this.guideModel.tags : "",
                program_type: this.guideModel.program_type
                  ? this.guideModel.program_type
                  : "",
                re_run: this.guideModel.re_run ? this.guideModel.re_run : "",
                re_run_date_time_gmt: this.guideModel.re_run_date_time_gmt
                  ? this.guideModel.re_run_date_time_gmt
                  : "",
                duration: this.guideModel.duration
                  ? this.guideModel.duration
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
}
