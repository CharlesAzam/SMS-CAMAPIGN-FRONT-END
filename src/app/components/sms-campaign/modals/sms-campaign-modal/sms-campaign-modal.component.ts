import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { SmsCampaignService } from "../../../../services/sms-campaign.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatSort, PageEvent } from "@angular/material";
import {
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import * as moment from "moment";

export interface campaignUser {
  username: string;
  currentStage: string;
  customerJoinedAt: string;
  mobileNumber: string;
}

export interface campaignOperations {
  sentMessages: any;
  pendingMessages: any;
  // successRate: string;
  // isFullysent: Boolean;
  // campaignDurationCount: string;
  // remainingDurationCount: string;
  // totalCampaignStages: string;
}
@Component({
  selector: "app-sms-campaign-modal",
  templateUrl: "./sms-campaign-modal.component.html",
  styleUrls: ["./sms-campaign-modal.component.css"],
})
export class SmsCampaignModalComponent implements OnInit {
  @Input() message: string = "Are you sure you want to delete this item?";
  @Input() confirmButtonText = "Yes";
  @Input() cancelButtonText = "Cancel";
  @Input() renderFormType: any;
  @Input() formDetails: any;
  private payload: any;

  //Create update form variables start
  //message form
  form: FormGroup;
  //campaign
  campaignForm: FormGroup; //Campaign From group
  campaignStages: FormArray; //stages form array
  @Input() isMultipleDate: boolean;
  @Input() isReccuring: boolean;
  @Input() displayCalendar: boolean;
  @Input() HideSMSForm: boolean;
  @Input() DisplayOtherFrom: boolean;
  @Input() showCompose: boolean;
  @Input() renderCreateCampaign = true;
  @Input() RunType: string;
  @Input() mappedMessages = [];
  @Input() EDIT_MESSAGE = [];

  //isPesonalized
  @Input() isPersonalized: any;
  @Input() TextAreaMessage: string;
  @Input() TextAreaMessageCount: number;
  @Input() isPersonalMessageError: boolean;

  @Input() errorMessageMapping: string;
  @Input() DuplicateValueFlag: boolean;

  @Input() beginDate: any;
  @Input() endDate: any;
  @Input() panelOpenState = false;

  public RuntimeTypes = ["OneTime", "MultipleDates", "Recurring"];
  public SelectedRuntimeType: string;
  public data: any[];
  public dataz: any[];
  public settings = {};
  public settings2 = {};
  public loadContent: boolean = false;
  public dateRange: any;
  public cleanData = [];
  public currentMappedMessage = [];
  private campaignId:string;
  private TableData:any;

  //CamapaigDetails Table Variables global declaration
  campaignUserDataSource = new MatTableDataSource<campaignUser>([]);
  campaignOperationDataSource:any;


/*
 * Table columns data 
 */

//Campaign user table header

displayedColumnsCampaign: string[] =[
  'USER NAME',
  'CURRENT STAGE',
  'CUSTOMER JOINED AT',
  'MOBILE NUMBER',
]

//Campaign operation table header
displayedColumnsCampaignOperation: string[] =[
  'SENT MESSAGE',
  'PENDING MESSAGE',
  // 'SUCCESS RATE',
  // 'IS FULLY SENT',
  // 'CAMPAIGN DURATION',
  // 'REMAINING DURAITON',
  // 'TOTAL STAGES',
]

  // Create DaiDH
  @ViewChild("multiSelect", null) multiSelect: { toggleSelectAll: () => void };

  //end

  constructor(
    private campaingServie: SmsCampaignService,
    @Inject(MAT_DIALOG_DATA) private data1: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SmsCampaignModalComponent>,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      //  console.log("Router events \n", event)
      // if (event instanceof NavigationEnd) {
      //    // Trick the Router into believing it's last link wasn't previously loaded
      //    this.router.navigated = false;
      // }
    });
    if (data1) {
      this.message = data1!.message || this!.message;
      this.payload = data1!.payload;
      this.formDetails = { ...data1.payload };
      this.isPersonalized = this.formDetails!.isPersonalized == true ? "YES" : "NO";
      this.campaignId = data1!.payload!.camnpaignId;
      this.campaignUserDataSource = new MatTableDataSource<campaignUser>(data1!.payload!.tableData!.userTableData)
      this.campaignOperationDataSource = data1!.payload!.tableData!.campaignTableData//new MatTableDataSource<campaignOperations>(data1!.payload!.tableData!.campaignTableData)
 
      this.RunType = this.formDetails!.RunTimeType;
      this.isReccuring = data1!.payload!.isReccuring;
      //console.log("payload \n", JSON.stringify(data1!.payload, null, 2));
      //console.log(" this.campaignId ===  ",this.campaignId)
      console.log("campaign operational data == ",this.campaignOperationDataSource)
      //console.log("table.data.user == ", this.campaignUserDataSource)
      // console.log(`modal data Objective = `, data1!.payload!.Objective);
      // console.log(`modal data type = `, data1!.payload!.type);
      // console.log(`modal MappedCampaing = `, data1!.payload!.campaignStages);
      // console.log(`modal MappedMessage = `, data1!.payload!.MappedMessage);
      // console.log(`modal isPersonalized = `, data1!.payload!.isPersonalized);
      this.currentMappedMessage = data1!.payload!.MappedCampaing;
      this.renderFormType = data1!.payload!.type;
      if (data1.buttonText) {
        this.confirmButtonText = data1.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText =
          data1.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  ngOnInit() {
    //Settings for campaign form drop down
    this.settings = {
      singleSelection: true,
      idField: "_id",
      textField: "Message",
      enableCheckAll: false,
      selectAllText: "ALL",
      unSelectAllText: "UN SELECT",
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: "SEARCH MAPPED MESSAGE",
      noDataAvailablePlaceholderText: "NO DATA PRESENT",
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    //Settings for message form drop down
    this.settings2 = {
      singleSelection: false,
      idField: "_id",
      textField: "Message",
      enableCheckAll: true,
      selectAllText: "ALL",
      unSelectAllText: "UN SELECT",
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: "SEARCH CAMPAIGN MESSAGES",
      noDataAvailablePlaceholderText: "NO DATA PRESENT",
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    //This is willl be all the messages available
    // this.dataz = [
    //   { item_id: 1, item_text: "MSG1" },
    //   { item_id: 2, item_text: "MSG2" },
    //   { item_id: 3, item_text: "MSG3" },
    //   { item_id: 4, item_text: "MSG4" },
    // ];

    //This is willl be all the campaign channels available
    this.data = [
      { item_id: 1, item_text: "SMS" },
      { item_id: 2, item_text: "PUSH NOTIFICATION" },
      { item_id: 3, item_text: "EMAIL" },
      { item_id: 4, item_text: "IN APP" },
    ];


    this.getMessageList(1, 100);
    this.setForm(this.renderFormType);
    //console.log("i = ",JSON.stringify(this.formDetails.campaignStages.stages,null,2))
    if (
      this.formDetails!.campaignStages!.stages !== null &&
      this.formDetails!.campaignStages!.stages !== undefined
    ) {
      console.log(`initializing table to form data tranfer for stages.... `);
      let stages: any[] = this.formDetails!.campaignStages!.stages;
      console.log(
        "i = ",
        JSON.stringify(this.formDetails!.campaignStages, null, 2)
      );

      stages.forEach((stageItem, index) => {
        console.log(
          `stage from ${stageItem!.from} to ${stageItem!.to} mappedMessages ${
            stageItem.mappedMessages.Message != undefined
              ? stageItem.mappedMessages.Message
              : stageItem.mappedMessages
          } item index >>> `,
          index
        );
        this.campaignStagez.push(
          this.newDynamicCampaign(
            stageItem.from,
            stageItem.to,
            stageItem.mappedMessages.Message != undefined
              ? stageItem.mappedMessages.Message
              : stageItem.mappedMessages
          )
        );
        this.EDIT_MESSAGE[index] =
          stageItem.mappedMessages.Message != undefined
            ? stageItem.mappedMessages.Message
            : stageItem.mappedMessages;
        this.mappedMessages.push(
          stageItem.mappedMessages.Message != undefined
            ? stageItem.mappedMessages.Message
            : stageItem.mappedMessages
        );
      });
    }

    console.log(
      ">>>>>>> Check form value for capaign \n",
      this.formDetails.RunTimeType
    );
    if (
      this.formDetails.RunTimeType == this.RuntimeTypes[0] ||
      this.formDetails.RunTimeType == this.RuntimeTypes[1]
    ) {
      this.displayCalendar = true;
      this.isReccuring = false;
    }
    if (this.formDetails.RunTimeType[0] == this.RuntimeTypes[2]) {
      this.displayCalendar = false;
      this.isReccuring = true;
    }
  }

  //Fetch campaign data for service
  getCampignList(pageIndex: any, pageSize: any) {
    this.campaingServie.getCampaign(pageIndex, pageSize).subscribe(
      (response: any) => {
        console.log("Received payload from get request campaigns", response);
        if (response.status === 200) {
          console.log("Response Data");
          //TODO ADD SNACK BAR FOR SUCCESS
          //this.snackOpen.openSnackBar(response.status,response.message)
          console.log("Response data >>>>>> \n", response.data);
          //this.data = response.data
          //this.dataSource = new MatTableDataSource<any>(response.data);
          // this.messageCount = response.count;
          //console.log("Result Count >>>>>> ",this.messageCount)
        } else {
          //TODO ADD SNACK BAR FOR SUCCESS
          console.log("Received payload", JSON.stringify(response, null, 2));
          //this.snackOpen.openSnackBar(response.status,response.message)
        }
      },
      (error) => console.log(error)
    );
  }

  //Fetch message list for drop down
  getMessageList(pageIndex: any, pageSize: any) {
    this.campaingServie.getMessages(pageIndex, pageSize).subscribe(
      (response: any) => {
        //console.log("Received payload from get request messages",response);
        if (response.status === 200) {
          // console.log("Response Data")
          //TODO ADD SNACK BAR FOR SUCCESS
          //this.snackOpen.openSnackBar(response.status,response.message)
          //console.log("Response data >>>>>> \n",response.data);
          this.dataz = response.data;
          //this.messageCount = response.count;
          // console.log("Result Count >>>>>> ",this.messageCount)
        } else {
          //TODO ADD SNACK BAR FOR SUCCESS
          console.log("Received payload", JSON.stringify(response, null, 2));
          //this.snackOpen.openSnackBar(response.status,response.message)
        }
      },
      (error) => console.log(error)
    );
  }

  onConfirmClick(type: string): void {
    //Launch service to call back end in modal
    if (type == "create-message") {
      console.log(
        `create message ${type} + \n ${JSON.stringify(
          this.payload.name,
          null,
          2
        )}`
      );
      let mappedMessages = this.payload.name.map((data) => {
        return data.item_text;
      });

      this.campaingServie
        .createCampaingMessage({
          mappedMessages: mappedMessages,
          ...this.payload,
        })
        .subscribe(
          (response: any) => {
            console.log("Received payload", response);
            if (response.status === 200) {
              console.log("Response Data");
              //TODO ADD SNACK BAR FOR SUCCESS
              this._snackBar.open(response.status, response.message, {
                duration: 1000,
              });
              this.cancel();
              this.router.navigate([this.router.url]);
            } else {
              //TODO ADD SNACK BAR FOR SUCCESS
              this._snackBar.open(response.status, response.message, {
                duration: 1000,
              });
              this.cancel();
              this.router.navigate([this.router.url]);
            }
          },
          (error) => console.log(error)
        );
    } else if (type == "create-campaign") {
      console.log(`create campaign ${type} `);
      this.campaingServie.createCampaingChannel(this.payload).subscribe(
        (response: any) => {
          console.log("Received payload", response);
          console.log("Received payload", response);
          if (response.status === 200) {
            console.log("Response Data");
            //TODO ADD SNACK BAR FOR SUCCESS
            this._snackBar.open(response.status, response.message, {
              duration: 1000,
            });
            this.cancel();
            this.router.navigate([this.router.url]);
          } else {
            //TODO ADD SNACK BAR FOR SUCCESS
            this._snackBar.open(response.status, response.message, {
              duration: 1000,
            });
            this.cancel();
            this.router.navigate([this.router.url]);
          }
        },
        (error) => console.log(error)
      );
    }
  }

  onUpdate(type: string) {
    if (type == "update-message") {
      console.log(`create message ${type} `);
      console.log(
        `this.form.get('name').value >>>>> ${this.form.get("name").value}`
      );
      let mappedMessages = [];
      if (this.form.get("name").value != null) {
        mappedMessages = this.form.get("name").value.map((data: any) => {
          console.log(`${data} + Message ${data.Message}`);
          return { Message: data.Message };
        });
      }
      let user = JSON.parse(localStorage.getItem("currentUser"));
      // console.log(`mappedMessages >>>>> ${mappedMessages}`)
      // console.log(`on update type  --> ${type} `,{_id:this.payload._id,normalMessage:mappedMessages,...this.form.value})
      // return
      this.campaingServie
        .updateCampaingMessage({
          _id: this.payload._id,
          normalMessage: mappedMessages,
          ...this.form.value,
          createdBy: user.userInfo.username,
        })
        .subscribe(
          (response: any) => {
            console.log("Received payload", response);
            if (response.status === 200) {
              console.log("Response Data");
              //TODO ADD SNACK BAR FOR SUCCESS
              this._snackBar.open(response.status, response.message, {
                duration: 1000,
              });
              this.cancel();
              this.router.navigate([this.router.url]);
            } else {
              //TODO ADD SNACK BAR FOR SUCCESS
              this._snackBar.open(response.status, response.message, {
                duration: 1000,
              });
              this.cancel();
              this.router.navigate([this.router.url]);
            }
          },
          (error) => console.log(error)
        );
    } else if (type == "update-campaign") {
      console.log(`create message ${type} `);
      //console.log(`on update  type Before Values --> ${type} \n`,JSON.stringify(this.campaignForm.value,null,2))
      //console.log("update payload ",JSON.stringify(this.formDetails,null,2))

      // let mappedMessages = []
      // if(this.campaignForm.get('campaignStages').get('stage').value!=null){
      //     mappedMessages = this.campaignForm.get('campaignStages').get('stages').value.map((data:any,index)=>{
      //     console.log(`loop map Message ${JSON.stringify(data,null,2)}`)
      //     return {_id:index++,Message:data.mappedMessages};
      //   })
      // }
      //this.campaignForm.get("normalMessage").setValue(mappedMessages);
      // let user = JSON.parse(localStorage.getItem("currentUser"));
      console.log(
        `this.campaignForm.get('mappedMessages').value >>>>> ${JSON.stringify(
          this.campaignForm.value,
          null,
          2
        )}`
      );
      // console.log(`mappedMessages >>>>> ${mappedMessages}`)
      // console.log(`on update type  --> ${type} `,{_id:this.payload._id,normalMessage:mappedMessages,...this.campaignForm.value,isReccuring:this.isReccuring})
      this.campaingServie
        .updateCampaingChannel({
          _id: this.payload._id,
          ...this.campaignForm.value,
          isReccuring: this.isReccuring,
        })
        .subscribe(
          (response: any) => {
            //  console.log("Received update-campaign payload",response);
            //  return
            if (response.status === 200) {
              console.log("Response Data");
              //TODO ADD SNACK BAR FOR SUCCESS
              this._snackBar.open(response.status, response.message, {
                duration: 2000,
              });
              this.cancel();
              this.router.navigate([this.router.url]);
            } else {
              //TODO ADD SNACK BAR FOR SUCCESS
              this._snackBar.open(response.status, response.message, {
                duration: 2000,
              });
              this.cancel();
              this.router.navigate([this.router.url]);
            }
          },
          (error) => console.log(error)
        );
    }
  }

  delete(type) {
    if (type == "delete-message") {
      console.log(
        type + " delete payload ",
        JSON.stringify(this.formDetails, null, 2)
      );
      //Call delete delete -message service
      this.campaingServie.deleteCampaingMessage(this.payload).subscribe(
        (response: any) => {
          console.log("Received payload", response);
          if (response.status === 200) {
            console.log("Response Data");
            //TODO ADD SNACK BAR FOR SUCCESS
            this._snackBar.open(response.status, response.message),
              {
                duration: 1000,
              };
            this.cancel();
            this.router.navigate([this.router.url]);
          } else {
            //TODO ADD SNACK BAR FOR SUCCESS
            console.log("Received payload", JSON.stringify(response, null, 2));
            this._snackBar.open(response.status, response.message),
              {
                duration: 1000,
              };
            this.cancel();
            this.router.navigate([this.router.url]);
            //this.snackOpen.openSnackBar(response.status,response.message)
          }
        },
        (error) => console.log(error)
      );
    } else if (type == "delete-campaign") {
      //console.log(type + " delete payload ",JSON.stringify(this.formDetails,null,2))
      //console.log(type + " delete payload ",JSON.stringify(this.payload,null,2))
      //return;
      this.campaingServie.deleteCampaingChannel(this.payload).subscribe(
        (response: any) => {
          console.log("Received payload", response);
          if (response.status === 200) {
            console.log("Response Data");
            this._snackBar.open(response.status, response.message, {
              duration: 1000,
            });
            this.cancel();
            this.router.navigate([this.router.url]);
            //TODO ADD SNACK BAR FOR SUCCESS
          } else {
            //TODO ADD SNACK BAR FOR SUCCESS
            this._snackBar.open(response.status, response.message, {
              duration: 1000,
            });
            this.cancel();
            this.router.navigate([this.router.url]);
          }
        },
        (error) => console.log(error)
      );
    }

    return;
  }

  public cancel() {
    this.dialogRef.close(true);
  }

  //Drop down function for messages start
  public onFilterChange(item: any) {
    console.log("onFilter change ", item);
  }
  public onDropDownClose(item: any) {
    console.log("onDropDown change ", item);
  }

  public onItemSelect(item: any) {
    console.log("onItemSelect ", item);
    console.log(
      "form control value this.formDetails.MappedCampaing ",
      this.formDetails.MappedCampaing
    );
    console.log(`currentMappedMessage ---> \n`, this.currentMappedMessage);

    //Check for duplicates maps
    status = this.currentMappedMessage.find((elem) => {
      return elem == item.item_text;
    });

    console.log("eqlity check " + item.item_text + " == " + status);
    if (status == undefined) {
      console.log("Flag duplicate error is false  ", status);
      this.DuplicateValueFlag = false;
    } else if (status !== undefined && item.item_text == status) {
      //flag duplicate error is false
      console.log(
        `Flag duplicate error is true  with value ${item.item_text}`,
        status
      );
      this.DuplicateValueFlag = true;
    }

    // if(this.DuplicateValueFlag!=true){
    //   this.currentMappedMessage.push(item) //you were the culprit
    //   this.form.get('name').setValue(this.currentMappedMessage);
    // }
  }

  public onDeSelect(item: any) {
    this.DuplicateValueFlag = false;
    console.log("onDeSelect ", item);
    console.log(
      "form value data  before \n",
      JSON.stringify(this.form.value, null, 2)
    );
    console.log(
      "currentMappedMessage data  before splice \n",
      JSON.stringify(this.currentMappedMessage, null, 2)
    );
    let index = this.currentMappedMessage.indexOf(item.item_text);
    if (index > -1) {
      this.currentMappedMessage.splice(index, 1);
      console.log("spliced array ", this.formDetails.MappedCampaing);
    }

    console.log(`index of selected item ${item.item_text} with ${index} `);
    console.log(
      "form value  data  after \n",
      JSON.stringify(this.form.get("name").value, null, 2)
    );
    console.log(
      "currentMappedMessage data after splice \n",
      JSON.stringify(this.currentMappedMessage, null, 2)
    );

    //this.form.get('name').setValue(this.currentMappedMessage);
  }

  public onSelectAll(items: any) {
    console.log("onSelectAll ", items);
    console.log(
      "form value data  before \n",
      JSON.stringify(this.form.value, null, 2)
    );
  }
  public onDeSelectAll(items: any) {
    console.log("onDeSelectAll ", items);
    console.log(
      "form value data  before \n",
      JSON.stringify(this.form.value, null, 2)
    );
  }
  //Drop down function for messages end

  // Drop down function for campaign start
  public onFilterChange2(item: any) {
    console.log("onFilter change ", item);
  }
  public onDropDownClose2(item: any) {
    console.log("onDropDown change ", item);
  }

  public onItemSelect2(item: any, i: number) {
    console.log(`onItemSelect ${i} `, item);

    console.log("onItemSelect ", item);
    console.log("Array index ", i);
    console.log("push item to data array");

    let controls = <FormArray>(
      (<FormGroup>this.campaignForm.get("campaignStages")).get("stage")
    );

    console.log("i = ", i);
    //this.campaignForm.get("campaignStages").get('normal').setValue(item)
    // controls2.controls[i].get('norma').setValue(item.Message)
    // console.log(`selected item array ---> \n`,controls.controls[i]);

    console.log("i = ", i);
    controls.controls[i].get("mappedMessages").setValue(item.Message);
    console.log(`selected item array ---> \n`, controls.controls[i]);
    console.log(
      `this.campaignForm.value ----> ${JSON.stringify(
        this.campaignForm.value,
        null,
        2
      )}`
    );
  }
  public onDeSelect2(item: any) {
    console.log("onDeSelect ", item);
    let indx: number; //Local index
    let arr = [];
    arr = this.formDetails.MappedCampaing;
    arr.forEach((objct, index) => {
      if (objct == item) {
        console.log(`item located ${index}`, item);
        indx = index;
      }
    });

    if (indx > -1) {
      this.formDetails.MappedCampaing.splice(indx, 1);
      console.log("spliced array ", this.formDetails.MappedCampaing);
    }
  }

  public onSelectAll2(items: any) {
    console.log("onSelectAll ", items);
    this.formDetails.MappedCampaing = [];
    this.formDetails.MappedCampaing = items;
  }
  public onDeSelectAll2(items: any) {
    console.log("onDeSelectAll ", items);
    this.formDetails.MappedCampaing = [];
  }
  //Drop down function for campigns end

  /*
  {
  "isReccuring": true,
  "campaigName": "ttoirthr",
  "channelType": "SMS",
  "RunTimeType": "Recurring",
  "recuringCampaignDuration": "3",
  "date": "",
  "normalMessage": "",
  "campaignStages": {
    "stage": [
      {
        "from": "1",
        "to": "3",
        "mappedMessages": {
          "item_id": 1,
          "item_text": "SMS"
        }
      }
    ]
  },
  "createdBy": "superadmin-local"
}
  */
  public setForm(type: string) {
    if (type === "message") {
      this.form = new FormGroup({
        campaigObjective: new FormControl(
          this.formDetails.Objective,
          Validators.required
        ),
        campaignMessage: new FormControl(
          this.formDetails.Message,
          Validators.required
        ),
        name: new FormControl(
          this.formDetails.MappedCampaing,
          Validators.required
        ),
        personalizeMessage: new FormControl(
          this.formDetails.isPersonalized,
          null
        ),
      });
      this.loadContent = true;
      return this.form;
    } else if (type === "campaign") {
      this.loadContent = true;
      this.dateRange = this.formDetails.date;
      console.log("date ", this.formDetails.date);
      return (this.campaignForm = this.formBuilder.group({
        campaigName: [this.formDetails.campaigName, Validators.required],
        channelType: [this.formDetails.channelType, Validators.required],
        RunTimeType: [this.formDetails.RunTimeType, Validators.required],
        recuringCampaignDuration: [this.formDetails.recuringCampaignDuration],
        date: [this.formDetails.date],
        normalMessage: [this.formDetails.normalMessage],
        campaignStages: this.formBuilder.group({
          stage: this.formBuilder.array([]),
        }),
      }));
    } else {
      return;
    }
  }

  onRadioChange(RuntimeType: any) {
    console.log("RuntimeType  >>>", RuntimeType);

    switch (RuntimeType) {
      case this.RuntimeTypes[0]:
        this.isReccuring = false;
        this.isMultipleDate = false; //set multilple date false
        this.displayCalendar = true; //set calendar true
        this.SelectedRuntimeType = this.RuntimeTypes[0]; // set RunTimeType
        console.log(
          `RunTime type ${this.RuntimeTypes[0]} isMuliselect ${this.isMultipleDate}`
        );
        break;
      case this.RuntimeTypes[1]:
        this.isReccuring = false;
        this.isMultipleDate = true; //set multiple date true
        this.displayCalendar == true;
        this.SelectedRuntimeType = this.RuntimeTypes[1]; //set RunTimeType
        console.log(
          `RunTime type ${this.RuntimeTypes[1]} isMuliselect ${this.isMultipleDate}`
        );
        break;
      case this.RuntimeTypes[2]:
        this.isReccuring = true;
        this.displayCalendar = false;
        this.isMultipleDate = false;
        this.displayCalendar = false;
        this.SelectedRuntimeType = this.RuntimeTypes[2]; //set RunTimeType
        console.log(
          `RunTime type ${this.RuntimeTypes[2]} isReccuring ${this.isReccuring}`
        );
        break;
      default:
        break;
    }
  }

  get f() {
    return this.form.controls;
  }
  get g() {
    return this.campaignForm.controls;
  }

  get campaignStagez(): any {
    const control = <FormArray>(
      (<FormGroup>this.campaignForm.get("campaignStages")).get("stage")
    );
    return control;
  }

  newCampaign(): FormGroup {
    return this.formBuilder.group({
      from: [""],
      to: [""],
      mappedMessages: [], //Messages mapped to channel and stage
    });
  }
  //Dynamic stage injection
  newDynamicCampaign(from: any, to: any, mappedMessage: any): FormGroup {
    console.log("Am i called ...");
    return this.formBuilder.group({
      from: [from],
      to: [to],
      mappedMessages: [mappedMessage], //Messages mapped to channel and stage
    });
  }
  //Create campaing stages form
  addCampaignStages(): void {
    this.campaignStagez.push(this.newCampaign());
    //return this.campaignStages=this.campaignForm.get('campaignStages') as FormArray;
  }

  //Remove Campaing stage form
  removeCapaingStage(i: number): void {
    this.campaignStagez.removeAt(i);
  }

  //Date Range
  getDateRange(event: any) {
    // look at how the date is emitted from save
    console.log(event.target.value.begin);
    console.log(event.target.value.end);

    // change in view
    this.dateRange = event.target.value;
    console.log("Date Range object ", JSON.stringify(this.dateRange, null, 2));
  }
  //Message Ispersonal message validation and injection
  //Ispoesonal Checkbox
  private _flagError: any;
  onChange(event: any) {
    console.log("show event showoptions() ==> ", event.checked);
    let flag = event.checked;
    flag != true ? (this.isPersonalized = "NO") : (this.isPersonalized = "YES");
    if (flag) {
      console.log(
        this.isPersonalized + " error value --------> ",
        this._flagError
      );
      if (this._flagError == -1) {
        console.log("Please add #### for pesonalized message");
        this.isPersonalMessageError = true;
      } else {
        this.isPersonalMessageError = false;
      }
    } else {
      console.log("IS THERE ANY ERROR --------> ", this.isPersonalized);
    }
  }

  setPersonalized(m: any) {
    //Get personalized message
    //Validate data
    console.log(
      this.isPersonalized +
        " <<<--- isPersonalized serach result m.search('####') ---->>> " +
        m.search("####")
    );
    this._flagError = m.search("####");

    this.TextAreaMessage = m;
    this.TextAreaMessage = m.replace("####", "John");
    console.log("message from event ", m);
    console.log("this is textArea message ", this.TextAreaMessage);
  }

  //CAMPAIGN OPERATION TABLE VALUES FUNCTIONS START
  //Apply Data filter to table listing composed messages
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("filterValue ",filterValue)
    this.campaignUserDataSource.filter = filterValue.trim().toLowerCase();
    this.campaignOperationDataSource.filter = filterValue.trim().toLowerCase();
    console.log("this.campaignUserDataSource.filter   >>>>",this.campaignUserDataSource.filteredData)
  }

  //Pagnation Change Event function for table camapaign users
  onPaginateChangeEvent1(event:PageEvent){
    let pageIndex = event.pageIndex
    let pageLength = event.length
    let pageSize = event.pageSize
    let pagePrevious = event.previousPageIndex
    pageIndex=pageIndex+1;
    console.log("onPaginateChangeEvent ",JSON.stringify(event,null,2))
    this.CampaignUsers(pageIndex,pageSize)

  }
  //Pagnation Change Event function for table camapaign operation
  onPaginateChangeEvent(event:PageEvent){
    let pageIndex = event.pageIndex
    let pageLength = event.length
    let pageSize = event.pageSize
    let pagePrevious = event.previousPageIndex
    pageIndex=pageIndex+1;
    console.log("onPaginateChangeEvent ",JSON.stringify(event,null,2))
  
    this.CampaignDetail(pageIndex,pageSize)
  }

  //table data fetching services 

  //getCampaign details in modal
  CampaignDetail(pageIndex:any,pageSize:any){

    //console.log(`id ${campaignID} show cmapign details \n ${JSON.stringify(0,null,2)}`)
    this.campaingServie.CampaignSchedulerDetail(this.campaignId,pageIndex,pageSize).subscribe((response: any) => {
       console.log("Received payload from get request for campaignOperation modal  >>>",JSON.stringify(response,null,2));
       if (response.success){
         this.campaignOperationDataSource=new MatTableDataSource<campaignOperations>(response);
         //console.log(`Response Data CampaignDetail ${JSON.stringify(SchedulerDetails,null,2)}`)
       
        }else{
         //TODO ADD SNACK BAR FOR SUCCESS
         console.log("Received payload",JSON.stringify(response,null,2));
         //this.snackOpen.openSnackBar(response.status,response.message)
        }
       
   }, error => console.log(error))
    
    //Display modal containing campaign details
    
  }

  //get user campaing details 
  CampaignUsers(pageIndex:any,pageSize:any){
    this.campaingServie.CampaignUserDetail(this.campaignId,pageIndex,pageSize).subscribe((response: any) => {
      console.log("Received request fetch camaping users >>>",JSON.stringify(response,null,2));
      if (response.success){
 
       this.campaignUserDataSource = new MatTableDataSource<campaignUser>(response);
        //console.log(`Response Data CampaignDetail ${JSON.stringify(SchedulerDetails,null,2)}`)
      
       }else{
        //TODO ADD SNACK BAR FOR SUCCESS
        console.log("Received payload",JSON.stringify(response,null,2));
        //this.snackOpen.openSnackBar(response.status,response.message)
       }
      
  }, error => console.log(error))
  }

  //CAMPAIGN OPERATION TABLE VALUES FUNCTIONS END
}
