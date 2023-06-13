import { Component, OnInit, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CartService } from 'src/app/service/cart.service';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ErrorStateMatcher, MatFormFieldModule, MatInputModule, MatButtonModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
import { TranslateService } from '@ngx-translate/core';
import { version } from 'src/environments/environment';


@Component({
  templateUrl: 'component-login.html',
  styleUrls: ['./component-login.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private loginservice: AuthenticationService,
    public translate: TranslateService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      usrid: ['', [Validators.required]],
      usrpw: ['', [Validators.required]]
    })
  }
  get usrid() { return this.formGroup.get('usrid'); }
  get usrpw() { return this.formGroup.get('usrpw'); }

  checkLogin() {

    var id = this.formGroup.get('usrid').value as string; 
    var pw  = this.formGroup.get('usrpw').value;

    this.loginservice.authenticate(id.toUpperCase(), pw).subscribe(
      data => {
        this.loginservice.userinfo(sessionStorage.getItem('username')).subscribe(
          data => {
            sessionStorage.setItem('authority', data.usrau);
            sessionStorage.setItem('language', data.usrla);
            sessionStorage.setItem('company', data.usrco);
            sessionStorage.setItem('plant', data.usrpl);
            sessionStorage.setItem('customer', data.usrno);
            sessionStorage.setItem('dccode', data.usrdc);
            sessionStorage.setItem('version',version.toString());
            sessionStorage.setItem('cusPlant', '');
            sessionStorage.setItem('cusDccode', '');
            this.translate.use(sessionStorage.getItem('language'));
            this.router.navigate(['orderinq'])
            this.cartService.sendChange(sessionStorage.getItem('username'))
          }
        )
      },
      error => {
        if (error.status == 401) {
          this.translate.get('errLoginMsg2').subscribe(
            value => {
              alert(value);
            }
          )
        } else {
          this.translate.get('serverErrorMsg').subscribe(
            value => {
              alert(value);
            }
          )
        }
      }
    )
  }
}

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
    MatOptionModule],
  exports: [LoginComponent],
  declarations: [LoginComponent],
  providers: [AuthenticationService, CartService],
})
export class LoginModule { }
