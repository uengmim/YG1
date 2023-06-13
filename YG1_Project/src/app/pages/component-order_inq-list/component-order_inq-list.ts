import { Component, NgModule, OnInit, ViewChild, Inject } from '@angular/core';


import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { MatTableModule, MatTableDataSource, MatSort, MatIconModule, MatButtonModule, MatSnackBar, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSortModule } from '@angular/material'
import { MatTableExporterModule } from 'mat-table-exporter';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from 'src/app/service/search.service';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';

export interface PeriodicElement2 {
  edpNo: string;
  itemNo: string;
  productName: string;
  size: string;
  msg: string;
  orderPrice: string;
  orderEA: string;
  exportPrice: string;
  exportEA: string;
}

export interface PeriodicElement {
  orderNum: string;
  orderDate: string;
  orderTime: string;
  orderEA: string;
  orderPrice: string;
  orderState: string;
  orderMsg: string;
  children: PeriodicElement2[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    orderNum: '201911060082', orderDate: '2019-11-6', orderTime: '오전 11:36:27', orderEA: '50', orderPrice: '2,179,000', orderState: '수주승인', orderMsg: 'TEST건입니다 처리하지말아주세요',
    children: [{ edpNo: 'DPPA00914 ', itemNo: '', productName: 'PANG PANG SHT(ALCRN)', size: '1.45X3X7X42', msg: '(930810)', orderPrice: '166,000 ', orderEA: '10', exportPrice: '0', exportEA: '0' },
    { edpNo: 'DPPA00914 ', itemNo: '', productName: 'PANG PANG SHT(ALCRN)', size: '1.45X3X7X42', msg: '(930810)', orderPrice: '166,000 ', orderEA: '10', exportPrice: '0', exportEA: '0' }
    ]
  },
  {
    orderNum: '201910220071', orderDate: '2019-11-20', orderTime: '오후 12:13:04	', orderEA: '7', orderPrice: '34,780', orderState: '취소완료', orderMsg: 'TEST SAP 반영하지 말것',
    children: [{ edpNo: '22000081', itemNo: '', productName: 'CCGT09T304-AL-YG10/CCGT32.51-AL', size: '', msg: '', orderPrice: '4,680', orderEA: '1', exportPrice: '0', exportEA: '0' },
    { edpNo: '22000091', itemNo: '', productName: 'DNMA150608-YG1001/DNMA442', size: '', msg: '', orderPrice: '5,450', orderEA: '1', exportPrice: '0', exportEA: '0' },
    { edpNo: '22000092', itemNo: '', productName: 'DNMA150612-YG1001/DNMA443', size: '', msg: '', orderPrice: '5,450', orderEA: '1', exportPrice: '0', exportEA: '0' },
    { edpNo: '22000573', itemNo: '', productName: 'DNMA150408-YG1001/DNMA432', size: '', msg: '', orderPrice: '4,800', orderEA: '1', exportPrice: '0', exportEA: '0' },
    { edpNo: '22000574', itemNo: '', productName: 'DNMA150408-YG3010/DNMA432', size: '', msg: '', orderPrice: '4,800', orderEA: '1', exportPrice: '0', exportEA: '0' },
    { edpNo: '22000575', itemNo: '', productName: 'DNMA150412-YG1001/DNMA433', size: '', msg: '', orderPrice: '4,800', orderEA: '1', exportPrice: '0', exportEA: '0' },
    { edpNo: '22000576', itemNo: '', productName: 'DNMA150412-YG3010/DNMA433', size: '', msg: '', orderPrice: '4,800', orderEA: '1', exportPrice: '0', exportEA: '0' }
    ]
  }
];


