
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatMenuModule, MatIconModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MenuPickerMoudle } from '../menu-picker/menu-picker.component';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { BasicAuthHtppInterceptorService } from 'src/app/service/basic-auth-http-interceptor.service';
import { LanguagePickerMoudle } from '../language-picker/language-picker.component';
import { SharedTranslateModule } from '../translater/translater';
import { TranslateService } from '@ngx-translate/core';

export interface PeriodicElement {
  key: string;
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    key: 'product', name: 'products'
  },
  {
    key: 'orderinq', name: 'orders'
  },
  {
    key: 'cart', name: 'cart'
  },
  {
    key: 'ordermark', name: 'favorites'
  }
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  sections: PeriodicElement[];
  username: string;

  constructor(private httpClientService: HttpClientService,
    private loginService: AuthenticationService,
    public translate: TranslateService) {
    // 현재 사용 언어에서 해당하는 다국어 설정이 없을 경우 기본 사용하는 언어 설정
    translate.setDefaultLang('ko');
    // 현재 사용 언어 설정
    translate.use(sessionStorage.getItem('language'));
    this.sections = ELEMENT_DATA;
  }

  ngOnInit() {

    // this.httpClientService.getSections().subscribe(
    //   response => this.handleSuccessfulResponse(response),
    // );

  }

  // handleSuccessfulResponse(response) {
  //   this.sections = response;
  // }
}

@NgModule({
  imports: [
    SharedTranslateModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    CommonModule,
    MenuPickerMoudle,
    LanguagePickerMoudle
  ],
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
  providers: [HttpClientService, AuthenticationService, SharedTranslateModule, {
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthHtppInterceptorService,
    multi: true
  }],
})
export class NavBarModule { }