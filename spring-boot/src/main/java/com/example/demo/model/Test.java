package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;

public class Test {
	private String name;
	private List<Test2> children = new ArrayList<>();

	public Test() {
	}

	public List<Test2> getChildren() {
		return children;
	}

	public void setChildren(List<Test2> children) {
	
		for(int i = 0; i < children.size(); i++){
			this.children.add(children.get(i));
		}
		
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}



}