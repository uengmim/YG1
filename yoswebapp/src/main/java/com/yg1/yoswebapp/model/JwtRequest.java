package com.yg1.yoswebapp.model;

import java.io.Serializable;

public class JwtRequest implements Serializable {

	private static final long serialVersionUID = 5926468583005150707L;

	private String USRID;
	private String USRPW;

	// need default constructor for JSON Parsing
	public JwtRequest() {

	}
	public JwtRequest(String USRID, String USRPW) {
		this.setUSRID(USRID);
		this.setUSRPW(USRPW);
	}

	public String getUSRPW() {
		return USRPW;
	}

	public void setUSRPW(String uSRPW) {
		this.USRPW = uSRPW;
	}

	public String getUSRID() {
		return USRID;
	}

	public void setUSRID(String uSRID) {
		this.USRID = uSRID;
	}

	

	
}