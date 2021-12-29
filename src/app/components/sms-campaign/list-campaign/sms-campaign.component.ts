import { HostListener, Input } from "@angular/core";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { SmsCampaignModalComponent } from "../modals/sms-campaign-modal/sms-campaign-modal.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SmsCampaignService } from "../../../services/sms-campaign.service";
import { MatPaginator, MatSort, PageEvent } from "@angular/material";
import Utility from "../../../../utility/helper";
import * as FileSaver from "file-saver";
import { ExportToCsv } from 'export-to-csv-file';
import * as XLSX from "xlsx";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

//Channel
interface Channel {
  value: string;
  viewValue: string;
}
//Delivery
interface Delivery {
  value: string;
  viewValue: string;
}

//Status
interface Status {
  value: string;
  viewValue: string;
}
//List of Campaign execution status
export interface CampaignDelivery {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

// List of campaign Messages
export interface CampaignMessage {
  _id:string;
  Objective: string;
  Message: string;
  MappedMessage: any[];
  MappedCampaing: any[];
  isPersonalized: boolean;
  CreatedBy: any;
  createdAt: any;
  updatedAt: any;
  DeliveryStatus:any;
  Status:any;
}

// List Campaign
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
  Status
}

//List Campaign Delivery Status
const CAMPAIGN_DELIVER_DATA: CampaignDelivery[] = [
  { position: 1, name: "08-10-21", weight: "05-10-21", symbol: "true" },
  { position: 2, name: "08-10-21", weight: "05-10-21", symbol: "true" },
  { position: 3, name: "08-10-21", weight: "05-10-21", symbol: "true" },
  { position: 4, name: "08-10-21", weight: "05-10-21", symbol: "true" },
  { position: 5, name: "08-10-21", weight: "05-10-21", symbol: "true" },
  { position: 6, name: "08-10-21", weight: "05-10-21", symbol: "true" },
  { position: 7, name: "08-10-21", weight: "05-10-21", symbol: "true" },
  { position: 8, name: "08-10-21", weight: "05-10-21", symbol: "true" },
  { position: 9, name: "08-10-21", weight: "05-10-21", symbol: "true" },
  { position: 10, name: "08-10-21", weight: "05-10-21", symbol: "true" },
];



@Component({
  selector: "app-sms-campaign",
  templateUrl: "./sms-campaign.component.html",
  styleUrls: ["./sms-campaign.component.css"],
})
export class SmsCampaignComponent implements OnInit {
  //Render var
  @Input() renderCreateCampaign = false;
  @Input() showComposeForm = true;
  @Input() showMessageTable = true; 
  //isPesonalized
  @Input() isPersonalized: string;
  @Input() TextAreaMessage: string;
  @Input() TextAreaMessageCount: number;
  @Input() isPersonalMessageError: boolean;
  @Input() messageCount:number;
  @Input() campaignCount:number=0;
  @Input() adjustCSSQuery;
  // Create DaiDH
  @ViewChild("multiSelect", null) multiSelect: { toggleSelectAll: () => void };
  @ViewChild(MatPaginator,{static:false})paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  [x: string]: any;
  list: any[];
  
  dateRange: any;
  pageEvent:PageEvent;
  public loadContent: boolean = false;
  public name = "Cricketers";
  public data = [];
  public settings = {};
  public selectedItems = [];
  private payload: any;

  //Campaign form
  form: FormGroup;

  createCampaignMessageForm() {
    this.form = this.formBuilder.group({
      campaigObjective: ["",Validators.required],
      campaignMessage: ["",Validators.required],
    });
  }
  constructor(
    private router: Router,
    private campaingServie: SmsCampaignService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    //For Check box letter
    //Initalize form group
    //this.createCampaignMessageForm();
  }
  panelOpenState = false;

  /**
   * All table variable listing campaigns status,channels, and campaign messages
   * */
  //start table vars declartion
  //columns
  displayedColumns: string[] = [
    "CAMPAIGN NAME",
    "CAMPAIGN TYPE",
    "CHANNEL TYPE",
    "START TIME",
    "CREATED TIME",
    "CURRENT STAGE",
    "TOTAL NUMBER STAGES",
    "NEXT SCHEDULED RUN",
    "CAMPAIGN DURATION",
    "REMAINING DURATION",
    "IS-SENT",
    "STATUS",
    "ACTIONS"
  ];

  header=[
    'CAMPAIGN NAME',
    'CAMPAIGN TYPE',
    'CHANNEL',
    'START TIME',
    'CREATED TIME',
    'CURRENT STAGE',
    'TOTAL STAGE',
    'NEXT RUN',
    'SPAN',
    'IS SENT',
    'STATUS',
  ]

