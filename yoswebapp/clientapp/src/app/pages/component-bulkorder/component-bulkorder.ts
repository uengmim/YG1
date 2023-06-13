import { Component, NgModule, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { HttpClientService } from 'src/app/service/http-client.service';
import { MatButtonModule, MatDialog, MatDialogModule, MatDialogRef, MatIconModule, MatProgressSpinnerModule, MatTableDataSource, MatTableModule, MAT_DIALOG_DATA } from '@angular/material';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';

import * as XLSX from 'xlsx';
import { ProductList } from 'src/app/model/ProductList';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ClassField } from '@angular/compiler';
import { TranslateService } from '@ngx-translate/core';
import { GetProducts } from 'src/app/model/GetProgucts';
import { NumberValueAccessor } from '@angular/forms';

import { CartService } from 'src/app/service/cart.service';
import { CartList } from 'src/app/model/CartList';
import { MatTableExporterModule, XLSX_COLS } from 'mat-table-exporter';
import { Inject } from '@angular/core';



type AOA = any[];
export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}
@Component({
  selector: 'app-component-bulkorder',
  templateUrl: './component-bulkorder.html',
  styleUrls: ['./component-bulkorder.scss']
})
export class ComponentBulkorder implements OnInit {
  @Input() text = 'Upload';
  @ViewChild('xlsxReader', { static: false })
  xlsxReader: ElementRef;

  getProducts: GetProducts = new GetProducts;
  userid = sessionStorage.getItem('username');
  language = sessionStorage.getItem('language');
  company = sessionStorage.getItem('company');
  customer = sessionStorage.getItem('customer');

