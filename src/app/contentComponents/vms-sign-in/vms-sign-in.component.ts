import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { CognitoService } from 'src/app/services/cognito.service';
import { GetconfigService } from 'src/app/services/getconfig.service';
import jwt_decode from 'jwt-decode';
import { environment } from '../../../environments/environment';
import * as e from 'cors';

@Component({
  selector: 'app-vms-sign-in',
  templateUrl: './vms-sign-in.component.html',
  styleUrls: ['./vms-sign-in.component.scss']
})
export class VmsSignInComponent implements OnInit {
  loading: boolean;
  user: any;
  userdetails:any;
  constructor(private router: Router, private cognito:CognitoService, 
    private getConfig: GetconfigService, private spinner: NgxSpinnerService,
    private authS: AuthService) { 
    this.loading = false;
    this.user = {};
  }

  uname: string = "";
  pword: string = "";
  error: boolean = false;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
     this.authS.signOut();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  login() {
    this.spinner.show();
    this.error = false;
    if(this.uname != "") {
    this.getConfig.getConfigurationUser(this.uname).subscribe((data:any) => {
     // this.spinner.hide();
     if(data) {
      localStorage.setItem("configData", JSON.stringify(data));
      var arr = JSON.parse(localStorage.getItem("configData") || '{}');
      if(arr) {
      this.spinner.hide();
      this.getLoggedInName.emit("true");
      this.router.navigate(["/home"]);
      }
     }
    });
   } else {
     this.error = true;
     this.spinner.hide();
   }
  }

  logIn() {
   this.spinner.show();
   this.authS.logIn(this.uname);
   this.authS.isLoggedIn = true;
  }

  public signIn(): void {
    window.location.href = environment.azureurl;
    localStorage.setItem("login", "true" );
  }
  
}
