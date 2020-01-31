import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub.categories.service';
import { SubCategory } from 'src/app/models/sub.categories';
import { LanguageService } from 'src/app/services/language.service';
import { VodService } from '../../vod/vod.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-mobile-sub-categories-form',
  templateUrl: './mobile-sub-categories-form.component.html',
  styleUrls: ['./mobile-sub-categories-form.component.css']
})
export class MobileSubCategoriesFormComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoriesService,
    private subCategoryService: SubCategoriesService,
    private languageService: LanguageService,
    private contentService: VodService) { }

  languages: any[] = []
  categories: any[] = []
  boxes: any[] = [
    'VERTICAL_CARD',
    'HORIZONTAL_CARD',
    'BANNER',
    'LOGO'
  ]

  types: any[] = [
    'short',
    'big'
  ]

  filterCategoriesCtrl: FormControl = new FormControl();

  filteredCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  protected _onDestroy = new Subject<void>();



  subCategoryModel: SubCategory
  showType: boolean = false;
  subCategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl(),
    content: new FormControl(),
    boundingBox: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    parentCatID: new FormControl('', [Validators.required])
  })
  contents: any[] = []

  ngOnInit() {
    this.getCategories();
    this.getLanguages();
    this.getContents()
    this.activatedRoute.params.subscribe(params => {
      if (params.id !== 'new') {
        this.subCategoryService.findById(params.id).subscribe((response: any) => {
          if (response.status === 200) {
            this.subCategoryModel = response.data;
            this.subCategoryForm.setValue({
              name: this.subCategoryModel.name ? this.subCategoryModel.name : '',
              type: this.subCategoryModel.type ? this.subCategoryModel.type : '',
              content: this.subCategoryModel.content ? this.subCategoryModel.content : '',
              status: String(this.subCategoryModel.status) ? String(this.subCategoryModel.status) : '',
              boundingBox: this.subCategoryModel.boundingBox ? this.subCategoryModel.boundingBox : '',
              priority: this.subCategoryModel.priority ? this.subCategoryModel.priority : '',
              language: this.subCategoryModel.language ? this.subCategoryModel.language : '',
              parentCatID: this.subCategoryModel.parentCatID._id ? this.subCategoryModel.parentCatID._id : ''
            })
          }
        }, error => console.error(error));
      }
    });

    this.filterCategoriesCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCategories();
      })

  }

  isTypeVisible() {
    if (this.subCategoryForm.get('parentCatID').value !== '' && this.subCategoryForm.get('parentCatID').value !== undefined) {

      if (this.categories.filter((category) => category._id === this.subCategoryForm.get('parentCatID').value ? category.name : '')[0] === 'news') {
        return true;
      } else {
        return false
      }

    } else
      return false
  }

  uploadImage() {
    //Upload to S3
  }

  getCategories() {
    this.categoryService.find().subscribe((result: any) => {
      if (result.status == 200) {
        this.categories = result.data;
        this.filteredCategories.next(this.categories.slice());

      }
    })
  }

  filterCategories() {
    if (!this.categories)
      return;

    let search: string = this.filterCategoriesCtrl.value;
    if (!search) {
      this.filteredCategories.next(this.categories.slice())
    } else {
      search = search.toLowerCase();
    }

    this.filteredCategories.next(
      this.categories.filter(category => category.name.toLowerCase().indexOf(search) > -1)
    )
  }

  back() {
    this.router.navigate(['home/subCategory']);
  }

  submit() {
    if (this.subCategoryModel) {
      Object.assign(this.subCategoryModel, this.subCategoryForm.value);
      this.subCategoryService.update(this.subCategoryModel).subscribe((response: any) => {
        if (response.status === 200)
          this.back();
      });
    } else {
      this.subCategoryForm.value['image'] = "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg"
      this.subCategoryService.save(this.checkIfValueIsEmpty(this.subCategoryForm.value)).subscribe((response: any) => {
        if (response.status === 200) {
          this.back();
        }
      },
        error => console.log(error))
    }

  }

  getContents() {
    this.contentService.find('vod').subscribe((response: any) => {
      if (response.status === 200) {
        this.contents = response.data
      }
    },
      error => console.error(error));
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
