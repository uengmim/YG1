import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class CartService {
    private change_listner = new Subject<any>();

    listenChange(): Observable<any> {
        return this.change_listner.asObservable();
    }

    sendChange(login: any) {
        this.change_listner.next(login)
    }
 

}