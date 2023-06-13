package com.yg1.yoswebapp.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public CartRepository gCartRepository()
    {
        return cartRepository;
    }
   
    /**
     * 사용자 ID 로 장바구니 검색
     * @param USERID
     * @return
     */
    public List<CTNOM> findByUSERID(String USERID) {
        return cartRepository.findByUSERID(USERID, Sort.by("SEQNUM"));
    }

    public List<CTNOM> findUserCart(String USERID) {
        return cartRepository.findByUSERID1(USERID, Sort.by("SEQNUM"));
    }


    /**
     * 장바구니 삭제할 LIST
     * 사용자 ID 와 EDP 로 검색
     * @param USERID
     * @param EDP
     * @return
     */
    public CTNOM findByTwo(String USERID , String EDP){
        return cartRepository.findByUSERIDAndEDP(USERID, EDP);
    }

    @Transactional
    public void updateSEQ(String USERID) {
        cartRepository.updateSEQ(USERID);
    }
   
  
}