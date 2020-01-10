
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { ExportToCsv } from 'export-to-csv';


@Injectable()
export class ReportService {

    constructor(private http: HttpClient) {
    }

    exportFileToCsv(data: any) {
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'My Awesome CSV',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };

        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(data);
    }

    getReport(options: any) {

        let url = "";
        if (options) {

        }
        this.http.get(url, { params: options });
    }
}

