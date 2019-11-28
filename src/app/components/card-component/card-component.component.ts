import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent implements OnInit {

  constructor() {
    console.log(this.card_title)
  }
  

  viewItem(){
    console.log("Viewing item of "+this.card_title);
  }

  @Input() public card_title:String;
  @Input() public Image_src:String; 
  @Input() public card_notification: String;
  @Input() public notification_count: String;
  ngOnInit() {
    console.log(this.card_title)
  }

}
