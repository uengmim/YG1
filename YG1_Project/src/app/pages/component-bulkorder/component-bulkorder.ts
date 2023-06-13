import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { HttpClientService } from 'src/app/service/http-client.service';
import { CartList } from 'src/app/model/CartList';
import { MatButtonModule } from '@angular/material';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';

import * as XLSX from 'xlsx';

type AOA = any[];
@Component({
  selector: 'app-component-bulkorder',
  templateUrl: './component-bulkorder.html',
  styleUrls: ['./component-bulkorder.scss']
})
export class ComponentBulkorder implements OnInit {

  public records: any; 
  public records2: any; 


   //csv reader
  uploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  

        console.log(this.records)
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  } 

  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  

  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    console.log(headerArray)
    return headerArray;  
  }  

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        csvArr.push({CartEDP: curruntRecord[0].trim(), CartCount: curruntRecord[1].trim()});  
        console.log(csvArr)
      }  
    }  
    const options = {queryParams: {carts: JSON.stringify(csvArr)}, skipLocationChange: true}
    console.log(options)
    return options;  
  }  

  fileReset() {  
    this.records = [];  
  }  

  sendCSV(): void {
    console.log(this.records);
    this.router.navigate(['orderform'], this.records)
  }

  //xlsx reader
  data: AOA = [];

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws));
      console.log(this.data);
      this.records2 = {queryParams: {carts: JSON.stringify(this.data)}, skipLocationChange: true}
      console.log(this.records2)
    };
    reader.readAsBinaryString(target.files[0]);
  }

  sendXLSX(): void {
    console.log(this.records2);
    this.router.navigate(['orderform'], this.records2)
  }

  


  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
    public _componentPageTitle: ComponentPageTitle) { }


  ngOnInit() {
    // title on topbar navigation
    this._componentPageTitle.title = "bulkOrder"
  }
}


@NgModule({
  imports: [
    SharedTranslateModule,
    CommonModule,
    MatButtonModule
  ],
  entryComponents: [
    ComponentBulkorder,
  ],
  exports: [ComponentBulkorder],
  declarations: [ComponentBulkorder],
  providers: [ComponentPageTitle, HttpClientService],
})
export class ComponentBulkorderMoudle { }