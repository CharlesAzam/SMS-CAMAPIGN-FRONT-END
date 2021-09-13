import { HostListener, Input } from '@angular/core';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
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
export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

//Message status
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '08-10-21', weight:'05-10-21', symbol: 'true'},
  {position: 2, name: '08-10-21', weight:'05-10-21', symbol: 'true'},
  {position: 3, name: '08-10-21', weight:'05-10-21', symbol: 'true'},
  {position: 4, name: '08-10-21', weight:'05-10-21', symbol: 'true'},
  {position: 5, name: '08-10-21', weight:'05-10-21', symbol: 'true'},
  {position: 6, name: '08-10-21', weight:'05-10-21', symbol: 'true'},
  {position: 7, name: '08-10-21', weight:'05-10-21', symbol: 'true'},
  {position: 8, name: '08-10-21', weight:'05-10-21', symbol: 'true'},
  {position: 9, name: '08-10-21', weight:'05-10-21', symbol: 'true'},
  {position: 10, name:'08-10-21', weight:'05-10-21', symbol: 'true'},
];


@Component({
  selector: 'app-sms-campaign',
  templateUrl: './sms-campaign.component.html',
  styleUrls: ['./sms-campaign.component.css']
})
export class SmsCampaignComponent implements OnInit {
  //Render var 
  @Input() renderCreateCampaign=false;
  // Create DaiDH
  @ViewChild('multiSelect',null) multiSelect;
  [x: string]: any;
  list : any[];
  @Input() adjustCSSQuery;
  dateRange: any;
  public loadContent: boolean = false;
  public name = 'Cricketers';
  public data = [];
  public settings = {};
  public selectedItems = [];
  

  //Campaign form
  form: FormGroup;


  createCampaignMessageForm(){
    this.form=this.formBuilder.group({
      campaigObjective:[''],
      campaignMessage:[''],
    });
  }
  constructor(private router: Router,private formBuilder: FormBuilder) { 
    //For Check box letter
    this.list = 
      [
        {name :'India',checked : false},
        {name :'US',checked : false},
        {name :'China',checked : false},
        {name :'France',checked : false}
      ]

    //Initalize form group
    //this.createCampaignMessageForm();  
  }
  panelOpenState = false;

  /**
   * All table variable listing campaigns status,channels, and campaign messages
   * */
  //start table vars declartion
  //columns
  displayedColumns: string[] = ['Channel', 'Start time', 'Created time', 'Sent'];
  dataSource = ELEMENT_DATA;

  //Channels
  Channels: Channel[] = [
    {value: 'steak-0', viewValue: 'Sms'},
    {value: 'pizza-1', viewValue: 'Notification'},
    {value: 'tacos-2', viewValue: 'in app'}
  ];



  //Deliveries
  Deliveies: Delivery[] =[
    {value: 'steak-0', viewValue: 'One Time'},
    {value: 'pizza-1', viewValue: 'Inaction'},
    {value: 'tacos-2', viewValue: 'Action'},
    {value: 'tacos-2', viewValue: 'On a date'}
  ]

  //Status 
  Statuses: Status[] =[
    {value: 'Scheduled-0', viewValue: 'Scheduled'},
    {value: 'Running-1', viewValue: 'Running'},
    {value: 'Stopped-2', viewValue: 'Stopped'},
    {value: 'Completed-2', viewValue: 'Completed'},
    {value: 'Approval pending-2', viewValue: 'Approval pending'},
    {value: 'Draft-2', viewValue: 'Draft'},
    {value: 'Awaiting Next Run2', viewValue: 'Awaiting Next Run'},
  ]

  ////start table vars declartion

  //Drop downs vars
  shareCheckedList(item:any[]){
    console.log(item);
  }
  shareIndividualCheckedList(item:{}){
    console.log(item);
  }

  ngOnInit() {
    //This are the type of channels available
    this.data = [
      { item_id: 1, item_text: 'SMS' },
      { item_id: 2, item_text: 'PUSH NOTIFICATION' },
      { item_id: 3, item_text: 'EMAIL' },
      { item_id: 4, item_text: 'IN APP' },
    ];
    // setting and support i18n
    this.settings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'ALL',
      unSelectAllText: 'UN SELECT',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'CHANNEL',
      noDataAvailablePlaceholderText: 'NO DATA PRESENT',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.setForm();
  }
  public setForm() {
    this.form = new FormGroup({
      campaigObjective:new FormControl('',null),
      campaignMessage:new FormControl('',null),
      name: new FormControl(this.data, null)
    });
    this.loadContent = true;
  }
  get f() {
    return this.form.controls;
  }

  public save() {
    console.log('save == ',this.form.value);
  }

  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    this.setForm();
    this.multiSelect.toggleSelectAll();
    // i try below variable isAllItemsSelected reference from your  repository but still not working
    // this.multiSelect.isAllItemsSelected = true;
  }

  public onFilterChange(item: any) {
    console.log('onFilter change ',item);
  }
  public onDropDownClose(item: any) {
    console.log('onDropDown change ',item);
  }

  public onItemSelect(item: any) {
    console.log('onItemSelect ',item);
  }
  public onDeSelect(item: any) {
    console.log('onDeSelect ',item);
  }

  public onSelectAll(items: any) {
    console.log('onSelectAll ',items);
  }
  public onDeSelectAll(items: any) {
    console.log('onDeSelectAll ',items);
  }

//Class functions
@HostListener('window:resize', ['$event'])
onResize(event) {
  this.adjustCSSQuery = event.target.innerWidth;
  console.log(`width == ${this.adjustCSSQuery}`)
}

//Date Range
getDateRange(event: any){
  // look at how the date is emitted from save
  console.log(event.target.value.begin);
  console.log(event.target.value.end);

  // change in view
  this.dateRange = event.target.value;
  console.log("Date Range object ",JSON.stringify(this.dateRange,null,2))
}

//Create campaing messages 
CreateCampaignMessage(){
  console.log("Create Campaign message ...")
  this.renderCreateCampaign==false ? this.renderCreateCampaign=true : this.renderCreateCampaign=false;
  //this.renderCreateCampaign=true;
 
}
//Create campaign type
Redirect(){
  console.log("Button working ...")
  this.router.navigate(["home/create-campaign"]);
}
//submit campaign form
onSubmit(){
  console.log("submit form campaign form \n",JSON.stringify(this.form.value,null,2))
}

//Multi select functions



}
