import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SmsCampaignModalComponent } from "../modals/sms-campaign-modal/sms-campaign-modal.component";
import { MatTableDataSource } from "@angular/material/table";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import * as moment from 'moment'

//Create Campaign
export interface Campaings {
  isReccuring: boolean;
  date: any;
  CampaignName: string;
  ChannelType: string;
  RunTimeType: any[];
  CampaingStartTime: any;
  MappedMessage: string[];
  CreatedAt: any;
  UpdatedAt: any;
}

const CAMPAIGN_LIST_DATA: Campaings[] = [
  {
    CampaignName: "Customer Greetings",
    ChannelType: "SMS",
    date: "2021-09-21T21:00:00.000Z",
    RunTimeType: ["OneTime"],
    CampaingStartTime: "23/11/2021",
    MappedMessage: ["MSG1"],
    isReccuring: false,
    CreatedAt: "08-10-21",
    UpdatedAt: "08-10-21",
  },
  {
    CampaignName: "Promotional deals and discounts",
    ChannelType: "SMS",
    date: "2021-09-21T21:00:00.000Z",
    RunTimeType: ["OneTime"],
    CampaingStartTime: "12/11/2021",
    MappedMessage: ["MSG2"],
    isReccuring: true,
    CreatedAt: "08-10-21",
    UpdatedAt: "08-10-21",
  },
  {
    CampaignName: "Alerts & notifications",
    ChannelType: "SMS",
    date: "2021-09-21T21:00:00.000Z",
    RunTimeType: ["OneTime"],
    CampaingStartTime: "15/11/2021",
    MappedMessage: ["MSG3"],
    isReccuring: true,
    CreatedAt: "08-10-21",
    UpdatedAt: "08-10-21",
  },
  {
    CampaignName: "Customer onBoarding",
    ChannelType: "SMS",
    date: "2021-09-21T21:00:00.000Z",
    RunTimeType: ["MultipleDates"],
    CampaingStartTime: "19/11/2021",
    MappedMessage: ["MSG4"],
    isReccuring: false,
    CreatedAt: "08-10-21",
    UpdatedAt: "08-10-21",
  },
  {
    CampaignName: "Flash Sale",
    ChannelType: "SMS",
    date: "2021-09-21T21:00:00.000Z",
    RunTimeType: ["MultipleDates"],
    CampaingStartTime: "01/11/2021",
    MappedMessage: ["MSG4"],
    isReccuring: true,
    CreatedAt: "08-10-21",
    UpdatedAt: "08-10-21",
  },
  {
    CampaignName: "SMS coupons",
    ChannelType: "SMS",
    date: "2021-09-21T21:00:00.000Z",
    RunTimeType: ["MultipleDates"],
    CampaingStartTime: "10/11/2021",
    MappedMessage: ["MSG4"],
    isReccuring: true,
    CreatedAt: "08-10-21",
    UpdatedAt: "08-10-21",
  },
  {
    CampaignName: "Loyalty programs",
    ChannelType: "SMS",
    date: "2021-09-21T21:00:00.000Z",
    RunTimeType: ["Recurring"],
    CampaingStartTime: "13/12/2021",
    MappedMessage: ["MSG4"],
    isReccuring: false,
    CreatedAt: "08-10-21",
    UpdatedAt: "08-10-21",
  },
  {
    CampaignName: "Sports promotion",
    ChannelType: "SMS",
    date: "2021-09-21T21:00:00.000Z",
    RunTimeType: ["Recurring"],
    CampaingStartTime: "23/11/2021",
    MappedMessage: ["MSG4"],
    isReccuring: false,
    CreatedAt: "08-10-21",
    UpdatedAt: "08-10-21",
  },
  {
    CampaignName: "Text to win",
    ChannelType: "SMS",
    date: "2021-09-21T21:00:00.000Z",
    RunTimeType: ["Recurring"],
    CampaingStartTime: "09/11/2021",
    MappedMessage: ["MSG4"],
    isReccuring: true,
    CreatedAt: "08-10-21",
    UpdatedAt: "08-10-21",
  },
];

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
  public settings2 = {};
  public selectedItems = [];
  public selectedItem: any;
  private oneTime: boolean;
  private multipleDate: boolean;
  @Input() isMultipleDate: boolean;
  @Input() isReccuring: boolean;
  @Input() displayCalendar: boolean;
  @Input() HideSMSForm: boolean;
  @Input() DisplayOtherFrom: boolean;
  @Input() showCompose: boolean;
  @Input() renderCreateCampaign = true;

  public RuntimeTypes = ["OneTime", "MultipleDates", "Recurring"];

  // Create DaiDH
  @ViewChild("multiSelect", null) multiSelect: { toggleSelectAll: () => void };

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
    //console.log(this.setForm)
    //This are the type of channels available
    this.data = [
      { item_id: 1, item_text: "MSG1" },
      { item_id: 2, item_text: "MSG2" },
      { item_id: 3, item_text: "MSG3" },
      { item_id: 4, item_text: "MSG4" },
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
      searchPlaceholderText: "SEARCH CAMPAIGN CHANNEL",
      noDataAvailablePlaceholderText: "NO DATA PRESENT",
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    //Dynamically generated stage settings for drop down
    this.settings2= {
      singleSelection: true,
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
    this.setForm(null);
    this.selectedItems = this.data;

    //this.addCampaignStages();
  }

  //Table relate functions and variable start
  //Campinag variabels
  //List Campaign Delivery Status
  dataSource = new MatTableDataSource(CAMPAIGN_LIST_DATA);
  //columns
  //{CampaignName:'sdsd',ChannelType:'SMS',date:'23/11/2021',RunTimeType:['wert'],CampaingStartTime:'23/11/2021',MappedMessage:['dveveoirnv','wefwfwef'],isReccuring:false,CreatedAt:'08-10-21',UpdatedAt:'08-10-21'},
  displayedColumns: string[] = [
    "CampaignName",
    "ChannelType",
    "date",
    "RunTimeType",
    "CampaingStartTime",
    "MappedMessage",
    "isReccuring",
    "CreatedAt",
    "UpdatedAt",
    "Delete",
    "Update",
  ];

  //Apply Data filter to table listing composed messages
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //All functions table relate
  ListCampaings() {
    this.renderCreateCampaign == true
      ? (this.renderCreateCampaign = false)
      : (this.renderCreateCampaign = true);
  }

  //Update Campaing
  deleteCampaign(data: any) {
    console.log(
      `delete campaing table data .... \n ${JSON.stringify(data, null, 2)}`
    );
    this.openDialog({
      type: "delete-campaign",
      ...data,
    });
  }
  //Delete Campaing
  updateCampaign(data: any) {
    console.log(
      `Delete campaigntable data .... \n ${JSON.stringify(data, null, 2)} `
    );
    this.openDialog({
      type: "campaign",
      ...data,
    });
  }
  //Table relate functions and variable end

  //Date Range
  getDateRange(event: any) {
    // look at how the date is emitted from save
    console.log(moment(event.target.value.begin).toISOString());
    console.log(moment(event.target.value.end).toISOString());

    // change in view
    this.dateRange = {
      begin:event.target.value.begin,
      end:event.target.value.end
    };
    
    console.log("Date Range object ", JSON.stringify(this.dateRange, null, 2));
  }

  //Create Campaign for type sms,notification,in app

  campaign(type: string) {
    console.log("type ", type);
    this.channel = type;
    this.setForm(type);
    if (type == "SMS") {
      this.HideSMSForm = true;
      this.DisplayOtherFrom = false;
    } else {
      this.HideSMSForm = false;
      this.DisplayOtherFrom = true;
    }
  }
  private setForm(x: any) {
    console.log("Channel type ", x);
    this.loadContent = true;
    return (this.campaignForm = this.formBuilder.group({
      campaigName: ["", Validators.required],
      channelType: [this.channel, Validators.required],
      RunTimeType: ["", Validators.required],
      recuringCampaignDuration: [""],
      date: [""],
      normalMessage: [""],
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
    //Set form to initial state
    this.isReccuring = false;
    this.isMultipleDate = false;
    this.displayCalendar = false;
  }

  public onFilterChange(item: any) {
    console.log("onFilter change ", item);
  }
  public onDropDownClose(item: any) {
    console.log("onDropDown change ", item);
  }

  public onItemSelect(item: any, i: any) {
    let indx; //Local index
    console.log("onItemSelect ", item);
    console.log("Array index ", i);
    console.log("push item to data array");
    this.selectedItem = item;
    this.selectedItems.forEach((objct, index) => {
      if (objct.item_id == item.item_id) {
        console.log(`item located ${index}`, item);
        indx = index;
      }
    });

    if (indx > -1) {
      this.selectedItems.splice(indx, 1);
    }

    let controls = <FormArray>(
      (<FormGroup>this.campaignForm.get("campaignStages")).get("stage")
    );

    // this.selectedItem.push(item);
    // this.selectedItem;
    console.log("i = ", i);
    controls.controls[i].patchValue({ mappedMessages: item });
    console.log(`selected item array ---> \n`, controls.controls[i]);
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
        this.isReccuring = false;
        this.isMultipleDate = false; //set multilple date false
        this.displayCalendar = true; //set calendar true
        console.log(
          `RunTime type ${this.RuntimeTypes[0]} isMuliselect ${this.isMultipleDate}`
        );
        break;
      case this.RuntimeTypes[1]:
        this.isReccuring = false;
        this.isMultipleDate = true; //set multiple date true
        this.displayCalendar = true;//set display alendar true
        console.log(
          `RunTime type ${this.RuntimeTypes[1]} isMuliselect ${this.isMultipleDate} displayCalendar ${this.displayCalendar}`
        );
        break;
      case this.RuntimeTypes[2]:
        this.isReccuring = true;
        this.displayCalendar = false;
        this.isMultipleDate = false;
        console.log(
          `RunTime type ${this.RuntimeTypes[2]} isReccuring ${this.isReccuring}`
        );
        break;
      default:
        break;
    }
  }

  openDialog(message): any {
    //Assign appropritate message according to form type
    let formModaldata = {
      data: {
        payload: message,
        message: null,
        buttonText: {
          ok: "OK",
          cancel: "CANCEL",
        },
      },
    };

    //ADJUST CONDITION
    console.log("type === > ", message.type);
    switch (message.type) {
      case "campaign":
        formModaldata.data.message = `YOUR ABOUT TO EDIT CAMPAIGN DETAIL`;
        formModaldata.data.buttonText.ok = `UPDATE`;
        break;
      case "message":
        formModaldata.data.message = `YOUR ABOUT TO EDIT MESSAGE DETAIL`;
        formModaldata.data.buttonText.ok = `UPDATE`;
        break;
      case "create-campaign":
        formModaldata.data.message = `YOUR ABOUT TO CREATE A NEW CAMPAIGN`;
        formModaldata.data.buttonText.ok = `CREATE CAMPAIGN`;
        break;
      case "create-message":
        formModaldata.data.message = `YOUR ABOUT TO CREATE A NEW CAMPAIGN MESSAGE`;
        formModaldata.data.buttonText.ok = `CREATE MESSAGE`;
        break;
      default:
        break;
    }

    const dialogRef = this.dialog.open(
      SmsCampaignModalComponent,
      formModaldata
    );
    return dialogRef;
  }

  //submit campaign form
  onSubmit() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let payload: any = {
      type: "create-campaign",
      isReccuring: this.isReccuring,
      ...this.campaignForm.value,
      createdBy: user.userInfo.username,
    };
    console.log(
      "submit form campaign form \n",
      JSON.stringify(payload, null, 2)
    );
    // return

    this.openDialog(payload);
    // console.log(
    //   "submit form campaign form \n",
    //   JSON.stringify(payload, null, 2)
    // );
  }
}
