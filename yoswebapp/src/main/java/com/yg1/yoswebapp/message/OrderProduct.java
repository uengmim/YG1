package com.yg1.yoswebapp.message;

/**
 * 주문 제품(아이템)
 */
public class OrderProduct {
    /** 주문번호 */
    private String orderNo;
    /** 순번 */
    private int seq;
    /** 제품코드 */
    private String productCode;
    /** 비고(코멘트) */
    private String remark;

	/**
     * 주문 번호
	 * @return 주문번호
	 */
	public String getOrderNo() {
		return orderNo;
    }
    
	/**
     * 주문번호
	 * @param orderNo 주문번호
	 */
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
    }
    
	/**
     * 순번
	 * @return 순번
	 */
	public int getSeq() {
		return seq;
    }
    
	/**
     * 순번
	 * @param seq 순번
	 */
	public void setSeq(int seq) {
		this.seq = seq;
    }
    
	/**
     * 제품코드
	 * @return 제품코드
	 */
	public String getProductCode() {
		return productCode;
    }
    
	/**
     * 제품코드
	 * @param productCode 제품코드
	 */
	public void setProductCode(String productCode) {
		this.productCode = productCode;
    }
    
	/**
     * 비고
	 * @return 비고
	 */
	public String getRemark() {
		return remark;
    }
    
	/**
     * 비고
	 * @param remark 비고
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
}