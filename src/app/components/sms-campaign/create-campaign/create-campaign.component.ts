import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";

@Component({
  selector: "app-create-campaign",
  templateUrl: "./create-campaign.component.html",
  styleUrls: ["./create-campaign.component.css"],
})
export class CreateCampaignComponent implements OnInit {
  campaignForm: FormGroup; //Campaign From group
  campaignStages: FormArray;

  dateRange: any;
  public loadContent: boolean = false;
  public mappedMessages = "MappedMeesages";
  public data = [];
  public settings = {};
  public selectedItems = [];
  public selectedItem:any;
  private oneTime: boolean;
  private multipleDate:boolean;
  @Input() isMultipleDate: boolean;
  @Input() isReccuring: boolean;
  @Input() displayCalendar: boolean;
  @Input() HideSMSForm:boolean;
  @Input() DisplayOtherFrom:boolean;


  public RuntimeTypes = ["OneTime", "MultipleDates", "Recurring"];

  // Create DaiDH
  @ViewChild("multiSelect", null) multiSelect: { toggleSelectAll: () => void };

  constructor(private formBuilder: FormBuilder) {
    //console.log(this.setForm)
    //This are the type of channels available
    this.data = [
      { item_id: 1, item_text: "SMS" },
      { item_id: 2, item_text: "PUSH NOTIFICATION" },
      { item_id: 3, item_text: "EMAIL" },
      { item_id: 4, item_text: "IN APP" },
    ];
  }
  @Input() channel: string;
  ngOnInit() {
    
    // setting and support i18n
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
      searchPlaceholderText: "CHANNEL",
      noDataAvailablePlaceholderText: "NO DATA PRESENT",
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    this.setForm(null);
    this.selectedItems=this.data;

    //this.addCampaignStages();
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

  //Create Campaign for type sms,notification,in app

  campaign(type: string) {
    console.log("type ", type);
    this.channel = type;
    this.setForm(type)
    if(type=='SMS'){
      this.HideSMSForm = true;
      this.DisplayOtherFrom=false;
    }else{
      this.HideSMSForm = false
      this.DisplayOtherFrom=true
    }
  }
  private setForm(x:any) {
    console.log("Channel type ",x)
    this.loadContent = true;
    return (this.campaignForm = this.formBuilder.group({
      campaigName: [""],
      channelType: [this.channel],
      RunTimeType: [""],
      recuringCampaignDuration: [""],
      normalMessage:[""],
      campaignStages: this.formBuilder.group({
        stage: this.formBuilder.array([]),
      }),
    }));
  }

  get f() {
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
      mappedMessages: [this.selectedItem], //Messages mapped to channel and stage
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

  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    this.setForm(null);
    this.multiSelect.toggleSelectAll();
    // i try below variable isAllItemsSelected reference from your  repository but still not working
    // this.multiSelect.isAllItemsSelected = true;
  }

  public onFilterChange(item: any) {
    console.log("onFilter change ", item);
  }
  public onDropDownClose(item: any) {
    console.log("onDropDown change ", item);
  }

  public onItemSelect(item: any,i: any ) {
    let indx; //Local index
    console.log("onItemSelect ", item);
    console.log("Array index ",i)
    console.log("push item to data array")
    this.selectedItem=item
    this.selectedItems.forEach((objct,index)=>{
        if(objct.item_id == item.item_id){
          console.log(`item located ${index}`, item);
          indx=index
        }
    });

    if (indx > -1) {
      this.selectedItems.splice(indx, 1);
    }

    let controls=<FormArray>(
      (<FormGroup>this.campaignForm.get("campaignStages")).get("stage")
    );



    // this.selectedItem.push(item);
    // this.selectedItem;
    console.log("i = ",i)
    controls.controls[i].patchValue({'mappedMessages':item})
    console.log(`selected item array ---> \n`,controls.controls[i]);
    
  }
  public onDeSelect(item: any) {
    console.log("onDeSelect ", item);
    this.selectedItems.pop();
  }

  public onSelectAll(items: any) {
    console.log("onSelectAll ", items);
  }
  public onDeSelectAll(items: any) {
    console.log("onDeSelectAll ", items);
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

  //submit campaign form
  onSubmit() {
    let objt: any={
      isReccuring:this.isReccuring,
      date:this.dateRange,
      ...this.campaignForm.value
    }
    console.log(
      "submit form campaign form \n",
      JSON.stringify(objt, null, 2)
    );
  }
}
