package com.yg1.yoswebapp.model;

import java.io.Serializable;
import javax.persistence.Column;

public class SalesOffice implements Serializable
{
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
    
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
	 * Sales Office
	 */
	public String getSOCODE(){
		return SOCODE;
	}

	/**
	 * Sales Office
	 * @param SOCODE
	 */
	public void setSOCODE(String SOCODE){
		this.SOCODE = SOCODE;
	}

	/**
	 * Sales Office명
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