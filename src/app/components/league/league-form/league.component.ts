import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { League } from "../../../models/league-model";
import { SubCategoriesService } from "src/app/services/sub.categories.service";
import { BannerService } from "../../banner/banner.service";
import { CategoriesService } from "src/app/services/categories.service";
import { LeagueService } from "src/app/services/league.service";
import { Categories } from "src/app/models/categories";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-league",
  templateUrl: "./league.component.html",
  styleUrls: ["./league.component.css"]
})
export class LeagueComponent implements OnInit {
  leagueForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    language: new FormControl("", [Validators.required]),
    leagueTypeImageThumb: new FormControl([Validators.required]),
    imageThumb: new FormControl( [Validators.required]),
    type: new FormControl("", [Validators.required]),
    priority: new FormControl("", [Validators.required]),
    isHome: new FormControl([Validators.required]),
    status: new FormControl("", [Validators.required])
  });

  languages: any[] = [];
  leagueModel: League;
  fileToUpload: any = null;
  isUploading: boolean = false;
  imageUrl: string = "";
  imageThumbUrl: string
  imageLeagueThumb: string

  types: string[] = ["RADIO", "NEWS", "TVGUIDE", "VOD"];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private leagueService: LeagueService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.getLanguages();
    this.activatedRoute.params.subscribe(params => {
      if (params.id !== "new") {
        this.leagueService.findById(params.id).subscribe(
          (response: any) => {
            if (response.status === 200) {
              this.leagueModel = response.data[0];
              this.imageLeagueThumb = this.leagueModel.leagueTypeImageThumb;
              this.imageThumbUrl = this.leagueModel.imageThumb;
              this.leagueForm.setValue({
                name: this.leagueModel.name ? this.leagueModel.name : "",

                language: this.leagueModel.language
                  ? this.leagueModel.language
                  : "",
                  type: this.leagueModel.leagueType ? this.leagueModel.leagueType : "",
                leagueTypeImageThumb: this.leagueModel.leagueTypeImageThumb
                  ? ''
                  : "",
                imageThumb: this.leagueModel.imageThumb
                  ? ''
                  : "",

                priority: this.leagueModel.priority
                  ? this.leagueModel.priority
                  : "",
                isHome: String(this.leagueModel.isHome) ? String(this.leagueModel.isHome) : '',
                status: String(this.leagueModel.status) ? String(this.leagueModel.status) : ''
              });
            }
          },
          error => console.error(error)
        );
      }
    });
  }

  //Route To category List
  routeToCategoryList() {
    this.router.navigate(["home/category"]);
  }

  handelImageChange(files: FileList, type) {
    this.fileToUpload = files.item(0);
    this.fileToUpload.mimeType = this.fileToUpload.type;
    this.uploadFileToActivity(type);
  }

  uploadFileToActivity(type) {
    this.isUploading = true;
    this.leagueService.uploadUrl(this.fileToUpload).subscribe((response: any) => {

      this.isUploading = false;
      if (response.status == 200 || response.success) {
        if (type === 'thumb')
          this.imageThumbUrl = response.fileUrl;
        else
          this.imageLeagueThumb = response.fileUrl
      }
      else
        console.log(response)
    }, error => {
      this.isUploading = false;
      console.log("=======>", error);
    });
  }

  onSubmit() {
    if (this.leagueModel) {
      if (this.imageLeagueThumb) {
        this.leagueForm.value['leagueTypeImageThumb'] = this.imageLeagueThumb;
      }

      if (this.imageThumbUrl) {
        this.leagueForm.value['imageThumb'] = this.imageThumbUrl;
      }
      Object.assign(this.leagueModel, this.leagueForm.value);
      this.leagueService.update(this.leagueModel).subscribe(
        (response: any) => {
          if (response.status === 200)
            this.router.navigate(["home/LeagueList"]);
          else console.log(response);
        },
        error => console.error(error)
      );
    } else {
      if (this.imageLeagueThumb) {
        this.leagueForm.value['leagueTypeImageThumb'] = this.imageLeagueThumb;
      }

      if (this.imageThumbUrl) {
        this.leagueForm.value['imageThumb'] = this.imageThumbUrl;
      }
      this.leagueService
        .save(this.checkIfValueIsEmpty(this.leagueForm.value))
        .subscribe(
          (response: any) => {
            if (response.status === 200)
              this.router.navigate(["home/LeagueList"]);
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
        }
      },
      error => {
        console.log("Error! ", error);
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
