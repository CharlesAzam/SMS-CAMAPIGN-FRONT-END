import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub.categories.service';
import { SubCategory } from 'src/app/models/sub.categories';
@Component({
  selector: 'app-mobile-sub-categories-form',
  templateUrl: './mobile-sub-categories-form.component.html',
  styleUrls: ['./mobile-sub-categories-form.component.css']
})
export class MobileSubCategoriesFormComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoriesService,
    private subCategoryService: SubCategoriesService) { }

  languages: string[] = ["en", 'sw'];
  categories: any[] = []
  boxes: any[] = [
    'VERTICAL_CARD',
    'HORIZONTAL_CARD'
  ]
  subCategoryModel: SubCategory

  subCategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    boundingBox: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    parentCatID: new FormControl('', [Validators.required])
  })

  ngOnInit() {
    this.getCategories();
    this.activatedRoute.params.subscribe(params => {
      if (params.id !== 'new') {
        this.subCategoryService.findById(params.id).subscribe((response: any) => {
          if (response.status === 200) {
            console.log(response.data)
            this.subCategoryModel = response.data[0];
            this.subCategoryForm.setValue({
              name: this.subCategoryModel.name ? this.subCategoryModel.name : '',
              type: this.subCategoryModel.type ? this.subCategoryModel.type : '',
              status: this.subCategoryModel.status ? this.subCategoryModel.status : '',
              image: this.subCategoryModel.image ? this.subCategoryModel.image : '',
              boundingBox: this.subCategoryModel.boundingBox ? this.subCategoryModel.boundingBox : '',
              priority: this.subCategoryModel.priority ? this.subCategoryModel.priority : '',
              language: this.subCategoryModel.language ? this.subCategoryModel.language : '',
              parentCatID: this.subCategoryModel.parentCatID ? this.subCategoryModel.parentCatID : ''
            })
          }
        }, error => console.error(error));
      }
    });
  }

  uploadImage() {
    //Upload to S3
  }

  getCategories() {
    this.categoryService.find().subscribe((result: any) => {
      if (result.status == 200) {
        this.categories = result.data;
      }
    })
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
    }
    this.subCategoryForm.value['image'] = "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg"
    this.subCategoryService.save(this.subCategoryForm.value).subscribe((response: any) => {
      if (response.status === 200) {
        this.back();
      }
    },
      error => console.log(error))
  }

}
