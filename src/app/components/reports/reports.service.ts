
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { ExportToCsv } from 'export-to-csv';
import { SupportFilter } from '../support/support-filter.model';


@Injectable()
export class ReportService {

    constructor(private http: HttpClient) {
    }

    exportFileToCsv(data: any[], title?: string, filename?: string) {
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: title,
            useTextFile: false,
            useBom: true,
            filename: filename,
            useKeysAsHeaders: true,
        };
        console.log(title)
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(data);
    }

    getReport(options: any) {

        let url = "";
        if (options) {

        }
        this.http.get(url, { params: options });
    }

    getCollectionSummary(filter?: SupportFilter) {
        let url = API.BASE_URL + '/cms/reports/summary?type=COLL_SUM';
        let headers = new HttpHeaders().set("Accept", "application/json");

        let params: any = {};


        if (filter.pageSize) params.size = filter.pageSize;

        if (filter.pageIndex) params.pageNumber = filter.pageIndex;

        if (filter.mobile) params.mobile = filter.mobile;

        if (filter.email) params.email = filter.email;

        if (filter.from) params.from = filter.from;

        if (filter.to) params.to = filter.to;

        if (filter.today) params.today = filter.today;

        if (filter.week) params.week = true;

        if (filter.month) params.month = true;

        if (filter.userId) params.userId = filter.userId;

        if (filter.sortorder) params.sortorder = filter.sortorder;

        if (filter.sortby) params.sortby = filter.sortby;

        if (filter.country) params.country = filter.country;
        return this.http.get(url, { params, headers });
    }

    getDetailedCollection(filter?: SupportFilter) {
        let url = API.BASE_URL + '/cms/reports/summary?type=COLL_DET';
        let headers = new HttpHeaders().set("Accept", "application/json");

        let params: any = {};


        if (filter.pageSize) params.size = filter.pageSize;

        if (filter.pageIndex) params.pageNumber = filter.pageIndex;

        if (filter.mobile) params.mobile = filter.mobile;

        if (filter.email) params.email = filter.email;

        if (filter.from) params.from = filter.from;

        if (filter.to) params.to = filter.to;

        if (filter.today) params.today = filter.today;

        if (filter.week) params.week = true;

        if (filter.month) params.month = true;

        if (filter.userId) params.userId = filter.userId;

        if (filter.sortorder) params.sortorder = filter.sortorder;

        if (filter.sortby) params.sortby = filter.sortby;

        if (filter.country) params.country = filter.country;
        return this.http.get(url, { params, headers });
    }

    getCollectionSummaryCount() {

    }

    getTransactions(filter?: SupportFilter) {
        let url = API.BASE_URL + '/cms/reports/summary?type=TRNCS_SUM';
        let headers = new HttpHeaders().set("Accept", "application/json");

        let params: any = {};


        if (filter.pageSize) params.size = filter.pageSize;

        if (filter.pageIndex) params.pageNumber = filter.pageIndex;

        if (filter.mobile) params.mobile = filter.mobile;

        if (filter.email) params.email = filter.email;

        if (filter.from) params.from = filter.from;

        if (filter.to) params.to = filter.to;

        if (filter.today) params.today = filter.today;

        if (filter.week) params.week = true;

        if (filter.month) params.month = true;

        if (filter.userId) params.userId = filter.userId;

        if (filter.sortorder) params.sortorder = filter.sortorder;

        if (filter.sortby) params.sortby = filter.sortby;

        if (filter.country) params.country = filter.country;
        return this.http.get(url, { params, headers });
    }

    getUserReports(filter?: SupportFilter) {
        let url = API.BASE_URL + '/cms/reports/summary';
        let headers = new HttpHeaders().set("Accept", "application/json");

        let params: any = {};
        if (filter.type) params.type = filter.type;


        if (filter.pageSize) params.size = filter.pageSize;

        if (filter.pageIndex) params.pageNumber = filter.pageIndex;

        if (filter.mobile) params.mobile = filter.mobile;

        if (filter.email) params.email = filter.email;

        if (filter.from) params.from = filter.from;

        if (filter.to) params.to = filter.to;

        if (filter.today) params.today = filter.today;

        if (filter.week) params.week = true;

        if (filter.month) params.month = true;

        if (filter.userId) params.userId = filter.userId;

        if (filter.sortorder) params.sortorder = filter.sortorder;

        if (filter.sortby) params.sortby = filter.sortby;

        if (filter.country) params.country = filter.country;



        return this.http.get(url, { params, headers });
    }

    getCancellationRequests(filter: SupportFilter, subscriptionType: string) {

        let params: any = {};
        if (filter.type) params.type = filter.type;


        if (filter.pageSize) params.size = filter.pageSize;
        if (filter.pageIndex) params.pageNumber = filter.pageIndex;
        let url = API.BASE_URL + '/cms/reports/' + subscriptionType;
        return this.http.get(url, { params });
    }

    cancelSubscription(data) {
        let url = API.BASE_URL + "/cms/cancelSubscription";
        return this.http.post(url, data);
    }

    refundMoney(data) {
        let url = API.BASE_URL + "/cms/refundMoney";
        return this.http.post(url, data);
    }


    getPackageCount() {
        let url = API.BASE_URL + "/cms/confirm-package";
        let headers = new HttpHeaders().set("Accept", "application/json");
        return this.http.get<any>(url, { headers });
    }

    getRechargeHistoryCount() {
        let url = API.BASE_URL + "/cms/confirm-recharge";
        let headers = new HttpHeaders().set("Accept", "application/json");
        return this.http.get<any>(url, { headers });
    }

    getVideoCount() {
        let url = API.BASE_URL + "/cms/confirm-content";
        let headers = new HttpHeaders().set("Accept", "application/json");
        return this.http.get<any>(url, { headers });
    }

    getSeasonCount() {
        let url = API.BASE_URL + "/cms/confirm-season";
        let headers = new HttpHeaders().set("Accept", "application/json");
        return this.http.get<any>(url, { headers });
    }


}

