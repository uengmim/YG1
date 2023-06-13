package com.yg1.yoswebapp.sapA1;

import java.nio.file.*;
import java.util.Properties;

import com.google.gson.Gson;

import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoRepository;
import com.sap.conn.jco.ext.Environment;
import com.yg1.yoswebapp.YOSWebApplication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * SAP A1 Client
 */
public class SapA1Client {
    /**
     * Application Startup 디렉토리
     */
    private static String startupDirectory = System.getProperty("user.dir");

    /**
     * 목적지
     */
    private static SapA1Destination destination = null;

    /**
     * 목적지 이름
     */
    private String destName = "";

    /**
     * SAP Client
     */
    private JCoDestination client = null;

    /**
     * SAP Repository
     */
    private JCoRepository repository = null;

    /**
     * 로그
     */
    private static final Logger log = LoggerFactory.getLogger(YOSWebApplication.class);

    /**
     * 생성자
     * 
     * @param profileName 프로파일 이름
     * @throws Exception
     */
    public SapA1Client(String profileName) throws Exception {
        String profileData = new String(Files
                    .readAllBytes(Paths.get(String.format("%s/src/main/resources/%s.json", startupDirectory, profileName))));

        Gson gson = new Gson();
        SapA1Profile profile = gson.fromJson(profileData, SapA1Profile.class);
        
        Login(profileName, profile);
    }

    /**
	 * SAP Client에 Logoin한다.
	 * 
	 * @param poolName Pool이름
	 * @param profile 로그인 정보
     * @throws Exception
	 * 
	 */
	public void Login(String poolName, SapA1Profile profile) throws Exception
	{
		try
		{
        
            destName = poolName;
			if(destination == null)
			{			
                destination = new SapA1Destination();
                try{
                    log.info(destination.toString());
                    Environment.registerDestinationDataProvider(destination);
                }catch(Exception e ){
                    log.info(e.getMessage());
                }
                
			}
			
			try
	        {
                log.info(String.format("%s//%s", destName, profile));
				destination.changeProperties(destName, profile);	
	        }
	        catch (IllegalStateException providerAlreadyRegisteredException)
	        {
	            //이오류는 무시 한다.
	        }
			catch(Exception _ex)
			{
				throw _ex;
			}
			
			Create();
		}
		catch(Exception _ex)
		{
			throw _ex;
		}
    }
    
    /**
	 * Client 와 Repository 를 생성 한다.
	 * 
	 * @return JCO Client
     * @throws JCoException
	 */
	public JCoDestination Create() throws JCoException
	{
		try
		{
            log.info(destName);
			client = JCoDestinationManager.getDestination(destName);
			client.ping();
			
			repository = client.getRepository();
			
		    return client;
        }
		catch(Exception ex)
		{
			throw ex;
		}
	}    

    /**
     * SAP Clinet를 Clear한다.
     * 
     * @throws Exception
     */
	public void clearSAPCLIENT() throws Exception
	{
		try
		{
			if(destination != null)
			{			
                Properties prop = null;
                destination.changeProperties(destName, prop);
                Environment.unregisterDestinationDataProvider(destination);
                destination = null;
			}
		}
		catch(Exception _ex)
		{
			throw _ex;
		}
    }
    
    /**
     * SAP Repository를 반환 한다.
     * @return SAP 레포지토리
     */
    public JCoRepository getRepository()
    {
        return repository;
    }

    /**
     * SAP Client(Destnation)
     * 
     * @return SAP
     */
    public JCoDestination getClient()
    {
        return client;
    }
}