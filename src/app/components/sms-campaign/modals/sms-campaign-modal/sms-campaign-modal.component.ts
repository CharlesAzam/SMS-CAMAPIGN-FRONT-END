import { Component, Inject, Input, OnInit } from "@angular/core";
import { SmsCampaignServiceService } from "../../sms-campaign-service.service";
import {
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";

@Component({
  selector: "app-sms-campaign-modal",
  templateUrl: "./sms-campaign-modal.component.html",
  styleUrls: ["./sms-campaign-modal.component.css"],
})
export class SmsCampaignModalComponent implements OnInit {
  @Input() message: string =
    "Warning a module must have at least one permission \n.Removing it will result to the module being removed?";
  @Input() confirmButtonText = "Yes";
  @Input() cancelButtonText = "Cancel";
  private payload: any;

  constructor(
    private campaingServie: SmsCampaignServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SmsCampaignModalComponent>
  ) {
    if (data) {
      this.message = data.message || this.message;
      this.payload = data.payload;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  ngOnInit() {}

  onConfirmClick(): void {
    //Launch service to call back end in modal
    this.campaingServie.createCampaingCahnnel(this.payload).subscribe((response: any) => {
      console.log("Received payload",response);
      // if (response.status === 200)
      //     console.log("Response Data")
      // // console.log(response.data)
      // //this.getModulesAndActions2
      // let arr = [];
      // let moduleArr = [];
      // //console.log(response.data)

      // Object.keys(response.data).forEach((key) => {
      //     // console.log("Iterator function "+key)
      //     arr.push({
      //         module: key,
      //         actions: response.data[key],
      //     })
      // });

      // this.modulesAndActions = arr;
      // // console.log('Filter module list \n')
      // this.modulesAndActions.forEach((c) => {
      //     // console.log(c.module)
      //     moduleArr.push(c.module)
      // });

      // //console.log('Filter module \n', moduleArr)
      // this.getModulesAndActionsUpdate(moduleArr);
  }, error => console.log(error))

    this.dialogRef.close(true);
  }
}
