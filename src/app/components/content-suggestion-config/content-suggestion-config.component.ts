import { Component, OnInit } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ContentSuggestionService } from "../../services/suggestion.service";

@Component({
  selector: 'app-content-suggestion-config',
  templateUrl: './content-suggestion-config.component.html',
  styleUrls: ['./content-suggestion-config.component.css']
})
export class ContentSuggestionConfigComponent implements OnInit {
  suggestionForm = new FormGroup({
    country: new FormControl("", []),
    tags: new FormControl("", []),
    category: new FormControl("", []),
    subcategory: new FormControl("", []),
    maxWatchCount: new FormControl("", []),
    watchCountPerUser: new FormControl("", [])
  });
  data: any;
  countryVal: String ;
  suggestionFilters : any;
  isLoading: Boolean = true;
  
  constructor(public suggestionService:ContentSuggestionService) { 
    this.suggestionService.fetch().subscribe((response: any) => {
      console.log("fetch",response);
      this.isLoading = false;
      if (response.success && response.data) {
        if(response.data.length != 0){
          this.data = response.data[0];
          this.suggestionForm.setValue({
            country: String(this.data.country)? String(this.data.country) : '',
            tags: String(this.data.tags) ? String(this.data.tags) : '',
            category: String(this.data.category) ? String(this.data.category) : '',
            subcategory: String(this.data.subcategory) ? String(this.data.subcategory) : '',
            maxWatchCount: this.data.maxWatchCount,
            watchCountPerUser:this.data.watchCountPerUser
          });
          this.countryVal = String(this.data.country)? String(this.data.country) : 'false';
        }
      } else {
      }
    });
  }

  ngOnInit() {

  }

  submit(){
    this.isLoading = true;
    console.log("test",this.suggestionForm.value)
    this.suggestionFilters = this.suggestionForm.value;
    this.suggestionFilters.maxWatchCount = this.suggestionFilters.country === 'false' ?  0 : parseInt(this.suggestionFilters.maxWatchCount);
    this.suggestionService.save(this.suggestionFilters).subscribe((response: any) => {
      this.isLoading = false;
      console.log("Save",response);
    });
  }

  onValChange(value){
    console.log("onValChange",value);
    this.countryVal = value;
  }
}
