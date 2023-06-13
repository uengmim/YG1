import { Component, Output, EventEmitter, NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ComponentPageTitle } from '../page-title/page-title';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
// import { NavigationFocusModule } from 'src/app/shared/navigation-focus/navigation-focus';

@Component({
  selector: 'component-page-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss']
})
export class ComponentPageHeader {
  constructor(public _componentPageTitle: ComponentPageTitle) {}

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavright = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
}

@NgModule({
  imports: [SharedTranslateModule, MatButtonModule, MatIconModule],
  exports: [ComponentPageHeader],
  declarations: [ComponentPageHeader],
  providers: [ComponentPageTitle],
})
export class ComponentHeaderModule { }