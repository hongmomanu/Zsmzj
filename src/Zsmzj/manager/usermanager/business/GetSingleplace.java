package Zsmzj.manager.usermanager.business;

import Zsmzj.jdbc.JdbcFactory;
import net.sf.json.JSONArray;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-4-22
 * Time: 上午9:26
 * To change this template use File | Settings | File Templates.
 */
public class GetSingleplace {

    public String getPlace(String type) {
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Map<String,Object> obj=new HashMap<String, Object>();
        if("shi".equals(type)){
            obj.put("label","舟山市");
            obj.put("value","舟山市");
            obj.put("sid","0");
            list.add(obj);
        }else{
            Connection cn= JdbcFactory.getConn("sqlite");
            int sid = Integer.parseInt(type);
            String sql = "select rowid,divisionname from divisions where parentid ="+type ;
            PreparedStatement pstmt = JdbcFactory.getPstmt(cn, sql);
            try {
                ResultSet rs = pstmt.executeQuery();
                while (rs.next()){
                    Map<String,Object> qobj=new HashMap<String, Object>();
                    qobj.put("label",rs.getString("divisionname"));
                    qobj.put("value",rs.getString("divisionname"));
                    qobj.put("sid",rs.getString("rowid"));
                    list.add(qobj);
                }
            } catch (SQLException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        }

        return JSONArray.fromObject(list).toString();
    }

}
