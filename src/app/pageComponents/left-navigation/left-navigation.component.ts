import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss']
})
export class LeftNavigationComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
 vmsUser: string = "";
  ngOnInit(): void {

  }
  home() {
    this.vmsUser = JSON.parse(localStorage.getItem("loginUser") || '{}');
    window.location.href = environment.azureurl;
  }
}
