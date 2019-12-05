import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Router } from '@angular/router';

@Component({
    selector: 'dialog-error',
    templateUrl: './dialog-error.html',
})
export class ErrorDialog {

    error: any;
    constructor(
        public dialogRef: MatDialogRef<ErrorDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router
    ) { 
        this.error = data;
    }


}