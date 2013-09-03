package Zsmzj.conmmon;

import Zsmzj.jdbc.JdbcFactory;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-9-3
 * Time: 上午11:49
 * To change this template use File | Settings | File Templates.
 */
public class ComonDao {
    private static final Logger log = Logger.getLogger(ComonDao.class);
    public int getTotalCount(String tablename){
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select count(*) from "+tablename;
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        int result=0;
        try {
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                 result=rs.getInt(1);
            }
        }catch (Exception e){
            log.debug(e.getMessage());
        }finally {
            return result;
        }


    }



}