  //xlsx reader
  data: AOA = [];
  record: ProductList;
  records: any[] = [];
  xlsxCode: any[] = [];
  xlsxCount: any[] = [];
  xlsxOnlyCode: Map<string, string> = new Map();
  private files: Array<FileUploadModel> = [];



  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      if (fileUpload.files.length !== 1) throw new Error('Cannot use multiple files');
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true
        });
      }
      this.uploadFiles();
      this.files = new Array<FileUploadModel>();
    };
    fileUpload.click();
  }

  private uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';
    this.files.forEach(file => {
      this.onFileChange(file);
    });
  }


  onFileChange(files: FileUploadModel) {


    if (this.isValidXlsxOrCsvFile(files.data.name)) {
      /* wire up file reader */

      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {

        var wb:XLSX.WorkBook;

        if(this.isValidXLSXFile(files.data.name)){
        /* read workbook */
          const bstr: string = e.target.result;
          wb = XLSX.read(bstr, { type: 'binary' });
        }
        else if(this.isValidCSVFile(files.data.name)){
          var csvString: string = e.target.result;
          csvString = "Material_Code;Quantity" + "\n" +  csvString.trim();
          csvString = csvString.replace(/\r/gi,"");
          var arrayOfArrayCsv = csvString.split("\n").map((row: string) => {
             return row.split(";")
          });
      

          wb = XLSX.utils.book_new(); //XLSX WORKBOOK
          var newWs = XLSX.utils.aoa_to_sheet(arrayOfArrayCsv);
          
          XLSX.utils.book_append_sheet(wb, newWs,"MessOrder");
         
          var sheets = wb.Sheets[0];
          const range = XLSX.utils.decode_range(sheets['!ref']);
          const R :number = range.e.r;


          for(let C = range.s.c; C <= range.e.c; ++C) {
            const cell: XLSX.CellObject = sheets[XLSX.utils.encode_cell({c:C, r:R})];
            
            //if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);
            //headers.push(hdr);
          }
        }

        


        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        let islessCnt = false;

        /* save data */
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws));
        this.data.forEach(element => {
          if (typeof (element.Material_Code) === 'string' || typeof (element.Material_Code) === 'number') {
            if (element.Quantity > 0) {
              this.xlsxCount.push(element.Quantity)
              this.xlsxCode.push(element.Material_Code + "/" + element.Quantity)
              this.xlsxOnlyCode.set(element.Material_Code, element.Quantity)
            } else {
              islessCnt = true
              this.translateService.get('errMissing').subscribe(
                value => {
                  let msg = value as string;
                  alert(msg.replace("*temp", element.Material_Code));
                }
              )
              this.xlsxCode = []
            }
          }
        })
        this.getProducts.userid = this.userid;
        this.getProducts.lang = this.language.toUpperCase();
        this.getProducts.comp = this.company;
        this.getProducts.cust = this.customer;
        this.getProducts.aclass = "";
        this.getProducts.bclass = "";
        this.getProducts.cclass = "";
        this.getProducts.condm = this.xlsxCode;

        if (islessCnt)
          return

        this.httpClientService.getProducts(this.getProducts, "NOMAL").subscribe(
          Response => {
            let keys = Array.from(this.xlsxOnlyCode.keys())
            let temp: ProductList[] = [];
            keys.forEach((key, index) => {
              var target = Response.find((resp) => resp.edp == key);
              if (target) {
                temp.push(target);
                //Response.splice(index,1,target);
              }
            });
            if (temp.length == Response.length) { // 여기까지가 Mass Order 사용자 엑셀 정렬
              Response = temp;
            }
            else { // 혹시모르니까 달아둔다. (똑같은 개념인데 가끔 틀어진다고함)
              Response.sort(function (a, b) {
                if (keys.indexOf(a.edp) > keys.indexOf(b.edp)) {
                  return 1;
                }
                if (keys.indexOf(a.edp) < keys.indexOf(b.edp)) {
                  return -1;
                }
                return 0;
              });
            }

            var errorCode: errorData[] = new Array();

            Response.forEach(element => {

              var record = new ProductList;
              record = element;
              // this.record = new ProductList;
              // this.record = element;
              // // this.record.edp = element.edp;
              // this.record.product = element.product;
              // this.record.price = element.price; // 일단추가 
              // this.record.standard = element.standard // 일단 추가
              // this.record.netprice = element.netprice;
              // this.record.currency = element.currency;
              // this.record.quantity = element.quantity;
              // this.record.
              this.data.forEach(element2 => {
                if (element2.Material_Code == element.edp) {

                  // // 수정 - AMAK - 포장수량 이하 수량 
                  // if (element.packing > element2.Quantity) {
                  //   islessCnt = true;
                  //   errorCode.push({edpNo : element2.Material_Code, pkUnit : element.packing})
                  // }
                  //  // 주문수량 → 포장 수량 배수로 처리
                  // else if (element2.Quantity % Number.parseInt(element.packing) != 0) {
                  //   islessCnt = true;
                  //   errorCode.push({edpNo : element2.Material_Code, pkUnit : element.packing})
                  // }

                  var orginPacking = Number.parseInt(element.packing);
                  var overCntByPacking = element2.Quantity % orginPacking;
                  if (overCntByPacking != 0) {
                    islessCnt = true;
                    errorCode.push({ edpNo: element2.Material_Code, pkUnit: element.packing })
                    element2.Quantity = element2.Quantity + (orginPacking - overCntByPacking);
                  }
                  record.cart = element2.Quantity;
                }
              })
              this.records.push(record);
            })
            switch (islessCnt) {
              case true:
                if (errorCode.length > 0) {
                  const dialogRef = this.dialog.open(ErrorListDialog2,
                    {
                      width: '25vw',
                      data: { data: errorCode, msg: 'notMatchItem' }
                    });

                  dialogRef.afterClosed().subscribe(result => {
                    if (result == 'OK') {
                      this.sendXLSX(this.records);
                    }

                    else {
                      this.records = [];
                      this.xlsxCode = [];
                      this.xlsxOnlyCode = new Map();
                    }

                    islessCnt = false;
                  });
                }

                // this.records = [];
                // this.xlsxCode = [];
                // this.xlsxOnlyCode = new Map();
                // islessCnt = false;
                break;
              case false:
                this.sendXLSX(this.records);
                break;
            }
          },
          error => {
            var duplicate: string[] = []
            this.records = []
            this.xlsxCode = []
            if (error.error.message.includes('is not exist')) {
              let material = error.error.message.replace(" is not exist", "") as string
              let keys = Array.from(this.xlsxOnlyCode.keys()).filter(x => !material.split(",").includes(x.toString().toUpperCase()));
              keys.forEach(k => duplicate.push(k + "/" + this.xlsxOnlyCode.get(k).toString()))
              const dialogRef = this.dialog.open(ErrorListDialog,
                {
                  width: '25vw',
                  data: material
                });
              dialogRef.afterClosed().subscribe(result => {
                if (result == 'CONTINUE') {
                  if (duplicate.length > 0) {
                    this.getProducts.condm = duplicate;
                    this.httpClientService.getProducts(this.getProducts, "NOMAL").subscribe(
                      Response => {
                        let keysArr = Array.from(this.xlsxOnlyCode.keys())
                        let temp: ProductList[] = [];
                        keys.forEach((key, index) => {
                          var target = Response.find((resp) => resp.edp == key);
                          if (target) {
                            temp.push(target);
                            //Response.splice(index,1,target);
                          }
                        });
                        if (temp.length == Response.length) { // 여기까지가 Mass Order 사용자 엑셀 정렬
                          Response = temp;
                        }
                        else { // 혹시모르니까 달아둔다. (똑같은 개념인데 가끔 틀어진다고함)
                          Response.sort(function (a, b) {
                            if (keysArr.indexOf(a.edp) > keysArr.indexOf(b.edp)) {
                              return 1;
                            }
                            if (keysArr.indexOf(a.edp) < keysArr.indexOf(b.edp)) {
                              return -1;
                            }
                            return 0;
                          });
                        }

                        var errorCode: errorData[] = new Array();
                        Response.forEach(element => {

                          var record = new ProductList;
                          record = element;
                          // this.record = new ProductList;
                          // this.record.edp = element.edp;
                          // this.record.product = element.product;
                          // this.record.price = element.price; // 일단추가 
                          // this.record.standard = element.standard // 일단 추가
                          // this.record.netprice = element.netprice;
                          // this.record.currency = element.currency;
                          // this.record.quantity = element.quantity;
                          this.data.forEach(element2 => {
                            if (element2.Material_Code == element.edp) {

                              // // 수정 - AMAK - 포장수량 이하 수량 
                              // if (element.packing > element2.Quantity) {
                              //   islessCnt = true;
                              //   errorCode.push({edpNo : element2.Material_Code, pkUnit : element.packing})
                              // }
                              //  // 주문수량 → 포장 수량 배수로 처리
                              // else if (element2.Quantity % Number.parseInt(element.packing) != 0) {
                              //   islessCnt = true;
                              //   errorCode.push({edpNo : element2.Material_Code, pkUnit : element.packing})
                              // }
                              // this.record.cart = element2.Quantity;

                              var orginPacking = Number.parseInt(element.packing);
                              var overCntByPacking = element2.Quantity % orginPacking;
                              if (overCntByPacking != 0) {
                                islessCnt = true;
                                errorCode.push({ edpNo: element2.Material_Code, pkUnit: element.packing })
                                element2.Quantity = element2.Quantity + (orginPacking - overCntByPacking);
                              }
                              record.cart = element2.Quantity;
                            }
                          })
                          this.records.push(record);
                        })
                        switch (islessCnt) {
                          case true:
                            if (errorCode.length > 0) {
                              // this.dialog.open(ErrorListDialog2,
                              //   {
                              //     width: '25vw',
                              //     data: {data : errorCode, msg: 'notMatchItem'}
                              //   });
                              // this.records = [];
                              // this.xlsxCode = [];
                              // this.xlsxOnlyCode = new Map();
                              // islessCnt = false;

                              const dialogRef = this.dialog.open(ErrorListDialog2,
                              {
                                width: '25vw',
                                data: { data: errorCode, msg: 'notMatchItem' }
                              });

                              dialogRef.afterClosed().subscribe(result => {
                                if (result == 'OK') {
                                  this.sendXLSX(this.records);
                                }
                                else {
                                  this.records = [];
                                  this.xlsxCode = [];
                                  this.xlsxOnlyCode = new Map();
                                }
                                islessCnt = false;
                              });
                            }
                            break;
                          case false:
                            this.sendXLSX(this.records);
                            break;
                        }
                      },
                      error => {
                        this.xlsxOnlyCode = new Map();
                        this.translateService.get('errReadfile').subscribe(
                          value => {
                            alert(value + "(" + error.error.message + ")");
                          }
                        )
                      })
                  }
                }
              })
            } else {
              
              this.translateService.get('errReadfile').subscribe(
                value => {
                  alert(value);
                }
              )
            }
          })
      };
      reader.readAsBinaryString(files.data);
    } 
    else {
      this.translateService.get('errXlsx').subscribe(
        value => {
          alert(value);
        }
      )
      this.xlsxReader.nativeElement.value = '';
    }
  }

  isValidXLSXFile(file: any) {
    return file.endsWith(".xlsx");
  }
  
  isValidCSVFile(file: any) {
    return file.endsWith(".csv");
  }


  isValidXlsxOrCsvFile(file: any) {
    return file.endsWith(".csv") || file.endsWith(".xlsx");
  }


  // 구버전 (바로 오더 폼이동)
  // sendXLSX(records): void {
  //   this.router.navigate(['orderform'], { queryParams: { carts: JSON.stringify(records) }, skipLocationChange: true })
  // }

  // cart 로 이동
  sendXLSX(records: ProductList[]) {
    let userid = sessionStorage.getItem('username');
    this.httpClientService.CartListUpdateBymOrder(userid, records).subscribe(
      resultMSG => {
        this.cartService.sendChange(userid);
        //this.router.navigate(['cart']);
        this.router.navigate(['cart'], { queryParams: { carts: JSON.stringify(records) }, skipLocationChange: true }) //  skipLocationChange: true
      },
      error => {
        this.translateService.get('serverErrorMsg').subscribe(
          value => {
            alert(value);
          }
        )
      }
    );
  }

  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
    public _componentPageTitle: ComponentPageTitle,
    private translateService: TranslateService,
    public dialog: MatDialog,
    private cartService: CartService) { }

  ngOnInit() {
    // title on topbar navigation
    this._componentPageTitle.title = "bulkOrder"
  }



  // //  //csv reader
  // uploadListener($event: any): void {  

  //   let text = [];  
  //   let files = $event.srcElement.files;  

  //   if (this.isValidCSVFile(files[0])) {  

  //     let input = $event.target;  
  //     let reader = new FileReader();  
  //     reader.readAsText(input.files[0]);  

  //     reader.onload = () => {  
  //       let csvData = reader.result;  
  //       let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  

  //       let headersRow = this.getHeaderArray(csvRecordsArray);  

  //       this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  

  //       console.log(this.records)
  //     };  

  //     reader.onerror = function () {  
  //       console.log('error is occured while reading file!');  
  //     };  

  //   } else {  
  //     alert("Please import valid .csv file.");  
  //     this.fileReset();  
  //   }  
  // } 

  // isValidCSVFile(file: any) {  
  //   return file.name.endsWith(".csv");  
  // }  

  // getHeaderArray(csvRecordsArr: any) {  
  //   let headers = (<string>csvRecordsArr[0]).split(',');  
  //   let headerArray = [];  
  //   for (let j = 0; j < headers.length; j++) {  
  //     headerArray.push(headers[j]);  
  //   }  
  //   console.log(headerArray)
  //   return headerArray;  
  // }  

  // getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
  //   let csvArr = [];  

  //   for (let i = 1; i < csvRecordsArray.length; i++) {
  //     let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
  //     if (curruntRecord.length == headerLength) {  
  //       csvArr.push({CartEDP: curruntRecord[0].trim(), CartCount: curruntRecord[1].trim()});  
  //       console.log(csvArr)
  //     }  
  //   }  
  //   // const options = {queryParams: {carts: JSON.stringify(csvArr)}, skipLocationChange: false}
  //   // console.log(options)
  //   return csvArr;  
  // }  

  // fileReset() {  
  //   this.records = [];  
  // }  

  // sendCSV(): void {
  //   console.log(this.records);
  //   this.router.navigate(['orderform'], {queryParams: {carts: JSON.stringify(this.records)}, skipLocationChange: true})
  // }

}

