import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GetconfigService } from 'src/app/services/getconfig.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.scss']
})
export class SessionExpiredComponent implements OnInit {

  constructor(private getConfig: GetconfigService, private authS: AuthService) { }

  ngOnInit(): void {
    this.authS.sessionOut();
  }
  public signIn(): void {
    this.getConfig.getConfiguration().subscribe(data => {
     if(data) {
       localStorage.setItem("configData", JSON.stringify(data));
     }
  });
     window.location.href = environment.azuresignout;
     localStorage.setItem("login", "true" );
   }
}
