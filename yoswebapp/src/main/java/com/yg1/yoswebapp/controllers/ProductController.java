package com.yg1.yoswebapp.controllers;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.swing.text.Document;

import com.yg1.yoswebapp.message.Product;
import com.yg1.yoswebapp.apiInterface.ERPInterface;
import com.yg1.yoswebapp.message.Result;
import com.yg1.yoswebapp.model.COMPM;
import com.yg1.yoswebapp.model.CTNOM;
import com.yg1.yoswebapp.model.CartService;
import com.yg1.yoswebapp.model.OrderMarkRepository;
import com.yg1.yoswebapp.model.OrderMarkService;

import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private OrderMarkService orderMarkService;

    @Autowired
    private CartService cartService;

    private final String FLAG_CART_ONLY = "CART";
    private final String FLAG_ORDER_MARK_ONLY = "FAVORITE";
    private final String FLAG_EDPNO_ONLY = "EDPNO";
    private final String FLAG_EDPNM_ONLY = "EDPNM";
    private final String FLAG_NOMAL = "NOMAL";

    @PostMapping("/products/{flag}")
    public ArrayList<com.yg1.yoswebapp.model.Product> ProductsList(@PathVariable(value = "flag") String flag,
            @RequestBody final COMPM UserInfo) throws Exception {
        System.out.println("======================");
        System.out.println("제품 정보를 불러옵니다.");
        try {
            // Sap RFC Call
            final ERPInterface erp = new ERPInterface();
            erp.LoadERP(UserInfo.getCOMP());
            if (!erp.ERPConnect()) {
                final Result result = erp.getLastError();
                throw new Exception(result.getMessage());
            } else {
                ArrayList<com.yg1.yoswebapp.model.Product> product = new ArrayList<com.yg1.yoswebapp.model.Product>();
                try {
                    System.out.println("SAP 연결에 성공 하였습니다.");
                    ArrayList<Product> rfcproduct = new ArrayList<Product>();
                    List<CTNOM> uData = GET_USER_DATA(UserInfo.getUSERID(), flag);

                    String upperFlag = flag.toUpperCase();

                    // 제품 카테고리 데이터(매개변수에 따라 변동)

                    // RFC - 40_1
                    if (upperFlag.equals(FLAG_CART_ONLY) || upperFlag.equals(FLAG_ORDER_MARK_ONLY)
                            || upperFlag.equals(FLAG_NOMAL)) {

                        ArrayList<String> listCONDM = UserInfo.getCONDM();
                        HashMap<String, String> hashMap = new HashMap<>();

                        // 벌크오더, 퀵오더
                        if (!listCONDM.isEmpty()) {
                            if (listCONDM.get(0).contains("/")) {
                                listCONDM.forEach(f -> {
                                    String[] keyValue = f.split("/");
                                    if (keyValue.length > 1)
                                        hashMap.put(keyValue[0], keyValue[1]);
                                });
                            }
                        }

                        // 그외 오더
                        else {

                            // 생각해보자 어디에 넣을지
                            // if (uData.isEmpty())
                            // return product;

                            // 카트 일 시 금액 변동 O
                            if (upperFlag.equals(FLAG_CART_ONLY))
                                uData.forEach(f -> hashMap.put(f.getEDP(), f.getCART().toString()));

                            // 그 외 금액 변동 X
                            else
                                uData.forEach(f -> hashMap.put(f.getEDP(), "1"));
                        }
                        if (hashMap.size() > 0)
                              rfcproduct = erp.ProcuctList(UserInfo.getCOMP(), UserInfo.getCUST(), UserInfo.getACLASS(),
                                  UserInfo.getBCLASS(), UserInfo.getCCLASS(), hashMap, UserInfo.getLANG());
                        else {
                            if(upperFlag.equals(FLAG_NOMAL)) {
                                rfcproduct = erp.ProcuctList(UserInfo.getCOMP(), UserInfo.getCUST(), UserInfo.getACLASS(),
                                  UserInfo.getBCLASS(), UserInfo.getCCLASS(), hashMap, UserInfo.getLANG());
                            } else {
                                return product;
                            }
                        }
                            
                    }

                    // EDPNO 조회
                    else if (upperFlag.equals(FLAG_EDPNO_ONLY)) {
                        rfcproduct = erp.ProcuctList(UserInfo.getCOMP(), UserInfo.getCUST(), UserInfo.getEDPNO(),
                                UserInfo.getLANG());
                    }

                    // EDPNM 조회
                    else if (upperFlag.equals(FLAG_EDPNM_ONLY)) {
                        rfcproduct = erp.ProcuctList(UserInfo.getCOMP(), UserInfo.getCUST(), UserInfo.getEDPNO(),
                                UserInfo.getEDPNM(), UserInfo.getLANG());
                    }

                    Result rst = erp.getLastError();
                    if (rst.getMessageCode() == -9)
                        throw new Exception(rst.getMessage());

                    if (UserInfo.getCONDM().size() > 0 && rfcproduct.size() != UserInfo.getCONDM().size())
                        throw new Exception(rst.getMessage());

                    if (rfcproduct.size() > 0) {
                        for (int i = 0; i < rfcproduct.size(); i++) {
                            String edpno = rfcproduct.get(i).getEdpNo();
                            Optional<CTNOM> ctnom = uData.stream().filter(t -> t.getEDP().equals(edpno)).findFirst();
                            com.yg1.yoswebapp.model.Product prd = new com.yg1.yoswebapp.model.Product();
                            prd.setuserid(UserInfo.getUSERID());
                            prd.setedp(rfcproduct.get(i).getEdpNo());
                            prd.setaClass(rfcproduct.get(i).getaClass());
                            prd.setaClassNM(rfcproduct.get(i).getaClassNM());
                            prd.setbClass(rfcproduct.get(i).getbClass());
                            prd.setbClassNM(rfcproduct.get(i).getbClassNM());
                            prd.setcClass(rfcproduct.get(i).getcClass());
                            prd.setcClassNM(rfcproduct.get(i).getcClassNM());
                            prd.setproduct(rfcproduct.get(i).getProductName());
                            prd.setstandard(rfcproduct.get(i).getType());
                            prd.setprice(rfcproduct.get(i).getListPrice());
                            prd.setNetprice(rfcproduct.get(i).getNetPrice());
                            prd.setcurrency(rfcproduct.get(i).getCurrency());
                            prd.setVkey(rfcproduct.get(i).getVKey());
                            prd.setBatch1(rfcproduct.get(i).getBatch1());
                            prd.setBatch2(rfcproduct.get(i).getBatch2());
                            prd.setquantity(rfcproduct.get(i).getQuantity());
                            prd.setpacking(rfcproduct.get(i).getPackingUnit());
                            if (ctnom.isPresent()) {
                                prd.setordermark(ctnom.get().getORDERMARK());
                                prd.setcart(ctnom.get().getCART());
                            }
                            product.add(prd);
                        }
                    }
                    if(uData.size() == product.size()){
                        product.sort(new Comparator<com.yg1.yoswebapp.model.Product>() {
                            @Override
                            public int compare(com.yg1.yoswebapp.model.Product s1, com.yg1.yoswebapp.model.Product s2) {
                                int a = uData.indexOf(uData.stream().filter(f -> f.getEDP().equals(s1.getedp())).findFirst().get());
                                int b = uData.indexOf(uData.stream().filter(f -> f.getEDP().equals(s2.getedp())).findFirst().get());
                                if (a < b) {
                                    return -1;
                                } else if (a > b) {
                                    return 1;
                                }
                                return 0;
                            }
                        });
                    }
                    return product;
                } catch (final Exception e) {
                    throw e;
                }
            }

        } catch (final Exception e) {
            System.out.println("SAP연결에 실패하였습니다.");
            throw e;
        } finally {
            System.out.println("======================");
        }
    }

    public boolean compare(String str1, String str2) {
        return (str1 == null ? str2 == null : str1.equals(str2));
    }


    /**
     * USER 관련 DB 데이터 GET (MSSQL)
     * 
     * @param USERID 유저 아이디
     * @param flag   조회 별 구분 FLAG
     * @return 필터링 된 USER 데이터
     */
    public List<CTNOM> GET_USER_DATA(String USERID, String flag) {

        // MSSQL - 유저 관련된 전체 DATA
        List<CTNOM> uData = cartService.findByUSERID(USERID);
        List<CTNOM> result = new ArrayList<>();

        if (uData != null && !uData.isEmpty()) {
            switch (flag.toUpperCase()) {
                case FLAG_CART_ONLY:
                    result = uData.stream().filter(f -> f.getCART() != 0).collect(Collectors.toList());
                    break;

                case FLAG_ORDER_MARK_ONLY:
                    result = uData.stream().filter(f -> f.getORDERMARK() != 0).collect(Collectors.toList());
                    break;

                default:
                    result = uData;
                    break;
            }
        }
        return result;
    }

}