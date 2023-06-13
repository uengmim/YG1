package com.yg1.yoswebapp.model;

// Application 테스트 용입니다. RFC 연결시 삭제 부탁드립니다.
public class Product {
    private String userid;
    private String product;
    private String edp;
    private String aClass;
    private String aClassNM;
    private String bClass;
    private String bClassNM;
    private String cClass;
    private String cClassNM;
    private String standard;
    private double price;
    private double netPrice;
    private String currency;
    private int ygstock;
    private int ntstock;
    private String vKey;
    private int batch1;
    private int batch2;
    private String quantity;
    private int packing;
    private int cart;
    private int ordermark;

    public Product(){
    }
    public int getordermark(){
        return ordermark;
    }
    public void setordermark(int ordermark){
        this.ordermark = ordermark;
    }
    public String getuserid(){
        return userid;
    }
    public void setuserid(String userid){
        this.userid = userid;
    }
    public String getproduct(){
        return product;
    }
    public void setproduct(String product){
        this.product = product;
    }
    public String getedp(){
        return edp;
    }
    public void setedp(String edp){
        this.edp = edp;
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

    public String getstandard(){
        return standard;
    }
    public void setstandard(String standard){
        this.standard = standard;
    }
    public double getprice(){
        return price;
    }
    public void setprice(double price){
        this.price = price;
    }

    public double getNetprice(){
        return netPrice;
    }
    public void setNetprice(double netPrice){
        this.netPrice = netPrice;
    }

    public String getcurrency(){
        return currency;
    }
    public void setcurrency(String currency){
        this.currency = currency;
    }

    public int getygstock(){
        return ygstock;
    }
    public void setygstock(int ygstock){
        this.ygstock = ygstock;
    }

    public int getntstock(){
        return ntstock;
    }
    public void setntstock(int ntstock){
        this.ntstock = ntstock;
    }
    public String getVkey(){
        return vKey;
    }
    public void setVkey(String vKey){
        this.vKey = vKey;
    }
    public int getBatch1(){
        return batch1;
    }
    public void setBatch1(int batch1){
        this.batch1 = batch1;
    }
    public int getBatch2(){
        return batch2;
    }
    public void setBatch2(int batch2){
        this.batch2 = batch2;
    }
    public String getquantity(){
        return quantity;
    }
    public void setquantity(String quantity){
        this.quantity = quantity;
    }

    public int getpacking(){
        return packing;
    }
    public void setpacking(int packing){
        this.packing = packing;
    }
    public int getcart(){
        return cart;
    }
    public void setcart(int cart){
        this.cart = cart ;
    }

}


// package com.yg1.yoswebapp.model;

// import javax.persistence.Column;
// import javax.persistence.Entity;
// import javax.persistence.Id;
// import javax.persistence.Table;

// @Entity
// @Table(name = "YPRODT")
// public class Product {
//     @Column(name = "PRODT")
//     private String PRODUCT;

//     @Id
//     @Column(name = "EDPNO")
//     private String EDP;

//     @Column(name = "STNDR")
//     private String STANDARD;

//     @Column(name = "PRICE")
//     private Integer PRICE;

//     @Column(name = "STOCK")
//     private String STOCK;

//     @Column(name = "PKING")
//     private String PACKING;

//     public Product() {

//     }

//     public Product(String PRODUCT, String EDP, String STANDARD, Integer PRICE, String STOCK, String PACKING) {
//         this.PRODUCT = PRODUCT;
//         this.EDP = EDP;
//         this.STANDARD = STANDARD;
//         this.PACKING = PACKING;
//         this.PRICE = PRICE;
//         this.STOCK = STOCK;

//     }

//     public String getPRODUCT() {
//         return PRODUCT;
//     }

//     public void setPRODUCT(String pRODUCT) {
//         PRODUCT = pRODUCT;
//     }

//     public String getEDP() {
//         return EDP;
//     }

//     public void setEDP(String eDP) {
//         EDP = eDP;
//     }

//     public String getSTANDARD() {
//         return STANDARD;
//     }

//     public void setSTANDARD(String sTANDARD) {
//         STANDARD = sTANDARD;
//     }

//     public Integer getPRICE() {
//         return PRICE;
//     }

//     public void setPRICE(Integer pRICE) {
//         PRICE = pRICE;
//     }

//     public String getSTOCK() {
//         return STOCK;
//     }

//     public void setSTOCK(String sTOCK) {
//         STOCK = sTOCK;
//     }

//     public String getPACKING() {
//         return PACKING;
//     }

//     public void setPACKING(String pACKING) {
//         PACKING = pACKING;
//     }
// }