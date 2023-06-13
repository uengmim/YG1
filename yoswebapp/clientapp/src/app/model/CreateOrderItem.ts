
/**
 * 주문 아이템
 */
export class CreateOrderItem {
    /** 오더번호 */
    orderNo : String ;
    /** 오더순번 */
    orderSeq : String ;
    /** 제품코드 */
    product : String ;
    /** 주문수량 */
    orderQty : number ;
    /** 단가*/
    orderAm : number ;
    /** 금액단위 */
    currency : String ;
    /** 수량단위 */
    quantity : String ;
    /** Sap 입고번호 */
    sapPerchase : String ;
    /** 비고 */
    remark : String ;
}
