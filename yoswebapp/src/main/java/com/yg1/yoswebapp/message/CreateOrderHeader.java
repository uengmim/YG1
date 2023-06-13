package com.yg1.yoswebapp.message;

/**
 * 주문조회
 */
public class CreateOrderHeader {
    /** 오더등록일 */
    private String OrderDt;
    /** 오더등록시간 */
    private String OrderTm;
    /** Sold-to-Party */
    private String SoldTo;
    /** Ship-to-Party */
    private String ShipTo;
    /** Ship-to-Party 이름*/
    private String ShipToNM;
    /** 도로 */
    private String Street;
    /** 우편번호 */
    private String Post;
    /** 도시 */
    private String City;
    /** PO번호 */
    private String Pono;
    /** 금액단위 */
    private String Currency;
    /** 비고 */
    private String Remark;
    /** 유저아이디 */
    private String UserID;
    /** 회사코드 */
    private String Company;
    /** 영업조직 */
    private String Vkorg;
    /** 유통경로 */
    private String Vtweg;
    /** 영업 오피스 */
    private String Vkbur;

    /** 배송 타입 */
    private String deliveryType;

    /** Contact Name */
    private String Zname;

    /** 첫번째 전화번호 */
    private String Ztelf1;

    /** 전자메일 주소 */
    private String Zmail;



 
    /**
     * 오더등록시간
     * @return
     */
    public String getOrderDt() {
        return OrderDt;
    }

    /**
     * 오더등록시간
     * @param OrderDt 오더등록시간
     */
    public void setOrderDt(String OrderDt) {
        this.OrderDt = OrderDt;
    }

    /**
     * 오더등록시간
     * @return 오더등록시간
     */
    public String getOrderTm() {
        return OrderTm;
    }

    /**
     * 오더등록시간
     * @param type 오더등록시간
     */
    public void setOrderTm(String OrderTm) {
        this.OrderTm = OrderTm;
    }

    /**
     * Sold-to-party
     * @return Sold-to-party
     */
    public String getSoldTo() {
        return SoldTo;
    }

    /**
     * Sold-to-party
     * @param SoldTo Sold-to-party
     */
    public void setSoldTo(String SoldTo) {
        this.SoldTo = SoldTo;
    }

    /**
     * Ship-to-party
     * @return Ship-to-party
     */
    public String getShipTo() {
        return ShipTo;
    }

    /**
     * Ship-to-party
     * @param ShipTo Ship-to-party
     */
    public void setShipTo(String ShipTo) {
        this.ShipTo = ShipTo;
    }

    /**
     * Ship-to-party 이름
     * @return Ship-to-party 이름
     */
    public String getShipToNM() {
        return ShipToNM;
    }

    /**
     * Ship-to-party 이름
     * @param ShipToNM Ship-to-party 이름
     */
    public void setShipToNM(String ShipToNM) {
        this.ShipToNM = ShipToNM;
    }

    /**
     * 도로
     * @return 도로
     */
    public String getStreet() {
        return Street;
    }

    /**
     * 도로
     * @param Street 도로
     */
    public void setStreet(String Street) {
        this.Street = Street;
    }

    /**
     * 우편번호
     * @return 우편번호
     */
    public String getPost() {
        return Post;
    }

    /**
     * 우편번호
     * @param Street 우편번호
     */
    public void setPost(String Post) {
        this.Post = Post;
    }

    /**
     * 도시
     * @return 도시
     */
    public String getCity() {
        return City;
    }

    /**
     * 도시
     * @param Street 도시
     */
    public void setCity(String City) {
        this.City = City;
    }

    /**
     * PO번호
     * @return PO번호
     */
    public String getPono() {
        return Pono;
    }

    /**
     * PO번호
     * @param Pono PO번호
     */
    public void setPono(String Pono) {
        this.Pono = Pono;
    }

    /**
     * 비고
     * @return 비고
     */
    public String getRemark() {
        return Remark;
    }

    /**
     * 비고
     * @param Remark 비고
     */
    public void setRemark(String Remark) {
        this.Remark = Remark;
    }

    /**
     * 유저아이디
     * @return YG1 재고 수량
     */
    public String getUserID() {
        return UserID;
    }

    /**
     * 유저아이디
     * @param UserID 유저아이디
     */
    public void setUserID(String UserID) {
        this.UserID = UserID;
    }

    /**
     * 금액단위
     * @return 금액단위
     */
    public String getCurrency() {
        return Currency;
    }

    /**
     * 금액단위
     * @param Currency 금액단위
     */
    public void setCurrency(String Currency) {
        this.Currency = Currency;
    }

    /**
     * 회사코드
     * @return 회사코드
     */
    public String getCompany() {
        return Company;
    }

    /**
     * 회사코드
     * @param Company 회사코드
     */
    public void setCompany(String Company) {
        this.Company = Company;
    }

    /**
     * 영업조직
     * @return 영업조직
     */
    public String getVkorg() {
        return Vkorg;
    }

    /**
     * 영업조직
     * @param Vkorg 영업조직
     */
    public void setVkorg(String Vkorg) {
        this.Vkorg = Vkorg;
    }

    /**
     * 유통경로
     * @return 유통경로
     */
    public String getVtweg() {
        return Vtweg;
    }

    /**
     * 유통경로
     * @param Vtweg 유통경로
     */
    public void setVtweg(String Vtweg) {
        this.Vtweg = Vtweg;
    }

    /**
     * 영업오피스
     * @return 영업오피스
     */
    public String getVkbur() {
        return Vkbur;
    }

    /**
     * 영업오피스
     * @param Vkbur 영업오피스
     */
    public void setVkbur(String Vkbur) {
        this.Vkbur = Vkbur;
    }

    
    /**
     * 배송 타입
     * @return 배송 타입
     */
    public String getDeliveryType(){
        return deliveryType;
    }

    /**
     * 배송 타입
     * @param deliveryType 배송 타입
     */
    public void setDeliveryType(String deliveryType){
        this.deliveryType = deliveryType;
    }
    

    /**
     * Contact Name
     * @return Contact Name
     */
    public String getZname() {
        return Zname;
    }

    /**
     * Contact Name
     * @param zname Contact Name
     */
    public void setZname(String zname) {
        Zname = zname;
    }

    /**
     * 첫번째 전화번호
     * @return 첫번째 전화번호
     */
    public String getZtelf1() {
        return Ztelf1;
    }

    /**
     * 첫번째 전화번호
     * @param ztelf1 첫번째 전화번호
     */
    public void setZtelf1(String ztelf1) {
        Ztelf1 = ztelf1;
    }

    /**
     * 전자메일 주소
     * @return 전자메일 주소
     */
    public String getZmail() {
        return Zmail;
    }

    /**
     * 전자메일 주소
     * @param zmail 전자메일 주소
     */
    public void setZmail(String zmail) {
        Zmail = zmail;
    }

}
