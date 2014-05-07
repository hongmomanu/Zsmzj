package Zsmzj.business.control;

import Zsmzj.business.dao.BusinessProcessDao;
import Zsmzj.business.impl.BusinessProcess;
import Zsmzj.conmmon.ComonDao;
import Zsmzj.enums.EnumApplyType;
import Zsmzj.enums.ProcessType;
import Zsmzj.enums.RelationsType;
import Zsmzj.enums.StatisticsType;
import Zsmzj.jdbc.JdbcFactory;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.collections.ArrayStack;
import org.apache.log4j.Logger;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;
import java.util.concurrent.CountDownLatch;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 下午3:19
 * To change this template use File | Settings | File Templates.
 */
public class BusinessProcessControl {

    private static final Logger log = Logger.getLogger(BusinessProcessControl.class);
    private final String BusinessTable="business";
    private final String BusinessChangeTable="businesschange";
    private final String ApprovalTable="approvalprocess";
    private final String FamilyTable="familymembers";
    private final String FamilyHistoryTable="familymembershistory";
    private final String UserTable="users";
    private final String DivisionsTable="divisions";
    private final String SignatureTable="businesssignature";
    private final String VirtualindexTable="virtualindexrelation";
    private  final String GrantTable="grantmoney";
    private final String MeidicalStandard="medicalstandard";
    public int getNeedTodoCounts(int roleid,int userid,String divisionpath){
        BusinessProcess bp=new BusinessProcess();
        return bp.getNeedTodoCounts(roleid,userid,divisionpath,null);

    }
    public String searchbusinessbypid(int start,int limit,String query,String[]types,String totalname,String rowsname){
        ComonDao cd =new ComonDao();
        totalname=totalname==null?"totalCount":totalname;
        rowsname=rowsname==null?"results":rowsname;
        String sql_count= "select count(*)   from "+
                BusinessTable+" a,"+FamilyTable+" b where a.id=b.businessid "+
                "and b.personid=a.owerid ";
        String sql_list=  "select a.*,b.sex,b.businessid   from "+
                BusinessTable+" a,"+FamilyTable+" b where a.id=b.businessid " +
                "and b.personid=a.owerid ";
        if(query!=null&&!query.equals("")){

            sql_count+=" and a.owerid like '"+query+"%' ";
            sql_list+=" and a.owerid like '"+query+"%' ";
        }

        sql_count+=" and a.processstatus='"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Approval)+"' and b.relationship =  '"+
                RelationsType.UseRelationsType.getChineseSeason(RelationsType.ower)
                +"' ";

