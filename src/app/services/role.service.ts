import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isAuthorized(route);
  }

  isAuthorized(route: ActivatedRouteSnapshot):boolean {
   var roles = [];
   roles.push(JSON.parse(localStorage['configData']).user.userRole.accessLevel);
   const expectedRole = route.data['expectedroles'];
   const roleMatch = roles.findIndex((role:any) => expectedRole.indexOf(role) !== -1)
   if(roleMatch == -1) {
     this.router.navigate(['/notauthorized']);
   }
   return roleMatch < 0 ? false : true;
  }
}
