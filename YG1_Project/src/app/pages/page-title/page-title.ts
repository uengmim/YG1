import {Injectable, NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
import { TranslateService } from '@ngx-translate/core';

/**
 * Service responsible for setting the title that appears above the components and guide pages.
 */
@Injectable()
export class ComponentPageTitle {
  _title = '';
  _originalTitle = 'YG1 Web Ordering System';

  get title(): string { return this._title; }

  set title(title: string) {
    this._title = title;
    if (title !== '') {
      this.translate.get(this._title).subscribe((res: string) => {
        title = `${res} | YG1`;
    });
    } else {
      title = this._originalTitle;
    }
    this.bodyTitle.setTitle(title);
  }

  constructor(private bodyTitle: Title,
    public translate: TranslateService) {}
}

@NgModule({
  imports: [SharedTranslateModule]
})
export class PageTitleMoudle {}