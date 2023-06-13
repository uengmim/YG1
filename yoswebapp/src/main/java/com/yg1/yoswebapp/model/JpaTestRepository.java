package com.yg1.yoswebapp.model;

import java.util.List;

import com.yg1.yoswebapp.model.JpaTest;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 * JPA TEST 레포지토리
 */
public interface JpaTestRepository extends CrudRepository<JpaTest, String> {
    /**
     * 사용자 이름으로 자료 찾기
     * @param userName
     * @return
     */
    @Query("SELECT e FROM JpaTest e WHERE e.USERNM = :userName")  
    List<JpaTest> findByUserNam(@Param("userName")String userName);

    /**
     * 리스트의 사용자 이름으로 자료 찾기     * 
     * @param userNames
     * @return
     */
    @Query("SELECT e FROM JpaTest e WHERE e.USERNM  IN (:userNames)") 
    List<JpaTest> findByUserNames(@Param("userNames")List<String> userNames);

    // List<JpaTest> findByUSERNM(String userNames);
}