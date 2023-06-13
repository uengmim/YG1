package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Test;
import com.example.demo.model.Test2;
import com.example.demo.model.Test3;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TestController {

	@RequestMapping(value = "/test", method = RequestMethod.GET, produces = "application/json")
	public List<Test> firstPage() {
		
		return createList();
	}

	private static List<Test> createList() {
		List<Test> tempTest = new ArrayList<>();
		List<Test2> tempTest2 = createList2();
		Test list1 = new Test();
		list1.setName("인서트");
		list1.setChildren(tempTest2);

		tempTest.add(list1);

		return tempTest;

	}

	private static List<Test2> createList2() {
		List<Test2> tempTest = new ArrayList<>();
		for (int i = 0; i < 2; i++) {
			Test2 list1 = new Test2();
			if (i < 1) {
				list1.setName("터닝인서트");
				list1.setChildren(createList3(1));
				tempTest.add(list1);
			} else {
				//Test2 list1 = new Test2();
				list1.setName("밀링인서트");
				list1.setChildren(createList3(2));
				tempTest.add(list1);
			}

		}

		return tempTest;
	}

	private static List<Test3> createList3(int i) {
		List<Test3> tempTest = new ArrayList<>();

		if (i == 1) {

			for (int j = 0; j < 3; j++) {
				Test3 list1 = new Test3();
				if (j <1) {
					list1.setName("CCGT");
					tempTest.add(list1);
				} else if (j >= 1 && j < 2) {
					list1.setName("CCMT");
					tempTest.add(list1);
				} else {
					list1.setName("CNMA");
					tempTest.add(list1);
				}
			}

			
		} else {

			for (int j = 0; j < 2; j++) {
				Test3 list2 = new Test3();
				if (j == 0) {
					list2.setName("페이스밀 ISO");
					tempTest.add(list2);
				} else {
					list2.setName("포큐파인");
					tempTest.add(list2);
				} 
			}
		}

		return tempTest;
	}

}
