package Zsmzj.conmmon;

import Zsmzj.jdbc.JdbcFactory;

import java.sql.Connection;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * User: Administrator
 * Date: 14-3-21
 * Time: 上午10:48
 */
public class ReadDbColumns {
    public static void  query(String sql) throws SQLException {
        Connection conn= JdbcFactory.getConn("sqlite");
        Statement stmt=conn.createStatement();
        ResultSetMetaData metaData=stmt.executeQuery(sql).getMetaData();
        int count=metaData.getColumnCount();
        String buf="";
        for(int i=1;i<=count;i++){
           buf+=metaData.getColumnName(i).toLowerCase()+",";
        }
        System.out.println(buf);
        stmt.close();
        conn.close();
    }
    public static  void main(String[] args) throws SQLException {
        ReadDbColumns.query("select * from business_back");
    }
}
