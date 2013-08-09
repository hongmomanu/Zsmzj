package Zsmzj.manager.usermanager.dao;

import Zsmzj.jdbc.JdbcFactory;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
public class RoleDao {
    private static final Logger log = Logger.getLogger(RoleDao.class);
    public ArrayList<Map<String, Object>> getRoles(int start, int limit, String keyword) {
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select rolename,id from roles Limit "+limit+" Offset "+ start;
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> role=new HashMap<String, Object>();
                role.put("rolename",rs.getString("rolename"));
                role.put("roleid",rs.getInt("id"));
                list.add(role);

            }
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }

    }

}
