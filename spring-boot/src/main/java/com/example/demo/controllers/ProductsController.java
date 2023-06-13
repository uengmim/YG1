package com.example.demo.controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.model.products;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping
public class ProductsController {

    //SAP 데이터 대체 DB 데이터 ==== SAP 연결시 삭제확인 바람
    @GetMapping("/products/{id}")
    public List<products> ProductsList(@PathVariable(value = "id") String userid) {
        System.out.println("======================");
        System.out.println("오더마크 정보를 불러옵니다.");
        System.out.println(userid);
        List<products> tProducts = new ArrayList<>();
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        try {

            String url = "jdbc:sqlserver://xnsvr01.xntec.co.kr:4543;databaseName=EDUCATION;";
            String DBID = "xnuser";
            String DBPWD = "xntec9786";

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            // MSSQL 연결 확인
            System.out.println("MSSQL 연결 되었습니다.");

            // String SQL = "SELECT * FROM YG1_PRODUCT";
            String SQL = "SELECT A.PRODUCT,A.EDP,A.STANDARD,A.PRICE,A.STOCK,A.PACKING, "
            + "CASE WHEN B.USERID IS NULL THEN '0' ELSE B.USERID END AS USERID, "
            + "CASE WHEN B.EDP IS NULL THEN '0' ELSE '1' END AS ORDERMARK, "
            + "CASE WHEN C.CART IS NULL THEN '0' ELSE C.CART END AS CART "
            + "FROM YG1_PRODUCT AS A LEFT JOIN YG1_ORDERMARK AS B "
            + "ON A.EDP = B.EDP AND ( B.USERID = '" + userid + "' OR B.USERID IS NULL ) "
            + "LEFT JOIN YG1_CART AS C "
            + "ON B.EDP = C.EDP AND B.USERID = C.USERID";
            System.out.println(SQL);
            statement = connection.createStatement();
            System.out.println("MSSQL 쿼리를 실행합니다.");
            resultSet = statement.executeQuery(SQL);
            System.out.println("MSSQL 쿼리의 값을 조회합니다.");

            if (resultSet == null) {
                System.out.println("MSSQL 쿼리의 값이 없습니다.");
            }
            while (resultSet.next()) {
                products productsList = new products();
                productsList.setproduct(resultSet.getString("product"));
                productsList.setedp(resultSet.getString("edp"));
                productsList.setstandard(resultSet.getString("standard"));
                productsList.setprice(resultSet.getInt("price"));
                productsList.setstock(resultSet.getString("stock"));
                productsList.setpacking(resultSet.getString("packing"));
                productsList.setordermark(resultSet.getString("ordermark"));
                productsList.setuserid(resultSet.getString("userid"));
                productsList.setcart(resultSet.getInt("cart"));

                tProducts.add(productsList);

            }
            System.out.println(tProducts.size() + "만큼 제품목록을 가져옵니다.");

            return tProducts;

        } catch (Exception e) {
            System.out.println("MSSQL 연결이 실패 하였습니다.");
        } finally {
            try {
                if (connection != null && !connection.isClosed()) {
                    statement.close();
                    System.out.println("MSSQL 쿼리를 종료합니다.");
                    connection.close();
                    System.out.println("MSSQL 연결이 끊겼습니다.");
                }
            } catch (SQLException exception) {
                exception.printStackTrace();
            }
            System.out.println("======================");

        }
        return tProducts;



    }


}

    


