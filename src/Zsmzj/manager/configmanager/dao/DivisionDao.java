package Zsmzj.manager.configmanager.dao;

import Zsmzj.jdbc.JdbcFactory;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-26
 * Time: 下午4:08
 * To change this template use File | Settings | File Templates.
 */
public class DivisionDao {

    private static final String DivisionTable="divisions";
    private static final Logger log = Logger.getLogger(DivisionDao.class);

    public ArrayList<Map<String, Object>>   getDivisions(int parentid){
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select divisionname,divisionpath,rowid from "+DivisionTable+" where parentid=?";

        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            pstmt.setInt(1,parentid);
            log.debug(parentid);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> obj=new HashMap<String, Object>();
                obj.put("text",rs.getString("divisionname"));
                obj.put("divisionpath",rs.getString("divisionpath"));
                obj.put("id",rs.getInt("rowid"));
                list.add(obj);

            }
            log.debug(list);
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }


    }
    public int delDivision(int divisionid){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "delete  from " + DivisionTable +
                " where rowid=? ";

        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);
        try {
            pstmt.setInt(1, divisionid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }

    }
    public int addNewDivision(String divisionname,String divisionpath,int parentid){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "insert  into " + DivisionTable +
                " (divisionname,divisionpath,parentid) values (?,?,?)  ";

        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);
        try {
            pstmt.setString(1, divisionname);
            pstmt.setString(2, divisionpath);
            pstmt.setInt(3, parentid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }


    }

}
