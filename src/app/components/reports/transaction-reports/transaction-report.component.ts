import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CountryService } from 'src/app/services/coutry.service';

@Component({
  selector: 'transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.css']
})
export class TransactionReportComponent implements OnInit {

  filterMethodCtrl = new FormControl('');
  filterCountryCtrl = new FormControl('');
  from = new FormControl('');
  to = new FormControl('');
  mobile = new FormControl('')
  protected _onDestroy = new Subject<void>();

  method: any;
  country: any;


  countries: any[] = [];
  methods: any[] = [
    { label: 'Today', id: 'today' },
    { label: 'This Week', id: 'week' },
    { label: 'This Month', id: 'month' },
    { label: 'Date Range', id: 'range' },
    { label: 'Mobile Number', id: 'mobile' }
  ]
  filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredMethods: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  displayedColumns: string[] = ['No', 'openingBalance', 'amountReceived', 'smartCardTransfer', 'subscriptionPurchase', 'moviePurchase', 'tvSeriesPurchase', 'closingBalance']

  constructor(private countryService: CountryService) { }

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
    console.log('Selected Country', this.country);
    console.log('Selected Method', this.method);

    if (this.method === 'week') {

    }
  }



}
