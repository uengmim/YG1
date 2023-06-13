package com.yg1.yoswebapp.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface OrderMarkRepository extends  JpaRepository<CTNOM,String>
{
    /**
     * 사용자 ID 로 장바구니 검색
     * @param uSERID
     * @return
     */
    @Query("SELECT p FROM CTNOM as p WHERE p.USERID = ?1 AND p.ORDERMARK != 0")
    List<CTNOM> findByUSERID(String uSERID);

    /**
     * 장바구니 삭제할 LIST
     * 사용자 ID 와 EDP 로 검색
     * @param uSERID
     * @param eDP
     * @return
     */
	CTNOM findByUSERIDAndEDP(String uSERID, String eDP);

}