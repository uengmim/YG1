package com.example.demo.dao;

import java.util.List;

import com.example.demo.model.Destination;

public interface OrderDao {
    public Integer saveDestination(Destination destination);
	public List<Destination> callDestination(String username);
	public Integer deleteDestination(Destination[] destinations); 
}