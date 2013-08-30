package Zsmzj.business.dao;

import Zsmzj.enums.ProcessType;
import Zsmzj.jdbc.JdbcFactory;
import org.apache.log4j.Logger;

import java.sql.*;
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


    public  ArrayList<Map<String, Object>> getAffixfilebybid(int businessid,String tablename){
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select attachmenttype from "+tablename+" where businessid MATCH ? group by attachmenttype";
        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        try {
            pstmt.setInt(1, businessid);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> map=new HashMap<String, Object>();
                String typename=rs.getString("attachmenttype");
                String sql_child="select * from "+tablename+" where rowid in (" +
                        "select rowid from "+tablename+" where businessid MATCH ? AND  ROWID in (" +
                        "select rowid from "+tablename+" where attachmenttype MATCH ?))" +
                        "";
                PreparedStatement pstmt_child = JdbcFactory.getPstmt(testConn, sql_child);
                pstmt_child.setInt(1,businessid);
                pstmt_child.setString(2,typename);
                ResultSet rs_child = pstmt_child.executeQuery();
                ArrayList<Map<String,Object>> list_child=new ArrayList<Map<String, Object>>();
                while (rs_child.next()){
                    Map<String,Object> map_child=new HashMap<String, Object>();
                    map_child.put("attachmentname",rs_child.getString("attachmentname"));
                    map_child.put("attachmentpath",rs_child.getString("attachmentpath"));
                    list_child.add(map_child);
                }
                map.put("attachmenttype",typename);
                map.put("results",list_child);
                list.add(map);

            }
        }catch (Exception E){
            log.debug(E.getMessage());
        }
        finally {
            return list;
        }




    }
    public Map<String,Object> getApplyForm(int businessid,String tablename){
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select a.*,b.displayname   from "+
                tablename+" a,"+UserTable+" b where a.rowid =? and a.userid=b.id ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        Map<String,Object> map=new HashMap<String, Object>();
        try {
            pstmt.setInt(1, businessid);
            ResultSet rs = pstmt.executeQuery();
            ResultSetMetaData data=rs.getMetaData();
            int colnums=data.getColumnCount();
            while (rs.next()) {
                for(int i = 1;i<= colnums;i++){
                    String columnName = data.getColumnName(i);
                    String value=rs.getString(columnName);
                    map.put(columnName,value);

                }
            }
        }catch (Exception E){
            log.debug(E.getMessage());
        }
        finally {
             return map;
        }


    }
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
