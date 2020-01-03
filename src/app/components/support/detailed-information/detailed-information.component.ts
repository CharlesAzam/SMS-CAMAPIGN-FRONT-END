import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { CountryService } from 'src/app/services/coutry.service';
import { MatTableDataSource } from '@angular/material';
import { SupportService } from '../support.service';
import { ActivatedRoute } from '@angular/router';
import { SupportFilter } from '../support-filter.model';

@Component({
  selector: 'detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.css']
})
export class DetailedInformationComponent implements OnInit {

  filterMethodCtrl = new FormControl('');
  filterCountryCtrl = new FormControl('');
  from = new FormControl('');
  to = new FormControl('');
  mobile = new FormControl('');
  basicInfo: any;
  packageInfo: any;
  seasonInfo: any;
  videoInfo: any;
  walletInfo: any;
  smartCardInfo: any;
  rechargeInfo: any;
  selectedTab: number = 0;

  protected _onDestroy = new Subject<void>();

  method: any;
  country: any;
  userId: string;


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

  displayedColumns: string[] = ['No', 'phone', 'email', 'firstName', 'lastName', 'smartCard', 'walletAmount', 'createdOn', 'country', 'status'];
  packageDisplayedColumns: string[] = ['subId', 'packageName', 'fromDate', 'toDate', 'couponCode', 'paidAmount', 'walletTransId', 'status'];
  rechargeHistoryColumns: string[] = ['subId', 'packageName', 'fromDate', 'toDate', 'couponCode', 'paidAmount', 'status'];
  redeemedCouponsColumns: string[] = ['subId', 'packageName', 'fromDate', 'toDate', 'couponCode'];
  walletTransactionColumns: string[] = ['subId', 'packageName', 'fromDate', 'toDate', 'couponCode', 'status'];
  smartCardColumns: string[] = ['subId', 'packageName', 'fromDate',];


  datasource = new MatTableDataSource<any>([]);
  packageDataSource = new MatTableDataSource<any>([]);
  seasonDataSource = new MatTableDataSource<any>([]);
  walletDataSource = new MatTableDataSource<any>([]);
  smartCardDataSource = new MatTableDataSource<any>([]);
  videoDataSource = new MatTableDataSource<any>([]);
  rechargeDataSource = new MatTableDataSource<any>([]);


  constructor(private countryService: CountryService,
    private supportService: SupportService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params.id;
    })
  }

  ngOnInit() {
    this.getCountries();
    this.getBasicInformation()
  }

  selectTab(event) {
    console.log(event)
    switch (event) {
      case 0:
        this.getBasicInformation()
        break;

      case 1:
        this.getPackageInformation()
        break;

      case 2:
        this.getSeasonInformation()
        break;

      case 3:
        this.getVideoInformation()
        break;

      case 4:
        this.getRechargeHistory()
        break;

      case 5:
        this.getWalletInformation()
        break;

      case 6:
        this.getSmartCardInformation()
        break;

      default:
        break;
    }
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

  getBasicInformation() {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    this.supportService.getUsers(filter).subscribe((response: any) => {
      if (response.code === 200) {
        this.basicInfo = response.data[0];
      }
    }, error => console.log(error));
  }

  getPackageInformation() {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    this.supportService.getPackageInformation(filter).subscribe((response: any) => {
      if (response.code === 200) {
        this.packageInfo = response.data;
        this.packageDataSource = new MatTableDataSource<any>(this.packageInfo);
      }
    }, error => console.log(error))
  }

  getSeasonInformation() {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    this.supportService.getSeasonInformation(filter).subscribe((response: any) => {
      if (response.code === 200) {
        this.seasonInfo = response.data;
        this.seasonDataSource = new MatTableDataSource<any>(this.seasonInfo);
      }
    }, error => console.log(error))
  }

  getVideoInformation() {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    this.supportService.getVideoInformation(filter).subscribe((response: any) => {
      if (response.code === 200) {
        this.videoInfo = response.data;
        this.videoDataSource = new MatTableDataSource<any>(this.videoInfo);
      }
    }, error => console.log(error))
  }

  getWalletInformation() {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    this.supportService.getWalletInformation(filter).subscribe((response: any) => {
      if (response.code === 200) {
        this.walletInfo = response.data;
        this.walletDataSource = new MatTableDataSource<any>(this.walletInfo);
      }
    }, error => console.log(error))
  }

  getSmartCardInformation() {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    this.supportService.getSmartCardInformation(filter).subscribe((response: any) => {
      if (response.code === 200) {
        this.smartCardInfo = response.data;
        this.smartCardDataSource = new MatTableDataSource<any>(this.smartCardInfo);
      }
    }, error => console.log(error))
  }

  getRechargeHistory() {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    this.supportService.getRechargeHistory(filter).subscribe((response: any) => {
      if (response.code === 200) {
        this.rechargeInfo = response.data;
        this.rechargeDataSource = new MatTableDataSource<any>(this.rechargeInfo);
      }
    }, error => console.log(error))
  }



  search() {
    if (this.method === 'week') {

    }
  }
}
