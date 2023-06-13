package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;

public class Test2 {
    private String name;
    private List<Test3> children = new ArrayList<>();

    public Test2() {
    }

    public List<Test3> getChildren() {
        return children;
    }

    public void setChildren(List<Test3> test3) {
      
        for(int i = 0; i < test3.size(); i++){
            this.children.add(test3.get(i));
        }
       
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}