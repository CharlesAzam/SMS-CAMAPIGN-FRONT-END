import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MobileCategories } from '../../../models/mobile-categories';
import { SubCategoriesService } from 'src/app/services/sub.categories.service';
import { BannerService } from '../../banner/banner.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categories } from 'src/app/models/categories';
import { LanguageService } from 'src/app/services/language.service';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {


  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    banner: new FormControl(''),
    language: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    subCategories: new FormControl(''),
    priority: new FormControl('', [Validators.required]),
    isHome: new FormControl(true, [Validators.required]),
    status: new FormControl(true, [Validators.required])
  })

  languages: any[] = [];
  subCategories: any[] = []
  banners: any[] = []
  categoryModel: Categories
  types: string[]=[
    'RADIO',
    'NEWS',
    'TVGUIDE',
    'VOD'
  ]


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private subCategoryService: SubCategoriesService,
    private bannerService: BannerService,
    private categoryService: CategoriesService,
    private languageService: LanguageService) { }

  ngOnInit() {
    this.getSubCategories();
    this.getBanners();
    this.getLanguages()
    this.activatedRoute.params.subscribe(params => {
      if (params.id !== 'new') {
        this.categoryService.findById(params.id).subscribe((response: any) => {
          if (response.status === 200) {
            console.log(response.data)
            this.categoryModel = response.data[0];
            this.categoryForm.setValue({
              name: this.categoryModel.name ? this.categoryModel.name : '',
              banner: this.categoryModel.banner ? this.categoryModel.banner : '',
              language: this.categoryModel.language ? this.categoryModel.language : '',
              type: this.categoryModel.type ? this.categoryModel.type : '',
              icon: this.categoryModel.icon ? this.categoryModel.icon : '',
              subCategories: this.categoryModel.subCategories ? this.categoryModel.subCategories : [],
              priority: this.categoryModel.priority ? this.categoryModel.priority : '',
              isHome: this.categoryModel.isHome ? this.categoryModel.isHome : true,
              status: this.categoryModel.status ? this.categoryModel.status : true
            })
          }
        }, error => console.error(error));
      }
    });

  }

  getBanners() {
    this.bannerService.find().subscribe((response: any) => {
      if (response.status === 200) {
        this.banners = response.data
      }
    },
      error => console.error(error))
  }

  getSubCategories() {
    this.subCategoryService.find().subscribe((response: any) => {
      if (response.status === 200) {
        this.subCategories = response.data
      }
    },
      error => console.error(error))
  }

  //Route To category List
  routeToCategoryList() {
    this.router.navigate(['home/category']);
  }

  onSubmit() {
    console.log(this.categoryForm.value)
    if (this.categoryModel) {
      Object.assign(this.categoryModel, this.categoryForm.value)

      this.categoryService.update(this.categoryModel).subscribe((response: any) => {
        if (response.status === 200)
          this.routeToCategoryList()
        else
          console.log(response)
      },
        error => console.error(error))
    } else {
      this.categoryService.save(this.checkIfValueIsEmpty(this.categoryForm.value)).subscribe((response: any) => {
        if (response.status === 200)
          this.routeToCategoryList()
        else
          console.log(response)
      },
        error => console.error(error))
    }


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


  checkIfValueIsEmpty(data) {
    for (let key in data) {
      if (data[key] === "" || data[key] === null) {
        delete data[key];
      }
    }
    return data;
  }
}
