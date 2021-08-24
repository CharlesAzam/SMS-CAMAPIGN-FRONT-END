import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-sms-campaign',
  templateUrl: './sms-campaign.component.html',
  styleUrls: ['./sms-campaign.component.css']
})
export class SmsCampaignComponent implements OnInit {
  list : any[];
  constructor() { 
    this.list = 
      [
        {name :'India',checked : false},
        {name :'US',checked : false},
        {name :'China',checked : false},
        {name :'France',checked : false}
      ]
  }
  panelOpenState = false;

  Channels: Channel[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  Deliveies: Delivery[] =[
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ]

  shareCheckedList(item:any[]){
    console.log(item);
  }
  shareIndividualCheckedList(item:{}){
    console.log(item);
  }

  ngOnInit() {
  }

}
