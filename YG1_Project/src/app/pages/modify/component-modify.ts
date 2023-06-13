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
    selector: 'app-component-modify',
    templateUrl: 'component-modify.html',
    styleUrls: ['./component-modify.scss']
})
export class ModifyComponent implements OnInit {
    formGroup: FormGroup;
    invalidModify = false
    user: register;

    // nameFormControl = new FormControl('', [
    //     Validators.required
    // ]);

    // matcher = new MyErrorStateMatcher();

    constructor(
        public _componentPageTitle: ComponentPageTitle,
        private formBuilder: FormBuilder,
        private router: Router,
        private loginService: AuthenticationService) {
        this.user = new register()
        }

    ngOnInit() {
        this._componentPageTitle.title = "editAccount"
    }
    getUser() {
        return this.loginService.getUserLogin();
      }
}


@NgModule({
    imports: [SharedTranslateModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatSelectModule,MatOptionModule],
    exports: [ModifyComponent],
    declarations: [ModifyComponent],
    providers: [AuthenticationService],
})
export class ModifyModule { }
