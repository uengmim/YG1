import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FormsModule, Validators, ReactiveFormsModule, FormBuilder, FormGroup, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatOptionModule, MatSelectModule, MatRadioModule, MatRadioChange } from '@angular/material';
import { CommonModule } from '@angular/common';
import { register } from 'src/app/model/Register';
import { ComponentPageTitle } from '../page-title/page-title';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
import language from 'src/assets/i18n/language.json';
import { HttpClientService } from 'src/app/service/http-client.service';
import { MatSelectFilterModule } from 'mat-select-filter';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-component-register',
    templateUrl: 'component-register.html',
    styleUrls: ['./component-register.scss']
})

export class RegisterComponent implements OnInit {
    public languageList: { name: string, code: string, image: string }[] = language;
    auth = sessionStorage.getItem('authority');
    company = sessionStorage.getItem('company');

    companyList: any;
    plantList: any;
    customerList: any;
    customerList2: any;

    no: string;
    decode: string;

    selectedAu: string;
    selectedCo: string;
    minPw = 6;
    formGroup: FormGroup;

    invalidRegister = false;
    invalidPassword = false;
    user: register;

    public filteredList;

    constructor(
        public _componentPageTitle: ComponentPageTitle,
        private formBuilder: FormBuilder,
        private router: Router,
        private loginservice: AuthenticationService,
        private httpClientService: HttpClientService,
        private translateService: TranslateService) {
        this.user = new register()
    }

    ngOnInit() {
        this._componentPageTitle.title = "createAccount"


        this.formGroup = this.formBuilder.group({
            radioGrop: ['all'],
            userid: ['', [Validators.required]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(this.minPw)]],
            password2: ['', [Validators.required]],
            authority: ['', [Validators.required]],
            language: ['', [Validators.required]],
            company: [null, [Validators.required]],
            plant: [null,],
            no: [null,],
        }, { validator: passwordMatchValidator });

        this.httpClientService.getCompany(this.company).subscribe(
            data => {
                this.companyList = Object(data).filter((array, index, self) => self.findIndex((t) => {
                    return t.comp === array.comp;
                }) === index);
            },
            error => {
                this.translateService.get('serverErrorMsg').subscribe(
                    value => {
                        alert(value);
                    }
                )
            }
        )

