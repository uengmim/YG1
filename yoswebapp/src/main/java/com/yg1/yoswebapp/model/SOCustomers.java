package com.yg1.yoswebapp.model;

import java.io.Serializable;
import javax.persistence.Column;

public class SOCustomers implements Serializable
{
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	
	/**
     * 고객번호
     */
	@Column(name = "CUST")
	private String CUST;
	/**
	 * 고객명
	 */
	@Column(name = "CUSTNM")
	private String CUSTNM;

	/**
     * 전화번호
     */
	@Column(name = "TEL")
	private String TEL;

	/**
	 * 주소
	 */
	@Column(name = "ADDR")
	private String ADDR;

	/**
	 * 우편번호
	 */
	@Column(name = "POST")
	private String POST;

	/**
	 * 도시
	 */
	@Column(name = "CITY")
	private String CITY;

	/**
	 * 영업조직
	 */
	@Column(name = "SORG")
	private String SORG;

	/**
	 * 영업조직명
	 */
	@Column(name = "SORGNM")
	private String SORGNM;

	/**
	 * 유통경로
	 */
	@Column(name = "DCCODE")
	private String DCCODE;

	/**
	 * 유통경로명
	 */
	@Column(name = "DCNAME")
	private String DCNAME;

    /**
     * Sales Office
     */
	@Column(name = "SOCODE")
	private String SOCODE;
	/**
	 * Sales Office명
	 */
	@Column(name = "SONAME")
	private String SONAME;
	
	/**
	 * 고객코드
	 * @return
	 */
	public String getCUST() {
        return CUST;
    }

	/**
	 * 고객코드
	 * @param CUST
	 */
    public void setCUST(String CUST) {
        this.CUST = CUST;
	}

	/**
	 * 고객코드명
	 */
	public String getCUSTNM() {
        return CUSTNM;
    }

	/**
	 * 고객코드명
	 */
    public void setCUSTNM(String CUSTNM) {
        this.CUSTNM = CUSTNM;
	}
	
	/**
	 * 전화번호
	 * @return
	 */
	public String getTEL() {
        return TEL;
    }

	/**
	 * 전화번호
	 * @param TEL
	 */
    public void setTEL(String TEL) {
        this.TEL = TEL;
	}
	
	/**
	 * 주소
	 * @return
	 */
	public String getADDR() {
        return ADDR;
    }

	/**
	 * 주소
	 * @param ADDR
	 */
    public void setADDR(String ADDR) {
        this.ADDR = ADDR;
	}
	
	/**
	 * 우편번호
	 * @return
	 */
	public String getPOST() {
        return POST;
    }

	/**
	 * 우편번호
	 */
    public void setPOST(String POST) {
        this.POST = POST;
	}

	/**
	 * 도시
	 * @return
	 */
	public String getCITY() {
        return CITY;
    }

	/**
	 * 도시
	 */
    public void setCITY(String CITY) {
        this.CITY = CITY;
	}

	/**
	 * 영업조직
	 * @return
	 */
	public String getSORG() {
        return SORG;
    }

	/**
	 * 영업조직
	 * @param SORG
	 */
    public void setSORG(String SORG) {
        this.SORG = SORG;
	}

	/**
	 * 영업조직명
	 * @return
	 */
	public String getSORGNM() {
        return SORGNM;
    }

	/**
	 * 영업조직명
	 * @param SORGNM
	 */
    public void setSORGNM(String SORGNM) {
        this.SORGNM = SORGNM;
	}

	/**
	 * 유통경로
	 * @return
	 */
	public String getDCCODE() {
        return DCCODE;
    }

	/**
	 * 유통경로
	 * @param DCCODE
	 */
    public void setDCCODE(String DCCODE) {
        this.DCCODE = DCCODE;
	}

	/**
	 * 유통경로명
	 * @return
	 */
	public String getDCNAME() {
        return DCNAME;
    }

	/**
	 * 유통경로명
	 * @param DCNAME
	 */
    public void setDCNAME(String DCNAME) {
        this.DCNAME = DCNAME;
	}

	/**
	 * Sales Office
	 * @return
	 */
	public String getSOCODE(){
		return SOCODE;
	}

	/**
	 * Sales Office
	 */
	public void setSOCODE(String SOCODE){
		this.SOCODE = SOCODE;
	}

	/**
	 * Sales Office명
	 * @return
	 */
    public String getSONAME() {
        return SONAME;
    }

	/**
	 * Sales Office명
	 * @param SONAME
	 */
    public void setSONAME(String SONAME) {
        this.SONAME = SONAME;
	}
}