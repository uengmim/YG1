import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class SearchService {
    private category_listner = new Subject<any>();
    // private date_searchDate = new Subject<any>();

    listenCategory(): Observable<any> {
        return this.category_listner.asObservable();
    }

    // listenDateBtn(): Observable<any> {
    //     return this.date_searchDate.asObservable();
    // }

    sendCategory(newTree: any) {
        this.category_listner.next(newTree)
    }

    // dateBtn(searchDate: any) {
    //     this.date_searchDate.next(searchDate);
    // }




}