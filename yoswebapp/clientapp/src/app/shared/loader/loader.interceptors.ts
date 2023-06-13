import { Injectable, Component, OnInit, NgModule } from '@angular/core';
import {
    HttpErrorResponse,
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { MatProgressBar, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
 
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
 
    constructor(private loaderService: LoaderService) { }
 
    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        this.requests.push(req);
        this.loaderService.isLoading.next(true);
        return Observable.create(observer => {
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                        }
                    },
                    err => {
                        this.removeRequest(req);
                        observer.error(err);
                    },
                    () => {
                        this.removeRequest(req);
                        observer.complete();
                    });
            // remove request from queue when cancelled
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
}

@Component({
    selector: 'app-loading',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
  })
  export class LoaderComponent implements OnInit {

    loading: boolean;
    constructor(private loaderService: LoaderService) {
      this.loaderService.isLoading.subscribe((v) => {
        this.loading = v;
      });
    }
    ngOnInit() {
    }

  }


  @NgModule({
    imports: [MatProgressBarModule,
    MatProgressSpinnerModule],
    exports: [LoaderComponent],
    declarations: [LoaderComponent],
    providers:[LoaderService,  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }]
  })
  export class LoaderServiceMoudle {}