  options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'CampaignList',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
   // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  composedMessageDislayedColumns: string[] = [
    "Objective",
    "Message",
    "MappedCampaing",
    "isPersoanlized",
    "CreatedBy",
    "CreatedAt",
    "UpdatedAt",
    "Delete",
    "Update",
  ];

  dataSource = new MatTableDataSource<Campaings>([]);
  composedMessageDataSource= new MatTableDataSource<CampaignMessage>([]);
  composedMessageDataSourcePaginator= new MatTableDataSource<any>([]).paginator;
  filterCondition:any;

  //Apply Data filter to table listing composed messages
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("filterValue ",filterValue)
    this.composedMessageDataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log("this.composedMessageDataSource.filter   >>>>",this.composedMessageDataSource.filteredData)
  }

  //Delete table function for compose message
  deleteComposeMessage(data: any) {
    console.log(`Delete message \n ${JSON.stringify(data, null, 2)}`);
    this.openDialog({
      type: "delete-message",
      //message:"Are you sure you want to delte",
      ...data,
    });

  }

  //Update table function for comnpose message
  updateComposeMessge(data: any) {
    console.log(`Update message \n ${JSON.stringify(data, null, 2)}`);
    this.openDialog({
      type: "message",
      ...data,
    });
  }
  //Channels
  Channels: Channel[] = [
    { value: "steak-0", viewValue: "Sms" },
    { value: "pizza-1", viewValue: "Notification" },
    { value: "tacos-2", viewValue: "in app" },
  ];

  //Deliveries
  Deliveies: Delivery[] = [
    { value: "steak-0", viewValue: "One Time" },
    { value: "pizza-1", viewValue: "Inaction" },
    { value: "tacos-2", viewValue: "Action" },
    { value: "tacos-2", viewValue: "On a date" },
  ];

  //Status
  Statuses: Status[] = [
    { value: "Scheduled-0", viewValue: "Scheduled" },
    { value: "Running-1", viewValue: "Running" },
    { value: "Stopped-2", viewValue: "Stopped" },
    { value: "Completed-2", viewValue: "Completed" },
    { value: "Approval pending-2", viewValue: "Approval pending" },
    { value: "Draft-2", viewValue: "Draft" },
    { value: "Awaiting Next Run2", viewValue: "Awaiting Next Run" },
  ];

  ////start table vars declartion

  //Drop downs vars
  shareCheckedList(item: any[]) {
    console.log(item);
  }
  shareIndividualCheckedList(item: {}) {
    console.log(item);
  }

  async ngOnInit() {
    //This are the type of channels available
    // this.data = [
    //   { item_id: 1, item_text: "SMS" },
    //   { item_id: 2, item_text: "PUSH NOTIFICATION" },
    //   { item_id: 3, item_text: "EMAIL" },
    //   { item_id: 4, item_text: "IN APP" },
    // ];
    // setting and support i18n
    this.settings = {
      singleSelection: false,
      //idField: "_id",
      //textField: this.data,
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
    this.setForm();

  
  this.getMessageList(1,5)
  this.getCampignList(1,100)
  this.composedMessageDataSource.paginator = this.paginator;
  //console.log("composedMessageDataSourcePaginator >>>>>> ",JSON.stringify(this.composedMessageDataSource,null,2))
  
  
}

  Date=(date:any,formatt:any)=>{
    return Utility.DateFormatter(date,formatt);
  }

  getMessageList(pageIndex:any,pageSize:any){
    this.campaingServie.getMessages(pageIndex,pageSize).subscribe((response: any) => {
      //console.log("Received payload from get request messages",response);
      if (response.status === 200){
       // console.log("Response Data")
        //TODO ADD SNACK BAR FOR SUCCESS
        //this.snackOpen.openSnackBar(response.status,response.message)
        //console.log("Response data >>>>>> \n",JSON.stringify(response.data,null,2));
        this.composedMessageDataSource = new MatTableDataSource<CampaignMessage>(response.data);
        ///this.data =response.data
        this.messageCount = response.count;
       // console.log("Result Count >>>>>> ",this.messageCount)
      
       }else{
        //TODO ADD SNACK BAR FOR SUCCESS
        console.log("Received payload",JSON.stringify(response,null,2));
        //this.snackOpen.openSnackBar(response.status,response.message)
       }
      
  }, error => console.log(error))
  }
      //Fetch campaign data for service
     getCampignList(pageIndex:any,pageSize:any){
        this.campaingServie.getCampaign(pageIndex,pageSize).subscribe((response: any) => {
         console.log("Received payload from get request campaigns",response);
          if (response.status === 200){
            console.log("Response Data")
            //TODO ADD SNACK BAR FOR SUCCESS
            let campaigResults:any []=response.data;
            let finalData=campaigResults.map((campaigResult)=>{
              console.log(`campaign lenght >>> `,{
                ...campaigResult,
              //  'currentStage':campaigResult.campaignStages.stages,
                'totalStages':campaigResult.campaignStages.stages.length,
              })
              return{
                ...campaigResult,
                'totalStages':campaigResult.campaignStages.stages.length,
              }
            })
            this.dataSource=new MatTableDataSource<Campaings>(finalData);
            this.campaignCount=response.count;
            const unfilterdArr=response.data.map((data:any,index)=>{
                  //console.log('chanelTypes data >>>>>>',data.channelType)
                  return data.channelType
                  
            })

            this.data= unfilterdArr.filter(function(item, index) {
              if (unfilterdArr.indexOf(item) == index)
                return item;
            });

            //this.dataSource = new MatTableDataSource<any>(response.data);
            // this.messageCount = response.count;
            //console.log("filleterd channel no duplicates>>>>>> ",this.data)
          
           }else{
            //TODO ADD SNACK BAR FOR SUCCESS
            console.log("Received payload",JSON.stringify(response,null,2));
            //this.snackOpen.openSnackBar(response.status,response.message)
           }
          
      }, error => console.log(error))
      }
  ngAfterViewInit(): void {
 
    // this.composedMessageDataSource.paginator.page.pipe()
    // .subscribe((item)=>{
    //   console.log("pageIndex ",item)
    //   //console.log("composedMessageDataSourcePaginator >>>>>> ",this.paginator)
    // });

    // this.paginator.page
    // .pipe(
    //   startWith(null),
    //   tap(() =>{
    //     console.log("this.paginator.pageSize >>>>> ",this.paginator.pageSize)
    //     this.getMessageList(
    //       this.paginator.pageIndex + 1,
    //       this.paginator.pageSize
    //     )
    //   }
       
    //   )
    // )
    // .subscribe();
    
  }

  onPaginateChangeEvent(event:PageEvent){
    let pageIndex = event.pageIndex
    let pageLength = event.length
    let pageSize = event.pageSize
    let pagePrevious = event.previousPageIndex
    pageIndex=pageIndex+1;
    console.log("onPaginateChangeEvent ",JSON.stringify(event,null,2))
    this.getMessageList(pageIndex,pageSize)
    this.getCampignList(pageIndex,pageSize)
  }

  public setForm() {
    this.form = new FormGroup({
      campaigObjective: new FormControl("", Validators.required),
      campaignMessage: new FormControl("", Validators.required),
      name: new FormControl(this.data, Validators.required),
      personalizeMessage: new FormControl(false, Validators.required),
    });
    this.loadContent = true;
  }
  get f() {
    return this.form.controls;
  }

  public save() {
    console.log("save == ", this.form.value);
  }

  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    this.setForm();
    this.multiSelect.toggleSelectAll();
    // i try below variable isAllItemsSelected reference from your  repository but still not working
    // this.multiSelect.isAllItemsSelected = true;
  }

  //TODO implement drop downfunction sms-campigns form
  //Drop down function for message function start
  public onFilterChange(item: any) {
    console.log("onFilter change ", item);
  }
  public onDropDownClose(item: any) {
    console.log("onDropDown change ", item);
  }

  public onItemSelect(item: any) {
    console.log("onItemSelect ", item);
  }
  public onDeSelect(item: any) {
    console.log("onDeSelect ", item);
  }

  public onSelectAll(items: any) {
    console.log("onSelectAll ", items);
  }
  public onDeSelectAll(items: any) {
    console.log("onDeSelectAll ", items);
  }
  //Drop down function for message function end

  //Class functions
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.adjustCSSQuery = event.target.innerWidth;
    console.log(`width == ${this.adjustCSSQuery}`);
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

  //Create campaing messages
  CreateCampaignMessage() {
    console.log("Create Campaign message ...");
    this.renderCreateCampaign == false
      ? (this.renderCreateCampaign = true)
      : (this.renderCreateCampaign = false);
    //this.renderCreateCampaign=true;
  }

  //View Messages
  RenderTable() {
    this.showMessageTable == true
      ? (this.showMessageTable = false)
      : (this.showMessageTable = true);
    console.log("List messsages ", this.showMessageTable);
  }

  //Halt Capaign
  HaltCampaign(){
    console.log(`Halt campaign`)
  }

  //Show Campaign Statu detail
  CampaignDetail(data:any){
    
    const campaignID = data!._id;
    let  SchedulerDetails:any
    console.log(`id ${campaignID} show cmapign details \n ${JSON.stringify(0,null,2)}`)
    this.campaingServie.CampaignSchedulerDetail(campaignID,1,100).subscribe((response: any) => {
       console.log("Received payload from get request campaigns CampaignDetail() >>>",JSON.stringify(response,null,2));
       if (response.success){
         
         //TODO ADD MODEL WITH TABLE DATA
        SchedulerDetails=response;
         //console.log(`Response Data CampaignDetail ${JSON.stringify(SchedulerDetails,null,2)}`)
       
        }else{
         //TODO ADD SNACK BAR FOR SUCCESS
         console.log("Received payload",JSON.stringify(response,null,2));
         //this.snackOpen.openSnackBar(response.status,response.message)
        }
       
   }, error => console.log(error))
    this.openDialog({message:"CAMPAIGN DETAILS",type:'campaign-detail',camnpaignId:campaignID})
    //Display modal containing campaign details
    
  }
  //Create campaign type
  Redirect() {
    console.log("Button working ...");
    this.router.navigate(["home/create-campaign"]);
  }
  //submit campaign form
  onSubmit() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
   
  
  
    this.payload = {
      ...this.form.value,
      createdBy: user.userInfo.username,
    };

    if(this.payload['personalizedMessage'] == ""){
      this.payload['personalizedMessage'] = false
    }
   // console.log("form value getPersianlized ",this.form.get('personalizedMessage').value)

   
    
    console.log(
      "submit form campaign form \n",
      JSON.stringify(this.payload, null, 2)
    );
    console.log(
      "currentUser \n",
      JSON.stringify(user.userInfo.username, null, 2)
    );
    this.openDialog({
      type: "create-message",
      ...this.payload,
    });
  }
  
  //Ispoesonal Checkbox
  private _flagError: any;
  onChange(event: any) {
    console.log("show event showoptions() ==> ", event.checked);
    let flag = event.checked;
    flag != true ? (this.isPersonalized = "NO") : (this.isPersonalized = "YES");
    if (flag) {
      console.log(
        this.isPersonalized + " error value --------> ",
        this._flagError
      );
      if (this._flagError == -1) {
        console.log("Please add #### for pesonalized message");
        this.isPersonalMessageError = true;
      } else {
        this.isPersonalMessageError = false;
      }
    } else {
      console.log("IS THERE ANY ERROR --------> ", this.isPersonalized);
    }
  }

  setPersonalized(m) {
    //Get personalized message
    //Validate data
    console.log(
      this.isPersonalized +
        " <<<--- isPersonalized serach result m.search('####') ---->>> " +
        m.search("####")
    );
    this._flagError = m.search("####");

    this.TextAreaMessage = m;
    this.TextAreaMessage = m.replace("####", "John");
    console.log("message from event ", m);
    console.log("this is textArea message ", this.TextAreaMessage);
  }

  //Dialog Open
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
    switch (message.type) {
      case "campaing":
        formModaldata.data.message = `YOUR ABOUT TO EDIT CAMPAIGN DETAIL`;
        formModaldata.data.buttonText.ok = `UPDATE`;
        break;
      case "message":
        formModaldata.data.message = `YOUR ABOUT TO EDIT MESSAGE DETAIL`;
        formModaldata.data.buttonText.ok = `UPDATE`;
        break;
      case "normal":
        formModaldata.data.message = `YOUR ABOUT TO CREATE A NEW CAMPAIGN MESSAGE`;
        formModaldata.data.buttonText.ok = `CREATE`;
        break;
      default:
        break;
    }
    console.log("opennDialog= ", JSON.stringify(formModaldata, null, 2));

    const dialogRef = this.dialog.open(
      SmsCampaignModalComponent,
      formModaldata
    );

    return dialogRef;
  }

  exportFileToCsv() {
    this.dataSource.data;
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
   // this.saveAsExcelFile(excelBuffer, filename);
   const csvExporter = new ExportToCsv(this.options);
   csvExporter.generateCsv(this.dataSource.data)
  
  }


  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], {
  //     type: 'CSV',
  //   });
  //   FileSaver.saveAs(
  //     data,
  //     fileName + "_export_" + new Date().getTime() + '.csv'
  //   );
  // }
}