        sql_list+=" and a.processstatus='"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Approval)+"' and b.relationship =  '"+
                RelationsType.UseRelationsType.getChineseSeason(RelationsType.ower)
                +"' ";


        if(types!=null){
            sql_list+=" and a.businesstype IN (";
            sql_count+=" and a.businesstype IN (";
            for(int i=0;i<types.length;i++){
                //sql_list+=arr[i]+"* OR ";
                sql_list+=
                        "'"+types[i] +"' "+
                                ",";

                sql_count+=
                        "'"+types[i] +"' "+
                                ",";

            }
            sql_list=sql_list.substring(0,sql_list.lastIndexOf(","))+") ";
            sql_count=sql_count.substring(0,sql_count.lastIndexOf(","))+") ";
        }


        sql_list+="Limit "+limit+" Offset "+start;
        int totalCount=cd.getTotalCountBySql(sql_count);
        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);
        Map<String,Object>res=new HashMap<String, Object>();
        res.put(totalname,totalCount);
        res.put(rowsname,list);
        return JSONObject.fromObject(res).toString();

    }
    public String getAnnouce(int start,int limit,int userid,String keyword){
        ComonDao cd=new ComonDao();
        int announcenum=cd.getTotalCountBySql("select count(*) from "+BusinessTable+" a,"+ApprovalTable+
                " b where a.rowid=b.businessid and CAST(submituid AS real)>0 and b.userid MATCH "+userid) ;

        ArrayList<Map<String,Object>>list =cd.getTableList("select a.processstatus,b.* from "+BusinessTable+" a,"+ApprovalTable+
                " b where a.rowid=b.businessid and CAST(submituid AS real)>0 and b.userid MATCH "+userid +" Limit "+limit+" Offset "+start);

        for(Map<String,Object> map:list){
            map.put("process", ProcessType.UseProcessType.getNext(ProcessType.UseProcessType.
                    getProcessFromChinese(map.get("processstatus").toString())));
        }


        Map<String,Object>res=new HashMap<String, Object>();
        res.put("totalCount",announcenum);
        res.put("results",list);
        return JSONObject.fromObject(res).toString();

    }
    public String getIndexMsg(int roleid,int userid){
        SimpleDateFormat sDateFormat   =   new SimpleDateFormat("yyyy-MM-dd");
        String datenow=sDateFormat.format(new   java.util.Date());

        java.util.Calendar   calendar=java.util.Calendar.getInstance();
        calendar.setTime(new java.util.Date());
        calendar.add(Calendar.MONTH, +1);    //得到下一个月
        String eddate=sDateFormat.format(calendar.getTime());

        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        ComonDao cd=new ComonDao();
        int publicinfonum=cd.getTotalCountBySql("select count(*) from "+BusinessTable+" where publicityedtm Between '"
        +datenow+"' and '"+eddate+"'");
        int announcenum=cd.getTotalCountBySql("select count(*) from "+BusinessTable+" a,"+ApprovalTable+
                " b where a.rowid=b.businessid and CAST(submituid AS real)>0 and b.userid MATCH "+userid) ;
        Map<String,Object> publicinfo=new HashMap<String, Object>();
        publicinfo.put("name","公示信息");
        publicinfo.put("num",publicinfonum);
        publicinfo.put("value","needtodobusinesspanel");
        publicinfo.put("type","widget");

        Map<String,Object> announce=new HashMap<String, Object>();
        announce.put("name","公告消息");
        announce.put("num",announcenum);
        announce.put("value","announcegridpanel");
        announce.put("type","widget");

        list.add(publicinfo);
        list.add(announce);
        return JSONArray.fromObject(list).toString();


    }
    public String grantmoneybytype(int userid,String bgdate,String eddate,String grantdate,String businesstype,
                                   float adjustmoney,boolean isnew,String[] grant_arr,String divisionpath){
        SimpleDateFormat sDateFormat   =   new SimpleDateFormat("yyyy-MM");

        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();
        String processstatustype=ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation);
        if(bgdate==null){
            grantdate+="-00-00";
        }
        String num_sql="select count(*) from "+GrantTable+" a,"+BusinessTable+
                " b where a.businessid = b.id and (a.grantdate Between '"
                +bgdate+"' and  '"+eddate+"' or a.grantdate Between '"+grantdate+"' and '"
                +grantdate+"')  and b.businesstype = '"+businesstype+"' and b.division like  '"+divisionpath+"%' " +
                "and b.processstatustype != '"+processstatustype+"' " ;
        String ids="";
        if(grant_arr!=null&&grant_arr.length>0){
            ids=" and b.id in (";
            for(int i=0;i<grant_arr.length;i++){
				if(i!=0){
					ids+=",";
					ids+=grant_arr[i];
				}
                 else {
					ids+=grant_arr[i];
				}
            }
            ids+=") ";
            num_sql+=ids;
        }
        int totalnum=cd.getTotalCountBySql(num_sql);
        if(totalnum>0&&isnew){
            return "{\"success\":true,\"msg\":\"资金已发放，若想重新发放请点击资金重新发放\"}";
        }
        else{
            String delsql="delete from "+GrantTable+" where rowid in(select a.rowid from "+GrantTable+" a,"+BusinessTable+
                    " b where b.id=a.businessid and (a.grantdate Between '"
                    +bgdate+"' and  '"+eddate+"' or a.grantdate Between '"+grantdate+"' and '"
                    +grantdate+"')  and b.businesstype = '"+businesstype+"' "+ids+" and b.division like '"+divisionpath+"%' "
                    +" and b.processstatustype != '"+processstatustype+"' "
                    +")";
            cd.delbysql(delsql);
            String sql_list="select rowid as businessid from "+BusinessTable+" b where b.businesstype = '"+businesstype+"' " +
                    "and b.processstatus = '"
                    +ProcessType.UseProcessType.getChineseSeason(ProcessType.Approval)+"'"+ids
                    +" and b.division like '"+divisionpath+"%' "
                    +" and b.processstatustype != '"+processstatustype+"' ";

            //log.debug("资金发放开始::"+sql_list);

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);
            BusinessProcessDao bDao=new BusinessProcessDao();

            for(Map<String,Object> item:list){
                Map<String,Object> param=new HashMap<String, Object>();
                param.put("businessid",item.get("businessid"));
                param.put("eddate",eddate==null?"":eddate);
                param.put("bgdate",bgdate==null?"":bgdate);
                param.put("grantdate",grantdate);
                param.put("userid",userid);
                param.put("adjustmoney",adjustmoney);
                bDao.insertTableVales(param, GrantTable);
            }
            return "{\"success\":true,\"msg\":\"资金已发\"}";
        }

    }
    public String changeStatusbybid(int businessid,String status){
        BusinessProcess bp=new BusinessProcess();
        int result=bp.changeStatus(businessid,status);
        if(result>0)return "{\"success\":true}";
        else  return "{\"success\":false}";
    }
    public String changeProcessStatustype(int businessid,String processstatustype,String processstatus){
        BusinessProcess bp=new BusinessProcess();
        int result=bp.changeProcessStatustype(businessid,processstatustype,processstatus);
        if(result>0)return "{\"success\":true}";
        else  return "{\"success\":false}";


    }
    public String getGrantMoneyBytype(String type,String bgmonth,String keyword,String[]name,
                                      String[]compare,String[]value,String[]logic,int start,int limit,
                                      String bgdate,String eddate,String divisionpath,String totalname,String rowsname){
        totalname=totalname==null?"totalCount":totalname;
        rowsname=rowsname==null?"results":rowsname;
        SimpleDateFormat sDateFormat   =   new SimpleDateFormat("yyyy-MM");
        SimpleDateFormat syearFormat   =   new SimpleDateFormat("yyyy");
        String basic_sql= " a.id=b.businessid "
                +" and b.userid =c.id and  a.businesstype = '"+type+"'";

        basic_sql+=" and a.division like '"+divisionpath+"%' ";

        String sql_list="select a.*,b.businessid,b.bgdate,b.eddate,b.grantdate,b.time as granttime,b.adjustmoney," +
                "c.displayname as grantuser " +
               /* ",(select count(*)  from "+ FamilyTable+" d where " +
                "  d.businessid = a.id)  as familynum," +
                " (select count(*)  from "+ FamilyTable+" e where " +
                " e.businessid = a.id and e.isenjoyed = '享受')  as enjoynum " +*/
                "" +
                "from "+BusinessTable +" a,"+GrantTable+" b,"+UserTable
                +" c where"+basic_sql;

        String sql_count="select count(*) from "+GrantTable+" b,"+BusinessTable+
                " a,"+UserTable+" c where"+basic_sql;
        if(bgmonth!=null&&!bgmonth.equals("")){
            Date date = null;
            try {
                date = sDateFormat.parse( bgmonth);
            } catch (ParseException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.MONTH, +1);    //得到下一个月
            String edmonth=sDateFormat.format(calendar.getTime());
            String sql=" and b.time Between '"+bgmonth
                    +"' and  '"+edmonth+"' ";
            sql_list+=sql;
            sql_count+=sql;
        }
        String innerSql=" (select b.rowid,b.*,f.birthday from "+BusinessTable+" b,"+FamilyTable+" f where b.id=f.businessid and f.relationship='户主') "; //联合两张表，加入birthday
        if(name!=null&&name.length>0){
            for(int i=0;i<name.length;i++){
                String col_name=name[i].split("附")[0];
                //if(logic[i].equals("and")){
                    if(compare[i].equals(">=")){
                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+" a.rowid in (select rowid from "+innerSql+" where CAST("+col_name+" AS real) >= "+value[i]+") ";

                        }else{
                            sql=" "+logic[i]+" (a.rowid in (select rowid from "+innerSql+" where CAST("+col_name+" AS real) >= "+value[i]+") and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;


                    }else if(compare[i].equals("<=")){
                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+" a.rowid in (select rowid from "+innerSql+" where CAST("+col_name+" AS real) <= "+value[i]+") ";

                        }else{
                            sql=" "+logic[i]+" (a.rowid in (select rowid from "+innerSql+" where CAST("+col_name+" AS real) <= "+value[i]+") and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;
                    }else if(compare[i].equals("=")){
                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+"  a."+col_name+" = '"+value[i]+"' ";

                        }else{
                            sql=" "+logic[i]+"  (a."+col_name+" = '"+value[i]+"' and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;

                    }else if(compare[i].equals("match")){
                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+"  a."+col_name+" like '"+value[i]+"%' ";

                        }else{
                            sql=" "+logic[i]+"  (a."+col_name+" like '"+value[i]+"%' and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;


                    }else if(compare[i].equals("year")){
                        Date date = null;
                        try {
                            date = syearFormat.parse( value[i]);
                        } catch (ParseException e) {
                            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                        }
                        java.util.Calendar   calendar=java.util.Calendar.getInstance();
                        calendar.setTime(date);
                        calendar.add(Calendar.YEAR, +1);    //得到下一年
                        String endyear=syearFormat.format(calendar.getTime());

                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+" b."+col_name+" Between '"+value[i]
                                    +"' and  '"+endyear+"' ";

                        }else{
                            sql=" "+logic[i]+" (b."+col_name+" Between '"+value[i]
                                    +"' and  '"+endyear+"') and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;


                    }else if(compare[i].equals("beginyear")){
                        Date date = null;
                        try {
                            date = syearFormat.parse( value[i]);
                        } catch (ParseException e) {
                            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                        }
                        java.util.Calendar   calendar=java.util.Calendar.getInstance();
                        calendar.setTime(date);
                        calendar.add(Calendar.YEAR, +100);    //得到下一年
                        String endyear=syearFormat.format(calendar.getTime());

                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+" b."+col_name+" Between '"+value[i]
                                    +"' and  '"+endyear+"' ";

                        }else{
                            sql=" "+logic[i]+" (b."+col_name+" Between '"+value[i]
                                    +"' and  '"+endyear+"' and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;

                    }else if(compare[i].equals("endyear")){
                        Date date = null;
                        try {
                            date = syearFormat.parse( value[i]);
                        } catch (ParseException e) {
                            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                        }
                        java.util.Calendar   calendar=java.util.Calendar.getInstance();
                        calendar.setTime(date);
                        calendar.add(Calendar.YEAR, -100);    //得到起始年
                        String endyear=syearFormat.format(calendar.getTime());

                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+" b."+col_name+" Between '"+endyear
                                    +"' and  '"+value[i]+"' ";

                        }else{
                            sql=" "+logic[i]+" (b."+col_name+" Between '"+endyear
                                    +"' and  '"+value[i]+"') and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;

                    }
                    else if(compare[i].equals("month")){
                        Date date = null;
                        try {
                            date = sDateFormat.parse( value[i]);
                        } catch (ParseException e) {
                            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                        }
                        java.util.Calendar   calendar=java.util.Calendar.getInstance();
                        calendar.setTime(date);
                        calendar.add(Calendar.MONTH, +1);    //得到下一个月
                        String endmonth=sDateFormat.format(calendar.getTime());


                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+" b."+col_name+" Between '"+value[i]
                                    +"' and  '"+endmonth+"' ";

                        }else{
                            sql=" "+logic[i]+" (b."+col_name+" Between '"+value[i]
                                    +"' and  '"+endmonth+"'  and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;


                    }
                    else if(compare[i].equals("beginmonth")){
                        Date date = null;
                        try {
                            date = sDateFormat.parse( value[i]);
                        } catch (ParseException e) {
                            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                        }
                        java.util.Calendar   calendar=java.util.Calendar.getInstance();
                        calendar.setTime(date);
                        calendar.add(Calendar.YEAR, +100);    //得到下一个月
                        String endmonth=sDateFormat.format(calendar.getTime());

                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+" b."+col_name+" Between '"+value[i]
                                    +"' and  '"+endmonth+"' ";

                        }else{
                            sql=" "+logic[i]+" (b."+col_name+" Between '"+value[i]
                                    +"' and  '"+endmonth+"'  and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;


                    }else if(compare[i].equals("endmonth")){
                        Date date = null;
                        try {
                            date = sDateFormat.parse( value[i]);
                        } catch (ParseException e) {
                            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                        }
                        java.util.Calendar   calendar=java.util.Calendar.getInstance();
                        calendar.setTime(date);
                        calendar.add(Calendar.YEAR, -100);    //得到下一个月
                        String endmonth=sDateFormat.format(calendar.getTime());

                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+" b."+col_name+" Between '"+endmonth
                                    +"' and  '"+value[i]+"' ";

                        }else{
                            sql=" "+logic[i]+" (b."+col_name+" Between '"+endmonth
                                    +"' and  '"+value[i]+"'  and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;

                    }
                //}
            }

        }

        /*if(keyword!=null&&!keyword.equals("")){
            sql_list+=" and a.rowid in (select rowid from "+BusinessTable+"  where "+BusinessTable+" MATCH '"+keyword+"*') ";
            sql_count+=" and a.rowid in (select rowid from "+BusinessTable+"  where "+BusinessTable+" MATCH '"+keyword+"*') ";

        }*/
        SimpleDateFormat sDayFormat   =   new SimpleDateFormat("yyyy-MM-dd");
        if(bgdate!=null&&!bgdate.equals("")){
            Date date = null;
            try {
                date = sDayFormat.parse(bgdate);
            } catch (ParseException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.YEAR, +100);    //得到下一个月
            String enddate=sDateFormat.format(calendar.getTime());


            sql_list+=" and b.grantdate Between '"+bgdate
                    +"' and  '"+enddate+"' ";
            sql_count+=" and b.grantdate Between '"+bgdate
                    +"' and  '"+enddate+"' ";

        }
        if(eddate!=null&&!eddate.equals("")){

            Date date = null;
            try {
                date = sDayFormat.parse(eddate);
            } catch (ParseException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.YEAR, -100);    //得到下一个月
            String enddate=sDateFormat.format(calendar.getTime());

            sql_list+=" and b.grantdate Between '"+enddate
                    +"' and  '"+eddate+"' ";
            sql_count+=" and b.grantdate Between '"+enddate
                    +"' and  '"+eddate+"' ";


        }
        if (keyword!=null&&!keyword.equals("")){


                sql_list+=" and (a.owerid like '"+keyword+"%' or a.owername like '"+keyword+"%' ) ";
                sql_count+=" and (a.owerid like '"+keyword+"%' or a.owername like '"+keyword+"%' ) ";

        }

        ComonDao cd=new ComonDao();
        int totalnum=cd.getTotalCountBySql(sql_count);
        if(start>=0){
            sql_list+=" Limit "+limit+" Offset "+start;
        }

        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

        Map<String,Object>res=new HashMap<String, Object>();
        res.put(totalname,totalnum);
        res.put(rowsname,list);
        return JSONObject.fromObject(res).toString();
    }



    public String getStatisticsBytype(String type,String bgmonth,int divisionpid,String businesstype,
                                      String divisionpath,boolean isonlychild,boolean iddefault){
        SimpleDateFormat sDateFormat   =   new SimpleDateFormat("yyyy-MM");
        String edmonth="";
        if(bgmonth==null||bgmonth.equals("")) bgmonth=sDateFormat.format(new   java.util.Date());
        try {
            Date date = sDateFormat.parse( bgmonth);
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.MONTH, +1);    //得到下一个月
            edmonth=sDateFormat.format(calendar.getTime());

        } catch (ParseException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        Map<String,Object>res=new HashMap<String, Object>();
        if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.Full))){
            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();

            /*String sql_list="select divisionpath from "+DivisionsTable +" where parentid MATCH "+divisionpid;
            ArrayList<Map<String,Object>> division_list=cd.getTableList(sql_list);
            ArrayList<Map<String,Object>> result_list=new ArrayList<Map<String, Object>>();

            CountDownLatch latch=new CountDownLatch(5);
            for(Map<String,Object>division_item:division_list){
                Map<String,Object> map=new HashMap<String, Object>();
                map.put("division",divisionpath);
                String sql_totalfamily="select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                        "' and businesstype='"+businesstype+"' and  division like '"+division_item.get("divisionpath")+"%' ";

                SigleSqlThread m=new SigleSqlThread(map,sql_totalfamily,"totalfamily",latch);
                result_list.add(map);
                Thread t=new Thread(m);
                t.start();
            }
            try {
                log.debug("wait begin at here");
                latch.await();
            } catch (InterruptedException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            res.put("divisionname","");
            res.put("children",result_list);

*/
            String sql_list_division="select divisionpath,rowid,divisionname from "+DivisionsTable +" where parentid MATCH "+divisionpid;
            ArrayList<Map<String,Object>> division_list=cd.getTableList(sql_list_division);
            ArrayList<Map<String,Object>> result_list=new ArrayList<Map<String, Object>>();

            String sql_list_base="select  count (CASE when c.relationship= '户主' THEN 1 ELSE null  END) AS totalfamily  " +
                    ",count (*) AS totalperson " +
                    ",count (CASE when c.sex= '男' THEN 1 ELSE null  END) AS totalmen " +
                    ",count (CASE when c.sex= '女' THEN 1 ELSE null  END) AS totalgirls " +
                    ",sum(case when c.relationship='户主' then totalhelpmoney else 0 end) as totalmoney " +

                    ",count (CASE when c.relationship= '户主' and b.familyaccount='城镇' THEN 1 ELSE null  END) AS cityfamily "+
                    ",count (CASE when b.familyaccount='城镇' THEN 1 ELSE null  END) AS cityperson " +
                    ",count (CASE when b.familyaccount='城镇' and c.sex= '男' THEN 1 ELSE null  END) AS citymen " +
                    ",count (CASE when b.familyaccount='城镇' and c.sex= '女' THEN 1 ELSE null  END) AS citygirls " +
                    ",sum(case when c.relationship='户主' and b.familyaccount='城镇' then totalhelpmoney else 0 end) as citymoney " +

                    ",count (CASE when c.relationship= '户主' and b.familyaccount='农村' THEN 1 ELSE null  END) AS villagefamily "+
                    ",count (CASE when b.familyaccount='农村' THEN 1 ELSE null  END) AS villageperson " +
                    ",count (CASE when b.familyaccount='农村' and c.sex= '男' THEN 1 ELSE null  END) AS villagemen " +
                    ",count (CASE when b.familyaccount='农村' and c.sex= '女' THEN 1 ELSE null  END) AS villagegirls " +
                    ",sum(case when c.relationship='户主' and b.familyaccount='农村' then totalhelpmoney else 0 end) as villagemoney " +

                    "from "+BusinessTable+" b, "+FamilyTable +
                    " c  where  c.businessid= b.id and b.time Between '"+bgmonth+"' and  '"+edmonth
                    +"' and b.businesstype='"+businesstype+"' and  b.division like ";

            for(Map<String,Object>division_item:division_list){
                String division_item_path="'"+division_item.get("divisionpath")+"%'";
                String division_id=division_item.get("rowid").toString();
                String division_name=division_item.get("divisionname").toString();

                Map<String,Object> map=new HashMap<String, Object>();


                String sql_list=sql_list_base+division_item_path+ "";

                map=cd.getSigleObj(sql_list);
                map.put("divisionname",division_name);
                map.put("id",division_id);
                result_list.add(map);

            }
            /*合计*/
            if(division_list.size()==0&&iddefault){
                String  sql_divisionname="select divisionpath,rowid,divisionname from "+DivisionsTable +" where rowid = "+divisionpid;
                ArrayList<Map<String,Object>> division_list_1=cd.getTableList(sql_divisionname);
                String divisionname="合计";
                if(division_list_1.size()==1){
                    divisionname=division_list_1.get(0).get("divisionname").toString();
                }
                String sql_sum=sql_list_base+"'"+divisionpath+"%'";
                Map map_sum=cd.getSigleObj(sql_sum);
                map_sum.put("divisionname",divisionname);
                map_sum.put("id","9999"); //9999无效的 division_id
                result_list.add(map_sum);
            }


            res.put("divisionname","");
            res.put("children",result_list);




            /*String sql_list="select a.divisionname  ,a.rowid as id," +
                        "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and  division like (a.divisionpath||'%')) as totalfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and c.businessid = b.id and b.division like (a.divisionpath||'%')) as totalperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and c.businessid = b.id and c.sex ='男' and b.division like (a.divisionpath||'%')) as totalmen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and c.businessid = b.id and c.sex ='女' and b.division like (a.divisionpath||'%')) as totalgirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and division like (a.divisionpath||'%')) as totalmoney, "

                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='城镇' and division like (a.divisionpath||'%')) as cityfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid = b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇' and b.division like (a.divisionpath||'%')) as cityperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid = b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇' and c.sex ='男' and b.division like (a.divisionpath||'%')) as citymen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid = b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇' and c.sex ='女' and b.division like (a.divisionpath||'%')) as citygirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='城镇' and division like (a.divisionpath||'%')) as citymoney,"


                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='农村' and division like (a.divisionpath||'%')) as villagefamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid = b.id and b.familyaccount='农村' and businesstype='"+businesstype+"' and b.division like (a.divisionpath||'%')) as villageperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid = b.id and b.familyaccount='农村' and businesstype='"+businesstype+"' and c.sex ='男' and b.division like (a.divisionpath||'%')) as villagemen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid = b.id and b.familyaccount='农村' and businesstype='"+businesstype+"' and c.sex ='女' and b.division like (a.divisionpath||'%')) as villagegirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='农村' and division like (a.divisionpath||'%')) as villagemoney "



                    +"  from "+DivisionsTable+" a where a.parentid = "+divisionpid;
*/
            /*ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);*/

        }
        else if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.ComplexOne))){

            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();
            /*String sql_list="select divisionpath from "+DivisionsTable +" where parentid MATCH "+divisionpid;
            ArrayList<Map<String,Object>> division_list=cd.getTableList(sql_list);
            ArrayList<Map<String,Object>> result_list=new ArrayList<Map<String, Object>>();

            CountDownLatch latch=new CountDownLatch(1);
            for(Map<String,Object>division_item:division_list){
                Map<String,Object> map=new HashMap<String, Object>();
                String sql_totalfamily="select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                        "' and businesstype='"+businesstype+"' and  division like '"+division_item.get("divisionpath")+"%' ";

                SigleSqlThread m=new SigleSqlThread(map,sql_totalfamily,"totalfamily",latch);
                result_list.add(map);
                Thread t=new Thread(m);
                t.start();
            }
            try {
                latch.await();
            } catch (InterruptedException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            res.put("divisionname","");
            res.put("children",result_list);
*/
            String sql_list="select a.divisionname  ,a.rowid as id," +
                    "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and  division like (a.divisionpath||'%')) as totalfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.division like (a.divisionpath||'%')) as totalperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇'  and c.jobstatus ='老年人' and b.division like (a.divisionpath||'%')) as oldperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='城镇'   and  c.jobstatus ='登记失业' and b.division like (a.divisionpath||'%')) as loginnojob,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='城镇'   and  c.jobstatus ='在职职工' and b.division like (a.divisionpath||'%')) as loginjob,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='城镇'   and  c.jobstatus ='灵活就业' and b.division like (a.divisionpath||'%')) as loginlingjob,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='城镇'   and  c.jobstatus ='未登记失业' and b.division like (a.divisionpath||'%')) as nologinnojob,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='城镇'   and c.jobstatus ='在校生' and b.division like (a.divisionpath||'%')) as student,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='城镇'   and c.jobstatus ='其它' and b.division like (a.divisionpath||'%')) as jobother,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='城镇'   and c.persontype ='三无对象' and b.division like (a.divisionpath||'%')) as nonepeople,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and division like (a.divisionpath||'%')) as totalmoney, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇' and c.bodystatus like '%残%' and b.division like (a.divisionpath||'%')) as canji, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇' and c.bodystatus ='重残' and b.division like (a.divisionpath||'%')) as zhongcan, "
                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='城镇' and division like (a.divisionpath||'%')) as cityfamily ,"
                    +"(select count(*)/10000.0  from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where (strftime('%Y','now')-strftime('%Y',b.time))=0 and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇' and b.division like (a.divisionpath||'%')) as cityyearperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇' and b.division like (a.divisionpath||'%')) as cityperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇' and c.sex ='男' and b.division like (a.divisionpath||'%')) as citymen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇' and c.sex ='女' and b.division like (a.divisionpath||'%')) as citygirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real))/10000.0 from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='城镇' and division like (a.divisionpath||'%')) as citymoney,"
                    +  "(select sum(CAST(totalhelpmoney AS real))/10000.0 from "+BusinessTable+" where (strftime('%Y','now')-strftime('%Y',time))=0 and businesstype='"+businesstype+"' and familyaccount='城镇' and division like (a.divisionpath||'%')) as cityyearmoney,"
                    +  "(select avg(totalhelpmoney) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='城镇' and division like (a.divisionpath||'%')) as avgcitymoney,"
                    +  "(select avg(totalhelpmoney) from "+BusinessTable+" where (strftime('%Y','now')-strftime('%Y',time))=0 and businesstype='"+businesstype+"' and familyaccount='城镇' and division like (a.divisionpath||'%')) as avgcityyearmoney,"
                    +  "(select avg(poorstandard) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='城镇'  and poorstandard>0  and division like (a.divisionpath||'%')) as citypoorstandard,"



                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and familyaccount='农村' and businesstype='"+businesstype+"' and division like (a.divisionpath||'%')) as villagefamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and b.familyaccount='农村' and businesstype='"+businesstype+"' and b.division like (a.divisionpath||'%')) as villageperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and b.familyaccount='农村' and businesstype='"+businesstype+"' and c.sex ='男' and b.division like (a.divisionpath||'%')) as villagemen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and b.familyaccount='农村' and businesstype='"+businesstype+"' and c.sex ='女' and b.division like (a.divisionpath||'%')) as villagegirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='农村' and division like (a.divisionpath||'%')) as villagemoney "



                    +"  from "+DivisionsTable+" a where a.parentid MATCH "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);



        }else if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.ComplexTwo))){
            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();
            String sql_list="select a.divisionname  ,a.rowid as id," +
                    "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in (select rowid from "
                    +BusinessTable+" where businesstype like '%"+businesstype+"%') and  division = a.divisionpath) as newmonthfamilynum ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in ( select rowid from "+BusinessTable+" where businesstype like '%"+businesstype+"%') and c.businessid=b.rowid and b.division = a.divisionpath) as newmonthpeoplenum, "

                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in (select rowid from "+BusinessTable+" where businesstype like '%"+businesstype+"%') " +
                    "and division = a.divisionpath) as newtotalhelpmoney, "

            +"(select count(*) from "+BusinessTable+" where  time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in(select rowid from "+BusinessTable+" where  businesstype like '%"+businesstype+"%') " +
                    " and rowid in(select rowid from "+BusinessTable+" where  processstatustype  like '%"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"%') " +

                    " and  division = a.divisionpath) as logoutmonthfamilynum ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '%"+businesstype+"%') " +
                    " and b.rowid in(select rowid from "+BusinessTable+" where  processstatustype  like '%"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"%') " +
                    " and c.businessid=b.rowid and b.division = a.divisionpath) as logoutmonthpeoplenum, "

                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+

                    "' and rowid in (select rowid from "+BusinessTable+" where businesstype like '%"+businesstype+"%') " +
                    " and rowid in(select rowid from "+BusinessTable+" where  processstatustype  like '%"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"%') "+
                    " and division = a.divisionpath) as logouttotalhelpmoney ,"+


                    "(select count(*) from "+GrantTable+" e,"+BusinessTable+" f where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in (select rowid from "
                    +BusinessTable+" where businesstype like '%"+businesstype+"%') " +

                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)>0) "+

                    "and  f.division = a.divisionpath) as addmoneymonthfamilynum ,"

                    +"(select count(*) from "+GrantTable+" e,"+BusinessTable+" f,"+FamilyTable+" " +
                    "c where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in ( select rowid from "+BusinessTable+" where businesstype like '%"+businesstype+"%') " +
                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)>0) "+
                    "and c.businessid=f.rowid and f.division = a.divisionpath) as addmoneymonthpeoplenum, "

                    +  "(select sum(CAST(e.adjustmoney AS real)) from "+GrantTable+" e," +
                    BusinessTable+" f where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in (select rowid from "+BusinessTable+" where businesstype like '%"+businesstype+"%') " +
                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)>0) "+
                    "and division = a.divisionpath) as addmoneytotalhelpmoney, " +



                    "(select count(*) from "+GrantTable+" e,"+BusinessTable+" f where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in (select rowid from "
                    +BusinessTable+" where businesstype like '%"+businesstype+"%') " +

                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)<0) "+

                    "and  f.division = a.divisionpath) as reducemoneymonthfamilynum ,"

                    +"(select count(*) from "+GrantTable+" e,"+BusinessTable+" f,"+FamilyTable+" " +
                    "c where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in ( select rowid from "+BusinessTable+" where businesstype like '%"+businesstype+"%') " +
                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)<0) "+
                    "and c.businessid=f.rowid and f.division = a.divisionpath) as reducemoneymonthpeoplenum, "

                    +  "(select sum(CAST(e.adjustmoney AS real)) from "+GrantTable+" e," +
                    BusinessTable+" f where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in (select rowid from "+BusinessTable+" where businesstype like '%"+businesstype+"%') " +
                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)<0) "+
                    "and division = a.divisionpath) as reducemoneytotalhelpmoney " +


                    "  from "+DivisionsTable+" a where a.parentid MATCH "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);

        }else if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.ComplexThree))){

            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();
            String sql_list="select a.divisionname  ,a.rowid as id,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%') " +
                    "and c.businessid=b.rowid " +
                    "and b.division = a.divisionpath) as totalpeoplenum, "
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+
                    " where time Between '"+bgmonth+"' and  '"+edmonth+"'" +
                    " and rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%') and " +
                    "division = a.divisionpath) as totalhelpmoney ,"

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%') " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where poortype like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.A)+"%') " +
                    "and c.businessid=b.rowid " +
                    "and b.division = (a.divisionpath)) as atotalpeoplenum, "
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+
                    " where time Between '"+bgmonth+"' and  '"+edmonth+"'" +
                    " and rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%')  " +
                    "and rowid in (select rowid from "+BusinessTable+" where poortype like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.A)+"%') " +
                    "and division = (a.divisionpath)) as atotalhelpmoney ,"

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%') " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where poortype like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.B)+"%') " +
                    "and c.businessid=b.rowid " +
                    "and b.division = (a.divisionpath)) as btotalpeoplenum, "
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+
                    " where time Between '"+bgmonth+"' and  '"+edmonth+"'" +
                    " and rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%')  " +
                    "and rowid in (select rowid from "+BusinessTable+" where poortype like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.B)+"%') " +
                    "and division = (a.divisionpath)) as btotalhelpmoney ,"

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%') " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where poortype like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.C)+"%') " +
                    "and c.businessid=b.rowid " +
                    "and b.division like (a.divisionpath)) as ctotalpeoplenum, "
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+
                    " where time Between '"+bgmonth+"' and  '"+edmonth+"'" +
                    " and rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%')  " +
                    "and rowid in (select rowid from "+BusinessTable+" where poortype like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.C)+"%') " +
                    "and division = (a.divisionpath)) as ctotalhelpmoney "


                    +"  from "+DivisionsTable+" a where a.parentid = "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);






        }else if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.ComplexFour))){

            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();
            String sql_list="select a.divisionname  ,a.rowid as id,"

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Farmer)+"%') " +

                    "and c.businessid=b.rowid " +

                    "and b.division = (a.divisionpath)) as farmer, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Forester)+"%') " +

                    "and c.businessid=b.rowid " +

                    "and b.division = (a.divisionpath)) as forester, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Criminal)+"%') " +

                    "and c.businessid=b.rowid " +

                    "and b.division = (a.divisionpath)) as criminal, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Compatriot)+"%') " +

                    "and c.businessid=b.rowid " +

                    "and b.division = (a.divisionpath)) as compatriot, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Immigrant)+"%') " +

                    "and c.businessid=b.rowid " +

                    "and b.division = (a.divisionpath)) as immigrant, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Graduate)+"%') " +

                    "and c.businessid=b.rowid " +

                    "and b.division = (a.divisionpath)) as graduate, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '"+businesstype+"%') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject like '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Veterans)+"%') " +

                    "and c.businessid=b.rowid " +

                    "and b.division = (a.divisionpath)) as veterans "


                    +"  from "+DivisionsTable+" a where a.parentid = "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);






        }else if(type.equals("Quarter")){//季报和报表1相似

            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();

            String sql_list="select a.divisionname  ,a.rowid as id," +
                    "(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in ( select rowid from "+BusinessTable+" where businesstype like '%"+businesstype+"%') and c.businessid=b.rowid and b.division = (a.divisionpath)) as newmonthpeoplenum, " +
                    "(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in (select rowid from "+BusinessTable+" where businesstype like '%"+businesstype+"%') " +
                    " and b.rowid in(select rowid from "+BusinessTable+" where  processstatustype  like '%"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"%') " +
                    " and c.businessid=b.rowid and b.division = (a.divisionpath)) as logoutmonthpeoplenum, "+
                    "(select count(*) from "+GrantTable+" e,"+BusinessTable+" f,"+FamilyTable+" " +
                    "c where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in ( select rowid from "+BusinessTable+" where businesstype like '%"+businesstype+"%') " +
                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)>0) "+
                    "and c.businessid=f.rowid and f.division = (a.divisionpath)) as addmoneymonthpeoplenum, "+
                     "(select avg(poorstandard) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='农村'  and poorstandard>0  and division like (a.divisionpath||'%')) as citypoorstandard,"+

            "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and  division like (a.divisionpath||'%')) as totalfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.division like (a.divisionpath||'%')) as totalperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='农村'  and c.jobstatus ='老年人' and b.division like (a.divisionpath||'%')) as oldperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='农村'   and  c.jobstatus ='登记失业' and b.division like (a.divisionpath||'%')) as loginnojob,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='农村'   and  c.jobstatus ='在职职工' and b.division like (a.divisionpath||'%')) as loginjob,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='农村'   and  c.jobstatus ='灵活就业' and b.division like (a.divisionpath||'%')) as loginlingjob,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='农村'   and  c.jobstatus ='未登记失业' and b.division like (a.divisionpath||'%')) as nologinnojob,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='农村'   and c.jobstatus ='在校生' and b.division like (a.divisionpath||'%')) as student,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='农村'   and c.jobstatus ='其它' and b.division like (a.divisionpath||'%')) as jobother,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"'  and b.familyaccount='农村'   and c.persontype ='三无对象' and b.division like (a.divisionpath||'%')) as nonepeople,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and division like (a.divisionpath||'%')) as totalmoney, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='农村' and c.bodystatus like '%残%' and b.division like (a.divisionpath||'%')) as canji, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='农村' and c.bodystatus ='重残' and b.division like (a.divisionpath||'%')) as zhongcan, "
                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='农村' and division like (a.divisionpath||'%')) as cityfamily ,"
                    +"(select count(*)/10000.0  from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where (strftime('%Y','now')-strftime('%Y',b.time))=0 and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='农村' and b.division like (a.divisionpath||'%')) as cityyearperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='农村' and b.division like (a.divisionpath||'%')) as cityperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='农村' and c.sex ='男' and b.division like (a.divisionpath||'%')) as citymen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='农村' and c.sex ='女' and b.division like (a.divisionpath||'%')) as citygirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real))/10000.0 from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='农村' and division like (a.divisionpath||'%')) as citymoney,"
                    +  "(select sum(CAST(totalhelpmoney AS real))/10000.0 from "+BusinessTable+" where (strftime('%Y','now')-strftime('%Y',time))=0 and businesstype='"+businesstype+"' and familyaccount='农村' and division like (a.divisionpath||'%')) as cityyearmoney,"
                    +  "(select avg(totalhelpmoney) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='农村' and division like (a.divisionpath||'%')) as avgcitymoney,"
                    +  "(select avg(totalhelpmoney) from "+BusinessTable+" where (strftime('%Y','now')-strftime('%Y',time))=0 and businesstype='"+businesstype+"' and familyaccount='农村' and division like (a.divisionpath||'%')) as avgcityyearmoney,"



                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and familyaccount='农村' and businesstype='"+businesstype+"' and division like (a.divisionpath||'%')) as villagefamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and b.familyaccount='农村' and businesstype='"+businesstype+"' and b.division like (a.divisionpath||'%')) as villageperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and b.familyaccount='农村' and businesstype='"+businesstype+"' and c.sex ='男' and b.division like (a.divisionpath||'%')) as villagemen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and b.familyaccount='农村' and businesstype='"+businesstype+"' and c.sex ='女' and b.division like (a.divisionpath||'%')) as villagegirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='农村' and division like (a.divisionpath||'%')) as villagemoney "



                    +"  from "+DivisionsTable+" a where a.parentid MATCH "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);



        }else if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.ComplexNewLogout))){
            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();
            String sql_list="select a.divisionname  ,a.rowid as id," +
                    "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in (select rowid from "
                    +BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CountryAccount)+"') " +
                    "and  division MATCH (a.divisionpath||'*')) as newmonthfamilynum ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in ( select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and b.rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CountryAccount)+"') " +

                    "and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as newmonthpeoplenum, "

                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CountryAccount)+"') " +

                    "and division MATCH (a.divisionpath||'*')) as newmonthmoney, "

                    +"(select count(*) from "+BusinessTable+" where  time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in(select rowid from "+BusinessTable+" where  businesstype MATCH '"+businesstype+"') " +
                    " and rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') " +
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CountryAccount)+"') " +

                    " and  division MATCH (a.divisionpath||'*')) as logoutmonthfamilynum ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and b.rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CountryAccount)+"') " +

                    " and b.rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') " +
                    " and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as logoutmonthpeoplenum, "

                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+

                    "' and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') "+
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CountryAccount)+"') " +

                    " and division MATCH (a.divisionpath||'*')) as logoutmonthmoney, "+


                    //城镇


                    "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in (select rowid from "
                    +BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CityAccount)+"') " +
                    "and  division MATCH (a.divisionpath||'*')) as newcitymonthfamilynum ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in ( select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and b.rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CityAccount)+"') " +

                    "and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as newcitymonthpeoplenum, "

                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CityAccount)+"') " +

                    "and division MATCH (a.divisionpath||'*')) as newcitymonthmoney, "

                    +"(select count(*) from "+BusinessTable+" where  time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in(select rowid from "+BusinessTable+" where  businesstype MATCH '"+businesstype+"') " +
                    " and rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') " +
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CityAccount)+"') " +

                    " and  division MATCH (a.divisionpath||'*')) as logoutcitymonthfamilynum ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and b.rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CityAccount)+"') " +

                    " and b.rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') " +
                    " and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as logoutcitymonthpeoplenum, "

                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+

                    "' and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') "+
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CityAccount)+"') " +

                    " and division MATCH (a.divisionpath||'*')) as logoutcitymonthmoney "+



                    "  from "+DivisionsTable+" a where a.parentid MATCH "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);

        }
        if(isonlychild){
            JSONArray array_list=JSONArray.fromObject(res.get("children"));
            JSONArray new_list=new JSONArray();
            for(Object list_item:array_list){
                JSONObject new_item=JSONObject.fromObject(list_item);
                new_item.put("state","closed");
                new_list.add(new_item);
            }
            return  JSONArray.fromObject(new_list).toString();
        }else{
            return JSONObject.fromObject(res).toString();
        }


    }
    /* citypanelone */
    public String getCityPaneloneBytype(String type,String bgmonth,int divisionpid,String businesstype,
                                      String divisionpath,boolean isonlychild,boolean iddefault){
        String canshu = "type:" +type +",bgmonth:"+bgmonth+",divisionpid:"+divisionpid+",businesstype:"+businesstype+"divisionpath:"+divisionpath+"isonlychild:"+isonlychild+"iddefault:"+iddefault;
        SimpleDateFormat sDateFormat   =   new SimpleDateFormat("yyyy-MM");
        String edmonth="";
        if(bgmonth==null||bgmonth.equals("")) bgmonth=sDateFormat.format(new   java.util.Date());
        try {
            Date date = sDateFormat.parse( bgmonth);
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.MONTH, +1);    //得到下一个月
            edmonth=sDateFormat.format(calendar.getTime());

        } catch (ParseException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        Map<String,Object>res=new HashMap<String, Object>();
        if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.Full))){
            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();


            String sql_list_division="select divisionpath,rowid,divisionname from "+DivisionsTable +" where parentid MATCH "+divisionpid;
            ArrayList<Map<String,Object>> division_list=cd.getTableList(sql_list_division);
            ArrayList<Map<String,Object>> result_list=new ArrayList<Map<String, Object>>();

            String sql_list_base="select  count (CASE when c.relationship= '户主' THEN 1 ELSE null  END) AS totalfamily  " +
                    ",count (*) AS totalperson " +
                    ",count (CASE when c.sex= '男' THEN 1 ELSE null  END) AS totalmen " +
                    ",count (CASE when c.sex= '女' THEN 1 ELSE null  END) AS totalgirls " +
                    ",sum(case when c.relationship='户主' then totalhelpmoney else 0 end) as totalmoney " +

                    ",count (CASE when c.relationship= '户主' and b.familyaccount='城镇' THEN 1 ELSE null  END) AS cityfamily "+
                    ",count (CASE when b.familyaccount='城镇' THEN 1 ELSE null  END) AS cityperson " +
                    ",count (CASE when b.familyaccount='城镇' and c.sex= '男' THEN 1 ELSE null  END) AS citymen " +
                    ",count (CASE when b.familyaccount='城镇' and c.sex= '女' THEN 1 ELSE null  END) AS citygirls " +
                    ",sum(case when c.relationship='户主' and b.familyaccount='城镇' then totalhelpmoney else 0 end) as citymoney " +

                    ",count (CASE when c.relationship= '户主' and b.familyaccount='农村' THEN 1 ELSE null  END) AS villagefamily "+
                    ",count (CASE when b.familyaccount='农村' THEN 1 ELSE null  END) AS villageperson " +
                    ",count (CASE when b.familyaccount='农村' and c.sex= '男' THEN 1 ELSE null  END) AS villagemen " +
                    ",count (CASE when b.familyaccount='农村' and c.sex= '女' THEN 1 ELSE null  END) AS villagegirls " +
                    ",sum(case when c.relationship='户主' and b.familyaccount='农村' then totalhelpmoney else 0 end) as villagemoney " +

                    "from "+BusinessTable+" b, "+FamilyTable +
                    " c  where  c.businessid= b.id and b.time Between '"+bgmonth+"' and  '"+edmonth
                    +"' and b.businesstype='"+businesstype+"' and  b.division like ";

            for(Map<String,Object>division_item:division_list){
                String division_item_path="'"+division_item.get("divisionpath")+"%'";
                String division_id=division_item.get("rowid").toString();
                String division_name=division_item.get("divisionname").toString();

                Map<String,Object> map=new HashMap<String, Object>();


                String sql_list=sql_list_base+division_item_path+ "";

                map=cd.getSigleObj(sql_list);
                map.put("divisionname",division_name);
                map.put("id",division_id);
                result_list.add(map);

            }
            /*合计*/
            if(division_list.size()==0&&iddefault){
                String  sql_divisionname="select divisionpath,rowid,divisionname from "+DivisionsTable +" where rowid = "+divisionpid;
                ArrayList<Map<String,Object>> division_list_1=cd.getTableList(sql_divisionname);
                String divisionname="合计";
                if(division_list_1.size()==1){
                    divisionname=division_list_1.get(0).get("divisionname").toString();
                }
                String sql_sum=sql_list_base+"'"+divisionpath+"%'";
                Map map_sum=cd.getSigleObj(sql_sum);
                map_sum.put("divisionname",divisionname);
                map_sum.put("id","9999"); //9999无效的 division_id
                result_list.add(map_sum);
            }


            res.put("divisionname","");
            res.put("children",result_list);






        }
        else if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.ComplexOne))){

            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();
            /*String sql_list="select divisionpath from "+DivisionsTable +" where parentid MATCH "+divisionpid;
            ArrayList<Map<String,Object>> division_list=cd.getTableList(sql_list);
            ArrayList<Map<String,Object>> result_list=new ArrayList<Map<String, Object>>();

            CountDownLatch latch=new CountDownLatch(1);
            for(Map<String,Object>division_item:division_list){
                Map<String,Object> map=new HashMap<String, Object>();
                String sql_totalfamily="select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                        "' and businesstype='"+businesstype+"' and  division like '"+division_item.get("divisionpath")+"%' ";

                SigleSqlThread m=new SigleSqlThread(map,sql_totalfamily,"totalfamily",latch);
                result_list.add(map);
                Thread t=new Thread(m);
                t.start();
            }
            try {
                latch.await();
            } catch (InterruptedException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            res.put("divisionname","");
            res.put("children",result_list);
*/
            String sql_list="select a.divisionname  ,a.rowid as id," +
                    "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and  division like (a.divisionpath||'%')) as totalfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.division like (a.divisionpath||'%')) as totalperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and c.jobstatus ='老年人' and b.division like (a.divisionpath||'%')) as oldperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and  c.jobstatus ='登记失业' and b.division like (a.divisionpath||'%')) as loginnojob,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and c.jobstatus ='在校生' and b.division like (a.divisionpath||'%')) as student,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and division like (a.divisionpath||'%')) as totalmoney, "

                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='城镇' and division like (a.divisionpath||'%')) as cityfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇' and b.division like (a.divisionpath||'%')) as cityperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇' and c.sex ='男' and b.division like (a.divisionpath||'%')) as citymen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and businesstype='"+businesstype+"' and b.familyaccount='城镇' and c.sex ='女' and b.division like (a.divisionpath||'%')) as citygirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='城镇' and division like (a.divisionpath||'%')) as citymoney,"


                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and familyaccount='农村' and businesstype='"+businesstype+"' and division like (a.divisionpath||'%')) as villagefamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and b.familyaccount='农村' and businesstype='"+businesstype+"' and b.division like (a.divisionpath||'%')) as villageperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and b.familyaccount='农村' and businesstype='"+businesstype+"' and c.sex ='男' and b.division like (a.divisionpath||'%')) as villagemen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.id and b.familyaccount='农村' and businesstype='"+businesstype+"' and c.sex ='女' and b.division like (a.divisionpath||'%')) as villagegirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='农村' and division like (a.divisionpath||'%')) as villagemoney "



                    +"  from "+DivisionsTable+" a where a.parentid MATCH "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);



        }else if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.ComplexTwo))){
            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();
            String sql_list="select a.divisionname  ,a.rowid as id," +
                    "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in (select rowid from "
                    +BusinessTable+" where businesstype MATCH '"+businesstype+"') and  division MATCH (a.divisionpath||'*')) as newmonthfamilynum ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in ( select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as newmonthpeoplenum, "

                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    "and division MATCH (a.divisionpath||'*')) as newtotalhelpmoney, "

                    +"(select count(*) from "+BusinessTable+" where  time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in(select rowid from "+BusinessTable+" where  businesstype MATCH '"+businesstype+"') " +
                    " and rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') " +

                    " and  division MATCH (a.divisionpath||'*')) as logoutmonthfamilynum ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and b.rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') " +
                    " and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as logoutmonthpeoplenum, "

                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+

                    "' and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') "+
                    " and division MATCH (a.divisionpath||'*')) as logouttotalhelpmoney ,"+


                    "(select count(*) from "+GrantTable+" e,"+BusinessTable+" f where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in (select rowid from "
                    +BusinessTable+" where businesstype MATCH '"+businesstype+"') " +

                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)>0) "+

                    "and  f.division MATCH (a.divisionpath||'*')) as addmoneymonthfamilynum ,"

                    +"(select count(*) from "+GrantTable+" e,"+BusinessTable+" f,"+FamilyTable+" " +
                    "c where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in ( select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)>0) "+
                    "and c.businessid=f.rowid and f.division MATCH (a.divisionpath||'*')) as addmoneymonthpeoplenum, "

                    +  "(select sum(CAST(e.adjustmoney AS real)) from "+GrantTable+" e," +
                    BusinessTable+" f where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)>0) "+
                    "and division MATCH (a.divisionpath||'*')) as addmoneytotalhelpmoney, " +



                    "(select count(*) from "+GrantTable+" e,"+BusinessTable+" f where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in (select rowid from "
                    +BusinessTable+" where businesstype MATCH '"+businesstype+"') " +

                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)<0) "+

                    "and  f.division MATCH (a.divisionpath||'*')) as reducemoneymonthfamilynum ,"

                    +"(select count(*) from "+GrantTable+" e,"+BusinessTable+" f,"+FamilyTable+" " +
                    "c where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in ( select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)<0) "+
                    "and c.businessid=f.rowid and f.division MATCH (a.divisionpath||'*')) as reducemoneymonthpeoplenum, "

                    +  "(select sum(CAST(e.adjustmoney AS real)) from "+GrantTable+" e," +
                    BusinessTable+" f where e.businessid=f.rowid and e.grantdate Between '"+bgmonth+"' and  '"+edmonth+
                    "' and f.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and e.rowid in(select rowid from "+ GrantTable+" where CAST(adjustmoney AS real)<0) "+
                    "and division MATCH (a.divisionpath||'*')) as reducemoneytotalhelpmoney " +


                    "  from "+DivisionsTable+" a where a.parentid MATCH "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);

        }else if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.ComplexThree))){

            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();
            String sql_list="select a.divisionname  ,a.rowid as id,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    "and c.businessid=b.rowid " +
                    "and b.division MATCH (a.divisionpath||'*')) as totalpeoplenum, "
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+
                    " where time Between '"+bgmonth+"' and  '"+edmonth+"'" +
                    " and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') and " +
                    "division MATCH (a.divisionpath||'*')) as totalhelpmoney ,"

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where poortype MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.A)+"') " +
                    "and c.businessid=b.rowid " +
                    "and b.division MATCH (a.divisionpath||'*')) as atotalpeoplenum, "
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+
                    " where time Between '"+bgmonth+"' and  '"+edmonth+"'" +
                    " and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"')  " +
                    "and rowid in (select rowid from "+BusinessTable+" where poortype MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.A)+"') " +
                    "and division MATCH (a.divisionpath||'*')) as atotalhelpmoney ,"

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where poortype MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.B)+"') " +
                    "and c.businessid=b.rowid " +
                    "and b.division MATCH (a.divisionpath||'*')) as btotalpeoplenum, "
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+
                    " where time Between '"+bgmonth+"' and  '"+edmonth+"'" +
                    " and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"')  " +
                    "and rowid in (select rowid from "+BusinessTable+" where poortype MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.B)+"') " +
                    "and division MATCH (a.divisionpath||'*')) as btotalhelpmoney ,"

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where poortype MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.C)+"') " +
                    "and c.businessid=b.rowid " +
                    "and b.division MATCH (a.divisionpath||'*')) as ctotalpeoplenum, "
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+
                    " where time Between '"+bgmonth+"' and  '"+edmonth+"'" +
                    " and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"')  " +
                    "and rowid in (select rowid from "+BusinessTable+" where poortype MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.C)+"') " +
                    "and division MATCH (a.divisionpath||'*')) as ctotalhelpmoney "


                    +"  from "+DivisionsTable+" a where a.parentid MATCH "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);






        }else if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.ComplexFour))){

            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();
            String sql_list="select a.divisionname  ,a.rowid as id,"

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Farmer)+"') " +

                    "and c.businessid=b.rowid " +

                    "and b.division MATCH (a.divisionpath||'*')) as farmer, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Forester)+"') " +

                    "and c.businessid=b.rowid " +

                    "and b.division MATCH (a.divisionpath||'*')) as forester, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Criminal)+"') " +

                    "and c.businessid=b.rowid " +

                    "and b.division MATCH (a.divisionpath||'*')) as criminal, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Compatriot)+"') " +

                    "and c.businessid=b.rowid " +

                    "and b.division MATCH (a.divisionpath||'*')) as compatriot, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Immigrant)+"') " +

                    "and c.businessid=b.rowid " +

                    "and b.division MATCH (a.divisionpath||'*')) as immigrant, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Graduate)+"') " +

                    "and c.businessid=b.rowid " +

                    "and b.division MATCH (a.divisionpath||'*')) as graduate, "

                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' " +
                    "and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    "and c.rowid in (select rowid from "+FamilyTable+" where specialobject MATCH '"+ EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.Veterans)+"') " +

                    "and c.businessid=b.rowid " +

                    "and b.division MATCH (a.divisionpath||'*')) as veterans "


                    +"  from "+DivisionsTable+" a where a.parentid MATCH "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);






        }else if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.ComplexNewLogout)))
        {
            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();
            String sql_list="select a.divisionname  ,a.rowid as id," +
                    "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in (select rowid from "
                    +BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CountryAccount)+"') " +
                    "and  division MATCH (a.divisionpath||'*')) as newmonthfamilynum ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in ( select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and b.rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CountryAccount)+"') " +

                    "and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as newmonthpeoplenum, "

                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CountryAccount)+"') " +

                    "and division MATCH (a.divisionpath||'*')) as newmonthmoney, "

                    +"(select count(*) from "+BusinessTable+" where  time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in(select rowid from "+BusinessTable+" where  businesstype MATCH '"+businesstype+"') " +
                    " and rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') " +
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CountryAccount)+"') " +

                    " and  division MATCH (a.divisionpath||'*')) as logoutmonthfamilynum ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and b.rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CountryAccount)+"') " +

                    " and b.rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') " +
                    " and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as logoutmonthpeoplenum, "

                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+

                    "' and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') "+
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CountryAccount)+"') " +

                    " and division MATCH (a.divisionpath||'*')) as logoutmonthmoney, "+


                    //城镇


                    "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in (select rowid from "
                    +BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CityAccount)+"') " +
                    "and  division MATCH (a.divisionpath||'*')) as newcitymonthfamilynum ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in ( select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and b.rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CityAccount)+"') " +

                    "and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as newcitymonthpeoplenum, "

                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CityAccount)+"') " +

                    "and division MATCH (a.divisionpath||'*')) as newcitymonthmoney, "

                    +"(select count(*) from "+BusinessTable+" where  time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and rowid in(select rowid from "+BusinessTable+" where  businesstype MATCH '"+businesstype+"') " +
                    " and rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') " +
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CityAccount)+"') " +

                    " and  division MATCH (a.divisionpath||'*')) as logoutcitymonthfamilynum ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+
                    "' and b.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and b.rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CityAccount)+"') " +

                    " and b.rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') " +
                    " and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as logoutcitymonthpeoplenum, "

                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+

                    "' and rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"') " +
                    " and rowid in(select rowid from "+BusinessTable+" where  processstatustype  MATCH '"+ProcessType.UseProcessType.getChineseSeason(ProcessType.Cancellation)+"') "+
                    " and rowid in (select rowid from "
                    +BusinessTable+" where familyaccount MATCH '"
                    +EnumApplyType.UseStatisticsType.getChineseSeason(EnumApplyType.CityAccount)+"') " +

                    " and division MATCH (a.divisionpath||'*')) as logoutcitymonthmoney "+



                    "  from "+DivisionsTable+" a where a.parentid MATCH "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);

        }
        /*if(isonlychild){
            JSONArray array_list=JSONArray.fromObject(res.get("children"));
            JSONArray new_list=new JSONArray();
            for(Object list_item:array_list){
                JSONObject new_item=JSONObject.fromObject(list_item);
                new_item.put("state","closed");
                new_list.add(new_item);
            }
            return  JSONArray.fromObject(new_list).toString();
        }else{
            return JSONObject.fromObject(res).toString();
    }*/
        StringBuffer sb=new StringBuffer();


        sb.append("select dd.divisionname,yy.* from \n");
        sb.append("divisions dd left outer join\n");
        sb.append("(select\n");
        sb.append(" divisionname divisionname0,\n");
        sb.append(" sum(hushu) shushu,sum(renshu) srenshu,sum(laonianrenshu) slaonianrenshu,\n");
        sb.append(" sum(auditzzzg) sauditzzzg,sum(auditlhjy) sauditlhjy,sum(auditdjsy) sauditdjsy,sum(auditwdjsy) sauditwdjsy,\n");
        sb.append(" sum(yang) syang,sum(yangqt) syangqt,sum(woman) swoman,sum(sanwu) ssanwu,sum(canji) scanji,sum(zhongcan) szhongcan,\n");
        sb.append(" sum(curmonthrenshu) scurmonthrenshu,\n");
        sb.append(" sum(curmonthmoney) scurmonthmoney,\n");
        sb.append(" sum(onetocurmonthrenshu) sonetocurmonthrenshu,\n");
        sb.append(" sum(curmonthmoney)/sum(curmonthrenshu) scurmoneyallowance,\n");
        sb.append(" sum(onetocurmonthrenshu)/sum(renshu) sonecurmoneyallowance\n");
        sb.append("from\n");
        sb.append("\n");
        sb.append("(select\n");
        sb.append("divisionname,\n");
        sb.append("count(distinct(businessid)) 'hushu',\n");
        sb.append("count(1) 'renshu',\n");
        sb.append("count(strftime('%Y','now')-strftime('%Y',birthday)>=60) 'laonianrenshu',\n");
        sb.append("count(case when ((strftime('%Y','now')-strftime('%Y',birthday)) between 20 and 60)and jobstatus == '在职职工'  THEN 1 ELSE null  END) as auditzzzg ,\n");
        sb.append("count(case when ((strftime('%Y','now')-strftime('%Y',birthday)) between 20 and 60)and jobstatus == '灵活就业'  THEN 1 ELSE null  END) as auditlhjy ,\n");
        sb.append("count(case when ((strftime('%Y','now')-strftime('%Y',birthday)) between 20 and 60)and jobstatus == '登记失业'  THEN 1 ELSE null  END) as auditdjsy ,\n");
        sb.append("count(case when ((strftime('%Y','now')-strftime('%Y',birthday)) between 20 and 60)and jobstatus == '未登记失业'  THEN 1 ELSE null  END) as auditwdjsy ,\n");
        sb.append("count(case when (strftime('%Y','now')-strftime('%Y',birthday))<=20 and jobstatus == '在校生' THEN 1 ELSE null  END) as yang  ,\n");
        sb.append("count(case when (strftime('%Y','now')-strftime('%Y',birthday))<=20 and jobstatus == '其它' THEN 1 ELSE null  END) as yangqt ,\n");
        sb.append("count(case when sex == '女' THEN 1 ELSE null  END) as woman ,\n");
        sb.append("count(case when persontype == '三无人员' THEN 1 ELSE null  END) as sanwu ,\n");
        sb.append("count(case when bodystatus == '残疾' or bodystatus == '重残' THEN 1 ELSE null  END) as canji ,\n");
        sb.append("count(case when bodystatus == '重残' THEN 1 ELSE null  END) as zhongcan,\n");
        sb.append("count(strftime('%Y%m','"+bgmonth+"-01')-strftime('%Y%m',y.time)==0) 'curmonthrenshu',\n");
        sb.append("count(case when strftime('%Y','now')-strftime('%Y',y.time)=0 THEN 1 ELSE 0  END) as 'onetocurmonthrenshu',\n");
        sb.append("0 'curmonthmoney',\n");
        sb.append("0 'onetocurmonthmoney'\n");
        sb.append("from\n");
        sb.append("(select d.divisionname,d.divisionpath,b.* from divisions d,business b\n");
        sb.append(" where d.parentid in(select rowid from divisions where divisionname='"+divisionpath+"')\n");
        sb.append(" and substr(b.division,0,length(d.divisionpath)+1)=d.divisionpath) y,familymembers f\n");
        sb.append("where y.id=f.businessid and y.businesstype='"+businesstype+"'\n");
        sb.append("and y.familyaccount='城镇'\n");
        sb.append("group by divisionname\n");
        sb.append("\n");
        sb.append("union all\n");
        sb.append("\n");
        sb.append("select\n");
        sb.append("divisionname,\n");
        sb.append("0 'hushu',\n");
        sb.append("0 'renshu',\n");
        sb.append("0 'laonianrenshu',\n");
        sb.append("0 auditzzzg ,\n");
        sb.append("0 auditlhjy ,\n");
        sb.append("0 auditdjsy ,\n");
        sb.append("0 auditwdjsy ,\n");
        sb.append("0 yang  ,\n");
        sb.append("0 yangqt  ,\n");
        sb.append("0 woman ,\n");
        sb.append("0 sanwu ,\n");
        sb.append("0 canji ,\n");
        sb.append("0 zhongcan,\n");
        sb.append("0 'curmonthrenshu',\n");
        sb.append("0 'onetocurmonthrenshu',\n");
        sb.append("sum(case when strftime('%Y%m','"+bgmonth+"-01')-strftime('%Y%m',g.grantdate)=0 THEN y.applymoney ELSE 0  END) 'curmonthmoney',\n");
        sb.append("sum(case when strftime('%Y','now')-strftime('%Y',g.grantdate)=0 THEN y.applymoney ELSE 0  END) 'onetocurmonthmoney'\n");
        sb.append("\n");
        sb.append("from\n");
        sb.append("(select d.divisionname,d.divisionpath,b.* from divisions d,business b\n");
        sb.append(" where d.parentid in(select rowid from divisions where divisionname='"+divisionpath+"')\n");
        sb.append(" and substr(b.division,0,length(d.divisionpath)+1)=d.divisionpath) y,grantmoney g\n");
        sb.append("where y.id=g.businessid and y.businesstype='"+businesstype+"'\n");
        sb.append("and y.familyaccount='城镇'\n");
        sb.append("group by divisionname\n");
        sb.append(")\n");
        sb.append("group by divisionname) \n");
        sb.append("yy  on yy.divisionname0=dd.divisionname\n");
        sb.append("where dd.parentid in(select rowid from divisions where divisionname='"+divisionpath+"')\n");
        String panelsql = "select divisionname from divisions where parentid = "+divisionpid;
        ComonDao pcd=new ComonDao();
       /* ArrayList<Map<String,Object>> plist=pcd.getTableList(panelsql);
        ArrayList<Map<String,Object>> elist =new ArrayList<Map<String, Object>>();

        Iterator it= plist.iterator();
        while (it.hasNext()){
            Map<String,Object> rmap = new HashMap<String, Object>();
             Map map=(Map)it.next();
            //System.out.println(map.get("divisionname"));
            String divisionname = map.get("divisionname").toString() ;
            rmap.put("divisionname",divisionname);
            divisionname = divisionname=="市本级"?"舟山市":divisionname;
            String everysql = "select count (*) AS huzhu from business where division like '%"+divisionname+"%'";    //计算户主数
            rmap.put("huzhu",getMap(everysql).get("huzhu"));
            String rensql = "select count(CASE when a.isenjoyed = '享受' THEN 1 ELSE null  END) as dbren  from familymembers a " +
                    " where (select b.division from business b where b.id = a.businessid) like '%"+divisionname+"%'";          //计算低保人口数
             rmap.put("dbren",getMap(rensql).get("dbren"));
            elist.add(rmap);
        }*/





        return  JSONArray.fromObject(pcd.getTableList(sb.toString())).toString();

    }

    public Map<String,Object> getMap(String sql){                        //获取统计查询结果，只适合查询结果只有一行的sql
         ResultSet rs = resultSet(sql);
         Map<String,Object>  mp = new HashMap<String, Object>();
        try {
            ResultSetMetaData data=rs.getMetaData();
            int colnums=data.getColumnCount();
            while (rs.next()){
                for(int i = 1;i<= colnums;i++){                                             //多个字段循环存入map中
                    String columnName = data.getColumnName(i);
                    String value=rs.getString(columnName);
                    mp.put(columnName,value);
                }
                 return     mp;
            }
        } catch (SQLException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        return  null;
    }

    public ResultSet resultSet(String rsql){
        Connection testConn= JdbcFactory.getConn("sqlite");
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, rsql);
        try {
            ResultSet rs = pstmt.executeQuery();
            return rs;
        } catch (SQLException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        return null;
    }

   /* ************* */
    public String getFamilyInfoList(int start,int limit,String keyword,String businesstype,String[]name,
                                    String[]compare,String[]value,String[]logic,String bgdate,String eddate,
                                    String divisionpath,String totalname,String rowsname){

        totalname=totalname==null?"totalCount":totalname;
        rowsname=rowsname==null?"results":rowsname;

        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();

        SimpleDateFormat sDateFormat   =   new SimpleDateFormat("yyyy-MM");
        SimpleDateFormat syearFormat   =   new SimpleDateFormat("yyyy");
        SimpleDateFormat sDayFormat   =   new SimpleDateFormat("yyyy-MM-dd");


        String basic_sql=" a.id=b.businessid ";

        basic_sql+=" and b.relationship = '"+RelationsType.UseRelationsType.getChineseSeason(RelationsType.ower)+"' ";
        //basic_sql+=" and  b.name = a.owername ";
        //basic_sql+=" and c.divisionpath = a.division ";

        basic_sql+=" and a.division like '"+divisionpath+"%' ";

        if(!businesstype.equals("all")){
            basic_sql+=" and a.businesstype = '"+businesstype+"'";
        }



        String sql_count="select count(*)"+
                " from "+BusinessTable +" a,"+FamilyTable+" b where "+basic_sql;


                //int totalnum =cd.getTotalCount(BusinessTable);

        String sql_list="select a.*,a.id as businessid " +

                /*

                ",(select count(*)  from "+ FamilyTable+" b where " +
                "a.rowid =b.businessid )  as familynum," +
                "(select count(*)  from "+ FamilyTable+" b where " +
                "b.businessid = a.id and isenjoyed = '享受')  as enjoynum"+

                */
                " from "+BusinessTable +" a,"+FamilyTable+" b where "+basic_sql;

        String fulltable="("+sql_list+") as ff";

        if(name!=null&&name.length>0){


            for(int i=0;i<name.length;i++){
                String col_name=name[i].split("附")[0];
                //if(logic[i].equals("and")){
                if(compare[i].equals(">=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.id in (select id from "+fulltable+" where CAST("+col_name+" AS real) >= "+value[i]+") ";

                    }else{
                        sql=" "+logic[i]+" (a.id in (select id from "+fulltable+" where CAST("+col_name+" AS real) >= "+value[i]+") and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("<=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.id in (select id from "+fulltable+" where CAST("+col_name+" AS real) <= "+value[i]+") ";

                    }else{
                        sql=" "+logic[i]+" (a.id in (select id from "+fulltable+" where CAST("+col_name+" AS real) <= "+value[i]+") and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;
                }else if(compare[i].equals("=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+"  a.id in (select id from "+fulltable+" where "+col_name+" = '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+"  (a.id in (select id from "+fulltable+" where "+col_name+" = '"+value[i]+"') and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }else if(compare[i].equals("match")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        if("division".equalsIgnoreCase(col_name)){ //行政区划为 两个%%

                            sql=" "+logic[i]+"  a.id in (select id from "+fulltable+" where "+col_name+" like '%"+value[i]+"%') ";
                        }else{

                            sql=" "+logic[i]+"  a.id in (select id from "+fulltable+" where "+col_name+" like '"+value[i]+"%') ";
                        }


                    }else{
                        if("division".equalsIgnoreCase(col_name)){

                            sql=" "+logic[i]+"  (a.id in (select id from "+fulltable+" where "+col_name+" like '%"+value[i]+"%') and ("+basic_sql+")) ";
                        }else{

                            sql=" "+logic[i]+"  (a.id in (select id from "+fulltable+" where "+col_name+" like '"+value[i]+"%') and ("+basic_sql+")) ";
                        }
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("year")){
                    Date date = null;
                    try {
                        date = syearFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, +1);    //得到下一年
                    String endyear=syearFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endyear+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endyear+"') and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("beginyear")){
                    Date date = null;
                    try {
                        date = syearFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, +100);    //得到下一年
                    String endyear=syearFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endyear+"') ";

                    }else{
                        sql=" "+logic[i]+" (a.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endyear+"') and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }else if(compare[i].equals("endyear")){
                    Date date = null;
                    try {
                        date = syearFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, -100);    //得到起始年
                    String endyear=syearFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.id in (select id from "+fulltable+" where "+col_name+" Between '"+endyear
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (a.id in (select id from "+fulltable+" where "+col_name+" Between '"+endyear
                                +"' and  '"+value[i]+"') and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }
                else if(compare[i].equals("month")){
                    Date date = null;
                    try {
                        date = sDateFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.MONTH, +1);    //得到下一个月
                    String endmonth=sDateFormat.format(calendar.getTime());


                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endmonth+"') ";

                    }else{
                        sql=" "+logic[i]+" (a.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endmonth+"')  and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }
                else if(compare[i].equals("beginmonth")){
                    Date date = null;
                    try {
                        date = sDateFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, +100);    //得到下一个月
                    String endmonth=sDateFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endmonth+"') ";

                    }else{
                        sql=" "+logic[i]+" (a.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endmonth+"')  and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("endmonth")){
                    Date date = null;
                    try {
                        date = sDateFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, -100);    //得到下一个月
                    String endmonth=sDateFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.id in (select id from "+fulltable+" where "+col_name+" Between '"+endmonth
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (a.id in (select id from "+fulltable+" where "+col_name+" Between '"+endmonth
                                +"' and  '"+value[i]+"')  and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }

                else if(compare[i].equals("date")){
                    Date date = null;
                    try {
                        date = sDayFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    //calendar.add(Calendar.MONTH, +1);    //得到下一个月
                    String enddate=sDateFormat.format(calendar.getTime());


                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (a.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+value[i]+"')  and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }
                else if(compare[i].equals("begindate")){
                    Date date = null;
                    try {
                        date = sDayFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, +100);    //得到下一个月
                    String enddate=sDateFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.id in (select id from "+fulltable+"  where "+col_name+" Between '"+value[i]
                                +"' and  '"+enddate+"') ";

                    }else{
                        sql=" "+logic[i]+" (a.id in (select id from "+fulltable+"  where "+col_name+" Between '"+value[i]
                                +"' and  '"+enddate+"')  and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("enddate")){
                    Date date = null;
                    try {
                        date = sDayFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, -100);    //得到下一个月
                    String enddate=sDateFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.id in (select id from "+fulltable+"  where "+col_name+" Between '"+enddate
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (a.id in (select id from "+fulltable+"  where "+col_name+" Between '"+enddate
                                +"' and  '"+value[i]+"')  and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }

                //}
            }


        }

        if(bgdate!=null&&!bgdate.equals("")){
            Date date = null;
            try {
                date = sDayFormat.parse(bgdate);
            } catch (ParseException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.YEAR, +100);    //得到下一个月
            String enddate=sDayFormat.format(calendar.getTime());

            sql_list+=" and (a.helpbgtime Between '"+bgdate
                    +"' and  '"+enddate+"') ";

            sql_count+=" and (a.helpbgtime Between '"+bgdate
                    +"' and  '"+enddate+"') ";

        }
        if(eddate!=null&&!eddate.equals("")){

            Date date = null;
            try {
                date = sDayFormat.parse(eddate);
            } catch (ParseException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.YEAR, -100);    //得到下一个月
            String enddate=sDayFormat.format(calendar.getTime());

            sql_list+=" and (a.helpbgtime Between '"+enddate
                    +"' and  '"+eddate+"' ) ";

            sql_count+=" and (a.helpbgtime Between '"+enddate
                    +"' and  '"+eddate+"' ) ";

        }

        if (keyword!=null&&!keyword.equals("")){
            sql_list+=" and (a.owerid like '"+keyword+"%' or a.owername like '%"+keyword+"%')" +
                    " ";

            sql_count+=" and (a.owerid like '"+keyword+"%' or a.owername like '%"+keyword+"%')" +
                    " ";

        }
        int totalnum=cd.getTotalCountBySql(sql_count);
        if(start>=0){
            /**关于desc排序的hack处理，可以加快性能**/
            int page=start/limit;
            start=totalnum-(page+1)*limit;
            if(start<0)limit=limit+start;
            /**hack 结束**/
            sql_list+="  Limit "+limit+" Offset "+start;

        }



        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

        for(Map<String,Object> map:list){
            map.put("process", ProcessType.UseProcessType.getNext(ProcessType.UseProcessType.
                    getProcessFromChinese(map.get("processstatus").toString())));
        }
        Map<String,Object>res=new HashMap<String, Object>();
        res.put(totalname,totalnum);
        res.put(rowsname,list);
        return JSONObject.fromObject(res).toString();


    }
    public String getPeopleInfoList(int start ,int limit,String keyword,String businesstype,String[]name,
                                    String[]compare,String[]value,String[]logic,String bgdate,String eddate,
                                    String divisionpath,String totalname,String rowsname){
        totalname=totalname==null?"totalCount":totalname;
        rowsname=rowsname==null?"results":rowsname;

        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();

        SimpleDateFormat sDateFormat   =   new SimpleDateFormat("yyyy-MM");
        SimpleDateFormat syearFormat   =   new SimpleDateFormat("yyyy");
        SimpleDateFormat sDayFormat   =   new SimpleDateFormat("yyyy-MM-dd");

        String basic_sql=" a.id=b.businessid ";
        /*if((keyword==null||keyword.equals(""))&&(name==null||name.length==0||name[0].equals(""))){
            basic_sql+="MATCH a.rowid ";
        }
        else{
            basic_sql+="= a.rowid ";
        }*/
        //basic_sql+=" and c.rowid in (select rowid from "+DivisionsTable+" where divisionpath MATCH a.division )";

        basic_sql+=" and a.division like '"+divisionpath+"%' ";
        if(!businesstype.equals("all")){
            basic_sql+=" and a.businesstype = '"+businesstype+"' ";
        }

        String sql_count="select count(*)"+
                " from "+BusinessTable +" a,"+FamilyTable+" b "+
                "where  "+basic_sql;
        //int totalnum =cd.getTotalCount(FamilyTable);

        String sql_list="select a.division,a.owername,a.processstatus,a.processstatustype,a.businesstype,a.owerid,b.* "+
                " from "+BusinessTable +" a,"+FamilyTable+" b "+
                "where  "+basic_sql;
        String fulltable="("+sql_list+") as ff";

        if(name!=null&&name.length>0){
            /*for(int i=0;i<name.length;i++){
                if(logic[i].equals("and")){
                    if(compare[i].equals(">=")){
                        sql_list+=" and a.rowid in (select rowid from "+BusinessTable+" where CAST("+name[i]+" AS real) >= "+value[i]+") ";
                        sql_count+=" and a.rowid in (select rowid from "+BusinessTable+" where CAST("+name[i]+" AS real) >= "+value[i]+") ";

                    }else if(compare[i].equals("<=")){
                        sql_list+=" and a.rowid in (select rowid from "+BusinessTable+" where CAST("+name[i]+" AS real) <= "+value[i]+") ";
                        sql_count+=" and a.rowid in (select rowid from "+BusinessTable+" where CAST("+name[i]+" AS real) <= "+value[i]+") ";
                    }else{
                        sql_list+=" and a.rowid in (select rowid from "+BusinessTable+" where "+name[i]+" MATCH '"+value[i]+"*') ";
                        sql_count+=" and a.rowid in (select rowid from "+BusinessTable+" where "+name[i]+" MATCH '"+value[i]+"*') ";
                    }
                }
            }*/

            for(int i=0;i<name.length;i++){
                String col_name=name[i].split("附")[0];
                //if(logic[i].equals("and")){
                if(compare[i].equals(">=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.id in (select id from "+fulltable+" where CAST("+col_name+" AS real) >= "+value[i]+") ";

                    }else{
                        sql=" "+logic[i]+" (b.id in (select id from "+fulltable+" where CAST("+col_name+" AS real) >= "+value[i]+") and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("<=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.id in (select id from "+fulltable+" where CAST("+col_name+" AS real) <= "+value[i]+") ";

                    }else{
                        sql=" "+logic[i]+" (b.id in (select id from "+fulltable+" where CAST("+col_name+" AS real) <= "+value[i]+") and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;
                }else if(compare[i].equals("=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+"  b.id in (select id from "+fulltable+" where "+col_name+" = '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+"  (b.id in (select id from "+fulltable+" where "+col_name+" = '"+value[i]+"') and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }else if(compare[i].equals("match")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        if("division".equalsIgnoreCase(col_name)){ //行政区划为 两个%%
                            sql=" "+logic[i]+"  b.id in (select id from "+fulltable+" where "+col_name+" like '%"+value[i]+"%') ";
                        }else{

                            sql=" "+logic[i]+"  b.id in (select id from "+fulltable+" where "+col_name+" like '"+value[i]+"%') ";
                        }

                    }else{
                        if("division".equalsIgnoreCase(col_name)){

                            sql=" "+logic[i]+"  (b.id in (select id from "+fulltable+" where "+col_name+" like '%"+value[i]+"%') and ("+basic_sql+")) ";
                        }else{

                            sql=" "+logic[i]+"  (b.id in (select id from "+fulltable+" where "+col_name+" like '"+value[i]+"%') and ("+basic_sql+")) ";
                        }
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("year")){
                    Date date = null;
                    try {
                        date = syearFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, +1);    //得到下一年
                    String endyear=syearFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endyear+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endyear+"') and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("beginyear")){
                    Date date = null;
                    try {
                        date = syearFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, +100);    //得到下一年
                    String endyear=syearFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endyear+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endyear+"') and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }else if(compare[i].equals("endyear")){
                    Date date = null;
                    try {
                        date = syearFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, -100);    //得到起始年
                    String endyear=syearFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.id in (select id from "+fulltable+" where "+col_name+" Between '"+endyear
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.id in (select id from "+fulltable+" where "+col_name+" Between '"+endyear
                                +"' and  '"+value[i]+"') and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }
                else if(compare[i].equals("month")){
                    Date date = null;
                    try {
                        date = sDateFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.MONTH, +1);    //得到下一个月
                    String endmonth=sDateFormat.format(calendar.getTime());


                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endmonth+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endmonth+"')  and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }
                else if(compare[i].equals("beginmonth")){
                    Date date = null;
                    try {
                        date = sDateFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, +100);    //得到下一个月
                    String endmonth=sDateFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endmonth+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endmonth+"')  and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("endmonth")){
                    Date date = null;
                    try {
                        date = sDateFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, -100);    //得到下一个月
                    String endmonth=sDateFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.id in (select id from "+fulltable+" where "+col_name+" Between '"+endmonth
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.id in (select id from "+fulltable+" where "+col_name+" Between '"+endmonth
                                +"' and  '"+value[i]+"')  and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }
                else if(compare[i].equals("date")){
                    Date date = null;
                    try {
                        date = sDayFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    //calendar.add(Calendar.MONTH, +1);    //得到下一个月
                    String enddate=sDateFormat.format(calendar.getTime());


                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.id in (select id from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+value[i]+"')  and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }
                else if(compare[i].equals("begindate")){
                    Date date = null;
                    try {
                        date = sDayFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, +100);    //得到下一个月
                    String enddate=sDateFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.id in (select id from "+fulltable+"  where "+col_name+" Between '"+value[i]
                                +"' and  '"+enddate+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.id in (select id from "+fulltable+"  where "+col_name+" Between '"+value[i]
                                +"' and  '"+enddate+"')  and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("enddate")){
                    Date date = null;
                    try {
                        date = sDayFormat.parse( value[i]);
                    } catch (ParseException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }
                    java.util.Calendar   calendar=java.util.Calendar.getInstance();
                    calendar.setTime(date);
                    calendar.add(Calendar.YEAR, -100);    //得到下一个月
                    String enddate=sDateFormat.format(calendar.getTime());

                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.id in (select id from "+fulltable+"  where "+col_name+" Between '"+enddate
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.id in (select id from "+fulltable+"  where "+col_name+" Between '"+enddate
                                +"' and  '"+value[i]+"')  and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }
                //}
            }


        }


        /*if(!businesstype.equals("all")){
            sql_list+=" and a.businesstype MATCH '"+businesstype+"'";
            sql_count+=" and a.businesstype MATCH '"+businesstype+"'";
        }*/

        if(bgdate!=null&&!bgdate.equals("")){
            Date date = null;
            try {
                date = sDayFormat.parse(bgdate);
            } catch (ParseException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.YEAR, +100);    //得到下一个月
            String enddate=sDateFormat.format(calendar.getTime());

            sql_list+=" and b.birthday Between '"+bgdate
                    +"' and  '"+enddate+"' ";

            sql_count+=" and b.birthday Between '"+bgdate
                    +"' and  '"+enddate+"' ";

        }
        if(eddate!=null&&!eddate.equals("")){

            Date date = null;
            try {
                date = sDayFormat.parse(eddate);
            } catch (ParseException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.YEAR, -100);    //得到下一个月
            String enddate=sDateFormat.format(calendar.getTime());

            sql_list+=" and b.birthday Between '"+enddate
                    +"' and  '"+eddate+"' ";

            sql_count+=" and b.birthday Between '"+enddate
                    +"' and  '"+eddate+"' ";

        }


        if (keyword!=null&&!keyword.equals("")){



                //sql_list+=" and "+FamilyTable+" MATCH '"+keyword.toUpperCase()+"*' ";
                sql_list+=" and (b.personid like '"+keyword+"%' or b.name like '%"+keyword+"%')" +
                         " ";

                sql_count+=" and (b.personid like '"+keyword+"%' or b.name like '%"+keyword+"%')" +
                        " ";

        }

        int totalnum=cd.getTotalCountBySql(sql_count);
        if(start>=0){
            /**关于desc排序的hack处理，可以加快性能**/
            int page=start/limit;
            start=totalnum-(page+1)*limit;
            if(start<0)limit=limit+start;
            /**hack 结束**/

            sql_list+=" Limit "+limit+" Offset "+start;

        }


        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

        Map<String,Object>res=new HashMap<String, Object>();
        for(Map<String,Object> map:list){
            map.put("process", ProcessType.UseProcessType.getNext(ProcessType.UseProcessType.
                    getProcessFromChinese(map.get("processstatus").toString())));
        }
        res.put(totalname,totalnum);
        res.put(rowsname,list);
        return JSONObject.fromObject(res).toString();

    }

    public String getCommonList(String querystr ,String tablename){
        JSONObject queryobj=JSONObject.fromObject(querystr);
        String sql="select * from "+tablename+" where rowid in(";
        for(Object name  :queryobj.names()){

            sql+="select rowid from "+tablename+" where "+name.toString()+" MATCH '"
                    +queryobj.get(name.toString())+"') and rowid in(";
        }
        sql=sql.substring(0,sql.lastIndexOf("and rowid"));
        ComonDao cd= new ComonDao();
        ArrayList<Map<String,Object>> list=cd.getTableList(sql);
        return  JSONArray.fromObject(list).toString();

    }
    public String updateCommonbyid(int id,String idname,String tablename,boolean isrowid,Map<String,Object> params){
        BusinessProcessDao bpdao=new BusinessProcessDao();
        int result=bpdao.updatedatabyid(id,tablename,idname,isrowid,params);
        if(result>0){
            return "{\"isok\":true,\"success\":true}";
        }
        else{
            return "{\"isok\":false,\"success\":false}";
        }

    }
    public String delCommonbyid(int id,String idname,String tablename,boolean isrowid){
        BusinessProcessDao bpdao=new BusinessProcessDao();
        int result=bpdao.deldatabyid(id,tablename,idname,isrowid);
        if(result>0){
            return "{\"isok\":true}";
        }
        else{
            return "{\"isok\":false}";
        }

    }

    public String getMedicalStandardList(int start,int limit,String keyword,String type,String businesstype
            ,String totalname,String rowsname){

        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();
        int totalnum =0;
        totalname=totalname==null?"totalCount":totalname;
        rowsname=rowsname==null?"results":rowsname;

        String sql_count="select count(*) from "+MeidicalStandard+" a,"+DivisionsTable+" b where a.divisionid=b.rowid ";

        String sql_list="select a.*,b.divisionname as division,a.rowid as rid from " +
                MeidicalStandard +" a,"+DivisionsTable+" b " +
                "where a.divisionid = b.rowid";

        if (keyword!=null&&!keyword.equals("")){
            if(keyword.indexOf("and")>0){
                String[] arr=keyword.split("and");
                for(int i=0;i<arr.length;i++){
                    sql_list+=" and a.rowid in (select c.rowid from "+MeidicalStandard+" c,"+DivisionsTable+" d " +
                            "where c.divisionid=d.rowid and "+MeidicalStandard+" MATCH '"+arr[i]+"*'" +
                            "UNION " +
                            "select c.rowid from "+MeidicalStandard+" c,"+DivisionsTable+" d " +
                    "where c.divisionid=d.rowid and "+DivisionsTable+" MATCH '"+arr[i]+"*'" +
                            ") ";
                    sql_count+=" and a.rowid in (select c.rowid from "+MeidicalStandard+" c,"+DivisionsTable+" d " +
                            "where c.divisionid=d.rowid and "+MeidicalStandard+" MATCH '"+arr[i]+"*'" +
                            "UNION " +
                            "select c.rowid from "+MeidicalStandard+" c,"+DivisionsTable+" d " +
                            "where c.divisionid=d.rowid and "+DivisionsTable+" MATCH '"+arr[i]+"*'" +
                            ") ";
                }
            }
            else if(keyword.indexOf("or")>0){

                String[] arr=keyword.split("or");
                sql_list+=" and a.rowid IN (";
                sql_count+=" and a.rowid IN (";
                for(int i=0;i<arr.length;i++){
                    //sql_list+=arr[i]+"* OR ";
                    sql_list+=
                            "    SELECT ROWID FROM "+MeidicalStandard+" WHERE "+MeidicalStandard+" MATCH '"+arr[i]+"*' " +
                                    "UNION ";
                    sql_list+=
                            " select c.rowid from "+MeidicalStandard+" c,"+DivisionsTable+" d " +
                                    "where c.divisionid=d.rowid and "+DivisionsTable+" MATCH '"+arr[i]+"*'"+"UNION " ;

                    sql_count+=
                            "    SELECT ROWID FROM "+MeidicalStandard+" WHERE "+MeidicalStandard+" MATCH '"+arr[i]+"*' " +
                                    "UNION ";
                    sql_count+=
                            " select c.rowid from "+MeidicalStandard+" c,"+DivisionsTable+" d " +
                            "where c.divisionid=d.rowid and "+DivisionsTable+" MATCH '"+arr[i]+"*'"+"UNION " ;

                }
                sql_list=sql_list.substring(0,sql_list.lastIndexOf("UNION"))+") ";
                sql_count=sql_count.substring(0,sql_count.lastIndexOf("UNION"))+") ";

            }
            else{
                sql_list+=" and a.rowid in (select rowid from "+MeidicalStandard+" where "+MeidicalStandard+" MATCH '"+keyword+"*'"
                        +" UNION select c.rowid from "+MeidicalStandard+" c,"+DivisionsTable+" d " +
                        "where c.divisionid=d.rowid and "+DivisionsTable+" MATCH '"+keyword+"*'"+
                        ") ";
                sql_count+=" and a.rowid in (select rowid from "+MeidicalStandard+" where "+MeidicalStandard+" MATCH '"+keyword+"*'"
                        +" UNION select c.rowid from "+MeidicalStandard+" c,"+DivisionsTable+" d " +
                        "where c.divisionid=d.rowid and "+DivisionsTable+" MATCH '"+keyword+"*'"+
                        ") ";

            }

        }
        if(start>=0){
            sql_list+=" Limit "+limit+" Offset "+start;
        }


        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);
        totalnum=cd.getTotalCountBySql(sql_count);
        Map<String,Object>res=new HashMap<String, Object>();
        res.put(totalname,totalnum);
        res.put(rowsname,list);
        return JSONObject.fromObject(res).toString();

    }


    public String getNeedTodoBusinessList(int start,int limit,String keyword,String type,
                                          String businesstype,boolean ispublicinfo,String bgdate,
                                          String edddate,String divisionpath,String totalname,String rowsname,String st,
                                          String[]name, String[] compare, String[] value, String[] logic){

        int statusType=0;
        if(st!=null&&!"".equals(st)){
            statusType=Integer.parseInt(st);
        }

        totalname=totalname==null?"totalCount":totalname;
        rowsname=rowsname==null?"results":rowsname;
        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();
        SimpleDateFormat sDayFormat   =   new SimpleDateFormat("yyyy-MM-dd");
        int totalnum =0;
        String sql_count="select count(*) from "+BusinessTable+" a  where 1=1 ";

        String sql_list="select a.*,a.rowid as businessid,b.displayname" +
                /*",(select count(*)  from " +
                FamilyTable+" c  where c.businessid = a.id) as familynum" +
                ",(select count(*)  from " +FamilyTable+" i  where i.businessid = a.id and i.isenjoyed = '享受') as enjoyednum" +
                ",(select count(*)  from " +
                FamilyHistoryTable+" g  where g.businessid = a.id) as beforepeople"+
                ",(select totalhelpmoney  from " +
                BusinessChangeTable+" h  where h.businessid = a.id order by time desc limit 1) as beforetotalhelpmoney"+
                ",(select d.time from " + ApprovalTable+" d where d.businessid = a.id order by d.time desc limit 1"+
                " ) as approvaltime" +
                ",(select f.displayname from "+UserTable+" f where f.id=(select e.userid from " + ApprovalTable+" e where e.businessid = a.id  order by e.time desc limit 1 "+
                " )) as approvaluser" +
                ",(select e.userid from " + ApprovalTable+" e where e.businessid =a.id  order by e.time desc limit 1 "+
                " ) as approvaluserid" +*/
                " from "+BusinessTable +" a,"+UserTable+" b " +
                "where a.userid = b.id  ";

        if(name!=null&&name.length>0){
            sql_list="SELECT a.*, a.rowid AS businessid, b.displayname," +
                    "f.sex,f.maritalstatus,f.education,f.isenjoyed"+
                    " FROM business a, users b, familymembers f WHERE a.userid = b.id AND a.id=f.businessid ";
        }
        sql_list+=" and a.division like '"+divisionpath+"%'";
        sql_count+=" and a.division like  '"+divisionpath+"%'";

        if(!businesstype.equals("all")){
            sql_list+=" and a.businesstype = '"+businesstype+"'";
            sql_count+=" and a.businesstype = '"+businesstype+"' ";
        }
        //log.debug("---------------::"+ispublicinfo);
        if(ispublicinfo){
            SimpleDateFormat sDateFormat   =   new SimpleDateFormat("yyyy-MM-dd");
            String datenow=sDateFormat.format(new   java.util.Date());

            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(new java.util.Date());
            calendar.add(Calendar.MONTH, +1);    //得到下一个月
            String eddate=sDateFormat.format(calendar.getTime());

            sql_list+=" and a.publicityedtm Between '"
                    +datenow+"' and '"+eddate+"'";
            sql_count+=" and a.publicityedtm Between '"
                    +datenow+"' and '"+eddate+"'";


        }

        if(type!=null&&!type.equals("")){
            sql_list+=" and a.processstatustype = '"+type+"'";
            sql_count+=" and a.processstatustype = '"+type+"'";

        }
        if(bgdate!=null&&!bgdate.equals("")){
            Date date = null;
            try {
                date = sDayFormat.parse(bgdate);
            } catch (ParseException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.YEAR, +100);    //得到下一个月
            String enddate=sDayFormat.format(calendar.getTime());

            sql_list+=" and (a.helpbgtime Between '"+bgdate
                    +"' and  '"+enddate+"' or a.changedate Between '"+bgdate+"' and '"+enddate+"' or a.logoutdate Between '"+bgdate+"' and '"+enddate+"')";
            sql_count+=" and (a.helpbgtime Between '"+bgdate
                    +"' and  '"+enddate+"' or a.changedate Between '"+bgdate+"' and '"+enddate+"' or a.logoutdate Between '"+bgdate+"' and '"+enddate+"')";


        }
        if(edddate!=null&&!edddate.equals("")){

            Date date = null;
            try {
                date = sDayFormat.parse(edddate);
            } catch (ParseException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.YEAR, -100);    //得到下一个月
            String enddate=sDayFormat.format(calendar.getTime());

            sql_list+=" and (a.helpbgtime Between '"+enddate
                    +"' and  '"+edddate+"' or a.changedate Between '"+enddate+"' and '"+edddate+"' or a.logoutdate Between '"+enddate+"' and '"+edddate+"')";
            sql_count+=" and (a.helpbgtime Between '"+enddate
                    +"' and  '"+edddate+"' or a.changedate Between '"+enddate+"' and '"+edddate+"' or a.logoutdate Between '"+enddate+"' and '"+edddate+"')";
        }


        if (keyword!=null&&!keyword.equals("")){


                sql_list+=" and (a.owerid  like '"+keyword+"%' or a.owername like '"+keyword+"%') ";
                sql_count+=" and (a.owerid  like '"+keyword+"%' or a.owername like '"+keyword+"%') ";

        }

        /*
        0:全部记录1:未提交记录2:审批中记录3:已审批记录4:审批已回退记录5:注销记录
         */
        String addStr=" and";
        switch (statusType){
            case 0: addStr="";break;
            case 1: addStr+="(a.processstatus in('申请'))";break;
            case 2: addStr+="(a.processstatus in('提交','审核'))";break;
            case 3: addStr+="(a.processstatus in('审批'))";break;
            //case 4: addStr+="(a.processstatus in('申请'))";break;
            case 5: addStr+="(a.processstatus ='审批' and a.processstatustype='注销')";break;
            default:addStr="";
        }

        sql_list+=addStr;
        sql_count+=addStr;

        String intelStr=Intelligent.generalSql(sql_list,name,compare,value,logic);
        if(!intelStr.trim().equals("")){   //高级搜索查询
            sql_list="select * from ("+sql_list+") where 1=1 "+intelStr;
            sql_count="select count(1) from ("+sql_list+") where 1=1 "+intelStr;
        }
        System.out.println(sql_list);
        totalnum=cd.getTotalCountBySql(sql_count);

        if(start>=0){
            /**关于desc排序的hack处理，可以加快性能**/
            int page=start/limit;
            start=totalnum-(page+1)*limit;
            if(start<0)limit=limit+start;
            /**hack 结束**/

            sql_list+="   Limit "+limit+" Offset "+start;
        }


        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);
        for(Map<String,Object> map:list){
            map.put("process", ProcessType.UseProcessType.getNext(ProcessType.UseProcessType.
                    getProcessFromChinese(map.get("processstatus").toString())));
        }

        //totalnum=cd.getTotalCountBySql(sql_count);
        Map<String,Object>res=new HashMap<String, Object>();
        res.put(totalname,totalnum);
        res.put(rowsname,list);
        return JSONObject.fromObject(res).toString();

    }




    public String getProcessHistorybid(int businessid,int start,int limit,String totalname,String rowsname){
        totalname=totalname==null?"totalCount":totalname;
        rowsname=rowsname==null?"results":rowsname;
        ComonDao cd=new ComonDao();
        String sql="select count(*) from "+ApprovalTable +" where businessid MATCH "+businessid;
        int totalnum= cd.getTotalCountBySql(sql);
        String sql_list="select a.*,b.displayname from "+ApprovalTable +" a,"+UserTable+" b " +
                "where a.businessid  MATCH "+businessid
                +" and a.userid = b.id order by a.time desc Limit "+limit+" Offset "+start;
        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);
        Map<String,Object>res=new HashMap<String, Object>();
        res.put(totalname,totalnum);
        res.put(rowsname,list);
        return JSONObject.fromObject(res).toString();

    }
    public String getSignaturebybid(int businessid){
        ComonDao cd=new ComonDao();
        String sql="select a.*,c.signaturepath from "+SignatureTable +" a," +UserTable+
                " b,"+DivisionsTable+" c where a.businessid MATCH "+businessid+
                " and a.userid=b.id and b.divisionid=c.rowid";
        ArrayList<Map<String,Object>> list=cd.getTableList(sql);
        return JSONArray.fromObject(list).toString();
    }
    public String makeApproval(Map<String,Object> param,boolean isapproval,String processstatus){
        BusinessProcess bp=new BusinessProcess();
        String staus="";
        if(isapproval)staus= ProcessType.UseProcessType.getNext
                (ProcessType.UseProcessType.getProcessFromChinese(processstatus));
        else staus=staus= ProcessType.UseProcessType.getPrevious
                (ProcessType.UseProcessType.getProcessFromChinese(processstatus));
        //else staus= ProcessType.UseProcessType.getChineseSeason(ProcessType.Callback);
        String businessid=param.get("businessid").toString();
        ComonDao cd=new ComonDao();

        if(cd.getSingleCol("select processstatus from business where rowid="+businessid).equals(processstatus)){
            Connection conn= JdbcFactory.getConn("sqlite");

            try {
                conn.setAutoCommit(false);
                int approvaluserid=bp.makeApproval(param);

                String sql_select="select a.time as approvaltime,b.displayname as approvaluser,a.userid as approvaluserid from " +
                        ApprovalTable +" a,"+UserTable +" b where a.userid=b.id  and a.businessid match "+businessid+" " +
                        "order by a.time desc limit 1";
                Map<String,Object> newprocess=cd.getSigleObj(sql_select);

                String sql_update="update "+BusinessTable +" set approvaltime='"+newprocess.get("approvaltime")+
                        "',approvaluser='"+newprocess.get("approvaluser")+"',approvaluserid='"
                        +newprocess.get("approvaluserid")+"' where id="+businessid;
                cd.delbysql(sql_update);

                bp.changeStatus(Integer.parseInt(businessid), staus);
                conn.commit();
                conn.setAutoCommit(true);
                return "{\"success\":true}";
            } catch (Exception e) {
                e.printStackTrace();
                log.debug(e.getMessage());
                try {
                    conn.rollback();
                } catch (SQLException e1) {
                    e1.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }finally {
                    return"{\"success\":false,\"msg\":\""+e.getMessage()+"\"}";
                }
                //e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }

        }else{
            return"{\"success\":false,\"msg\":\"已操作\"}";

        }





    }
    public String cancelApproval(Map<String,Object> param,boolean isapproval,String processstatus){
        BusinessProcess bp=new BusinessProcess();
        String staus="";
        staus= ProcessType.UseProcessType.getPrevious(ProcessType.UseProcessType.getProcessFromChinese(processstatus));
        String businessid=param.get("businessid").toString();
        ComonDao cd=new ComonDao();

        if(cd.getSingleCol("select processstatus from business where rowid="+businessid).equals(processstatus)){
            Connection conn= JdbcFactory.getConn("sqlite");

            try {
                conn.setAutoCommit(false);
                String sql_delete="delete from approvalprocess where rowid=(select max(rowid) from approvalprocess where businessid='" +
                        Integer.parseInt(businessid)+"' and approvalname='"+param.get("approvalname").toString()+"')";

                cd.delbysql(sql_delete); //删除当前的审核信息
                bp.changeStatus(Integer.parseInt(businessid), staus); //更新表单状态为前一个状态
                conn.commit();
                conn.setAutoCommit(true);
                return "{\"success\":true}";
            } catch (Exception e) {
                e.printStackTrace();
                log.debug(e.getMessage());
                try {
                    conn.rollback();
                } catch (SQLException e1) {
                    e1.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }finally {
                    return"{\"success\":false,\"msg\":\""+e.getMessage()+"\"}";
                }
            }

        }else{
            return"{\"success\":false,\"msg\":\"已操作\"}";

        }





    }
    public String changeBusinessStatus(int businessid,String status){
        BusinessProcess bp=new BusinessProcess();
        int result=bp.changeStatus(businessid,status);
        if(result>0)return "{\"success\":true}";
        else  return "{\"success\":false}";

    }

    public String getApplyForm(int businessid){
        BusinessProcess bp=new BusinessProcess();
        Map<String,Object>res =bp.getApplyForm(businessid);
        return JSONObject.fromObject(res).toString();

    }
    public String getApplyFormAll(int businessid){
        BusinessProcess bp=new BusinessProcess();
        Map<String,Object>res =new HashMap<String, Object>();
        res.put("form",bp.getApplyForm(businessid));
        res.put("signature",JSONArray.fromObject(this.getSignaturebybid(businessid)));
        res.put("affixfile",bp.getAffixfilebybid(businessid));
        return JSONObject.fromObject(res).toString();

    }

    public String getSignaturebybuid(int userid){//更具userid获取签名
        BusinessProcess bp=new BusinessProcess();
        Map<String,Object> res =bp.getSignaturebybuid(userid);
        return JSONObject.fromObject(res).toString();
    }
    public String getAffixfilebybid(int businessid){//根据businesid获取附件
        BusinessProcess bp=new BusinessProcess();
        ArrayList<Map<String,Object>> res =bp.getAffixfilebybid(businessid);
        return JSONArray.fromObject(res).toString();

    }
    public String getFamilymembersbybid(int businessid){ //根据busineesid获取家庭成员
        BusinessProcess bp=new BusinessProcess();
        ArrayList<Map<String,Object>>  res =bp.getFamilymembersbybid(businessid);
        return JSONArray.fromObject(res).toString();

    }

    public String getNeedTodoList(int roleid,int userid,String divisionpath,int start,int limit ,
                                  String keyword,String totalname,String rowsname){

        totalname=totalname==null?"totalCount":totalname;
        rowsname=rowsname==null?"results":rowsname;
        BusinessProcess bp=new BusinessProcess();
        int totalnum=bp.getNeedTodoCounts(roleid,userid,divisionpath,keyword);
        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        list=bp.getNeedTodoList(roleid,userid,divisionpath,start,limit,keyword,totalnum);
        Map<String,Object>res=new HashMap<String, Object>();
        res.put(totalname,totalnum);
        res.put(rowsname,list);
        return JSONObject.fromObject(res).toString();

    }

    public String delBusinessbybid(int businessid){
        BusinessProcess bp=new BusinessProcess();
        int result=bp.delBusinessbybid(businessid);
        ComonDao cd=new ComonDao();
        cd.delbysql("delete from "+VirtualindexTable +" where oid="+businessid+" and otable='"+BusinessTable+"'");
        if(result>0)return "{\"success\":true}";
        else  return "{\"success\":false}";

    }
    public String logoutUpdateBusinessApply(int businessid,Map<String,Object> params,String familymembers,
                                            String affixfiles,String signatures){
        BusinessProcess bp=new BusinessProcess();
        Connection conn= JdbcFactory.getConn("sqlite");
        try {
            conn.setAutoCommit(false);
            this.changeStatusbybid(businessid,ProcessType.UseProcessType.getChineseSeason(ProcessType.Apply));
            bp.updateApplyBusiness(businessid,params);

            if(affixfiles!=null&&!affixfiles.equals(""))bp.updateAffixFiles(affixfiles, businessid);
            if(familymembers!=null&&!familymembers.equals(""))bp.updateFamilyMembers(familymembers,businessid);
            if(signatures!=null&&!signatures.equals(""))bp.updateSignatures(signatures,businessid);
            //bp.updateAffixFiles(affixfiles, businessid);
            //bp.updateFamilyMembers(familymembers,businessid);
            //bp.updateSignatures(signatures,businessid);
            conn.commit();
            conn.setAutoCommit(true);
            return "{\"success\":true}";
        } catch (Exception e) {
            log.debug(e.getMessage());
            try {
                conn.rollback();
            } catch (SQLException e1) {
                e1.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }finally {
                return"{\"success\":false}";
            }
            //e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }


    }
    public String changeUpdateBusinessApply(int businessid,Map<String,Object> params,String familymembers,
                                            String affixfiles,String signatures){
        BusinessProcess bp=new BusinessProcess();
        Connection conn= JdbcFactory.getConn("sqlite");

        try {
            conn.setAutoCommit(false);
            bp.insertBusinessChange(businessid);
            bp.insertFamilyChange(businessid);

            /** jack 新增算法   ***/
            ComonDao cd=new ComonDao();
            String sql_familycount="select count(*) from "+FamilyTable+" where businessid="+businessid;
            String sql_beforetotalhelpmoney="select totalhelpmoney from "+BusinessTable+" WHERE id="+businessid;

            params.put("beforepeople",cd.getTotalCountBySql(sql_familycount));
            params.put("beforetotalhelpmoney",cd.getSingleCol(sql_beforetotalhelpmoney));
            /** jack 新增算法结束***/

            this.changeStatusbybid(businessid,ProcessType.UseProcessType.getChineseSeason(ProcessType.Apply));
            bp.updateApplyBusiness(businessid,params);
            if(affixfiles!=null&&!affixfiles.equals(""))bp.updateAffixFiles(affixfiles, businessid);
            if(familymembers!=null&&!familymembers.equals(""))bp.updateFamilyMembers(familymembers,businessid);
            if(signatures!=null&&!signatures.equals(""))bp.updateSignatures(signatures,businessid);
            conn.commit();
            conn.setAutoCommit(true);
            return "{\"success\":true}";
        } catch (Exception e) {
            log.debug(e.getMessage());
            try {
                conn.rollback();
            } catch (SQLException e1) {
                e1.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }finally {
                return"{\"success\":false}";
            }
            //e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }


    }

    public String saveUpdateBusinessApply(int businessid,Map<String,Object> params,String familymembers,
                                          String affixfiles,String signatures){
        BusinessProcess bp=new BusinessProcess();
        Connection conn= JdbcFactory.getConn("sqlite");

        try {
            conn.setAutoCommit(false);
            bp.updateApplyBusiness(businessid,params);
            if(affixfiles!=null&&!affixfiles.equals(""))bp.updateAffixFiles(affixfiles, businessid);
            if(familymembers!=null&&!familymembers.equals(""))bp.updateFamilyMembers(familymembers,businessid);
            if(signatures!=null&&!signatures.equals(""))bp.updateSignatures(signatures,businessid);
            conn.commit();
            conn.setAutoCommit(true);

            return "{\"success\":true}";
        } catch (Exception e) {
            log.debug(e.getMessage());
            try {
                conn.rollback();
            } catch (SQLException e1) {
                e1.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }finally {
                return"{\"success\":false}";
            }
            //e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

    }
    public String saveCommonForm(Map<String,Object> params,String tablename){
        BusinessProcessDao bDao=new BusinessProcessDao();
        int result= bDao.insertTableVales(params, tablename);
        if(result>0)return "{\"success\":true}";
        else  return "{\"success\":false}";

    }
    public String saveNewBusinessApply(Map<String,Object> params,String familymembers,
                                       String affixfiles,String businessType,boolean isprocess){



        BusinessProcess bp=new BusinessProcess();
        params.put("businesstype",businessType);
        int businessid=bp.saveApplyBusiness(params,isprocess);

        bp.saveAffixFiles(affixfiles, businessid);
        int aid=bp.saveFamilyMembers(familymembers,businessid,FamilyTable);
        /*ComonDao cd =new ComonDao();
        String insert_sql="insert into "+VirtualindexTable+"(oid,aid,otable,atable) values("+businessid+","+
                aid+",'"+BusinessTable+"','"+FamilyTable+"')";
        cd.delbysql(insert_sql);*/

        if(businessid>0)return "{\"success\":true}";
        else  return "{\"success\":false}";

    }


}

class SigleSqlThread implements Runnable{
    private Map<String, Object> params = null;
    private String sql="";
    private String name="";
    private CountDownLatch latch;
    public SigleSqlThread(Map<String, Object> pa,String  sql,String name,CountDownLatch latch){
        this.params =pa;
        this.sql=sql;
        this.name=name;
        this.latch=latch;


    }

    @Override
    public void run() {
        ComonDao cd=new ComonDao();
        params.put(name,cd.getTotalCountBySql(sql));
        latch.countDown();//工人完成工作，计数器减一

    }

}