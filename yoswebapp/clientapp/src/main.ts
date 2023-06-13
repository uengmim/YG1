import 'hammerjs';
import './polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

var otherURL = window.location.toString()

if ( otherURL == 'http://www.globalyg1.com/mat' || otherURL == 'http://www.globalyg1.com/mat/') {
    window.location.href='http://www.globalyg1.com:4200/mat';
    }

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
