package com.yg1.yoswebapp.model;

/**
 * 일반 데이터 조회용 Import 모델
 */
public class ClassRealat
{
    /**
     * 부모분류
     */
	private String pClass;

	/**
     * 부모분류
     */
	private String pClassNM;

	/**
	 * 자식분류
	 */
	private String chClass;

	/**
	 * 자식분류
	 */
	private String chClassNM;

	/**
	 * 생성자
	 */
	public ClassRealat(String pCl, String chCl, String pClNM, String chClNM){
		this.pClass = pCl;
		this.chClass = chCl;
		this.pClassNM = pClNM;
		this.chClassNM = chClNM;
	}

	/**
	 * 부모분류
	 * @return
	 */
	public String getpClass(){
		return pClass;
	}

	/**
	 * 부모분류
	 * @param pClass
	 */
	public void setpClass(String pClass){
		this.pClass = pClass;
	}

	/**
	 * 부모분류
	 * @return
	 */
	public String getpClassNM(){
		return pClassNM;
	}

	/**
	 * 부모분류
	 * @param pClassNM
	 */
	public void setpClassNM(String pClassNM){
		this.pClassNM = pClassNM;
	}

	/**
	 * 자식분류
	 * @return
	 */
    public String getchClass() {
        return chClass;
    }

	/**
	 * 자식분류
	 * @param chClass
	 */
    public void setchClass(String chClass) {
        this.chClass = chClass;
	}
	
	/**
	 * 자식분류
	 * @return
	 */
    public String getchClassNM() {
        return chClassNM;
    }

	/**
	 * 자식분류
	 * @param chClassNM
	 */
    public void setchClassNM(String chClassNM) {
        this.chClassNM = chClassNM;
    }
}