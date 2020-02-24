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
  selector: "invoice-report",
  templateUrl: "./invoice-report.component.html",
  styleUrls: ["./invoice-report.component.css"]
})
export class InvoiceReportComponent implements OnInit {
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

  filteredMethods: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  constructor(private reportService: ReportService) {}

  datasource = new MatTableDataSource<any>([]);

  ngOnInit() {
    this.filter = {};
    this.filteredMethods.next(this.methods.slice());
    this.filterMethodCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMethod();
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

  search() {
    this.filter = {};

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

    this.getInvoiceReport(this.filter);
  }

  isGenerateDisabled() {
    return this.method === undefined ? true : false;
  }

  getInvoiceReport(filter: SupportFilter) {
    this.reportService.getInvoiceReport(filter).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.datasource = response.data;

          if (response.data.length > 0)
            this.reportService.exportFileToCsv(
              response.data,
              "INVOICE REPORT",
              `INVOICE REPORT ${moment().format()}`
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
