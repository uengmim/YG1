package com.example.demo.dao;

import com.example.demo.model.User;

public interface UserDao {
	User findByUsername(String username);
	public Integer save(User user); 
}
