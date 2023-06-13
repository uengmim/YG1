import { Component, NgModule, OnInit, Inject, OnDestroy, SystemJsNgModuleLoader } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatSlideToggleModule, MatFormFieldModule, MatButtonModule, MatChipsModule, MatDialog, MatFormFieldControl, MatInputModule, MatTableModule, MatIconModule, MatBadgeModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ProductList } from 'src/app/model/ProductList';
import { CartList } from 'src/app/model/CartList';
import { OrderMark } from 'src/app/model/OrderMark';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
import { filter, takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SearchService } from 'src/app/service/search.service';
import { CartService } from 'src/app/service/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { GetProducts } from 'src/app/model/GetProgucts';
import { isNullOrUndefined } from 'util';



export interface DialogData {
  CartCount: string;
  CartEDP: string;
  CartProduct: string;
  CartPrice: string;
  CartList: any;
  OrderItems: ProductList;
  OrderMark: string;
  OrderMarkList: any;
}

@Component({
  selector: 'app-component-product-list',
  templateUrl: './component-product-list.html',
  styleUrls: ['./component-product-list.scss']
})

export class ComponentProductList implements OnInit, OnDestroy {
  usrid = sessionStorage.getItem('username');
  company = sessionStorage.getItem('company');
  customer = sessionStorage.getItem('customer');
  language = sessionStorage.getItem('language');

  tree: any

  tree1 = sessionStorage.getItem('tree1')
  tree2 = sessionStorage.getItem('tree2')
  tree3 = sessionStorage.getItem('tree3')
  aClass: string
  bClass: string
  cClass: string

  getProducts: GetProducts = new GetProducts;
  DATA: ProductList[];
  color = 'primary';
  checked = false;
  CartItem: number;
  requestData = false;

