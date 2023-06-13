package com.yg1.yoswebapp.model;

import java.io.Serializable;
import javax.persistence.Column;

public class ShiptoParty implements Serializable
{
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	
	/**
     * 고객번호
     */
	@Column(name = "STP")
	private String STP;
	/**
	 * 고객명
	 */
	@Column(name = "STPNM")
	private String STPNM;

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
	 * 배송지코드
	 * @return
	 */
	public String getSTP() {
        return STP;
    }

	/**
	 * 배송지코드
	 * @param CUST
	 */
    public void setSTP(String STP) {
        this.STP = STP;
	}

	/**
	 * 배송지명
	 */
	public String getSTPNM() {
        return STPNM;
    }

	/**
	 * 배송지명
	 */
    public void setSTPNM(String STPNM) {
        this.STPNM = STPNM;
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
}