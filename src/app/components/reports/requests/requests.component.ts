import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { FormControl } from '@angular/forms';
import { Subject, ReplaySubject } from 'rxjs';
import { SupportFilter } from '../../support/support-filter.model';
import { CountryService } from 'src/app/services/coutry.service';
import { ReportService } from '../reports.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { takeUntil, startWith, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { SupportService } from '../../support/support.service';
import { WarningDialog } from '../../warning-dialog/dialog-warning';

@Component({
    selector: "requests-category",
    templateUrl: "./requests.component.html",
    styleUrls: ["./requests.component.css"]
})
export class RequestsComponent implements AfterViewInit {

    //   filterMethodCtrl = new FormControl('');
    //   filterCountryCtrl = new FormControl('');
    //   range = new FormControl('');

    //   mobile = new FormControl('')
    //   protected _onDestroy = new Subject<void>();

    //   filter: SupportFilter;

    //   method: any;
    //   country: any;
    //   count: number;


    //   countries: any[] = [];
    //   methods: any[] = [
    //     { label: 'Today', id: 'today' },
    //     { label: 'This Week', id: 'week' },
    //     { label: 'This Month', id: 'month' },
    //     { label: 'Date Range', id: 'range' },
    //   ]
    //   filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    //   filteredMethods: ReplaySubject<any[]> = new ReplaySubject<any[]>();

    packageInfo: any;
    seasonInfo: any;
    videoInfo: any;
    rechargeInfo: any;

    userId: string;

    packageCount: number;
    rechargeHistoryCount: number;
    walletCount: number;
    videoCount: number;
    seasonCount: number;

    packageDataSource = new MatTableDataSource<any>([]);
    seasonDataSource = new MatTableDataSource<any>([]);
    videoDataSource = new MatTableDataSource<any>([]);
    rechargeDataSource = new MatTableDataSource<any>([]);


    ngAfterViewInit(): void {
        this.rechargeDataSource.paginator = this.rechargePaginator;
        this.seasonDataSource.paginator = this.seasonPaginator;
        this.packageDataSource.paginator = this.packagePaginator;
        this.videoDataSource.paginator = this.videoPaginator;
        this.selectTab(0);
    }

    constructor(private countryService: CountryService, private reportService: ReportService, private supportService: SupportService, private dialog: MatDialog) { }

    packageDisplayedColumns: string[] = ['subId', 'customerName', 'customerNumber', 'packageName', 'fromDate', 'toDate', 'paidAmount', 'walletTransId', 'status', 'actions'];
    videoDisplayedColumns: string[] = ['title', 'customerName', 'customerNumber', 'price', 'subscribedFrom', 'startDate', 'endDate', 'walletId', 'status', 'actions'];
    seasonDisplayedColumns: string[] = ['subId', 'customerName', 'customerNumber', 'title', 'series', 'startDate', 'endDate', 'amount', 'walletTransId', 'status', 'actions'];
    rechargeHistoryColumns: string[] = ['transactionDate', 'transactionToken', 'paymentType', 'customerName', 'customerNumber', 'transactionReference', 'paidAmount', 'status', 'actions'];


    @ViewChild('rechargePaginator', { static: false, read: MatPaginator })
    rechargePaginator: MatPaginator;

    @ViewChild('packagePaginator', { static: false, read: MatPaginator })
    packagePaginator: MatPaginator

    @ViewChild('videoPaginator', { static: false, read: MatPaginator })
    videoPaginator: MatPaginator

    @ViewChild('seasonPaginator', { static: false, read: MatPaginator })
    seasonPaginator: MatPaginator

    @ViewChild(MatSort, { static: true }) sort: MatSort;


    selectTopTab(event) {
        switch (event) {
            case 0:
                this.selectTab(0);
                break;

            case 1:
                // this.getRehargeHistoryCount();
                this.rechargePaginator.page.pipe(
                    startWith(null),
                    tap(() => this.getRechargeHistory(this.rechargePaginator.pageIndex + 1, this.rechargePaginator.pageSize))).subscribe();
                this.rechargeDataSource.paginator = this.rechargePaginator
                break;

            default:
                break;
        }
    }

