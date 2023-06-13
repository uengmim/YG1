package com.yg1.yoswebapp.model;

import java.io.Serializable;
import javax.persistence.Column;

/**
 * 일반 데이터 조회용 Import 모델
 */
public class COMP implements Serializable
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
	@Column(name = "USRID")
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
	 * Sales Office
	 */
	@Column(name = "SOCODE")
	private String SOCODE;

	/**
	 * 고객코드
	 */
	@Column(name = "CUST")
	private String CUST;

	/**
	 * 전체조회여부
	 */
	@Column(name = "CALL")
	private Boolean CALL;

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
    public String getUSERID() {
        return USERID;
    }

	/**
	 * 유저아이디
	 * @param USERID
	 */
    public void setUSERID(String USERID) {
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
	 * Sales Office
	 * @return
	 */
	public String getSOCODE() {
        return SOCODE;
    }

	/**
	 * Sales Office
	 * @param SOCODE
	 */
    public void setSOCODE(String SOCODE) {
        this.SOCODE = SOCODE;
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
	 * 전체조회여부
	 * @return
	 */
	public Boolean getCALL() {
        return CALL;
    }

	/**
	 * 전체조회여부
	 */
    public void setCALL(Boolean CALL) {
        this.CALL = CALL;
    }
}