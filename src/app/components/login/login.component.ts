import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "./login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  error: string;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}
  form: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  submit() {
    if (this.form.valid) {
      const username = this.form.value.username;
      const password = this.form.value.password;
      this.authService.login(username, password).subscribe(
        user => {
          this.router.navigate(["/home"]);
        },
        err => {
          console.log("errr------>", err);
        }
      );
    }
  }
}
