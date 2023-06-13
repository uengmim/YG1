package com.yg1.yoswebapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * JPA TEST TABLE
 */
@Entity
@Table(name="JPATEST")
public class JpaTest
{
    /**
     * 사용자ID
     */
    @Id
    private String USERID;
    /**
     * 사용자 이름
     */
    @Column(name = "USERNM")
    private String USERNM;
    /**
     * Company ID
     */
    private String COMPID;

    /**
     * 기본 생성자
     */
    public JpaTest()
    {
        this.USERID = null;
        this.USERNM = null;
        this.COMPID = null;        
    }
    /**
     * 생성자
     */
    public JpaTest(String userId, String userName, String companyId)
    {
        this.USERID = userId;
        this.USERNM = userName;
        this.COMPID = companyId;
    }

    /**
     *  사용자ID
     * @return the uSERID
     */
    public String getUSERID() {
        return USERID;
    }

    /**
     *  사용자ID
     * @param uSERID the uSERID to set
     */
    public void setUSERID(String uSERID) {
        USERID = uSERID;
    }

    /**
     * 사용자 이름
     * @return the uSERNM
     */
    public String getUSERNM() {
        return USERNM;
    }

    /**
     * 사용자 이름
     * @param uSERNM the uSERNM to set
     */
    public void setUSERNM(String uSERNM) {
        USERNM = uSERNM;
    }

    /**
     * Company ID
     * @return the cOMPID
     */
    public String getCOMPID() {
        return COMPID;
    }

    /**
     * Company ID
     * @param cOMPID the cOMPID to set
     */
    public void setCOMPID(String cOMPID) {
        COMPID = cOMPID;
    }
    
}