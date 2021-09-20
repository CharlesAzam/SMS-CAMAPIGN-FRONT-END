import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { SmsCampaignServiceService } from "../../sms-campaign-service.service";
import {
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import {FormGroup,FormBuilder,FormControl,Validators,FormArray,} from "@angular/forms";

@Component({
  selector: "app-sms-campaign-modal",
  templateUrl: "./sms-campaign-modal.component.html",
  styleUrls: ["./sms-campaign-modal.component.css"],
})
export class SmsCampaignModalComponent implements OnInit {
  @Input() message: string = "Warning a module must have at least one permission \n.Removing it will result to the module being removed?";
  @Input() confirmButtonText = "Yes";
  @Input() cancelButtonText = "Cancel";
  @Input() renderFormType:string;
  @Input() formDetails:any;
  private payload: any;


  //Create update form variables start
  //Campaign form
  form: FormGroup;
  public dataz:any [];
  public settings = {};
  public loadContent: boolean = false;
  // Create DaiDH
  @ViewChild("multiSelect", null) multiSelect: { toggleSelectAll: () => void };

  //end

  constructor(
    private campaingServie: SmsCampaignServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SmsCampaignModalComponent>
  ) {
    if (data) {
      this.message = data.message || this.message;
      this.payload = data.payload;
      this.formDetails = data.payload;
      console.log(`modal data Objective = `,data.payload.Objective);
      console.log(`modal data type = `,data.payload.type);
      this.renderFormType=data.payload.type;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  ngOnInit() {
    this.settings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      enableCheckAll: true,
      selectAllText: "ALL",
      unSelectAllText: "UN SELECT",
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: "SEARCH CAMPAIGN CHANNEL",
      noDataAvailablePlaceholderText: "NO DATA PRESENT",
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    this.dataz = [
      { item_id: 1, item_text: "SMS" },
      { item_id: 2, item_text: "PUSH NOTIFICATION" },
      { item_id: 3, item_text: "EMAIL" },
      { item_id: 4, item_text: "IN APP" },
    ];

    this.setForm();


  }

  onConfirmClick(): void {
    //Launch service to call back end in modal
    this.campaingServie.createCampaingChannel(this.payload).subscribe((response: any) => {
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

    
  }

  onUpdate(){
   console.log("update payload ",JSON.stringify(this.formDetails,null,2))
   this.campaingServie.updateCampaingChannel(this.payload).subscribe((response: any) => {
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
  }

  delete(){
    console.log("update payload ",JSON.stringify(this.formDetails,null,2))
    this.campaingServie.deleteCampaingChannel(this.payload).subscribe((response: any) => {
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
   }

  public cancel(){
    this.dialogRef.close(true);
  }

  public onFilterChange(item: any) {
    console.log("onFilter change ", item);
  }
  public onDropDownClose(item: any) {
    console.log("onDropDown change ", item);
  }

  public async onItemSelect(item: any) {
    console.log("onItemSelect ", item);
    let arr = []
    arr=this.formDetails.MappedCampaing
    let result=arr.find((objct)=>objct == item.item_text)
    if(result){
      //this.form.setErrors({ 'invalid': true });
      console.log("error ",this.form.controls['name'].setErrors({invalid:true}))
    }else{
      //Add to Array
      this.formDetails.MappedCampaing.push(item.item_text)
    }
    
  }
  public onDeSelect(item: any) {
    console.log("onDeSelect ", item);
    let indx: number; //Local index
    let arr = []
    arr=this.formDetails.MappedCampaing
    arr.forEach((objct,index)=>{
      if(objct == item){
        console.log(`item located ${index}`, item);
        indx=index
      }
  });

  if (indx > -1) {
    this.formDetails.MappedCampaing.splice(indx, 1);
    console.log("spliced array ",this.formDetails.MappedCampaing)
  }
  }

  public onSelectAll(items: any) {
    console.log("onSelectAll ", items);
    this.formDetails.MappedCampaing=[]
    this.formDetails.MappedCampaing=items
  }
  public onDeSelectAll(items: any) {
    console.log("onDeSelectAll ", items);
    this.formDetails.MappedCampaing=[]
  }

  public setForm() {
    this.form = new FormGroup({
      campaigObjective: new FormControl(this.formDetails.Objective, Validators.required),
      campaignMessage: new FormControl(this.formDetails.Message,Validators.required),
      name: new FormControl(this.formDetails.MappedCampaing,Validators.required),
      personalizeMessage: new FormControl(this.formDetails.isPersonalized, null),
    });
    this.loadContent = true;
  }

  get f() {
    return this.form.controls;
  }
}
