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
  //message form
  form: FormGroup;
  //campaign
  campaignForm: FormGroup; //Campaign From group
  campaignStages: FormArray;//stages form array
  @Input() isMultipleDate: boolean;
  @Input() isReccuring: boolean;
  @Input() displayCalendar: boolean;
  @Input() HideSMSForm:boolean;
  @Input() DisplayOtherFrom:boolean;
  @Input() showCompose:boolean;
  @Input() renderCreateCampaign=true;
  @Input() RunType: string;
  public RuntimeTypes = ["OneTime", "MultipleDates", "Recurring"];
  public dataz:any [];
  public settings = {};
  public loadContent: boolean = false;
  public dateRange: any;
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
      this.formDetails = {...data.payload,"campaignStages": {
        "stage": [
          {
            "from": "1",
            "to": "3",
            "mappedMessages": {
              "item_id": 1,
              "item_text": "SMS"
            }
          }
        ]
      },"recuringCampaignDuration": "3",};
      this.RunType = this.formDetails.RunTimeType;
      this.isReccuring = data.payload.isReccuring
      console.log("payload \n",JSON.stringify(data.payload,null,2))
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

    //This is willl be all the messages available
    this.dataz = [
      { item_id: 1, item_text: "MSG1" },
      { item_id: 2, item_text: "MSG2" },
      { item_id: 3, item_text: "MSG3" },
      { item_id: 4, item_text: "MSG4" },
    ];

    this.setForm(this.renderFormType);

    if(this.formDetails.campaignStages.stage!=null){
    let stages:any [] = this.formDetails.campaignStages.stage;
     console.log("i = ",JSON.stringify(this.formDetails.campaignStages.stage,null,2))
      let controls=<FormArray>(
        (<FormGroup>this.campaignForm.get("campaignStages")).get("stage")
      );

      stages.forEach((stageItem,index)=>{
        this.campaignStagez.push(this.newCampaign());
        console.log(`stage from ${stageItem.from} to ${stageItem.to} mappedMessages ${stageItem.mappedMessages} item index >>> `,index)
        controls.controls[index].patchValue({
          'from':stageItem.from,
          'to':stageItem.to,
          'mappedMessages':stageItem.mappedMessages
        })
      })

      
  
  
      
      // this.selectedItem.push(item);
      // this.selectedItem;
       console.log("campaign form ",JSON.stringify(this.campaignForm.value,null,2))
      //controls.controls[i].patchValue({'mappedMessages':item})
      // console.log(`selected item array ---> \n`,controls.controls[i]);
      
     
    }

    if(this.formDetails.RunTimeType[0] == this.RuntimeTypes[0] && this.formDetails.RunTimeType[0] == this.RuntimeTypes[0]){
      this.displayCalendar = true;
      this.isReccuring = false;
    }else if(this.formDetails.RunTimeType[0] == this.RuntimeTypes[2]){
      this.displayCalendar = false;
      this.isReccuring = true;
    }


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

  onUpdate(type:string){
   console.log(`on update campaign  --> ${type} `,JSON.stringify(this.campaignForm.value,null,2))
   return
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

  /*
    {
  "isReccuring": true,
  "campaigName": "ttoirthr",
  "channelType": "SMS",
  "RunTimeType": "Recurring",
  "recuringCampaignDuration": "3",
  "date": "",
  "normalMessage": "",
  "campaignStages": {
    "stage": [
      {
        "from": "1",
        "to": "3",
        "mappedMessages": {
          "item_id": 1,
          "item_text": "SMS"
        }
      }
    ]
  },
  "createdBy": "superadmin-local"
}
  */
  public setForm(type:string) {
    if(type==='message'){
      this.form = new FormGroup({
        campaigObjective: new FormControl(this.formDetails.Objective, Validators.required),
        campaignMessage: new FormControl(this.formDetails.Message,Validators.required),
        name: new FormControl(this.formDetails.MappedCampaing,Validators.required),
        personalizeMessage: new FormControl(this.formDetails.isPersonalized, null),
      });
      this.loadContent = true;
      return this.form;
    }else if(type === 'campaign'){
      this.loadContent = true;
      this.dateRange=this.formDetails.date;
      console.log("date ",this.formDetails.date)
      return (this.campaignForm = this.formBuilder.group({
        campaigName: [this.formDetails.CampaignName,Validators.required],
        channelType: [this.formDetails.ChannelType,Validators.required],
        RunTimeType: [this.formDetails.RunTimeType[0],Validators.required],
        recuringCampaignDuration: [""],
        date:[this.formDetails.date],
        normalMessage:[this.formDetails.MappedMessage],
        campaignStages: this.formBuilder.group({
          stage: this.formBuilder.array([
          ]),
        }),
      }));
     
    }else{
      return
    }
  }

  onRadioChange(RuntimeType: any) {
    console.log("RuntimeType  >>>", RuntimeType);
  
    switch (RuntimeType) {
      case this.RuntimeTypes[0]:
        this.isReccuring=false;
        this.isMultipleDate = false; //set multilple date false
        this.displayCalendar = true; //set calendar true
        console.log(
          `RunTime type ${this.RuntimeTypes[0]} isMuliselect ${this.isMultipleDate}`
        );
        break;
      case this.RuntimeTypes[1]:
        this.isReccuring=false;
        this.isMultipleDate = true; //set multiple date true
        this.displayCalendar == true;
        console.log(
          `RunTime type ${this.RuntimeTypes[1]} isMuliselect ${this.isMultipleDate}`
        );
        break;
      case this.RuntimeTypes[2]:
        this.isReccuring = true;
        this.displayCalendar = false;
        this.isMultipleDate=false;
        this.displayCalendar=false;
        console.log(
          `RunTime type ${this.RuntimeTypes[2]} isReccuring ${this.isReccuring}`
        );
        break;
      default:
        break;
    }
  }

  get f() {
    return this.form.controls;
  }
  get g() {
    return this.campaignForm.controls;
  }

  get campaignStagez(): any {
    const control = <FormArray>(
      (<FormGroup>this.campaignForm.get("campaignStages")).get("stage")
    );
    return control;
  }

  newCampaign(): FormGroup {
    return this.formBuilder.group({
      from: [""],
      to: [""],
      mappedMessages: [], //Messages mapped to channel and stage
    });
  }
  //Create campaing stages form
  addCampaignStages(): void {
    this.campaignStagez.push(this.newCampaign());
    //return this.campaignStages=this.campaignForm.get('campaignStages') as FormArray;
  }

  //Remove Campaing stage form
  removeCapaingStage(i: number): void {
    this.campaignStagez.removeAt(i);
  }

  //Date Range
  getDateRange(event: any) {
    // look at how the date is emitted from save
    console.log(event.target.value.begin);
    console.log(event.target.value.end);

    // change in view
    this.dateRange = event.target.value;
    console.log("Date Range object ", JSON.stringify(this.dateRange, null, 2));
  }
}


