import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil, startWith, tap } from "rxjs/operators";
import { CountryService } from "src/app/services/coutry.service";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { SupportService } from "../support.service";
import { SupportFilter } from "../support-filter.model";
import * as moment from "moment";

@Component({
  selector: "user-information",
  templateUrl: "./user-information.component.html",
  styleUrls: ["./user-information.component.css"]
})
export class UserInformationComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    // let pageIndex = this.paginator.pageIndex + 1

    this.paginator.page
      .pipe(
        startWith(null),
        tap(() =>
          this.getUsers(
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

  filterMethodCtrl = new FormControl("");
  filterCountryCtrl = new FormControl("");
  range = new FormControl("");
  mobile = new FormControl("");
  smartCard = new FormControl("");
  protected _onDestroy = new Subject<void>();

  method: any;
  country: any;
  count: number;
  users: any;
  filter: SupportFilter = {};

  countries: any[] = [];
  methods: any[] = [
    { label: "Today", id: "today" },
    { label: "This Week", id: "week" },
    { label: "This Month", id: "month" },
    { label: "Date Range", id: "range" },
    { label: "Mobile Number", id: "mobile" },
    { label: "Smart Card", id: "smartCard" }
  ];
  filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredMethods: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  displayedColumns: string[] = [
    "No",
    "phone",
    "email",
    "firstName",
    "lastName",
    "smartCard",
    "walletAmount",
    "createdOn",
    "country",
    "status"
  ];

  datasource = new MatTableDataSource<any>([]);

  constructor(
    private countryService: CountryService,
    private supportService: SupportService
  ) { }

  ngOnInit() {
    this.getUserCount();
    this.datasource.paginator = this.paginator;

    this.getCountries();
    this.filterCountryCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountry();
      });
    this.filteredMethods.next(this.methods.slice());
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
      error => console.error(error)
    );
  }

  trimString(string: String) {

    return string && string.length > 20 ? string.substr(0, 20) + '...' : string;
  }

  showToolTip(index: number, columnName: string) {
    return this.users[index][columnName];
  }

  getUsers(supportFilter?: SupportFilter, pageIndex?, pageSize?) {
    this.supportService.getUsers(supportFilter, pageIndex, pageSize).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.users = response.data;
          this.datasource = new MatTableDataSource<any>(this.users);
        } else if (response.code === 204) {
          this.datasource = new MatTableDataSource<any>([]);
        }
      },
      error => console.log(error)
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
      this.countries.filter(cont =>
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
      this.methods.filter(cont =>
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

    if(this.method === "smartCard"){
      this.filter.smartCard = this.smartCard.value + '';
    }

    if (this.method === "range") {
      this.filter.from = moment(this.range.value.begin).format("YYYY-MM-DD");
      this.filter.to = moment(this.range.value.end).format("YYYY-MM-DD");
    }

    this.getUsers(this.filter);
  }

  getUserCount() {
    this.supportService.getUserCount().subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.count = response.count;
        }
      },
      error => console.log(error)
    );
  }

  resetFilters() {
    this.filter = {};
    this.country = undefined;
    this.method = undefined;
    this.smartCard = undefined;
    this.paginator.firstPage();
    
    this.getUsers(this.filter, this.paginator.pageIndex + 1, this.paginator.pageSize);
  }

  sortData(data) {
    let filter: SupportFilter = {}
    if (data.direction !== "") {
      filter.sortby = data.active;
      filter.sortorder = data.direction;
      this.paginator.firstPage();
      this.getUsers(filter, this.paginator.pageIndex + 1, this.paginator.pageSize);
    } else {
      this.getUsers(filter, this.paginator.pageIndex + 1, this.paginator.pageSize);
    }
  }
}
