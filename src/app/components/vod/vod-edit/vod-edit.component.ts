import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VodService } from '../vod.service';
import { Vod } from '../vod';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


@Component({
    selector: 'vod-edit',
    templateUrl: './vod-edit.component.html'
})
export class VodEditComponent implements OnInit {

    isNewForm: boolean = false;
    isRadioForm: boolean = false;
    isVideoForm: boolean = false;
    isLiveTvForm: boolean = false;
    isSeriesForm: boolean = false;

    id: string;
    vod: Vod;
    errors: string;
    tags: any[] = []
    categories: any[] = [
        "Action",
        "Adventure",
        "Horror"
    ]
    countries: any[] = [
        "Tanzania",
        "Uganda",
        "Kenya"
    ]

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];


    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.tags.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(tag): void {
        const index = this.tags.indexOf(tag);

        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    }


    constructor(
        private route: ActivatedRoute,
        private vodService: VodService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    // if (id === 'new') return of(new Vod());
                    // else

                    switch (id) {
                        case "SERIES":
                            this.isSeriesForm = !this.isSeriesForm;
                            return of(new Vod());
                        case "NEWS":
                            this.isNewForm = !this.isNewForm;
                            return of(new Vod());
                        default:
                            break;
                    }
                    return this.vodService.findById(id)
                })
            )
            .subscribe(
                vod => {
                    this.vod = vod;
                    this.errors = '';
                },
                err => {
                    this.errors = 'Error loading';
                }
            );
    }

    save() {
        this.vodService.save(this.vod).subscribe(
            vod => {
                this.vod = vod;
                this.errors = 'Save was successful!';
            },
            err => {
                this.errors = 'Error saving';
            }
        );
    }

    openDialog() {
        const dialogRef = this.dialog.open(AddSeasonsDialog);
    }


}

@Component({
    selector: 'dialog-content-type',
    templateUrl: '../dialog-content-add-season.html',
})
export class AddSeasonsDialog {


    constructor(
        public dialogRef: MatDialogRef<AddSeasonsDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router
    ) { }


}