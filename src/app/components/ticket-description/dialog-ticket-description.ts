import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Router } from '@angular/router';

@Component({
    selector: 'dialog-ticket-description',
    templateUrl: './dialog-ticket-description.html',
})
export class TicketDescriptionDialog  {

    warning: any;
    button: boolean = true;
    constructor(
        public dialogRef: MatDialogRef<TicketDescriptionDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { 
        this.warning = data;
    }


}