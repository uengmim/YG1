package com.example.demo.model;

public class ErrorMsg {
	private Boolean blCode;
	private String errMsg;
	

	public ErrorMsg(Boolean blCode, String errMsg) {
		super();
		this.blCode = blCode;
		this.errMsg = errMsg;
	}

	public Boolean getBlCode(){
        return blCode;
    }
    public void setBlCode(Boolean blCode){
        this.blCode = blCode;
    }

    public String getErrMsg(){
        return errMsg;
	}
	
    public void setErrMsg(String errMsg){
        this.errMsg = errMsg;
    }
}
