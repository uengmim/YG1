import {Component, NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule, MatMenuModule} from '@angular/material';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent {
  constructor(private router: Router) {}

  Switchlang(lang: string) : void {
    console.log(lang)
    sessionStorage.setItem('language', lang);
    location.reload();
  }
}




@NgModule({
  imports: [MatButtonModule, MatIconModule, MatMenuModule, CommonModule, RouterModule],
  exports: [LanguagePickerComponent],
  declarations: [LanguagePickerComponent],
  providers:[AuthenticationService]
})
export class LanguagePickerMoudle {}