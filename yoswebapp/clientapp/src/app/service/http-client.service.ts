import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nav } from '../model/Nav';
import { ProductList } from '../model/ProductList';
import { CartList } from '../model/CartList';
import { OrderMark } from '../model/OrderMark';
import { ReturnMsg } from '../model/ReturnMsg';
import { DOCUMENT } from '@angular/common';
import { CreateOrder } from '../model/CreateOrder';
import { ShipToParty } from '../model/ShipToParty';
import { GetProducts } from '../model/GetProgucts';
import { environment, version } from 'src/environments/environment';
import { isNullOrUndefined } from 'util';
import { Observable, of as observableOf } from 'rxjs'




@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  /**
  * Api Url
  */
  private readonly ApiUrl: string;
  constructor(
    private httpClient: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.ApiUrl = document.location.origin;    
  }



  DeleteItemDATA(ItemsEDP: String) {
    throw new Error("Method not implemented.");
  }

  private carturl = '/api/carts'  
  private cartByMassurl = '/api/carts/mass'
  private orderurl = '/api/ordermarks'
  private productsurl = '/api/products'
  private navurl = '/api/nav'
  private getOrdersurl = '/api/orderinq'

  private getCourl = '/api/compinfo'
  private getPlurl = '/api/soinfo'
  private getCuurl = '/api/socinfo'

  private getCusurl = '/api/cuinfo'

  private Stpinfourl = '/api/stpinfo'

  private CrtOrder = '/api/createorder'
  private getUsrTB = '/api/usertable'
  private matachVersion = '/api/version'


  getMatchVersion():Observable<boolean>{

    if(isNullOrUndefined(sessionStorage.getItem('version'))) return observableOf(false); ;
    var date = sessionStorage.getItem('version');
    return this.httpClient.get<boolean>(`${this.matachVersion}/${date}`)
  }

  /**
   * 카테고리 데이터 호출
   */
  getNav(comp: String, lang: String) {
    return this.httpClient.post<Nav[]>(`${this.navurl}`, { comp, lang });
  }

  /**
   * 제품 조회 리스트
   * @param comp 회사코드
   * @param cust 고객코드
   * @param aclass 대분류
   * @param bclass 중분류
   * @param cclass 소분류
   * @param userid 아이디
   */
  getProducts(getProducts: GetProducts, flag : string) {
    return this.httpClient.post<ProductList[]>(`${this.productsurl}/${flag}`, getProducts);
  }
  /**
   * USERID 기준 장바구니 조회 
   * @param userid 유저 ID 
   */
  ALLCartList(userid: String) {
    return this.httpClient.get<ProductList[]>(`${this.carturl}/${userid}`)
  }
  /**
   * USERID / EDP 기준 CartListUpdate & INSERT
   * @param userid 유저 ID 
   * @param cartedp 해당 카트 EDP
   * @param CartListData 해당 카트 DATA
   */
  CartListUpdate(userid: String, cartedp: String, CartListData: CartList) {
    return this.httpClient.put(`${this.carturl}/${userid},${cartedp}`, CartListData)
  }
  /**
   * USERID / EDP 기준 장바구니 삭제
   * @param userid 유저 ID 
   * @param cartedp 해당 카트 EDP
   */
  CartListDelete(userid: String, cartedp: String) {
    return this.httpClient.delete(`${this.carturl}/${userid},${cartedp}`)
  }

  /**
   * USERID 기준 장바구니 전체 삭제
   * @param userid 유저 ID 
   * @param SelectCart 전체 카트
   */
  CartListDeleteAll(userid: String, SelectCart: ProductList[]) {
    return this.httpClient.post<ProductList>(`${this.carturl}/${userid}`, SelectCart)
  }

  /**
   * MASS ORDER CART 추가
   * @param userid 
   * @param MassOrderList 
   * @returns 
   */
   CartListUpdateBymOrder(userid: String, MassOrderList: ProductList[]){
    return this.httpClient.post<ProductList>(`${this.cartByMassurl}/${userid}`, MassOrderList)
  }

  /**
   * USERID / EDP 기준 주요품목 추가
   * @param userid 유저 ID 
   * @param dataedp 주요품목에 추가 할 EDP
   * @param ListDATA 주요품목에 추가 될 데이터
   */
  OrderMarkListInsert(userid: String, dataedp: String, ListDATA: OrderMark) {
    return this.httpClient.put(`${this.orderurl}/${userid},${dataedp}`, ListDATA)
  }
  /**
   * 사용자 ID 기준 주요품목 조회
   * @param userid 유저 ID
   */
  OrderMarkList(userid: String) {
    return this.httpClient.get<ProductList[]>(`${this.orderurl}/${userid}`)
  }
  /**
   * USERID / EDP 기준 주요품목 삭제
   * @param userid 유저 ID 
   * @param dataedp 주요품목에서 삭제 될 EDP
   */
  OrderMarkListDelete(userid: String, dataedp: String) {
    return this.httpClient.delete(`${this.orderurl}/${userid},${dataedp}`)
  }

  /**
   * 주문내역 조회
   * @param comp 회사코드
   * @param userid 아이디
   * @param sdate 조회START 날짜
   * @param edate 조회END 날짜
   */
  getOrders(comp: string, userid: string, kunag: string, sdate: string, edate: string) {
    return this.httpClient.post<any>(`${this.getOrdersurl}`, { comp, userid, kunag, sdate, edate, orderno: '' });
  }




  /**
   * 전체 회사 정보 // SAP
   * @param comp 회사 코드
   */
  getCompany(comp: String) {
    return this.httpClient.post<any>(`${this.getCourl}`, { comp, call: true });
  }
  /**
   * Sales office 별 플랜트 정보 // SAP
   * @param comp 회사 코드
   */
  getPlant(comp: String, socode: String) {
    return this.httpClient.post<any>(`${this.getPlurl}`, { comp, socode });
  }

  /**
   * Sales office 별 고객 정보 // SAP
   * @param comp 회사 코드
   * @param socode Sales offices 코드
   * @param cust 고객번호(선택)
   */
  getCustomer(comp: String, socode: String, cust: String) {
    return this.httpClient.post<any>(`${this.getCuurl}`, { comp, socode, cust });
  }
  /**
   * Sales office 별 고객 아이디 검색  // MSSQL
   * @param usrpl 
   */
  getCustomers(usrpl: String) {
    return this.httpClient.post<any>(`${this.getCusurl}`, { usrpl });
  }
  /**
   * 주문 하기 // SAP
   * @param item 주문 데이터
   */
  CreateOrderList(item: CreateOrder) {
    return this.httpClient.post<any>(`${this.CrtOrder}`, item);
  }
  /**
   * 배송지 조회하기
   * @param comp 회사 코드
   * @param cust 유저 CODE 
   */
  getStpinfourl(comp: string, cust: string) {
    return this.httpClient.post<ShipToParty[]>(`${this.Stpinfourl}`, { comp, cust });
  }


  getUserTable(usrco:string, usrpl:string){
    return this.httpClient.post<any>(`${this.getUsrTB}`,{usrco,usrpl});
  }
  
}


