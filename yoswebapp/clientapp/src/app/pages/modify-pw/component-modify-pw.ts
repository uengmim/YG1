import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule, FormBuilder, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher, MatFormFieldModule, MatInputModule, MatButtonModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import language from 'src/assets/i18n/language.json';
import { register } from 'src/app/model/Register';
import { ComponentPageTitle } from '../page-title/page-title';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
import { MatSelectFilterModule } from 'mat-select-filter';
import { HttpClientService } from 'src/app/service/http-client.service';
import { TranslateService } from '@ngx-translate/core';


// export class MyErrorStateMatcher implements ErrorStateMatcher {
//     isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//         const isSubmitted = form && form.submitted;
//         return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//     }
// }
@Component({
    selector: 'app-component-modify-pw',
    templateUrl: 'component-modify-pw.html',
    styleUrls: ['./component-modify-pw.scss']
})
export class ModifyPwComponent implements OnInit {
    public languageList: { name: string, code: string, image: string}[] = language;
    public filteredList;
    plantList: any;
    idList: any;
    selectedId: string;

    company = sessionStorage.getItem('company');
    plant = sessionStorage.getItem('plant');
    usrid = sessionStorage.getItem('username')
    auth = sessionStorage.getItem('authority')
    minPw = 6;
    formGroup: FormGroup;

    invalidPassword = false;

    constructor(
        public _componentPageTitle: ComponentPageTitle,
        private formBuilder: FormBuilder,
        private router: Router,
        private httpClientService: HttpClientService,
        private loginservice: AuthenticationService,
        private translateService: TranslateService) { }

    ngOnInit() {
        this._componentPageTitle.title = "accountManagement"
        this.formGroup = this.formBuilder.group({
            plant: '',
            no: '',
            language: '',
            password: ['', [Validators.required, Validators.minLength(this.minPw)]],
            password2: ['', [Validators.required]],
        }, { validator: passwordMatchValidator });

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

        if (this.auth == 'MANAGER') {
            this.httpClientService.getCustomers(this.plant).subscribe(
                data => {
                    this.idList = data;
                    this.filteredList = this.idList.slice();
                },
                error => {
                    this.translateService.get('serverErrorMsg').subscribe(
                        value => {
                          alert(value);
                        }
                      )
                })
        }
    }

    focusOutPL(selectedPl: string): void {
        this.httpClientService.getCustomers(selectedPl).subscribe(
            data => {
                this.idList = data
                this.filteredList = this.idList.slice();
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
    focusOutID(selectedID: string): void {
        this.selectedId = selectedID
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
            this.loginservice.editPw(this.selectedId, this.formGroup.get('password').value).subscribe(
                ata => {
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
            this.loginservice.editLa(this.selectedId, this.formGroup.get('language').value).subscribe(
                data => {
                    this.translateService.get('changeLaMsg').subscribe(
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
        RouterModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatSelectFilterModule
    ],
    exports: [ModifyPwComponent],
    declarations: [ModifyPwComponent],
    providers: [AuthenticationService, HttpClientService],
})
export class ModifyPwModule { }
