
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { ExportToCsv } from 'export-to-csv';
import { SupportFilter } from './support-filter.model';


@Injectable()
export class SupportService {

    constructor(private http: HttpClient) {
    }



    getUsers(filter: SupportFilter, pageIndex?, pageSize?) {
        let url = API.BASE_URL + '/cms/customer-portal/users';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');

        let params: any = {}

        if (pageIndex)
            params.pageNumber = pageIndex;

        if (pageSize)
            params.size = pageSize;

        if (filter.mobile)
            params.mobile = filter.mobile;

        if (filter.email)
            params.email = filter.email

        if (filter.from)
            params.from = filter.from

        if (filter.to)
            params.to = filter.to

        if (filter.today)
            params.today = filter.today

        if (filter.week)
            params.week = filter.week

        if (filter.month)
            params.month = filter.month

        if (filter.userId)
            params.userId = filter.userId

        if (filter.country)
            params.country = filter.country

        if (params)
            return this.http.get<any[]>(url, { params, headers });
        return this.http.get<any>(url, { headers });
    }

    getPackageInformation(filter: SupportFilter) {
        let url = API.BASE_URL + '/cms/customer-portal/package/' + filter.userId;
        let headers = new HttpHeaders().set('Accept', 'application/json');

        let params: any = {}
        if (filter.pageSize)
            params.size = filter.pageSize;

        if (filter.pageIndex)
            params.pageNumber = filter.pageIndex

        if (params)
            return this.http.get<any>(url, { params, headers });

        return this.http.get<any>(url, { headers });

    }

    getSeasonInformation(filter: SupportFilter) {
        let url = API.BASE_URL + '/cms/customer-portal/season/' + filter.userId;
        let headers = new HttpHeaders().set('Accept', 'application/json');

        return this.http.get<any>(url, { headers });
    }

    getVideoInformation(filter: SupportFilter) {

        let url = API.BASE_URL + '/cms/customer-portal/content/' + filter.userId;
        let headers = new HttpHeaders().set('Accept', 'application/json');

        let params: any = {}
        if (filter.pageSize)
            params.size = filter.pageSize;

        if (filter.pageIndex)
            params.pageNumber = filter.pageIndex

        if (params)
            return this.http.get<any>(url, { params, headers });

        return this.http.get<any>(url, { headers });
    }

    getSmartCardInformation(filter: SupportFilter) {
        let url = API.BASE_URL + '/cms/customer-portal/smartcards/' + filter.userId;
        let headers = new HttpHeaders().set('Accept', 'application/json');

        return this.http.get<any>(url, { headers });
    }

    getRechargeInformation(filter: SupportFilter) {
        let url = API.BASE_URL + '/cms/customer-portal/recharge/' + filter.userId;
        let headers = new HttpHeaders().set('Accept', 'application/json');

        let params: any = {}
        if (filter.pageSize)
            params.size = filter.pageSize;

        if (filter.pageIndex)
            params.pageNumber = filter.pageIndex

        if (params)
            return this.http.get<any>(url, { params, headers });

        return this.http.get<any>(url, { headers });
    }

    getWalletInformation(filter: SupportFilter) {
        let url = API.BASE_URL + '/cms/customer-portal/wallet/' + filter.userId;
        let headers = new HttpHeaders().set('Accept', 'application/json');

        let params: any = {}
        if (filter.pageSize)
            params.size = filter.pageSize;

        if (filter.pageIndex)
            params.pageNumber = filter.pageIndex

        if (params)
            return this.http.get<any>(url, { params, headers });

        return this.http.get<any>(url, { headers });

    }

    // getRechargeHistory(filter: SupportFilter) {
    //     let url = API.BASE_URL + '/cms/customer-portal/recharge/' + filter.userId;
    //     let headers = new HttpHeaders().set('Accept', 'application/json');

    //     return this.http.get<any>(url, { headers });
    // }

    getUserCount() {
        let url = API.BASE_URL + '/cms/customer-portal/users-count'
        let headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<any>(url, { headers });
    }

    getSupportTickets(filter: SupportFilter) {
        let url = API.BASE_URL + '/cms/customer-portal/support'
        let headers = new HttpHeaders().set('Accept', 'application/json');
        
        let params: any = {}

        if (filter.pageIndex)
            params.pageNumber = filter.pageIndex;

        if (filter.pageSize)
            params.size = filter.pageSize;

        if (filter.mobile)
            params.mobile = filter.mobile;

        if (filter.email)
            params.email = filter.email

        if (filter.from)
            params.from = filter.from

        if (filter.to)
            params.to = filter.to

        if (filter.today)
            params.today = filter.today

        if (filter.week)
            params.week = filter.week

        if (filter.month)
            params.month = filter.month

        if (filter.userId)
            params.userId = filter.userId

        if (filter.country)
            params.country = filter.country

        if (params)
            return this.http.get<any[]>(url, { params, headers });
        return this.http.get<any>(url, { headers });

    }

    getPackageCount(id: string) {
        let url = API.BASE_URL + '/cms/customer-portal/package-count/' + id
        let headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<any>(url, { headers });
    }

    getRechargeHistoryCount(id: string) {
        let url = API.BASE_URL + '/cms/customer-portal/recharge-count/' + id
        let headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<any>(url, { headers });
    }

    getWalletCount(id: string) {
        let url = API.BASE_URL + '/cms/customer-portal/wallet-count/' + id
        let headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<any>(url, { headers });
    }

    getVideoCount(id: string) {
        let url = API.BASE_URL + '/cms/customer-portal/content-count/' + id
        let headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<any>(url, { headers });
    }


}

