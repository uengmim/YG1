package com.yg1.yoswebapp.message;

/**
 * 주문조회
 */
public class OrderInqueryItem {
    /** 오더번호 */
    private String OrderNo;
    /** 오더순번 */
    private String OrderSeq;
    /** 제품코드 */
    private String EdpNo;
    /** 제품명 */
    private String EdpNm;
    /** 오더수량 */
    private int OrderQty;
    /** 수량단위 */
    private String Quantity;
    /** 규격 */
    private String Standard;
    /** 오더금액 */
    private double OrderAm;
    /** 금액단위 */
    private String Currency;
    /** ShiptoParty 입고번호 */
    private String PurchaseNo;
    /** SAP오더번호 */
    private String SapOrderNo;
    /** SAP오더순번 */
    private String SapOrderSeq;
    /** 품목취소여부 */
    private String SapCancelYN;
    /** 비고 */
    private String Remark;


    
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
     * 오더순번
     * 
     * @return 오더순번
     */
    public String getOrderSeq() {
        return OrderSeq;
    }

    /**
     * 오더번호
     * 
     * @param OrderSeq 오더번호
     */
    public void setOrderSeq(String OrderSeq) {
        this.OrderSeq = OrderSeq;
    }

    /**
     * 제품코드
     * @return 제품코드
     */
    public String getEdpNo() {
        return EdpNo;
    }

    /**
     * 제품코드
     * @param EdpNo 제품코드
     */
    public void setEdpNo(String EdpNo) {
        this.EdpNo = EdpNo;
    }

    /**
     * 제품명
     * @return 제품명
     */
    public String getEdpNm() {
        return EdpNm;
    }

    /**
     * 제품명
     * @param EdpNm 제품명
     */
    public void setEdpNm(String EdpNm) {
        this.EdpNm = EdpNm;
    }

    /**
     * 오더수량
     * @return 오더수량
     */
    public int getOrderQty() {
        return OrderQty;
    }

    /**
     * 오더수량
     * @param OrderQty 오더수량
     */
    public void setOrderQty(int OrderQty) {
        this.OrderQty = OrderQty;
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
     * 규격
     * @return 규격
     */
    public String getStandard() {
        return Standard;
    }

    /**
     * 규격
     * @param Standard 규격
     */
    public void setStandard(String Standard) {
        this.Standard = Standard;
    }

    /**
     * 오더금액
     * @return 오더금액
     */
    public Double getOrderAm() {
        return OrderAm;
    }

    /**
     * 오더금액
     * @param OrderAm 오더금액
     */
    public void setOrderAm(Double OrderAm) {
        this.OrderAm = OrderAm;
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
     * ShiptoParty 입고번호
     * @return ShiptoParty 입고번호
     */
    public String getPurchaseNo() {
        return PurchaseNo;
    }

    /**
     * ShiptoParty 입고번호
     * @param PurchaseNo ShiptoParty 입고번호
     */
    public void setPurchaseNo(String PurchaseNo) {
        this.PurchaseNo = PurchaseNo;
    }

    /**
     * SAP오더번호
     * @return SAP오더번호
     */
    public String getSapOrderNo() {
        return SapOrderNo;
    }

    /**
     * SAP오더번호
     * @param SapOrderNo SAP오더번호
     */
    public void setSapOrderNo(String SapOrderNo) {
        this.SapOrderNo = SapOrderNo;
    }

    /**
     * SAP오더순번
     * @return SAP오더순번
     */
    public String getSapOrderSeq() {
        return SapOrderSeq;
    }

    /**
     * SAP오더순번
     * @param SapOrderSeq SAP오더순번
     */
    public void setSapOrderSeq(String SapOrderSeq) {
        this.SapOrderSeq = SapOrderSeq;
    }

    /**
     * 품목취소여부
     * @return 품목취소여부
     */
    public String getSapCancelYN() {
        return SapCancelYN;
    }

    /**
     * 품목취소여부
     * @param SapCancelYN 품목취소여부
     */
    public void setSapCancelYN(String SapCancelYN) {
        this.SapCancelYN = SapCancelYN;
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


}
