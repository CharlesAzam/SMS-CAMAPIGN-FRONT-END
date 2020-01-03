import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, startWith, tap } from 'rxjs/operators';
import { CountryService } from 'src/app/services/coutry.service';
import { SupportFilter } from '../support-filter.model';
import *as moment from 'moment';
import { SupportService } from '../support.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'logged-support',
  templateUrl: './logged-support.component.html',
  styleUrls: ['./logged-support.component.css']
})
export class LoggedSupportComponent implements OnInit {

  ngAfterViewInit(): void {
    // let pageIndex = this.paginator.pageIndex + 1

    this.paginator.page.pipe(
      startWith(null),
      tap(() => this.getSupportTickets(this.filter, this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator


  filterMethodCtrl = new FormControl('');
  filterCountryCtrl = new FormControl('');
  range = new FormControl('');
  mobile = new FormControl('')
  protected _onDestroy = new Subject<void>();

  filter: SupportFilter;
  supportTickets: any[] = []

  method: any;
  country: any;


  countries: any[] = [];
  methods: any[] = [
    { label: 'Today', id: 'today' },
    { label: 'This Week', id: 'week' },
    { label: 'This Month', id: 'month' },
    { label: 'Date Range', id: 'range' },
    // { label: 'Mobile Number', id: 'mobile' }
  ]
  filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredMethods: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  displayedColumns: string[] = ['No', 'date', 'email', 'title', 'description', 'status']
  datasource = new MatTableDataSource<any>([]);

  constructor(private countryService: CountryService, private supportService: SupportService) { }

  ngOnInit() {
    this.getCountries();
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

    if (this.country) {
      this.filter.country = this.country;
    }

    if (this.method === 'week') {
      this.filter.week = true;
    }

    if (this.method === 'month') {
      this.filter.month = true;
    }

    if (this.method === 'today') {
      this.filter.today = moment().format('YYYY-MM-DD');
    }

    if (this.method === 'mobile') {
      this.filter.mobile = this.mobile.value;
    }

    if (this.method === 'range') {
      this.filter.from = moment(this.range.value.begin).format('YYYY-MM-DD');
      this.filter.to = moment(this.range.value.end).format('YYYY-MM-DD');
    }

    this.getSupportTickets(this.filter);

  }

  getSupportTickets(filter: SupportFilter, pageIndex?, pageSize?) {
    filter = {};
    if (pageIndex)
      filter.pageIndex = pageIndex;

    if (pageSize)
      filter.pageSize = pageSize;

    this.supportService.getSupportTickets(filter).subscribe((response: any) => {
      if (response.status === 200) {
        this.supportTickets = response.data;
        this.datasource = new MatTableDataSource<any>(this.supportTickets);
      } else if (response.code === 204) {
        this.datasource = new MatTableDataSource<any>([])
      }
    },
      error => console.log(error));
  }



}
