import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Router } from '@angular/router';

@Component({
    selector: 'dialog-warning',
    templateUrl: './dialog-warning.html',
})
export class WarningDialog {

    warning: any;
    constructor(
        public dialogRef: MatDialogRef<WarningDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { 
        this.warning = data;
    }


}