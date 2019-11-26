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
    imageThumb: new FormControl([Validators.required]),
    type: new FormControl("", [Validators.required]),
    priority: new FormControl("", [Validators.required]),
    isHome: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required])
  });

  languages: any[] = [];
  leagueModel: League;
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
              console.log(this.leagueModel.isHome)
              this.leagueForm.setValue({
                name: this.leagueModel.name ? this.leagueModel.name : "",

                language: this.leagueModel.language
                  ? this.leagueModel.language
                  : "",
                type: this.leagueModel.type ? this.leagueModel.type : "",
                imageThumb: this.leagueModel.imageThumb
                  ? this.leagueModel.imageThumb
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

  onSubmit() {
    if (this.leagueModel) {
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
