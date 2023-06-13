package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;

import com.example.demo.dao.OrderDao;
import com.example.demo.model.Destination;
// import com.example.demo.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class OrderController {

    @Autowired
    private OrderDao dao;
    // @Autowired
    // private OrderService service;

    // 배송지 등록
    @RequestMapping(value = "/registerDestination", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Integer> registerUser(@RequestBody Destination destination) {
        Destination newdestination = new Destination();
        HashMap<String, Integer> map = new HashMap<>();
        newdestination.setUsername(destination.getUsername());
        newdestination.setAddress(destination.getAddress());
        map.put("result", dao.saveDestination(newdestination));

        return map;
    }

    // 배송지 호출
    @RequestMapping(value = "/getDestinations", method = RequestMethod.POST)
    public List<Destination> getDestinations(@RequestBody String username) {

        return dao.callDestination(username);
    }

    // 배송지 삭제
    @RequestMapping(value = "/removeDestinations", method = RequestMethod.POST)
    public int removeDestinations(@RequestBody Destination[] destinations) {
        System.out.println(destinations);
        return dao.deleteDestination(destinations);

    }
}