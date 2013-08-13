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
public class UserDao {
    private static final Logger log = Logger.getLogger(UserDao.class);
    private static String  UserTable="users";
    public ArrayList<Map<String, Object>> getUsers(int start, int limit, String keyword) {
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select username,time,id from "+UserTable+" Limit "+limit+" Offset "+ start;
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> user=new HashMap<String, Object>();
                user.put("username",rs.getString("username"));
                user.put("time",rs.getString("time"));
                user.put("userid",rs.getInt("id"));
                list.add(user);

            }
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }

    }

    public int addnewUser (String username,String password,int roleid){

        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "insert  into " + UserTable + " (username,password,roleid) values (?,?,?)  ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setString(1, username);
            pstmt.setString(2, password);
            pstmt.setInt(3, roleid);

            //pstmt.setInt(7, Integer.parseInt(params.get("keyid").toString()));
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }


    }

}