@Component({
  selector: 'app-component-order_inq-list',
  templateUrl: './component-order_inq-list.html',
  styleUrls: ['./component-order_inq-list.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ComponentOrderinqList implements OnInit {
  pipe: DatePipe;
  globalFilter = new FormControl();
  orderNumFilter = new FormControl();
  orderEAFilter = new FormControl();
  orderPriceFilter = new FormControl();
  orderStateFilter = new FormControl();
  orderMsgFilter = new FormControl();
  orderDateFilter = new FormControl();

  public displayedColumns = ['orderNum', 'orderDate', 'orderEA', 'orderPrice', 'orderState', 'orderMsg'];
  public displayedColumns2 = ['edpNo', 'itemNo', 'productName', 'size', 'msg', 'orderPrice', 'orderEA', 'exportPrice', 'exportEA'];
  public filteredValues = { orderNum: '', orderDate: '', orderEA: '', orderPrice: '', orderState: '', orderMsg: '', global: '' };
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // filterForm = new FormGroup({
  //   fromDate: new FormControl(),
  //   toDate: new FormControl(),
  // });

  // get fromDate() { return this.filterForm.get('fromDate').value; }
  // get toDate() { return this.filterForm.get('toDate').value; }

  constructor(private httpClientService: HttpClientService,
    public _componentPageTitle: ComponentPageTitle,
    private _snackBar: MatSnackBar,
    private searchService: SearchService) {
      

    this.searchService.listenOrderFrom().subscribe((m: any) => {
      this.searchService.listenOrderTo().subscribe((m2: any) => {
        this.dataSource.filterPredicate = (data, filter) => {
          console.log(m)
          console.log(m2)
          return new Date(data.orderDate) >= m && new Date(data.orderDate) <= m2;
        }
      })
    })

    this.searchService.listenDateBtn().subscribe((m: any) => {
      console.log(m);
      this.onDateBtn(m);
    })
  }

  // onOrderDate(filterValue: string, filterValue2: string) {
  //   this.filteredValues['orderDate'] = filterValue;
  //   this.filteredValues['orderDate'] = filterValue2;

  //   this.dataSource.filterPredicate = (data, filter) => {
  //     if (filterValue && filterValue2) {
  //       console.log(filterValue)
  //       console.log(filterValue2)
  //       return data.orderDate >= filterValue && data.orderDate <= filterValue2;
  //     }
  //   }
  // }

  onDateBtn(event: Event) {
    this.dataSource.filter = '' + Math.random()
  }

  // openSnackBar(message: string) {
  //   this._snackBar.open(message, '확인', {
  //     duration: 2000,
  //   });
  // }


  ngOnInit() {
    // title on topbar navigation
    console.log(this.dataSource)
    this._componentPageTitle.title = "orders"
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.customFilterPredicate();

    this.globalFilter.valueChanges.subscribe((globalFilterValue) => {
      this.filteredValues['global'] = globalFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.orderNumFilter.valueChanges.subscribe((orderNumFilterValue) => {
      this.filteredValues['orderNum'] = orderNumFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.orderDateFilter.valueChanges.subscribe((orderDateFilterValue) => {
      this.filteredValues['orderDate'] = orderDateFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.orderEAFilter.valueChanges.subscribe((orderEAFilterValue) => {
      this.filteredValues['orderEA'] = orderEAFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.orderPriceFilter.valueChanges.subscribe((orderPriceFilterValue) => {
      this.filteredValues['orderPrice'] = orderPriceFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.orderStateFilter.valueChanges.subscribe((orderStateFilterValue) => {
      this.filteredValues['orderState'] = orderStateFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.orderMsgFilter.valueChanges.subscribe((orderMsgFilterValue) => {
      this.filteredValues['orderMsg'] = orderMsgFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

  }



  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  customFilterPredicate() {
    const myFilterPredicate = function (data: PeriodicElement, filter: string): boolean {
      let searchString = JSON.parse(filter);
      var globalMatch = !searchString.global;

      if (searchString.global) {
        // search all text fields
        globalMatch = data.orderNum.toString().trim().indexOf(searchString.global) !== -1 ||
          data.orderDate.toString().trim().indexOf(searchString.global) !== -1 ||
          data.orderTime.toString().trim().indexOf(searchString.global) !== -1 ||
          data.orderEA.toString().trim().indexOf(searchString.global) !== -1 ||
          data.orderPrice.toString().trim().indexOf(searchString.global) !== -1 ||
          data.orderState.toString().trim().indexOf(searchString.global) !== -1 ||
          data.orderMsg.toString().trim().indexOf(searchString.global) !== -1;
      }

      if (!globalMatch) {
        return;
      }
      let numFound = data.orderNum.toString().trim().indexOf(searchString.orderNum) !== -1
      let dateFound = data.orderDate.toString().trim().indexOf(searchString.orderDate) !== -1
      let timeFound = data.orderTime.toString().trim().indexOf(searchString.orderDate) !== -1
      let eaFound = data.orderEA.toString().trim().indexOf(searchString.orderEA) !== -1
      let priceFound = data.orderPrice.toString().trim().indexOf(searchString.orderPrice) !== -1
      let stateFound = data.orderState.toString().trim().indexOf(searchString.orderState) !== -1
      let msgFound = data.orderMsg.toString().trim().indexOf(searchString.orderMsg) !== -1

      return numFound && (dateFound || timeFound) && eaFound && priceFound && stateFound && msgFound
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
    TableModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableExporterModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
  ],
  exports: [ComponentOrderinqList],
  declarations: [ComponentOrderinqList],
  providers: [ComponentPageTitle, HttpClientService, SearchService],
})
export class ComponentOrderinqListModule { }