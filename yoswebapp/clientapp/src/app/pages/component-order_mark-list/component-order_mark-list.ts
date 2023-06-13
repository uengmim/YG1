import { Component, NgModule, OnInit, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatBadgeModule, MatButton } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { OrderMark } from 'src/app/model/OrderMark';
import { CartList } from 'src/app/model/CartList';
import { SelectCart } from 'src/app/model/SelectCart';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
import { ProductList } from 'src/app/model/ProductList';
import { CartService } from 'src/app/service/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { GetProducts } from 'src/app/model/GetProgucts';
import { isNullOrUndefined } from 'util';

export interface DialogData {
  ItemsEDP: String;
  ItemsLIST: any;
  ItemsCART: number;
  Itemsproduct: String;
  ItemsPrice: number;
  OrderItems: ProductList;
}

@Component({
  selector: 'app-component-order_mark-list',
  templateUrl: './component-order_mark-list.html',
  styleUrls: ['./component-order_mark-list.scss']
})
export class ComponentOrdermarkList implements OnInit {
  getProducts: GetProducts = new GetProducts;
  OrderList: ProductList[];
  ordercount: number;
  userid: string;
  language: string;
  company: string;
  customer: string;
  test1: string;

  edpList: any[] = [];


  constructor(private httpClientService: HttpClientService,
    public translate: TranslateService,
    public _componentPageTitle: ComponentPageTitle,
    public dialog: MatDialog,
    private translateService: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userid = sessionStorage.getItem('username');
    this.language = sessionStorage.getItem('language');
    this.company = sessionStorage.getItem('company');
    this.customer = sessionStorage.getItem('customer');
    this._componentPageTitle.title = "favorites"
    this.getFavoriteList();
  }

  getFavoriteList() {
    this.getProducts.userid = this.userid;
    this.getProducts.lang = this.language.toUpperCase();
    this.getProducts.comp = this.company;
    this.getProducts.cust = this.customer;
    this.getProducts.aclass = "";
    this.getProducts.bclass = "";
    this.getProducts.cclass = "";
    this.getProducts.condm = [];
    this.httpClientService.getProducts(this.getProducts, "FAVORITE").subscribe(
      data => {
        if (data.length > 0) {
          this.OrderList = data;
        } else {
          this.translate.get('emptyFavorites').subscribe(
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
          this.translateService.get('serverErrorMsg').subscribe(
            value => {
              alert(value);
            }
          )
        }
      }
    )
  }

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

  openDeleteDialog(edp: String, DATA: Object) {
    const dialogRef = this.dialog.open(OrderDialog,
      {
        width: 'auto',
        data: { ItemsEDP: edp, ItemsLIST: DATA },
        autoFocus: false,
      });

    dialogRef.afterClosed().subscribe(
      result => {
        this.OrderList.forEach(function (item, index, object) {
          if (item.edp == result) {
            object.splice(index, 1);
          }
        })
      })
  }
  openCartDialog(edp: String, cart: any, data: OrderMark) {
    const dialogRef = this.dialog.open(CartDialog,
      {
        width: 'auto',
        data: { ItemsEDP: edp, ItemsCART: cart, ItemsLIST: data }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        data.cart = result;
      }
    })
  }
  // 개별주문
  openOrderDialog(product: String, edp: String, price: String, DATA: ProductList): void {
    const OrderDialog = this.dialog.open(CartOrderDialog,
      {
        width: 'auto',
        data: { Itemsproduct: product, ItemsEDP: edp, ItemsPrice: price, OrderItems: DATA }

      });
    OrderDialog.afterClosed().subscribe(result => {

      if (!isNullOrUndefined(result)) {

        var target: ProductList = DATA;
        target.cart = result;

        var condmTemp: any[] = [];
        condmTemp.push(edp + "/" + result);
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
            target.netprice = result2[0].netprice;
            result2.splice(0, 1, target);
            this.router.navigate(['orderform'], { queryParams: { carts: JSON.stringify(result2) }, skipLocationChange: true })
          },
          error => {
            this.translateService.get('serverErrorMsg').subscribe(
              value => {
                alert(value);
              }
            )
          }
        )
      }
    }
    )

  }


  // fitBtnWidth(){
  //   let fstBtnWidth =  document.getElementById("btnRaiseCnt").offsetWidth;  
  //   let styleAuto = {
  //     'width': 'auto',
  //   };
  //   let cnt = 0
  //   while(fstBtnWidth < 100){
  //     fstBtnWidth = document.getElementById("btnRaiseCnt").offsetWidth;    
  //     cnt++
  //     if(cnt> 5 && fstBtnWidth < 100){
  //       return styleAuto;
  //     } 
  //   }
  //   let style = {
  //     'width' : fstBtnWidth + "px",      
  //   }; 
  //   return style
  //   //let b = document.get
  // }
}


