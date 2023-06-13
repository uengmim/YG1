import { Component, NgModule, OnInit, ViewChild, Inject, ɵpublishDefaultGlobalUtils } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatCheckboxModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatTableDataSource, MatTable, MatButtonModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatRadioModule, MatDialogModule, MatOptionModule, MatSlideToggleModule, fadeInItems, MatIconModule, MatSelect, MatProgressBarModule, MatFormField } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
import { CreateOrder } from 'src/app/model/CreateOrder';
import { CreateOrderItem } from 'src/app/model/CreateOrderItem';
import { ProductList } from 'src/app/model/ProductList';
import { MatSelectFilterModule } from 'mat-select-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShipToParty } from 'src/app/model/ShipToParty';
import { isNgTemplate, ClassField } from '@angular/compiler';
import { CartService } from 'src/app/service/cart.service';
import { TranslateService } from '@ngx-translate/core';
import value from '*.json';
import { isNullOrUndefined } from 'util';
import { isEmpty } from 'rxjs/operators';
import { stringify } from 'querystring';

export interface PeriodicElement {
  CartProduct: String;
  CartEDP: String;
  CartPrice: number;
  CartCount: number;
}
export interface OrderInterface {
  OrderList: ProductList[];
  remark: string;
  customerNo: string;
  ponumber: string;
  deliveryType: string;
  DestinationValue: ShipToParty;
}
export interface DestinationInterface {
  destList: ShipToParty[];
  customerNo: string;
}


@Component({
  selector: 'app-component-order',
  templateUrl: './component-order.html',
  styleUrls: ['./component-order.scss']
})
export class ComponentOrder implements OnInit {
  displayedColumns: string[] = ['select', 'edpNo', 'name', 'netprice', 'orderEa', 'sum'];
  // displayedColumns: string[] = ['select', 'edpNo', 'name', 'price', 'orderEa', 'sum'];
  dataSource;
  data: any;
  destinations: ShipToParty[];
  remark: string;
  ponumber: string;
  deliveryType: string;
  DestinationValue: ShipToParty;
  filteredList: ShipToParty[];
  customerList: ShipToParty[];
  filterList: ShipToParty[];
  customerNo: string;
  SelectChange: MatSelect;

  authority: string = sessionStorage.getItem('authority');
  customer: string = sessionStorage.getItem('customer');
  company: string = sessionStorage.getItem('company');
  plant: string = sessionStorage.getItem('plant');
  cusDccode: string = sessionStorage.getItem('cusDccode');

  dcCode = this.cusDccode != '' ? this.cusDccode : this.plant == '4110' || this.plant == '4120' ? '10' :
    this.plant == '4125' || this.plant == '4130' || this.plant == '4140' ? '20' : this.cusDccode;
  CustomerValue: string

  Isdisble = this.customer != '' && this.cusDccode != '' ? true : this.plant != '4200' ? true : false;
  Isdisble2 = this.customer != '' ? true : false;

  addressClick: boolean = false;

  selection = new SelectionModel<PeriodicElement>(true, []);

