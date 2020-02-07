import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil, startWith, tap } from "rxjs/operators";
import { CountryService } from "src/app/services/coutry.service";
import { SupportFilter } from "../../support/support-filter.model";
import { ReportService } from "../reports.service";
import * as moment from "moment";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

@Component({
  selector: "subscription-report",
  templateUrl: "./subscription-report.component.html",
  styleUrls: ["./subscription-report.component.css"]
})
export class SubscriptionReportComponent implements OnInit {
  filterMethodCtrl = new FormControl("");
  filterTypesCtrl = new FormControl("");
  range = new FormControl("");

  mobile = new FormControl("");
  protected _onDestroy = new Subject<void>();

  filter: SupportFilter;

  method: any;
  type: any;
  count: number;

  countries: any[] = [];
  methods: any[] = [
    { label: "Today", id: "today" },
    { label: "This Week", id: "week" },
    { label: "This Month", id: "month" },
    { label: "Date Range", id: "range" }
  ];

  types: any[] = [
    { label: "Package Subscription", id: "PACKAGE_SUBSCRIPTION_REPORTS" },
    { label: "Content Subscription", id: "CONTENT_SUBSCRIPTION_REPORTS" }
  ];
  filteredTypes: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredMethods: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  displayedColumns: string[] = [
    "No",
    "date",
    "openingBalance",
    "amountReceived",
    "subscriptionPurchase",
    "videoPurchase",
    "tvSeriesPurchase",
    "closingBalance",
    "smartCardTransfer"
  ];

  constructor(private reportService: ReportService) {}

  datasource = new MatTableDataSource<any>([]);

  ngOnInit() {
    this.filter = {};
    // this.getTransactionCount(this.filter)
    this.filteredMethods.next(this.methods.slice());
    this.filterMethodCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMethod();
      });

    this.filteredTypes.next(this.types.slice());
    this.filterTypesCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterType();
      });
  }

  filterMethod() {
    if (!this.methods) return;

    let search = this.filterMethodCtrl.value;
    if (!search) {
      this.filteredMethods.next(this.methods.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredMethods.next(
      this.methods.filter(cont =>
        cont ? cont.label.toLowerCase().indexOf(search) > -1 : ""
      )
    );
  }

  filterType() {
    if (!this.types) return;

    let search = this.filterTypesCtrl.value;
    if (!search) {
      this.filteredTypes.next(this.types.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredTypes.next(
      this.types.filter(cont =>
        cont ? cont.label.toLowerCase().indexOf(search) > -1 : ""
      )
    );
  }

  search() {
    this.filter = {};

    if (this.type) {
      this.filter.type = this.type;
    }
    if (this.method === "week") {
      this.filter.week = true;
    }

    if (this.method === "month") {
      this.filter.month = true;
    }

    if (this.method === "today") {
      this.filter.today = moment().format("YYYY-MM-DD");
    }

    if (this.method === "range") {
      this.filter.from = moment(this.range.value.begin).format("YYYY-MM-DD");
      this.filter.to = moment(this.range.value.end).format("YYYY-MM-DD");
    }

    this.getSubscriptionsReports(this.filter);
  }

  isGenerateDisabled() {
    return this.type === undefined ? true : false;
  }

  getSubscriptionsReports(filter: SupportFilter) {

    this.reportService.getSubscriptionReport(filter).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.datasource = response.data;
          this.reportService.exportFileToCsv(
            response.data,
            "SUBSCRIPTION REPORT",
            `${this.filter.type}_subscription_report_${moment().format()}`
          );
        }
      },
      error => console.error(error)
    );
  }

  resetFilters() {
    this.filter = {};
    this.type = undefined;
    this.method = undefined;
  }
}
