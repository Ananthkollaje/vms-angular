import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  sysConfig() {
    this.router.navigate(['/sysconfig']);
  }

  userConfig() {
    this.router.navigate(['/userconfig']);
  }
}
