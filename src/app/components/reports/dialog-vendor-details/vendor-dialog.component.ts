import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { ReportService } from "../reports.service";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";

@Component({
  selector: "vendor-dialog",
  templateUrl: "vendor-dialog.component.html",
})
export class VendorDialogComponent {
  vendorForm = new FormGroup({
    user: new FormControl("", [Validators.required]),
    frequency: new FormControl("", [Validators.required]),
    reportType: new FormControl("", [Validators.required]),
    header: new FormControl("", [Validators.required]),
    body: new FormControl("", [Validators.required]),
    reportFormat: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required]),
  });
  loading: boolean = false;
  frequencies: String[] = ["DAILY", "WEEKLY", "MONTHLY", "QUATERLY", "YEARLY"];
  users: any[] = [];
  reportTypes: String[] = ["COLL_SUM", "REG_SUM", "NON_AZAM_USERS"];
  reportFormats: String[] = ["PDF", "XLSX", "CSV"];
  vendorStatus: String[] = ["ACTIVE", "SUSPENDED", "DELETED"];

  //Vendor Information
  vendorInformation: Object = null;

  filterUsersCtrl: FormControl = new FormControl();
  filterFormatsCtrl: FormControl = new FormControl();
  filteredUsers: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  filteredFormats: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  filterUsers() {
    if (!this.users) return;

    let search: string = this.filterUsersCtrl.value;
    if (!search) {
      this.filteredUsers.next(this.users.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredUsers.next(
      this.users.filter(
        (user) => user.customerName.toLowerCase().indexOf(search) > -1
      )
    );
  }

  filterFormats() {
    if (!this.reportFormats) return;

    let search: string = this.filterFormatsCtrl.value;
    if (!search) {
      this.filteredFormats.next(this.reportFormats.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredFormats.next(
      this.reportFormats.filter(
        (format) => format.toLowerCase().indexOf(search) > -1
      )
    );
  }

  filterReportTypeCtrl: FormControl = new FormControl();
  filteredReportTypes: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  filterReportTypes() {
    if (!this.reportTypes) return;

    let search: string = this.filterReportTypeCtrl.value;
    if (!search) {
      this.filteredReportTypes.next(this.reportTypes.slice());
    } else {
      search = search.toLowerCase();
    }

    this.filteredReportTypes.next(
      this.reportTypes.filter(
        (reportType) => reportType.toLowerCase().indexOf(search) > -1
      )
    );
  }

  constructor(
    public dialogRef: MatDialogRef<VendorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reportService: ReportService
  ) {
    if (data) {
      this.vendorInformation = {};
      Object.assign(this.vendorInformation, data);
      this.vendorForm.removeControl("user");
      this.vendorForm.addControl(
        "email",
        new FormControl({ value: "", disabled: true })
      );
      this.vendorForm.addControl(
        "username",
        new FormControl({ value: "", disabled: true })
      );
      this.vendorForm.setValue({
        frequency: data.frequency,
        reportType: data.reportType,
        header: data.header,
        body: data.header,
        reportFormat: data.reportFormat,
        email: data.email,
        username: data.username,
        status: data.status,
      });
    }
    this.getUsers();
    this.filteredReportTypes.next(this.reportTypes.slice());
    this.filteredFormats.next(this.reportFormats.slice());
  }

  getUsers() {
    this.reportService.getVendorUsers().subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.users = response.data;
        this.filteredUsers.next(this.users);
      } else {
      }
    });
  }

  manageVendor() {
    this.loading = true;
    if (this.vendorInformation) {
      Object.assign(this.vendorInformation, this.vendorForm.value);
      this.reportService
        .updateVendorConfiguration(this.vendorInformation)
        .subscribe((response: any) => {
          this.loading = false;
          if (response.success) {
            this.dialogRef.close(this.vendorInformation);
          }
        });
    } else {
      let vendor = this.vendorForm.value;
      vendor["email"] = vendor.user.vendorEmail;
      vendor["username"] = vendor.user.username;
      vendor["companyName"] = vendor.user.vendorCompanyName;
      delete vendor.user;
      this.reportService
        .createVendorConfiguration(vendor)
        .subscribe((response: any) => {
          this.loading = false;
          if (response.success) {
            this.dialogRef.close(vendor);
          }
        });
    }
  }

  getData() {
    if (this.vendorInformation !== null) {
      Object.assign(this.vendorInformation, this.vendorForm.value);
      return this.vendorInformation;
    } else {
      return this.vendorForm.value;
    }
  }
}
