package com.yg1.yoswebapp.model;

import java.util.ArrayList;
import java.util.List;

public class Nav1 {
	private String key;
	private String name;
	private List<Nav2> children = new ArrayList<>();

	public Nav1() {
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public List<Nav2> getChildren() {
		return children;
	}

	public void setChildren(List<Nav2> children) {

		for(int i = 0; i < children.size(); i++){
			this.children.add(children.get(i));
		}
		
        this.children.sort((a,b)-> a.getKey().compareTo(b.getKey()));
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}



}