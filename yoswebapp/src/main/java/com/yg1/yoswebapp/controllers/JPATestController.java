package com.yg1.yoswebapp.controllers;

import java.util.List;
import java.util.Optional;

import com.yg1.yoswebapp.YOSWebApplication;
import com.yg1.yoswebapp.apiInterface.ERPInterface;
import com.yg1.yoswebapp.message.ProductCategory;
import com.yg1.yoswebapp.message.Result;
import com.yg1.yoswebapp.model.JpaTest;
import com.yg1.yoswebapp.model.JpaTestRepository;
import com.yg1.yoswebapp.model.JpaTestService;
import com.yg1.yoswebapp.model.MailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class JPATestController {

    /**
     * JPATEST 서비스
     */
    @Autowired
    private JpaTestService jpaTestService;


    @Autowired
    private MailService mailService;

    /**
     * 로그
     */
    private static final Logger log = LoggerFactory.getLogger(YOSWebApplication.class);

    @RequestMapping(value = "api/Test", method = RequestMethod.GET, produces = "application/json")
    public String  first() throws Exception {

        try {
            // boolean isSend = mailService.sendMail("sales@yg-1.de", "TEST", "TEST!!");
            boolean isSend = mailService.sendMail("wonseok@istn.co.kr", "TEST", "TEST!!");
            
            if (isSend)
            {
                return "메일이 발송 TEST";
            }
            else
            {
                return "메일 보내기 실패 : 로그 확인 바람.!!";
            }
        }

        catch (Exception ex) {
            throw ex;
        }

    }
}