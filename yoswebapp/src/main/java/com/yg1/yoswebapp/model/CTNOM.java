package com.yg1.yoswebapp.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@IdClass(value = CTNOMPK.class)
@DynamicInsert
@DynamicUpdate
@Table(name="CTNOM")
public class CTNOM
{

    
    /**
     * USERCOMPANY - 사용자 지사코드
     */
    @Column(name = "USRCO")
    private String USERCOMPANY;

	/**
	 * USERID - 사용자 ID
	 */
	@Id
	@Column(name = "USRID")
	private String USERID;
	/**
	 * PRODUCT - 제품
	 */
	@Column(name = "PRODT")
	private String PRODUCT;
	/**
	 * EDPNO - 제품 번호
	 */
	@Id
	@Column(name = "EDPNO")
	private String EDP;
	/**
	 * STANDARD - 제품 규격
	 */
	@Column(name = "STNDR")
	private String STANDARD;
	/**
	 * PRICE - 제품 가격
	 */
	@Column(name = "PRICE")
	private Float PRICE;
	/**
	 * QUANTITY - 제품 단위
	 */
	@Column(name = "QUANT")
	private String QUANTITY;
	/**
	 * CURRENCY - 가격 단위
	 */
	@Column(name = "CURNC")
	private String CURRENCY;
	/**
	 * PACKING - 제품 포장단위
	 */
	@Column(name = "PKING")
	private String PACKING;
	/**
	 * CART - 장바구니 수량
	 */
	@Column(name = "CARTS")
    private Integer CART;
    
    /**
     * ORDERMARK - 주요품목 여부
     */
    @Column(name = "ODMRK")
	private Integer ORDERMARK;

	 /**
     * SEQ - 장바구니 순서
     */
    @Column(name = "SEQ")
	private Integer SEQNUM;
	


    public CTNOM()
    {
    }

	/**
	 * 변경에 대한 생성자
	 * @param USERCOMPANY
	 * @param USERID
	 * @param PRODUCT
	 * @param EDP
	 * @param STANDARD
	 * @param PRICE
	 * @param STOCK
	 * @param PACKING
	 * @param CART
	 * @param ORDERMAKR
	 * @param QUANTITY
	 * @param CURRENCY
	 * @param SEQ
	 */
    public CTNOM(String USERCOMPANY, String USERID, String PRODUCT, String EDP, String STANDARD, Float PRICE, String STOCK, String PACKING, Integer CART, Integer ORDERMAKR, String QUANTITY, String CURRENCY, Integer SEQNUM )
    {
        this.USERCOMPANY = USERCOMPANY;
        this.USERID = USERID;
        this.PRODUCT = PRODUCT;
        this.EDP = EDP;
        this.STANDARD = STANDARD;
        this.PRICE = PRICE;
		this.QUANTITY = QUANTITY;
		this.CURRENCY = CURRENCY;
        this.PACKING = PACKING;
        this.CART = CART;
        this.ORDERMARK = ORDERMAKR;
		this.SEQNUM = SEQNUM;
    }


	/**
	 * USERID - 유저 ID
	 * @return the uSERID
	 */	
	public String getUSERID() {
		return USERID;
	}
	/**
	 * USERID - 유저 ID
	 * @param uSERID the uSERID to set
	 */
	public void setUSERID(String uSERID) {
		USERID = uSERID;
	}
	/**
	 * PRODUCT - 제품
	 * @return the pRODUCT
	 */
	public String getPRODUCT() {
		return PRODUCT;
	}
	/**
	 * PRODUCT - 제품
	 * @param pRODUCT the pRODUCT to set
	 */
	public void setPRODUCT(String pRODUCT) {
		PRODUCT = pRODUCT;
	}
	/**
	 * EDPNO - 제품 번호
	 * @return the eDP
	 */
	public String getEDP() {
		return EDP;
	}
	/**
	 * EDPNO - 제품 번호
	 * @param eDP the eDP to set
	 */
	public void setEDP(String eDP) {
		EDP = eDP;
	}
	/**
	 * STANDARD - 제품 규격
	 * @return sTANDARD
	 */
	public String getSTANDARD() {
		return STANDARD;
	}
	/**
	 * STANDARD - 제품 규격
	 * @param sTANDARD the sTANDARD to set
	 */
	public void setSTANDARD(String sTANDARD) {
		STANDARD = sTANDARD;
	}
	/**
	 * PRICE - 제품 가격
	 * @return pRICE
	 */
	public Float getPRICE() {
		return PRICE;
	}
	/**
	 * PRICE - 제품 가격
	 * @param pRICE the pRICE to set
	 */
	public void setPRICE(Float pRICE) {
		PRICE = pRICE;
	}
	/**
	 * QUANTITY - 제품 단위
	 * @return qUANTITY
	 */
	public String getQUANTITY() {
		return QUANTITY;
	}
	/**
	 * QUANTITY - 제품 단위
	 * @param qUANTITY the qUANTITY to set
	 */
	public void setQUANTITY(String qUANTITY) {
		QUANTITY = qUANTITY;
	}
	/**
	 * 가격 단위
	 * @return cURRENCY
	 */
	public String getCURRENCY() {
		return CURRENCY;
	}
	/**
	 * 가격 단위
	 * @param cURRENCY the cURRENCY to set
	 */
	public void setCURRENCY(String cURRENCY) {
		CURRENCY = cURRENCY;
	}
	/**
	 * PACKING - 제품 포장단위
	 * @return pACKING
	 */
	public String getPACKING() {
		return PACKING;
	}
	/**
	 * PACKING - 제품 포장단위
	 * @param pACKING the pACKING to set
	 */
	public void setPACKING(String pACKING) {
		PACKING = pACKING;
	}
	/**
	 * CART - 장바구니 수량
	 * @return cART
	 */
	public Integer getCART() {
		return CART;
	}
	/**
	 * CART - 장바구니 수량
	 * @param cART the cART to set
	 */
	public void setCART(Integer cART) {
		CART = cART;
    }
    /**
     * USERCOMPANY - 사용자 지사코드
     * @return uSERCOMPANY
     */
    public String getUSERCOMPANY() {
        return USERCOMPANY;
    }
    /**
     * USERCOMPANY - 사용자 지사코드
     * @param uSERCOMPANY the uSERCOMPANY to set
     */
    public void setUSERCOMPANY(String uSERCOMPANY) {
        USERCOMPANY = uSERCOMPANY;
    }
    /**
     * ORDERMARK - 주요품목 여부
     * @return oRDERMARK
     */
    public Integer getORDERMARK() {
        return ORDERMARK;
    }
    /**
     * ORDERMARK - 주요품목 여부
     * @param oRDERMARK the oRDERMARK to set
     */
    public void setORDERMARK(Integer oRDERMARK) {
        ORDERMARK = oRDERMARK;
    }

	/**
     * SEQ - 장바구니 순서
     * @return oRDERMARK
     */
    public Integer getSEQNUM() {
        return SEQNUM;
    }
    /**
     * ORDERMARK - 장바구니 순서
     * @param oRDERMARK the oRDERMARK to set
     */
    public void setSEQNUM(Integer sEQNUM) {
        SEQNUM = sEQNUM;
    }

}