import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, filter, startWith, tap } from 'rxjs/operators';
import { CountryService } from 'src/app/services/coutry.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SupportService } from '../support.service';
import { ActivatedRoute } from '@angular/router';
import { SupportFilter } from '../support-filter.model';

@Component({
  selector: 'detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.css']
})
export class DetailedInformationComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator

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

  packageCount: number;
  rechargeHistoryCount: number;
  walletCount: number;
  videoCount: number;

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
  packageDisplayedColumns: string[] = ['subId', 'packageName', 'fromDate', 'toDate', 'paidAmount', 'walletTransId'];
  videoDisplayedColumns: string[] = ['title', 'price', 'subscribedFrom', 'startDate', 'endDate', 'walletId'];
  seasonDisplayedColumns: string[] = ['subId', 'title', 'series', 'startDate', 'endDate', 'amount', 'walletTransId'];
  rechargeHistoryColumns: string[] = ['subId', 'packageName', 'fromDate', 'toDate', 'couponCode', 'paidAmount', 'status'];
  redeemedCouponsColumns: string[] = ['subId', 'packageName', 'fromDate', 'toDate', 'couponCode'];
  walletTransactionColumns: string[] = ['subId', 'packageName', 'fromDate', 'toDate', 'couponCode', 'status'];
  smartCardColumns: string[] = ['fullName', 'smartCardNo',];


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
    this.getBasicInformation()
  }

  selectTab(event) {
    switch (event) {
      case 0:
        this.getBasicInformation()
        break;

      case 1:
        this.getPackageCount()
        this.paginator.page.pipe(
          startWith(null),
          tap(() => this.getPackageInformation(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
        break;

      case 2:
        this.getSeasonInformation()
        break;

      case 3:
        this.getVideoCount()
        this.paginator.page.pipe(
          startWith(null),
          tap(() => this.getVideoInformation(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
        break;

      case 4:
        this.getRehargeHistoryCount();
        this.paginator.page.pipe(
          startWith(null),
          tap(() => this.getRechargeHistory(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
        break;

      case 5:
        this.getWalletCount()
        this.paginator.page.pipe(
          startWith(null),
          tap(() => this.getWalletInformation(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
        break;

      case 6:
        this.getSmartCardInformation()
        break;

      default:
        break;
    }
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

  getPackageInformation(pageIndex?, pageSize?) {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
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

  getVideoInformation(pageIndex?, pageSize?) {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
    this.supportService.getVideoInformation(filter).subscribe((response: any) => {
      if (response.code === 200) {
        this.videoInfo = response.data;
        this.videoDataSource = new MatTableDataSource<any>(this.videoInfo);
      }
    }, error => console.log(error))
  }

  getWalletInformation(pageIndex?, pageSize?) {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
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

  getRechargeHistory(pageIndex?, pageSize?) {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
    this.supportService.getRechargeInformation(filter).subscribe((response: any) => {
      if (response.code === 200) {
        this.rechargeInfo = response.data;
        this.rechargeDataSource = new MatTableDataSource<any>(this.rechargeInfo);
      }
    }, error => console.log(error))
  }

  getPackageCount() {
    this.supportService.getPackageCount(this.userId).subscribe((response: any) => {
      if (response.code === 200) {
        this.packageCount = response.count;
      }
    }, error => console.log(error));
  }

  getWalletCount() {
    this.supportService.getWalletCount(this.userId).subscribe((response: any) => {
      if (response.code === 200) {
        this.walletCount = response.count;
      }
    }, error => console.log(error));
  }

  getVideoCount() {
    this.supportService.getVideoCount(this.userId).subscribe((response: any) => {
      if (response.code === 200) {
        this.videoCount = response.count;
      }
    }, error => console.log(error));
  }

  getRehargeHistoryCount() {
    this.supportService.getRechargeHistoryCount(this.userId).subscribe((response: any) => {
      if (response.code === 200) {
        this.rechargeHistoryCount = response.count;
      }
    }, error => console.log(error));
  }


  search() {
    if (this.method === 'week') {

    }
  }
}
