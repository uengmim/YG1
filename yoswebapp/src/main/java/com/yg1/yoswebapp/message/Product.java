package com.yg1.yoswebapp.message;

/**
 * Production(제품)
 */
public class Product {
    /** EDP No */
    private String edpNo;
    /** 제품 이름 */
    private String productName;
    /** 대분류 */
    private String aClass;
    /** 대분류명 */
    private String aClassNM;
    /** 중분류 */
    private String bClass;
    /** 중분류명 */
    private String bClassNM;
    /** 소분류 */
    private String cClass;
    /** 소분류명 */
    private String cClassNM;
    /** 규격 */
    private String type;
    /** 소비자가 */
    private double listPrice;

    /** 최종 할인 적용 가격*/
    private double netPrice;

    /** 통화단위 */
    private String currency;
    /** YG1 재고 수량 */
    private int ygStock;
    /** NEUTRAL 재고 수량 */
    private int ntStock;
    /** VKEY */
    private String vKey;

    /** 재고 Batch 1 */
    private int batch1;
    
    /** 재고 Batch 2 */
    private int batch2;

    /** 수량단위 */
    private String quantity;
    /** 안전 재고 */
    private int safeStock;
    /** 포장 단위 */
    private int packingUnit;

    /** 주문 수량 */
    private double orderQuantity;

    /**
     * 제품이름
     * 
     * @return 제품이름
     */
    public String getProductName() {
        return productName;
    }

    /**
     * 제품이름
     * 
     * @param productName 제품이름
     */
    public void setProductName(String productName) {
        this.productName = productName;
    }

    /**
     * 대분류
     * 
     * @return 대분류
     */
    public String getaClass() {
        return aClass;
    }

    /**
     * 대분류
     * 
     * @param aClass 대분류
     */
    public void setaClass(String aClass) {
        this.aClass = aClass;
    }

    /**
     * 대분류명
     * 
     * @return 대분류명
     */
    public String getaClassNM() {
        return aClassNM;
    }

    /**
     * 대분류명
     * 
     * @param aClassNM 대분류명
     */
    public void setaClassNM(String aClassNM) {
        this.aClassNM = aClassNM;
    }

    /**
     * 중분류
     * 
     * @return 중분류
     */
    public String getbClass() {
        return bClass;
    }

    /**
     * 중분류
     * 
     * @param bClass 중분류
     */
    public void setbClass(String bClass) {
        this.bClass = bClass;
    }

    /**
     * 중분류명
     * 
     * @return 중분류명
     */
    public String getbClassNM() {
        return bClassNM;
    }

    /**
     * 중분류명
     * 
     * @param bClassNM 중분류명
     */
    public void setbClassNM(String bClassNM) {
        this.bClassNM = bClassNM;
    }

    /**
     * 소분류
     * 
     * @return 소분류
     */
    public String getcClass() {
        return cClass;
    }

    /**
     * 소분류
     * 
     * @param cClass 소분류
     */
    public void setcClass(String cClass) {
        this.cClass = cClass;
    }

    /**
     * 소분류명
     * 
     * @return 소분류명
     */
    public String getcClassNM() {
        return cClassNM;
    }

    /**
     * 소분류명
     * 
     * @param cClassNM 소분류명
     */
    public void setcClassNM(String cClassNM) {
        this.cClassNM = cClassNM;
    }

    /**
     * EDP No
     * @return
     */
    public String getEdpNo() {
        return edpNo;
    }

    /**
     * EDP NO
     * @param edpNo EDP NO
     */
    public void setEdpNo(String edpNo) {
        this.edpNo = edpNo;
    }

    /**
     * 규격
     * @return 규격
     */
    public String getType() {
        return type;
    }

    /**
     * 규격
     * @param type 규격
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * 단가
     * @return 단가
     */
    public double getListPrice() {
        return listPrice;
    }

    /**
     * 단가
     * @param listPrice 단가
     */
    public void setListPrice(double listPrice) {
        this.listPrice = listPrice;
    }

    /** 할인 적용가 */
    public double getNetPrice(){
        return netPrice;
    }

    /**
     * 할인 적용가
     * @param netPrice 할인 적용가
     */
    public void setNetPrice(double netPrice){
        this.netPrice = netPrice;
    }


    /**
     * 통화단위
     * @return 통화단위
     */
    public String getCurrency() {
        return currency;
    }

    /**
     * 통화단위
     * @param currency 통화단위
     */
    public void setCurrency(String currency) {
        this.currency = currency;
    }

    /**
     * 안전재고
     * @return 안전재고
     */
    public int getSafeStock() {
        return safeStock;
    }

    /**
     * 안전재고
     * @param safeStock 안전재고
     */
    public void setSafeStock(int safeStock) {
        this.safeStock = safeStock;
    }


    //#region
    /**
     * YG1 재고 수량
     * @return YG1 재고 수량
     */
    public int getYgStock() {
        return ygStock;
    }

    /**
     * YG1 재고 수량
     * @param ygStock YG1 재고 수량
     */
    public void setYgStock(int ygStock) {
        this.ygStock = ygStock;
    }

    /**
     * NERTRAL 재고 수량
     * @return NERTRAL 재고 수량
     */
    public int getNtStock() {
        return ntStock;
    }

    /**
     * NERTRAL 재고 수량
     * @param ntStock NERTRAL 재고 수량
     */
    public void setNtStock(int ntStock) {
        this.ntStock = ntStock;
    }
//#endregion
    
    public String getVKey(){
        return vKey;
    }

    public void setVKey(String vKey){
        this.vKey = vKey;
    }

    /**
     * 재고 Batch 1
     * @return 재고 Batch 1
     */
    public int getBatch1() {
        return batch1;
    }

    /**
     * 재고 Batch 1
     * @param batch1 재고 Batch 1
     */
    public void setBatch1(int batch1) {
        this.batch1 = batch1;
    }

/**
     * 재고 Batch 2
     * @return 재고 Batch 2
     */
    public int getBatch2() {
        return batch2;
    }

    /**
     * 재고 Batch 2
     * @param batch2 재고 Batch 2
     */
    public void setBatch2(int batch2) {
        this.batch2 = batch2;
    }

    /**
     * 수량단위
     * @return 수량단위
     */
    public String getQuantity() {
        return quantity;
    }

    /**
     * 수량단위
     * @param packingUnit 수량단위
     */
    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    /**
     * 포장 단위
     * @return 포장 단위
     */
    public int getPackingUnit() {
        return packingUnit;
    }

    /**
     * 포장 단위
     * @param packingUnit 포장단위
     */
    public void setPackingUnit(int packingUnit) {
        this.packingUnit = packingUnit;
    }

    /**
     * 주문 수량
     * @return 주문 수량
     */
    public double getOrderQuantity() {
        return orderQuantity;
    }

    /**
     * 주문 수량
     * @param orderQuantity 주문 수량
     */
    public void setOrderQuantity(double orderQuantity) {
        this.orderQuantity = orderQuantity;
    }
}
