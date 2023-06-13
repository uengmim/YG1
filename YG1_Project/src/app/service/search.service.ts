import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class SearchService {

    private _listners = new Subject<any>();
    private _listners2 = new Subject<any>();
    private _listners3 = new Subject<any>(); 
    
    listenOrderFrom(): Observable<any> {
        return this._listners.asObservable();
    }

    listenOrderTo(): Observable<any> {
        return this._listners2.asObservable();
    }
    listenDateBtn(): Observable<any> {
        return this._listners3.asObservable();
    }

    filter(filterBy: Date) {
        this._listners.next(filterBy);
    }
    filter2(filterBy2: Date) {
        this._listners2.next(filterBy2);
    }

    dateBtn(filterBy3: Event) {
        this._listners3.next(filterBy3);
    }
  
 
}