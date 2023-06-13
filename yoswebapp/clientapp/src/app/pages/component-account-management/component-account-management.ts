import { Component, OnInit, NgModule, OnDestroy, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import {
  MatOptionModule, MatSelectModule, MatMenuModule, MatDialogRef, MAT_DIALOG_DATA,
  MatDialog, MatTableModule, MatTableDataSource, MatButtonModule, MatFormFieldModule, MatSort, Sort,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatPaginator, MatSortModule
} from '@angular/material'
import { MatTableExporterModule } from 'mat-table-exporter';
import { CommonModule } from '@angular/common';
import language from 'src/assets/i18n/language.json';
import { ComponentPageTitle } from '../page-title/page-title';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
import { MatSelectFilterModule } from 'mat-select-filter';
import { HttpClientService } from 'src/app/service/http-client.service';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';


export class USRManagemnet {
  usrno: any;
  usrpl: any;
  usrid: any;
  usrnm: any;
  usrla: any;
  usrpw: any;
  isCanSave: boolean;
  isChangePw: boolean;
  isChangeLa: boolean;
}


@Component({
  selector: 'app-component-account-management',
  templateUrl: './component-account-management.html',
  styleUrls: ['./component-account-management.scss']
})
export class ComponentAccountManagement implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public languageList: { name: string, code: string, image: string }[] = language;

  displayedColumns = ['usrno', 'usrpl', 'usrid', 'usrnm', 'usrla', 'isChangeLa', 'isChangePw', 'isCanSave','isDelete']


  datasource = new MatTableDataSource<USRManagemnet>();
  renderedData :USRManagemnet[];

  usrid = sessionStorage.getItem('username');
  auth = sessionStorage.getItem('authority');
  language = sessionStorage.getItem('language');
  company = sessionStorage.getItem('company');
  plant = sessionStorage.getItem('plant');
  customer = sessionStorage.getItem('customer');
  dccode = sessionStorage.getItem('dccode');


  constructor(public _componentPageTitle: ComponentPageTitle,
    public dialog: MatDialog,
    private httpClientService: HttpClientService,
    private loginservice: AuthenticationService,
    private translateService: TranslateService) { }

  ngOnInit() {

    this._componentPageTitle.title = "accountManagement";

    if (this.auth.toUpperCase() == 'MASTER' || this.auth.toUpperCase() == 'MANAGER') {
      this.httpClientService.getUserTable(this.company, this.plant).subscribe(
        data => {
          this.datasource = new MatTableDataSource(data);
          this.datasource.paginator = this.paginator;
          this.datasource.data.forEach(element => {
            element.isCanSave = true;
            element.isChangeLa = false;
            element.isChangePw = false;
            if (isNullOrUndefined(element.usrno) || element.usrno == "") element.usrno = "MANAGER";

          });

          this.datasource.sort = this.sort;
          this.datasource.connect().subscribe(data => this.renderedData = data);

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


  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  setCurrentLang(lang: string) {
    var targetLang = this.languageList.find(f => f.code == lang);
    if (isNullOrUndefined(targetLang)) return "UNDEFIND";
    else return targetLang.name;
  }

  Switchlang(lang: string, index: number) {
    var selectedLang = lang;
    if (this.renderedData[index].usrla != selectedLang) {
      this.renderedData[index].usrla = selectedLang;
      this.renderedData[index].isCanSave = false;
      this.renderedData[index].isChangeLa = true;
    }   
  }

  onChangePw(element: any, index: number): void {
    let dialogRef = this.dialog.open(DialogChangePassword, {
      width: 'auto',
      data: { name: element.usrno, },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != "CANCEL") {

        this.renderedData[index].usrpw = result;
        this.renderedData[index].isCanSave = false;
        this.renderedData[index].isChangePw = true;

      } else {
      }
    });
  }

  onDeleteUser(index:number){
    // 매니저 권한일 때를 체크
    var target = this.renderedData[index];    
    if (isNullOrUndefined(target)) return;

    target.usrpl
      this.loginservice.delUser(target.usrid).subscribe(
        data => {
          this.translateService.get('deleteUserMsg').subscribe( // 멘트
            value => {
              alert(value);      
                location.reload();
            }
          )
        },
        error => {
          this.translateService.get('serverErrorMsg').subscribe(
            value => {
              alert(value);
              return;
            }
          )
        }

      )
    }



  


  onSave(index: number) {
    // 저장하시겠습니까 다이얼로그 뿌리고
    var target = this.renderedData[index];    
    if (isNullOrUndefined(target)) return;
    if (isNullOrUndefined(target.usrpw) && isNullOrUndefined(target.usrla)) return;

    // if(target.isChangeLa && target.isChangePw) {
    //   this.loginservice.editLaPw(target.usrid, target.usrla ,target.usrpw).subscribe(
    //     data => {
    //       // alert 메시지 변경 필요
    //         this.translateService.get('changePwMsg').subscribe(
    //             value => {
    //               this.renderedData[index].isChangePw = false;
    //               this.renderedData[index].isChangeLa = false;
    //               this.renderedData[index].isCanSave = true;
    //               alert(value);
    //             }
    //           )     
    //     },
    //     error => {
    //         this.translateService.get('serverErrorMsg').subscribe(
    //             value => {
    //               alert(value);
    //               return;
    //             }
    //           )
    //     }
    //   )
    // }
    // else{
    if (target.isChangePw) {
      this.loginservice.editPw(target.usrid, target.usrpw).subscribe(
        data => {
          this.translateService.get('changePwMsg').subscribe(
            value => {
              this.renderedData[index].isChangePw = false;
              alert(value);
              if (!target.isChangeLa) {             
                this.renderedData[index].isCanSave = true;
                return;
              }
            }
          )
        },
        error => {
          this.translateService.get('serverErrorMsg').subscribe(
            value => {
              alert(value);
              return;
            }
          )
        }

      )
    }

    if (target.isChangeLa) {
      this.loginservice.editLa(target.usrid, target.usrla).subscribe(
        data => {
          this.translateService.get('changeLaMsg').subscribe(
            value => {              
                this.renderedData[index].isChangeLa = false;
                this.renderedData[index].isCanSave = true;
              alert(value);
            }
          )

        },
        error => {
          this.translateService.get('serverErrorMsg').subscribe(
            value => {
              alert(value);
            }
          )
        })
    }
    //}
  }
}

@Component({
  selector: 'component-account-management-dialog',
  templateUrl: 'component-account-management-dialog.html',
  styleUrls: ['./component-account-management.scss']
})
export class DialogChangePassword implements OnInit {

  formGroup: FormGroup;
  invalidPassword = false;
  minPw = 6;

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private loginservice: AuthenticationService,
    public dialogRef: MatDialogRef<DialogChangePassword>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(this.minPw)]],
      password2: ['', [Validators.required]],
    }, { validator: passwordMatchValidator });
  }

  get password() { return this.formGroup.get('password'); }
  get password2() { return this.formGroup.get('password2'); }

  onPasswordInput() {
    if (this.formGroup.hasError('passwordMismatch')) {
      this.password2.setErrors([{ 'passwordMismatch': true }]);
      this.invalidPassword = false;
    }
    else {
      this.password2.setErrors(null);
      this.invalidPassword = true;
    }
  }

  changePw() {
    if (this.invalidPassword && this.formGroup.get('password').value.length > 5) {

      this.dialogRef.close(this.formGroup.get('password').value);
    }
    else if (this.invalidPassword == false) {
      this.translateService.get('cofirmMsg').subscribe(
        value => {
          alert(value);
        }
      )
    }
  }
  onCancel(): void {
    this.dialogRef.close("CANCEL");
  }
}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('password2').value)
    return null;
  else
    return { passwordMismatch: true };
};


@NgModule({
  imports: [SharedTranslateModule,
    RouterModule,
    FormsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatTableExporterModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectFilterModule,
    MatSortModule,
  ],
  entryComponents: [
    DialogChangePassword,
  ],
  exports: [ComponentAccountManagement],
  declarations: [ComponentAccountManagement, DialogChangePassword],
  providers: [AuthenticationService, HttpClientService],
})
export class ComponentAccountMoudule { }