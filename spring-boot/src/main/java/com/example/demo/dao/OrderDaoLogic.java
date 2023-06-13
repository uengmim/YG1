package com.example.demo.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.model.Destination;
import org.springframework.stereotype.Repository;

@Repository
public class OrderDaoLogic implements OrderDao {

	//배송지 등록
    @Override
	public Integer saveDestination(Destination destination) {
        Connection connection = null;
		PreparedStatement psmt = null;
        ResultSet resultSet = null;
        int result = 0;
        try {
            System.out.println("배송지 등록");

            String url = "jdbc:sqlserver://xnsvr01.xntec.co.kr:4543;databaseName=EDUCATION;";
            String DBID = "xnuser";
            String DBPWD = "xntec9786";

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            // MSSQL 연결 확인
            System.out.println("MSSQL 연결 되었습니다.");

            String SQL = "insert into YG1_DESTINATION (user_id, user_address) VALUES (?, ?)";

            if (resultSet == null) {
                System.out.println("MSSQL 쿼리의 값이 없습니다.");
            }

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            psmt = connection.prepareStatement(SQL.toString());
            psmt.setString(1, destination.getUsername());
            psmt.setString(2, destination.getAddress());
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

    //배송지 호출
    @Override
	public List<Destination> callDestination(String username) {
		Connection connection = null;
		PreparedStatement psmt = null;
		ResultSet rs = null;
		List<Destination> destinations = new ArrayList<Destination>();

		try {
            System.out.println("배송지 호출");

            String url = "jdbc:sqlserver://xnsvr01.xntec.co.kr:4543;databaseName=EDUCATION;";
            String DBID = "xnuser";
            String DBPWD = "xntec9786";

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            // MSSQL 연결 확인
            System.out.println("MSSQL 연결 되었습니다.");

            String SQL = "select * from YG1_DESTINATION where user_id = ?";

			psmt = connection.prepareStatement(SQL);
			psmt.setString(1, username);
			rs = psmt.executeQuery();
			while (rs.next()) {
				Destination destination = new Destination();
				destination.setUsername(rs.getString(1));
				destination.setAddress(rs.getString(2));
				destinations.add(destination);

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
            } catch (final SQLException exception) {
                exception.printStackTrace();
            }
		}
		return destinations;
    }

    //배송지 삭제
    @Override
    public Integer deleteDestination(Destination[] destinations) {
        Connection connection = null;
		PreparedStatement psmt = null;
        ResultSet resultSet = null;
        int result = 0;
        try {
            System.out.println("배송지 삭제");

            String url = "jdbc:sqlserver://xnsvr01.xntec.co.kr:4543;databaseName=EDUCATION;";
            String DBID = "xnuser";
            String DBPWD = "xntec9786";

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            // MSSQL 연결 확인
            System.out.println("MSSQL 연결 되었습니다.");

            StringBuilder builders = new StringBuilder();

            for( int i = 0 ; i < destinations.length; i++ ) {
                builders.append(String.format("'%s',", destinations[i].getAddress().trim()));
            }

            String SQL = String.format("DELETE FROM YG1_DESTINATION WHERE user_id = ? and user_address in (%s)", 
            builders.substring(0, builders.length()-1).toString());

            if (resultSet == null) {
                System.out.println("MSSQL 쿼리의 값이 없습니다.");
            }

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, DBID, DBPWD);
            psmt = connection.prepareStatement(SQL.toString());
            psmt.setString(1, destinations[0].getUsername());
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
