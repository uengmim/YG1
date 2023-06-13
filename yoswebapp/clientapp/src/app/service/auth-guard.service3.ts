import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService3 implements CanActivate {

  constructor(private router: Router,
    private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserAuth() && this.authService.isUserLoggedIn() && this.authService.isUserVerify())
      return true;
    else if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    } else if (!this.authService.isUserVerify()) {
      this.router.navigate(['settings']);
      return false;
    } else if (!this.authService.isUserAuth()) {
      this.router.navigate(['settings']);
      return false;
    } 
  }
}