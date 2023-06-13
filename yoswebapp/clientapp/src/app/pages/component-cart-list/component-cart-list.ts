import { Component, NgModule, OnInit, INJECTOR, Inject, Output, SystemJsNgModuleLoader } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, formatNumber } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatSlideToggleModule, MatFormFieldModule, MatButtonModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatInputModule, MatIconModule, MatBadgeModule, MatCheckboxModule } from '@angular/material';
import { FormsModule, NumberValueAccessor } from '@angular/forms';
import { CartList } from 'src/app/model/CartList';
import { SelectionModel } from '@angular/cdk/collections';
import { SelectCart } from 'src/app/model/SelectCart';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { speedDialFabAnimations } from '../speed-dial-fab/speed-dial-fab.animations';
import { ProductList } from 'src/app/model/ProductList';
import { debug, isNullOrUndefined } from 'util';
import { CartService } from 'src/app/service/cart.service';
import { TranslateService } from '@ngx-translate/core';
import value from '*.json';
import { stringify } from 'querystring';
import { GetProducts } from 'src/app/model/GetProgucts';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

export interface DialogData {
  CartCount: number;
  CartEDP: string;
  CartProduct: string;
  CartPrice: string;
  CartList: ProductList[];
  SelectItems: ProductList[];
}

@Component({
  selector: 'app-component-cart-list',
  templateUrl: './component-cart-list.html',
  styleUrls: ['./component-cart-list.scss'],
  animations: speedDialFabAnimations
})
export class ComponentCartList implements OnInit {

  getProducts: GetProducts = new GetProducts;

  color = 'primary';
  checked = false;
  userid: string;
  language: string;
  company: string;
  customer: string;

  edpList: any[] = [];

  selection = new SelectionModel<CartList>(true, []);

  CartItems: ProductList[];

  SO: string;
  SD: string;
  AO: string;
  AD: string;

  fabButtonList = [
    {
      key: "SO", value: 'orderSelected'
    },
    {
      key: "SD", value: 'deleteSelected'
    },
    {
      key: "AO", value: 'orderWhole'
    },
    {
      key: "AD", value: 'deleteWhole'
    }
  ]

  buttons = [];
  fabTogglerState = 'incative';


  getVKeyTitle(vKey: String) {
    var result = "UNDEFIND";
    if (isNullOrUndefined(vKey) || vKey == "") {
      return result;
    }
    switch (vKey.toUpperCase()) {
      case "Y1": return "YG/NEUTRAL";
      case "Y0": return "YG";
      case "N0": return "NEUTRAL";
      case "N1": return "NEUTRAL/YG";
      default: return "UNDEFIND";
    }
  }


