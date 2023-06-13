import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import language from 'src/assets/i18n/language.json';
import { ComponentPageTitle } from '../page-title/page-title';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
import { HttpClientService } from 'src/app/service/http-client.service';
import { MatSelectFilterModule } from 'mat-select-filter';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { TranslateService } from '@ngx-translate/core';

  
@Component({
    selector: 'app-component-modify',
    templateUrl: 'component-modify.html',
    styleUrls: ['./component-modify.scss']
})
export class ModifyComponent implements OnInit {
    public languageList: { name: string, code: string, image: string}[] = language;
    formGroup: FormGroup;
    minPw = 6;

    cust: string;
    post: string;
    city: string;
    tel: string;
    addr: string;
    custnm: string;
    dcname: string;

    usrid = sessionStorage.getItem('username');
    authority = sessionStorage.getItem('authority');
    language = sessionStorage.getItem('language');
    company = sessionStorage.getItem('company');
    plant = sessionStorage.getItem('plant');
    customer = sessionStorage.getItem('customer');
    dccode = sessionStorage.getItem('dccode');
    
    invalidPassword = false;

    constructor(
        public _componentPageTitle: ComponentPageTitle,
        private formBuilder: FormBuilder,
        private router: Router,
        private loginservice: AuthenticationService,
        private httpClientService: HttpClientService,
        private translateService: TranslateService) {
    }

    ngOnInit() {
        this._componentPageTitle.title = "account"
        this.formGroup = this.formBuilder.group({
            language:this.language,
            password: ['', [Validators.required, Validators.minLength(this.minPw)]],
            password2: ['', [Validators.required]],
        }, { validator: passwordMatchValidator });
        if (this.authority == 'CUSTOMER') {
            this.httpClientService.getCustomer(this.company, this.plant, this.customer).subscribe(
                data => {
                    data.forEach(element => {
                        if (this.dccode == element.dccode) {
                            this.cust = element.cust
                            this.custnm = element.custnm
                            this.post = element.post
                            this.city = element.city
                            this.tel = element.tel
                            this.addr = element.addr
                            this.dcname = element.dcname
                        }
                    });
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
            this.loginservice.editPw(this.usrid, this.formGroup.get('password').value).subscribe(
                data => {
                    this.translateService.get('changePwMsg').subscribe(
                        value => {
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
                }
            )
        } else if (this.invalidPassword == false) {
            this.translateService.get('cofirmMsg').subscribe(
                value => {
                  alert(value);
                }
              )
        }
    }

    changeLa() {
        if (this.formGroup.get('language').value != '') {
            this.loginservice.editLa(this.usrid, this.formGroup.get('language').value).subscribe(
                data => {
                    this.translateService.get('changeLaMsg').subscribe(
                        value => {
                          alert(value);
                        }
                      )
                    sessionStorage.setItem('language', data.usrla);
                    location.reload();
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
}
export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (formGroup.get('password').value === formGroup.get('password2').value)
        return null;
    else
        return { passwordMismatch: true };
};

@NgModule({
    imports: [SharedTranslateModule,
         RouterModule, FormsModule,
          MatFormFieldModule, 
          MatInputModule, 
          ReactiveFormsModule, 
          CommonModule, 
          MatButtonModule, 
          MatSelectModule, 
          MatOptionModule
        ],
    exports: [ModifyComponent],
    declarations: [ModifyComponent],
    providers: [HttpClientService, AuthenticationService],
})
export class ModifyModule { }
