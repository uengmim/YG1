package com.yg1.yoswebapp.model;

import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 * JPA TEST 레포지토리
 */
public interface OrderNORepository extends CrudRepository<OrderNO, String> {
    /**
     * 사용자 이름으로 자료 찾기
     * @param userName
     * @return
     */
    @Procedure(name = "GET_ORDERNO")  
    String getOrderNO(@Param("@COMP")String COMP, @Param("@TDAT")String TDAT);

}