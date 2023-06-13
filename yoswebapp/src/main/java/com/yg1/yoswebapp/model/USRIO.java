package com.yg1.yoswebapp.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 사용자 테이블
 */
@Entity
@Table(name = "USRIO")
public class USRIO {

	/**
	 * 사용자 ID
	 */
	@Id
	private String USRID;
	/**
	 * 사용자 PW
	 */
	@JsonIgnore
	private String USRPW;
	/**
	 * 사용자 권한
	 */
	private String USRAU;
	/**
	 * 사용자 언어
	 */
	private String USRLA;
	/**
	 * 사용자 회사코드
	 */
	private String USRCO;
	/**
	 * 사용자 부서코드
	 */
	private String USRPL;
	/**
	 * 사용자 번호
	 */
	private String USRNO;
	/**
	 * 사용자 유통경로
	 */
	private String USRDC;

	/**
	 * 사용자 이름
	 */
	private String USRNM;

	public String getUSRID() {
		return USRID;
	}

	public String getUSRDC() {
		return USRDC;
	}

	public void setUSRDC(String uSRDC) {
		this.USRDC = uSRDC;
	}

	public String getUSRNO() {
		return USRNO;
	}

	public void setUSRNO(String uSRNO) {
		this.USRNO = uSRNO;
	}

	public String getUSRPL() {
		return USRPL;
	}

	public void setUSRPL(String uSRPL) {
		this.USRPL = uSRPL;
	}

	public String getUSRCO() {
		return USRCO;
	}

	public void setUSRCO(String uSRCO) {
		this.USRCO = uSRCO;
	}

	public String getUSRLA() {
		return USRLA;
	}

	public void setUSRLA(String uSRLA) {
		this.USRLA = uSRLA;
	}

	public String getUSRAU() {
		return USRAU;
	}

	public void setUSRAU(String uSRAU) {
		this.USRAU = uSRAU;
	}

	public String getUSRPW() {
		return USRPW;
	}

	public void setUSRPW(String uSRPW) {
		this.USRPW = uSRPW;
	}

	public void setUSRID(String uSRID) {
		this.USRID = uSRID;
	}

	public String getUSRNM(){
		return USRNM;
	}

	public void setUSRNM(String uSRNM){
		this.USRNM = uSRNM;
	}

}