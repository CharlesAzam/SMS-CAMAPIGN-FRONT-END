import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, startWith, tap } from 'rxjs/operators';
import { CountryService } from 'src/app/services/coutry.service';
import { ReportService } from '../reports.service';
import * as moment from 'moment';
import { SupportFilter } from '../../support/support-filter.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponet implements OnInit {

  filterMethodCtrl = new FormControl('');
  filterCountryCtrl = new FormControl('');
  range = new FormControl('');
  mobile = new FormControl('')
  count: number;
  datasource = new MatTableDataSource<any>([])
  protected _onDestroy = new Subject<void>();

  method: any;
  country: any;
  filter: SupportFilter;


  countries: any[] = [];
  methods: any[] = [
    { label: 'Today', id: 'today' },
    { label: 'This Week', id: 'week' },
    { label: 'This Month', id: 'month' },
    { label: 'Date Range', id: 'range' },
  ]
  filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredMethods: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  displayedColumns: string[] = this.method !== 'mobile'
    ? ['No', 'date', 'openingBalance', 'customers', 'azamUsers', 'nonAzamUsers', 'closingBalance']
    : ['No', 'date', 'country', 'openingBalance', 'customers', 'azamUsers', 'nonAzamUsers', 'closingBalance']


  constructor(private countryService: CountryService, private reportService: ReportService) { }

  ngOnInit() {
    this.getCountries();
    this.getUserCount("REG_SUM");
    this.filterCountryCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountry();
      })
    this.filteredMethods.next(this.methods.slice());
    this.filterMethodCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMethod();
      })
  }

  ngAfterViewInit(): void {
    // let pageIndex = this.paginator.pageIndex + 1
    this.filter = {};
    this.filter.type = "REG_SUM"

    this.paginator.page
      .pipe(
        startWith(null),
        tap(() =>
          this.getUserReports(
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
    this.countryService.list().subscribe((response: any) => {
      if (response.status === 200) {
        this.countries = response.data;
        this.filteredCountries.next(this.countries.slice())
      }
    },
      error => console.error(error));
  }

  filterCountry() {
    if (!this.countries)
      return;

    let search = this.filterCountryCtrl.value;
    if (!search) {
      this.filteredCountries.next(this.countries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCountries.next(
      this.countries.filter(cont =>
        cont.country ?
          cont.country.toLowerCase().indexOf(search) > -1 :
          ''
      )
    )
  }

  filterMethod() {
    if (!this.methods)
      return;

    let search = this.filterMethodCtrl.value;
    if (!search) {
      this.filteredMethods.next(this.methods.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredMethods.next(
      this.methods.filter(cont =>
        cont ?
          cont.label.toLowerCase().indexOf(search) > -1 :
          ''
      )
    )
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

    if (this.method === "mobile") {
      this.filter.mobile = this.mobile.value;
    }

    if (this.method === "range") {
      this.filter.from = moment(this.range.value.begin).format("YYYY-MM-DD");
      this.filter.to = moment(this.range.value.end).format("YYYY-MM-DD");
    }

    if (this.country) {
      this.filter.country = this.country;
      this.filter.type = 'CNT_REG_SUM'
      this.getUserCount(this.filter.type, this.filter.country)

    } else {
      this.filter.type = 'REG_SUM'
      this.getUserCount(this.filter.type)
    }

    this.getUserReports(this.filter);

  }

  getUserReports(filter: SupportFilter, pageIndex?, pageSize?) {
    filter.pageIndex = pageIndex ? pageIndex : this.paginator.pageIndex + 1;
    filter.pageSize = pageSize ? pageSize : this.paginator.pageSize;
    this.reportService.getUserReports(filter).subscribe((response: any) => {
      if (response.status === 200) {
        this.datasource = response.data;
      }
    }, error => console.error(error))
  }

  getUserCount(type: string, country?: string) {
    let filter: SupportFilter = {};
    filter.type = type;
    filter.country = country;
    this.reportService.getUserReports(filter).subscribe((response: any) => {
      if (response.status === 200) {
        this.count = response.count;
      }
    }, error => console.error(error))
  }


  resetFilters() {
    this.filter = {
      type: 'REG_SUM'
    };
    this.country = undefined;
    this.method = undefined;
    this.getUserReports(this.filter, this.paginator.pageIndex + 1, this.paginator.pageSize)

  }



}