    selectTab(event) {
        switch (event) {
            case 0:
                // this.getPackageCount();
                this.packagePaginator.page.pipe(
                    startWith(null),
                    tap(() => this.getPackageInformation(this.packagePaginator.pageIndex + 1, this.packagePaginator.pageSize))).subscribe();
                this.packageDataSource.paginator = this.packagePaginator
                break;

            case 1:
                // this.getSeasonCount();
                this.seasonPaginator.page.pipe(
                    startWith(null),
                    tap(() => this.getSeasonInformation(this.seasonPaginator.pageIndex + 1, this.seasonPaginator.pageSize))).subscribe();
                this.seasonDataSource.paginator = this.seasonPaginator
                break;

            case 2:
                // this.getVideoCount();
                this.videoPaginator.page.pipe(
                    startWith(null),
                    tap(() => this.getVideoInformation(this.videoPaginator.pageIndex + 1, this.videoPaginator.pageSize))).subscribe();
                this.videoDataSource.paginator = this.videoPaginator
                break;

            default:
                break;
        }
    }

    getRechargeHistory(pageIndex?, pageSize?) {
        let filter: SupportFilter = {};
        filter.userId = this.userId;
        filter.pageIndex = pageIndex;
        filter.pageSize = pageSize;

        this.reportService.getCancellationRequests(filter, 'confirm-recharge').subscribe((response: any) => {
            if (response.status === 200) {
                this.rechargeInfo = response.data;
                this.rechargeDataSource = new MatTableDataSource<any>(this.rechargeInfo);
                this.rechargeHistoryCount = this.rechargeInfo.length;

            }
        }, error => console.error(error))
    }

    getRehargeHistoryCount() {
        this.reportService.getRechargeHistoryCount().subscribe((response: any) => {
            if (response.success) {
                this.rechargeHistoryCount = response.count;
            }
        }, error => console.log(error));
    }



