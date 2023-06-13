package com.yg1.yoswebapp.model;

import java.util.ArrayList;
import java.util.List;

import com.yg1.yoswebapp.model.JpaTestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JpaTestService {

    @Autowired
    private JpaTestRepository jpaTestRepository;

    /**
     * REpository
     * @return
     */
    public JpaTestRepository getJpaTestRepository()
    {
        return jpaTestRepository;
    }

    /**
     * 모든 항목을 Return 한다.
     * @return
     */
    public List<JpaTest> findAll()
    {
        List<JpaTest> jpaTestList = new ArrayList<JpaTest>();
        Iterable<JpaTest> it = jpaTestRepository.findAll();
        it.forEach(item->
        {
            jpaTestList.add(item);
        });

        return jpaTestList;
    }

    /**
     * 사용자 이름을 검색 한다.
     * @param userName
     * @return
     */
    public List<JpaTest> findUserName(String userName) {
        return jpaTestRepository.findByUserNam(userName);
    }

    // public List<JpaTest> findUSERNM(String userName) {
    //     return jpaTestRepository.findByUSERNM(userName);
    // }
}