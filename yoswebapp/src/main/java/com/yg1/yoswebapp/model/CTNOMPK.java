package com.yg1.yoswebapp.model;

import java.io.Serializable;

import javax.persistence.Column;



public class CTNOMPK implements Serializable{
  
    /**
     * PK 2개 사용
     */
    private static final long serialVersionUID = 1L;
    @Column(name = "USRID")
    String USERID;
    @Column(name = "EDPNO")
    String EDP;

    public String getUSERID() {
        return USERID;
    }

    public void setUSERID(String uSERID) {
        USERID = uSERID;
    }

    public String getEDP() {
        return EDP;
    }

    public void setEDP(String eDP) {
        EDP = eDP;
    }
}