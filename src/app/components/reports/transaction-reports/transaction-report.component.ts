import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, startWith, tap } from 'rxjs/operators';
import { CountryService } from 'src/app/services/coutry.service';
import { SupportFilter } from '../../support/support-filter.model';
import { ReportService } from '../reports.service';
import * as moment from 'moment';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.css']
})
export class TransactionReportComponent implements OnInit {

  filterMethodCtrl = new FormControl('');
  filterCountryCtrl = new FormControl('');
  range = new FormControl('');

  mobile = new FormControl('')
  protected _onDestroy = new Subject<void>();

  filter: SupportFilter;

  method: any;
  country: any;
  count: number;


  countries: any[] = [];
  methods: any[] = [
    { label: 'Today', id: 'today' },
    { label: 'This Week', id: 'week' },
    { label: 'This Month', id: 'month' },
    { label: 'Date Range', id: 'range' },
  ]
  filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredMethods: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  displayedColumns: string[] = ['No', 'date', 'openingBalance', 'amountReceived', 'subscriptionPurchase', 'videoPurchase', 'tvSeriesPurchase', 'closingBalance', 'smartCardTransfer']

  constructor(private countryService: CountryService, private reportService: ReportService) { }

  datasource = new MatTableDataSource<any>([]);

  ngOnInit() {
    this.filter = {}
    this.getTransactionCount(this.filter)
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
    this.countryService.list().subscribe((response: any) => {
      if (response.status === 200) {
        this.countries = response.data;
        this.filteredCountries.next(this.countries.slice())
      }
    },
      error => console.error(error));
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
    this.getTransactionCount(this.filter)
    this.getTransactions(this.filter);
  }

  getTransactions(filter: SupportFilter, pageIndex?, pageSize?) {
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
    this.reportService.getTransactions(filter).subscribe((response: any) => {
      if (response.status === 200) {
        this.datasource = response.data;
      }
    }, error => console.error(error))
  }

  getTransactionCount(filter: SupportFilter) {
    delete filter.pageIndex;
    delete filter.pageSize;
    this.reportService.getTransactions(filter).subscribe((response: any) => {
      if (response.status === 200) {
        this.count = response.count;
      }
    }, error => console.error(error))
  }


  resetFilters() {
    this.filter = {};
    this.country = undefined;
    this.method = undefined;
    this.getTransactionCount(this.filter)
    this.getTransactions(this.filter, this.paginator.pageIndex + 1, this.paginator.pageSize)

  }

  generateExcel() {
    if (this.filter.pageIndex)
      delete this.filter.pageIndex;
    if (this.filter.pageSize)
      delete this.filter.pageSize;

    this.reportService.getTransactions(this.filter).subscribe((response: any) => {
      if (response.status === 200) {
        this.reportService.exportFileToCsv(response.data, 'TRANSACTION REPORT', `transaction_report_${moment().format()}`);
      }
    }, error => console.error(error))
  }

}
