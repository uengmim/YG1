package com.example.demo.controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import com.example.demo.model.CartList;
import com.example.demo.model.ErrorMsg;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping
public class CartController {

    //장바구니 업데이트 (진행 중 = 에러 코드 X)
    @PostMapping("/cartitems")
    public List<CartList> Update(@Valid @RequestBody CartList cartTest) {
        System.out.println("======================");
        System.out.println("장바구니에 추가합니다.");
        List<CartList> tCartTests = new ArrayList<>();
        Connection connection = null;
        PreparedStatement preparedStatement = null;
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

            String SQL = "SELECT * FROM YG1_CART WHERE EDP = '" + cartTest.getedp() + "' AND USERID = '"
                    + cartTest.getuserid() + "'";
            statement = connection.createStatement();
            resultSet = statement.executeQuery(SQL);

            if (resultSet != null) {
                if (resultSet.next()) {

                    SQL = "UPDATE YG1_CART SET CART = ? WHERE EDP = ? AND USERID = ?";
                    preparedStatement = connection.prepareStatement(SQL);
                    preparedStatement.setInt(1, cartTest.getcart());
                    preparedStatement.setString(2, cartTest.getedp());
                    preparedStatement.setString(3, cartTest.getuserid());

                } else {
                    SQL = "INSERT INTO YG1_CART (PRODUCT,EDP,STANDARD,PRICE,STOCK,PACKING,CART,USERID) VALUES (?,?,?,?,?,?,?,?)";
                    preparedStatement = connection.prepareStatement(SQL);
                    preparedStatement.setString(1, cartTest.getproduct());
                    preparedStatement.setString(2, cartTest.getedp());
                    preparedStatement.setString(3, cartTest.getstandard());
                    preparedStatement.setInt(4, cartTest.getprice());
                    preparedStatement.setString(5, cartTest.getstock());
                    preparedStatement.setString(6, cartTest.getpacking());
                    preparedStatement.setInt(7, cartTest.getcart());
                    preparedStatement.setString(8, cartTest.getuserid());

                }
            }
            System.out.println("현재 실행된 쿼리 구문 = " + SQL);

            preparedStatement.executeUpdate();
            System.out.println("MSSQL 업데이트 완료했습니다.");

        } catch (Exception e) {
            System.out.println("MSSQL 업데이트를 실패했습니다.");
        } finally {
            try {
                if (connection != null && !connection.isClosed()) {
                    preparedStatement.close();
                    System.out.println("MSSQL 쿼리를 종료합니다.");
                    connection.close();
                    System.out.println("MSSQL 연결이 끊겼습니다.");
                }
            } catch (SQLException exception) {
                exception.printStackTrace();
            }
            System.out.println("======================");
        }
        return tCartTests;

    }
    
    //장바구니 삭제 (진행 완료 = 에러 코드 O)
    @PostMapping("/cartitems/DELETE")
    public ErrorMsg Delete(@Valid @RequestBody CartList cartTest) {
        System.out.println("======================");
        System.out.println("장바구니 목록을 삭제합니다.");
        System.out.println("현재 유저 ID = " + cartTest.getuserid());
        ErrorMsg ErrorMsg = new ErrorMsg(true, "OK");
        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            String url = "jdbc:sqlserver://xnsvr01.xntec.co.kr:4543;databaseName=EDUCATION;";
            String DBID = "xnuser";
            String DBPWD = "xntec9786";

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            System.out.println("MSSQL 연결 완료");
            String SQL = "DELETE FROM YG1_CART WHERE USERID = ? AND EDP = ?";
            preparedStatement = connection.prepareStatement(SQL);
            preparedStatement.setString(1,cartTest.getuserid());
            preparedStatement.setString(2,cartTest.getedp());
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            ErrorMsg.setBlCode(false);
            ErrorMsg.setErrMsg("Not Delete");
            System.out.println("장바구니 삭제를 실패하였습니다.");
        } finally {
            try {
                if (connection != null && !connection.isClosed()) {
                    preparedStatement.close();
                    System.out.println("MSSQL 쿼리를 종료합니다.");
                    connection.close();
                    System.out.println("MSSQL 연결이 끊겼습니다.");
                }
            } catch (SQLException exception) {
                exception.printStackTrace();
            }
            System.out.println("======================");
        }
        return ErrorMsg;


    }

    // ID 값을 기준으로 CART SELECT (진행 중 = 에러 코드 X)
    @GetMapping("/cartitems/{id}")
    public List<CartList> CartAllList(@PathVariable(value = "id") String userid) {
        System.out.println("======================");
        System.out.println("장바구니 목록을 가져옵니다.");
        System.out.println("유저 아이디 = " + userid);
        List<CartList> tCartTests = new ArrayList<>();
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

            String SQL = "SELECT * FROM YG1_CART WHERE USERID ='" + userid + "'";

            statement = connection.createStatement();
            System.out.println("MSSQL 쿼리를 실행합니다.");
            resultSet = statement.executeQuery(SQL);
            System.out.println("MSSQL 쿼리의 값을 조회합니다.");


            if (resultSet == null) {
                System.out.println("MSSQL 쿼리의 값이 없습니다.");
                return tCartTests;
            }
            while (resultSet.next()) {
                CartList CartTestItems = new CartList();
                CartTestItems.setproduct(resultSet.getString("product"));
                CartTestItems.setedp(resultSet.getString("edp"));
                CartTestItems.setstandard(resultSet.getString("standard"));
                CartTestItems.setprice(resultSet.getInt("price"));
                CartTestItems.setstock(resultSet.getString("stock"));
                CartTestItems.setpacking(resultSet.getString("packing"));
                CartTestItems.setcart(resultSet.getInt("cart"));
                CartTestItems.setuserid(resultSet.getString("userid"));

                tCartTests.add(CartTestItems);

            }
            System.out.println(tCartTests.size() + "만큼 장바구니 목록을 가져옵니다.");


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
        return tCartTests;
    }
}