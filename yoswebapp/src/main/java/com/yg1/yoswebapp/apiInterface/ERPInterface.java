package com.yg1.yoswebapp.apiInterface;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import java.nio.file.*;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.Type;

import com.google.gson.reflect.TypeToken;
import com.google.gson.Gson;

import com.yg1.yoswebapp.message.*;
import com.yg1.yoswebapp.model.CompanyInfo;
import com.yg1.yoswebapp.model.SOCustomers;
import com.yg1.yoswebapp.model.SalesOffice;
import com.yg1.yoswebapp.model.ShiptoParty;;

/**
 * ERP Interface Class
 */
public class ERPInterface {
    /**
     * Application Startup 디렉토리
     */
    private static String startupDirectory = System.getProperty("user.dir");

    /**
     * ERP Profile 리스트
     */
    private List<ERPProfile> profileList = null;
    /**
     * ERP 프로파일
     */
    private ERPProfile profile = null;
    /**
     * ERP Interface
     */
    private IERP iERP = null;

    /**
     * 생성자
     * 
     * @throws IOException
     */
    public ERPInterface() throws IOException
    {
        String profileData = new String(Files
                    .readAllBytes(Paths.get(String.format("%s/src/main/resources/erp.json", startupDirectory))));

        Type listType = new TypeToken<ArrayList<ERPProfile>>(){}.getType();

        Gson gson = new Gson();
        profileList = gson.fromJson(profileData, listType);
    }

    /**
     * EPR를 로드 한다.
     * @param companyId 회사 ID
     * @throws Exception
     */
    public void LoadERP(String companyId) throws Exception
    {
        try
        {
            profileList.forEach(item->
            {
                if(item.getCompanyId().equals(companyId))
                    profile = item;
            });

            if(profile == null)
                throw new Exception(String.format("CompayId '%s' ERP Profile not found ", companyId));
            
            Constructor<?> erpModuleConst = Class.forName(profile.getErpClass()).getConstructor();
            iERP = (IERP)erpModuleConst.newInstance();
            iERP.LoadERPClient(profile.getErpProfile());
        }
        catch(Exception ex)
        {
            throw ex;
        }
    }

    /**
     * 사용 회사코드를 체크한다.
     * @param companyId 회사 ID
     * @throws Exception
     */
    public ArrayList<CompanyInfo> CheckComp(ArrayList<CompanyInfo> CompList) throws Exception
    {
        ArrayList<CompanyInfo> compl = new ArrayList<CompanyInfo>();
        try
        {
            profileList.forEach(item->
            {
                Optional<CompanyInfo> fi = CompList.stream().filter(t->t.getCOMP().equals(item.getCompanyId())).findFirst();
                if(fi.isPresent()){
                    CompanyInfo ci = new CompanyInfo();
                    ci.setCOMP(fi.get().getCOMP());
                    ci.setCOMPNM(fi.get().getCOMPNM());
                    ci.setVKORG(fi.get().getVKORG());
                    ci.setVKORGNM(fi.get().getVKORGNM());
                    compl.add(ci);
                }
            });

            return compl;
        }
        catch(Exception ex)
        {
            throw ex;
        }
    }

    /**
     * 마지막 오류
     * @return 마지막 오류
     */
    public Result getLastError()
    {
        return iERP.getLastError();
    }

     /**
     * ERP 연결
     * @return 성공 하면 True, 실패하면 False.오류는 getLastError()로 확인함
     */
    public boolean ERPConnect()
    {
        return iERP.ERPConnect();
    }

    /**
     * ERP 연결 해제
     * @return 성공 하면 True, 실패하면 False.오류는 getLastError()로 확인함
     */    
    public boolean ERPDisConnect()
    {
        return iERP.ERPDisConnect();
    }

    /**
     * 제품 목록 
     * @param companyCode 회사코드
     * @param STP 배송지
     * @param aClass 대분류
     * @param bClass 중분류
     * @param cClass 소분류
     * @return 제품 주문 목록, 결과는 getLastError()로 확인
     */
    public ArrayList<Product> ProcuctList(String companyCode, String STP, String aClass, String bClass, String cClass, HashMap<String,String> cntInfo,  String language) throws Exception
    {
        // if(!hsMap.isEmpty()){            
        //     return iERP.ProcuctList(companyCode, STP, aClass, bClass, cClass, hsMap, language);
        // }
        
        return iERP.ProcuctList(companyCode, STP, aClass, bClass, cClass, cntInfo, language);
    }

    /**
     * 제품 목록 (제품코드)
     * @param companyCode 회사코드
     * @param STP 배송지
     * @param EDPNO 제품코드
     * @return 제품 주문 목록, 결과는 getLastError()로 확인
     */
    public ArrayList<Product> ProcuctList(String companyCode, String STP, String EDPNO,  String language) throws Exception
    {
        return iERP.ProcuctList(companyCode, STP, EDPNO, language);
    }

    /**
     * 제품 목록 (제품코드)
     * @param companyCode 회사코드
     * @param STP 배송지
     * @param EDPNO 제품코드
     * @param EDPNM 제품명
     * @return 제품 주문 목록, 결과는 getLastError()로 확인
     */
    public ArrayList<Product> ProcuctList(String companyCode, String STP, String EDPNO, String EDPNM, String language) throws Exception
    {
        return iERP.ProcuctList(companyCode, STP, EDPNO, EDPNM, language);
    }

    /**
     * 제품 카테고리
     * @param companyCode 회사코드
     * @return 제품 카테고리 목록, 결과는 getLastError()로 확인
     */
    public ArrayList<ProductCategory> ProcuctCategoryList(String companyCode, String language) throws Exception
    {
        return iERP.ProcuctCategoryList(companyCode, language);
    }

    /**
     * 제품주문전송
     * @param CreateOrderList
     * @return
     * @throws Exception
     */
    public Result SendProductOrder(CreateOrder CreateOrderList, String orderNO) throws Exception
    {
        return iERP.SendProductOrder(CreateOrderList, orderNO);
    }          
    
    /**
     * 회사정보
     * @param COMP
     * @return
     * @throws Exception
     */
    public ArrayList<CompanyInfo> CompInfo(String COMP, Boolean CALL) throws Exception
    {
        return iERP.CompInfo(COMP, CALL);
    }

    /**
     * Sales Office 정보
     */
    public ArrayList<SalesOffice> SalesOfficeInfo(String COMP, String SOCODE) throws Exception
    {
        return iERP.SalesOfficeInfo(COMP, SOCODE);
    }

    /**
     * Sales Office 정보
     */
    public ArrayList<SOCustomers> SOCustomersInfo(String COMP, String SOCODE, String CUST) throws Exception
    {
        return iERP.SOCustomersInfo(COMP, SOCODE, CUST);
    }

    /**
     * 배송지 정보
     */
    public ArrayList<ShiptoParty> ShiptoPartyInfo(String COMP, String CUST) throws Exception
    {
        return iERP.ShiptoPartyInfo(COMP, CUST);
    }

    /**
     * 주문조회
     */
    public ArrayList<OrderInquery> OrderInquery(String COMP, String KUNAG, String USERID, String SDATE, String EDATE, String ORDERNO, String DFORM) throws Exception
    {
        return iERP.OrderInquery(COMP, KUNAG, USERID, SDATE, EDATE, ORDERNO, DFORM);
    }
}