import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
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
export class GuideListComponent implements OnInit, AfterViewInit {
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
  dataSource = new MatTableDataSource<Guide[]>([]);
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

  showMessage(title, message) {
    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: title,
          message: message,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.getGuides(this.paginator.pageIndex + 1, this.paginator.pageSize)
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
    var headerArray = [];
    for (let i = 0; i < header.length; i++) {
      headerArray.push(header[i].trim());
    }

    if (model.length !== header.length) {
      return false;
    }
    let count = 0;
    for (let index = 0; index < headerArray.length; index++) {
      if (headerArray.indexOf(model[index].trim()) > -1) {
        ++count;
      }
    }
    if (count === model.length) {
      return true;
    } else {
      return false;
    }
  }

  convertToJson(csv) {
    let reader = new FileReader();
    reader.onload = () => {
      let text: any = reader.result;
      console.log("CSV: ", text.substring(0, 100) + "...");
      var lines = text.split("\n");

      var result = [];

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

      if (!this.checkIfPresnet(model, headers)) {
        this.showMessage("Error", "Unable to process file");
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
        let date_time_in_gmt = moment(`${r.date} ${r.time_from}`, 'DD-MM-YYYY hh:mm');
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
            this.showMessage("Success", "Successfully uploaded guide");
          } else {
            this.showMessage("Error", "Uploading TV guide files");
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

  getDateTimeProperTimezone(date: string) {
    return moment.utc(date).local().toISOString(true).split(".")[0];
  }
}