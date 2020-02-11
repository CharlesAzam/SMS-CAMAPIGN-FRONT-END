import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { API } from "src/environments/environment";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { SupportFilter } from "../support/support-filter.model";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  exportFileToCsv(data: any[], title?: string, filename?: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, filename);
  }

  getReport(options: any) {
    let url = "";
    if (options) {
    }
    this.http.get(url, { params: options });
  }

  getCollectionSummary(filter?: SupportFilter) {
    let url = API.BASE_URL + "/cms/reports/summary?type=COLL_SUM";
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
    let url = API.BASE_URL + "/cms/reports/summary?type=COLL_DET";
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

  getCollectionSummaryCount() {}

  getTransactions(filter?: SupportFilter) {
    let url = API.BASE_URL + "/cms/reports/summary?type=TRNCS_SUM";
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
    let url = API.BASE_URL + "/cms/reports/summary";
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
    let url = API.BASE_URL + "/cms/reports/" + subscriptionType;
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
    let url = API.BASE_URL + "/cms/reports/confirm-package";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<any>(url, { headers });
  }

  getRechargeHistoryCount() {
    let url = API.BASE_URL + "/cms/reports/confirm-recharge";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<any>(url, { headers });
  }

  getVideoCount() {
    let url = API.BASE_URL + "/cms/reports/confirm-content";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<any>(url, { headers });
  }

  getSeasonCount() {
    let url = API.BASE_URL + "/cms/reports/confirm-season";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<any>(url, { headers });
  }

  getSubscriptionReport(filter) {
    let url = API.BASE_URL + "/cms/reports/summary";
    let headers = new HttpHeaders().set("Accept", "application/json");
    let params: any = {};
    if (filter.type) params.type = filter.type;

    if (filter.from) params.from = filter.from;

    if (filter.to) params.to = filter.to;

    if (filter.today) params.today = filter.today;

    if (filter.week) params.week = true;

    if (filter.month) params.month = true;

    return this.http.get<any>(url, { headers, params});
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
