package com.yg1.yoswebapp.controllers;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;

import javax.jws.soap.SOAPBinding.Use;
import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;

import com.yg1.yoswebapp.apiInterface.ERPInterface;
import com.yg1.yoswebapp.message.Result;
import com.yg1.yoswebapp.model.MailService;
import com.yg1.yoswebapp.model.OrderNO;
import com.yg1.yoswebapp.model.OrderNORepository;
import com.yg1.yoswebapp.message.CreateOrder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CreateOrderController {
    @Autowired
    Environment environment;
    
    @Autowired
    private MailService mailService;

    @PersistenceContext
    private EntityManager em;

    private String host, port, mail_ID, mail_Title, mail_Content;
    
    @PostMapping("/createorder")
    public Result CreateOrder(@RequestBody final CreateOrder UserInfo) {
        System.out.println("======================");
        System.out.println("주문을 실행합니다.");
        try{
            host = InetAddress.getLocalHost().getHostAddress();
            port = environment.getProperty("local.server.port");
            //Sap RFC Call
            final ERPInterface erp = new ERPInterface();
            Result result = new Result();
            erp.LoadERP(UserInfo.getCompany());
            if (!erp.ERPConnect()) {
                result = erp.getLastError();
                throw new Exception(result.getMessage());
            }

            //  StoredProcedureQuery query = em.createNamedStoredProcedureQuery("order");
            // query.registerStoredProcedureParameter("orderno", String.class, ParameterMode.OUT);
            // query.setParameter("@COMP", UserInfo.getCompany());
            // Boolean s =query.execute();
            // List<OrderNO> ordern = query.getResultList();

            Query query = em.createNativeQuery("{call GET_ORDERNO(?, ?)}", OrderNO.class).setParameter(1, UserInfo.getCompany())
                                                                                      .setParameter(2, UserInfo.getTdate());


                                                                                      
            List<OrderNO> data = query.getResultList();
            result = erp.SendProductOrder(UserInfo, data.get(0).getORDERNO());

            if(result.getMessageCode() == 0) {
                mail_Title = String.format("%s / %s / %s", data.get(0).getORDERNO(), UserInfo.getCreateOrderHeader().getShipToNM(), UserInfo.getTdate());
                mail_Content = "You received an order by OOS";

                System.out.println(host);

                //if(host.equals("10.206.1.74")) {
                    if(port.equals("8084")){
                        mail_Title = "[TEST] ".concat(mail_Title);
                    }
                    if(UserInfo.getCompany().equals("4100")) {
                        switch(UserInfo.getCreateOrderHeader().getVkbur()){
                            case "4110":
                            case "4115":
                            case "4120":
                                mail_ID = "yg1@yg1.fr";
                                break;
                            case "4125":
                            case "4130":
                            case "4140":
                                mail_ID = "yg1@yg1.eu";
                                break;
                        }
                    } else if(UserInfo.getCompany().equals("4200")){
                        mail_ID = "sales@yg-1.de";
                    }
                //} else {
                //    mail_Title = "[TEST] ".concat(mail_Title);
                //    mail_ID = "wonseok@istn.co.kr";
                //}
                boolean isSend = mailService.sendMail(mail_ID, mail_Title, mail_Content);
                if(!isSend){
                    throw new Exception("send mail failed");
                }
            }

            return result;

        } catch (final Exception e) {
            System.out.println("RFC 연결을 실패 하였습니다.");
            Result result = new Result();
            result.setMessageCode(-9);
            result.setMessage(e.getMessage());
            return result;
        } finally {
            System.out.println("======================");
        }
    }



}