package com.yg1.yoswebapp.sapA1;

/**
 * SAP A1 Profile
 */
public class SapA1Profile
{
    /**
     * 설명
     */
    private String desc;
    /**
     * Application Host
     */
    private String ashost;
    /**
     * 시스템 번호
     */
    private String sysnr;
    /**
     * Client
     */
    private String client;
    /**
     * 언어
     */
    private String lang;
    /**
     * USER ID
     */
    private String user;
    /**
     * PASSWORD
     */
    private String passwd;
    /**
     * PLANT
     */
    private String plant;

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
     * Application Host
	 * @return the asHost
	 */
	public String getAshost() {
		return ashost;
	}


	/**
     * Application Host
	 * @param asHost the asHost to set
	 */
	public void setAshost(String asHost) {
		this.ashost = asHost;
	}
    /**
     * 시스템 번호(인스턴스 번호)
     * @return the sysnr
     */
    public String getSysnr() {
        return sysnr;
    }

    /**
     * 시스템 번호(인스턴스 번호)
     * @param sysnr the sysnr to set
     */
    public void setSysnr(String sysnr) {
        this.sysnr = sysnr;
    }

    /**
     * CLIENT
     * @return the client
     */
    public String getClient() {
        return client;
    }

    /**
     * CLIENT
     * @param client the client to set
     */
    public void setClient(String client) {
        this.client = client;
    }

    /**
     * 언어
     * @return the lang
     */
    public String getLang() {
        return lang;
    }

    /**
     * 언어
     * @param lang the lang to set
     */
    public void setLang(String lang) {
        this.lang = lang;
    }

    /**
     * USER ID
     * @return the user
     */
    public String getUser() {
        return user;
    }

    /**
     * USER ID
     * @param user the user to set
     */
    public void setUser(String user) {
        this.user = user;
    }

    /**
     * PASSWORD
     * @return the passwd
     */
    public String getPasswd() {
        return passwd;
    }

    /**
     * PASSWORD
     * @param passwd the passwd to set
     */
    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    /**
     * PLANT
     * @return the plant
     */
    public String getPlant() {
        return plant;
    }

    /**
     * PLANT
     * @param plant the plant to set
     */
    public void setPlant(String plant) {
        this.plant = plant;
    }
}