  public destroyed = new Subject<any>();
  public searchDestroyed = new Subject<any>();


  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private route: ActivatedRoute,
    public _componentPageTitle: ComponentPageTitle,
    public dialog: MatDialog,
    private location: Location,
    private searchService: SearchService,
    private translater: TranslateService) {
    router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroyed)
      ).subscribe((event: NavigationEnd) => {
        if (event.url == '/product/search') {
          this.DATA = []
        } else if (event.url.includes('product/')) {
          this.getProducts.userid = this.usrid;
          this.getProducts.lang = this.language.toUpperCase();
          this.getProducts.comp = this.company
          this.getProducts.cust = this.customer;
          this.getProducts.condm = [];

          if (sessionStorage.getItem('tree3N') != route.snapshot.params['id']) {
            if (event.url.includes('product/search?')) {
              this.requestData = false
              this.route.queryParams.subscribe(params => {
                this.getProducts.aclass = "";
                this.getProducts.bclass = "";
                this.getProducts.cclass = "";
                this.getProducts.edpnm = JSON.parse(params.name);
                this.getProducts.edpno = "";
                this.httpClientService.getProducts(this.getProducts, "EDPNM").pipe(takeUntil(this.searchDestroyed)).subscribe(
                  Response => {
                    if(Response.length > 0)  
                      this.handleSuccesful(Response);
                    else {
                      this.translater.get('notAvailableMsg').subscribe(
                        value => {
                          alert(value);
                        }
                      )
                      this.searchDestroyed.next()
                    }
                  },
                  error => {
                    this.DATA = []
                    this.translater.get('askMasterMsg').subscribe(
                      value => {
                        alert(value);
                      }
                    ) 
                    this.searchDestroyed.next()
                    this.router.navigate(['product/search'])
                  }
                )
              })
              this.route.queryParams.subscribe(params => {
                this.getProducts.aclass = "";
                this.getProducts.bclass = "";
                this.getProducts.cclass = "";
                this.getProducts.edpno = JSON.parse(params.code);
                this.getProducts.edpnm = "";
                this.httpClientService.getProducts(this.getProducts, "EDPNO").pipe(takeUntil(this.searchDestroyed)).subscribe(
                  Response => {
                    if(Response.length > 0)  
                      this.handleSuccesful(Response);
                    else {
                      this.translater.get('notAvailableMsg').subscribe(
                        value => {
                          alert(value);
                        }
                      ) 
                      this.searchDestroyed.next()
                    }
                  },
                  error => {
                    this.DATA = []
                    this.translater.get('askMasterMsg').subscribe(
                      value => {
                        alert(value);
                      }
                    ) 
                    this.searchDestroyed.next()
                    this.router.navigate(['product/search'])
                  }
                )
              })
            } else {
              location.back()
            }
          } else {
            this.getProducts.aclass = this.tree1;
            this.getProducts.bclass = this.tree2;
            this.getProducts.cclass = this.tree3;
            this.httpClientService.getProducts(this.getProducts, "NOMAL").pipe(takeUntil(this.destroyed)).subscribe(
              Response => {
                if (Response.length > 0) {
                  this.aClass = Response[0].aClassNM
                  this.bClass = Response[0].bClassNM
                  this.cClass = Response[0].cClassNM
                  this.DATA = Response
                  this.requestData = true
                } else {
                  this.DATA = []
                  this.requestData = false
                }
              }, error => {
                this.DATA = []
                this.requestData = false
              })
          }
        }
      });
    //test
    this.searchService.listenCategory().pipe(takeUntil(this.destroyed)).subscribe((m: any) => {
      this.requestData = true
      this.tree1 = m.tree1
      this.tree2 = m.tree2
      this.tree3 = m.tree3
      sessionStorage.setItem('tree1', m.tree1)
      sessionStorage.setItem('tree2', m.tree2)
      sessionStorage.setItem('tree3', m.tree3)
    })


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


  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }


  ngOnInit() {
    this._componentPageTitle.title = "products"
  }
  handleSuccesful(Response: ProductList[]) {
    this.DATA = Response;
  }
  //카트 수량
  openCartDialog(edp: String, cart: any, data: CartList) {
    const dialogRef = this.dialog.open(CartDialog,
      {
        width: 'auto',
        data: { CartEDP: edp, CartCount: cart, CartList: data }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        cart = result;
      }
    })
  }
  //빠른 주문 Dialog
  openOrderDialog(product: String, edp: String, price: String, DATA: ProductList): void {
    const OrderDialog = this.dialog.open(CartOrderDialog,
      {
        width: 'auto',
        data: { CartProduct: product, CartEDP: edp, CartPrice: price, OrderItems: DATA }

      });
    OrderDialog.afterClosed().subscribe(result => {

      if (!isNullOrUndefined(result)) {

        var target: ProductList = DATA;
        target.cart = result;

        var condmTemp: any[] = [];
        condmTemp.push(edp + "/" + result);


        var cartInfo: GetProducts = new GetProducts;
        cartInfo.userid = this.usrid;
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
            this.translater.get('serverErrorMsg').subscribe(
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
  //오더마크 유/무
  openOrderMarkDialog(ItemList: ProductList, OrderMark: string): void {
    const CheckOrderMarkDialog = this.dialog.open(OrderMarkDialog,
      {
        width: 'auto',
        data: { OrderMarkList: ItemList, OrderMark: OrderMark },
        autoFocus: false,
      });
    CheckOrderMarkDialog.afterClosed().subscribe(result => {
      if (result == 1) {
        ItemList.ordermark = 0;
      }
      else if (result == 0) {
        ItemList.ordermark = 1;
      }
    })
  }
}
//장바구니 수량 삭제
@Component({
  selector: 'component-product-list-dialog',
  templateUrl: 'component-product-list-dialog.html',
  styleUrls: ['./component-product-list.scss']
})
export class CartDialog {
  clickCheck: boolean = false;
  constructor(public dialogRef: MatDialogRef<CartDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpClientService: HttpClientService,
    private cartService: CartService,
    private translateService: TranslateService) { }

  onCartDelete(CartList: CartList): void {
    this.clickCheck = true;
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
      return;
    }

    this.clickCheck = true;
    CartList.cart = CartCount;
    let userid = sessionStorage.getItem('username');
    CartList.userid = userid;
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

  onCancel(): void {
    this.dialogRef.close();
  }
}


//개별 주문
@Component({
  selector: 'component-product-list-order-dialog',
  templateUrl: 'component-product-list-order-dialog.html',
  styleUrls: ['./component-product-list.scss']
})
export class CartOrderDialog {
  ItemsCART: number;
  constructor(
    private router: Router,
    public OrderDialog: MatDialogRef<CartOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public translate: TranslateService,
  ) {
  }

  onCancel(): void {
    this.OrderDialog.close();

  }
  onOrder(Items: ProductList): void {

    var packingCnt = Number.parseInt(Items.packing);
    var CartCnt = this.ItemsCART;

    // 수정 - AmaK
    if (packingCnt > CartCnt) {
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
      //Items.cart = this.ItemsCART;
      // let SelectCart: ProductList[] = new Array();
      // SelectCart.push(Items);
      // this.router.navigate(['orderform'], { queryParams: { carts: JSON.stringify(SelectCart) }, skipLocationChange: true })
      this.OrderDialog.close(this.ItemsCART);
    }
  }

}
//오더마크 유무
@Component({
  selector: 'component-product-list-ordermark-dialog',
  templateUrl: 'component-product-list-ordermark-dialog.html',
  styleUrls: ['./component-product-list.scss']
})
export class OrderMarkDialog {
  clickCheck: boolean = false;
  constructor(
    public OrderMarkDialog: MatDialogRef<OrderMarkDialog>,
    private httpClientService: HttpClientService,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }
  onCancel(): void {
    this.OrderMarkDialog.close();
  }
  onOrderMarkInsert(OrderMarkList: OrderMark, OrderMark: string) {
    let userid = sessionStorage.getItem('username');
    OrderMarkList.userid = userid;
    let edp = OrderMarkList.edp;
    this.clickCheck = true;
    this.httpClientService.OrderMarkListInsert(userid, edp, OrderMarkList).subscribe(
      data => {
        this.OrderMarkDialog.close(OrderMark);
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
  onOrderMarkDelete(OrderMarkList: OrderMark, OrderMark: string) {
    let userid = sessionStorage.getItem('username');
    OrderMarkList.userid = userid;
    let edp = OrderMarkList.edp;
    this.clickCheck = true;
    this.httpClientService.OrderMarkListDelete(userid, edp).subscribe(
      data => {
        this.OrderMarkDialog.close(OrderMark);
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
    MatChipsModule,
    MatTableModule,
    MatIconModule,
    MatBadgeModule,
  ],
  entryComponents: [
    ComponentProductList,
    CartDialog,
    CartOrderDialog,
    OrderMarkDialog
  ],
  exports: [ComponentProductList],
  declarations: [ComponentProductList, CartDialog, CartOrderDialog, OrderMarkDialog],
  providers: [ComponentPageTitle, HttpClientService, SearchService, CartService],
})
export class ComponentProductListModule { }