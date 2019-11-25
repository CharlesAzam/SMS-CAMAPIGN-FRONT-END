import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramService } from '../program.service';
import { Program } from '../program';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub.categories.service';
import { VodService } from '../../vod/vod.service';

@Component({
    selector: 'program-edit',
    templateUrl: './program-edit.component.html'
})
export class ProgramEditComponent implements OnInit {

    id: string;
    programModel: Program;
    errors: string;
    fileToUpload: any = null;

    categorys: any[]
    subs: any[]
    types: string[] = [
        'package',
        'vod'
    ]
    content: any[] = []


    programForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        dateTimeInGMT: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        contents: new FormControl('', [Validators.required]),
        laligalive: new FormControl('', [Validators.required]),
        tags: new FormControl('', [Validators.required]),
        programType: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
        time: new FormControl('', [Validators.required]),
        duration: new FormControl('', [Validators.required])
    })


    constructor(
        private route: ActivatedRoute,
        private programService: ProgramService,
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
                this.programService.findById(params.id).subscribe((response: any) => {
                    if (response.status === 200) {
                        // console.log(response.data)
                        this.programModel = response.data[0];
                        console.log(this.programModel)
                        this.programForm.setValue({
                            title: this.programModel.title ? this.programModel.title : '',
                            type: this.programModel.type ? this.programModel.type : '',
                            description: this.programModel.description ? this.programModel.description : '',
                            time: this.programModel.time ? this.programModel.time : '',
                            image: this.programModel.image ? this.programModel.image : '',
                            contents: this.programModel.contents ? this.programModel.contents : '',
                            date: this.programModel.date ? this.programModel.date : '',
                            dateTimeInGMT: this.programModel.dateTimeInGMT ? this.programModel.dateTimeInGMT : '',
                            laligalive: this.programModel.laligalive ? this.programModel.laligalive : '',
                            categories: this.programModel.tags ? this.programModel.tags : '',
                            subCategories: this.programModel.programType ? this.programModel.programType : '',
                            duration: this.programModel.duration ? this.programModel.duration : ''
                        })
                    }
                }, error => console.error(error));
            }
        });
    }

    back() {
        this.router.navigate(['home/banner']);
    }

    handelImageChange(files: FileList) {
        console.log("files--->", files)
            ; this.fileToUpload = files.item(0);
        this.fileToUpload.mimeType = this.fileToUpload.type;
        this.uploadFileToActivity();
    }

    uploadFileToActivity() {
        this.programService.uploadUrl(this.fileToUpload).subscribe(data => {
            console.log("=======>", data);
        }, error => {
            console.log("=======>", error);
        });
    }
    save() {
        if (this.programModel) {
            Object.assign(this.programModel, this.programForm.value);
            this.programService.update(this.programModel).subscribe((response: any) => {
                if (response.status === 200)
                    this.back();
            },
                error => console.error(error));


        } else {
            this.programForm.value['image'] = 'https://korbanglafoodsolution.files.wordpress.com/2017/03/background-indomie-header4.png';
            this.programService.save(this.programForm.value).subscribe(
                banner => {
                    this.programModel = banner;

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