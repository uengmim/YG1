import { Component, NgModule, OnInit, ViewChild, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatCheckboxModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatTableDataSource, MatTable, MatButtonModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatRadioModule } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';
import { destination } from 'src/app/model/Destination';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';

export interface PeriodicElement {
  CartProduct: String;
  CartEDP: String;
  CartPrice: number;
  CartCount: number;
}


@Component({
  selector: 'app-component-order',
  templateUrl: './component-order.html',
  styleUrls: ['./component-order.scss']
})
export class ComponentOrder implements OnInit {
  displayedColumns: string[] = ['select', 'edpNo', 'name', 'price', 'orderEa', 'sum'];
  dataSource;
  data: any;
  destinations: destination[];


  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private httpClientService: HttpClientService,
    public _componentPageTitle: ComponentPageTitle,
    public dialog: MatDialog) { }


  ngOnInit() {
    // title on topbar navigation
    this._componentPageTitle.title = "orderForm"
    this.route.queryParams.subscribe(params => {
      console.log(params)
      if (params.carts) {
        this.data =JSON.parse(params.carts);
      } else if (params) {
        this.data = [params];
      }
    });

    console.log(this.route.queryParamMap)
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);
  
    this.httpClientService.getDestination(sessionStorage.getItem('username')).subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response: destination[]) {
    this.destinations = response;
  }

  getTotalSum() {
    return this.dataSource.data.map(t => t.CartPrice * t.CartCount).reduce((acc, value) => acc + value, 0);
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
    this.selection = new SelectionModel<PeriodicElement>(true, []);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  openDestinationDialog(): void {
    const destinationDialog = this.dialog.open(OrderDestinationDialog,
      {
        width: '300px',
        data: this.destinations
      });

    destinationDialog.afterClosed().subscribe(result => {
      this.httpClientService.getDestination(sessionStorage.getItem('username')).subscribe(
        response => this.handleSuccessfulResponse(response));
    })
  }

  backPage() {
    this._location.back();
  }
}

@Component({
  selector: 'component-order-destination-dialog',
  templateUrl: 'component-order-destination-dialog.html',
})
export class OrderDestinationDialog implements OnInit {
  formGroup: FormGroup;
  destination: destination;
  invalidRegister = false
  destinations: any;

  selection = new SelectionModel<destination>(true, []);

  constructor(
    private fb: FormBuilder,
    public destinationDialog: MatDialogRef<OrderDestinationDialog>,
    private httpClientService: HttpClientService,
    @Inject(MAT_DIALOG_DATA) public data: destination[],
  ) {
    this.destination = new destination()
  }

  public async ngOnInit(): Promise<void> {
    //배송지 데이터 호출
    this.formGroup = this.fb.group({
      address: ['']
    });
  }

  removeSelectedRows() {
    this.httpClientService.removeDestinations(this.selection.selected).subscribe(
      data => {
        alert('SUCCESS');
        this.invalidRegister = false
        this.selection.selected.forEach(item => {
          let index: number = this.data.indexOf(item);
          this.data.splice(index, 1)
        });
        this.selection = new SelectionModel<destination>(true, []);
      },
      error => {
        alert('FAIL');
        this.invalidRegister = true
      }
    )
  }

  registerDestination(): void {
    this.destination.username = sessionStorage.getItem('username');
    this.destination.address = this.formGroup.value.address;
    (this.httpClientService.registerDestination(this.destination).subscribe(
      data => {
        alert('SUCCESS');
        this.destinationDialog.close()
        this.invalidRegister = false
      },
      error => {
        alert('FAIL');
        this.invalidRegister = true
      }
    )
    );
  }

  onDialogCancle(): void {
    this.destinationDialog.close()
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
    ReactiveFormsModule
  ],
  entryComponents: [
    ComponentOrder,
    OrderDestinationDialog
  ],
  exports: [ComponentOrder],
  declarations: [ComponentOrder, OrderDestinationDialog],
  providers: [ComponentPageTitle, HttpClientService],
})
export class ComponentOrderMoudle { }