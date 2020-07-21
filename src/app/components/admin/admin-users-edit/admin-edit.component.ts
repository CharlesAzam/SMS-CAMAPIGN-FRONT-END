import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { Admin } from "../admin";
import { AdminService } from "../admin.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

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

  showCreate = null;
  showEdit = null;
  userId = null;
  @Input() heading: String = null;
  @Input() placeHolderValue: String = null;

  userForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
    roles: new FormControl(""),
    vendorName: new FormControl(""),
    vendorEmail: new FormControl(""),
    vendorCompanyName: new FormControl(""),
    vendorPhone: new FormControl(""),
    vendorWebsite: new FormControl(""),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {
    //Add form Routing Logic and processing
    this.activatedRoute.url.subscribe((url) => {
      if (url[1].path != "new") {
        this.showCreate = false;
        this.showEdit = true;
        this.heading = "Edit";
        const params = url[1].parameters;
        //this.placeHolderValue = "Edting role name"
        // console.log("This is the URL \n"+JSON.stringify(url,null,2))

        const id = JSON.stringify(url[1].path, null, 2);
        let l = id.length;
        let userId = id.slice(1, l - 1);

        this.userId = userId;
        console.log(url[1].parameters);

        this.userForm.removeControl("password");

        if (params.roles == "VENDOR_ROLE") {
          this.isVendorRole = true;
          this.userForm.setValue({
            vendorName: params.vendorName ? params.vendorName : "",
            vendorEmail: params.vendorEmail,
            vendorCompanyName: params.vendorCompanyName,
            vendorPhone: params.vendorPhone,
            vendorWebsite: params.vendorWebsite,
            username: params.username,
            roles: params.roles,
          });
        } else {
          this.userForm.removeControl("vendorName");
          this.userForm.removeControl("vendorEmail");
          this.userForm.removeControl("vendorCompanyName");
          this.userForm.removeControl("vendorPhone");
          this.userForm.removeControl("vendorWebsite");
          url[1].parameters.username;
          let m = url[1].parameters.username.length;
          let userName = url[1].parameters.username.slice(0, m);
          this.placeHolderValue = userName;

          url[1].parameters.roles;
          let n = url[1].parameters.roles.length;
          let userRole = url[1].parameters.roles.slice(0, n);
          this.userForm.setValue({ username: userName, roles: userRole });
        }

        // console.log("userId "+userId)
        // console.log("Paramtere params \n"+JSON.stringify(url[1].parameters,null,2))
        // console.log("Paramtere params name :"+JSON.stringify(url[1].parameters.username,null,2))
        // console.log("Paramtere params roles :"+JSON.stringify(url[1].parameters.roles,null,2))

        // console.log("userName :"+userName)
        // console.log("userRoles :"+userRole)
      } else {
        this.showCreate = true;
        this.showEdit = false;
        this.heading = "Add";
        //this.placeHolderValue = "Enter name"

        // console.log("This is the current route \n" +JSON.stringify(url[1].path));
        // console.log("Calling service to populate and create new role")
      }
    });
  }

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

  onUpdate() {
    console.log(
      "This is the user form data tobe updated \n" + this.userForm.value
    );
    this.adminService
      .UpdateUserDetail(this.userId, this.userForm.value)
      .subscribe(
        (response: any) => {
          if (response.status === 200) {
            //console.log("Response server side \n"+JSON.stringify(response,null,2))
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
