package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import me.saro.sap.jco.SapFunction;
import me.saro.sap.jco.SapFunctionResult;
import me.saro.sap.jco.SapManager;
import me.saro.sap.jco.SapManagerBuilderOption;

import com.example.demo.model.Test;
import java.io.IOException;

import com.sap.conn.jco.JCoException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SapController {

	@RequestMapping(value = "/Sap", method = RequestMethod.GET, produces = "application/json")
	public List<Test> firstPage() throws JCoException, IOException {
                SapManager sm = getSapManager();
                SapFunction func = sm.getFunction("ZTEST_FUNC");
                func.getImportParameterList().setValue("I_KUNNR", "1000000001");
                
                SapFunctionResult result = func.execute();
                List<Map<String, Object>> resultTable = result.getTable("T_RESULT");
                resultTable.forEach(row->{
                        
                });

		return createList();
	}

	public SapManager getSapManager() throws JCoException, IOException {
        return SapManager
                .builder()
                .set(SapManagerBuilderOption.ASHOST, "183.111.166.135") // AS host
                // .set(SapManagerBuilderOption.MSSERV, "9999") // MS port [AS, MS is MSSERV, GW is JCO_GWSERV]
                .set(SapManagerBuilderOption.SYSNR, "00") // system number
                // .set(SapManagerBuilderOption.GROUP, "Group Name") // group
                .set(SapManagerBuilderOption.LANG, "EN") // language code
                .set(SapManagerBuilderOption.CLIENT, "100") // client number
                .set(SapManagerBuilderOption.USER, "HS02") // user
                .set(SapManagerBuilderOption.PASSWD, "dbsrl159!") // password
                .build();
    }

    private static List<Test> createList() {
        List<Test> tempTest = new ArrayList<>();
        return tempTest;

}
}
