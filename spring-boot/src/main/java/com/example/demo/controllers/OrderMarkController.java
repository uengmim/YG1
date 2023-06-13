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

import com.example.demo.model.ErrorMsg;
import com.example.demo.model.OrderMark;

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
public class OrderMarkController {

    // ID 값을 기준으로 ORDERMARKS SELECT (진행 중 = 에러 코드 X)
    @GetMapping("/ordermarks/{id}")
    public List<OrderMark> OrderMarksList(@PathVariable(value = "id") String userid) {
        System.out.println("======================");
        System.out.println("오더마크 정보를 불러옵니다.");
        System.out.println(userid);
        List<OrderMark> tOrderMarks = new ArrayList<>();
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        try {
            String url = "jdbc:sqlserver://xnsvr01.xntec.co.kr:4543;databaseName=EDUCATION;";
            String DBID = "xnuser";
            String DBPWD = "xntec9786";

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            System.out.println("MSSQL 연결 되었습니다.");

            String SQL = "SELECT A.USERID, A.PRODUCT, A.EDP , A.STANDARD, A.PRICE, A.STOCK, A.PACKING, CASE WHEN B.CART IS NULL THEN '0' ELSE B.CART END AS CART FROM YG1_ORDERMARK AS A LEFT JOIN YG1_CART AS B ON A.USERID = B.USERID AND A.EDP = B.EDP WHERE A.USERID = '"
                    + userid + "'";

            statement = connection.createStatement();
            resultSet = statement.executeQuery(SQL);

            if (resultSet == null) {
                // 오류 구문 넣기
                System.out.println("MSSQL 쿼리의 값이 없습니다.");
            }
            while (resultSet.next()) {
                OrderMark orderMark = new OrderMark();
                orderMark.setproduct(resultSet.getString("product"));
                orderMark.setedp(resultSet.getString("edp"));
                orderMark.setstandard(resultSet.getString("standard"));
                orderMark.setprice(resultSet.getInt("price"));
                orderMark.setstock(resultSet.getString("stock"));
                orderMark.setpacking(resultSet.getString("packing"));
                orderMark.setcart(resultSet.getInt("cart"));
                orderMark.setuserid(resultSet.getString("userid"));

                tOrderMarks.add(orderMark);

            }
            System.out.println(tOrderMarks.size() + "만큼 오더마크를 가져옵니다.");

            return tOrderMarks;

        } catch (Exception e) {
            // 오류 구문 넣기
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
        return tOrderMarks;
    }

    // OrderMarks INSERT (진행 중 - 에러 코드 X)
    @PostMapping("/ordermarks")
    public List<OrderMark> createOrderMark(@Valid @RequestBody OrderMark orderMark) {
        System.out.println("======================");
        System.out.println("오더마크를 추가합니다.");
        List<OrderMark> tOrderMarks = new ArrayList<>();
        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            String url = "jdbc:sqlserver://xnsvr01.xntec.co.kr:4543;databaseName=EDUCATION;";
            String DBID = "xnuser";
            String DBPWD = "xntec9786";

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            System.out.println("MSSQL 연결 완료");
            String SQL = "INSERT INTO YG1_OrderMark (USERID,PRODUCT,EDP,STANDARD,PRICE,STOCK,PACKING) VALUES (?,?,?,?,?,?,?)";
            preparedStatement = connection.prepareStatement(SQL);
            preparedStatement.setString(1, orderMark.getuserid());
            preparedStatement.setString(2, orderMark.getproduct());
            preparedStatement.setString(3, orderMark.getedp());
            preparedStatement.setString(4, orderMark.getstandard());
            preparedStatement.setInt(5, orderMark.getprice());
            preparedStatement.setString(6, orderMark.getstock());
            preparedStatement.setString(7, orderMark.getpacking());

            preparedStatement.executeUpdate();
            System.out.println("오더마커 추가하였습니다.");
        } catch (Exception e) {
            System.out.println("오더마커 추가를 실패했습니다.");
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
        return tOrderMarks;
    }

    // OrderMarks DELETE (진행 완료 - 에러 코드 O)
    @PostMapping("/ordermarks/DELETE")
    public ErrorMsg deleteOrderMark(@Valid @RequestBody OrderMark orderMark) {
        System.out.println("======================");
        System.out.println("오더마크 삭제 테스트");
        ErrorMsg errorMsg = new ErrorMsg(true, "OK");
        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            String url = "jdbc:sqlserver://xnsvr01.xntec.co.kr:4543;databaseName=EDUCATION;";
            String DBID = "xnuser";
            String DBPWD = "xntec9786";

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            System.out.println("MSSQL 연결 완료");
            String SQL = "DELETE FROM YG1_OrderMark WHERE USERID = ? AND EDP = ? ";
            preparedStatement = connection.prepareStatement(SQL);
            preparedStatement.setString(1, orderMark.getuserid());
            preparedStatement.setString(2, orderMark.getedp());

            preparedStatement.executeUpdate();
            System.out.println("오더마커 삭제하였습니다.");
        } catch (Exception e) {
            errorMsg.setBlCode(false);
            errorMsg.setErrMsg("Not DELETE");
            System.out.println("오더마커 삭제를 실패했습니다.");
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
        return errorMsg;
    }
}