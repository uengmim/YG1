import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL_DOCS_ROUTES } from './routes';
import { AppComponent } from './app.component';
import { NavBarModule } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentSidenavModule, ComponentSidenav } from './pages/component-sidenav/component-sidenav.component';
import { ComponentHeaderModule } from './pages/component-header/component-header.component';
import { ComponentProductListModule } from './pages/component-product-list/component-product-list';
import { ComponentPageTitle, PageTitleMoudle } from './pages/page-title/page-title';
import { GaService } from './shared/ga/ga';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientService } from './service/http-client.service';
import { ComponentOrderinqListModule } from './pages/component-order_inq-list/component-order_inq-list';
import { ComponentOrdermarkListModule } from './pages/component-order_mark-list/component-order_mark-list';
import { ComponentCartListModule } from './pages/component-cart-list/component-cart-list';
import { LoginModule } from './pages/login/component-login';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-http-interceptor.service';
import { RegisterModule } from './pages/register/component-register';
import { ComponentOrderMoudle } from './pages/component-order/component-order';
import { SettingsModule } from './pages/settings/component-settings';
import { ModifyModule } from './pages/modify/component-modify';
import { ComponentBulkorderMoudle } from './pages/component-bulkorder/component-bulkorder';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ModifyPwModule } from './pages/modify-pw/component-modify-pw';
import { ComponentAccountMoudule } from './pages/component-account-management/component-account-management';

import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeKo from '@angular/common/locales/ko';
import { registerLocaleData } from '@angular/common';
import { DateProxyPipe } from './shared/date-local/date-proxy-pipe.pipe';
import { LoaderService } from './shared/loader/loader.service';
import { LoaderInterceptor, LoaderServiceMoudle } from './shared/loader/loader.interceptors';
import { MatProgressBarModule } from '@angular/material';

registerLocaleData(localeKo)
registerLocaleData(localeEn)
registerLocaleData(localeFr)
registerLocaleData(localeDe)
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    PageTitleMoudle,
    BrowserModule,
    NavBarModule,
    HttpClientModule,
    ComponentSidenavModule,
    ComponentHeaderModule,
    ComponentProductListModule,
    ComponentOrderinqListModule,
    ComponentOrdermarkListModule,
    ComponentCartListModule,
    ComponentOrderMoudle,
    ComponentBulkorderMoudle,
    SettingsModule,
    LoginModule,
    ModifyModule,
    ModifyPwModule,
    RegisterModule,
    RouterModule.forRoot(MATERIAL_DOCS_ROUTES),
    BrowserAnimationsModule,
    LoaderServiceMoudle,    
    ComponentAccountMoudule,
  ],
  providers: [
    ComponentPageTitle,
    GaService,
    HttpClient,
    HttpClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true
    },
     { provide: LOCALE_ID, useValue: window.navigator.language },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
