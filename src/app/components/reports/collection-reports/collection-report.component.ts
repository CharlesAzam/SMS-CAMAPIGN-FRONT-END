import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil, startWith, tap } from "rxjs/operators";
import { CountryService } from "src/app/services/coutry.service";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { ReportService } from "../reports.service";
import { SupportFilter } from "../../support/support-filter.model";
import * as moment from "moment";

@Component({
  selector: "app-report",
  templateUrl: "./collection-report.component.html",
  styleUrls: ["./collection-report.component.css"],
})
export class CollectionReportComponent implements OnInit {
  ngAfterViewInit(): void {
    this.filter = {};

    this.displayedColumns = [
      "No",
      "date",
      "country",
      "gateway",
      "currency",
      "amount",
    ];
    this.summaryPaginator.page
      .pipe(
        startWith(null),
        tap(() =>
          this.getCollectionSummary(
            this.filter,
            this.summaryPaginator.pageIndex + 1,
            this.summaryPaginator.pageSize
          )
        )
      )
      .subscribe();
  }
  @ViewChild("summaryPaginator", { static: false, read: MatPaginator })
  summaryPaginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  filterMethodCtrl = new FormControl("");
  filterCountryCtrl = new FormControl("");
  range = new FormControl("");
  mobile = new FormControl("");
  protected _onDestroy = new Subject<void>();
  filter: SupportFilter;
  count: number;

  method: any;
  country: any;
  isMobile: boolean = false;

  type: string = "";

  displayedColumns: string[] = [];

  countries: any[] = [];
  methods: any[] = [
    { label: "Today", id: "today" },
    { label: "This Week", id: "week" },
    { label: "This Month", id: "month" },
    { label: "Date Range", id: "range" },
    { label: "Mobile Number", id: "mobile" },
  ];

  summaryMethods: any[] = [
    { label: "Today", id: "today" },
    { label: "This Week", id: "week" },
    { label: "This Month", id: "month" },
    { label: "Date Range", id: "range" },
  ];
  filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredMethods: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredDetailedMethods: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  datasource = new MatTableDataSource<any>([]);

  constructor(
    private countryService: CountryService,
    private reportService: ReportService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params) {
        this.filter = {};
        this.country = undefined;
        this.method = undefined;
        this.datasource = new MatTableDataSource<any>([]);
        // this.datasource.paginator = this.paginator;
        this.displayedColumns = [
          "No",
          "date",
          "country",
          "gateway",
          "currency",
          "amount",
        ];
        this.getSummaryCount(this.filter);
        this.getCollectionSummary(this.filter, 1, 10);
      }
    });
    this.getCountries();

    this.filterCountryCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountry();
      });
    this.filteredMethods.next(this.summaryMethods.slice());
    this.filterMethodCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMethod();
      });

    this.filteredDetailedMethods.next(this.methods.slice());
    this.filterMethodCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMethod();
      });
  }

  getCountries() {
    this.countryService.list().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.countries = response.data;
          this.filteredCountries.next(this.countries.slice());
        }
      },
      (error) => console.error(error)
    );
  }

  filterCountry() {
    if (!this.countries) return;

    let search = this.filterCountryCtrl.value;
    if (!search) {
      this.filteredCountries.next(this.countries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCountries.next(
      this.countries.filter((cont) =>
        cont.country ? cont.country.toLowerCase().indexOf(search) > -1 : ""
      )
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
      this.methods.filter((cont) =>
        cont ? cont.label.toLowerCase().indexOf(search) > -1 : ""
      )
    );
  }

  search() {
    this.filter = {};

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

    if (this.method === "mobile") {
      this.filter.mobile = this.mobile.value;
    }

    if (this.method === "range") {
      this.filter.from = moment(this.range.value.begin).format("YYYY-MM-DD");
      this.filter.to = moment(this.range.value.end).format("YYYY-MM-DD");
    }

    this.summaryPaginator.firstPage();
    this.getSummaryCount(this.filter);
    this.getCollectionSummary(
      this.filter,
      this.summaryPaginator.pageIndex + 1,
      this.summaryPaginator.pageSize
    );
  }

  getCollectionSummary(filter: SupportFilter, pageIndex?, pageSize?) {
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
    this.reportService.getCollectionSummary(filter).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.datasource = response.data;
        }
        if (response.status === 204) {
        }
      },
      (error) => console.error(error)
    );
  }

  getDetailedReport(filter: SupportFilter, pageIndex?, pageSize?) {
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
    this.reportService.getDetailedCollection(filter).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.datasource = response.data;
        }
        if (response.status === 204) {
        }
      },
      (error) => console.error(error)
    );
  }

  getDetailedCount(filter: SupportFilter) {
    this.reportService.getDetailedCollection(filter).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.count = response.count;
        }
      },
      (error) => console.error(error)
    );
  }

  getSummaryCount(filter: SupportFilter) {
    this.reportService.getCollectionSummary(filter).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.count = response.count;
        }
      },
      (error) => console.error(error)
    );
  }

  resetFilters() {
    this.summaryPaginator.firstPage();

    this.filter = {};
    this.country = undefined;
    this.method = undefined;
    this.getCollectionSummary(
      this.filter,
      this.summaryPaginator.pageIndex + 1,
      this.summaryPaginator.pageSize
    );
  }

  generateExcel() {
    if (this.filter.pageIndex) delete this.filter.pageIndex;
    if (this.filter.pageSize) delete this.filter.pageSize;
    this.reportService.getCollectionSummary(this.filter).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.reportService.exportFileToCsv(
            response.data,
            "COLLECTION SUMMARY REPORT",
            `collection_summary_report_${moment().format()}`
          );
        }
      },
      (error) => console.error(error)
    );
  }
}
