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
  selector: "revenue-recognition-report",
  templateUrl: "./revenue-recognition-report.component.html",
  styleUrls: ["./revenue-recognition-report.component.css"]
})
export class RevenueReportComponent implements OnInit {
  filterMethodCtrl = new FormControl("");
  filterCountryCtrl = new FormControl("");
  range = new FormControl("");

  mobile = new FormControl("");
  protected _onDestroy = new Subject<void>();

  filter: SupportFilter = { type: "REVENUE_RECOGNITION" };

  method: any;
  country: any;
  count: number;

  countries: any[] = [];
  methods: any[] = [
    { label: "Today", id: "today" },
    { label: "This Week", id: "week" },
    { label: "This Month", id: "month" },
    { label: "Date Range", id: "range" }
  ];
  filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredMethods: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  displayedColumns: string[] = [
    "No",
    "date",
    "country",
    "currency",
    "gross",
    "vat",
    "net",
    "revenue",
    "defferedRevenue"
  ];

  constructor(
    private countryService: CountryService,
    private reportService: ReportService
  ) {}

  datasource = new MatTableDataSource<any>([]);

  ngOnInit() {
    this.filter = { type: "REVENUE_RECOGNITION" };
    this.getTransactionCount(this.filter);
    this.filteredMethods.next(this.methods.slice());
    this.filterMethodCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMethod();
      });
  }

  ngAfterViewInit(): void {
    // let pageIndex = this.paginator.pageIndex + 1
    this.filter = { type: "REVENUE_RECOGNITION" };

    this.paginator.page
      .pipe(
        startWith(null),
        tap(() =>
          this.getTransactions(
            this.filter,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          )
        )
      )
      .subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  getCountries() {
    this.countryService.list().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.countries = response.data;
          this.filteredCountries.next(this.countries.slice());
        }
      },
      error => console.error(error)
    );
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
    this.filter = { type: "REVENUE_RECOGNITION" };

    if (this.country) {
      this.filter.country = this.country;
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
    this.getTransactionCount(this.filter);
    this.getTransactions(this.filter);
  }

  getTransactions(filter: SupportFilter, pageIndex?, pageSize?) {
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
    this.reportService.getUserReports(filter).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.datasource = response.data;
        }
      },
      error => console.error(error)
    );
  }

  getTransactionCount(filter: SupportFilter) {
    delete filter.pageIndex;
    delete filter.pageSize;
    this.reportService.getUserReports(filter).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.count = response.count;
        }
      },
      error => console.error(error)
    );
  }

  resetFilters() {
    this.filter = {type: 'REVENUE_RECOGNITION'};
    this.country = undefined;
    this.method = undefined;
    this.getTransactionCount(this.filter);
    this.getTransactions(
      this.filter,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize
    );
  }

  generateExcel() {
    if (this.filter.pageIndex) delete this.filter.pageIndex;
    if (this.filter.pageSize) delete this.filter.pageSize;

    this.reportService.getUserReports(this.filter).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.reportService.exportFileToCsv(
            response.data,
            "REVENUE RECOGNITION REPORT",
            `revenue_recognition_${moment().format()}`,
            [
              'date',
              'country',
              'currency',
              'gross',
              'vat',
              'vat',
              'net',
              'revenue'
            ]
          );
        }
      },
      error => console.error(error)
    );
  }
}
