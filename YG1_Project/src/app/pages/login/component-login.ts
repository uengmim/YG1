import { Component, OnInit, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  templateUrl: 'component-login.html',
  styleUrls: ['./component-login.scss']
})
export class LoginComponent implements OnInit {

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  username = 'YGTEST'
  password = 'password'
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }
  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['orderinq'])
        this.invalidLogin = false
      },
      error => {
        alert('LOGIN FAIL')
        this.invalidLogin = true
      }
    )
    );
  }
}

@NgModule({
  imports: [SharedTranslateModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule],
  exports: [LoginComponent],
  declarations: [LoginComponent],
  providers: [AuthenticationService],
})
export class LoginModule { }
