package com.yg1.yoswebapp.message;

import java.util.ArrayList;

/**
 * 주문조회
 */
public class OrderInquery {
    /** 오더번호 */
    private String OrderNo;
    /** 오더등록일 */
    private String OrderDt;
    /** 오더등록시간 */
    private String OrderTm;
    /** sap오더 등록시간 */
    private String SapOrderTm;
    /** 고객코드 */
    private String SoldTo;
    /** 고객이름 */
    private String SoldToParty;
    /** 고객PO번호 */
    private String CustPono;
    /** 수주확정여부 */
    private String ConfirmYN;
    /** 수주취소여부 */
    private String CancelYN;
    /** 유저아이디 */
    private String UserID;
    /** 총수량 */
    private int TotalQty;
    /** 총금액 */
    private double TotalAm;
    /** 금액단위 */
    private String Currency;
    /** 수량단위 */
    private String Quantity;
    /** 비고 */
    private String Remark;
    /** 배송 타입 */
    private String deliveryType; //수정 - amak  OrderInquery  delivery type 추가


   // 추가
    /** Ship-to party */
    private String  ShipToParty;
    /** 배송지 이름 */
    private String ShipName;    
    /** 배송지 주소 */
    private String ShipAddr;


    /** Contact Name */
    private String Zname;

    /** 첫번째 전화번호 */
    private String Ztelf1;

    /** 전자메일 주소 */
    private String Zmail;





    /** 주문조회 아이템 */
    private ArrayList<OrderInqueryItem> OrderInqueryList;

    /**
     * 오더번호
     * 
     * @return 오더번호
     */
    public String getOrderNo() {
        return OrderNo;
    }

    /**
     * 오더번호
     * 
     * @param OrderNo 오더번호
     */
    public void setOrderNo(String OrderNo) {
        this.OrderNo = OrderNo;
    }

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
     * SAP 오더등록시간
     * @return SAP 오더등록시간
     */
    public String getSapOrderTm() {
        return SapOrderTm;
    }

    /**
     * SAP 오더등록시간
     * @param type SAP 오더등록시간
     */
    public void setSapOrderTm(String SapOrderTm) {
        this.SapOrderTm = SapOrderTm;
    }

    /**
     * 고객코드
     * @return 고객코드
     */
    public String getSoldTo() {
        return SoldTo;
    }

    /**
     * 고객코드
     * @param SoldTo 고객코드
     */
    public void setSoldTo(String SoldTo) {
        this.SoldTo = SoldTo;
    }

    /**
     * 고객이름
     * @return 고객이름
     */
    public String getSoldToParty() {
        return SoldToParty;
    }

    /**
     * 고객이름
     * @param ShipToParty 고객이름
     */
    public void setSoldToParty(String SoldToParty) {
        this.SoldToParty = SoldToParty;
    }   

    /**
     * 고객PO번호
     * @return 고객PO번호
     */
    public String getCustPono() {
        return CustPono;
    }

    /**
     * 고객PO번호
     * @param CustPono 고객PO번호
     */
    public void setCustPono(String CustPono) {
        this.CustPono = CustPono;
    }

    /**
     * 수주확정여부
     * @return 수주확정여부
     */
    public String getConfirmYN() {
        return ConfirmYN;
    }

    /**
     * 수주확정여부
     * @param ConfirmYN 수주확정여부
     */
    public void setConfirmYN(String ConfirmYN) {
        this.ConfirmYN = ConfirmYN;
    }

    /**
     * 수주취소여부
     * @return 수주취소여부
     */
    public String getCancelYN() {
        return CancelYN;
    }

    /**
     * 수주취소여부
     * @param CancelYN 수주취소여부
     */
    public void setCancelYN(String CancelYN) {
        this.CancelYN = CancelYN;
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
     * 총수량
     * @return 총수량
     */
    public int getTotalQty() {
        return TotalQty;
    }

    /**
     * 총수량
     * @param TotalQty 총수량
     */
    public void setTotalQty(int TotalQty) {
        this.TotalQty = TotalQty;
    }

    /**
     * 총금액
     * @return 총금액
     */
    public double getTotalAm() {
        return TotalAm;
    }

    /**
     * 총금액
     * @param TotalAm 총금액
     */
    public void setTotalAm(double TotalAm) {
        this.TotalAm = TotalAm;
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
     * 수량단위
     * @return 수량단위
     */
    public String getQuantity() {
        return Quantity;
    }

    /**
     * 수량단위
     * @param Quantity 수량단위
     */
    public void setQuantity(String Quantity) {
        this.Quantity = Quantity;
    }

    /**
     * 주문조회아이템
     * @return 주문조회아이템
     */
    public ArrayList<OrderInqueryItem> getOrderInqueryList() {
        return OrderInqueryList;
    }

    /**
     * 주문조회아이템
     * @param OrderInqueryList 주문조회아이템
     */
    public void setOrderInqueryList(ArrayList<OrderInqueryItem> OrderInqueryList) {
        this.OrderInqueryList = OrderInqueryList;
    }

    //수정 - amak OrderInquery 배송타입 추가

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
     * Ship to party
     * @return Ship to party
     */
    public String getShipToParty() {
        return ShipToParty;
    }

    /**
     * Ship to party
     * @param ShipToParty Ship to party
     */
    public void setShipToParty(String ShipToParty) {
        this.ShipToParty = ShipToParty;
    }   

    
    /**
     * 배송지 이름
     * @return 배송지 이름
     */
    public String getShipName() {
        return ShipName;
    }

    /**
     * 배송지 이름
     * @param ShipName 배송지 이름
     */
    public void setShipName(String ShipName) {
        this.ShipName = ShipName;
    }   

    /**
     * 배송지 주소
     * @return 배송지 주소
     */
    public String getShipAddr() {
        return ShipAddr;
    }

    /**
     *  배송지 주소
     * @param ShipAddr 배송지 주소
     */
    public void setShipAddr(String ShipAddr) {
        this.ShipAddr = ShipAddr;
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