//오더 마크 삭제 
@Component({
  selector: 'component-order_mark-list-delete-dialog',
  templateUrl: 'component-order_mark-list-delete-dialog.html',
  styleUrls: ['./component-order_mark-list.scss']
})
export class OrderDialog {
  orderClick: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<OrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpClientService: HttpClientService,
    private translateService: TranslateService
  ) {
  }
  onDialogCancel(): void {
    this.dialogRef.close()
  }
  onDeleteOrderMark(OrderEDP: String): void {
    this.orderClick = true;
    let userid = sessionStorage.getItem('username');
    this.httpClientService.OrderMarkListDelete(userid, OrderEDP).subscribe(result => {
      this.dialogRef.close(OrderEDP);
    },
      error => {
        this.translateService.get('serverErrorMsg').subscribe(
          value => {
            alert(value);
          }
        )
      })
  }
}
//카트 다이얼로그
@Component({
  selector: 'component-order_mark-list-cart-dialog',
  templateUrl: 'component-order_mark-list-cart-dialog.html',
  styleUrls: ['./component-order_mark-list.scss']
})
export class CartDialog {
  cartClick: boolean = false;
  username: string;

  constructor(public dialogRef: MatDialogRef<CartDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpClientService: HttpClientService,
    private cartService: CartService,
    private translateService: TranslateService) { }

  onCancel(): void {
    this.dialogRef.close();
  }
  onAddCart(CartCount: any, CartEDP: string, CartList: CartList): void {

    var packingCnt = Number.parseInt(CartList.packing);
    var CartCnt = CartCount;

    // 수정 - AmaK
    if (packingCnt > CartCnt) {
      this.translateService.get('lowItemCnt').subscribe(
        value => {
          let msg = value as string;
          alert(msg.replace("*temp", CartList.edp));
        }
      )
      this.cartClick = false;
      return;
    }

    // 주문수량 → 포장 수량 배수로 처리
    if (CartCnt % packingCnt != 0) {
      this.translateService.get('multiItemCnt').subscribe(
        value => {
          let msg = value as string;
          alert(msg.replace("*temp", CartList.edp));
        }
      )
      this.cartClick = false;
      return;
    }


    this.cartClick = true;
    CartList.cart = CartCount;
    let userid = sessionStorage.getItem('username');
    let edp = CartList.edp;

    this.httpClientService.CartListUpdate(userid, edp, CartList).subscribe(
      data => {
        this.dialogRef.close(CartCount);
        this.cartService.sendChange(userid);
      },
      error => {
        this.translateService.get('serverErrorMsg').subscribe(
          value => {
            alert(value);
          }
        )
      }
    )
  }
  onCartDelete(CartList: CartList): void {
    this.cartClick = true;
    let userid = sessionStorage.getItem('username');
    let edp = CartList.edp;
    this.httpClientService.CartListDelete(userid, edp).subscribe(
      resultMSG => {
        CartList.cart = 0;
        this.cartService.sendChange(userid);
        this.dialogRef.close(CartList.cart);
      },
      error => {
        this.translateService.get('serverErrorMsg').subscribe(
          value => {
            alert(value);
          }
        )
      }
    )

  }

}
//개별 주문
@Component({
  selector: 'component-order_mark-list-order-dialog',
  templateUrl: 'component-order_mark-list-order-dialog.html',
  styleUrls: ['./component-order_mark-list.scss']
})
export class CartOrderDialog {

  ItemsCART: number;
  constructor(
    private router: Router,
    public OrderDialog: MatDialogRef<CartOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public translate: TranslateService,
  ) { }



  onCancel(): void {
    this.OrderDialog.close();

  }
  onOrder(Items: ProductList): void {

    var packingCnt = Number.parseInt(Items.packing);
    var CartCnt = this.ItemsCART;

    // 수정 - AmaK
    if (Number.parseInt(Items.packing) > this.ItemsCART) {
      this.translate.get('lowItemCnt').subscribe(
        value => {
          let msg = value as string;
          alert(msg.replace("*temp", Items.edp));
        }
      )
      return;
    }

    // 주문수량 → 포장 수량 배수로 처리
    if (CartCnt % packingCnt != 0) {
      this.translate.get('multiItemCnt').subscribe(
        value => {
          let msg = value as string;
          alert(msg.replace("*temp", Items.edp));
        }
      )
      return;
    }

    if (this.ItemsCART == undefined || 0) {
      this.translate.get('zeroQty').subscribe(
        value => {
          alert(value);
        }
      )
    }
    else {
      // Items.cart = this.ItemsCART;
      // let SelectCart: ProductList[] = new Array();
      // SelectCart.push(Items);
      // this.router.navigate(['orderform'], { queryParams: { carts: JSON.stringify(SelectCart) }, skipLocationChange: true })
      this.OrderDialog.close(this.ItemsCART);
    }
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
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatBadgeModule,

  ],
  entryComponents: [ComponentOrdermarkList, OrderDialog, CartDialog, CartOrderDialog],
  exports: [ComponentOrdermarkList],
  declarations: [ComponentOrdermarkList, OrderDialog, CartDialog, CartOrderDialog],
  providers: [ComponentPageTitle, HttpClientService, CartService],
})
export class ComponentOrdermarkListModule { }