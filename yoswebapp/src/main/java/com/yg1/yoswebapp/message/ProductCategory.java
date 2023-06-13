package com.yg1.yoswebapp.message;

/**
 * 제춤 카테고리
 */
public class ProductCategory {
    /** 대분류 */
    private String aClass;  

    /** 중분류 */
    private String bClass;

    /** 소분류 */
    private String cClass;

    /** 대분류명 */
    private String aClassName;

    /** 중분류명 */
    private String bClassName;

    /** 소분류명 */
    private String cClassName;

    public ProductCategory(){}

    public ProductCategory(String acl, String acln, String bcl, String bcln, String ccl, String ccln){
        this.aClass = acl;   
        this.bClass = bcl;
        this.cClass = ccl;
        this.aClassName = acln;
        this.bClassName = bcln;
        this.cClassName = ccln;
    }

    /**
     * 대분류
     * @return 대분류
     */
    public String getaClass() {
        return aClass;
    }

    /**
     * 대분류
     * @param aClass 대분류
     */
    public void setaClass(String aClass) {
        this.aClass = aClass;
    }

    /**
     * 대분류명
     * @return 대분류명
     */
    public String getaClassName() {
        return aClassName;
    }

    /**
     * 대분류명
     * @param aClassName 대분류명
     */
    public void setaClassName(String aClassName) {
        this.aClassName = aClassName;
    }

    /**
     * 중분류
     * @return 중분류
     */
    public String getbClass() {
        return bClass;
    }

    /**
     * 중분류
     * @param bClass 중분류
     */
    public void setbClass(String bClass) {
        this.bClass = bClass;
    }

    /**
     * 중분류명
     * @return 중분류명
     */
    public String getbClassName() {
        return bClassName;
    }

    /**
     * 중분류명
     * @param bClassName 중분류명
     */
    public void setbClassName(String bClassName) {
        this.bClassName = bClassName;
    }

    /**
     * 소분류
     * @return 소분류
     */
    public String getcClass() {
        return cClass;
    }

    /**
     * 소분류
     * @param cClass 소분류
     */
    public void setcClass(String cClass) {
        this.cClass = cClass;
    }

    /**
     * 소분류명
     * @return 소분류명
     */
    public String getcClassName() {
        return cClassName;
    }

    /**
     * 소분류명
     * @param cClassName 소분류명
     */
    public void setcClassName(String cClassName) {
        this.cClassName = cClassName;
    }
}
