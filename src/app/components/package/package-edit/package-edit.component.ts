import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PackageService } from "../package.service";
import { Package } from "../package";
import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LanguageService } from "src/app/services/language.service";
import { VodService } from "../../vod/vod.service";
import { CountryService } from "src/app/services/coutry.service";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSelect, MatOption } from "@angular/material";
import { AppleProduct } from "../apple-product";
import { ErrorDialog } from "../../error-dialog/dialog-error";

@Component({
  selector: "package-edit",
  templateUrl: "./package-edit.component.html"
})
export class PackageEditComponent implements OnInit {
  id: string;
  packageDef: Package;
  errors: string;
  azamPackages: any[];
  countries: any[];
  currencies: any[] = ['USD', 'TZS', 'KES', 'UGX', 'MWK', 'RWF', 'BIF'];
  priceArray: any[] = [];
  contents: any[] = [];
  liveTvContent: any[] = [];
  vodContent: any[] = [];
  allSelected: boolean = false;
  fileToUpload: any = null;
  isUploading: boolean = false;
  appleProducts: AppleProduct[] = [];
  @ViewChild("contentSelction", null) contentSelction: MatSelect;


  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
    private contentService: VodService,
    private languageService: LanguageService,
    private countryService: CountryService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  packageForm = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    isFree: new FormControl(""),
    azamPackageMappingName: new FormControl(""),
    isVodAllowed: new FormControl(""),
    countryDetail: new FormControl(""),
    // link: new FormControl(''),
    isSmartcardAddOn: new FormControl(""),
    validityInDays: new FormControl(""),
    status: new FormControl(""),
    liveTvContent: new FormControl([]),
    vodContent: new FormControl([]),
    appleProductId: new FormControl("")
  });

  IsFreeToggleFormHide() {
    console.log("hide");
    // this.PackageEditForm.get('free').value
  }

  IsFreeToggleFormShow() {
    console.log("show");
  }

  imageUrl: string = '';

  hidden = false;

  ngOnInit() {
    this.getAppleProducts();
    this.getPlanInfo();
    // this.getCountryCode();
    this.getContents();
    this.getCountries();
    // this.getLanguages();
    this.route.params.subscribe((params: any) => {
      if (params.id !== "new") {
        this.getSelectedPage(params.id);
      }
    });
  }

  getSelectedPage(id) {
    this.packageService.findById(id).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 200) {
          this.packageDef = response.data[0];
          this.packageForm.setValue({
            name: this.packageDef.name ? this.packageDef.name : "",
            description: this.packageDef.description
              ? this.packageDef.description
              : "",
            isFree: String(this.packageDef.isFree)
              ? String(this.packageDef.isFree)
              : "",
            isSmartcardAddOn: String(this.packageDef.isSmartcardAddOn)
              ? String(this.packageDef.isSmartcardAddOn)
              : "",
            liveTvContent: this.packageDef.content ? this.packageDef.content.filter((pack) => pack.vodType !== 'VIDEO').map((pack) => pack._id) : [],
            vodContent: this.packageDef.content ? this.packageDef.content.filter((pack) => pack.vodType === 'VIDEO').map((pack) => pack._id) : [],
            azamPackageMappingName: this.packageDef.azamPackageMappingName
              ? this.packageDef.azamPackageMappingName
              : "",
            appleProductId: this.packageDef.appleProductId ? this.packageDef.appleProductId : "",
            isVodAllowed: String(this.packageDef.isVodAllowed)
              ? String(this.packageDef.isVodAllowed)
              : "",
            countryDetail: this.packageDef.countryDetail
              ? this.packageDef.countryDetail["_id"]
              : "",
            validityInDays: String(this.packageDef.validityInDays)
              ? String(this.packageDef.validityInDays)
              : "",
            status: this.packageDef.status ? this.packageDef.status : ""
          });
          this.priceArray = this.packageDef.price;
          this.imageUrl = this.packageDef.imageUrl;
        }
      },
      error => console.error(error)
    );
  }

  openDialog(i?) {
    const index = i;
    const dialogRef = this.dialog.open(AddPricesDialog, {
      width: "800px",
      data: String(index) !== "undefined" ? this.priceArray[index] : null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (String(index) !== "undefined") {
          this.priceArray[index] = result;
        } else {
          this.priceArray.push(result);
        }
      }
    });
  }
  getPlanInfo() {
    this.packageService.findAzamPackageMappingList().subscribe(
      planInfo => {
        this.azamPackages = planInfo.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  toggleAllSelection() {
    this.allSelected = !this.allSelected; // to control select-unselect

    if (this.allSelected) {
      this.contentSelction.options.forEach((item: MatOption) => {
        if (item.value != 0) {
          item.select();
        } else {
          item.deselect();
        }
      });
    } else {
      this.contentSelction.options.forEach((item: MatOption) => {
        item.deselect();
      });
    }
  }

  getAppleProducts() {
    this.packageService.appleProductList().subscribe((result: any) => {
      this.appleProducts = result.data;
    });
  }

  getContents() {
    this.contentService.find("vod").subscribe(
      (result: any) => {
        this.contents = result.data;
        this.liveTvContent = this.contents.filter((content) => content.vodType === 'LIVETV');
        this.vodContent = this.contents.filter(content => content.vodType === 'VIDEO');

      },
      err => {
        console.log("------->", err);
      }
    );
  }
  getCountryCode() {
    this.packageService.findCountryCodes().subscribe(
      country => {
        console.log(country);
        this.currencies = country.data;
      },
      err => {
        console.log("err----->", err);
      }
    );
  }

  getCountries() {
    this.countryService.list().subscribe(
      country => {
        console.log("--------->", country);
        this.countries = country.data;
      },
      err => {
        console.log("err----->", err);
      }
    );
  }

  back() {
    this.router.navigate(["home/package"]);
  }

  save() {
    this.packageForm.value.price = this.priceArray;
    this.packageForm.value.imageUrl = this.imageUrl;
    if (this.packageDef) {
      Object.assign(this.packageDef, this.packageForm.value);
      delete this.packageDef.content;
      this.packageDef.content = this.packageForm.value['liveTvContent'].concat(this.packageForm.value['vodContent']);
      this.packageService.update(this.packageDef).subscribe(
        (response: any) => {
          if (response.success && response.Code === 200) {
            this.errors = "Update was successful!";
            this.back();
          } else {
            this.errors = "Error saving";
          }
        },
        err => {
          this.dialog
            .open(ErrorDialog, {
              width: "400px",
              data: {
                title: "Error",
                message: `Error occurred while updating package `,
              },
            })
          this.errors = "Error updating";
        }
      );
    } else {
      const data = { ...this.packageForm.value, content: this.packageForm.value['liveTvContent'].concat(this.packageForm.value['vodContent']) }
      this.packageService.save(data).subscribe(
        (response: any) => {
          if (response.success && response.Code === 200) {
            this.errors = "Save was successful!";
            this.back();
          } else {
            this.dialog
              .open(ErrorDialog, {
                width: "400px",
                data: {
                  title: "Error",
                  message: `Error occurred while creating new package `,
                },
              })
            this.errors = "Error saving";
          }
        },
        err => {
          this.errors = "Error saving";
        }
      );
    }
  }
  removePrice(index) {
    if (confirm("Are you sure to remove this price Object?")) {
      this.priceArray.splice(index, 1);
    }
  }


  handelImageChange(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileToUpload.mimeType = this.fileToUpload.type;
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this.isUploading = true;
    this.contentService.uploadUrl(this.fileToUpload).subscribe(
      (response: any) => {
        this.isUploading = false;
        if (response.status == 200 || response.success) {
          this.imageUrl = response.fileUrl;
        }
      },
      error => {
        this.isUploading = false;
      }
    );
  }
}

@Component({
  selector: "dialog-content-type",
  templateUrl: "../dialog-content-add-price.html"
})
export class AddPricesDialog {
  packageForm = new FormGroup({
    packageName: new FormControl(""),
    packageDescription: new FormControl(""),
    price: new FormControl(""),
    currency: new FormControl(""),
    noOfDays: new FormControl("")
  });
  episode: any[] = [];
  currencies: any[] = ['USD', 'TZS', 'KES', 'UGX', 'MWK', 'RWF', 'BIF'];
  editPackageObject: Object = null;

  constructor(
    public dialogRef: MatDialogRef<AddPricesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialog: MatDialog
  ) {
    console.log(data);
    if (data) {
      this.editPackageObject = data;
      this.packageForm.setValue({
        packageName: data.packageName ? data.packageName : "",
        packageDescription: data.packageDescription ? data.packageDescription : "",
        currency: data.currency ? data.currency : "",
        noOfDays: data.noOfDays ? data.noOfDays : "",
        price: data.price ? data.price : ""
      });
      this.episode = data.episode;
    }
  }

  getData() {
    if (this.editPackageObject !== null) {
      //Object.assign(this.editPackageObject, this.packageForm.value);
      //return this.editPackageObject;
      return this.packageForm.value;
    } else {
      return this.packageForm.value;
    }
  }
}
