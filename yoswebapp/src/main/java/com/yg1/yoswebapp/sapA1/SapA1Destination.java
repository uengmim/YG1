package com.yg1.yoswebapp.sapA1;

import java.util.HashMap;
import java.util.Properties;

import com.sap.conn.jco.ext.DataProviderException;
import com.sap.conn.jco.ext.DestinationDataEventListener;
import com.sap.conn.jco.ext.DestinationDataProvider;
import com.yg1.yoswebapp.YOSWebApplication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * sapA1 목적지
 */
public class SapA1Destination implements DestinationDataProvider
{
    private DestinationDataEventListener eL;
    private HashMap<String, Properties> secureDBStorage=new HashMap<String, Properties>();

    /**
     * 로그
     */
    private static final Logger log = LoggerFactory.getLogger(YOSWebApplication.class);
    
    /**
     * SAP 목적지의 Property를 반환 한다.
     * 
     */
	@Override
	public Properties getDestinationProperties(String destinationName) throws DataProviderException {
        try
        {
            // 프러퍼티를 DB에서 읽어 온다.
            log.info(destinationName);
            Properties prop = secureDBStorage.get(destinationName);

            // 프로퍼티가 얼바른지 Check
            if (prop !=null && prop.isEmpty())
                throw new DataProviderException(DataProviderException.Reason.INVALID_CONFIGURATION,
                        "destination configuration is incorrect", null);

            return prop;
        }
        catch (RuntimeException re)
        {
            throw new DataProviderException(DataProviderException.Reason.INTERNAL_ERROR, re);
        }
	}

	/**
	 *  목적지 변경 이벤트
	 * 
	 */
	@Override
	public void setDestinationDataEventListener(DestinationDataEventListener eventListener) {
		this.eL = eventListener;
	}

	/**
	 * 이벤트 지원 여부
	 * 
	 */
	@Override
	public boolean supportsEvents() {
		return true;
	}

    /**
     * InMemory 구성 처리
     * 
     * @param destName
     * @param properties
     */
    void changeProperties(String destName, Properties properties)
    {
        synchronized (secureDBStorage)
        {
            if (properties==null)
            {
                if (secureDBStorage.remove(destName)!=null)
                    eL.deleted(destName);
            }
            else
            {
                log.info(String.format("%s//%s", destName, properties));
                secureDBStorage.put(destName, properties);
                eL.updated(destName); 
            }
        }
    }
    
    /**
     * InMemory 구성 처리
     * 
     * @param destName
     * @param profile
     */
    void changeProperties(String destName,  SapA1Profile profile)
    {
		Properties connectProp = new Properties();
		
		connectProp.setProperty(DestinationDataProvider.JCO_ASHOST, profile.getAshost());
		connectProp.setProperty(DestinationDataProvider.JCO_SYSNR, profile.getSysnr());
		connectProp.setProperty(DestinationDataProvider.JCO_LANG,  profile.getLang());

		connectProp.setProperty(DestinationDataProvider.JCO_CLIENT, profile.getClient());
		connectProp.setProperty(DestinationDataProvider.JCO_USER,  profile.getUser());
		connectProp.setProperty(DestinationDataProvider.JCO_PASSWD, profile.getPasswd());
         
        log.info(String.format("%s//%s", destName, connectProp));
    	changeProperties(destName, connectProp);
    }    
}