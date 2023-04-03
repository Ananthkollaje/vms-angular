import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GetconfigService } from './getconfig.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  vmsUser:any;
  constructor(private router: Router, private getConfig: GetconfigService) {}
  isLoggedIn = true;
  userN: string = "";
  configData:any;
  logIn(user:any) {
    this.getConfig.getConfigurationUser(user.toString()).subscribe((data:any) => {
      if(data) {
       localStorage.setItem("configData", JSON.stringify(data));
       var arr = JSON.parse(localStorage.getItem("configData") || '{}');
       this.router.navigate(["/home"]);
       this.isLoggedIn = true;
       this.userN = user;
       }
     });
  }
  signOut() {
    localStorage.removeItem("configData");
    localStorage.removeItem("loginUser");
    localStorage.removeItem("login");
    window.localStorage.clear();
    this.isLoggedIn = false;
  }
  sessionOut() {
    localStorage.removeItem("configData");
    localStorage.removeItem("loginUser");
    localStorage.removeItem("login");
    this.router.navigate(['/sessionexpired']);
    this.isLoggedIn = false;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
