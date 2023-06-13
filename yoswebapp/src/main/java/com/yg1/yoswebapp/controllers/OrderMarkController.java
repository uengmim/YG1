package com.yg1.yoswebapp.controllers;

import java.util.List;

import javax.validation.Valid;

import com.yg1.yoswebapp.model.CTNOM;
import com.yg1.yoswebapp.model.OrderMarkRepository;
import com.yg1.yoswebapp.model.OrderMarkService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class OrderMarkController {
    @Autowired
    private OrderMarkService orderMarkService;

    @Autowired
    private OrderMarkRepository orderMarkRepository;

    /**
     * DB 전체 주요품목 조회
     * @return
     */
    @GetMapping("/ordermarks")
    public List<CTNOM> getAllCartList() {
        return orderMarkRepository.findAll();
    }

    /**
     * USERID 기준으로 주요품목 조회
     * @param USERID
     * @return
     * @throws Exception
     */
    @GetMapping("/ordermarks/{id}")
    public List<CTNOM> getOrderMarkByUSERID(@PathVariable(value = "id") String USERID) throws Exception {
        try {
            List<CTNOM> OrderMarkList = orderMarkService.findByUSERID(USERID);       
            
        
            return OrderMarkList;
        }
        catch (Exception e){
            throw e;
        }
    }
    /**
     * USERID / EDP 기준 주요품목 삭제(0으로 변경)
     * @param USERID
     * @param EDP
     * @return
     * @throws Exception
     */
    @DeleteMapping("/ordermarks/{id},{edp}")
    public ResponseEntity<CTNOM>  deleteOrderMark(@PathVariable(value = "id")String USERID,@PathVariable(value = "edp")String EDP) throws Exception{
        try{
            CTNOM ordermark = orderMarkService.findByTwo(USERID, EDP);
            ordermark.setORDERMARK(0);
            final CTNOM updatedordermark = orderMarkRepository.save(ordermark);
            return ResponseEntity.ok(updatedordermark);
        }
        catch(Exception e){
            throw e;
        }
    }
    /**
     * USERID / EDP 기준 주요품목 수정 & 추가
     * @param USERID
     * @param EDP
     * @param CartItems
     * @return
     * @throws Exception
     */
    @PutMapping("/ordermarks/{id},{edp}")
    public ResponseEntity<CTNOM> updateOrderMark(@PathVariable (value = "id")String USERID,@PathVariable (value = "edp") String EDP,
    @Valid @RequestBody CTNOM Items) throws Exception{
        try {
            CTNOM ordermark = orderMarkService.findByTwo(USERID, EDP);
            if(ordermark != null){
            ordermark.setORDERMARK(1);
            final CTNOM updatedordermark = orderMarkRepository.save(ordermark);
            return ResponseEntity.ok(updatedordermark);
            }
            else{
                Items.setORDERMARK(1);
                final CTNOM insertOrderMark = orderMarkRepository.save(Items);

                return ResponseEntity.ok(insertOrderMark);
            }
            
        }
        catch(Exception e){
            throw e;
        }
    }

}