//대리주문 - UNIT PRICE 0일 경우
@Component({
  selector: 'component-bulkorder-error-dialog',
  templateUrl: 'component-bulkorder-error-dialog.html',
  styleUrls: ['./component-bulkorder.scss']
})
export class ErrorListDialog {
  dataSource = new MatTableDataSource
  displayedColumns = ['EdpNo']
  errorMsg: string
  isExcel: boolean

  constructor(public dialog: MatDialogRef<ErrorListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private translateService: TranslateService,) {
    this.translateService.get('errNotExist').subscribe(
      value => {
        let msg = value as string
        this.errorMsg = msg.replace("*temp", data.replace(/,/gi, ',\n'))
      }
    )
    this.isExcel = false
    this.dataSource = new MatTableDataSource<any>(this.data.split(","))
  }
  onDialogContinue(): void {
    this.dialog.close("CONTINUE");
  }

  onDialogCancel(): void {
    this.dialog.close("CANCEL");
  }

  async excelDownload(exporter): Promise<any> {
    this.isExcel = true;

    const obj: any = await this.excelDownload2();
    if (obj.txt == 'OK') {
      exporter.exportTable('xlsx', { fileName: 'YG1_ErrorList' })
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
}


export interface errorData {
  edpNo: string;
  pkUnit: string;
}

@Component({
  selector: 'component-bulkorder-error-dialog2',
  templateUrl: 'component-bulkorder-error-dialog2.html',
  styleUrls: ['./component-bulkorder.scss']
})
export class ErrorListDialog2 {
  dataSource = new MatTableDataSource
  displayedColumns = ['EdpNo', 'PkUnit']
  keys: string
  errorMsg: string
  isExcel: boolean

  constructor(public dialog: MatDialogRef<ErrorListDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translateService: TranslateService,) {
    this.translateService.get(data.msg).subscribe(
      value => {
        let msg = value as string
        data.data.forEach(f => {
          let name = f.edpNo.concat("(" + f.pkUnit + ")")
          if (data.data.indexOf(f) == 0)
            this.keys = name
          else
            this.keys = this.keys.concat(",\n" + name)
        });
        this.errorMsg = msg.replace("*temp", this.keys)
      }
    )
    this.isExcel = false
    this.dataSource = new MatTableDataSource(data.data)
  }

  onDialogCancel(): void {
    this.dialog.close("CANCEL");
  }

  onDialogOk(): void {
    this.dialog.close("OK");
  }

  async excelDownload(exporter): Promise<any> {
    this.isExcel = true;

    const obj: any = await this.excelDownload2();
    if (obj.txt == 'OK') {
      exporter.exportTable('xlsx', { fileName: 'YG1_ErrorList' })
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
}



@NgModule({
  imports: [
    SharedTranslateModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatTableExporterModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    ComponentBulkorder,
    ErrorListDialog,
    ErrorListDialog2
  ],
  exports: [ComponentBulkorder],
  declarations: [ComponentBulkorder, ErrorListDialog, ErrorListDialog2],
  providers: [ComponentPageTitle, HttpClientService],
})
export class ComponentBulkorderMoudle { }