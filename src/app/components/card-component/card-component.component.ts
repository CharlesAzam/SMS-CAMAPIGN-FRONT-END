import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent implements OnInit {

  constructor() {
    console.log(this.card_title)
  }
  
  @Input() public card_title:String;
  @Input() public Image_src:String;


  ngOnInit() {
  }

}
