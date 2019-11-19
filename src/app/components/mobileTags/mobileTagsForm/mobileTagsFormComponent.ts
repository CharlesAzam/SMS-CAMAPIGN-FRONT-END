import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MobileTags } from '../../../models/mobile-tags';
import {MobileTagsService} from '../../../services/mobile-tags.service';
@Component({
  selector: 'app-create-news-tag',
  templateUrl: './mobileTagsFormComponent.html',
  styleUrls: ['./mobileTagsFormComponent.css']
})
export class MobileTagFormComponent implements OnInit {

  constructor(private router: Router,
  private activatedRoute: ActivatedRoute, private createMobileTagService: MobileTagsService ) { }
  TagModel: MobileTags = new MobileTags();
  languages: string[] = ['English', 'Swahili'];
  Categories: string[] = ['RADIO', 'NEWS', 'TV GUIDE', 'VOD'];

  back() {
    console.log("To category list");
    this.router.navigate(['home/MobileTags']);

  }

  onSubmit() {
   // console.log("Submiting form" + JSON.stringify(this.TagModel))
   this.createMobileTagService.save(this.TagModel)
     .subscribe(
       data => console.log("success! ",data),
       error=>console.log("Error! ",error));
   
  }

  ngOnInit() {
    console.log("mdoel data " + JSON.stringify(this.TagModel));
  }



}
