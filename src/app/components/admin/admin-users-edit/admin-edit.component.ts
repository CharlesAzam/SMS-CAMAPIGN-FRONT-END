import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { Admin } from "../admin";
import { AdminService } from "../admin.service";
import { FormGroup, FormControl, Validators, Form } from "@angular/forms";

@Component({
  selector: "admin-edit-users",
  templateUrl: "./admin-edit.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminEditComponent implements OnInit {
  createUserModel = new Admin();
  roles = [];
  hide = true;
  isVendorRole: boolean;

  userForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
    roles: new FormControl(""),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    vendorEmail: new FormControl(""),
    vendorCompanyName: new FormControl(""),
    vendorPhone: new FormControl(""),
    vendorWebsite: new FormControl(""),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.adminService.listRoles().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.roles = response.data;
        }
      },
      (error) => console.log("error", error)
    );
  }

  changeRole(event) {
    if (event.value === "VENDOR_ROLE") {
      this.isVendorRole = true;
      this.userForm.setValidators([Validators.required]);
      this.userForm
        .get("vendorEmail")
        .setValidators([Validators.email, validateEmail]);
      this.userForm.get("vendorEmail").errors;
    }
  }

  onSubmit() {
    let roleArray = [];

    if (this.userForm.value["roles"] === "VENDOR_ROLE") {
      this.userForm.value["customerName"] =
        this.userForm.value["firstName"] +
        " " +
        this.userForm.value["lastName"];
    }
    roleArray.push(this.userForm.value["roles"]);
    this.userForm.value["roles"] = roleArray;

    this.adminService.createUser(this.userForm.value).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.router.navigate(["home/admin/users"]);
        }
      },
      (error) => console.log("error", error)
    );
  }
}

function validateEmail(c: FormControl) {
  let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return EMAIL_REGEXP.test(c.value)
    ? checkIfNotCompanyEmail(c)
    : {
        validateEmail: {
          valid: false,
        },
      };
}

function checkIfNotCompanyEmail(c: FormControl) {
  let str = c.value.toLowerCase();
  if (str.trim().length > 0) {
    let res = str.split("@");
    let mail = res[1].split(".");
    if (mail[0] == "gmail" || mail[0] == "yahoo") {
      return {
        checkIfNotCompanyEmail: {
          valid: false,
        },
      };
    }
  }
  return null;
}
