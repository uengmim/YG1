import { ComponentProductList } from './pages/component-product-list/component-product-list';

import { Routes } from '@angular/router';
import { ComponentSidenav } from './pages/component-sidenav/component-sidenav.component';
import { ComponentOrderinqList } from './pages/component-order_inq-list/component-order_inq-list';
import { ComponentOrdermarkList } from './pages/component-order_mark-list/component-order_mark-list';
import { ComponentCartList } from './pages/component-cart-list/component-cart-list';
import { LoginComponent } from './pages/login/component-login';
import { AuthGaurdService } from './service/auth-guard.service';
import { RegisterComponent } from './pages/register/component-register';
import { ComponentOrder } from './pages/component-order/component-order';
import { SettingsComponent } from './pages/settings/component-settings';
import { AuthGaurdService2 } from './service/auth-guard.service2';
import { LoginGaurdService } from './service/login-guard.service';
import { ModifyComponent } from './pages/modify/component-modify';
import { ComponentBulkorder } from './pages/component-bulkorder/component-bulkorder';
export const MATERIAL_DOCS_ROUTES: Routes = [
  {
    path: 'login', component:LoginComponent, canActivate:[LoginGaurdService]
  },
  {
    path: '',
    component: ComponentSidenav,
    children: [
      { path: 'product/:id', component: ComponentProductList, canActivate:[AuthGaurdService]},
      { path: 'orderinq', component: ComponentOrderinqList, canActivate:[AuthGaurdService]},
      { path: 'ordermark', component: ComponentOrdermarkList, canActivate:[AuthGaurdService]},
      { path: 'orderform', component: ComponentOrder, canActivate:[AuthGaurdService]},
      { path: 'bulkorder', component: ComponentBulkorder, canActivate:[AuthGaurdService]},
      { path: 'cart', component: ComponentCartList, canActivate:[AuthGaurdService]},
      { path: 'settings', component: SettingsComponent, canActivate:[AuthGaurdService]},
      { path: 'modify', component: ModifyComponent, canActivate:[AuthGaurdService2]},
      { path: 'register', component: RegisterComponent, canActivate:[AuthGaurdService2]},
      { path: '**',  redirectTo: '/login', pathMatch: 'full'  }
    ]
  }
];