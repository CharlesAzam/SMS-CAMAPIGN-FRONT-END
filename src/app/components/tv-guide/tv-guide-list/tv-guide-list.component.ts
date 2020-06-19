import { Component, OnInit, ViewChild } from "@angular/core";
import { GuideFilter } from "../tv-guide-filter";
import { GuideService } from "../tv-guide.service";
import { Guide } from "../tv-guide";
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialog,
} from "@angular/material";
import { startWith, tap } from "rxjs/operators";
import { WarningDialog } from "../../warning-dialog/dialog-warning";
import { AuthenticationService } from "../../login/login.service";
import * as moment from 'moment';

@Component({
  selector: "tv-guide",
  templateUrl: "tv-guide-list.component.html",
})
export class GuideListComponent {
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  searchTimeout = null;
  filterText: string = "";

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith(null),
        tap(() =>
          this.getGuides(this.paginator.pageIndex + 1, this.paginator.pageSize)
        )
      )
      .subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  filter = new GuideFilter();
  selectedGuide: Guide;
  dataSource = new MatTableDataSource<Guide>([]);
  count: number;

  displayedColumns: string[] = ["No", "name", "startTime", "endTime", "action"];

  constructor(
    private guideService: GuideService,
    private dialog: MatDialog,
    public authenticationService: AuthenticationService
  ) { }

  delete(row) {
    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: "Warning",
          message: `Are you sure want to delete ${row.name} guide`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.guideService.delete(row._id).subscribe(
            (response: any) => {
              if (response.status === 200) {
                this.getGuides(
                  this.paginator.pageIndex + 1,
                  this.paginator.pageSize
                );
              }
            },
            (error) => console.error(error)
          );
        }
      });
  }

  ngOnInit() {
    this.getCount();
    // this.getBanners(this.paginator.pageIndex, this.paginator.pageSize);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(): void {
    this.guideService.load(this.filter);
  }

  select(selected: Guide): void {
    this.selectedGuide = selected;
  }

  applyFilter(filterValue: string) {
    if (
      filterValue.trim().length >= 3 ||
      filterValue.length < this.filterText.length
    ) {
      this.filterText = filterValue;
      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.getGuides(1, this.paginator.pageSize);
      }, 500);
    }
  }

  getGuides(index, size) {
    console.log(index);
    this.guideService.find(index, size, this.filterText).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.dataSource = new MatTableDataSource(response.data);
        }
      },
      (error) => console.error(error)
    );
  }

  uploadedFile(event) {
    console.log(event.target.files[0]);
    this.convertToJson(event.target.files[0]);
  }
  checkIfPresnet(model, header) {
    if (model.length !== header.length) {
      return false;
    }
    let count = 0;
    for (let index = 0; index < header.length; index++) {
      if (header.indexOf(model[index]) > -1) {
        ++count;
      }
    }
    if (count === model.length) {
      return true;
    }
  }

  convertToJson(csv) {
    let reader = new FileReader();
    reader.onload = () => {
      let text: any = reader.result;
      console.log("CSV: ", text.substring(0, 100) + "...");
      var lines = text.split("\n");

      var result = [];

      // NOTE: If your columns contain commas in their values, you'll need
      // to deal with those before doing the next step
      // (you might convert them to &&& or something, then covert them back later)
      // jsfiddle showing the issue https://jsfiddle.net/
      var headers = lines[0].split(",");
      const model = [
        "channel",
        "date",
        "time_from",
        "time_to",
        "name",
        "type",
        "image",
        "laligalive",
        "tags",
        "program_type",
      ];
      console.log("hihhihi", this.checkIfPresnet(model, headers));
      if (!this.checkIfPresnet(model, headers)) {
        return null;
      }
      for (var i = 1; i < lines.length; i++) {
        if (lines[i]) {
          var obj = {};
          var currentline = lines[i].split(",");
          console.log("CSV==============>", currentline);
          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }

          result.push(obj);
        }
      }

      result.forEach(r => {
        let date_time_in_gmt = moment(`${r.date} ${r.time_from}`, 'DD-MM-YY hh:mm');
        let duration = moment(r.time_to, 'hh:mm').diff(moment(r.time_from, 'hh:mm'));
        
        r.date_time_in_gmt = date_time_in_gmt.toISOString();
        r.end_date_time_in_gmt = date_time_in_gmt.add(duration, 'milliseconds').toISOString();
        delete r.time_from;
        delete r.time_to;
        delete r.date;
      });

      console.log(result)
      this.guideService.bulkUpload(result).subscribe(
        (response: any) => {
          this.getGuides(this.paginator.pageIndex + 1, this.paginator.pageSize);
          if (response.success) {
            console.log("success");
          } else {
            console.log("failed");
          }
        },
        (err: any) => {
          console.error(err);
        }
      );
      return JSON.stringify(result); //JSON


    };
    reader.readAsText(csv);
  }

  extractFields() {

  }

  getCount() {
    this.guideService.getCount().subscribe(
      (response: any) => {
        console.log(response);
        if (response.success) {
          this.dataSource = new MatTableDataSource(response.data);
          this.count = response.count;
        }
      },
      (error) => console.error(error)
    );
  }
}
