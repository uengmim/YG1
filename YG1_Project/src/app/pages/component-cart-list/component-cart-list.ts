import { Component, NgModule, OnInit, INJECTOR, Inject, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, formatNumber } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatSlideToggleModule, MatFormFieldModule, MatButtonModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatInputModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CartList } from 'src/app/model/CartList';
import { SelectionModel } from '@angular/cdk/collections';
import { SelectCart } from 'src/app/model/SelectCart';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';

export interface DialogData {
  CartCount: string;
  CartEDP: string;
  CartProduct: string;
  CartPrice: string;
  CartList: any;
  SelectItems: any;
}

@Component({
  selector: 'app-component-cart-list',
  templateUrl: './component-cart-list.html',
  styleUrls: ['./component-cart-list.scss']
})
export class ComponentCartList implements OnInit {

  color = 'primary';
  checked = false;
  userid: String;

  selection = new SelectionModel<CartList>(true, []);

  CartItems: CartList[];

  constructor(private httpClientService: HttpClientService,
    public _componentPageTitle: ComponentPageTitle,
    public dialog: MatDialog, ) { }

  ngOnInit() {
    this.userid = sessionStorage.getItem('username');
    this._componentPageTitle.title = "cart"
    this.httpClientService.ALLCartList(this.userid).subscribe(
      Response => this.handleSuccesful(Response)
    );
  }
  handleSuccesful(Response: CartList[]) {
    if (Response.length < 1) {
      alert("데이터가 없어요")
    }
    this.CartItems = Response;
    console.log(Response)
  }
  //카트 수량 변경
  openDialog(edp: String, cart: string, data: CartList): void {
    const dialogRef = this.dialog.open(CartDialog,
      {

        width: '250px',
        data: { CartCount: [cart], CartEDP: [edp], CartList: data }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog close')
      if (result != null) {
        data.cart = result;

      }
    })
  }
  // 선택 주문
  openSelectOrderDialog(SelectCartItems: Object): void {
    const SelectOrderRef = this.dialog.open(CartSelectOrderDialog,
      {
        width: '250px',
        data: { SelectItems: SelectCartItems }
      });
    SelectOrderRef.afterClosed().subscribe(result => {
      console.log("선택 주문 DIALOG CLOSE");

    })
  }

  // 해당 카트 삭제
  openDeleteDialog(CartItems: CartList): void {
    const deleteDialog = this.dialog.open(CartDeleteDialog,
      {
        width: '250px',
        data: { CartList: CartItems }

      });
    console.log("해당 ItemLIst = " + CartItems);

    deleteDialog.afterClosed().subscribe(result => {
      console.log("다이얼로그 닫힘")
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
})
export class CartDialog {

  EDP: String;

  constructor(public dialogRef: MatDialogRef<CartDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpClientService: HttpClientService) { }

  onCancle(): void {
    this.dialogRef.close();
  }
  onAddCart(CartCount: number, CartEDP: string, CartList: CartList): void {
    CartList.cart = CartCount;

    this.httpClientService.CartListUpdate(CartList).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close(CartCount);
      })

  }

}
//카트 삭제
@Component({
  selector: 'component-cart-list-delete-dialog',
  templateUrl: 'component-cart-list-delete-dialog.html',
})
export class CartDeleteDialog {
  constructor(public deleteDialog: MatDialogRef<CartDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpClientService: HttpClientService) { }

  onDialogCancle(): void {
    this.deleteDialog.close()

  }
  onDeleteCart(CartList: CartList): void {

    this.httpClientService.CartListDelete(CartList).subscribe(
      resultMSG => {
        if (!resultMSG.blCode) {
          alert("관리자에게 문의 하세요. \n Error : " + resultMSG.errMsg);
        }
        this.deleteDialog.close(CartList.edp);
      }
    );
  }

}
//선택 주문
@Component({
  selector: 'component-cart-list-order-select-dialog',
  templateUrl: 'component-cart-list-order-select-dialog.html',
})
export class CartSelectOrderDialog {
  constructor(
    private router: Router,
    public SelectOrderDialog: MatDialogRef<CartSelectOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public ItemsList: DialogData,
  ) { }

  //선택 주문 - 다이얼로그 닫기
  onCancle(): void {
    this.SelectOrderDialog.close();
  }
  //선택 주문 - 주문 하기
  onSelectOrder(Items: CartList[]) {

    let SelectCart : SelectCart[] = new Array();

    for (let i = 0; i < Items.length; i++) {
      SelectCart.push({ CartProduct: Items[i].product , CartEDP : Items[i].edp , CartPrice : Items[i].price, CartCount : Items[i].cart});
    }

    this.router.navigate(['orderform'], { queryParams: {carts: JSON.stringify(SelectCart), skipLocationChange: true }})
    this.SelectOrderDialog.close();
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
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,

  ],
  entryComponents: [
    ComponentCartList,
    CartDialog,
    CartDeleteDialog,

    CartSelectOrderDialog
  ],
  exports: [ComponentCartList],
  declarations: [ComponentCartList, CartDialog, CartDeleteDialog, CartSelectOrderDialog],
  providers: [ComponentPageTitle, HttpClientService],
})
export class ComponentCartListModule { }