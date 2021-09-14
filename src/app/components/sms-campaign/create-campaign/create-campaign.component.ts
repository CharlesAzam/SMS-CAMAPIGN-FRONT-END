import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from  '@angular/forms';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  campaignForm: FormGroup
  public loadContent: boolean = false;
  public name = 'Cricketers';
  public data = [];
  public settings = {};
  public selectedItems = [];

  // Create DaiDH
  @ViewChild('multiSelect',null) multiSelect: { toggleSelectAll: () => void; };
  
  constructor(private formBuilder: FormBuilder) { }
  @Input() channel: string;
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

//Create Campaign for type sms,notification,in app

campaign(type:string){
  console.log("type ",type);
  this.channel=type;
 
}
private setForm() {
  this.campaignForm = new FormGroup({
    campaigObjective:new FormControl('',null),
    campaignMessage:new FormControl('',null),
    name: new FormControl(this.data, null)
  });
  this.loadContent = true;
}

get f() {
  return this.campaignForm.controls;
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

//submit campaign form
onSubmit(){
  console.log("submit form campaign form \n",JSON.stringify(this.campaignForm.value,null,2))
}



}
