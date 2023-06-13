
/**
 * 주문 헤더
 */
export class CreateOrderHeader {
    /** 오더등록일 */
    orderDt : String ;
    /** 오더등록시간 */
    orderTm : String ;
    /** Sold-to-Party */
    soldTo : String ;
    /** Ship-to-Party */
    shipTo : String ;
    /** Ship-to-Party 이름*/
    shipToNM : String ;
    /** 도로 */
    street : String ;
    /** 우편번호 */
    post : String ;
    /** 도시 */
    city : String ;
    /** PO Number */
    pono : String;
    /** 금액단위 */
    currency : String ;
    /** 비고 */
    remark : String ;
    /** 유저아이디 */
    userID : String ;
    /** 회사코드 */
    company : String ;
    /** 영업조직 */
    vkorg : String ;
    /** 유통경로 */
    vtweg : String ;
    /** 영업 오피스 */
    vkbur : String;

    /** 배송 타입 */
    deliveryType : String;

    /** Contact Name */
    zname : String;

    /** 첫번째 전화번호 */
    ztelf1 : String;
 
    /** 전자메일 주소 */
    zmail : String;
}

