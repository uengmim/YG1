package com.yg1.yoswebapp.model;

import java.io.Serializable;
import javax.persistence.Column;

/**
 * 주문조회용 Import 모델
 */
public class CondOrderInquery implements Serializable
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
     * 고객코드
     */
	@Column(name = "KUNAG")
	private String KUNAG;

	/**
	 * 유저아이디
	 */
	@Column(name = "USRID")
	private String USERID;

	/**
	 * 시작일
	 */
    @Column(name = "SDATE")
	private String SDATE;

	/**
	 * 종료일
	 */
	@Column(name = "EDATE")
	private String EDATE;

	/**
     * 오더번호
     */
	@Column(name = "ORDERNO")
	private String ORDERNO;

	/**
     * 날짜형태
     */
	@Column(name = "DFORM")
	private String DFORM;

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
	 * 고객코드
	 * @return
	 */
	public String getKUNAG(){
		return KUNAG;
	}

	/**
	 * 고객코드
	 * @param KUNAG
	 */
	public void setKUNAG(String KUNAG){
		this.KUNAG = KUNAG;
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
	 * 시작일
	 * @return
	 */
    public String getSDATE() {
        return SDATE;
    }

	/**
	 * 시작일
	 * @param SDATE
	 */
    public void setSDATE(String SDATE) {
        this.SDATE = SDATE;
	}
	
	/**
	 * 종료일
	 * @return
	 */
	public String getEDATE() {
        return EDATE;
    }

	/**
	 * 종료일
	 * @param EDATE
	 */
    public void setEDATE(String EDATE) {
        this.EDATE = EDATE;
	}

	/**
	 * 오더번호
	 * @return
	 */
	public String getORDERNO() {
        return ORDERNO;
    }

	/**
	 * 오더번호
	 * @param ORDERNO
	 */
    public void setORDERNO(String ORDERNO) {
        this.ORDERNO = ORDERNO;
	}

	/**
	 * 날짜형식
	 * @return
	 */
	public String getDFORM() {
        return DFORM;
    }

	/**
	 * 날짜형식
	 * @param DFORM
	 */
    public void setDFORM(String DFORM) {
        this.DFORM = DFORM;
	}
}