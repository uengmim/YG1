package com.yg1.yoswebapp.sapA1;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;

import com.sap.conn.jco.JCo;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoRepository;
import com.sap.conn.jco.JCoTable;
import com.sap.conn.jco.JCoTraceListener;
import com.sap.conn.jco.util.JCoTraceWriter;
import com.yg1.yoswebapp.apiInterface.IERP;
import com.yg1.yoswebapp.controllers.OrderInqueryController;
import com.yg1.yoswebapp.message.OrderProduct;
import com.yg1.yoswebapp.message.Product;
import com.yg1.yoswebapp.message.ProductCategory;
import com.yg1.yoswebapp.message.OrderInquery;
import com.yg1.yoswebapp.message.OrderInqueryItem;
import com.yg1.yoswebapp.message.CreateOrder;
import com.yg1.yoswebapp.message.CreateOrderHeader;
import com.yg1.yoswebapp.message.CreateOrderItem;
import com.yg1.yoswebapp.message.Result;
import com.yg1.yoswebapp.model.CompanyInfo;
import com.yg1.yoswebapp.model.SOCustomers;
import com.yg1.yoswebapp.model.SalesOffice;
import com.yg1.yoswebapp.model.ShiptoParty;

public class SapA1DE implements IERP {

    /**
     * SAP Client
     */
    private SapA1Client client = null;

    /**
     * 마지막 처리 결과
     */
    private Result lastResult = null;

