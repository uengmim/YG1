package com.yg1.yoswebapp.controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.yg1.yoswebapp.apiInterface.ERPInterface;
import com.yg1.yoswebapp.message.ProductCategory;
import com.yg1.yoswebapp.message.Result;

import com.yg1.yoswebapp.model.Nav1;
import com.yg1.yoswebapp.model.Nav2;
import com.yg1.yoswebapp.model.Nav3;
import com.yg1.yoswebapp.model.COMP;
import com.yg1.yoswebapp.model.ClassRealat;

@RestController
public class NavController {

	@RequestMapping(value = "api/nav", method = RequestMethod.POST)
	public List<Nav1> firstPage(@RequestBody COMP USRCO) {
		try {
			return createList(USRCO.getCOMP(), USRCO.getLANG());
		} catch (Exception e) {
			List<Nav1> list = new ArrayList<Nav1>();
			return list;
		}
	}

	private static List<Nav1> createList(String USRCO, String LANG) throws Exception {
		ArrayList<Nav1> tempList1 = new ArrayList<>();

		try {
			// Sap RFC Call
			ERPInterface erp = new ERPInterface();
			erp.LoadERP(USRCO);

			if (!erp.ERPConnect()) {
				Result result = erp.getLastError();
				System.out.println("SAP 연결에 실패 하였습니다.");
				throw new Exception(result.getMessage());
			} else {
				try {
					System.out.println("SAP 연결에 성공 하였습니다.");
					// 제품 카테고리 데이터
					ArrayList<ProductCategory> productCategory = erp.ProcuctCategoryList(USRCO, LANG);
					ArrayList<ClassRealat> aClass_col = new ArrayList<>();
					ArrayList<ClassRealat> bClass_col = new ArrayList<>();

					// 대, 중, 키값으로 Distinct
					for (int i = 0; i < productCategory.size(); i++) {
						ClassRealat aClassc = new ClassRealat(productCategory.get(i).getaClass(), "",
								productCategory.get(i).getaClassName(), "");

						String aClass = productCategory.get(i).getaClass();
						Optional<ClassRealat> checkAClass = aClass_col.stream()
								.filter(t -> t.getpClass().equals(aClass)).findFirst();
						if (!checkAClass.isPresent())
							aClass_col.add(aClassc);

						ClassRealat bClassc = new ClassRealat(productCategory.get(i).getaClass(),
								productCategory.get(i).getbClass(), productCategory.get(i).getaClassName(),
								productCategory.get(i).getbClassName());

						String bClass = productCategory.get(i).getbClass();
						Optional<ClassRealat> checkBClass = bClass_col.stream()
								.filter(t -> t.getpClass().equals(aClass) && t.getchClass().equals(bClass)).findFirst();

						if (!checkBClass.isPresent())
							bClass_col.add(bClassc);
					}

					// 대, 중, 소분류 Navigation 트리구조로 변경
					for (int i = 0; i < aClass_col.size(); i++) {

						ArrayList<Nav2> tempList2 = new ArrayList<>();
						String aClass = aClass_col.get(i).getpClass();
						List<ClassRealat> subList2 = bClass_col.stream().filter(t -> t.getpClass().equals(aClass))
								.collect(Collectors.toList());

						subList2.forEach(bit -> {
							ArrayList<Nav3> tempList3 = new ArrayList<>();
							String bClass = bit.getchClass();
							List<ProductCategory> subList3 = productCategory.stream()
									.filter(t -> t.getbClass().equals(bClass) && t.getaClass().equals(aClass))
									.collect(Collectors.toList());
							subList3.forEach(it -> {
								Nav3 temp3 = new Nav3();
								temp3.setKey(it.getcClass());
								temp3.setName(it.getcClassName());
								tempList3.add(temp3);
							});
							// Optional<ProductCategory> subList2 =
							// productCategory.stream().filter(t->t.getbClass().equals(bClass)).findFirst();
							Nav2 temp2 = new Nav2();
							temp2.setKey(bit.getchClass());
							temp2.setName(bit.getchClassNM());
							temp2.setChildren(tempList3);
							// if(!tempList2.contains(temp2))

							tempList2.add(temp2);
						});
						// for(int j = 0;j<bClass_col.size();j++){

						// }
						// String aClass = aClass_col.get(i).getpClass();
						// Optional<ProductCategory> subList1 =
						// productCategory.stream().filter(t->t.getaClass().equals(aClass)).findFirst();
						Nav1 temp1 = new Nav1();
						temp1.setKey(aClass_col.get(i).getpClass());
						temp1.setName(aClass_col.get(i).getpClassNM());
						temp1.setChildren(tempList2);
						// if(!tempList1.contains(temp1))
						tempList1.add(temp1);
					}					
				} catch (Exception e) {
					System.out.println("SAP 데이터가 없습니다.");
				}

				tempList1.sort((a,b)-> a.getKey().compareTo(b.getKey()));
				return tempList1;
			}
		} catch (Exception e) {
			System.out.println("SAP 연결에 실패 하였습니다.");
			return tempList1;
		}
	}

	// private static List<Nav2> createList2() {
	// List<Nav2> tempTest = new ArrayList<>();
	// for (int i = 0; i < 2; i++) {
	// Nav2 list1 = new Nav2();
	// if (i < 1) {
	// list1.setKey("m1");
	// list1.setName("터닝인서트");
	// list1.setChildren(createList3(1));
	// tempTest.add(list1);
	// } else {
	// //Test2 list1 = new Test2();
	// list1.setKey("m2");
	// list1.setName("밀링인서트");
	// list1.setChildren(createList3(2));
	// tempTest.add(list1);
	// }

	// }

	// return tempTest;
	// }

	// private static List<Nav3> createList3(int i) {
	// List<Nav3> tempTest = new ArrayList<>();

	// if (i == 1) {

	// for (int j = 0; j < 3; j++) {
	// Nav3 list1 = new Nav3();
	// if (j <1) {
	// list1.setKey("s1");
	// list1.setName("CCGT");
	// tempTest.add(list1);
	// } else if (j >= 1 && j < 2) {
	// list1.setKey("s2");
	// list1.setName("CCMT");
	// tempTest.add(list1);
	// } else {
	// list1.setKey("s3");
	// list1.setName("CNMA");
	// tempTest.add(list1);
	// }
	// }

	// } else {

	// for (int j = 0; j < 2; j++) {
	// Nav3 list2 = new Nav3();
	// if (j == 0) {
	// list2.setKey("s4");
	// list2.setName("페이스밀 ISO");
	// tempTest.add(list2);
	// } else {
	// list2.setKey("s5");
	// list2.setName("포큐파인");
	// tempTest.add(list2);
	// }
	// }
	// }

	// return tempTest;
	// }
}