  formGroup: FormGroup;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  dTypes = [
    { value: 'UPS Standard', display: 'UPS Standard' },
    { value: 'UPS Express Plus®', display: 'UPS Express Plus® (9:00 Uhr)_85,00 €' },
    { value: 'UPS Express®', display: 'UPS Express® (10:30 Uhr)_30,00 €' },
    { value: 'UPS Express 12:00', display: 'UPS Express 12:00 (12:00 Uhr)_25,00 €' },
    { value: 'UPS Express Saver®', display: 'UPS Express Saver® (Im Laufe des folgenden Arbeitstages)_20,00 €' },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private httpClientService: HttpClientService,
    public _componentPageTitle: ComponentPageTitle,
    public dialog: MatDialog,
    public translate: TranslateService,) { }


  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      option: { value: this.dcCode, disabled: this.Isdisble },
      customerValue: { value: this.customer, disabled: this.Isdisble2 }
    });

    this._componentPageTitle.title = "orderForm"
    this.route.queryParams.subscribe(params => {
      if (params.carts) {
        this.data = JSON.parse(params.carts);
      } else {
        this.translate.get('askMasterMsg').subscribe(
          value => {
            alert(value);
          }
        )
      }
    });

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);
    if (this.authority != 'CUSTOMER') {
      this.httpClientService.getCustomer(this.company, this.plant, "").subscribe(
        data => {
          this.customerList = data
          this.CustomerItems(this.dcCode)
        },
        error => {
          this.translate.get('serverErrorMsg').subscribe(
            value => {
              alert(value);
            }
          )
        }
      )

    } else {
      this.customerNo = this.customer;
        /**
         * Sales office 별 고객정보 sorg,dccode,socode 재 확인
         */
         this.httpClientService.getCustomer(this.company, this.plant, this.customerNo).subscribe(
          (result: ShipToParty[]) => {
            result.forEach(element => {
              sessionStorage.setItem('sorg', element.sorg);
              sessionStorage.setItem('dccode', element.dccode);
              sessionStorage.setItem('socode', element.socode);
            });
          },
          error => {
            this.translate.get('serverErrorMsg').subscribe(
              value => {
                alert(value);
              }
            )
          });
      
      this.httpClientService.getStpinfourl(this.company, this.customerNo).subscribe(
        (Response: ShipToParty[]) => {


          var result = Response.find(f=>f.stp == this.customerNo);

          if(!isNullOrUndefined(result))
            this.DestinationValue = result;
        
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

  isDTypeFieldVisible() {

    let isVisibleOfdType = false;
    if (this.company == "4200") {
      let auth = this.authority.toUpperCase();
      if (auth == "MANAGER" || auth == "CUSTOMER")
        isVisibleOfdType = true;
    }
    else {
      isVisibleOfdType = false;
    }
    return isVisibleOfdType;
  }

  // CustomerItems(){
  //   this.filterList= this.customerList.filter(
  //     reuslt => reuslt.dccode == this.dcCode
  //   );
  //   this.filteredList = this.filterList.slice();
  //   this.formGroup.get('customerValue').setValue(this.customer)
  // }

  CustomerItems(value: string) {
    this.filterList = this.customerList.filter(result => result.dccode === value)
    this.filteredList = this.filterList.slice();
    if (this.customer != '') {
      this.formGroup.get('customerValue').setValue(this.customer)
    }
  }

  getTotalSum() {
    return this.dataSource.data.map(t => t.netprice * t.cart).reduce((acc, value) => acc + value, 0);
  }

  getTotalCurr(){

    if(this.dataSource.data){
      return this.dataSource.data[0].currency;
    }else{
    return "EUR";
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      this.data.splice(index, 1)
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);
    });
    if (this.data.length < 1) {
      this.router.navigate(['/orderinq']);
    }
    this.selection = new SelectionModel<PeriodicElement>(true, []);
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   * 배송지 Dialog
   * @param customerNo 유저 코드
   */
  openDestinationDialog(customerNo: string): void {
    //대리주문시 고객 선택 여무 (If / else)
    if (customerNo != null) {
      /**
       * Sales office 별 고객정보 sorg,dccode,socode 재 확인
       */
      this.httpClientService.getCustomer(this.company, this.plant, customerNo).subscribe(
        (result: ShipToParty[]) => {
          result.forEach(element => {
            sessionStorage.setItem('sorg', element.sorg);
            sessionStorage.setItem('dccode', element.dccode);
            sessionStorage.setItem('socode', element.socode);
          });
        },
        error => {
          this.translate.get('serverErrorMsg').subscribe(
            value => {
              alert(value);
            }
          )
        });

      this.addressClick = true;
      this.httpClientService.getStpinfourl(this.company, customerNo).subscribe(
        (Response: ShipToParty[]) => {
          const dialogRef = this.dialog.open(DestinationDialog,
            {
              data: { destList: Response, customerNo: customerNo },
              autoFocus: false,
              height: "83vh",
              
            });
          dialogRef.afterClosed().subscribe(result => {
            this.addressClick = false;
            this.DestinationValue = result;
          });
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
    else {
      this.addressClick = false;
      this.translate.get('userSelectMsg').subscribe(
        value => {
          alert(value);
        }
      )
    }
  }

  StpList(Response: ShipToParty[]) {
    this.destinations = Response;
  }

  backPage() {
    this.router.navigate(['/orderinq']);
  }

  /**
   * 최종 주문 실행
   * @param data 최종 주문 데이터
   * @param addremark 비고
   * @param customerNo 주문 고객 Code
   * @param DestinationValue 최종 배송지
   */
  onOrder(data: ProductList[], addremark: string, dType: string = "", ponumber: string, customerNo: string, DestinationValue: ShipToParty): void {
    let authority: string = sessionStorage.getItem('authority');

    //권한 , 주문할 제품 , 배송지 체크
    if (authority == 'MASTER') {
      this.translate.get('masterOrderMsg').subscribe(
        value => {
          alert(value);
        }
      )
    }
    else if (!ponumber){
      this.translate.get('ponumMsg').subscribe(
        value => {
          alert(value);
        }
      )
    }
    else if (data.length < 1) {
      this.translate.get('noItemMsg').subscribe(
        value => {
          alert(value);
        }
      )
    }
    else if (DestinationValue == undefined || null) {
      this.translate.get('shipSelectMsg').subscribe(
        value => {
          alert(value);
        }
      )
    }
    else {
      if (addremark == undefined || null) {
        addremark = "";
      }

      if (this.authority == 'MANAGER' && this.customer == '' && this.cusDccode == '') {
        const dialogRef = this.dialog.open(OrderCheckDialog,
          {
            width: 'auto',
            data: {},
            autoFocus: false,
          });
        dialogRef.afterClosed().subscribe(result => {
          if (result == "OK") {
            const dialogRef = this.dialog.open(OrderDialog,
              {
                width: 'auto',
                data: { OrderList: data, remark: addremark, deliveryType: dType, ponumber: ponumber, customerNo: customerNo, DestinationValue: DestinationValue },
                autoFocus: false,
              });
            dialogRef.afterClosed().subscribe(result => {

            });
          }
        });
      } else {

        const dialogRef = this.dialog.open(OrderDialog,
          {
            width: 'auto',
            data: { OrderList: data, remark: addremark, deliveryType: dType, ponumber: ponumber, customerNo: customerNo, DestinationValue: DestinationValue },
            autoFocus: false,
          });
        dialogRef.afterClosed().subscribe(result => {

        });
      }
    }
  }

}
//주문 실행
@Component({
  selector: 'component-order-dialog',
  templateUrl: 'component-order-dialog.html',
  styleUrls: ['./component-order.scss']
})
export class OrderDialog {
  orderClick: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<OrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: OrderInterface,
    private httpClientService: HttpClientService,
    private router: Router,
    private cartService: CartService,
    private translate: TranslateService) { }
  onCancel() {
    this.dialogRef.close();
  }


  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  onOrderStart(data: ProductList[], remark: string, dType: string, ponumber: string, customerNo: string, DestinationValue: ShipToParty): void {
    this.orderClick = true;

    let company: string = sessionStorage.getItem('company');
    let userid: string = sessionStorage.getItem('username');
    let sorg: string = sessionStorage.getItem('sorg');
    let dccode: string = sessionStorage.getItem('dccode');
    let socode: string = sessionStorage.getItem('socode');

    let date: Date = new Date();

    let year: string = String(date.getFullYear());
    let month: number = date.getMonth()+1;
    let monthR: string;
    // if (month < 10) {
    //   month = month + 1;
    //   monthR = "0" + String(month);
    // } else {
    //   month = month + 1;
    //   monthR = String(month);
    // }
    let day: number = date.getDate();
    let dayR: string;
    // if (day < 10) {
    //   dayR = "0" + String(day)
    // } else {
    //   dayR = String(day);
    // }

    monthR = this.padTo2Digits(month);  
    dayR = this.padTo2Digits(day);


    let nowdate: string = year + monthR + dayR;
    let nowClientTime: string = year + "-" + monthR + "-" + dayR;

    let Hours: number = date.getHours();
    let Minutes: number = date.getMinutes();
    let Seconds: number = date.getSeconds();
    let HoursR: string;
    let MinutesR: string;
    let SecondsR: string;
    // if (Hours < 10) {
    //   HoursR = "0" + String(Hours);
    // } else {
    //   HoursR = String(Hours);
    // }
    // if (Minutes < 10) {
    //   MinutesR = "0" + String(Minutes);
    // } else {
    //   MinutesR = String(Minutes);
    // }
    // if (Seconds < 10) {
    //   SecondsR = "0" + String(Seconds);
    // } else {
    //   SecondsR = String(Seconds);
    // }
  
    HoursR = this.padTo2Digits(Hours);  
    MinutesR = this.padTo2Digits(Minutes);
    SecondsR = this.padTo2Digits(Seconds);

    let nowTime: string = HoursR + MinutesR + SecondsR;
    let po: string;
    if (ponumber == null || undefined) {
      po = "";
    } else {
      po = ponumber;
    }

    //수정 - amak
    let delivType: string;
    if (isNullOrUndefined(dType)) {
      delivType = ""
    } else {
      delivType = dType;
    }

    let OrderItems: Array<CreateOrderItem> = new Array<CreateOrderItem>();
    data.forEach(items => {
      let orderItem: CreateOrderItem = new CreateOrderItem;
      orderItem.product = items.edp;
      // orderItem.orderAm = items.price;      
      orderItem.orderAm = items.netprice;
      orderItem.orderQty = items.cart;
      orderItem.currency = items.currency;
      orderItem.orderNo = "";
      orderItem.sapPerchase = po;
      orderItem.remark = "";
      orderItem.quantity = items.quantity;
      orderItem.orderSeq = "";
      OrderItems.push(orderItem);
    });
    let OrderList: CreateOrder = {
      company: company,
      userID: userid,
      orderNo: "",
      tdate: nowClientTime,
      createOrderHeader: {
        orderDt: nowdate,
        orderTm: nowTime,
        soldTo: customerNo,
        shipTo: DestinationValue.stp,
        shipToNM: DestinationValue.stpnm,
        street: DestinationValue.addr,
        post: DestinationValue.post,
        city: DestinationValue.city,
        currency: "",
        pono: po,
        remark: remark,
        userID: userid,
        company: company,
        vkorg: sorg,
        vtweg: dccode,
        vkbur: socode,
        deliveryType: delivType,
        zmail : DestinationValue.zmail,
        zname : DestinationValue.zname,
        ztelf1 : DestinationValue.ztelf1,
      },
      createOrderItem: OrderItems
    }
    this.httpClientService.CreateOrderList(OrderList).subscribe(result => {
      this.dialogRef.close();
      if (result.messageCode == 0) {
        this.httpClientService.CartListDeleteAll(userid, data).subscribe(
          result => {
            this.cartService.sendChange(userid)
            this.translate.get('orederSuccessMsg').subscribe(
              value => {
                alert(value);
              }
            )
            this.router.navigate(['orderinq']);
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
      else if (result.messageCode == -9) {
        // this.translate.get('serverErrorMsg').subscribe(
        //   value => {
        //     alert(value);
        //   }
        // )
        alert(result.message)
      }
      else {
        this.translate.get('askMasterMsg').subscribe(
          value => {
            alert(value);
          }
        )
      }
    });
  }
}



//배송지 선택
@Component({
  selector: 'component-order-destination-dialog',
  templateUrl: 'component-order-destination-dialog.html',
  styleUrls: ['./component-order.scss']
})
export class DestinationDialog {
  SearchDestinations: string = "";
  destination: ShipToParty;
  selection = new SelectionModel<ShipToParty>(true, []);
  destinationList: ShipToParty[];
  destinationName: string;
  destinationCode: string;
  destinationCity: string;
  destinationStreet: string;
  destinationTel: string;
  destinationDCcode: string;
  destinationSOcode: string;
  destinationSORGCode: string;


  destinationTelNum: string;
  destinationEmail: string;
  destinationContactName: string;

  OptionSelected = 'stpnm';

  constructor(
    public DestinationRef: MatDialogRef<DestinationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DestinationInterface,
    private translate: TranslateService) {
    data.destList.forEach(element => {
      this.destinationTel = element.tel;
      this.destinationSOcode = element.socode;
      this.destinationDCcode = element.dccode;
      this.destinationSORGCode = element.sorg;
    });
    this.destinationList = data.destList;
  }
  onCancel(): void {
    this.DestinationRef.close();
  }

  destinationSelect(destination: any, customerNo: string): void {
    if (destination == null) {
      this.translate.get('shipSelectMsg').subscribe(
        value => {
          alert(value);
        }
      )
    } else {
      //배송지 추가할때
      if (destination == "AddDestination") {


        // if(this.destinationEmail == "" || isNullOrUndefined(this.destinationEmail)){

        //   this.translate.get('emailRequiredMsg').subscribe(
        //     value => {
        //       alert(value);
        //     }
        //   )
        //   return;
        // }
        // if(this.destinationContactName == "" || isNullOrUndefined(this.destinationContactName)){
        //   this.translate.get('contactnameRequiredMsg').subscribe(
        //     value => {
        //       alert(value);
        //     }
        //   )
        //   return;
        // }

        if(this.destinationTelNum == "" || isNullOrUndefined(this.destinationTelNum)){
          this.translate.get('telnumRequiredMsg').subscribe(
            value => {
              alert(value);
            }
          )
          return;
        }

        let destinationItems: ShipToParty = new ShipToParty();
        destinationItems.addr = this.destinationStreet;
        destinationItems.city = this.destinationCity;
        destinationItems.post = this.destinationCode;
        destinationItems.stpnm = this.destinationName;
        destinationItems.tel = this.destinationTel;
        destinationItems.dccode = this.destinationDCcode;
        destinationItems.sorg = this.destinationSORGCode;
        destinationItems.socode = this.destinationSOcode;
        destinationItems.stp = "";
        destinationItems.zmail = this.destinationEmail;
        destinationItems.zname = this.destinationContactName;
        destinationItems.ztelf1 = this.destinationTelNum;

        this.DestinationRef.close(destinationItems);

      } else {
        this.DestinationRef.close(destination);
      }
    }
  }
  Search(SearchItems: string, OptionSelected: any) {
    //검색할 데이터가 없을때
    if (SearchItems == "") {
      this.destinationList = this.data.destList;
    }
    //검색을 할때
    else {
      //배송지 검색할때
      if (OptionSelected == "stpnm") {
        this.destinationList = this.data.destList.filter(
          result => result.stpnm.toLowerCase().startsWith(SearchItems.toLowerCase())

        );
      }
      //우편번호 검색할때
      else if (OptionSelected == "post") {
        this.destinationList = this.data.destList.filter(
          result =>
            result.post.startsWith(SearchItems)
        );
      }
    }
  }
  Searchfix() {
    this.SearchDestinations = "";
    this.Search(this.SearchDestinations, this.OptionSelected);
  }
}

//대리주문 - UNIT PRICE 0일 경우
@Component({
  selector: 'component-order-check-dialog',
  templateUrl: 'component-order-check-dialog.html',
  styleUrls: ['./component-order.scss']
})
export class OrderCheckDialog {
  clickCheck: Boolean = false;
  constructor(public dialog: MatDialogRef<OrderCheckDialog>,
    private translate: TranslateService) { }
  onDialogCancel(): void {
    this.dialog.close("CANCEL");
  }
  onOrder(): void {
    this.dialog.close("OK");
  }
}

@NgModule({
  imports: [
    SharedTranslateModule,
    MatCardModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatSelectFilterModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  entryComponents: [
    ComponentOrder,
    DestinationDialog,
    OrderDialog,
    OrderCheckDialog
  ],
  exports: [ComponentOrder],
  declarations: [
    ComponentOrder,
    DestinationDialog,
    OrderDialog,
    OrderCheckDialog
  ],
  providers: [ComponentPageTitle, HttpClientService],
})
export class ComponentOrderMoudle { }