    /**
     * SAP Client를 로드 한다.
     * 
     * @throws Exception
     */
    @Override
    public void LoadERPClient(String profileName) throws Exception {
        try {
            
            //Amak - JCO Trace Level 올리기
            //JCo.setTrace(8, System.getProperty("user.dir"));
            client = new SapA1Client(profileName);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    /**
     * 마지막 오류
     * 
     * @return 마지막 오류
     */
    @Override
    public Result getLastError() {
        return lastResult;
    }

    /**
     * ERP 연결
     * 
     * @return 성공 하면 True, 실패하면 False.오류는 getLastError()로 확인함
     */
    @Override
    public boolean ERPConnect() {
        try {
            client.Create();
            return true;
        } catch (Exception e) {
            e.printStackTrace();

            lastResult = new Result();
            lastResult.setMessage(e.getMessage());
            lastResult.setMessageCode(-9);

            return false;
        }
    }

    /**
     * ERP 연결 해제
     * 
     * @return 성공 하면 True, 실패하면 False.오류는 getLastError()로 확인함
     */
    @Override
    public boolean ERPDisConnect() {
        try {
            client.clearSAPCLIENT();

            return true;
        } catch (Exception e) {
            e.printStackTrace();

            lastResult = new Result();
            lastResult.setMessage(e.getMessage());
            lastResult.setMessageCode(-9);

            return false;
        }
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
    @Override
    public ArrayList<Product> ProcuctList(String companyCode, String STP, String aClass, String bClass, String cClass, HashMap<String,String> cntInfo, String LANG) throws Exception {
        lastResult = new Result();
        try {
            ArrayList<Product> pcate = new ArrayList<Product>();           
         
            JCoRepository repo = client.getRepository();    
            JCoFunction func = repo.getFunction("ZSDF040_1");

            func.getImportParameterList().setValue("I_BUKRS", companyCode);
            func.getImportParameterList().setValue("I_KUNAG", STP);
            func.getImportParameterList().setValue("I_SPRAS", LANG);
            if(!cClass.isEmpty()){
                func.getImportParameterList().setValue("I_ZPRODH1", aClass);
                func.getImportParameterList().setValue("I_ZPRODH2", bClass);
                func.getImportParameterList().setValue("I_ZPRODH3", cClass);
            }else{
                JCoTable importTable = func.getTableParameterList().getTable("TI_040");
                Iterator<String> iter  = cntInfo.keySet().iterator();
                while(iter.hasNext()){
                    String hashKey = iter.next().toString();
                    importTable.appendRow();;
                    importTable.setValue("MATNR", hashKey);
                    importTable.setValue("KWMENG",cntInfo.get(hashKey));
                }

                // for(int i=0;i<CONDM.size();i++){
                //     importTable.appendRow();
                //     importTable.setValue("MATNR", CONDM.get(i));
                //     importTable.setValue("KWMENG",1000);
                // }
            }
            func.execute(client.getClient());
            setResultMessage(func.getExportParameterList().getValue("O_RETURN").toString(), 
                             func.getExportParameterList().getValue("O_MSG").toString());

            JCoTable resultTable = func.getTableParameterList().getTable("TO_040");;
       
            resultTable.firstRow();
            for(int i = 0;i < resultTable.getNumRows();i++){
                Product cate = new Product();
                cate.setEdpNo(resultTable.getValue("MATNR").toString());
                cate.setProductName(resultTable.getValue("ZMAKTX").toString());
                cate.setaClass(resultTable.getValue("ZPRODH1").toString());
                cate.setaClassNM(resultTable.getValue("VTEXT1").toString());
                cate.setbClass(resultTable.getValue("ZPRODH2").toString());
                cate.setbClassNM(resultTable.getValue("VTEXT2").toString());
                cate.setcClass(resultTable.getValue("ZPRODH3").toString());
                cate.setcClassNM(resultTable.getValue("VTEXT3").toString());                
                // cate.setOrderQuantity(Double.parseDouble(resultTable.getValue("KWMENG").toString()));  - 주문 수량
                cate.setType(resultTable.getValue("GROES").toString());
                cate.setListPrice(Double.parseDouble(resultTable.getValue("ZNETPR1").toString()));                           
                cate.setNetPrice(Double.parseDouble(resultTable.getValue("ZNETPR2").toString()));
                cate.setCurrency(resultTable.getValue("ZCURRENCY").toString());
                cate.setVKey(resultTable.getValue("VKEY").toString());
                cate.setBatch1((int)Double.parseDouble(resultTable.getValue("BATCH1").toString()));
                cate.setBatch2((int)Double.parseDouble(resultTable.getValue("BATCH2").toString()));       
                // cate.setYgStock((int)Double.parseDouble(resultTable.getValue("QTY_YG").toString()));
                // cate.setNtStock((int)Double.parseDouble(resultTable.getValue("QTY_NEU").toString()));
                cate.setQuantity(resultTable.getValue("MEINS").toString());
                // cate.setSafeStock((Integer)resultTable.getValue("NQTY"));
                cate.setPackingUnit((int)Double.parseDouble(resultTable.getValue("PKQTY").toString()));     
                
                pcate.add(cate);
                resultTable.nextRow();
            }

            return pcate;
        } catch (JCoException e) {
            e.printStackTrace();
            lastResult.setMessage(e.getMessage());
            lastResult.setMessageCode(-9);
            
            throw e;
        }
    }

    /**
     * 제품 목록 (제품코드)
     * @param companyCode 회사코드
     * @param STP 배송지
     * @param EDPNO 제품코드
     * @return 제품 주문 목록, 결과는 getLastError()로 확인
     */
    @Override
    public ArrayList<Product> ProcuctList(String companyCode, String STP, String EDPNO, String LANG) throws Exception {
        lastResult = new Result();
        try {
            ArrayList<Product> pcate = new ArrayList<Product>();
            JCoRepository repo = client.getRepository();
            JCoFunction func = repo.getFunction("ZSDF041");
            func.getImportParameterList().setValue("I_BUKRS", companyCode);
            func.getImportParameterList().setValue("I_KUNAG", STP);
            func.getImportParameterList().setValue("I_MATNR", EDPNO);
            func.getImportParameterList().setValue("I_SPRAS", LANG);

            func.execute(client.getClient());
            
            
            setResultMessage(func.getExportParameterList().getValue("O_RETURN").toString(), 
                             func.getExportParameterList().getValue("O_MSG").toString());

            JCoTable resultTable = func.getTableParameterList().getTable("TO_041");
          
            resultTable.firstRow();
            for(int i = 0;i < resultTable.getNumRows();i++){
                Product cate = new Product();
                cate.setEdpNo(resultTable.getValue("MATNR").toString());
                cate.setProductName(resultTable.getValue("ZMAKTX").toString());
                cate.setaClass(resultTable.getValue("ZPRODH1").toString());
                cate.setaClassNM(resultTable.getValue("VTEXT1").toString());
                cate.setbClass(resultTable.getValue("ZPRODH2").toString());
                cate.setbClassNM(resultTable.getValue("VTEXT2").toString());
                cate.setcClass(resultTable.getValue("ZPRODH3").toString());
                cate.setcClassNM(resultTable.getValue("VTEXT3").toString());
                cate.setType(resultTable.getValue("GROES").toString());
                cate.setListPrice(Double.parseDouble(resultTable.getValue("ZNETPR1").toString()));
               cate.setNetPrice(Double.parseDouble(resultTable.getValue("ZNETPR2").toString()));
                cate.setCurrency(resultTable.getValue("ZCURRENCY").toString());
                // cate.setYgStock((int)Double.parseDouble(resultTable.getValue("QTY_YG").toString()));
                // cate.setNtStock((int)Double.parseDouble(resultTable.getValue("QTY_NEU").toString()));

                cate.setVKey(resultTable.getValue("VKEY").toString());
                cate.setBatch1((int)Double.parseDouble(resultTable.getValue("BATCH1").toString()));
                cate.setBatch2((int)Double.parseDouble(resultTable.getValue("BATCH2").toString()));
                
                cate.setQuantity(resultTable.getValue("MEINS").toString());
                // cate.setSafeStock((Integer)resultTable.getValue("NQTY"));
                cate.setPackingUnit((int)Double.parseDouble(resultTable.getValue("PKQTY").toString()));
                pcate.add(cate);
                resultTable.nextRow();
            }
  
            return pcate;
        } catch (JCoException e) {
            e.printStackTrace();

            lastResult = new Result();
            lastResult.setMessage(e.getMessage());
            lastResult.setMessageCode(-9);
            
            throw e;
        }
    }

    /**
     * 제품 목록 (제품명)
     * @param companyCode 회사코드
     * @param STP 배송지
     * @param EDPNO 제품코드
     * @param EDPNO 제품명
     * @return 제품 주문 목록, 결과는 getLastError()로 확인
     */
    @Override
    public ArrayList<Product> ProcuctList(String companyCode, String STP, String EDPNO, String EDPNM, String LANG) throws Exception {
        lastResult = new Result();
        try {
            ArrayList<Product> pcate = new ArrayList<Product>();
            JCoRepository repo = client.getRepository();
            JCoFunction func = repo.getFunction("ZSDF042");
            func.getImportParameterList().setValue("I_BUKRS", companyCode);
            func.getImportParameterList().setValue("I_KUNAG", STP);
            func.getImportParameterList().setValue("I_MAKTX", EDPNM);
            func.getImportParameterList().setValue("I_SPRAS", LANG);

            func.execute(client.getClient());
            setResultMessage(func.getExportParameterList().getValue("O_RETURN").toString(), 
                             func.getExportParameterList().getValue("O_MSG").toString());

            JCoTable resultTable = func.getTableParameterList().getTable("TO_042");;
            resultTable.firstRow();
            for(int i = 0;i < resultTable.getNumRows();i++){
                Product cate = new Product();
                cate.setEdpNo(resultTable.getValue("MATNR").toString());
                cate.setProductName(resultTable.getValue("ZMAKTX").toString());
                cate.setaClass(resultTable.getValue("ZPRODH1").toString());
                cate.setaClassNM(resultTable.getValue("VTEXT1").toString());
                cate.setbClass(resultTable.getValue("ZPRODH2").toString());
                cate.setbClassNM(resultTable.getValue("VTEXT2").toString());
                cate.setcClass(resultTable.getValue("ZPRODH3").toString());
                cate.setcClassNM(resultTable.getValue("VTEXT3").toString());
                cate.setType(resultTable.getValue("GROES").toString());
                cate.setListPrice(Double.parseDouble(resultTable.getValue("ZNETPR1").toString()));  
                cate.setNetPrice(Double.parseDouble(resultTable.getValue("ZNETPR2").toString()));
                cate.setCurrency(resultTable.getValue("ZCURRENCY").toString());

                cate.setVKey(resultTable.getValue("VKEY").toString());
                cate.setBatch1((int)Double.parseDouble(resultTable.getValue("BATCH1").toString()));
                cate.setBatch2((int)Double.parseDouble(resultTable.getValue("BATCH2").toString()));
                
                // cate.setYgStock((int)Double.parseDouble(resultTable.getValue("QTY_YG").toString()));
                // cate.setNtStock((int)Double.parseDouble(resultTable.getValue("QTY_NEU").toString()));
                cate.setQuantity(resultTable.getValue("MEINS").toString());
                // cate.setSafeStock((Integer)resultTable.getValue("NQTY"));
                cate.setPackingUnit((int)Double.parseDouble(resultTable.getValue("PKQTY").toString()));
                pcate.add(cate);
                resultTable.nextRow();
            }

            return pcate;
        } catch (JCoException e) {
            e.printStackTrace();

            lastResult = new Result();
            lastResult.setMessage(e.getMessage());
            lastResult.setMessageCode(-9);
            
            throw e;
        }
    }

    /**
     * 제품 카테고리
     * @param companyCode 회사코드
     * @return 제품 카테고리 목록, 결과는 getLastError()로 확인
     */
    @Override
    public ArrayList<ProductCategory> ProcuctCategoryList(String COMP, String LANG) throws Exception {
        // return new ArrayList<ProductCategory>();
        lastResult = new Result();
        try {
            ArrayList<ProductCategory> pcate = new ArrayList<ProductCategory>();
            JCoRepository repo = client.getRepository();
            JCoFunction func = repo.getFunction("ZSDF032");
            func.getImportParameterList().setValue("I_BUKRS", COMP);
            func.getImportParameterList().setValue("I_SPRAS", LANG);
            func.execute(client.getClient());
            setResultMessage(func.getExportParameterList().getValue("O_RETURN").toString(), 
                             func.getExportParameterList().getValue("O_MSG").toString());

            JCoTable resultTable = func.getTableParameterList().getTable("TO_032");;
            resultTable.firstRow();
            for(int i = 0;i < resultTable.getNumRows();i++){
                ProductCategory cate = new ProductCategory(resultTable.getValue("ZPRODH1").toString(),
                resultTable.getValue("VTEXT1").toString(),
                resultTable.getValue("ZPRODH2").toString(),
                resultTable.getValue("VTEXT2").toString(),
                resultTable.getValue("ZPRODH3").toString(),
                resultTable.getValue("VTEXT3").toString());
                pcate.add(cate);
                resultTable.nextRow();
            }

            return pcate;
        } catch (JCoException e) {
            e.printStackTrace();
            lastResult.setMessage(e.getMessage());
            lastResult.setMessageCode(-9);
            
            throw e;
        }
    }
    
    /**
     * 제품 주문 전송
     * @param orderNo 주문번호
     * @param customerNo 고객번호
     * @param loginId 로그인ID
     * @param remark 비고
     * @param OrderProcuctList 주문 제품 리스트
     * @return 결과 메시지
     */
    @Override
    public Result SendProductOrder(CreateOrder CreateOrderList, String orderNO) throws Exception {
        try {
            JCoRepository repo = client.getRepository();
            JCoFunction func = repo.getFunction("ZSDF050");
            func.getImportParameterList().setValue("I_BUKRS", CreateOrderList.getCompany());
            func.getImportParameterList().setValue("I_ZVBELN", orderNO);
            func.getImportParameterList().setValue("I_ZWORK_ID", CreateOrderList.getUserID());

            JCoTable headerTable =  func.getTableParameterList().getTable("TI_050_H");
            CreateOrderHeader coh = CreateOrderList.getCreateOrderHeader();
            headerTable.appendRow();
            headerTable.setValue("ZERDAT", coh.getOrderDt());
            headerTable.setValue("ZWORT", coh.getOrderTm());
            headerTable.setValue("KUNAG", coh.getSoldTo());
            headerTable.setValue("KUNWE", coh.getShipTo());
            headerTable.setValue("KUNWE_NM", coh.getShipToNM());
            headerTable.setValue("STREET_WE", coh.getStreet());
            headerTable.setValue("POST_CODE_WE", coh.getPost());
            headerTable.setValue("CITY1_WE", coh.getCity());
            headerTable.setValue("BSTKD", coh.getPono());
            headerTable.setValue("ZCURRENCY", coh.getCurrency());
            headerTable.setValue("ZPKRE", coh.getDeliveryType()); // 수정 - amak
            headerTable.setValue("ZREMARK1", coh.getRemark());
            headerTable.setValue("ZWORK_ID", coh.getUserID());
            headerTable.setValue("BUKRS", coh.getCompany());
            headerTable.setValue("VKORG", coh.getVkorg());
            headerTable.setValue("VTWEG", coh.getVtweg());
            headerTable.setValue("VKBUR", coh.getVkbur());
            headerTable.setValue("ZNAME", coh.getZname());
            headerTable.setValue("ZTELF1", coh.getZtelf1());
            headerTable.setValue("ZMAIL", coh.getZmail());

          


            JCoTable itemTable =  func.getTableParameterList().getTable("TI_050_I");
            ArrayList<CreateOrderItem> coi = CreateOrderList.getCreateOrderItem();
            for(int i = 0;i<coi.size();i++){
                itemTable.appendRow();
                itemTable.setValue("ZVBELN", orderNO);
                String suffix = String.format("%05d", i + 1); 
                itemTable.setValue("ZPOSNR", suffix);
                itemTable.setValue("MATNR", coi.get(i).getProduct());
                itemTable.setValue("KWMENG", coi.get(i).getOrderQty());
                itemTable.setValue("ZNETPR1", coi.get(i).getOrderAm());
                itemTable.setValue("ZCURRENCY", coi.get(i).getCurrency());
                itemTable.setValue("ZUNIT", coi.get(i).getQuantity());
                itemTable.setValue("BSTKD_E", coi.get(i).getSapPerchase());
                itemTable.setValue("ZRMARK", coi.get(i).getRemark());
            }

            func.execute(client.getClient());
            setResultMessage(func.getExportParameterList().getValue("O_RETURN").toString(), 
                             func.getExportParameterList().getValue("O_MSG").toString());
            

            return lastResult;
        } catch (JCoException e) {
            e.printStackTrace();

            lastResult = new Result();
            lastResult.setMessage(e.getMessage());
            lastResult.setMessageCode(-9);
            
            throw e;
        }
    }
    
    /**
     * 회사정보
     */
    @Override
    public ArrayList<CompanyInfo> CompInfo(String COMP, Boolean CALL) throws Exception{
        try{
            ArrayList<CompanyInfo> compInfo = new ArrayList<>();
            JCoRepository repo = client.getRepository();
            JCoFunction func = repo.getFunction("ZSDF020");
            if(!CALL)
                func.getImportParameterList().setValue("I_BUKRS", COMP);
            
            func.execute(client.getClient());
            setResultMessage(func.getExportParameterList().getValue("O_RETURN").toString(), 
                             func.getExportParameterList().getValue("O_MSG").toString());

            JCoTable resultTable = func.getTableParameterList().getTable("TO_020");
            resultTable.firstRow();
            for(int i = 0;i < resultTable.getNumRows();i++){
                CompanyInfo comp = new CompanyInfo();
                comp.setCOMP(resultTable.getValue("BUKRS").toString());
                comp.setCOMPNM(resultTable.getValue("BUTXT").toString());
                comp.setVKORG(resultTable.getValue("VKORG").toString());
                comp.setVKORGNM(resultTable.getValue("VTEXT").toString());
                compInfo.add(comp);
                resultTable.nextRow();
            }

            return compInfo;
        } catch(JCoException e) {
            e.printStackTrace();

            lastResult = new Result();
            lastResult.setMessage(e.getMessage());
            lastResult.setMessageCode(-9);
            throw e;
        }
    }


    public void setResultMessage(String resultCode, String resultMsg){
            lastResult = new Result();
            if(resultCode.equals("0")){
                lastResult.setMessage(resultMsg);
                lastResult.setMessageCode(Integer.parseInt(resultCode));
            }else{
                lastResult.setMessage(resultMsg);
                lastResult.setMessageCode(-9);
            }
    }

    /**
     * Sales Office 정보
     */
    @Override
    public ArrayList<SalesOffice> SalesOfficeInfo(String COMP, String SOCODE) throws Exception{
        try{
            ArrayList<SalesOffice> salesOfficeInfo = new ArrayList<SalesOffice>();

            JCoRepository repo = client.getRepository();
            JCoFunction func = repo.getFunction("ZSDF021");
            func.getImportParameterList().setValue("I_BUKRS", COMP);
            if(!SOCODE.equals(""))
                func.getImportParameterList().setValue("I_VKBUR", SOCODE);
            
            func.execute(client.getClient());
            setResultMessage(func.getExportParameterList().getValue("O_RETURN").toString(), 
                             func.getExportParameterList().getValue("O_MSG").toString());

            JCoTable resultTable = func.getTableParameterList().getTable("TO_021");
            resultTable.firstRow();
            for(int i = 0;i < resultTable.getNumRows();i++){
                SalesOffice so = new SalesOffice();
                so.setSOCODE(resultTable.getValue("VKBUR").toString());
                so.setSONAME(resultTable.getValue("VKB_TXT").toString());
                salesOfficeInfo.add(so);
                resultTable.nextRow();
            }
            return salesOfficeInfo;
        }catch(Exception e){
            e.printStackTrace();

            lastResult = new Result();
            lastResult.setMessage(e.getMessage());
            lastResult.setMessageCode(-9);
            throw e;
        }
    }

    /**
     * Sales Office별 고객정보
     */
    @Override
    public ArrayList<SOCustomers> SOCustomersInfo(String COMP, String SOCODE, String CUST) throws Exception{
        try{
            ArrayList<SOCustomers> soCustomersInfo = new ArrayList<SOCustomers>();

            JCoRepository repo = client.getRepository();
            JCoFunction func = repo.getFunction("ZSDF022");
            func.getImportParameterList().setValue("I_BUKRS", COMP);
            func.getImportParameterList().setValue("I_VKBUR", SOCODE);
            if(!CUST.equals(""))
                func.getImportParameterList().setValue("I_KUNNR", CUST);
            
            func.execute(client.getClient());
            setResultMessage(func.getExportParameterList().getValue("O_RETURN").toString(), 
                             func.getExportParameterList().getValue("O_MSG").toString());

            JCoTable resultTable = func.getTableParameterList().getTable("TO_022");
            resultTable.firstRow();
            for(int i = 0;i < resultTable.getNumRows();i++){
                SOCustomers so = new SOCustomers();
                so.setCUST(resultTable.getValue("KUNNR").toString());
                so.setCUSTNM(resultTable.getValue("NAME1").toString());
                so.setTEL(resultTable.getValue("TELF1").toString());
                so.setADDR(resultTable.getValue("STREET").toString());
                so.setPOST(resultTable.getValue("POST_CODE").toString());
                so.setCITY(resultTable.getValue("CITY1").toString());
                so.setSORG(resultTable.getValue("VKORG").toString());
                so.setSORGNM(resultTable.getValue("VKO_TXT").toString());
                so.setDCCODE(resultTable.getValue("VTWEG").toString());
                so.setDCNAME(resultTable.getValue("VTW_TXT").toString());
                so.setSOCODE(resultTable.getValue("VKBUR").toString());
                so.setSONAME(resultTable.getValue("VKB_TXT").toString());
                soCustomersInfo.add(so);
                resultTable.nextRow();
            }
            return soCustomersInfo;
        }catch(Exception e){
            e.printStackTrace();

            lastResult = new Result();
            lastResult.setMessage(e.getMessage());
            lastResult.setMessageCode(-9);
            throw e;
        }
    }

    /**
     * 배송지 정보
     */
    @Override
    public ArrayList<ShiptoParty> ShiptoPartyInfo(String COMP, String CUST) throws Exception{
        try{
            ArrayList<ShiptoParty> shiptoPartyInfo = new ArrayList<ShiptoParty>();

            JCoRepository repo = client.getRepository();
            JCoFunction func = repo.getFunction("ZSDF023");
            func.getImportParameterList().setValue("I_BUKRS", COMP);
            func.getImportParameterList().setValue("I_KUNAG", CUST);
            
            func.execute(client.getClient());
            setResultMessage(func.getExportParameterList().getValue("O_RETURN").toString(), 
                             func.getExportParameterList().getValue("O_MSG").toString());

            JCoTable resultTable = func.getTableParameterList().getTable("TO_023");
            resultTable.firstRow();
            for(int i = 0;i < resultTable.getNumRows();i++){
                ShiptoParty so = new ShiptoParty();
                so.setSTP(resultTable.getValue("KUNWE").toString());
                so.setSTPNM(resultTable.getValue("NAME1").toString());
                so.setTEL(resultTable.getValue("TELF1").toString());
                so.setADDR(resultTable.getValue("STREET").toString());
                so.setPOST(resultTable.getValue("POST_CODE").toString());
                so.setCITY(resultTable.getValue("CITY1").toString());
                shiptoPartyInfo.add(so);
                resultTable.nextRow();
            }
            return shiptoPartyInfo;
        }catch(Exception e){
            e.printStackTrace();

            lastResult = new Result();
            lastResult.setMessage(e.getMessage());
            lastResult.setMessageCode(-9);
            throw e;
        }
    }

    /**
     * 주문조회
     */
    @Override
    public ArrayList<OrderInquery> OrderInquery(String COMP, String KUNAG, String USERID, String SDATE, String EDATE, String ORDERNO, String DFORM) throws Exception{
        try{
            ArrayList<OrderInquery> orderInquery = new ArrayList<OrderInquery>();
            ArrayList<OrderInqueryItem> orderInqueryItem = new ArrayList<OrderInqueryItem>();

            JCoRepository repo = client.getRepository();
            JCoFunction func = repo.getFunction("ZSDF051");
            func.getImportParameterList().setValue("I_ZWORK_ID", USERID);
            func.getImportParameterList().setValue("I_KUNAG", KUNAG);
            func.getImportParameterList().setValue("I_BUKRS", COMP);
            func.getImportParameterList().setValue("I_DATE_S", SDATE);
            func.getImportParameterList().setValue("I_DATE_E", EDATE);
            
            if(!ORDERNO.equals(""))
                func.getImportParameterList().setValue("I_ZVBELN", ORDERNO);
            
            func.execute(client.getClient());
            setResultMessage(func.getExportParameterList().getValue("O_RETURN").toString(), 
                             func.getExportParameterList().getValue("O_MSG").toString());

            JCoTable resultTableHeader = func.getTableParameterList().getTable("TO_051_H");
            JCoTable resultTableItem = func.getTableParameterList().getTable("TO_051_I");
            resultTableItem.firstRow();
            for(int i = 0;i < resultTableItem.getNumRows();i++){
                OrderInqueryItem oii = new OrderInqueryItem();
                oii.setOrderNo(resultTableItem.getValue("ZVBELN").toString());
                oii.setOrderSeq(resultTableItem.getValue("ZPOSNR").toString());
                oii.setEdpNo(resultTableItem.getValue("MATNR").toString());
                oii.setEdpNm(resultTableItem.getValue("MAKTX").toString());
                oii.setOrderQty((int)Double.parseDouble(resultTableItem.getValue("KWMENG").toString()));
                oii.setStandard(resultTableItem.getValue("GROES").toString());
                oii.setOrderAm(Double.parseDouble(resultTableItem.getValue("ZNETPR1").toString()));
                oii.setCurrency(resultTableItem.getValue("ZCURRENCY").toString());
                oii.setQuantity(resultTableItem.getValue("ZUNIT").toString());
                oii.setPurchaseNo(resultTableItem.getValue("BSTKD_E").toString());
                oii.setSapOrderNo(resultTableItem.getValue("VBELN").toString());
                oii.setSapOrderSeq(resultTableItem.getValue("POSNR").toString());
                oii.setSapCancelYN(resultTableItem.getValue("ZACCEPT_CNCL_YN").toString());
                oii.setRemark(resultTableItem.getValue("ZRMARK").toString());
                orderInqueryItem.add(oii);
                resultTableItem.nextRow();
            }

            resultTableHeader.firstRow();
            for(int i = 0;i < resultTableHeader.getNumRows();i++){
                OrderInquery oi = new OrderInquery();
                String orderNo = resultTableHeader.getValue("ZVBELN").toString();
                oi.setOrderNo(orderNo);
                // String connDate = String.format("%s %s", makeDatetimeFormatter(resultTableHeader.getValue("ZERDAT").toString(), "D", DFORM), 
                //                                          makeDatetimeFormatter(resultTableHeader.getValue("ZWORT").toString(), "T", DFORM));
                oi.setOrderDt(makeDatetimeFormatter(resultTableHeader.getValue("ZERDAT").toString(), "D", DFORM));
                oi.setOrderTm(makeDatetimeFormatter(resultTableHeader.getValue("ZWORT").toString(), "T", DFORM));
                oi.setSapOrderTm(makeDatetimeFormatter(resultTableHeader.getValue("ZSORT").toString(), "T", DFORM));
                oi.setSoldTo(resultTableHeader.getValue("KUNAG").toString());
                oi.setCustPono(resultTableHeader.getValue("BSTKD").toString());
                oi.setConfirmYN(resultTableHeader.getValue("ZCONFIRM_YN").toString());
                oi.setCancelYN(resultTableHeader.getValue("ZACCEPT_CNCL_YN").toString());
                oi.setTotalQty((int)Double.parseDouble(resultTableHeader.getValue("KWMENG").toString()));
                oi.setTotalAm(Double.parseDouble(resultTableHeader.getValue("ZTOTALPRC").toString()));
                oi.setCurrency(resultTableHeader.getValue("ZCURRENCY").toString());
                oi.setQuantity(resultTableHeader.getValue("ZUNIT").toString());
                oi.setRemark(resultTableHeader.getValue("ZREMARK1").toString());
                oi.setDeliveryType(resultTableHeader.getValue("ZPKRE").toString());

                // 051 추가
                oi.setShipToParty(resultTableHeader.getValue("KUNWE").toString());
                oi.setShipName(resultTableHeader.getValue("KUNWE_NM").toString());
                oi.setShipAddr(resultTableHeader.getValue("STREET_WE").toString());
                oi.setZname(resultTableHeader.getValue("ZNAME").toString());
                oi.setZtelf1(resultTableHeader.getValue("ZTELF1").toString());
                oi.setZmail(resultTableHeader.getValue("ZMAIL").toString());
  
  


                ArrayList<OrderInqueryItem> subOrderItem = new ArrayList<OrderInqueryItem>();
                orderInqueryItem.stream().filter(t->t.getOrderNo().equals(orderNo)).forEach(it->{
                    OrderInqueryItem oii = new OrderInqueryItem();
                    oii.setOrderNo(it.getOrderNo());
                    oii.setOrderSeq(it.getOrderSeq());
                    oii.setEdpNo(it.getEdpNo());
                    oii.setEdpNm(it.getEdpNm());
                    oii.setOrderQty(it.getOrderQty());
                    oii.setStandard(it.getStandard());
                    oii.setOrderAm(it.getOrderAm());
                    oii.setCurrency(it.getCurrency());
                    oii.setQuantity(it.getQuantity());
                    oii.setPurchaseNo(it.getPurchaseNo());
                    oii.setSapOrderNo(it.getSapOrderNo());
                    oii.setSapOrderSeq(it.getSapOrderSeq());
                    oii.setSapCancelYN(it.getSapCancelYN());
                    oii.setRemark(it.getRemark());
                    subOrderItem.add(oii);
                });
                oi.setOrderInqueryList(subOrderItem);
                orderInquery.add(oi);
                resultTableHeader.nextRow();
            }
            return orderInquery;
        }catch(Exception e){
            e.printStackTrace();

            lastResult = new Result();
            lastResult.setMessage(e.getMessage());
            lastResult.setMessageCode(-9);
            throw e;
        }
    }

    /**
     * 날짜 포맷변경
     * @param dt
     * @param type
     * @return
     */
    public String makeDatetimeFormatter(String dt, String type, String DFORM){
        String orderDat = "";
        if(type.equals("D")){
            // SimpleDateFormat fForm = new SimpleDateFormat("yyyyMMdd");
            // SimpleDateFormat dForm = new SimpleDateFormat(DFORM);
            // Date fDate = new Date();
            // try{
            //     fDate = fForm.parse(dt);
            //     orderDat = dForm.format(fDate);
            // } catch(ParseException e){
                orderDat = String.format("%s-%s-%s", dt.substring(0, 4), dt.substring(4, 6), dt.substring(6, 8));
            // }
            
        }
        else
            orderDat = String.format("%s:%s:%s", dt.substring(0, 2), dt.substring(2, 4), dt.substring(4, 6));

        return orderDat;
    }
}