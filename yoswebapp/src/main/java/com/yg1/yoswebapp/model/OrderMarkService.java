package com.yg1.yoswebapp.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderMarkService {
    @Autowired
    private OrderMarkRepository orderMarkRepository;

    public OrderMarkRepository gOrderMarkRepository()
    {
        return orderMarkRepository;
    }
   
    /**
     * 사용자 ID 로 장바구니 검색
     * @param USERID
     * @return
     */
    public List<CTNOM> findByUSERID(String USERID) {
        return orderMarkRepository.findByUSERID(USERID);
    }

    /**
     * 장바구니 삭제할 LIST
     * 사용자 ID 와 EDP 로 검색
     * @param USERID
     * @param EDP
     * @return
     */
    public CTNOM findByTwo(String USERID , String EDP){
        return orderMarkRepository.findByUSERIDAndEDP(USERID, EDP);
    }
   
  
}