import { Component, OnInit, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule, FormBuilder, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher, MatFormFieldModule, MatInputModule, MatButtonModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { register } from 'src/app/model/Register';
import { ComponentPageTitle } from '../page-title/page-title';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';


// export class MyErrorStateMatcher implements ErrorStateMatcher {
//     isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//         const isSubmitted = form && form.submitted;
//         return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//     }
// }
@Component({
    selector: 'app-component-settings',
    templateUrl: 'component-settings.html',
    styleUrls: ['./component-settings.scss']
})
export class SettingsComponent implements OnInit {

    username = sessionStorage.getItem('username');
    password = ''

    passwordFormControl = new FormControl('', [
        Validators.required
      ]);

    

    constructor(
        public _componentPageTitle: ComponentPageTitle,
        private router: Router,
        private loginservice: AuthenticationService) {
        }

    ngOnInit() {
        this._componentPageTitle.title = "account"
    }
    submit() {
        this.loginservice.goToSettings(this.username, this.password).subscribe(
            data => {
              this.router.navigate(['modify'])
            },
            error => {
              alert('FAIL')
            }
          )
      }

}


@NgModule({
    imports: [SharedTranslateModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatSelectModule,MatOptionModule],
    exports: [SettingsComponent],
    declarations: [SettingsComponent],
    providers: [AuthenticationService],
})
export class SettingsModule { }
