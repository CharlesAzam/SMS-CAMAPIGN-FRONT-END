import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import * as moment from 'moment';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil, startWith, tap } from 'rxjs/operators';
import { SupportFilter } from '../../support/support-filter.model';
import { ReportService } from '../reports.service';

@Component({
  selector: 'app-subscriber-count-reports',
  templateUrl: './subscriber-count-reports.component.html',
  styleUrls: ['./subscriber-count-reports.component.css']
})
export class SubscriberCountReportsComponent implements OnInit {

  filterMethodCtrl = new FormControl('');
  filterCountryCtrl = new FormControl('');
  range = new FormControl('');
  count: number;
  datasource = new MatTableDataSource<any>([])
  protected _onDestroy = new Subject<void>();

  method: any = '';
  filter: SupportFilter;

  countries: any[] = [];
  methods: any[] = [
    { label: 'This Week', id: 'week' },
    { label: 'This Month', id: 'month' },
    { label: 'Date Range', id: 'range' },
  ]
  filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredMethods: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  displayedColumns: string[] = ['No', 'packageName', 'totalSubscriberCount']

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.filteredMethods.next(this.methods.slice());
    this.filterMethodCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMethod();
      })
  }

  ngAfterViewInit(): void {
    this.filter = {
      from: moment().startOf('month').format("YYYY-MM-DD"),
      to: moment().endOf('month').format("YYYY-MM-DD")
    };

    this.paginator.page
      .pipe(
        startWith(null),
        tap(() =>
          this.getSubscriberCount(
            this.filter,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          )
        )
      )
      .subscribe();

  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


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
    this.filter = {};

    if (this.method === "week") {
      this.filter.from = moment().startOf('week').format("YYYY-MM-DD");
      this.filter.to = moment().endOf('week').format("YYYY-MM-DD");
    }

    if (this.method === "month") {
      this.filter.from = moment().startOf('month').format("YYYY-MM-DD");
      this.filter.to = moment().endOf('month').format("YYYY-MM-DD");
    }

    if (this.method === "range") {
      this.filter.from = moment(this.range.value.begin).format("YYYY-MM-DD");
      this.filter.to = moment(this.range.value.end).format("YYYY-MM-DD");
    }

    this.getSubscriberCount(this.filter);

  }

  getSubscriberCount(filter: SupportFilter, pageIndex?, pageSize?) {
    filter.pageIndex = pageIndex ? pageIndex : this.paginator.pageIndex + 1;
    filter.pageSize = pageSize ? pageSize : this.paginator.pageSize;
    this.reportService.getSubscriberCount(filter).subscribe((response: any) => {
      if (response.success) {
        this.datasource = response.data;
        this.count = response.count;
      }
    }, error => console.error(error))
  }

  generateExcel() {
    if (this.filter.pageIndex)
      delete this.filter.pageIndex;
    if (this.filter.pageSize)
      delete this.filter.pageSize;

    this.reportService.getSubscriberCount(this.filter).subscribe((response: any) => {
      if (response.status === 200) {
        this.reportService.exportFileToCsv(response.data, 'SUBSCRIBER COUNT', `subscriber-count-report-${moment().format()}`);
      }
    }, error => console.error(error))
  }

  resetFilters() {
    this.method = undefined;
    this.getSubscriberCount(this.filter, this.paginator.pageIndex + 1, this.paginator.pageSize)

  }
}