    decideSubscription(row, type, decision) {
        let data: any;
        row.decision = decision;
        switch (type) {
            case 'package':
                data = row;
                this.dialog.open(WarningDialog, { width: "400px", data: { title: 'Cancel Subscription', message: 'Are you sure you want to cancel this subscription?' } })
                    .afterClosed()
                    .subscribe((result) => {
                        if (result) {
                            this.reportService.cancelSubscription(data).subscribe((response: any) => {
                                if (response.status === 200) {
                                    this.getPackageInformation(this.packagePaginator.pageIndex + 1, this.packagePaginator.pageSize)
                                }
                            }, error => console.error(error))
                        }
                    });
                break;

            case 'season':
                data = row;
                this.dialog.open(WarningDialog, { width: "400px", data: { title: 'Cancel Subscription', message: 'Are you sure you want to cancel this subscription?' } })
                    .afterClosed()
                    .subscribe((result) => {
                        if (result) {
                            this.reportService.cancelSubscription(data).subscribe((response: any) => {
                                if (response.status === 200) {
                                    this.getSeasonInformation(this.seasonPaginator.pageIndex + 1, this.seasonPaginator.pageSize)
                                }
                            }, error => console.error(error))
                        }
                    });
                break;

            case 'content':
                data = row;
                this.dialog.open(WarningDialog, { width: "400px", data: { title: 'Cancel Subscription', message: 'Are you sure you want to cancel this subscription?' } })
                    .afterClosed()
                    .subscribe((result) => {
                        if (result) {
                            this.reportService.cancelSubscription(data).subscribe((response: any) => {
                                if (response.status === 200) {
                                    this.getSeasonInformation(this.videoPaginator.pageIndex + 1, this.videoPaginator.pageSize)
                                }
                            }, error => console.error(error))
                        }
                    });
                break;

            default:
                break;
        }


    }
    decideRefund(row, decision) {
        row.decision = decision;
        let data: any = row;
        this.dialog.open(WarningDialog, { width: "400px", data: { title: 'Refund Money', message: `Are you sure you want to refund TZS${row.amount} ` } })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.reportService.refundMoney(data).subscribe((response: any) => {
                        if (response.status === 200) {
                            this.getRechargeHistory(this.rechargePaginator.pageIndex + 1, this.rechargePaginator.pageSize)
                        }
                    }, error => console.error(error))
                }
            });
    }

    getPackageInformation(pageIndex?, pageSize?) {
        let filter: SupportFilter = {};
        filter.pageIndex = pageIndex;
        filter.pageSize = pageSize;
        // this.supportService.getPackageInformation(filter).subscribe((response: any) => {
        //     if (response.code === 200) {
        //         this.packageInfo = response.data;
        //         this.packageDataSource = new MatTableDataSource<any>(this.packageInfo);
        //     }
        // }, error => console.log(error))

        this.reportService.getCancellationRequests(filter, 'confirm-package').subscribe((response: any) => {
            if (response.status === 200) {
                this.packageInfo = response.data;
                this.packageDataSource = new MatTableDataSource<any>(this.packageInfo);
                this.packageCount = response.data.length;
            }
        }, error => console.error(error))
    }

    getSeasonInformation(pageIndex?, pageSize?) {
        let filter: SupportFilter = {};
        filter.pageIndex = pageIndex;
        filter.pageSize = pageSize;

        this.reportService.getCancellationRequests(filter, 'confirm-season').subscribe((response: any) => {
            if (response.status === 200) {
                this.seasonInfo = response.data;
                this.seasonDataSource = new MatTableDataSource<any>(this.seasonInfo);
                this.seasonCount = response.data.length;

            }
        }, error => console.error(error))
    }

    getVideoInformation(pageIndex?, pageSize?) {
        let filter: SupportFilter = {};
        filter.pageIndex = pageIndex;
        filter.pageSize = pageSize;

        this.reportService.getCancellationRequests(filter, 'confirm-content').subscribe((response: any) => {
            if (response.status === 200) {
                this.videoInfo = response.data;
                this.videoDataSource = new MatTableDataSource<any>(this.videoInfo);
                this.videoCount = response.data.length;

            }
        }, error => console.error(error))
    }



    getPackageCount() {
        this.reportService.getPackageCount().subscribe((response: any) => {
            if (response.success) {
                this.packageCount = response.count;
            }
        }, error => console.log(error));
    }

    getVideoCount() {
        this.reportService.getVideoCount().subscribe((response: any) => {
            if (response.success) {
                this.videoCount = response.count;
            }
        }, error => console.log(error));
    }

    getSeasonCount() {
        this.reportService.getSeasonCount().subscribe((response: any) => {
            if (response.success) {
                this.seasonCount = response.count;
            }
        }, error => console.log(error));
    }

    getStatus(startDate, endDate) {
        if (moment(endDate).diff(moment()) > 0) {
            return 'ACTIVE';
        } else {
            return 'EXPIRED'
        }
    }

    //   getCountries() {
    //     this.countryService.list().subscribe((response: any) => {
    //       if (response.status === 200) {
    //         this.countries = response.data;
    //         this.filteredCountries.next(this.countries.slice())
    //       }
    //     },
    //       error => console.error(error));
    //   }



    //   filterMethod() {
    //     if (!this.methods)
    //       return;

    //     let search = this.filterMethodCtrl.value;
    //     if (!search) {
    //       this.filteredMethods.next(this.methods.slice());
    //       return;
    //     } else {
    //       search = search.toLowerCase();
    //     }

    //     this.filteredMethods.next(
    //       this.methods.filter(cont =>
    //         cont ?
    //           cont.label.toLowerCase().indexOf(search) > -1 :
    //           ''
    //       )
    //     )
    //   }

    //   search() {
    //     this.filter = {};

    //     if (this.country) {
    //       this.filter.country = this.country;
    //     }
    //     if (this.method === "week") {
    //       this.filter.week = true;
    //     }

    //     if (this.method === "month") {
    //       this.filter.month = true;
    //     }

    //     if (this.method === "today") {
    //       this.filter.today = moment().format("YYYY-MM-DD");
    //     }

    //     if (this.method === "range") {
    //       this.filter.from = moment(this.range.value.begin).format("YYYY-MM-DD");
    //       this.filter.to = moment(this.range.value.end).format("YYYY-MM-DD");
    //     }
    //     this.getTransactionCount(this.filter)
    //     this.getTransactions(this.filter);
    //   }

    //   getTransactions(filter: SupportFilter, pageIndex?, pageSize?) {
    //     filter.pageIndex = pageIndex;
    //     filter.pageSize = pageSize;
    //     this.reportService.getTransactions(filter).subscribe((response: any) => {
    //       if (response.status === 200) {
    //         this.datasource = response.data;
    //       }
    //     }, error => console.error(error))
    //   }

    //   getTransactionCount(filter: SupportFilter) {
    //     delete filter.pageIndex;
    //     delete filter.pageSize;
    //     this.reportService.getTransactions(filter).subscribe((response: any) => {
    //       if (response.status === 200) {
    //         this.count = response.count;
    //       }
    //     }, error => console.error(error))
    //   }


    //   resetFilters() {
    //     this.filter = {};
    //     this.country = undefined;
    //     this.method = undefined;
    //     this.getTransactionCount(this.filter)
    //     this.getTransactions(this.filter, this.rechargePaginator.pageIndex + 1, this.rechargePaginator.pageSize)

    //   }

    //   generateExcel() {
    //     if (this.filter.pageIndex)
    //       delete this.filter.pageIndex;
    //     if (this.filter.pageSize)
    //       delete this.filter.pageSize;

    //     this.reportService.getTransactions(this.filter).subscribe((response: any) => {
    //       if (response.status === 200) {
    //         this.reportService.exportFileToCsv(response.data, 'TRANSACTION REPORT', `transaction_report_${moment().format()}`);
    //       }
    //     }, error => console.error(error))
    //   }
}