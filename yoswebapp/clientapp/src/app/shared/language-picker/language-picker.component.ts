import {Component, NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule, MatMenuModule} from '@angular/material';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router, RouterModule } from '@angular/router';
import language from 'src/assets/i18n/language.json';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent {
  public languageList:{name:string, code:string, image: string}[] = language;

  
  constructor(private router: Router,
    public translate: TranslateService) {}

  Switchlang(lang: string) : void {
    this.translate.currentLang = lang;
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