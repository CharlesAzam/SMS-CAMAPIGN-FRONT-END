import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MobileTags } from '../../../models/mobile-tags';
import { MobileTagsService } from '../../../services/mobile-tags.service';
import { LanguageService } from 'src/app/services/language.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-news-tag',
  templateUrl: './mobileTagsFormComponent.html',
  styleUrls: ['./mobileTagsFormComponent.css']
})
export class MobileTagFormComponent implements OnInit {

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private tagService: MobileTagsService,
    private activatedRoute: ActivatedRoute
  ) { }

  tagModel: MobileTags

  tagForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required])
  })
  languages: any[] = [];
  types: string[] = ['RADIO', 'NEWS', 'TV GUIDE', 'VOD'];

  back() {
    this.router.navigate(['home/MobileTags']);
  }

  onSubmit() {
    if (this.tagModel) {

      Object.assign(this.tagModel, this.tagForm.value)
      this.tagService.update(this.tagModel)
        .subscribe(
          data => {
            if (data.status === 200)
              this.back();
          },
          error => {
            console.log("Error! ", error)
          });     
    } else {
      this.tagService.save(this.tagForm.value)
        .subscribe(
          data => {
            if (data.status === 200)
              this.back();
          },
          error => {
            console.log("Error! ", error)
          });
    }


  }

  ngOnInit() {
    this.getLanguages();
    this.activatedRoute.params.subscribe(params => {
      if (params.id === 'new') {

      } else {
        this.tagService.findById(params.id).subscribe((response) => {
          if (response.status === 200) {
            this.tagModel = response.data[0];
            this.tagForm.setValue({
              name: this.tagModel.name,
              type: this.tagModel.type,
              language: this.tagModel.language['_id']
            })
          }
        }, error => console.error(error));
      }
    });

  }

  getLanguages() {
    this.languageService.list().subscribe((response) => {
      if (response.status === 200) {
        this.languages = response.data;
      }
    },
      error => {
        console.log("Error! ", error)
      });
  }

}
