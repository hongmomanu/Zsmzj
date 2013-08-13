package Zsmzj.manager.usermanager.dao;

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
 * Date: 13-8-9
 * Time: 上午11:06
 * To change this template use File | Settings | File Templates.
 */
public class FuncDao {
    private static final Logger log = Logger.getLogger(FuncDao.class);
    private  static String FuncTable="functions";
    public ArrayList<Map<String, Object>> getFuncs(int start, int limit, String keyword) {
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select funcname,functype,id,label,imgurl from "+FuncTable+" Limit "+limit+" Offset "+ start;
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> func=new HashMap<String, Object>();
                func.put("funcname",rs.getString("funcname"));
                func.put("functype",rs.getString("functype"));
                func.put("label",rs.getString("label"));
                func.put("imgurl",rs.getString("imgurl"));
                func.put("funcid",rs.getInt("id"));
                list.add(func);

            }
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }

    }
    public int addNewFunc(String funcname,String functype){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "insert  into " + FuncTable + " (funcname,functype) values (?,?)  ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setString(1, funcname);
            pstmt.setString(2, functype);

            //pstmt.setInt(7, Integer.parseInt(params.get("keyid").toString()));
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }



    }

    public int EditFunc(int funcid,String funcname,String functype,String label,String imgurl)
    {
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "update " + FuncTable + " set funcname=?,functype=?," +
                "label=?,imgurl=? where id=? ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setString(1, funcname);
            pstmt.setString(2, functype);
            pstmt.setString(3, label);
            pstmt.setString(4, imgurl);
            pstmt.setInt(5, funcid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }

    }

    public int delFunc (int funcid){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "delete  from " + FuncTable + " where id=? ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setInt(1, funcid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }



    }


}