  getStock(value: ProductList) {
    if (!isNullOrUndefined(value) && !isNullOrUndefined(value.vkey)) {
      var result = value.vkey.toUpperCase();
      if (result == "Y0" || result == "N0") return `${value.batch1}`;
      else return `${value.batch1}/${value.batch2}`;
    }
    else {
      return "";
    }
  }


  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtonList;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }


  FabEnvet(key: String, SelectItems: ProductList[]) {
    if (key == "AO") {
      this.openAllOrderDialog(this.CartItems);
    }
    else if (key == "AD") {
      this.openAllDeleteDialog(this.CartItems);
    }
    else if (key == "SO") {
      if (SelectItems.length > 0) {
        this.openSelectOrderDialog(SelectItems);
      }
      else {
        this.hideItems();
        this.translate.get('zeroItem').subscribe(
          value => {
            alert(value);
          }
        )
      }
    }
    else if (key == "SD") {
      if (SelectItems.length > 0) {
        this.openSelectDeleteDialog(SelectItems);
      }
      else {
        this.hideItems();
        this.translate.get('zeroItem').subscribe(
          value => {
            alert(value);
          }
        )
      }
    }
  }


  constructor(private httpClientService: HttpClientService,
    private cartService: CartService,
    public _componentPageTitle: ComponentPageTitle,
    public dialog: MatDialog,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userid = sessionStorage.getItem('username');
    this.language = sessionStorage.getItem('language');
    this.company = sessionStorage.getItem('company');
    this.customer = sessionStorage.getItem('customer');
    this._componentPageTitle.title = "cart"


    this.route.queryParams.subscribe(params =>{
      if(params.carts){
      this.CartItems = JSON.parse(params.carts); //as ProductList[];
      }
    });


    if(!this.CartItems){
     this.getCartList();
    }
  }


  getCartList(): void {
    this.getProducts.userid = this.userid;
    this.getProducts.lang = this.language.toUpperCase();
    this.getProducts.comp = this.company;
    this.getProducts.cust = this.customer;
    this.getProducts.aclass = "";
    this.getProducts.bclass = "";
    this.getProducts.cclass = "";
    this.getProducts.condm = [];
    this.httpClientService.getProducts(this.getProducts, "CART").subscribe(
      data => {
        if (data.length > 0) {
          this.CartItems = data;
        } else {
          this.translate.get('emptyCart').subscribe(
            value => {
              alert(value);
            }
          )
        }
      },
      error => {
        if (error.error.message.includes('is not exist')) {
          let material = error.error.message.replace(" is not exist", "") as string
          this.translate.get('errNotExist').subscribe(
            value => {
              let msg = value as string;
              alert(msg.replace("*temp", material));
            }
          )
        } else {
          this.translate.get('serverErrorMsg').subscribe(
            value => {
              alert(value);
            }
          )
        }
      }
    )
  }



  //카트 수량 변경
  openDialog(edp: String, cart: number, data: ProductList): void {

    var cnt = cart;
    const dialogRef = this.dialog.open(CartDialog,
      {
        width: 'auto',
        data: { CartCount: cart, CartEDP: edp, CartList: data }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        //data.cart = result;  

        if (cnt != result) {
          data.cart = result;
          var condmTemp: any[] = [];
          condmTemp.push(data.edp + "/" + result);
          var cartInfo: GetProducts = new GetProducts;
          cartInfo.userid = this.userid;
          cartInfo.lang = this.language.toUpperCase();
          cartInfo.comp = this.company;
          cartInfo.cust = this.customer;
          cartInfo.aclass = "";
          cartInfo.bclass = "";
          cartInfo.cclass = "";
          cartInfo.condm = condmTemp;
          this.httpClientService.getProducts(cartInfo, "NOMAL").subscribe(
            result2 => {
              data.netprice = result2[0].netprice;
            },
            error => {
              this.translate.get('serverErrorMsg').subscribe(
                value => {
                  alert(value);
                }
              )
            }
          )
        }
      }
    })
  }
  /**
   * 선택 제품 주문
   * @param SelectCartItems 선택된 제품
   */
  openSelectOrderDialog(SelectCartItems: ProductList[]): void {
    if (SelectCartItems == null) {
      this.translate.get('zeromItem').subscribe(
        value => {
          alert(value);
        }
      )
    }
    else {
      const SelectOrderRef = this.dialog.open(CartSelectOrderDialog,
        {
          width: 'auto',
          data: { SelectItems: SelectCartItems },
          autoFocus: false,
        });
      SelectOrderRef.afterClosed().subscribe(result => {
        if (result == "1") {
          this.selection.clear();
          this.hideItems();
        }
        if (result == "2") {
          this.hideItems();
        }
      })
    }
  }

  // 선택 삭제
  openSelectDeleteDialog(SelectCartItems: ProductList[]): void {
    const SelectDeleteRef = this.dialog.open(CartSelectDeleteDialog,
      {
        width: 'auto',
        data: { SelectItems: SelectCartItems },
        autoFocus: false,
      });
    SelectDeleteRef.afterClosed().subscribe(result => {
      if (result != null) {
        for (let i = 0; i < result.length; i++) {
          this.CartItems.splice(this.CartItems.indexOf(result[i]), 1);
        }
        this.cartService.sendChange(this.userid)
        this.selection.clear();
        this.hideItems();
      }
      else {
      }
      this.hideItems();
    })
  }

  // 전체 삭제
  openAllDeleteDialog(CartItems: ProductList[]): void {
    if (CartItems.length > 0) {
      const AllDeleteRef = this.dialog.open(CartAllDeleteDialog,
        {
          width: 'auto',
          data: { CartList: CartItems },
          autoFocus: false,
        });

      AllDeleteRef.afterClosed().subscribe(result => {
        if (result == "1") {
          this.CartItems.splice(0, this.CartItems.length);
          this.cartService.sendChange(this.userid)
          this.selection.clear();
          this.hideItems();
        }
        else {
          this.hideItems();
        }
      })
    }
  }

  //전체 주문
  openAllOrderDialog(CartItems: ProductList[]): void {
    let CartCheck: ProductList[] = CartItems.filter(x => { return x.cart == 0 })
    if (CartItems.length > 0) {
      const AllOrderRef = this.dialog.open(CartAllOrderDialog,
        {
          width: 'auto',
          data: { CartList: CartItems },
          autoFocus: false,
        });
      AllOrderRef.afterClosed().subscribe(result => {
        this.hideItems();
      });
    }
  }



  // 해당 카트 삭제
  openDeleteDialog(CartItems: CartList): void {
    const deleteDialog = this.dialog.open(CartDeleteDialog,
      {
        width: 'auto',
        data: { CartList: CartItems },
        autoFocus: false,

      });

    deleteDialog.afterClosed().subscribe(result => {

      this.CartItems.forEach(function (item, index, object) {
        if (item.edp == result) {
          object.splice(index, 1);
        }
      })
    })
  }
}

