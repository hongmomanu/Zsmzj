package Zsmzj.business.dao;

import Zsmzj.enums.ProcessType;
import Zsmzj.jdbc.JdbcFactory;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 下午2:51
 * To change this template use File | Settings | File Templates.
 */
public class BusinessProcessDao {
    private static final Logger log = Logger.getLogger(BusinessProcessDao.class);
    private static final String UserTable="users";


    public ArrayList<Map<String,Object>> getNeedToDoLists(ArrayList<Map<String,Object>> arr,int start
                                                          ,int limit,String keyword,String tablename){

        Connection testConn= JdbcFactory.getConn("sqlite");
        String match_str="";
        for(Map<String,Object> item:arr){
            match_str+=item.get("name").toString()+" OR ";
        }
        match_str=match_str.substring(0,match_str.lastIndexOf("OR"));
        String sql=  "select a.processstatus,b.displayname,a.time,a.rowid   from "+
                tablename+" a,"+UserTable+" b where processstatus  MATCH ? ";
        if(keyword!=null)sql+="AND ? ";
        sql+="and a.userid=b.id Limit ? Offset ?";
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        try {
            pstmt.setString(1,match_str);
            if(keyword!=null){
                pstmt.setString(2,keyword);
                pstmt.setInt(3, limit);
                pstmt.setInt(4,start);
            }else{
                pstmt.setInt(2, limit);
                pstmt.setInt(3,start);
            }

            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> map=new HashMap<String, Object>();
                String processstatus=rs.getString("processstatus");
                map.put("processstatus",processstatus);
                map.put("process", ProcessType.UseProcessType.getNext(ProcessType.UseProcessType.getProcessFromChinese(processstatus)));
                map.put("businessid",rs.getInt("rowid"));
                map.put("displayname",rs.getString("displayname"));
                map.put("time",rs.getString("time"));
                list.add(map);
            }

        }catch (Exception E){
            log.debug(E.getMessage());
        }finally {
            return list;
        }





    }
    public int getNeedToDoCounts (ArrayList<Map<String, Object>> arr,String keyword,String tablename){


        Connection testConn= JdbcFactory.getConn("sqlite");
        String match_str="";
        for(Map<String,Object> item:arr){
            match_str+=item.get("name").toString()+" OR ";
        }
        match_str=match_str.substring(0,match_str.lastIndexOf("OR"));
        String sql=  "select count(*)   from "+
                tablename+" where processstatus  MATCH ? ";
        if(keyword!=null)sql+="AND ?";
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        int totalnums=0;
        try {
            pstmt.setString(1,match_str);
            if(keyword!=null)pstmt.setString(1,keyword);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                totalnums=rs.getInt(1);
            }
            return totalnums;
        }catch (Exception E){
            log.debug(E.getMessage());
            return totalnums;
        }




    }

    public int insertTableVales(Map<String,Object> col_vals,String tablename){
        Connection conn= JdbcFactory.getConn("sqlite");
        String col_str="";
        String val_str="";
        ArrayList<String> val_arr=new ArrayList<String>();
        Iterator iter = col_vals.keySet().iterator();
        while (iter.hasNext()) {
            String key = iter.next().toString();
            String val = col_vals.get(key).toString();
            val_arr.add(val);
            val_str+="?,";
            col_str+=key+",";

        }
        //col_str=col_str.substring(0,col_str.length()-1);
        //val_str=val_str.substring(0,val_str.length()-1);
        col_str+="time";
        val_str+="?";

        String sql = "insert  into " + tablename +
                " ("+col_str+") values " +"("+val_str+")";

        log.debug(sql);
        log.debug(val_arr);
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);
        try {
            int i=0;
            for( i=0;i<val_arr.size();i++){

                pstmt.setString(i+1, val_arr.get(i)==null?"":val_arr.get(i));

            }
            SimpleDateFormat   sDateFormat   =   new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String   date   =   sDateFormat.format(new   java.util.Date());
            pstmt.setString(i+1, date);
            //pstmt.addBatch();
            //int[] ret = pstmt.executeBatch();
            //pstmt.clearBatch();
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            finally {
                log.debug(ex.getMessage());
                return -1;
            }


        }


    }


}
