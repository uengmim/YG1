package com.yg1.yoswebapp.controllers;

import java.util.ArrayList;

import com.yg1.yoswebapp.apiInterface.ERPInterface;
import com.yg1.yoswebapp.message.OrderInquery;
import com.yg1.yoswebapp.message.Result;
import com.yg1.yoswebapp.model.CondOrderInquery;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class OrderInqueryController {

    @PostMapping("/orderinq")
    public ArrayList<OrderInquery> OrderInqueryList(@RequestBody final CondOrderInquery UserInfo) throws Exception {
        System.out.println("======================");
        System.out.println("주문조회 정보를 불러옵니다.");
        ArrayList<OrderInquery> orderInquery = new ArrayList<>();
        try {
            // Sap RFC Call
            final ERPInterface erp = new ERPInterface();
            erp.LoadERP(UserInfo.getCOMP());
            if (!erp.ERPConnect()) {
                final Result result = erp.getLastError();
                throw new Exception(result.getMessage());
            } else {
                try {
                orderInquery = erp.OrderInquery(UserInfo.getCOMP(), UserInfo.getKUNAG(), UserInfo.getUSERID(),
                        UserInfo.getSDATE(), UserInfo.getEDATE(), UserInfo.getORDERNO(), UserInfo.getDFORM());
                    } catch (Exception e) {
                        System.out.println("SAP 데이터를 불러오는데 실패했습니다..");
                        return orderInquery;
                    }
            }
            return orderInquery;

        } catch (Exception e) {
            System.out.println("SAP 연결에 실패 하였습니다.");
            return orderInquery;
        }
    }

}