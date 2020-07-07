import { Component, OnInit, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-role-edit-dialog',
  templateUrl: './role-edit-dialog.component.html',
  styleUrls: ['./role-edit-dialog.component.css']
})
export class RoleEditDialogComponent  {

  message: string = "Warning a module must have at least one permission \n.Removing it will result to the module being removed?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<RoleEditDialogComponent>) 
    {
      if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
      }
  }
  

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
