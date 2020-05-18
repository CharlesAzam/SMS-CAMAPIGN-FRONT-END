import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { CountryService } from "src/app/services/coutry.service";
import { ReportService } from "../reports.service";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Router } from "@angular/router";
import { VendorDialogComponent } from "../dialog-vendor-details/vendor-dialog.component";
import { WarningDialog } from '../../warning-dialog/dialog-warning';

@Component({
  selector: "vendor-reports",
  templateUrl: "./vendor-reports.component.html",
  styleUrls: ["./vendor-reports.component.css"],
})
export class VendorReportConfigComponent implements OnInit {
  displayedColumns: string[] = [
    "No",
    "vendorName",
    "email",
    "reportType",
    "frequency",
    "actions",
  ];

  constructor(
    private countryService: CountryService,
    private reportService: ReportService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  datasource = new MatTableDataSource<any>([]);
  vendorConfigurationList: any[] = [];

  ngOnInit() {
    this.getVendorInformation();
  }

  ngAfterViewInit(): void {}
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  search() {}

  openDialog(data) {
    const dialogRef = this.dialog.open(VendorDialogComponent, {
      width: "800px",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  getVendorInformation() {
    this.reportService
      .getVendorConfigurationList()
      .subscribe((response: any) => {
        if (response.success) {
          this.vendorConfigurationList = response.data;
          this.datasource = response.data;
        }
      });
  }

  deleteVendorConfiguration(row){
    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: "Warning",
          message: `Are you sure want to delete this configuration`
        }
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.reportService.delete(row._id).subscribe(
            (response: any) => {
              if (response.status === 200)
                this.getVendorInformation();
            },
            error => console.error(error)
          );
        }
      });
  }
}
