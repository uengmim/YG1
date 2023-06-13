import { Component, NgModule, OnInit, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { OrderMark } from 'src/app/model/OrderMark';
import { CartList } from 'src/app/model/CartList';
import { SelectCart } from 'src/app/model/SelectCart';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';

export interface DialogData {
  ItemsEDP: String;
  ItemsLIST: any;
  ItemsCART: number;
  Itemsproduct : String;
  ItemsPrice : number;
}

@Component({
  selector: 'app-component-order_mark-list',
  templateUrl: './component-order_mark-list.html',
  styleUrls: ['./component-order_mark-list.scss']
})
export class ComponentOrdermarkList implements OnInit {
  OrderList: OrderMark[];

  userid: String;

  constructor(private httpClientService: HttpClientService,
    public _componentPageTitle: ComponentPageTitle,
    public dialog: MatDialog, ) { }

  ngOnInit() {
    this.userid = sessionStorage.getItem('username');
    // title on topbar navigation
    this._componentPageTitle.title = "favorites"
    this.httpClientService.OrderMarkList(this.userid).subscribe(
      Response => this.Succesful(Response)
    );
  }
  Succesful(Response: OrderMark[]) {
    this.OrderList = Response;
  }
  openDeleteDialog(edp: String, DATA: Object) {
    const dialogRef = this.dialog.open(OrderDialog,
      {
        width: '250px',
        data: { ItemsEDP: edp, ItemsLIST: DATA }
      });
    console.log(edp)

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('다이얼로그 닫힘')
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

        width: '260px',
        data: { ItemsEDP: edp, ItemsCART: cart, ItemsLIST: data }
      });
    console.log(edp)
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        data.cart = result;


      }
    })
  }
  openOrderDialog(product: String, edp: String, price: String, cart: String): void {
    const OrderDialog = this.dialog.open(CartOrderDialog,
      {
        width: '250px',
        data: { Itemsproduct : product, ItemsEDP: edp, ItemsPrice: price, ItemsCART: cart }

      });
    console.log(edp)
    OrderDialog.afterClosed().subscribe(result => {
      console.log("다이얼로그 닫힘")

    })

  }

}

@Component({
  selector: 'component-order_mark-list-delete-dialog',
  templateUrl: 'component-order_mark-list-delete-dialog.html',
})
export class OrderDialog {

  constructor(
    public dialogRef: MatDialogRef<OrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpClientService: HttpClientService
  ) {

  }
  onDialogCancle(): void {
    this.dialogRef.close()

  }
  onDeleteOrderMark(OrderEDP: String, ItemsLIST: Object): void {
    console.log("삭제합니다 해당 EDP = " + OrderEDP)
    this.httpClientService.OrderMarkListDelete(ItemsLIST).subscribe(result => {
      this.dialogRef.close(OrderEDP);
    })
  }
}
@Component({
  selector: 'component-order_mark-list-cart-dialog',
  templateUrl: 'component-order_mark-list-cart-dialog.html',
})
export class CartDialog {
  username: string;

  constructor(public dialogRef: MatDialogRef<CartDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpClientService: HttpClientService) { }

  onCancle(): void {
    this.dialogRef.close();
  }
  onAddCart(CartCount: any, CartEDP: string, CartList: CartList): void {
    CartList.cart = CartCount;
    console.log(this.username)
    this.httpClientService.CartListUpdate(CartList).subscribe(
      data => {
        this.dialogRef.close(CartCount);
      }
    )
  }
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

}
//개별 주문
@Component({
  selector: 'component-order_mark-list-order-dialog',
  templateUrl: 'component-order_mark-list-order-dialog.html',
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
    let CartProduct : String = data.Itemsproduct;
    let CartEDP : String = data.ItemsEDP;
    let CartCount : number = data.ItemsCART;
    let CartPrice : number = data.ItemsPrice;

    let SelectCart : SelectCart[] = new Array();
    SelectCart.push({ CartProduct: CartProduct, CartEDP: CartEDP, CartPrice: CartPrice, CartCount: CartCount });
    this.router.navigate(['orderform'], { queryParams: {carts: JSON.stringify(SelectCart), skipLocationChange: true }})
    this.OrderDialog.close();
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

  ],
  entryComponents: [ComponentOrdermarkList, OrderDialog, CartDialog, CartOrderDialog],
  exports: [ComponentOrdermarkList],
  declarations: [ComponentOrdermarkList, OrderDialog, CartDialog, CartOrderDialog],
  providers: [ComponentPageTitle, HttpClientService],
})
export class ComponentOrdermarkListModule { }