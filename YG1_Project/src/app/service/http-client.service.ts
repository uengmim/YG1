import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nav } from '../model/item,';
import { ProductList } from '../model/ProductList';
import { CartList } from '../model/CartList';
import { OrderMark } from '../model/OrderMark';
import { ReturnMsg } from '../model/ReturnMsg';
import { destination } from '../model/Destination';




@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  DeleteItemDATA(ItemsEDP: String) {
    throw new Error("Method not implemented.");
  }

  private carturl = 'http://localhost:8080/cartitems'
  private orderurl = 'http://localhost:8080/ordermarks'
  private productListurl = 'http://localhost:8080/products'

  constructor(  
    private httpClient: HttpClient
  ) {
  }

  // getSections() {
  //   let username='javainuse'
  //   let password='password'
  
  //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
  //   return this.httpClient.get<Sections[]>('http://localhost:8080/sections',{headers});
  // }

  getNav() {
    return this.httpClient.get<Nav[]>('http://localhost:8080/test');
  }
  ALLProductList(userid : String){
    return this.httpClient.get<ProductList[]>(`${this.productListurl}/${userid}`)
  }
  ALLCartList(userid : String){
    console.log("장바구니 정보 GET");
    return this.httpClient.get<CartList[]>(`${this.carturl}/${userid}`)
  }
  CartListUpdate(ListDATA : Object){
    console.log("장바구니 정보 업데이트 = " + ListDATA);
    return this.httpClient.post(`${this.carturl}`, ListDATA)
  }
  CartListDelete(ListDATA : CartList) {
    console.log("장바구니 정보 삭제 = " + ListDATA);
    return this.httpClient.post<ReturnMsg>(`${this.carturl}/DELETE`, ListDATA)
  }

  OrderMarkListInsert(ListDATA : OrderMark){
    console.log("오더마크 정보 추가");
    console.log("오더마크 = "+ ListDATA)
    return this.httpClient.post<ReturnMsg>(`${this.orderurl}`, ListDATA)
  }
  OrderMarkList(userid : String){
    console.log("오더마크 정보 가져오기");
    return this.httpClient.get<OrderMark[]>(`${this.orderurl}/${userid}`)
  }
  OrderMarkListDelete(ListDATA){
    console.log("오더마크 정보 삭제 = " + ListDATA);
    return this.httpClient.post(`${this.orderurl}/DELETE`,ListDATA)
  }

  //배송지등록
  registerDestination(destination: destination) {
    return this.httpClient.post<any>('http://localhost:8080/registerDestination', destination);
  }
  //배송지호출
  getDestination(username: String) {
    return this.httpClient.post<destination[]>('http://localhost:8080/getDestinations', username);
  }
  //배송지삭제
  removeDestinations(destinations: destination[]) {
    return this.httpClient.post<any>('http://localhost:8080/removeDestinations', destinations);
  }
}


