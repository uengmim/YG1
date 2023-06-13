package com.example.demo.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.example.demo.model.User;

import org.springframework.stereotype.Repository;

@Repository
public class UserDaoLogic implements UserDao {

    //로그인&토큰검사
    @Override
    public User findByUsername(String username) {
        Connection connection = null;
        PreparedStatement psmt = null;
        ResultSet resultSet = null;
        User user = null;

        try {
            System.out.println("=======토큰값 검사=======");

            String url = "jdbc:sqlserver://xnsvr01.xntec.co.kr:4543;databaseName=EDUCATION;";
            String DBID = "xnuser";
            String DBPWD = "xntec9786";

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            // MSSQL 연결 확인
            System.out.println("MSSQL 연결 되었습니다.");

            String SQL = "SELECT * FROM YG1_USER WHERE user_id=?";

            if (resultSet == null) {
                System.out.println("MSSQL 쿼리의 값이 없습니다.");
            }
            user = new User();
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            psmt = connection.prepareStatement(SQL.toString());
            psmt.setString(1, username);
            resultSet = psmt.executeQuery();

            if (resultSet.next()) {
                user.setUsername(resultSet.getString("user_id"));
                user.setPassword(resultSet.getString("user_password"));
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            try {
                if (connection != null && !connection.isClosed()) {
                    psmt.close();
                    
                    System.out.println("MSSQL 쿼리를 종료합니다.");
                    connection.close();
                    System.out.println("MSSQL 연결이 끊겼습니다.");
                    
                }
            } catch (SQLException exception) {
                exception.printStackTrace();
            }
            System.out.println("=======토큰값 검사 끝=======");

        }
        return user;
    }

    //회원가입
	@Override
	public Integer save(User user) {
        Connection connection = null;
		PreparedStatement psmt = null;
        ResultSet resultSet = null;
        int result = 0;
        try {
            System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@");

            String url = "jdbc:sqlserver://xnsvr01.xntec.co.kr:4543;databaseName=EDUCATION;";
            String DBID = "xnuser";
            String DBPWD = "xntec9786";

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            // MSSQL 연결 확인
            System.out.println("MSSQL 연결 되었습니다.");

            String SQL = "insert into YG1_USER (user_id, user_password) VALUES (?, ?)";

            if (resultSet == null) {
                System.out.println("MSSQL 쿼리의 값이 없습니다.");
            }

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            psmt = connection.prepareStatement(SQL.toString());
            psmt.setString(1, user.getUsername());
            psmt.setString(2, user.getPassword());
            result = psmt.executeUpdate();
   
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            try {
                if (connection != null && !connection.isClosed()) {
                    psmt.close();
                    System.out.println("MSSQL 쿼리를 종료합니다.");
                    connection.close();
                    System.out.println("MSSQL 연결이 끊겼습니다.");
                    
                }
            } catch (final SQLException exception) {
                exception.printStackTrace();
            }
        }
        return result;
    }
}