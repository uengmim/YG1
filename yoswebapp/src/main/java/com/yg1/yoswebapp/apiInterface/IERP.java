package com.yg1.yoswebapp.apiInterface;

import java.util.ArrayList;
import java.util.HashMap;

import com.yg1.yoswebapp.message.*;
import com.yg1.yoswebapp.model.CompanyInfo;
import com.yg1.yoswebapp.model.SOCustomers;
import com.yg1.yoswebapp.model.SalesOffice;
import com.yg1.yoswebapp.model.ShiptoParty;

/**
 * ERP 인터페이스
 */
public interface IERP {

    /**
     * ERP Client를 LOAD한다.
     * @param profileName
     */
    public void LoadERPClient(String profileName) throws Exception;

    /**
     * 마지막 오류
     * @return 마지막 오류
     */
    public Result getLastError();

     /**
     * ERP 연결
     * @return 성공 하면 True, 실패하면 False.오류는 getLastError()로 확인함
     */
    public boolean ERPConnect();

    /**
     * ERP 연결 해제
     * @return 성공 하면 True, 실패하면 False.오류는 getLastError()로 확인함
     */    
    public boolean ERPDisConnect();

    /**
     * 제품 목록 
     * @param companyCode 회사코드
     * @param STP 배송지
     * @param aClass 대분류
     * @param bClass 중분류
     * @param cClass 소분류
     * @return 제품 주문 목록, 결과는 getLastError()로 확인
     */
    public ArrayList<Product> ProcuctList(String companyCode, String STP, String aClass, String bClass, String cClass, HashMap<String,String> cntInfo, String Language) throws Exception;

    /**
     * 제품 목록 (제품코드)
     * @param companyCode 회사코드
     * @param STP 배송지
     * @param aClass 제품코드
     * @return 제품 주문 목록, 결과는 getLastError()로 확인
     */
    public ArrayList<Product> ProcuctList(String companyCode, String STP, String EDPNO, String Language) throws Exception;

    /**
     * 제품 목록 (제품명)
     * @param companyCode 회사코드
     * @param STP 배송지
     * @param aClass 제품코드
     * @return 제품 주문 목록, 결과는 getLastError()로 확인
     */
    public ArrayList<Product> ProcuctList(String companyCode, String STP, String EDPNO, String EDPNM, String Language) throws Exception;

    /**
     * 제품 카테고리
     * @param companyCode 회사코드
     * @return 제품 카테고리 목록, 결과는 getLastError()로 확인
     */
    public ArrayList<ProductCategory> ProcuctCategoryList(String companyCode, String Language) throws Exception;

    /**
     * 제품주문전송
     * @param CreateOrderList
     * @return
     * @throws Exception
     */
    public Result SendProductOrder(CreateOrder CreateOrderList, String orderNO) throws Exception;
    
    /**
     * 회사정보
     * @param COMP 회사코드(LIKE)
     * @return
     * @throws Exception
     */
    public ArrayList<CompanyInfo> CompInfo(String COMP, Boolean CALL) throws Exception;

    /**
     * Sales Office 정보
     * @param COMP
     * @param SOCODE
     * @return
     * @throws Exception
     */
    public ArrayList<SalesOffice> SalesOfficeInfo(String COMP, String SOCODE) throws Exception;

    /**
     * Sales Office별 고객정보
     * @param COMP
     * @param SOCODE
     * @param CUST
     * @return
     * @throws Exception
     */
    public ArrayList<SOCustomers> SOCustomersInfo(String COMP, String SOCODE, String CUST) throws Exception;

    /**
     * 배송지 정보
     * @param COMP
     * @param CUST
     * @return
     * @throws Exception
     */
    public ArrayList<ShiptoParty> ShiptoPartyInfo(String COMP, String CUST) throws Exception;

    /**
     * 주문조회
     * @param COMP
     * @param USERID
     * @param SDATE
     * @param EDATE
     * @param ORDERNO
     * @return
     * @throws Exception
     */
    public ArrayList<OrderInquery> OrderInquery(String COMP, String KUNAG, String USERID, String SDATE, String EDATE, String ORDERNO, String DFORM) throws Exception;
}