        if (this.auth == 'MANAGER') {
            this.httpClientService.getPlant(this.company, '').subscribe(
                data => {
                    this.plantList = data;
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
    get userid() { return this.formGroup.get('userid'); }
    get username() {return this.formGroup.get('username');}
    get password() { return this.formGroup.get('password'); }
    get password2() { return this.formGroup.get('password2'); }

    focusOutID(): void {

        var id = this.formGroup.get('userid').value as string
        if (id == '') {
            this.invalidRegister = false
        }
        else {
            this.loginservice.duplicate(id.toUpperCase()).subscribe(
                data => {
                    if (data == true) {
                        this.invalidRegister = true
                    } else {
                        this.translateService.get('duplicateMsg').subscribe(
                            value => {
                                alert(value);
                            }
                        )
                        this.invalidRegister = false
                    }
                },
                error => {
                    this.translateService.get('serverErrorMsg').subscribe(
                        value => {
                            alert(value);
                        }
                    )
                    this.invalidRegister = false
                }
            )
        }
    }

    focusOutName() : void {
        this.invalidRegister = this.formGroup.get('username').value == '' ? false : true;
    }

    focusOutAU(selectedAu: string): void {
        this.selectedAu = selectedAu
        this.formGroup.get('company').reset();
        this.formGroup.get('plant').reset();
        this.formGroup.get('no').reset();
    }

    focusOutCO(selectedCo: string): void {
        this.selectedCo = selectedCo
        this.httpClientService.getPlant(this.selectedCo, '').subscribe(
            data => {
                this.plantList = data;
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

    radioChange($event: MatRadioChange) {
        if ($event.source.name === 'radio') {
            this.customerList2 = this.customerList.filter(
                result =>
                  result.dcname.startsWith($event.value)
              );
              if($event.value == "all") {
                this.customerList2 = this.customerList
                this.filteredList = this.customerList2.slice();
              } else {
                this.filteredList = this.customerList2.slice();
              }
              
        } 
    }

    focusOutPL(selectedPl: string): void {
        if (this.auth == 'MASTER' && this.selectedAu == 'CUSTOMER') {
            this.httpClientService.getCustomer(this.selectedCo, selectedPl, '').subscribe(
                data => {
                    this.customerList = data
                    this.customerList2 = data
                    this.filteredList = this.customerList2.slice();
                },
                error => {
                    this.translateService.get('serverErrorMsg').subscribe(
                        value => {
                            alert(value);
                        }
                    )
                }
            )
        } else if (this.auth == 'MANAGER' && this.selectedAu == 'CUSTOMER') {
            this.httpClientService.getCustomer(this.company, selectedPl, '').subscribe(
                data => {
                    this.customerList = data
                    this.customerList2 = data
                    this.filteredList = this.customerList2.slice();
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

    signUp() {
        if(this.auth == 'MANAGER') {
            this.formGroup.value.company = this.company;
        }
        //대문자로 넣어달라는 요청
        var id = this.formGroup.value.userid as string
        this.user.usrid = id.toUpperCase();        
        this.user.usrnm = this.formGroup.value.username;
        this.user.usrpw = this.formGroup.value.password;
        this.user.usrau = this.formGroup.value.authority
        this.user.usrla = this.formGroup.value.language;
        this.user.usrco = this.formGroup.value.company;
        this.user.usrpl = this.formGroup.value.plant;
        this.no = this.formGroup.value.no;
        
        if (this.invalidRegister && this.invalidPassword && this.user.usrid != '' && this.user.usrpw.length > 5
            && this.user.usrau != ('' || null) && this.user.usrla != ('' || null) && this.user.usrco != ('' || null)) {
            if (this.selectedAu == 'MANAGER' && this.user.usrpl == ('' || null)) {
                this.translateService.get('blankMsg').subscribe(
                    value => {
                        alert(value);
                    }
                )
            } else if (this.selectedAu == 'CUSTOMER' && (this.user.usrpl == ('' || null) || this.no == null)) {
                this.translateService.get('blankMsg').subscribe(
                    value => {
                        alert(value);
                    }
                )
            } else if (this.selectedAu == 'CUSTOMER' && this.no != null) {
                var Split = this.no.split(',');
                this.user.usrno = Split[0]
                this.user.usrdc = Split[1]
                this.loginservice.register(this.user).subscribe(
                    data => {
                        this.translateService.get('createMsg').subscribe(
                            value => {
                                alert(value);
                            }
                        )
                        this.router.navigate(['settings/modify'])
                    },
                    error => {
                        this.translateService.get('serverErrorMsg').subscribe(
                            value => {
                                alert(value);
                            }
                        )
                    }
                )
            } else if (this.selectedAu == 'MANAGER' && this.no == null) {
                this.user.usrno = ''
                this.loginservice.register(this.user).subscribe(
                    data => {
                        this.translateService.get('createMsg').subscribe(
                            value => {
                                alert(value);
                            }
                        )
                        this.router.navigate(['settings/modify'])
                    },
                    error => {
                        this.translateService.get('serverErrorMsg').subscribe(
                            value => {
                                alert(value);
                            }
                        )
                    }
                )
            }else if (this.selectedAu == 'MASTER' && this.no == null && this.user.usrpl == null) {
                this.user.usrpl = ''
                this.user.usrno = ''
                this.loginservice.register(this.user).subscribe(
                    data => {
                        this.translateService.get('createMsg').subscribe(
                            value => {
                                alert(value);
                            }
                        )
                        this.router.navigate(['settings/modify'])
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
        } else if (this.invalidRegister == false) {
            this.translateService.get('duplicateMsg').subscribe(
                value => {
                    alert(value);
                }
            )
        } else if (this.invalidPassword == false) {
            this.translateService.get('cofirmMsg').subscribe(
                value => {
                    alert(value);
                }
            )
        } else {
            this.translateService.get('blankMsg').subscribe(
                value => {
                    alert(value);
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
    imports: [
        SharedTranslateModule,
        RouterModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatSelectFilterModule,
        MatRadioModule
    ],
    exports: [RegisterComponent],
    declarations: [RegisterComponent],
    providers: [AuthenticationService, HttpClientService],
})
export class RegisterModule { }
