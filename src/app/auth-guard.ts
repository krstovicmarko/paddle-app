import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PermissionEnum } from '../model/permission-enum';
import { HomeComponent } from '../components/home/home.component';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard  implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {

      let permissions = this.authenticationService.currentUserPermissions;
      let hasPlayerPermission = permissions.some((permission:PermissionEnum) => permission == PermissionEnum.Player);
      let hasAdminPermission = permissions.some((permission:PermissionEnum) => permission == PermissionEnum.Admin );

      switch (route.component) {
        case HomeComponent:
          if (!hasPlayerPermission && !hasAdminPermission) {
            return false;
          }
          break;
        
      }

      console.log("Is true!");
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
