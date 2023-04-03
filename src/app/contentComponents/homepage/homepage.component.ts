import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventEmitter } from 'stream';
import { CognitoService } from '../../services/cognito.service';
import { GetconfigService } from '../../services/getconfig.service';
import { PlatformLocation } from '@angular/common';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

userdetails:any;
configD:any;
configData: any;

  constructor(private router: Router, private cognito: CognitoService, private auth: AuthService,
    private getConfig: GetconfigService, private spinner: NgxSpinnerService, private location: PlatformLocation ) { 
      location.onPopState(() => {
        window.location.reload();
    });
    }

  ngOnInit(): void {
    this.spinner.show();
     this.getUser().then((user)=>{
      
      this.sessionConfigData(user);
    })
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

 getUser() {
    return new Promise((resolve, reject) => {
        let params = window.location.href;
        let urlParams = new URLSearchParams(params.substring(1)).toString();
        let token = urlParams.split('id_token')
        var tokenDecode = this.getDecodedAccessToken(token[1]);
        let vmsUser;
        if(tokenDecode != null) {
          localStorage.setItem("loginUser", JSON.stringify(tokenDecode.email));
          vmsUser = JSON.parse(localStorage.getItem("loginUser") || 'null');
          } else {
            vmsUser = localStorage['loginUser'];
          }
          resolve(vmsUser);
    });   
  }

  sessionConfigData(vmsUser:any) {
    this.getConfig.getConfigurationUser(vmsUser).subscribe((data:any) => {
      if(data) {
        console.log(data);
        this.spinner.hide();
       localStorage.setItem("configData", JSON.stringify(data));
      }
     },
     Error => {
      if(Error.error) {
        this.spinner.hide();
        this.router.navigate(["/"]);
        window.location.reload();
      } else {
       this.spinner.hide();
       this.router.navigate(["/notauthorized"]);
      };
     }
     );
  }

  searchEvent() {
    this.router.navigate(['/searchevents']);
  }

  createEvent() {
    this.router.navigate(['/events']);
  }

  createPromotion(){
    this.router.navigate(['/createpromotion']);
  }

  searchPromotion(){
    this.router.navigate(['/promotionsearch']);
  }
  
  searchVoucher(){
    this.router.navigate(['/vouchersearch']);
  }

}
