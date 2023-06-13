package com.yg1.yoswebapp.model;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.Column;

/**
 * 제품 목록용 Import 모델
 */
public class COMPM implements Serializable
{
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
    
    /**
     * 회사코드
     */
	@Column(name = "COMP")
	private String COMP;

	/**
     * 언어코드
     */
	@Column(name = "LANG")
	private String LANG;

	/**
     * 유저아이디
     */
	@Column(name = "USERID")
	private String USERID;

	/**
	 * 제품코드
	 */
    @Column(name = "EDPNO")
	private String EDPNO;

	/**
	 * 제품명
	 */
	@Column(name = "EDPNM")
	private String EDPNM;

	/**
	 * 고객코드
	 */
	@Column(name = "CUST")
	private String CUST;

	/**
	 * 대분류
	 */
	@Column(name = "ACLASS")
	private String ACLASS;

	/**
	 * 중분류
	 */
	@Column(name = "BCLASS")
	private String BCLASS;

	/**
	 * 소분류
	 */
	@Column(name = "CCLASS")
	private String CCLASS;

	/**
	 * 제품코드리스트
	 */
	@Column(name = "CONDM")
	private ArrayList<String> CONDM;

	/**
	 * 회사코드
	 * @return
	 */
	public String getCOMP(){
		return COMP;
	}

	/**
	 * 회사코드
	 * @param COMP
	 */
	public void setCOMP(String COMP){
		this.COMP = COMP;
	}

	/**
	 * 언어코드
	 * @return
	 */
	public String getLANG(){
		return LANG;
	}

	/**
	 * 언어코드
	 * @param LANG
	 */
	public void setLANG(String LANG){
		this.LANG = LANG;
	}

	/**
	 * 유저아이디
	 * @return
	 */
	public String getUSERID(){
		return USERID;
	}

	/**
	 * 유저아이디
	 * @param USERID
	 */
	public void setUSERID(String USERID){
		this.USERID = USERID;
	}

	/**
	 * EDPNO
	 * @return
	 */
    public String getEDPNO() {
        return EDPNO;
    }

	/**
	 * EDPNO
	 * @param EDPNO
	 */
    public void setEDPNO(String EDPNO) {
        this.EDPNO = EDPNO;
	}
	
	/**
	 * 제품명
	 * @return
	 */
	public String getEDPNM() {
        return EDPNM;
    }

	/**
	 * 제품명
	 * @param EDPNM
	 */
    public void setEDPNM(String EDPNM) {
        this.EDPNM = EDPNM;
	}

	/**
	 * 고객코드
	 * @return
	 */
	public String getCUST() {
        return CUST;
    }

	/**
	 * 고객코드
	 */
    public void setCUST(String CUST) {
        this.CUST = CUST;
	}

	/**
	 * 대분류
	 * @return
	 */
	public String getACLASS() {
        return ACLASS;
    }

	/**
	 * 대분류
	 */
    public void setACLASS(String ACLASS) {
        this.ACLASS = ACLASS;
	}

	/**
	 * 중분류
	 * @return
	 */
	public String getBCLASS() {
        return BCLASS;
    }

	/**
	 * 중분류
	 */
    public void setBCLASS(String BCLASS) {
        this.BCLASS = BCLASS;
	}

	/**
	 * 소분류
	 * @return
	 */
	public String getCCLASS() {
        return CCLASS;
    }

	/**
	 * 소분류
	 */
    public void setCCLASS(String CCLASS) {
        this.CCLASS = CCLASS;
	}
	
	/**
	 * 제품코드리스트
	 * @return
	 */
	public ArrayList<String> getCONDM() {
        return CONDM;
    }

	/**
	 * 제품코드리스트
	 */
    public void setCONDM(ArrayList<String> CONDM) {
        this.CONDM = CONDM;
    }
}