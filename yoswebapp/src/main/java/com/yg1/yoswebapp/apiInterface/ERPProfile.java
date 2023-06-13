package com.yg1.yoswebapp.apiInterface;

/**
 * ERP Profile
 */
public class ERPProfile
{
    /**
     * Company Id(KEY)
     */
    private String companyId;
    /**
     * 설명
     */
    private String desc;
    /**
     * ERP Java Class
     */
    private String erpClass;
    /**
     * ERP Profile(.json 생략)
     */
    private String erpProfile;

    /**
     * Company Id
     * @return the companyId
     */
    public String getCompanyId() {
        return companyId;
    }

    /**
     * Company Id
     * @param companyId the companyId to set
     */
    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    /**
     * 설명
     * @return the desc
     */
    public String getDesc() {
        return desc;
    }

    /**
     * 설명
     * @param desc the desc to set
     */
    public void setDesc(String desc) {
        this.desc = desc;
    }

    /**
     * ERP Java Class
     * @return the erpClass
     */
    public String getErpClass() {
        return erpClass;
    }

    /**
     * ERP Java Class
     * @param erpClass the erpClass to set
     */
    public void setErpClass(String erpClass) {
        this.erpClass = erpClass;
    }

    /**
     * ERP Profile(.json 생략)
     * @return the erpProfile
     */
    public String getErpProfile() {
        return erpProfile;
    }

    /**
     * ERP Profile(.json 생략)
     * @param erpProfile the erpProfile to set
     */
    public void setErpProfile(String erpProfile) {
        this.erpProfile = erpProfile;
    }
}