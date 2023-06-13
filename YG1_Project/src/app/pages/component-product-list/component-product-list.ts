import { Component, NgModule, OnInit, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatSlideToggleModule, MatFormFieldModule, MatButtonModule, MatChipsModule, MatDialog, MatFormFieldControl, MatInputModule, MatTableModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ProductList } from 'src/app/model/ProductList';
import { CartList } from 'src/app/model/CartList';
import { OrderMark } from 'src/app/model/OrderMark';
import { SelectCart } from 'src/app/model/SelectCart';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';

export interface DialogData {
  CartCount: string;
  CartEDP: string;
  CartProduct: string;
  CartPrice: string;
  CartList: any;
  OrderMark: string;
  OrderMarkList: any;

}

@Component({
  selector: 'app-component-product-list',
  templateUrl: './component-product-list.html',
  styleUrls: ['./component-product-list.scss']
})
export class ComponentProductList implements OnInit {

  DATA: ProductList[];

  color = 'primary';
  checked = false;

  CartItem: number;
  userid: string;

  constructor(private httpClientService: HttpClientService,
    public _componentPageTitle: ComponentPageTitle,
    public dialog: MatDialog, ) { }

  ngOnInit() {
    this.userid = sessionStorage.getItem('username');
    this._componentPageTitle.title = "products",
      this.httpClientService.ALLProductList(this.userid).subscribe(
        Response => this.handleSuccesful(Response)
      );


  }
  handleSuccesful(Response: ProductList[]) {
    this.DATA = Response;

    console.log(this.DATA)
  }
  openCartDialog(edp: String, cart: any, data: CartList) {
    const dialogRef = this.dialog.open(CartDialog,
      {

        width: '260px',
        data: { CartEDP: edp, CartCount: cart, CartList: data }
      });
    console.log(edp)
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        cart = result;


      }
    })
  }
  openOrderDialog(product: String, edp: String, price: String, cart: String): void {
    const OrderDialog = this.dialog.open(CartOrderDialog,
      {
        width: '250px',
        data: { CartProduct: product, CartEDP: edp, CartPrice: price, CartCount: cart }

      });
    console.log(edp)
    OrderDialog.afterClosed().subscribe(result => {
      console.log("다이얼로그 닫힘")

    })

  }
  openOrderMarkDialog(ItemList: OrderMark, OrderMark: string): void {
    const CheckOrderMarkDialog = this.dialog.open(OrderMarkDialog,
      {
        width: '250px',
        data: { OrderMarkList: ItemList, OrderMark: OrderMark }
      });
    CheckOrderMarkDialog.afterClosed().subscribe(result => {
 

    })

  }

}
//카트리스트
@Component({
  selector: 'component-product-list-dialog',
  templateUrl: 'component-product-list-dialog.html',
})
export class CartDialog {
  constructor(public dialogRef: MatDialogRef<CartDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpClientService: HttpClientService) { }

  onCartDelete(CartList: CartList): void {
    this.httpClientService.CartListDelete(CartList).subscribe(
      resultMSG => {
        if (!resultMSG.blCode) {
          alert("관리자에게 문의 하세요. \n Error : " + resultMSG.errMsg);
        }
        else {
          CartList.cart = 0;
          this.dialogRef.close(CartList.cart);
        }
      }
    )
  }

  onAddCart(CartCount: any, CartEDP: string, CartList: CartList): void {
    CartList.cart = CartCount;
    let userid = sessionStorage.getItem('username');
    CartList.userid = userid;
    this.httpClientService.CartListUpdate(CartList).subscribe(
      data => {
        this.dialogRef.close(CartCount);
      }
    )
  }

  onCancle(): void {
    this.dialogRef.close();
  }
}


//개별 주문
@Component({
  selector: 'component-product-list-order-dialog',
  templateUrl: 'component-product-list-order-dialog.html',
})
export class CartOrderDialog {
  constructor(
    private router: Router,
    public OrderDialog: MatDialogRef<CartOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onCancle(): void {
    this.OrderDialog.close();

  }
  onOrder(data): void {
    console.log(data)
    console.log(data.Cartproduct)
    let CartProduct: String = data.CartProduct;
    let CartEDP: String = data.CartEDP;
    let CartCount: number = data.CartCount;
    let CartPrice: number = data.CartPrice;

    let SelectCart: SelectCart[] = new Array();
    SelectCart.push({ CartProduct: CartProduct, CartEDP: CartEDP, CartPrice: CartPrice, CartCount: CartCount });
    this.router.navigate(['orderform'], { queryParams: { carts: JSON.stringify(SelectCart), skipLocationChange: true } })
    this.OrderDialog.close();
  }

}
//오더마크 유무
@Component({
  selector: 'component-product-list-ordermark-dialog',
  templateUrl: 'component-product-list-ordermark-dialog.html',
})
export class OrderMarkDialog {
  constructor(
    public OrderMarkDialog: MatDialogRef<OrderMarkDialog>,
    private httpClientService : HttpClientService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }
  onCancle() :void {
    this.OrderMarkDialog.close();
  }
  onOrderMarkInsert(OrderMarkList : OrderMark, OrderMark : string){
    let userid = sessionStorage.getItem('username');
    OrderMarkList.userid = userid;
    this.httpClientService.OrderMarkListInsert(OrderMarkList).subscribe(
      data => {
        this.OrderMarkDialog.close(OrderMark);
      }
    )
  }
  onOrderMarkDelete(OrderMarkList : OrderMark, OrderMark : string){
    let userid = sessionStorage.getItem('username');
    OrderMarkList.userid = userid;
    this.httpClientService.OrderMarkListDelete(OrderMarkList).subscribe(
      data => {
        this.OrderMarkDialog.close(OrderMark);
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
  ],
  entryComponents: [
    ComponentProductList,
    CartDialog,
    CartOrderDialog,
    OrderMarkDialog
  ],
  exports: [ComponentProductList],
  declarations: [ComponentProductList, CartDialog, CartOrderDialog, OrderMarkDialog],
  providers: [ComponentPageTitle, HttpClientService],
})
export class ComponentProductListModule { }