import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject
} from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { VodFilter } from "../vod-filter";
import { VodService } from "../vod.service";
import { Vod } from "../vod";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith, tap } from "rxjs/operators";
import { WarningDialog } from "../../warning-dialog/dialog-warning";
import { AuthenticationService } from '../../login/login.service';
@Component({
  selector: "vod",
  templateUrl: "vod-list.component.html"
})
export class VodListComponent implements OnInit {
  typeControl = new FormControl();
  count: number;

  types: string[] = ["VOD", "NEWS", "RADIO"];
  permittedTypes: string[] = [];

  selectedType: string = this.permittedTypes[0];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngAfterViewInit(): void {
    // let pageIndex = this.paginator.pageIndex + 1

    this.paginator.page
      .pipe(
        startWith(null),
        tap(() => {
          this.getData(
            this.selectedType,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          );
        })
      )
      .subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  ngOnInit(): void {
    this.selectedType = this.permittedTypes[0];
    this.getContentCount(this.selectedType);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filter = new VodFilter();
  selectedVod: Vod;
  dataSource = new MatTableDataSource<any>([]);

  getContentType(event) {
    //Get count for particular vod type
    this.selectedType = event.value;
    this.getContentCount(this.selectedType);
    this.getData(
      event.value,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(ContentDialog, {
      width: "400px",
      data: {}
    });
  }

  getData(type, page, size) {
    this.vodService.find(type, page, size).subscribe((response: any) => {
      if (response.status === 200) {
        this.dataSource = new MatTableDataSource<any>(response.data);
      }
    });
  }

  displayedColumns: string[] = [
    "id",
    "title",
    "type",
    "vodType",
    "status",
    "action"
  ];
  constructor(private vodService: VodService, private dialog: MatDialog, public authenticationService: AuthenticationService) {
    this.types.forEach((type) => {
      if (this.authenticationService.isModuleAllowed(type, 'read'))
        this.permittedTypes.push(type);
    })
  }

  search(): void {
    // this.vodService.load(this.filter);
  }

  deleteContent(data, index?) {
    //stsart

    this.dialog
      .open(WarningDialog, {
        width: "400px",
        data: {
          title: "Warning",
          message: `Are you sure want to delete ${data.title} Content`
        }
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.vodService.delete(data).subscribe(
            (response: any) => {
              if (response.status === 200 || response.success) {
                this.getContentType({ value: data.contentType });
              }
            },
            error => console.error(error)
          );
        }
      });
    //sa
  }

  select(selected: Vod): void {
    this.selectedVod = selected;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getContentCount(contentType) {
    this.vodService.getCount(contentType).subscribe((result: any) => {
      if (result.success) {
        this.count = result.count;
      }
    });
  }
}

//Dialog
@Component({
  selector: "dialog-content-type",
  templateUrl: "../dialog-content-type.html"
})
export class ContentDialog {
  categoryControl = new FormControl("", [Validators.required]);
  vodControl = new FormControl("", [Validators.required]);

  categories: any[] = ["VOD", "NEWS", "RADIO"];

  permittedCategories: any[] = [];

  vodTypes: any[] = ["VIDEOONDEMAND", "LIVETV", "SERIES"];

  constructor(
    public dialogRef: MatDialogRef<ContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

    this.categories.forEach((category) => {
      if (authenticationService.isModuleAllowed(category, 'create'))
        this.permittedCategories.push(category);
    })
  }

  onSelectedCategoryForm(formType) {
    this.router.navigate(["home/content/content", formType]);
    this.dialogRef.close();
  }
}
