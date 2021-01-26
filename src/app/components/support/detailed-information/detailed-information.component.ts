import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil, filter, startWith, tap } from "rxjs/operators";
import { CountryService } from "src/app/services/coutry.service";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { SupportService } from "../support.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SupportFilter } from "../support-filter.model";
import * as moment from "moment";
import { WarningDialog } from "../../warning-dialog/dialog-warning";
import { AuthenticationService } from "../../login/login.service";

@Component({
  selector: "detailed-information",
  templateUrl: "./detailed-information.component.html",
  styleUrls: ["./detailed-information.component.css"]
})
export class DetailedInformationComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.rechargeDataSource.paginator = this.rechargePaginator;
    this.walletDataSource.paginator = this.walletPaginator;
    this.seasonDataSource.paginator = this.seasonPaginator;
    this.packageDataSource.paginator = this.packagePaginator;
    this.videoDataSource.paginator = this.videoPaginator;
  }

  @ViewChild("walletPaginator", { static: false, read: MatPaginator })
  walletPaginator: MatPaginator;

  @ViewChild("rechargePaginator", { static: false, read: MatPaginator })
  rechargePaginator: MatPaginator;

  @ViewChild("packagePaginator", { static: false, read: MatPaginator })
  packagePaginator: MatPaginator;

  @ViewChild("videoPaginator", { static: false, read: MatPaginator })
  videoPaginator: MatPaginator;

  @ViewChild("seasonPaginator", { static: false, read: MatPaginator })
  seasonPaginator: MatPaginator;

  filterMethodCtrl = new FormControl("");
  filterCountryCtrl = new FormControl("");
  from = new FormControl("");
  to = new FormControl("");
  mobile = new FormControl("");
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
  seasonCount: number;

  protected _onDestroy = new Subject<void>();

  method: any;
  country: any;
  userId: string;

  countries: any[] = [];
  methods: any[] = [
    { label: "Today", id: "today" },
    { label: "This Week", id: "week" },
    { label: "This Month", id: "month" },
    { label: "Date Range", id: "range" },
    { label: "Mobile Number", id: "mobile" }
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
  packageDisplayedColumns: string[] = [
    "subId",
    "packageName",
    "fromDate",
    "toDate",
    "paidAmount",
    "walletTransId",
    "status",
    "actions"
  ];
  videoDisplayedColumns: string[] = [
    "title",
    "price",
    "subscribedFrom",
    "startDate",
    "endDate",
    "walletId",
    "status",
    "actions"
  ];
  seasonDisplayedColumns: string[] = [
    "subId",
    "title",
    "series",
    "startDate",
    "endDate",
    "amount",
    "walletTransId",
    "status",
    "actions"
  ];
  rechargeHistoryColumns: string[] = [
    "transactionDate",
    "transactionType",
    "transactionToken",
    "transactionReference",
    "paidAmount",
    "status"
  ];
  redeemedCouponsColumns: string[] = [
    "subId",
    "packageName",
    "fromDate",
    "toDate",
    "couponCode"
  ];
  walletTransactionColumns: string[] = [
    "subId",
    "packageName",
    "fromDate",
    "toDate",
    "couponCode",
    "status"
  ];
  smartCardColumns: string[] = ["fullName", "smartCardNo", "actions"];

  datasource = new MatTableDataSource<any>([]);
  packageDataSource = new MatTableDataSource<any>([]);
  seasonDataSource = new MatTableDataSource<any>([]);
  walletDataSource = new MatTableDataSource<any>([]);
  smartCardDataSource = new MatTableDataSource<any>([]);
  videoDataSource = new MatTableDataSource<any>([]);
  rechargeDataSource = new MatTableDataSource<any>([]);

  constructor(
    private supportService: SupportService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public authenticationService: AuthenticationService
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params.id;
    });
  }

  ngOnInit() {
    this.getBasicInformation();
  }

  isSmartCardDeletionAllowed() {
    return this.authenticationService.isModuleAllowed(
      "customer-portal",
      "delete-user-smartcard"
    );
  }

  selectTab(event) {
    // setTimeout(() => {
    switch (event) {
      case 0:
        this.getBasicInformation();
        break;

      case 1:
        this.getPackageCount();
        this.packagePaginator.page
          .pipe(
            startWith(null),
            tap(() =>
              this.getPackageInformation(
                this.packagePaginator.pageIndex + 1,
                this.packagePaginator.pageSize
              )
            )
          )
          .subscribe();
        break;

      case 2:
        this.getSeasonCount();
        this.seasonPaginator.page
          .pipe(
            startWith(null),
            tap(() =>
              this.getSeasonInformation(
                this.seasonPaginator.pageIndex + 1,
                this.seasonPaginator.pageSize
              )
            )
          )
          .subscribe();
        break;

      case 3:
        this.getVideoCount();
        this.datasource.paginator = this.videoPaginator;
        this.videoPaginator.page
          .pipe(
            startWith(null),
            tap(() =>
              this.getVideoInformation(
                this.videoPaginator.pageIndex + 1,
                this.videoPaginator.pageSize
              )
            )
          )
          .subscribe();
        break;

      case 4:
        this.getRehargeHistoryCount();
        this.rechargePaginator.page
          .pipe(
            startWith(null),
            tap(() =>
              this.getRechargeHistory(
                this.rechargePaginator.pageIndex + 1,
                this.rechargePaginator.pageSize
              )
            )
          )
          .subscribe();
        this.rechargeDataSource.paginator = this.rechargePaginator;
        break;

      case 5:
        this.getWalletCount();
        this.walletPaginator.page
          .pipe(
            startWith(null),
            tap(() =>
              this.getWalletInformation(
                this.walletPaginator.pageIndex + 1,
                this.walletPaginator.pageSize
              )
            )
          )
          .subscribe();
        break;

      case 6:
        this.getSmartCardInformation();
        break;

      default:
        break;
    }
    // });
  }

  getStatus(startDate, endDate) {
    if (moment(endDate).diff(moment()) > 0) {
      return "ACTIVE";
    } else {
      return "EXPIRED";
    }
  }

  cancelSubscription(row, type) {
    let data: any;
    switch (type) {
      case "package":
        data = {
          userId: this.userId,
          Id: row.packageId,
          type: type,
          startDate: row.startDate,
          endDate: row.endDate,
          data: row
        };
        this.dialog
          .open(WarningDialog, {
            width: "400px",
            data: {
              title: "Cancel Subscription",
              message: "Are you sure you want to cancel this subscription?"
            }
          })
          .afterClosed()
          .subscribe(result => {
            if (result) {
              this.supportService.cancelSubscriptionReq(data).subscribe(
                (response: any) => {
                  if (response.status === 200) {
                    this.getPackageInformation(
                      this.packagePaginator.pageIndex + 1,
                      this.packagePaginator.pageSize
                    );
                  }
                },
                error => console.error(error)
              );
            }
          });
        break;

      case "season":
        data = {
          userId: this.userId,
          Id: row.seasonId,
          type: type,
          startDate: row.startDate,
          endDate: row.endDate,
          data: row
        };
        this.dialog
          .open(WarningDialog, {
            width: "400px",
            data: {
              title: "Cancel Subscription",
              message: "Are you sure you want to cancel this subscription?"
            }
          })
          .afterClosed()
          .subscribe(result => {
            if (result) {
              this.supportService.cancelSubscriptionReq(data).subscribe(
                (response: any) => {
                  if (response.status === 200) {
                    this.getSeasonInformation(
                      this.seasonPaginator.pageIndex + 1,
                      this.seasonPaginator.pageSize
                    );
                  }
                },
                error => console.error(error)
              );
            }
          });
        break;

      case "content":
        data = {
          userId: this.userId,
          Id: row.contentId,
          type: type,
          startDate: row.startDate,
          endDate: row.endDate,
          data: row
        };
        this.dialog
          .open(WarningDialog, {
            width: "400px",
            data: {
              title: "Cancel Subscription",
              message: "Are you sure you want to cancel this subscription?"
            }
          })
          .afterClosed()
          .subscribe(result => {
            if (result) {
              this.supportService.cancelSubscriptionReq(data).subscribe(
                (response: any) => {
                  if (response.status === 200) {
                    this.getSeasonInformation(
                      this.videoPaginator.pageIndex + 1,
                      this.videoPaginator.pageSize
                    );
                  }
                },
                error => console.error(error)
              );
            }
          });
        break;

      default:
        break;
    }
  }

  refundMoney(row) {
    let data: any = {
      transactionToken: row.transactionToken,
      transactionReference: row.transactionReference,
      userId: this.userId,
      data: row
    };
    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: "Refund Money",
          message: `Are you sure you want to refund TZS${row.amount} `
        }
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.supportService.refundMoneyReq(data).subscribe(
            (response: any) => {
              if (response.status === 200) {
                this.getRechargeHistory(
                  this.rechargePaginator.pageIndex + 1,
                  this.rechargePaginator.pageSize
                );
              }
            },
            error => console.error(error)
          );
        }
      });
  }

  getBasicInformation() {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    this.supportService.getUsers(filter).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.basicInfo = response.data[0];
        }
      },
      error => console.log(error)
    );
  }

  getPackageInformation(pageIndex?, pageSize?) {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
    this.supportService.getPackageInformation(filter).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.packageInfo = response.data;
          this.packageDataSource = new MatTableDataSource<any>(
            this.packageInfo
          );
        }
      },
      error => console.log(error)
    );
  }

  getSeasonInformation(pageIndex?, pageSize?) {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
    this.supportService.getSeasonInformation(filter).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.seasonInfo = response.data;
          this.seasonDataSource = new MatTableDataSource<any>(this.seasonInfo);
        }
      },
      error => console.log(error)
    );
  }

  getVideoInformation(pageIndex?, pageSize?) {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
    this.supportService.getVideoInformation(filter).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.videoInfo = response.data;
          this.videoDataSource = new MatTableDataSource<any>(this.videoInfo);
        }
      },
      error => console.log(error)
    );
  }

  getWalletInformation(pageIndex?, pageSize?) {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
    this.supportService.getWalletInformation(filter).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.walletInfo = response.data;
          this.walletDataSource = new MatTableDataSource<any>(this.walletInfo);
        }
      },
      error => console.log(error)
    );
  }

  getSmartCardInformation() {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    this.supportService.getSmartCardInformation(filter).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.smartCardInfo = response.data;
          this.smartCardDataSource = new MatTableDataSource<any>(
            this.smartCardInfo
          );
        }
      },
      error => console.log(error)
    );
  }

  getRechargeHistory(pageIndex?, pageSize?) {
    let filter: SupportFilter = {};
    filter.userId = this.userId;
    filter.pageIndex = pageIndex;
    filter.pageSize = pageSize;
    this.supportService.getRechargeInformation(filter).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.rechargeInfo = response.data;
          this.rechargeDataSource = new MatTableDataSource<any>(
            this.rechargeInfo
          );
        }
      },
      error => console.log(error)
    );
  }

  getPackageCount() {
    this.supportService.getPackageCount(this.userId).subscribe(
      (response: any) => {
        if (response.success) {
          this.packageCount = response.count;
        }
      },
      error => console.log(error)
    );
  }

  getWalletCount() {
    this.supportService.getWalletCount(this.userId).subscribe(
      (response: any) => {
        if (response.success) {
          this.walletCount = response.count;
        }
      },
      error => console.log(error)
    );
  }

  getVideoCount() {
    this.supportService.getVideoCount(this.userId).subscribe(
      (response: any) => {
        if (response.success) {
          this.videoCount = response.count;
        }
      },
      error => console.log(error)
    );
  }

  getRehargeHistoryCount() {
    this.supportService.getRechargeHistoryCount(this.userId).subscribe(
      (response: any) => {
        if (response.success) {
          this.rechargeHistoryCount = response.count;
        }
      },
      error => console.log(error)
    );
  }

  getSeasonCount() {
    this.supportService.getSeasonCount(this.userId).subscribe(
      (response: any) => {
        if (response.success) {
          this.seasonCount = response.count;
        }
      },
      error => console.log(error)
    );
  }

  removeSmartcard(smartCardNumber: string) {
    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: "Remove smartcard",
          message: "Are you sure you want remove smartcard from user?"
        }
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.supportService
            .removeSmartcard(this.userId, smartCardNumber)
            .subscribe(
              (response: any) => {
                if (response.success) {
                  let index = this.smartCardDataSource.data.findIndex(
                    data => data.smartCard === smartCardNumber
                  );
                  this.smartCardDataSource.data.splice(index, 1);
                }
              },
              error => console.log(error)
            );
        }
      });
  }

  goBack() {
    this.router.navigate(["../../support/user-information"]);
  }
}