import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authS: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> 
  | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.length > 0) {
     return true;
    }
    else {
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/']);
    return false;
    }
  }
}
