package com.yg1.yoswebapp.message;

import java.util.ArrayList;

/**
 * 주문실행
 */
public class CreateOrder {
    /** 회사코드 */
    private String Company;
    /** 유저아이디 */
    private String UserID;

    /** 오더번호 */
    private String OrderNo;

    /** 클라이언트 날짜 */
    private String Tdate;
 

    //private String deliveryType;


    /** 주문헤더 */
    private CreateOrderHeader CreateOrderHeader;

    /** 주문아이템 */
    private ArrayList<CreateOrderItem> CreateOrderItem;

    /**
     * 회사코드
     * 
     * @return 회사코드
     */
    public String getCompany() {
        return Company;
    }

    /**
     * 회사코드
     * 
     * @param Company 회사코드
     */
    public void setCompany(String Company) {
        this.Company = Company;
    }

    /**
     * 유저아이디
     * @return
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
     * 클라이언트 날짜
     * 
     * @return 오더번호
     */
    public String getTdate() {
        return Tdate;
    }

    /**
     * 클라이언트 날짜
     * 
     * @param Tdate 클라이언트 날짜
     */
    public void setTdate(String Tdate) {
        this.Tdate = Tdate;
    }

    /**
     * 주문헤더
     * @return 주문헤더
     */
    public CreateOrderHeader getCreateOrderHeader() {
        return CreateOrderHeader;
    }

    /**
     * 주문헤더
     * @param CreateOrderHeader 주문헤더
     */
    public void setCreateOrderHeader(CreateOrderHeader CreateOrderHeader) {
        this.CreateOrderHeader = CreateOrderHeader;
    }

    /**
     * 주문아이템
     * @return 주문아이템
     */
    public ArrayList<CreateOrderItem> getCreateOrderItem() {
        return CreateOrderItem;
    }

    /**
     * 주문아이템
     * @param CreateOrderItem 주문아이템
     */
    public void setCreateOrderItem(ArrayList<CreateOrderItem> CreateOrderItem) {
        this.CreateOrderItem = CreateOrderItem;
    }
}
