import { Component, ViewEncapsulation } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

import {GaService} from './shared/ga/ga';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(router: Router, ga: GaService) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((data: NavigationEnd) => {
        // We want to reset the scroll position on navigation except when navigating within
        // the documentation for a single component.
        
          resetScrollPosition();

        ga.locationChanged(data.urlAfterRedirects);
      });
  }
}

function resetScrollPosition() {
  if (typeof document === 'object' && document) {
    const sidenavContent = document.querySelector('.mat-drawer-content');
    if (sidenavContent) {
      sidenavContent.scrollTop = 0;
    }
  }
}
