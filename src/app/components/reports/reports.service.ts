import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment }from "src/environments/environment";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { SupportFilter } from "../support/support-filter.model";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  exportFileToCsv(data: any[], title?: string, filename?: string, headers?) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, {
      header: headers,
    });
    console.log("worksheet", worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
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
    let url = environment.apiUrl + "/cms/reports/summary?type=COLL_SUM";
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
    let url = environment.apiUrl + "/cms/reports/summary?type=COLL_DET";
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
    let url = environment.apiUrl + "/cms/reports/summary?type=TRNCS_SUM";
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
    let url = environment.apiUrl + "/cms/reports/summary";
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
    let url = environment.apiUrl + "/cms/reports/" + subscriptionType;
    return this.http.get(url, { params });
  }

  cancelSubscription(data) {
    let url = environment.apiUrl + "/cms/cancelSubscription";
    return this.http.post(url, data);
  }

  refundMoney(data) {
    let url = environment.apiUrl + "/cms/refundMoney";
    return this.http.post(url, data);
  }

  getPackageCount() {
    let url = environment.apiUrl + "/cms/reports/confirm-package";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<any>(url, { headers });
  }

  getRechargeHistoryCount() {
    let url = environment.apiUrl + "/cms/reports/confirm-recharge";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<any>(url, { headers });
  }

  getVideoCount() {
    let url = environment.apiUrl + "/cms/reports/confirm-content";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<any>(url, { headers });
  }

  getSeasonCount() {
    let url = environment.apiUrl + "/cms/reports/confirm-season";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<any>(url, { headers });
  }

  getSubscriptionReport(filter) {
    let url = environment.apiUrl + "/cms/reports/summary";
    let headers = new HttpHeaders().set("Accept", "application/json");
    let params: any = {};
    if (filter.type) params.type = filter.type;

    if (filter.from) params.from = filter.from;

    if (filter.to) params.to = filter.to;

    if (filter.today) params.today = filter.today;

    if (filter.week) params.week = true;

    if (filter.month) params.month = true;

    return this.http.get<any>(url, { headers, params });
  }

  getInvoiceReport(filter) {
    let url = environment.apiUrl + "/cms/reports/summary?type=INVOICE";
    let headers = new HttpHeaders().set("Accept", "application/json");
    let params: any = {};

    if (filter.from) params.from = filter.from;

    if (filter.to) params.to = filter.to;

    if (filter.today) params.today = filter.today;

    if (filter.week) params.week = true;

    if (filter.month) params.month = true;

    return this.http.get<any>(url, { headers, params });
  }

  getVendorConfigurationList(page, size) {
    let url = environment.apiUrl + "/cms/channelprovider-list";
    let params: any = {};

    if (page) params.page = page;

    if (size) params.size = size;

    return this.http.get<any>(url, { params });
  }

  getVendorConfigurationById(vendorId) {
    let url = environment.apiUrl + "/cms/channelprovider/" + vendorId;
    return this.http.get<any>(url);
  }

  createVendorConfiguration(data) {
    let url = environment.apiUrl + "/cms/channelprovider/create";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.post<any>(url, data, { headers });
  }

  updateVendorConfiguration(vendorConfigData: any) {
    let url =
      environment.apiUrl + `/cms/channelprovider/${vendorConfigData._id}/update`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.put<any>(url, vendorConfigData, { headers });
  }

  delete(vendorConfigId: any) {
    let url = environment.apiUrl + "/cms/channelprovider/" + vendorConfigId;
    return this.http.delete<any>(url);
  }

  getVendorUsers() {
    let url = environment.apiUrl + "/cms/getChannelProviderUser";
    return this.http.get<any>(url);
  }

  fetchReportSubtypes() {
    let url = environment.apiUrl + "/cms/reports/subtypes";
    return this.http.post<any>(url, {});
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
