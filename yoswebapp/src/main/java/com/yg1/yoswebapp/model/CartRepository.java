package com.yg1.yoswebapp.model;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository
public interface CartRepository extends  JpaRepository<CTNOM,String>
{


    /**
     * 사용자 ID로 전체 관련 데이터 검색
     * @param uSERID 사용자 ID
     * @return
     */
    List<CTNOM> findByUSERID(String uSERID, Sort sort);

    /**
     * 사용자 ID 로 장바구니 검색
     * @param uSERID
     * @return
     */
    @Query("SELECT p FROM CTNOM as p WHERE p.USERID = ?1 AND p.CART != 0")
    List<CTNOM> findByUSERID1(String uSERID, Sort sort);


    /**
     * 장바구니 삭제할 LIST
     * 사용자 ID 와 EDP 로 검색
     * @param uSERID
     * @param eDP
     * @return
     */
	CTNOM findByUSERIDAndEDP(String uSERID, String eDP);

    @Transactional
    void deleteByUSERID(String uSERID);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE CTNOM p SET p.SEQNUM = 0 WHERE p.USERID = ?1")
    void updateSEQ(String uSERID);

}