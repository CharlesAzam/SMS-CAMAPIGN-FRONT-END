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
import { MatPaginator, MatSort, PageEvent } from "@angular/material";
import * as moment from 'moment'
import { SmsCampaignService } from "../../../services/sms-campaign.service";

//Create Campaign
export interface Campaings {
  isReccuring: boolean;
  date: any;
  campaigName: string;
  channelType: string;
  RunTimeType: any[];
  recuringCampaignDuration: any,
  campaignStages: any;
  MappedMessage: string[];
  CreatedBy:string;
  createdAt: any;
  updatedAt: any;
}



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
  public SelectedRuntimeType: string;
  @Input() isMultipleDate: boolean;
  @Input() isReccuring: boolean;
  @Input() displayCalendar: boolean;
  @Input() HideSMSForm: boolean;
  @Input() DisplayOtherFrom: boolean;
  @Input() showCompose: boolean;
  @Input() renderCreateCampaign = true;
  @ViewChild(MatPaginator,{static:false})paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  pageEvent:PageEvent; //PageEvent Var

  public RuntimeTypes = ["OneTime", "MultipleDates", "Recurring"];

  // Create DaiDH
  @ViewChild("multiSelect", null) multiSelect: { toggleSelectAll: () => void };
  campaignCount: any;

  constructor(private formBuilder: FormBuilder,private campaingServie: SmsCampaignService,private dialog: MatDialog) { 
  }
  @Input() channel: string;
  ngOnInit() {
    // setting and support i18n for channel message variable
    this.settings = {
      singleSelection: this.RuntimeTypes[1] == this.SelectedRuntimeType  ? false : true, //if Mulple date true set single selection to false else set true
      idField: "_id",
      textField: "Message",
      enableCheckAll: this.isMultipleDate == true ? true : false,
      selectAllText: "ALL",
      unSelectAllText: "UN SELECT",
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: "SEARCH MESSAGE TO MAP ... 1",
      noDataAvailablePlaceholderText: "NO DATA PRESENT",
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    //Dynamically generated stage settings for drop down
    this.settings2= {
      singleSelection: true,
      idField: "_id",
      textField: "Message",
      enableCheckAll: true,
      selectAllText: "ALL",
      unSelectAllText: "UN SELECT",
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: "SEARCH MAPPED MESSAGE...",
      noDataAvailablePlaceholderText: "NO DATA PRESENT",
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    this.setForm(null);
    this.selectedItems = this.data;

    //this.addCampaignStages();
    this.getCampignList(1,5)
    this.getMessageList(1,100)
    this.dataSource.paginator=this.paginator


    
  }

  //Table relate functions and variable start
  //Campinag variabels
  //List Campaign Delivery Status
  dataSource = new MatTableDataSource<any>([]);
  //columns
  //{CampaignName:'sdsd',ChannelType:'SMS',date:'23/11/2021',RunTimeType:['wert'],CampaingStartTime:'23/11/2021',MappedMessage:['dveveoirnv','wefwfwef'],isReccuring:false,CreatedAt:'08-10-21',UpdatedAt:'08-10-21'},
  displayedColumns: string[] = [
    "CampaignName",
    "ChannelType",
    "date",
    "CampaingStartTime",
    "RunTimeType",
    "MappedMessage",
    "isReccuring",
    "CreatedAt",
    "UpdatedAt",
    "Delete",
    "Update",
  ];


  onPaginateChangeEvent(event:PageEvent){
    let pageIndex = event.pageIndex
    let pageLength = event.length
    let pageSize = event.pageSize
    let pagePrevious = event.previousPageIndex
    pageIndex=pageIndex+1;
    console.log("onPaginateChangeEvent ",JSON.stringify(event,null,2))
    this.getCampignList(pageIndex,pageSize)
  }

  //Fetch campaign data for service
  getCampignList(pageIndex:any,pageSize:any){
    this.campaingServie.getCampaign(pageIndex,pageSize).subscribe((response: any) => {
      console.log("Received payload from get request campaigns",response);
      if (response.status === 200){
        console.log("Response Data")
        //TODO ADD SNACK BAR FOR SUCCESS
        //this.snackOpen.openSnackBar(response.status,response.message)
        console.log("Response data >>>>>> \n",response.data);
        //this.data = response.data
        this.dataSource = new MatTableDataSource<any>(response.data);
        this.campaignCount = response.count;
        // this.messageCount = response.count;
        //console.log("Result Count >>>>>> ",this.messageCount)
      
       }else{
        //TODO ADD SNACK BAR FOR SUCCESS
        console.log("Received payload",JSON.stringify(response,null,2));
        //this.snackOpen.openSnackBar(response.status,response.message)
       }
      
  }, error => console.log(error))
  }

  //Fetch message list for drop down
  getMessageList(pageIndex:any,pageSize:any){
    this.campaingServie.getMessages(pageIndex,pageSize).subscribe((response: any) => {
      console.log("Received payload from get request messages",response);
      if (response.status === 200){
        console.log("Response Data")
        //TODO ADD SNACK BAR FOR SUCCESS
        //this.snackOpen.openSnackBar(response.status,response.message)
        console.log("Response data >>>>>> \n",response.data);
        this.data = response.data;
        this.selectedItems=response.data
       // console.log("Result Count >>>>>> ",this.messageCount)
      
       }else{
        //TODO ADD SNACK BAR FOR SUCCESS
        console.log("Received payload",JSON.stringify(response,null,2));
        //this.snackOpen.openSnackBar(response.status,response.message)
       }
      
  }, error => console.log(error))
  }

  StripMessage(arr:any[]):any{
     let x= arr.map((item)=>{
       console.log('item.Message >>> ',item. mappedMessages)
       return item. mappedMessages.Message;
     })

     return x

  }

  

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
    console.log('getDate Range fired >>>>> ',moment(event.target.value.begin).toISOString());
    console.log('getDate Range fired >>>>> ',moment(event.target.value.end).toISOString());

    // change in view
    this.dateRange = event.target.value
    
    console.log("Date Range object ", JSON.stringify(this.dateRange, null, 2));
  }

  public DateFormatter(date:any):any{
     return moment(date).format('DD/MM/YY-h:mm:ss a')
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

  public onItemSelect(item: any,i:number) {
    let indx: number; //Local index
    console.log("onItemSelect ", item);
    //console.log("Array index ", i);
    console.log("push item to data array");
    this.selectedItem = item;
    this.selectedItems.forEach((objct, index) => {
      if (objct.item_id == item.item_id) {
        console.log(`item located ${index}`, item);
        indx = index;
      }
    });

    if (indx > -1) {
      //this.selectedItems.splice(indx, 1);
    }

    let controls = <FormArray>(
      (<FormGroup>this.campaignForm.get("campaignStages")).get("stage")
    );

    this.selectedItems.push(item);
    this.selectedItems;
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

    //RuntimeType == this.SelectedRuntimeType  ? true : false

    switch (RuntimeType) {
      case this.RuntimeTypes[0]:
        this.isReccuring = false;
        this.isMultipleDate = false; //set multilple date false
        this.displayCalendar = true; //set calendar true
        this.SelectedRuntimeType = this.RuntimeTypes[0] //set RunTimeType
        console.log(
          `RunTime type ${this.RuntimeTypes[0]} isMuliselect ${this.isMultipleDate}`
        );
        this.settings['singleSelection'] = true
        break;
      case this.RuntimeTypes[1]:
        this.isReccuring = false;
        this.isMultipleDate = true; //set multiple date true
        this.displayCalendar = true;//set display alendar true
        this.SelectedRuntimeType = this.RuntimeTypes[1] //set RunTimeType
        this.settings['singleSelection'] = false
        console.log(
          `RunTime type ${this.RuntimeTypes[1]} isMuliselect ${this.isMultipleDate} displayCalendar ${this.displayCalendar} set selecte`
        );
        break;
      case this.RuntimeTypes[2]:
        this.isReccuring = true;
        this.displayCalendar = false;
        this.isMultipleDate = false;
        this.SelectedRuntimeType = this.RuntimeTypes[2]
        console.log(
          `RunTime type ${this.RuntimeTypes[2]} isReccuring ${this.isReccuring}`
        );
        this.settings['singleSelection'] = true
        break;
      default:
        break;
    }

    console.log('SelectedRuntimType >>> ',this.SelectedRuntimeType)
    console.log('RuntimeTypes is MultipleDates >>>  ', RuntimeType == this.SelectedRuntimeType )
    console.log(`Settings 2 json values \n ${JSON.stringify(this.settings,null,2)}`)
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

  onRowClick(data: any){
    console.log(`data from row --> ${JSON.stringify(data,null,2)}`)
    this.openDialog({type:'table-detail',...data});
  }
}
