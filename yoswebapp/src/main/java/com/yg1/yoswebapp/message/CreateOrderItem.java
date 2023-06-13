package com.yg1.yoswebapp.message;

/**
 * 주문조회
 */
public class CreateOrderItem {
    /** 오더번호 */
    private String OrderNo;
    /** 오더순번 */
    private String OrderSeq;
    /** 제품코드 */
    private String Product;
    /** 주문수량 */
    private int OrderQty;
    /** 단가*/
    private double OrderAm;
    /** 금액단위 */
    private String Currency;
    /** 수량단위 */
    private String Quantity;
    /** Sap 입고번호 */
    private String SapPerchase;
    /** 비고 */
    private String Remark;

    /**
     * 오더번호
     * @return
     */
    public String getOrderNo() {
        return OrderNo;
    }

    /**
     * 오더번호
     * @param OrderNo 오더번호
     */
    public void setOrderNo(String OrderNo) {
        this.OrderNo = OrderNo;
    }

    /**
     * 오더순번
     * @return
     */
    public String getOrderSeq() {
        return OrderSeq;
    }

    /**
     * 오더순번
     * @param OrderSeq 오더순번
     */
    public void setOrderSeq(String OrderSeq) {
        this.OrderSeq = OrderSeq;
    }

    /**
     * 제품코드
     * @return 제품코드
     */
    public String getProduct() {
        return Product;
    }

    /**
     * 제품코드
     * @param Product 제품코드
     */
    public void setProduct(String Product) {
        this.Product = Product;
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
     * 단가
     * @return 단가
     */
    public double getOrderAm() {
        return OrderAm;
    }

    /**
     * 단가
     * @param OrderAm 단가
     */
    public void setOrderAm(double OrderAm) {
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
     * Sap 입고번호
     * @return Sap 입고번호
     */
    public String getSapPerchase() {
        return SapPerchase;
    }

    /**
     * Sap 입고번호
     * @param Remark Sap 입고번호
     */
    public void setSapPerchase(String SapPerchase) {
        this.SapPerchase = SapPerchase;
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
