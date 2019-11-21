import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from '../banner.service';
import { Banner } from '../banner';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub.categories.service';
import { VodService } from '../../vod/vod.service';

@Component({
    selector: 'banner-edit',
    templateUrl: './banner-edit.component.html'
})
export class BannerEditComponent implements OnInit {

    id: string;
    bannerModel: Banner;
    errors: string;

    categorys: any[]
    subs: any[]
    types: string[] = [
        'package',
        'vod'
    ]
    content: any[] = []


    bannerForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        subtitle: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        content: new FormControl('', [Validators.required]),
        priority: new FormControl('', [Validators.required]),
        categories: new FormControl('', [Validators.required]),
        subCategories: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required])
    })


    constructor(
        private route: ActivatedRoute,
        private bannerService: BannerService,
        private categoryService: CategoriesService,
        private subCategoryService: SubCategoriesService,
        private contentService: VodService,
        private router: Router) {
    }

    ngOnInit() {
        this.getCategories();
        this.getSubCategories()
        this.getContent();

        this.route.params.subscribe(params => {
            if (params.id !== 'new') {
                this.bannerService.findById(params.id).subscribe((response: any) => {
                    if (response.status === 200) {
                        // console.log(response.data)
                        this.bannerModel = response.data[0];
                        console.log(this.bannerModel)
                        this.bannerForm.setValue({
                            name: this.bannerModel.name ? this.bannerModel.name : '',
                            type: this.bannerModel.type ? this.bannerModel.type : '',
                            description: this.bannerModel.description ? this.bannerModel.description : '',
                            status: this.bannerModel.status ? this.bannerModel.status : '',
                            image: this.bannerModel.image ? this.bannerModel.image : '',
                            content: this.bannerModel.content ? this.bannerModel.content : '',
                            subtitle: this.bannerModel.subtitle ? this.bannerModel.subtitle : '',
                            priority: this.bannerModel.priority ? this.bannerModel.priority : '',
                            categories: this.bannerModel.categories ? this.bannerModel.categories['_id'] : '',
                            subCategories: this.bannerModel.subCategories ? this.bannerModel.subCategories['_id'] : ''
                        })
                    }
                }, error => console.error(error));
            }
        });
    }

    back() {
        this.router.navigate(['home/banner']);
    }
    save() {
        if (this.bannerModel) {
            Object.assign(this.bannerModel, this.bannerForm.value);
            this.bannerService.update(this.bannerModel).subscribe((response: any) => {
                if (response.status === 200)
                    this.back();
            },
                error => console.error(error));


        } else {
            this.bannerForm.value['image'] = 'https://korbanglafoodsolution.files.wordpress.com/2017/03/background-indomie-header4.png';
            this.bannerService.save(this.bannerForm.value).subscribe(
                banner => {
                    this.bannerModel = banner;

                    this.errors = 'Save was successful!';
                    this.back()
                },
                err => {
                    this.errors = 'Error saving';
                }
            );
        }

    }

    getCategories() {
        this.categoryService.find().subscribe((response: any) => {
            console.log(response)
            if (response.status === 200) {
                this.categorys = response.data;
            }
        },
            error => console.error(error))
    }

    getSubCategories() {
        this.subCategoryService.find().subscribe((response: any) => {
            console.log(response)
            if (response.status === 200) {
                this.subs = response.data;
            }
        },
            error => console.error(error))
    }

    getContent() {
        this.contentService.find('vod').subscribe((response: any) => {
            if (response.status === 200) {
                this.content = response.data;
            }
        },
            error => console.error(error))
    }
}