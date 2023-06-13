package com.yg1.yoswebapp.controllers;

import java.util.ArrayList;
import java.util.List;

import com.yg1.yoswebapp.YOSWebApplication;
import com.yg1.yoswebapp.apiInterface.ERPInterface;
import com.yg1.yoswebapp.message.Result;
import com.yg1.yoswebapp.model.COMP;
import com.yg1.yoswebapp.model.CompanyInfo;
import com.yg1.yoswebapp.model.SOCustomers;
import com.yg1.yoswebapp.model.SalesOffice;
import com.yg1.yoswebapp.model.ShiptoParty;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class InfoController {

    /**
     * 회사정보
     */
    @PostMapping("/compinfo")
    public List<CompanyInfo> CompanyInfoList(@RequestBody COMP UserInfo) {
        try{
            //Sap RFC Call
            ERPInterface erp = new ERPInterface();
            erp.LoadERP(UserInfo.getCOMP());
            if (!erp.ERPConnect()) {
                Result result = erp.getLastError();
                throw new Exception(result.getMessage());
            }

            //제품 카테고리 데이터
            ArrayList<CompanyInfo> compInfo = erp.CompInfo(UserInfo.getCOMP(), UserInfo.getCALL());
            
            compInfo = erp.CheckComp(compInfo);

            return compInfo;

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        } finally {
            System.out.println("======================");
        }
    }

    /**
     * Sales Office정보
     * @param UserInfo
     * @return
     */
    @PostMapping("/soinfo")
    public List<SalesOffice> SalesOfficeInfoList(@RequestBody COMP UserInfo) {
        try{
            //Sap RFC Call
            ERPInterface erp = new ERPInterface();
            erp.LoadERP(UserInfo.getCOMP());
            if (!erp.ERPConnect()) {
                Result result = erp.getLastError();
                throw new Exception(result.getMessage());
            }

            //Sales Office 정보
		    ArrayList<SalesOffice> salesOfficeInfo = erp.SalesOfficeInfo(UserInfo.getCOMP(), UserInfo.getSOCODE());

            return salesOfficeInfo;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        } finally {
            System.out.println("======================");
        }
    }

    /**
     * Sales Office별 고객정보
     */
    @PostMapping("/socinfo")
    public List<SOCustomers> SOCustomersInfoList(@RequestBody COMP UserInfo) {
        try{
            //Sap RFC Call
            ERPInterface erp = new ERPInterface();
            erp.LoadERP(UserInfo.getCOMP());
            if (!erp.ERPConnect()) {
                Result result = erp.getLastError();
                throw new Exception(result.getMessage());
            }

            //Sales Office별 고객정보
		    ArrayList<SOCustomers> soCustomersInfo = erp.SOCustomersInfo(UserInfo.getCOMP(), UserInfo.getSOCODE(), UserInfo.getCUST());

            return soCustomersInfo;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        } finally {
            System.out.println("======================");
        }
    }

    @PostMapping("/stpinfo")
    public List<ShiptoParty> ShiptoPartyInfoList(@RequestBody COMP UserInfo) {
        try{
            //Sap RFC Call
            ERPInterface erp = new ERPInterface();
            erp.LoadERP(UserInfo.getCOMP());
            if (!erp.ERPConnect()) {
                Result result = erp.getLastError();
                throw new Exception(result.getMessage());
            }

            //배송지정보
		    ArrayList<ShiptoParty> soCustomersInfo = erp.ShiptoPartyInfo(UserInfo.getCOMP(), UserInfo.getCUST());

            return soCustomersInfo;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        } finally {
            System.out.println("======================");
        }
    }

    /**
     * 업데이트 버전 확인
     * @param index Client 버전 Index
     * @return isMatchedVersion
     */
    @RequestMapping("/version/{index}")
    public boolean MatchVersion(@PathVariable("index") Long index){
        boolean result = true;
        result = index.longValue() == YOSWebApplication.version.longValue() ? true : false ;
        return result;
    }
}