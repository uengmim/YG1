
import { AfterViewInit, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatMenuModule, MatIconModule, MatListModule, MatBadgeModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatRadioModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatRadioChange, MatOptionSelectionChange } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MenuPickerMoudle } from '../menu-picker/menu-picker.component';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { BasicAuthHtppInterceptorService } from 'src/app/service/basic-auth-http-interceptor.service';
import { LanguagePickerMoudle } from '../language-picker/language-picker.component';
import { SharedTranslateModule } from '../translater/translater';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductSearcherMoudle } from '../product-searcher/product-searcher.component';
import { isNullOrUndefined } from 'util';
import { OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { Inject } from '@angular/core';
import { ShipToParty } from 'src/app/model/ShipToParty';

export interface PeriodicElement {
  key: string;
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    key: 'orderinq', name: 'orders'
  },
  {
    key: 'cart', name: 'cart'
  },
  {
    key: 'ordermark', name: 'favorites'
  },
  {
    key: 'bulkorder', name: 'bulkOrder'
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
  carts: number;
  authority = sessionStorage.getItem('authority');

  constructor(private httpClientService: HttpClientService,
    private cartService: CartService,
    private loginService: AuthenticationService,
    public translate: TranslateService,
    public dialog: MatDialog) {
    translate.addLangs(['en', 'fr', 'de', 'kr']);
    // 현재 사용 언어에서 해당하는 다국어 설정이 없을 경우 기본 사용하는 언어 설정
    if (window.navigator.language == 'ko-KR') {
      translate.setDefaultLang('ko');
    } else if (window.navigator.language == 'en') {
      translate.setDefaultLang('en');
    } else if (window.navigator.language == 'fr') {
      translate.setDefaultLang('fr');
    } else if (window.navigator.language == 'de') {
      translate.setDefaultLang('de');
    } else {
      translate.setDefaultLang('en');
    }

    // 현재 사용 언어 설정
    if (!isNullOrUndefined(sessionStorage.getItem('language')))
      translate.use(sessionStorage.getItem('language'));

    this.sections = ELEMENT_DATA;
  }

  ngOnInit() {
    if (!isNullOrUndefined(sessionStorage.getItem('username'))) {
      this.httpClientService.ALLCartList(sessionStorage.getItem('username')).subscribe(
        data => {
          this.carts = data.length
        },
        error => {
        }
      )
    }
    this.cartService.listenChange().subscribe((m: any) => {
      this.httpClientService.ALLCartList(m).subscribe(
        data => {
          this.carts = data.length
          this.authority = sessionStorage.getItem('authority')
        },
        error => {
        }
      )
    })
  }



  onChangeCustomer(): void {
    if (this.authority === 'MANAGER') {
      this.dialog.open(DialogChangeCustomer, {
        width: 'auto',
        data: {},
        autoFocus: false,
      });
    }
  }
}

@Component({
  selector: 'navbar-customer-dialog',
  templateUrl: './navbar-customer-dialog.html',
  styleUrls: ['./navbar.component.scss']
})
export class DialogChangeCustomer implements OnInit, AfterViewInit {
  filterList: any;
  filteredList: any;
  plantList: any;
  customerList = Array<ShipToParty>();
  customerList2 = Array<ShipToParty>();
  formGroup: FormGroup;

  usrid = sessionStorage.getItem('username');
  authority = sessionStorage.getItem('authority');
  language = sessionStorage.getItem('language');
  company = sessionStorage.getItem('company');
  plant = sessionStorage.getItem('plant');
  customer = sessionStorage.getItem('customer');
  cusDccode = sessionStorage.getItem('cusDccode');

  dcCode = this.cusDccode != '' ? this.cusDccode : this.plant == '4110' || this.plant == '4120' ? '10' :
    this.plant == '4125' || this.plant == '4130' || this.plant == '4140' ? '20' : this.cusDccode;


  Isdisble = this.plant != '4200' ? true : false;

  constructor(
    private formBuilder: FormBuilder,
    private httpClientService: HttpClientService,
    private translateService: TranslateService,
    public dialogRef: MatDialogRef<DialogChangeCustomer>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      option: { value: this.dcCode, disabled: this.Isdisble },
      no: [null,]
    });


    let arrA = this.plant == '4110' || this.plant == '4120' ? ['4110', '4120'] :
      this.plant == '4125' || this.plant == '4130' || this.plant == '4140' ? ['4125', '4130', '4140'] : this.plant == '4200' ? ['4200'] : []

    arrA.forEach(element => {
      this.httpClientService.getCustomer(this.company, element, '').subscribe(
        data => {
          data.forEach((element: ShipToParty) => {
            this.customerList.push(element)
            if(element.dccode == this.dcCode)
              this.customerList2.push(element)
          });
        },
        error => {
          this.translateService.get('serverErrorMsg').subscribe(
            value => {
              alert(value);
            }
          )
        }
      )
    });

    if (this.Isdisble) {
      this.formGroup.get('option').setValue(this.dcCode)
    } else {
      if (this.cusDccode != '') {
        this.formGroup.get('option').setValue(this.cusDccode)
      }
    }

    if (this.customer != '') {
      this.formGroup.get('no').setValue(this.customer)
    }
  }

  ngAfterViewInit(): void {
    if (this.Isdisble) {
      this.filteredList = this.customerList
    } else {
      if (this.cusDccode != '') {
        this.formGroup.get('option').setValue(this.cusDccode)
        this.filteredList = this.customerList2
      }
    }
  }

  CustomerItems(value: string) {
    this.filteredList = this.customerList.filter(result => result.dccode === value)
    if (this.customer != '') {
      this.formGroup.get('no').setValue(this.customer)
    }
  }

  // radioChange($event: MatRadioChange) {
  //   if ($event.source.name === 'radio') {
  //     this.customerList2 = this.customerList.filter(
  //       result =>
  //         result.dcname.startsWith($event.value)
  //     );
  //     if ($event.value == "all") {
  //       this.customerList2 = this.customerList
  //       this.filteredList = this.customerList2.slice();
  //     } else {
  //       this.filteredList = this.customerList2.slice();
  //     }
  //   }
  // }

  onChange() {
    if(!isNullOrUndefined(this.formGroup.value.option))
      this.dcCode = this.formGroup.value.option
    if (this.dcCode != '' && !isNullOrUndefined(this.formGroup.value.no)) {
      sessionStorage.setItem('customer', this.formGroup.value.no)
      sessionStorage.setItem('cusDccode', this.dcCode)
      this.dialogRef.close("OK")
      location.reload()
    }
  }
  onCancel(): void {
    this.dialogRef.close("CANCEL");
  }
  onClear(): void {
    sessionStorage.setItem('customer', '')
    sessionStorage.setItem('cusDccode', '')
    this.dialogRef.close("Clear");
    location.reload()
  }
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
    ProductSearcherMoudle,
    MenuPickerMoudle,
    LanguagePickerMoudle,
    MatBadgeModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatSelectFilterModule,
    MatRadioModule
  ],
  entryComponents: [
    DialogChangeCustomer,
  ],
  exports: [NavbarComponent],
  declarations: [NavbarComponent, DialogChangeCustomer],
  providers: [HttpClientService, CartService, AuthenticationService, SharedTranslateModule, {
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthHtppInterceptorService,
    multi: true
  }],
})
export class NavBarModule { }