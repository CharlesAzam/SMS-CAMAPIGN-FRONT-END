import { Component, Inject } from "@angular/core";
import { FormBuilder,  FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { ReportService } from "../reports.service";
import { Subject, ReplaySubject } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
import * as _ from "lodash";

@Component({
  selector: "vendor-dialog",
  templateUrl: "vendor-dialog.component.html",
})
export class VendorDialogComponent {
  vendorForm = new FormGroup({
    user: new FormControl("", [Validators.required]),
    frequency: new FormControl("", [Validators.required]),
    reportType: new FormControl("", [Validators.required]),
    header: new FormControl("", [Validators.required]),
    body: new FormControl("", [Validators.required]),
    reportFormat: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required]),
    subType:  this.fb.array([])
  });
  loading: boolean = false;
  frequencies: String[] = ["DAILY", "WEEKLY", "MONTHLY", "QUATERLY", "YEARLY"];
  users: any[] = [];
  reportTypes: String[] = [
    "REG_SUM",
    "CNT_REG_SUM",
    "COLL_SUM",
    "COLL_DET",
    "TRNCS_SUM",
    "REFUND_ACCEPT",
    "REVENUE_RECOGNITION",
    "INVOICE",
    "PACKAGE_SUBSCRIPTION",
    "PACKAGE_SUBSCRIPTION_AZAM",
    "PACKAGE_SUBSCRIPTION_NON_AZAM",
    "CONTENT_SUBSCRIPTION_AZAM",
    "CONTENT_SUBSCRIPTION_NON_AZAM",
    "CONTENT_SUBSCRIPTION_AZAM_DURATION",
    "CONTENT_SUBSCRIPTION_NON_AZAM_DURATION",
    "REVENUE_PACKAGE_WISE"
  ];
  reportFormats: String[] = ["XLSX"];
  vendorStatus: String[] = ["ACTIVE", "SUSPENDED"];

  //Vendor Information
  vendorInformation: Object = null;

  filterUsersCtrl: FormControl = new FormControl();
  filterFormatsCtrl: FormControl = new FormControl();
  filteredUsers: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredFormats: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  //subtypes
  reportSubtype : Object ={} ;
  packageName :String[] = ["PACKAGE_SUBSCRIPTION",
  "PACKAGE_SUBSCRIPTION_AZAM",
  "PACKAGE_SUBSCRIPTION_NON_AZAM","REVENUE_PACKAGE_WISE"];

  contentName: String[] = [
    "CONTENT_SUBSCRIPTION_AZAM",
    "CONTENT_SUBSCRIPTION_NON_AZAM",
    "CONTENT_SUBSCRIPTION_AZAM_DURATION",
    "CONTENT_SUBSCRIPTION_NON_AZAM_DURATION"
  ];
  
  filterUsers() {
    if (!this.users) return;

    let search: string = this.filterUsersCtrl.value;
    if (!search) {
      this.filteredUsers.next(this.users.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredUsers.next(
      this.users.filter(
        (user) => user.customerName.toLowerCase().indexOf(search) > -1
      )
    );
  }

  filterFormats() {
    if (!this.reportFormats) return;

    let search: string = this.filterFormatsCtrl.value;
    if (!search) {
      this.filteredFormats.next(this.reportFormats.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredFormats.next(
      this.reportFormats.filter(
        (format) => format.toLowerCase().indexOf(search) > -1
      )
    );
  }

  filterReportTypeCtrl: FormControl = new FormControl();
  filteredReportTypes: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  filterReportTypes() {
    if (!this.reportTypes) return;

    let search: string = this.filterReportTypeCtrl.value;
    console.log("-------------SEARCH----------",search);
    if (!search) {
      this.filteredReportTypes.next(this.reportTypes.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredReportTypes.next(
      this.reportTypes.filter(
        (reportType) => reportType.toLowerCase().indexOf(search) > -1
      )
    );
  }

  constructor(
    public dialogRef: MatDialogRef<VendorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reportService: ReportService,
    private fb:FormBuilder
  ) {
    if (data) {
      this.vendorInformation = {};
      Object.assign(this.vendorInformation, data);
      console.log("EDIT",data)
      this.vendorForm.removeControl("user");
      this.vendorForm.addControl(
        "email",
        new FormControl({ value: "", disabled: true })
      );
      this.vendorForm.addControl(
        "username",
        new FormControl({ value: "", disabled: true })
      );
      this.vendorForm.addControl(
        "subType",
        new FormArray([])
      )
      this.vendorForm.setValue({
        frequency: data.frequency,
        reportType: data.reportType,
        header: data.header,
        body: data.body,
        reportFormat: data.reportFormat[0],
        email: data.email,
        username: data.username,
        status: data.status,
        subType: []
      });
    }
    this.getUsers();
    this.fetchReportSubtypes();
    this.filteredReportTypes.next(this.reportTypes.slice());
    this.filteredFormats.next(this.reportFormats.slice());
  }

  getUsers() {
    this.reportService.getVendorUsers().subscribe((response: any) => {
      if (response.success) {
        this.users = response.data;
        this.filteredUsers.next(this.users);
      } else {
      }
    });
  }

  fetchReportSubtypes(){
    this.reportService.fetchReportSubtypes().subscribe((response: any) => {
      console.log("fetchReportSubtypes",response);
      if (response.success) {
         Object.assign(this.reportSubtype, response.data);
         if(this.vendorInformation && this.vendorInformation["email"] !== '')
            this.manageSubType(this.vendorInformation)
      }
    });
  }

  manageVendor() {
    this.loading = true;
    console.log("this.vendorForm.value",this.vendorForm.value);
    const vendorFormValues = this.vendorForm.value;
    if(vendorFormValues){
      if(vendorFormValues.subType && vendorFormValues.subType.length !== 0){
        vendorFormValues.subType.map((val) =>{
          if(val.name.length === 0){
              _.remove(vendorFormValues.reportType,function(v){ return v === val.reportType});
              _.remove(vendorFormValues.subType,function(v){ return v["reportType"] === val.reportType});
          }
        })
      }
    }
    if (this.vendorInformation) {
      Object.assign(this.vendorInformation, this.vendorForm.value);
      this.vendorInformation["reportFormat"] = [
        this.vendorForm.value["reportFormat"],
      ];
      this.reportService
        .updateVendorConfiguration(this.vendorInformation)
        .subscribe((response: any) => {
          this.loading = false;
          if (response.success) {
            this.dialogRef.close(this.vendorInformation);
          }
        }, (error) =>{
          this.loading = false;
        });
    } else {
      let vendor = this.vendorForm.value;
      vendor["email"] = vendor.user.vendorEmail;
      vendor["username"] = vendor.user.username;
      vendor["companyName"] = vendor.user.vendorCompanyName;
      vendor["reportFormat"] = [this.vendorForm.value["reportFormat"]];
      delete vendor.user;
      this.reportService
        .createVendorConfiguration(vendor)
        .subscribe((response: any) => {
          this.loading = false;
          if (response.success) {
            this.dialogRef.close(vendor);
          }
        }, (error) =>{
          this.loading = false;
        });
    }
  }

  getData() {
    if (this.vendorInformation !== null) {
      Object.assign(this.vendorInformation, this.vendorForm.value);
      return this.vendorInformation;
    } else {
      return this.vendorForm.value;
    }
  }

  subtypeName : Object[] = [];

  get subType() {
    return this.vendorForm.get("subType") as FormArray;
  }

  subTypeAttr(): FormGroup {
    return this.fb.group({
      reportType:"",
      name:[]
    });
  }

  reportSubtypeCategory (name){
    const pkgCategory = this.packageName.find(pkg => pkg === name);
    const contentCategory = this.contentName.find(pkg => pkg === name);
    return pkgCategory ? "package" : "content";
  }

  filterList(ctrlnm, obj, dupArray) {
    if (!dupArray.name || dupArray.name.length === 0) return;

    let search = ctrlnm.value;
    // console.log("filterList",search,ctrlnm,obj.name, dupArray.name,obj.name)
    if (!search) {
      obj.name = dupArray.name;
      return;
    } else {
      search = search.toLowerCase();
    }

    obj.name = dupArray.name.filter(txt => txt.toLowerCase().indexOf(search) > -1)
  }

  reportNamesArray : Object[] = [];
  copyOf_reportNamesArray : Object[] = [];
  protected _onDestroy = new Subject<void>();

  pushInSubtypeFormControl(lastValue){
    if(this.reportSubtype[lastValue] && this.reportSubtype[lastValue].length !== 0){
      this.subType.push(this.subTypeAttr());
      const subtypeSize = this.subType.length;
      this.subType.at(subtypeSize -1 ).setValue({"reportType":lastValue, "name":this.reportSubtype[lastValue]})
      
      this.onSearchEvent(lastValue,null);
    }
    
  }

  onReportTypeChange(values){
    // console.log(values);
    if(Object.entries(this.reportSubtype).length === 0)
      return;
    let lastValue = values[values.length - 1];
    
      if(this.subType.controls.length !== 0){
        const existOptions =  _.map(this.reportNamesArray, 'reportType');
        const diff= _.difference(values,existOptions);
        // console.log(values,existOptions,diff);
        if(diff && diff.length !== 0){
          //ADD ITEM ON CHECK
          if(diff.length === 1){
            lastValue = diff[0];
            this.pushInSubtypeFormControl(lastValue);
          }else{
            lastValue = diff.find(val => this.reportSubtype[val] !== undefined )
            // console.log("1.....",lastValue);
            if(lastValue){
              this.pushInSubtypeFormControl(lastValue);
            }
            
          }
         
        }
       for(let i=0; i<=this.subType.controls.length - 1;i++){
          let reportVal = this.subType.controls[i].value;
          const existVal = values.find(v => v === reportVal.reportType);
          // console.log("existVal",reportVal.name,existVal)

          //TO REMOVE ITEM ON UNCHECK
          if(!existVal){
            this.subType.removeAt(i);
            const checkExistInReportArray = _.findIndex(this.reportNamesArray, function(o) {
              return o["reportType"] ===  reportVal.reportType
            });
            if(checkExistInReportArray !== -1)
              this.reportNamesArray.splice(checkExistInReportArray,1);

            const checkExistInDupArray = _.findIndex(this.copyOf_reportNamesArray, function(o) {
                return o["reportType"] ===  reportVal.reportType
              });
            if(checkExistInDupArray !== -1)
              this.copyOf_reportNamesArray.splice(checkExistInReportArray,1);
            // console.log("checkExistInReportArray",checkExistInReportArray)
          }
        }
      }else{
        if(this.reportSubtype[lastValue] && this.reportSubtype[lastValue].length !== 0){
          this.subType.push(this.subTypeAttr());
          this.subType.setValue([{"reportType":lastValue, "name":this.reportSubtype[lastValue]}]);
          this.onSearchEvent(lastValue,null);
        }
        
      }
    // }
    
  }
  

  onSearchEvent(lastValue,nameArray){
    let fcObject = {"reportType":lastValue, 
            "name": this.reportSubtype[lastValue], 
            "type":this.reportSubtypeCategory(lastValue),
            "ctrlName":this["ctrl_" + lastValue] = new FormControl('')
          };

    this.reportNamesArray.push(fcObject);
    this.copyOf_reportNamesArray.push(Object.assign({},fcObject))
    // console.log(this.subType.controls[0].value,this.reportNamesArray)
    fcObject.ctrlName.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
     
      let idx = _.findIndex(this.reportNamesArray,function(rpt){
        return rpt["ctrlName"] === fcObject.ctrlName;
      })

      let dupArray = _.findIndex(this.copyOf_reportNamesArray,function(rpt){
        return rpt["ctrlName"] === fcObject.ctrlName;
      })
      
      this.filterList(fcObject.ctrlName,this.reportNamesArray[idx],this.copyOf_reportNamesArray[dupArray]);
    });
  }
  
  manageSubType(data){
    // console.log("----here",data.subType,this.reportSubtype);
    const subtype = data.subType;
    for(let i =0; i<= subtype.length -1 ;i++){
      if(this.reportSubtype[subtype[i].reportType] && this.reportSubtype[subtype[i].reportType].length !== 0){
        // console.log("1",subtype[i],this.reportSubtype[subtype[i].reportType])
        this.subType.push(this.subTypeAttr());
        let lastValue = subtype[i].reportType;
        this.subType.at(i).setValue({"reportType":lastValue, "name":subtype[i].name});
        this.onSearchEvent(lastValue,this.reportSubtype[lastValue]);
      }
    }
    if(data.reportType.length !== 0){
      const selectedRT = data.reportType;
      for(let i =0;i<= selectedRT.length - 1;i++){
        if(subtype && subtype.length !== 0){
          const isExist = _.findIndex(subtype,function(v){
            return v["reportType"] === selectedRT[i]
          });
          // console.log("isExist",isExist);
          if(isExist === -1){
            this.pushInSubtypeFormControl(selectedRT[i]);
          }
        }else{
          this.pushInSubtypeFormControl(selectedRT[i]);
        }
      }
    }
    
  }
}
