import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authS: AuthService) { 
    
  }
  ngDoCheck() {
    this.userLoggedIn = this.authS.isLoggedIn;
  }
  configData:any;
  vmsUser: string = "";
  @Input() userLoggedIn: boolean = false;
  ngOnInit(): void {
     setTimeout(() => {
      this.vmsUser = JSON.parse(localStorage.getItem("loginUser") || 'null');
      if(this.vmsUser != null) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    }, 100)
    
  }
  signOut() {
    localStorage.removeItem("configData");
    localStorage.removeItem("loginUser");
    localStorage.removeItem("login");
    window.localStorage.clear();
    this.userLoggedIn = this.authS.isLoggedIn;
    window.location.href = environment.azuresignout;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
