package com.yg1.yoswebapp.controllers;

import java.util.ArrayList;
import java.util.List;

import com.yg1.yoswebapp.model.CartRepository;
import com.yg1.yoswebapp.model.JwtUserDetailsService;
import com.yg1.yoswebapp.model.USRIO;
import com.yg1.yoswebapp.model.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class UserController {

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @RequestMapping(value = "api/userinfo", method = RequestMethod.POST)
    public USRIO userinfo(@RequestBody USRIO user) throws Exception {
        return userDetailsService.getUSRIO(user.getUSRID());
    }

    @RequestMapping(value = "api/duplicate", method = RequestMethod.POST)
    public boolean duplicate(@RequestBody USRIO user) throws Exception {
        return userDetailsService.checkByUSRID(user.getUSRID());
    }

    @RequestMapping(value = "api/register", method = RequestMethod.POST)
    public USRIO saveUser(@RequestBody USRIO user) throws Exception {
        user.setUSRPW(bcryptEncoder.encode(user.getUSRPW()));
        return userRepository.save(user);
    }

    @RequestMapping(value = "api/editPw", method = RequestMethod.POST)
    public USRIO editPw(@RequestBody USRIO user) throws Exception {
        USRIO newuser = new USRIO();
        newuser = userRepository.findByUSRID(user.getUSRID());
        newuser.setUSRPW(bcryptEncoder.encode(user.getUSRPW()));
        return userRepository.save(newuser);
    }
    @RequestMapping(value = "api/delUser", method = RequestMethod.POST)
    public ResponseEntity<?> delUser(@RequestBody USRIO user) throws Exception {
        USRIO newuser = new USRIO();
        newuser = userRepository.findByUSRID(user.getUSRID());
        cartRepository.deleteByUSERID(newuser.getUSRID());
        userRepository.delete(newuser);
        return new ResponseEntity<>(HttpStatus.OK);
    }



    @RequestMapping(value = "api/editLa", method = RequestMethod.POST)
    public USRIO editLa(@RequestBody USRIO user) throws Exception {
        USRIO newuser = new USRIO();
        newuser = userRepository.findByUSRID(user.getUSRID());
        newuser.setUSRLA(user.getUSRLA());
        return userRepository.save(newuser);
    }


    @RequestMapping(value = "api/editLaPw", method = RequestMethod.POST)
    public USRIO editLaPw(@RequestBody USRIO user)throws Exception{
        USRIO newuser = new USRIO();
        newuser = userRepository.findByUSRID(user.getUSRID());
        newuser.setUSRPW(bcryptEncoder.encode(user.getUSRPW()));
        newuser.setUSRLA(user.getUSRLA());
        return userRepository.save(newuser);
    }

    @RequestMapping(value = "api/cuinfo", method = RequestMethod.POST)
    public List<USRIO> cuinfo(@RequestBody USRIO user) throws Exception {
        return userDetailsService.getCustomers(user.getUSRPL());
    }


    @RequestMapping(value="api/usertable", method=RequestMethod.POST)
    public List<USRIO> usertable(@RequestBody USRIO user) throws Exception  {
        return userDetailsService.getCustomers(user.getUSRCO(), user.getUSRPL());
    }

    // @RequestMapping(value="api/usertable", method=RequestMethod.POST)
    // public List<USRIO> usertable(@RequestBody String comp, String usrpl) throws Exception  {
    //     return userDetailsService.getCustomers(comp,usrpl);
    // }
    
}