import { Component, NgModule, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatTableDataSource, MatSort, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatPaginator, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material'
import { MatTableExporterDirective, MatTableExporterModule } from 'mat-table-exporter';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
import { DateAdapter } from '@angular/material';
import { DateProxyPipe } from 'src/app/shared/date-local/date-proxy-pipe.pipe';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { delay } from 'rxjs/operators';



export interface PeriodicElement2 {
  edpNo: string;
  edpNm: string;
  standard: string;
  remark: string;
  orderAm: string;
  orderQty: string;
}

export interface PeriodicElement {
  orderNo: string;
  // deliveryType : string;
  custPono: string;
  soldTo: string;
  orderDt: string;
  orderTm: string;
  totalQty: string;
  totalAm: string;
  cancelYN: string;
  remark: string;
  orderInqueryList: PeriodicElement2[];
}


@Component({
  selector: 'app-component-order_inq-list',
  templateUrl: './component-order_inq-list.html',
  styleUrls: ['./component-order_inq-list.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'block' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('350ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ComponentOrderinqList implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource;

  usrid = sessionStorage.getItem('username');
  authority = sessionStorage.getItem('authority');
  language = sessionStorage.getItem('language');
  company = sessionStorage.getItem('company');
  plant = sessionStorage.getItem('plant');
  customer = this.authority == 'MANAGER' ? '' : sessionStorage.getItem('customer');
  dccode = sessionStorage.getItem('dccode');
  kunag: string;

  currentDate: Date = new Date();
  startDate: Date = new Date()


  sDate: string;
  eDate: string;

  pipe: DatePipe;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  isExcel: boolean;
  // globalFilter = new FormControl();
  orderNumFilter = new FormControl();
  poNumFilter = new FormControl();
  customerFilter = new FormControl();
  addressFilter = new FormControl();
  orderEAFilter = new FormControl();
  orderPriceFilter = new FormControl();
  orderStateFilter = new FormControl();
  orderMsgFilter = new FormControl();
  orderDateFilter = new FormControl();
  // deliveryFilter = new FormControl();


  public destroyed = new Subject<any>();

  public displayedColumns = ['orderNo', 'custPono', 'soldTo', 'shipAddr', 'orderDt', 'totalQty', 'totalAm', 'confirmYN'];
  public displayedColumnss = ['orderNo', 'custPono', 'shipAddr', 'orderDt', 'totalQty', 'totalAm', 'confirmYN', 'remark'];

  // public filteredValues = { orderNo: '', custPono: '', soldTo: '', orderDt: '', totalQty: '', totalAm: '', confirmYN: '', remark: '', global: '' };

  public displayedColumns2 = ['edpNo', 'edpNm', 'standard', 'orderAm', 'orderQty'];

  public filteredValues = { orderNo: '', custPono: '', soldTo: '', shipAddr:'', soldName:'', orderDt: '', totalQty: '', totalAm: '', confirmYN: '', remark: '', global: '' };

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private httpClientService: HttpClientService,
    public _componentPageTitle: ComponentPageTitle,
    private dateAdapter: DateAdapter<Date>,
    private translateService: TranslateService) {
    this.isExcel = false;
    this.startDate.setDate(this.currentDate.getDate() - 7);

    this.sDate = this.getFormatDate(this.startDate);
    this.eDate = this.getFormatDate(this.currentDate);

    this.filterForm.get('toDate').setValue(this.currentDate);
    this.filterForm.get('fromDate').setValue(this.startDate);

    this.dateAdapter.setLocale(this.language == 'en' ? 'fr' : this.language);
  }

  getFormatDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '' + month + '' + day;
  }

  getFormatDate2(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }

  focusOutDate() {
    if (this.filterForm.get('fromDate').value > this.filterForm.get('toDate').value) {
      this.filterForm.get('toDate').setValue(this.filterForm.get('fromDate').value)
    }
    this.sDate = this.getFormatDate(this.filterForm.get('fromDate').value)
    this.eDate = this.getFormatDate(this.filterForm.get('toDate').value)
    this.datePick();
  }
  focusOutDate2() {
    if (this.filterForm.get('fromDate').value < this.filterForm.get('toDate').value) {
      this.filterForm.get('toDate').setValue(this.filterForm.get('fromDate').value)
    }
    this.sDate = this.getFormatDate(this.filterForm.get('fromDate').value)
    this.eDate = this.getFormatDate(this.filterForm.get('toDate').value)
    this.datePick();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  datePick() {
    this.kunag = this.customer;

    this.httpClientService.getOrders(this.company, this.usrid, this.kunag, this.sDate, this.eDate).subscribe(
      data => {
        if (data != []) {
          data.forEach(element => {
            switch (element.cancelYN) {
              case 'Y':
                element.confirmYN = 'cancleY';
                break;
              default:
                if (element.confirmYN === 'N') {
                  element.confirmYN = 'confirmN';
                } else if (element.confirmYN === 'Y') {
                  element.confirmYN = 'confirmY';
                }
                break;
            }
            element.orderDt = element.orderDt + ' ' + element.orderTm
          });
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = this.customFilterPredicate();
          // this.filterglobal();
          this.filterorderNum();
          // this.filterdeliveryType();
          this.filterpoNum();
          this.filtercustomer();
          this.filteraddress();
          this.filterorderDate();
          this.filterorderEa();
          this.filterorderPrice();
          this.filterorderState();
          this.filterorderMsg();
        } else {
          this.translateService.get('noOrdesMsg').subscribe(
            value => {
              alert(value);
            }
          )
        }
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

  ngOnInit() {
    this._componentPageTitle.title = "orders"
    this.datePick();
  }

  async excelDownload(exporter, orderNo, orderDt): Promise<any> {
    this.isExcel = true;
    if (this.authority !== 'CUSTOMER') {
      this.displayedColumns2 = ['orderNo', 'orderDt', 'soldTo', 'shipToParty' , 'shipAddr', 'edpNo', 'edpNm', 'standard', 'orderAm', 'orderQty', 'remark', 'sapOrderNo'];
    } else {  
      this.displayedColumns2 = ['orderNo', 'orderDt',  'shipToParty', 'shipAddr', 'edpNo', 'edpNm', 'standard', 'orderAm', 'orderQty', 'remark', 'sapOrderNo'];
    }

    const obj: any = await this.excelDownload2();
    if (obj.txt == 'OK') {  
      exporter.exportTable('xlsx', { fileName: 'YG' + orderNo + '(' + orderDt + ')' })
      this.displayedColumns2 = ['edpNo', 'edpNm', 'standard', 'orderAm', 'orderQty'];
      this.isExcel = false;
    }
  }

  excelDownload2(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ txt: 'OK' });
      }, 2000);
    });
  }

  // filterglobal() {
  //   this.globalFilter.valueChanges.subscribe((globalFilterValue) => {
  //     this.filteredValues['global'] = globalFilterValue;
  //     this.dataSource.filter = JSON.stringify(this.filteredValues);
  //   });
  // }
  filterorderNum() {
    this.orderNumFilter.valueChanges.subscribe((orderNumFilterValue) => {
      this.filteredValues['orderNo'] = orderNumFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }


  // filterdeliveryType() {
  //   this.deliveryFilter.valueChanges.subscribe((deliveryFilterValue) => {

  //     if(isNullOrUndefined(deliveryFilterValue)){
  //       deliveryFilterValue = "UNDEFIND"

  //     }

  //     this.filteredValues['deliveryType'] = deliveryFilterValue;
  //     this.dataSource.filter = JSON.stringify(this.filteredValues);
  //   });
  // }

  filterpoNum() {
    this.poNumFilter.valueChanges.subscribe((poNumFilterValue) => {
      this.filteredValues['custPono'] = poNumFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }
  filtercustomer() {
    this.customerFilter.valueChanges.subscribe((customerFilterValue) => {
      this.filteredValues['soldTo'] = customerFilterValue;
      this.filteredValues['soldName'] = customerFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }

  filteraddress() {
    this.addressFilter.valueChanges.subscribe((addressFilterValue) => {
      this.filteredValues['shipAddr'] = addressFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }

  filterorderDate() {
    this.orderDateFilter.valueChanges.subscribe((orderDateFilterValue) => {
      let orderDateFilterValue2
      if (orderDateFilterValue == null) {
        orderDateFilterValue2 = ''
      } else {
        orderDateFilterValue2 = this.getFormatDate2(orderDateFilterValue)
      }
      this.filteredValues['orderDt'] = orderDateFilterValue2;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }
  filterorderEa() {
    this.orderEAFilter.valueChanges.subscribe((orderEAFilterValue) => {
      this.filteredValues['totalQty'] = orderEAFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }
  filterorderPrice() {
    this.orderPriceFilter.valueChanges.subscribe((orderPriceFilterValue) => {
      this.filteredValues['totalAm'] = orderPriceFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }
  filterorderState() {
    this.orderStateFilter.valueChanges.subscribe((orderStateFilterValue) => {
      this.filteredValues['confirmYN'] = orderStateFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }
  filterorderMsg() {
    this.orderMsgFilter.valueChanges.subscribe((orderMsgFilterValue) => {
      this.filteredValues['remark'] = orderMsgFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  customFilterPredicate(): (data: PeriodicElement, filter: string) => boolean {
    let myFilterPredicate = function (data, filter): boolean {
      let searchString = JSON.parse(filter)
      // var globalMatch = !searchString.global;

      // if (searchString.global) {
      //   globalMatch = data.orderNo.toString().trim().indexOf(searchString.global) !== -1 ||
      //     data.soldTo.toString().trim().indexOf(searchString.global) !== -1 ||
      //     data.totalQty.toString().trim().indexOf(searchString.global) !== -1 ||
      //     data.totalAm.toString().trim().indexOf(searchString.global) !== -1 ||
      //     data.confirmYN.toString().trim().indexOf(searchString.global) !== -1 ||
      //     data.remark.toString().trim().indexOf(searchString.global) !== -1;
      // }

      // if (!globalMatch) {
      //   return;
      // }
      let numFound = data.orderNo.toString().trim().indexOf(searchString.orderNo) !== -1
      // let deliveryTypeFound =  data.deliveryType.toString().trim().indexOf(searchString.deliveryType) !== -1
      let poFound = data.custPono.toString().trim().indexOf(searchString.custPono) !== -1
      let custFound = data.soldTo.toString().trim().indexOf(searchString.soldTo) !== -1 || 
      data.soldToParty.toString().trim().indexOf(searchString.soldName.toUpperCase()) !== -1
      let addrFound = data.shipName.toString().trim().indexOf(searchString.shipAddr) !== -1
      let dateFound = data.orderDt.toString().trim().indexOf(searchString.orderDt) !== -1
      let eaFound = data.totalQty.toString().trim().indexOf(searchString.totalQty) !== -1
      let priceFound = data.totalAm.toString().trim().indexOf(searchString.totalAm) !== -1
      let stateFound = data.confirmYN.toString().trim().indexOf(searchString.confirmYN) !== -1
      let msgFound = data.remark.toString().trim().indexOf(searchString.remark) !== -1

      // return numFound && deliveryTypeFound && poFound &&custFound && dateFound && eaFound && priceFound && stateFound && msgFound
      return numFound && poFound && custFound && addrFound && dateFound && eaFound && priceFound && stateFound && msgFound
    }
    return myFilterPredicate;
  }
}



@NgModule({
  imports: [
    SharedTranslateModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTableExporterModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  exports: [ComponentOrderinqList],
  declarations: [ComponentOrderinqList, DateProxyPipe],
  providers: [ComponentPageTitle, HttpClientService],
})
export class ComponentOrderinqListModule { }