import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {

  constructor() { }
  @Input() channel: string;
  ngOnInit() {
  }

  //Create Campaign for type sms,notification,in app

campaign(type:string){
  console.log("type ",type);
  this.channel=type;
 }

}
