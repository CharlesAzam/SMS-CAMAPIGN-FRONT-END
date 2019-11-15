import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) {

   }

   routeToChannelForm(){
    console.log("To category list");
    this.router.navigate(['home/ChannelsForm']);
    
  }

  ngOnInit() {
  }

}
