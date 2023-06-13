package com.yg1.yoswebapp.model;

import java.io.Serializable;
import javax.persistence.Column;

public class CompanyInfo implements Serializable
{
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	
	public CompanyInfo(){
		
	}
    
    /**
     * 회사코드
     */
	@Column(name = "COMP")
	private String COMP;
	/**
	 * 회사코드명
	 */
	@Column(name = "COMPNM")
	private String COMPNM;
	
	/**
	 * 영업조직
	 */
	@Column(name = "VKORG")
	private String VKORG;
	/**
	 * 영업조직명
	 */
	@Column(name = "VKORGNM")
    private String VKORGNM;

	/**
	 * 회사코드
	 * @return
	 */
	public String getCOMP(){
		return COMP;
	}

	/**
	 * 회사코드
	 */
	public void setCOMP(String comp){
		this.COMP = comp;
	}

	/**
	 * 회사명
	 * @return
	 */
	public String getCOMPNM(){
		return COMPNM;
	}

	/**
	 * 회사명
	 */
	public void setCOMPNM(String compnm){
		this.COMPNM = compnm;
	}

	/**
	 * 영업조직
	 * @return
	 */
	public String getVKORG(){
		return VKORG;
	}

	/**
	 * 영업조직
	 * @param VKORG
	 */
	public void setVKORG(String VKORG){
		this.VKORG = VKORG;
	}

	/**
	 * 영업조직명
	 */
	public String getVKORGNM(){
		return VKORGNM;
	}

	/**
	 * 영업조직명
	 */
	public void setVKORGNM(String VKORGNM){
		this.VKORGNM = VKORGNM;
	}
}