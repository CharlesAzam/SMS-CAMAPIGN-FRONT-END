import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from '../banner.service';
import { Banner } from '../banner';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { of, ReplaySubject, Subject } from 'rxjs';
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
    fileToUpload: any = null;
    isUploading: boolean = false;
    imageUrl: string = "";

    categorys: any[]
    subs: any[]
    types: string[] = [
        'package',
        'vod'
    ]
    content: any[] = [];

    filterCategoriesCtrl: FormControl = new FormControl();
    filterSubCategoryCtrl: FormControl = new FormControl();
    filterContentCtrl: FormControl = new FormControl();

    filteredCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    filteredSubCategories: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    filteredContent: ReplaySubject<any[]> = new ReplaySubject<any[]>();

    protected _onDestroy = new Subject<void>();



    bannerForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        subtitle: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        content: new FormControl('', [Validators.required]),
        priority: new FormControl('', [Validators.required]),
        categories: new FormControl('', [Validators.required]),
        subCategories: new FormControl('', [Validators.required]),
        image: new FormControl(''),
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
                        this.imageUrl = this.bannerModel.image;
                        this.bannerForm.setValue({
                            name: this.bannerModel.name ? this.bannerModel.name : '',
                            type: this.bannerModel.type ? this.bannerModel.type : '',
                            description: this.bannerModel.description ? this.bannerModel.description : '',
                            status: String(this.bannerModel.status) ? String(this.bannerModel.status) : '',
                            image: this.bannerModel.image ? this.bannerModel.image : '',
                            content: this.bannerModel.content ? this.bannerModel.content : '',
                            subtitle: this.bannerModel.subtitle ? this.bannerModel.subtitle : '',
                            priority: this.bannerModel.priority ? this.bannerModel.priority : '',
                            categories: this.bannerModel.categories._id ? this.bannerModel.categories._id : '',
                            subCategories: this.bannerModel.subCategories ? this.bannerModel.subCategories : ''
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

        this.filterContentCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterContent();
            })

        this.filterSubCategoryCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterSubCategories();
            })


    }

    filterCategories() {
        if (!this.categorys)
            return;

        let search: string = this.filterCategoriesCtrl.value;
        if (!search) {
            this.filteredCategories.next(this.categorys.slice())
        } else {
            search = search.toLowerCase();
        }

        this.filteredCategories.next(
            this.categorys.filter(category => category.name.toLowerCase().indexOf(search) > -1)
        )
    }

    filterSubCategories() {
        if (!this.subs)
            return;

        let search: string = this.filterSubCategoryCtrl.value;
        if (!search) {
            this.filteredSubCategories.next(this.subs.slice())
        } else {
            search = search.toLowerCase();
        }

        this.filteredSubCategories.next(
            this.subs.filter(sub => sub.name.toLowerCase().indexOf(search) > -1)
        )
    }

    filterContent() {
        if (!this.content)
            return;

        let search = this.filterContentCtrl.value;
        if (!search) {
            this.filteredContent.next(this.content.slice());
            return;
        } else {
            search = search.toLowerCase();
        }

        this.filteredContent.next(
            this.content.filter(cont =>
                cont.title ?
                    cont.title.toLowerCase().indexOf(search) > -1 :
                    ''
            )
        )
    }

    back() {
        this.router.navigate(['home/banner']);
    }

    handelImageChange(files: FileList) {
        this.fileToUpload = files.item(0);
        this.fileToUpload.mimeType = this.fileToUpload.type;
        this.uploadFileToActivity();
    }

    uploadFileToActivity() {
        this.isUploading = true;
        this.bannerService.uploadUrl(this.fileToUpload).subscribe((response: any) => {

            this.isUploading = false;
            if (response.status == 200 || response.success) {
                this.imageUrl = response.fileUrl;
            }
            else
                console.log(response)
        }, error => {
            this.isUploading = false;
            console.log("=======>", error);
        });
    }
    save() {
        if (this.imageUrl)
            this.bannerForm.value['image'] = this.imageUrl;

        if (this.bannerModel) {
            Object.assign(this.bannerModel, this.bannerForm.value);
            this.bannerService.update(this.bannerModel).subscribe((response: any) => {
                if (response.status === 200)
                    this.back();
            },
                error => console.error(error));


        } else {
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
                this.filteredCategories.next(this.categorys.slice());
            }
        },
            error => console.error(error))
    }

    getSubCategories() {
        this.subCategoryService.find().subscribe((response: any) => {
            console.log(response)
            if (response.status === 200) {
                this.subs = response.data;
                this.filteredSubCategories.next(this.subs.slice());
            }
        },
            error => console.error(error))
    }

    getContent() {
        this.contentService.find('vod').subscribe((response: any) => {
            if (response.status === 200) {
                this.content = response.data;
                this.filteredContent.next(this.content.slice());
            }
        },
            error => console.error(error))
    }
}