import { Component, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatRadioChange } from '@angular/material';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { SharedTranslateModule } from '../translater/translater';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'product-searcher',
  templateUrl: './product-searcher.component.html',
  styleUrls: ['./product-searcher.component.scss']
})
export class ProductSearcherComponent {
  language = sessionStorage.getItem('language');
  selection: string

  constructor(private authentocationService: AuthenticationService,
    private router: Router,
    private loginService: AuthenticationService,
    private translateService: TranslateService) { }

  Logout() {
    this.authentocationService.logOut();
    this.router.navigate(['login']);
  }


  getUser() {
    return this.loginService.getUserLogin();
  }

  radioChange($event: MatRadioChange) {
    if ($event.source.name === 'radio') {
      if ($event.value == "productName") {
        this.selection = 'productName'
      } else {
        this.selection = 'productEdp'
      }

    }
  }

  searchProducts(product: string) {
    if (product.length < 5) {
      this.translateService.get('minFiveMsg').subscribe(
        value => {
          alert(value);
        }
      )
    }
    else {
      if (this.selection == 'productName') {
        this.router.navigate(['product/search'], { queryParams: { name: JSON.stringify(product) } })
      } else if (this.selection == 'productEdp') {
        this.router.navigate(['product/search/'], { queryParams: { code: JSON.stringify(product) } })
      }
    }
  }


}

@NgModule({
  imports: [SharedTranslateModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule],
  exports: [ProductSearcherComponent],
  declarations: [ProductSearcherComponent],
  providers: [AuthenticationService]
})
export class ProductSearcherMoudle { }