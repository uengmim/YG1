import { Component, OnInit, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FormsModule, Validators, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {  MatFormFieldModule, MatInputModule, MatButtonModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ComponentPageTitle } from '../page-title/page-title';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';


@Component({
  selector: 'app-component-settings',
  templateUrl: 'component-settings.html',
  styleUrls: ['./component-settings.scss']
})
export class SettingsComponent implements OnInit {
  formGroup: FormGroup
  usrid = sessionStorage.getItem('username');

  constructor(
    public _componentPageTitle: ComponentPageTitle,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginservice: AuthenticationService) {
  }

  ngOnInit() {
    this._componentPageTitle.title = "account"
    this.formGroup = this.formBuilder.group({
      usrpw: ['', [Validators.required]]
    })
  }

  get usrpw() { return this.formGroup.get('usrpw'); }

  submit() {
    this.loginservice.goToSettings(this.usrid, this.formGroup.get('usrpw').value).subscribe(
      data => {
        this.router.navigate(['settings/modify'])
      },
      error => {
        alert('FAIL')
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
  exports: [SettingsComponent],
  declarations: [SettingsComponent],
  providers: [AuthenticationService],
})
export class SettingsModule { }