//수량 변경
@Component({
  selector: 'component-cart-list-dialog',
  templateUrl: 'component-cart-list-dialog.html',
  styleUrls: ['./component-cart-list.scss']
})
export class CartDialog {
  clickCheck: Boolean = false;
  EDP: String;

  constructor(public dialogRef: MatDialogRef<CartDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpClientService: HttpClientService,
    private translate: TranslateService) { }

  onCancel(): void {
    this.dialogRef.close();
  }
  onAddCart(CartCount: any, CartEDP: string, CartList: CartList): void {

    var packingCnt = Number.parseInt(CartList.packing);
    var CartCnt = CartCount;

    // 수정 - AmaK
    if (packingCnt > CartCnt) {
      this.translate.get('lowItemCnt').subscribe(
        value => {
          let msg = value as string;
          alert(msg.replace("*temp", CartList.edp));

        }
      )
      this.clickCheck = false;
      return;
    }

    // 주문수량 → 포장 수량 배수로 처리
    if (CartCnt % packingCnt != 0) {
      this.translate.get('multiItemCnt').subscribe(
        value => {
          let msg = value as string;
          alert(msg.replace("*temp", CartList.edp));
        }
      )
      this.clickCheck = false;
      return;
    }

    this.clickCheck = true;
    CartList.cart = CartCount;
    let userid = sessionStorage.getItem('username');
    let edp = CartList.edp;
    this.httpClientService.CartListUpdate(userid, edp, CartList).subscribe(
      data => {
        this.dialogRef.close(CartCount);
      },
      error => {
        this.translate.get('serverErrorMsg').subscribe(
          value => {
            alert(value);
          }
        )
      }
    )

  }
}

//전체 주문
@Component({
  selector: 'component-cart-list-order-all-dialog',
  templateUrl: 'component-cart-list-order-all-dialog.html',
  styleUrls: ['./component-cart-list.scss']
})
export class CartAllOrderDialog {
  clickCheck: Boolean = false;
  constructor(
    private router: Router,
    public AllOrderRef: MatDialogRef<CartAllOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onDialogCancel(): void {
    this.AllOrderRef.close();
  }
  onAllCartOrder(CartList: ProductList[]) {
    this.clickCheck = true;
    this.router.navigate(['orderform'], { queryParams: { carts: JSON.stringify(CartList) }, skipLocationChange: true })
    this.AllOrderRef.close();
  }
}


//전체 삭제
@Component({
  selector: 'component-cart-list-delete-all-dialog',
  templateUrl: 'component-cart-list-delete-all-dialog.html',
  styleUrls: ['./component-cart-list.scss']
})
export class CartAllDeleteDialog {
  clickCheck: Boolean = false;
  constructor(public AllDeleteRef: MatDialogRef<CartAllDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpClientService: HttpClientService,
    private translate: TranslateService) { }
  onDialogCancel(): void {
    this.AllDeleteRef.close();
  }
  onDeleteCart(data: ProductList[]): void {
    this.clickCheck = true;
    let userid = sessionStorage.getItem('username');
    this.httpClientService.CartListDeleteAll(userid, data).subscribe(result => {
      this.AllDeleteRef.close("1");
    },
      error => {
        this.translate.get('serverErrorMsg').subscribe(
          value => {
            alert(value);
          }
        )
      }
    );
  }
}

//선택 삭제
@Component({
  selector: 'component-cart-list-delete-select-dialog',
  templateUrl: 'component-cart-list-delete-select-dialog.html',
  styleUrls: ['./component-cart-list.scss']
})
export class CartSelectDeleteDialog {
  clickCheck: Boolean = false;
  constructor(public SelectDeleteRef: MatDialogRef<CartSelectDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpClientService: HttpClientService,
    private translate: TranslateService) { }

