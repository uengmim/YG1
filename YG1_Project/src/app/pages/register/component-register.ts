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
    selector: 'app-component-register',
    templateUrl: 'component-register.html',
    styleUrls: ['./component-register.scss']
})
export class RegisterComponent implements OnInit {
    minPw = 8;
    formGroup: FormGroup;
    invalidRegister = false
    user: register;



    // nameFormControl = new FormControl('', [
    //     Validators.required
    // ]);

    // matcher = new MyErrorStateMatcher();

    constructor(
        public _componentPageTitle: ComponentPageTitle,
        private formBuilder: FormBuilder,
        private router: Router,
        private loginservice: AuthenticationService) {
        this.user = new register()
        }

    ngOnInit() {
        this._componentPageTitle.title = "createUser"
        this.formGroup = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(this.minPw)]],
            password2: ['', [Validators.required]]
        }, { validator: passwordMatchValidator });
    }
    get username() { return this.formGroup.get('username'); }
    get password() { return this.formGroup.get('password'); }
    get password2() { return this.formGroup.get('password2'); }

    /* Called on each input in either password field */
    onPasswordInput() {
        if (this.formGroup.hasError('passwordMismatch'))
            this.password2.setErrors([{ 'passwordMismatch': true }]);
        else
            this.password2.setErrors(null);
    }

    signUp() {
        this.user.username = this.formGroup.value.username;
        this.user.password = this.formGroup.value.password;
        (this.loginservice.register(this.user).subscribe(
            data => {
                alert('SUCCESS');
                this.invalidRegister = false
            },
            error => {
                alert('FAIL');
                this.invalidRegister = true
            }
        )
        );

    }
}
export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (formGroup.get('password').value === formGroup.get('password2').value)
        return null;
    else
        return { passwordMismatch: true };
};

@NgModule({
    imports: [SharedTranslateModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatSelectModule,MatOptionModule],
    exports: [RegisterComponent],
    declarations: [RegisterComponent],
    providers: [AuthenticationService],
})
export class RegisterModule { }
