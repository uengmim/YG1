package com.yg1.yoswebapp.model;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<USRIO, Integer> {
    /**
     * 사용자 아이디로 정보 찾음
     * @param USRID
     * @return
     */
    USRIO findByUSRID(String USRID);
    
    /**
     * 플랜트 별 고객 검색
     * @param USRPL
     * @return
     */
    ArrayList<USRIO> findByUSRPL(String USRPL);


    /**
     * 회사별 플랜트편 검색
     * @param COMP 회사코드
     * @param USRPLS 플랜트들
     * @return
     */
    @Query("SELECT u FROM USRIO as u WHERE u.USRCO = :COMP AND u.USRPL IN (:USRPLS)")
    ArrayList<USRIO> findByUSRCOAndUSRPLS(@Param("COMP") String COMP, @Param("USRPLS") List<String> USRPLS);
    
    /**
     * 회사별 고객 검색
     * @param COMP 회사코드
     * @return
     */
    ArrayList<USRIO> findByUSRCO(String COMP);
}