import { HostListener, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
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
  list : any[];
  @Input() adjustCSSQuery;
  constructor() { 
    //For Check box letter
    this.list = 
      [
        {name :'India',checked : false},
        {name :'US',checked : false},
        {name :'China',checked : false},
        {name :'France',checked : false}
      ]
  }
  panelOpenState = false;

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

  shareCheckedList(item:any[]){
    console.log(item);
  }
  shareIndividualCheckedList(item:{}){
    console.log(item);
  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.adjustCSSQuery = event.target.innerWidth;
  console.log(`width == ${this.adjustCSSQuery}`)
}

}
