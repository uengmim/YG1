import {Component, NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule, MatMenuModule} from '@angular/material';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { SharedTranslateModule } from '../translater/translater';


@Component({
  selector: 'menu-picker',
  templateUrl: './menu-picker.component.html',
  styleUrls: ['./menu-picker.component.scss']
})
export class MenuPickerComponent {

  constructor(private authentocationService: AuthenticationService,
    private router: Router,
    private loginService: AuthenticationService) {}

  Logout() {
    this.authentocationService.logOut();
    this.router.navigate(['login']);
  }
  getUser() {
    return this.loginService.getUserLogin();
  }
}

@NgModule({
  imports: [SharedTranslateModule, MatButtonModule, MatIconModule, MatMenuModule, CommonModule, RouterModule],
  exports: [MenuPickerComponent],
  declarations: [MenuPickerComponent],
  providers:[AuthenticationService]
})
export class MenuPickerMoudle {}