  onDialogCancel(): void {
    this.SelectDeleteRef.close()
  }
  onDeleteCart(ProductList: ProductList[]): void {
    this.clickCheck = true;
    let userid = sessionStorage.getItem('username');
    this.httpClientService.CartListDeleteAll(userid, ProductList).subscribe(
      result => {
        this.SelectDeleteRef.close(ProductList);
      },
      error => {
        this.translate.get('serverErrorMsg').subscribe(
          value => {
            alert(value);
          }
        )
      }
    );
  }
}

//카트 한개 만 삭제
@Component({
  selector: 'component-cart-list-delete-dialog',
  templateUrl: 'component-cart-list-delete-dialog.html',
  styleUrls: ['./component-cart-list.scss']
})
export class CartDeleteDialog {
  clickCheck: Boolean = false;
  constructor(public deleteDialog: MatDialogRef<CartDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpClientService: HttpClientService,
    private cartService: CartService,
    private translate: TranslateService) { }

  onDialogCancel(): void {
    this.deleteDialog.close()

  }
  onDeleteCart(CartList: ProductList): void {
    this.clickCheck = true;
    let userid = sessionStorage.getItem('username');
    let edp = CartList.edp;
    this.httpClientService.CartListDelete(userid, edp).subscribe(
      resultMSG => {
        this.cartService.sendChange(sessionStorage.getItem('username'));
        this.deleteDialog.close(CartList.edp);
      },
      error => {
        this.translate.get('serverErrorMsg').subscribe(
          value => {
            alert(value);
          }
        )
      }
    );
  }
}
//선택 주문
@Component({
  selector: 'component-cart-list-order-select-dialog',
  templateUrl: 'component-cart-list-order-select-dialog.html',
  styleUrls: ['./component-cart-list.scss']
})
export class CartSelectOrderDialog {
  clickCheck: Boolean = false;
  constructor(
    private router: Router,
    public SelectOrderDialog: MatDialogRef<CartSelectOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public Data: DialogData,
  ) { }

  //선택 주문 - 다이얼로그 닫기
  onCancel(): void {
    this.SelectOrderDialog.close("2");
  }
  //선택 주문 - 주문 하기
  onSelectOrder(CartList: ProductList[]) {
    this.clickCheck = true;
    this.router.navigate(['orderform'], { queryParams: { carts: JSON.stringify(CartList) }, skipLocationChange: true })
    this.SelectOrderDialog.close("1");
  }
}


@NgModule({
  imports: [
    SharedTranslateModule,
    MatCardModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatBadgeModule,

  ],
  entryComponents: [
    ComponentCartList,
    CartDialog,
    CartDeleteDialog,
    CartSelectOrderDialog,
    CartSelectDeleteDialog,
    CartAllDeleteDialog,
    CartAllOrderDialog


  ],
  exports: [ComponentCartList],
  declarations: [
    ComponentCartList,
    CartDialog,
    CartDeleteDialog,
    CartSelectOrderDialog,
    CartSelectDeleteDialog,
    CartAllDeleteDialog,
    CartAllOrderDialog],
  providers: [ComponentPageTitle, HttpClientService, CartService],
})
export class ComponentCartListModule { }