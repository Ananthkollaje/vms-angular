import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from '../../node_modules/bn-ng-idle';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 title = 'voucherManagementSystem';
 sessionExpired: boolean = false;
 loggedIn: boolean = false;
 constructor(private bnIdle: BnNgIdleService, private authS: AuthService, private route: Router) { // initiate it in your component constructor
  this.bnIdle.startWatching(86400).subscribe((res) => {
    if(res) {
        this.sessionExpired = res;
        if(res == true) {
          this.authS.sessionOut();
        }
    }
    this.loggedIn = this.authS.isLoggedIn
  });
}

}
