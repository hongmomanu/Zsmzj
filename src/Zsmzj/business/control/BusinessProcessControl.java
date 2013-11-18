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

import java.sql.Connection;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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
    private  final String GrantTable="grantmoney";
    private final String MeidicalStandard="medicalstandard";
    public int getNeedTodoCounts(int roleid,int userid,String divisionpath){
        BusinessProcess bp=new BusinessProcess();
        return bp.getNeedTodoCounts(roleid,userid,divisionpath,null);

    }
    public String searchbusinessbypid(int start,int limit,String query,String[]types){
        ComonDao cd =new ComonDao();
        String sql_count= "select count(*)   from "+
                BusinessTable+" a  where 1=1";
        String sql_list=  "select a.*,b.sex,b.businessid   from "+
                BusinessTable+" a,"+FamilyTable+" b where a.rowid=b.businessid " +
                "and b.personid=a.owerid ";
        if(query!=null&&!query.equals("")){

            sql_count+=" and a.owerid MATCH '"+query+"*' ";
            sql_list+=" and a.owerid MATCH'"+query+"*' ";
        }


        sql_list+=" and b.rowid in (select rowid from "+FamilyTable+" c where  c.relationship MATCH  '"+
                RelationsType.UseRelationsType.getChineseSeason(RelationsType.ower)
                +"') ";


        if(types!=null){
            sql_list+=" and a.rowid IN (";
            sql_count+=" and a.rowid IN (";
            for(int i=0;i<types.length;i++){
                //sql_list+=arr[i]+"* OR ";
                sql_list+=
                        "select rowid from "+BusinessTable+"  where  businesstype MATCH  '"+types[i] +"' "+
                                "UNION ";

                sql_count+=
                        "    SELECT ROWID FROM "+BusinessTable+" WHERE businesstype MATCH '"+types[i]+"' " +
                                "UNION ";

            }
            sql_list=sql_list.substring(0,sql_list.lastIndexOf("UNION"))+") ";
            sql_count=sql_count.substring(0,sql_count.lastIndexOf("UNION"))+") ";
        }


        sql_list+="Limit "+limit+" Offset "+start;
        int totalCount=cd.getTotalCountBySql(sql_count);
        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);
        Map<String,Object>res=new HashMap<String, Object>();
        res.put("totalCount",totalCount);
        res.put("results",list);
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
                " b where b.rowid=a.businessid and a.rowid in (select rowid from "+GrantTable+" d where d.grantdate Between '"
                +bgdate+"' and  '"+eddate+"' union select rowid from "+GrantTable+" where grantdate Between '"+grantdate+"' and '"
                +grantdate+"')  and b.businesstype MATCH '"+businesstype+"' and b.rowid in (select rowid from "+BusinessTable
                +" where  division MATCH ( '"+divisionpath+"' ||'*') ) and b.rowid not in (select rowid from "+BusinessTable
                +" where  processstatustype MATCH '"+processstatustype+"')" ;
        String ids="";
        if(grant_arr!=null&&grant_arr.length>0){
            ids=" and b.rowid in (";
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
            return "{success:true,msg:\"资金已发放，若想重新发放请点击资金重新发放\"}";
        }
        else{
            String delsql="delete from "+GrantTable+" where rowid in(select a.rowid from "+GrantTable+" a,"+BusinessTable+
                    " b where b.rowid=a.businessid and a.rowid in (select rowid from "+GrantTable+" d where d.grantdate Between '"
                    +bgdate+"' and  '"+eddate+"' union select rowid from "+GrantTable+" where grantdate Between '"+grantdate+"' and '"
                    +grantdate+"')  and b.businesstype MATCH '"+businesstype+"' "+ids+" and b.rowid in (select rowid from "+BusinessTable
                    +" where  division MATCH ('"+divisionpath+"' ||'*') )"
                    +" and b.rowid not in (select rowid from "+BusinessTable
                    +" where  processstatustype MATCH '"+processstatustype+"')"
                    +")";
            cd.delbysql(delsql);
            String sql_list="select rowid as businessid from "+BusinessTable+" a where a.businesstype MATCH '"+businesstype+"' " +
                    "and a.rowid in (select rowid from "+BusinessTable+" b where b.processstatus MATCH '"
                    +ProcessType.UseProcessType.getChineseSeason(ProcessType.Approval)+"'"+ids+" and b.rowid in (select rowid from "+BusinessTable
                    +" where  division MATCH ('"+divisionpath+"' ||'*') )"
                    +" and b.rowid not in (select rowid from "+BusinessTable
                    +" where  processstatustype MATCH '"+processstatustype+"')"

            +")";
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
            return "{success:true,msg:\"资金已发\"}";
        }

    }
    public String changeStatusbybid(int businessid,String status){
        BusinessProcess bp=new BusinessProcess();
        int result=bp.changeStatus(businessid,status);
        if(result>0)return "{success:true}";
        else  return "{success:false}";
    }
    public String changeProcessStatustype(int businessid,String processstatustype,String processstatus){
        BusinessProcess bp=new BusinessProcess();
        int result=bp.changeProcessStatustype(businessid,processstatustype,processstatus);
        if(result>0)return "{success:true}";
        else  return "{success:false}";


    }
    public String getGrantMoneyBytype(String type,String bgmonth,String keyword,String[]name,
                                      String[]compare,String[]value,String[]logic,int start,int limit,
                                      String bgdate,String eddate,String divisionpath){
        SimpleDateFormat sDateFormat   =   new SimpleDateFormat("yyyy-MM");
        SimpleDateFormat syearFormat   =   new SimpleDateFormat("yyyy");
        String basic_sql= " a.rowid=b.businessid "
                +" and b.userid =c.rowid and  a.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+type+"')";

        basic_sql+=" and a.rowid in  (select rowid from "+BusinessTable+" where division MATCH ( '"+divisionpath+"' ||'*') )";

        String sql_list="select a.*,b.businessid,b.bgdate,b.eddate,b.grantdate,b.time as granttime,b.adjustmoney," +
                "c.displayname as grantuser,(select count(*)  from "+ FamilyTable+" d where " +
                "  d.businessid MATCH a.rowid)  as familynum," +
                " (select count(*)  from "+ FamilyTable+" e where " +
                " e.businessid = a.rowid and e.isenjoyed MATCH '享受')  as enjoynum from "+BusinessTable +" a,"+GrantTable+" b,"+UserTable
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
            String sql=" and b.rowid in (select rowid from "+GrantTable+" d where d.time Between '"+bgmonth
                    +"' and  '"+edmonth+"') ";
            sql_list+=sql;
            sql_count+=sql;
        }
        if(name!=null&&name.length>0){
            for(int i=0;i<name.length;i++){
                String col_name=name[i].split("附")[0];
                //if(logic[i].equals("and")){
                    if(compare[i].equals(">=")){
                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+" a.rowid in (select rowid from "+BusinessTable+" where CAST("+col_name+" AS real) >= "+value[i]+") ";

                        }else{
                            sql=" "+logic[i]+" (a.rowid in (select rowid from "+BusinessTable+" where CAST("+col_name+" AS real) >= "+value[i]+") and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;


                    }else if(compare[i].equals("<=")){
                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+" a.rowid in (select rowid from "+BusinessTable+" where CAST("+col_name+" AS real) <= "+value[i]+") ";

                        }else{
                            sql=" "+logic[i]+" (a.rowid in (select rowid from "+BusinessTable+" where CAST("+col_name+" AS real) <= "+value[i]+") and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;
                    }else if(compare[i].equals("=")){
                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+"  a.rowid in (select rowid from "+BusinessTable+" where "+col_name+" MATCH '"+value[i]+"') ";

                        }else{
                            sql=" "+logic[i]+"  (a.rowid in (select rowid from "+BusinessTable+" where "+col_name+" MATCH '"+value[i]+"') and ("+basic_sql+")) ";
                        }
                        sql_list+=sql;
                        sql_count+=sql;

                    }else if(compare[i].equals("match")){
                        String sql=" ";
                        if(logic[i].equals("and")){
                            sql=" "+logic[i]+"  a.rowid in (select rowid from "+BusinessTable+" where "+col_name+" MATCH '"+value[i]+"*') ";

                        }else{
                            sql=" "+logic[i]+"  (a.rowid in (select rowid from "+BusinessTable+" where "+col_name+" MATCH '"+value[i]+"*') and ("+basic_sql+")) ";
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
                            sql=" "+logic[i]+" b.rowid in (select rowid from "+GrantTable+" where "+col_name+" Between '"+value[i]
                                    +"' and  '"+endyear+"') ";

                        }else{
                            sql=" "+logic[i]+" (b.rowid in (select rowid from "+GrantTable+" where "+col_name+" Between '"+value[i]
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
                            sql=" "+logic[i]+" b.rowid in (select rowid from "+GrantTable+" where "+col_name+" Between '"+value[i]
                                    +"' and  '"+endyear+"') ";

                        }else{
                            sql=" "+logic[i]+" (b.rowid in (select rowid from "+GrantTable+" where "+col_name+" Between '"+value[i]
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
                            sql=" "+logic[i]+" b.rowid in (select rowid from "+GrantTable+" where "+col_name+" Between '"+endyear
                                    +"' and  '"+value[i]+"') ";

                        }else{
                            sql=" "+logic[i]+" (b.rowid in (select rowid from "+GrantTable+" where "+col_name+" Between '"+endyear
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
                            sql=" "+logic[i]+" b.rowid in (select rowid from "+GrantTable+" where "+col_name+" Between '"+value[i]
                                    +"' and  '"+endmonth+"') ";

                        }else{
                            sql=" "+logic[i]+" (b.rowid in (select rowid from "+GrantTable+" where "+col_name+" Between '"+value[i]
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
                            sql=" "+logic[i]+" b.rowid in (select rowid from "+GrantTable+" where "+col_name+" Between '"+value[i]
                                    +"' and  '"+endmonth+"') ";

                        }else{
                            sql=" "+logic[i]+" (b.rowid in (select rowid from "+GrantTable+" where "+col_name+" Between '"+value[i]
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
                            sql=" "+logic[i]+" b.rowid in (select rowid from "+GrantTable+" where "+col_name+" Between '"+endmonth
                                    +"' and  '"+value[i]+"') ";

                        }else{
                            sql=" "+logic[i]+" (b.rowid in (select rowid from "+GrantTable+" where "+col_name+" Between '"+endmonth
                                    +"' and  '"+value[i]+"')  and ("+basic_sql+")) ";
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


            sql_list+=" and b.rowid in (select rowid from "+GrantTable+" where grantdate Between '"+bgdate
                    +"' and  '"+enddate+"') ";
            sql_count+=" and b.rowid in (select rowid from "+GrantTable+" where grantdate Between '"+bgdate
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
            String enddate=sDateFormat.format(calendar.getTime());

            sql_list+=" and b.rowid in (select rowid from "+GrantTable+" where grantdate Between '"+enddate
                    +"' and  '"+eddate+"') ";
            sql_count+=" and b.rowid in (select rowid from "+GrantTable+" where grantdate Between '"+enddate
                    +"' and  '"+eddate+"') ";


        }
        if (keyword!=null&&!keyword.equals("")){
            if(keyword.indexOf("and")>0){
                String[] arr=keyword.split("and");
                for(int i=0;i<arr.length;i++){
                    sql_list+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+arr[i]+"*') ";
                    sql_count+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+arr[i]+"*') ";
                }
            }
            else if(keyword.indexOf("or")>0){

                String[] arr=keyword.split("or");
                sql_list+=" and a.rowid IN (";
                sql_count+=" and a.rowid IN (";
                for(int i=0;i<arr.length;i++){
                    //sql_list+=arr[i]+"* OR ";
                    sql_list+=
                            "    SELECT ROWID FROM "+BusinessTable+" WHERE "+BusinessTable+" MATCH '"+arr[i]+"*' " +
                                    "UNION ";

                    sql_count+=
                            "    SELECT ROWID FROM "+BusinessTable+" WHERE "+BusinessTable+" MATCH '"+arr[i]+"*' " +
                                    "UNION ";

                }
                sql_list=sql_list.substring(0,sql_list.lastIndexOf("UNION"))+") ";
                sql_count=sql_count.substring(0,sql_count.lastIndexOf("UNION"))+") ";
            }
            else{
                sql_list+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+keyword+"*') ";
                sql_count+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+keyword+"*') ";

            }

        }

        ComonDao cd=new ComonDao();
        int totalnum=cd.getTotalCountBySql(sql_count);
        sql_list+=" Limit "+limit+" Offset "+start;
        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

        Map<String,Object>res=new HashMap<String, Object>();
        res.put("totalCount",totalnum);
        res.put("results",list);
        return JSONObject.fromObject(res).toString();
    }
    public String getStatisticsBytype(String type,String bgmonth,int divisionpid,String businesstype){
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
            String sql_list="select a.divisionname  ,a.rowid as id," +
                    "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and  division MATCH (a.divisionpath||'*')) as totalfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as totalperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and c.businessid=b.rowid and c.sex ='男' and b.division MATCH (a.divisionpath||'*')) as totalmen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and c.businessid=b.rowid and c.sex ='女' and b.division MATCH (a.divisionpath||'*')) as totalgirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and division MATCH (a.divisionpath||'*')) as totalmoney, "

                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='城镇' and division MATCH (a.divisionpath||'*')) as cityfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and businesstype='"+businesstype+"' and b.familyaccount='城镇' and b.division MATCH (a.divisionpath||'*')) as cityperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and businesstype='"+businesstype+"' and b.familyaccount='城镇' and c.sex ='男' and b.division MATCH (a.divisionpath||'*')) as citymen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and businesstype='"+businesstype+"' and b.familyaccount='城镇' and c.sex ='女' and b.division MATCH (a.divisionpath||'*')) as citygirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='城镇' and division MATCH (a.divisionpath||'*')) as citymoney,"


                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='农村' and division MATCH (a.divisionpath||'*')) as villagefamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='农村' and businesstype='"+businesstype+"' and b.division MATCH (a.divisionpath||'*')) as villageperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='农村' and businesstype='"+businesstype+"' and c.sex ='男' and b.division MATCH (a.divisionpath||'*')) as villagemen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='农村' and businesstype='"+businesstype+"' and c.sex ='女' and b.division MATCH (a.divisionpath||'*')) as villagegirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='农村' and division MATCH (a.divisionpath||'*')) as villagemoney "



                    +"  from "+DivisionsTable+" a where a.parentid MATCH "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);

        }
        else if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.ComplexOne))){

            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();
            String sql_list="select a.divisionname  ,a.rowid as id," +
                    "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and  division MATCH (a.divisionpath||'*')) as totalfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and businesstype='"+businesstype+"' and b.division MATCH (a.divisionpath||'*')) as totalperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and businesstype='"+businesstype+"' and c.jobstatus ='老年人' and b.division MATCH (a.divisionpath||'*')) as oldperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and businesstype='"+businesstype+"' and  c.jobstatus ='登记失业' and b.division MATCH (a.divisionpath||'*')) as loginnojob,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and businesstype='"+businesstype+"' and c.jobstatus ='在校生' and b.division MATCH (a.divisionpath||'*')) as student,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and division MATCH (a.divisionpath||'*')) as totalmoney, "

                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='城镇' and division MATCH (a.divisionpath||'*')) as cityfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and businesstype='"+businesstype+"' and b.familyaccount='城镇' and b.division MATCH (a.divisionpath||'*')) as cityperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and businesstype='"+businesstype+"' and b.familyaccount='城镇' and c.sex ='男' and b.division MATCH (a.divisionpath||'*')) as citymen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and businesstype='"+businesstype+"' and b.familyaccount='城镇' and c.sex ='女' and b.division MATCH (a.divisionpath||'*')) as citygirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='城镇' and division MATCH (a.divisionpath||'*')) as citymoney,"


                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and familyaccount='农村' and businesstype='"+businesstype+"' and division MATCH (a.divisionpath||'*')) as villagefamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='农村' and businesstype='"+businesstype+"' and b.division MATCH (a.divisionpath||'*')) as villageperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='农村' and businesstype='"+businesstype+"' and c.sex ='男' and b.division MATCH (a.divisionpath||'*')) as villagemen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='农村' and businesstype='"+businesstype+"' and c.sex ='女' and b.division MATCH (a.divisionpath||'*')) as villagegirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and businesstype='"+businesstype+"' and familyaccount='农村' and division MATCH (a.divisionpath||'*')) as villagemoney "



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

        return JSONObject.fromObject(res).toString();

    }

    public String getFamilyInfoList(int start,int limit,String keyword,String businesstype,String[]name,
                                    String[]compare,String[]value,String[]logic,String bgdate,String eddate,String divisionpath){
        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();

        SimpleDateFormat sDateFormat   =   new SimpleDateFormat("yyyy-MM");
        SimpleDateFormat syearFormat   =   new SimpleDateFormat("yyyy");
        SimpleDateFormat sDayFormat   =   new SimpleDateFormat("yyyy-MM-dd");


        String basic_sql=" a.rowid = b.businessid  ";

        basic_sql+=" and b.rowid in (select rowid from "+FamilyTable+" where relationship MATCH '"+RelationsType.UseRelationsType.getChineseSeason(RelationsType.ower)+"' )";
        basic_sql+=" and c.rowid in (select rowid from "+DivisionsTable+" where divisionpath MATCH a.division )";

        basic_sql+=" and a.rowid in  (select rowid from "+BusinessTable+" where division MATCH ( '"+divisionpath+"' ||'*') )";

        if(!businesstype.equals("all")){
            basic_sql+=" and a.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"')";
        }



        String sql_count="select count(*)"+
                " from "+BusinessTable +" a,"+FamilyTable+" b, " + DivisionsTable+" c where "+basic_sql;


                //int totalnum =cd.getTotalCount(BusinessTable);

        String sql_list="select a.rowid as businessid,a.rowid,c.divisionname,a.*,(select count(*)  from "+ FamilyTable+" b where " +
                "b.businessid MATCH a.rowid)  as familynum," +
                "(select count(*)  from "+ FamilyTable+" b where " +
                "b.businessid = a.rowid and isenjoyed MATCH '享受')  as enjoynum"+
                " from "+BusinessTable +" a,"+FamilyTable+" b, " + DivisionsTable+" c  where "+basic_sql;

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
                        sql=" "+logic[i]+" a.rowid in (select rowid from "+fulltable+" where CAST("+col_name+" AS real) >= "+value[i]+") ";

                    }else{
                        sql=" "+logic[i]+" (a.rowid in (select rowid from "+fulltable+" where CAST("+col_name+" AS real) >= "+value[i]+") and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("<=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.rowid in (select rowid from "+fulltable+" where CAST("+col_name+" AS real) <= "+value[i]+") ";

                    }else{
                        sql=" "+logic[i]+" (a.rowid in (select rowid from "+fulltable+" where CAST("+col_name+" AS real) <= "+value[i]+") and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;
                }else if(compare[i].equals("=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+"  a.rowid in (select rowid from "+fulltable+" where "+col_name+" MATCH '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+"  (a.rowid in (select rowid from "+fulltable+" where "+col_name+" MATCH '"+value[i]+"') and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }else if(compare[i].equals("match")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+"  a.rowid in (select rowid from "+fulltable+" where "+col_name+" MATCH '"+value[i]+"*') ";

                    }else{
                        sql=" "+logic[i]+"  (a.rowid in (select rowid from "+fulltable+" where "+col_name+" MATCH '"+value[i]+"*') and ("+basic_sql+")) ";
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endyear+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endyear+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+endyear
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+endyear
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endmonth+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endmonth+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+endmonth
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+endmonth
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+"  where "+col_name+" Between '"+value[i]
                                +"' and  '"+enddate+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+"  where "+col_name+" Between '"+value[i]
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+"  where "+col_name+" Between '"+enddate
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+"  where "+col_name+" Between '"+enddate
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

            sql_list+=" and (a.rowid in (select rowid from "+fulltable+"  where helpbgtime Between '"+bgdate
                    +"' and  '"+enddate+"')  and ("+basic_sql+")) ";

            sql_count+=" and (a.rowid in (select rowid from "+fulltable+"  where helpbgtime Between '"+bgdate
                    +"' and  '"+enddate+"')  and ("+basic_sql+")) ";

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

            sql_list+=" and (a.rowid in (select rowid from "+fulltable+"  where helpbgtime Between '"+enddate
                    +"' and  '"+eddate+"')  and ("+basic_sql+")) ";

            sql_count+=" and (a.rowid in (select rowid from "+fulltable+"  where helpbgtime Between '"+enddate
                    +"' and  '"+eddate+"')  and ("+basic_sql+")) ";

        }

        if (keyword!=null&&!keyword.equals("")){
            if(keyword.indexOf("and")>0){
                String[] arr=keyword.split("and");
                for(int i=0;i<arr.length;i++){
                    sql_list+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+arr[i]+"*') ";
                    sql_count+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+arr[i]+"*') ";

                }
            }
            else if(keyword.indexOf("or")>0){

                String[] arr=keyword.split("or");
                sql_list+=" and a.rowid IN (";
                sql_count+=" and a.rowid IN (";
                for(int i=0;i<arr.length;i++){
                    //sql_list+=arr[i]+"* OR ";
                    sql_list+=
                            "    SELECT ROWID FROM "+BusinessTable+" WHERE "+BusinessTable+" MATCH '"+arr[i]+"*' " +
                                    "UNION ";

                    sql_count+=
                            "    SELECT ROWID FROM "+BusinessTable+" WHERE "+BusinessTable+" MATCH '"+arr[i]+"*' " +
                                    "UNION ";

                }
                sql_list=sql_list.substring(0,sql_list.lastIndexOf("UNION"))+") ";
                sql_count=sql_count.substring(0,sql_count.lastIndexOf("UNION"))+") ";
            }
            else{
                sql_list+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+keyword+"*') ";
                sql_count+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+keyword+"*') ";

            }

        }
        sql_list+="Limit "+limit+" Offset "+start;

        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);
        int totalnum=cd.getTotalCountBySql(sql_count);
        for(Map<String,Object> map:list){
            map.put("process", ProcessType.UseProcessType.getNext(ProcessType.UseProcessType.
                    getProcessFromChinese(map.get("processstatus").toString())));
        }

        Map<String,Object>res=new HashMap<String, Object>();
        res.put("totalCount",totalnum);
        res.put("results",list);
        return JSONObject.fromObject(res).toString();


    }
    public String getPeopleInfoList(int start ,int limit,String keyword,String businesstype,String[]name,
                                    String[]compare,String[]value,String[]logic,String bgdate,String eddate,String divisionpath){
        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();

        SimpleDateFormat sDateFormat   =   new SimpleDateFormat("yyyy-MM");
        SimpleDateFormat syearFormat   =   new SimpleDateFormat("yyyy");
        SimpleDateFormat sDayFormat   =   new SimpleDateFormat("yyyy-MM-dd");

        String basic_sql=" a.rowid = b.businessid  ";
        basic_sql+=" and c.rowid in (select rowid from "+DivisionsTable+" where divisionpath MATCH a.division )";

        basic_sql+=" and a.rowid in  (select rowid from "+BusinessTable+" where division MATCH ( '"+divisionpath+"' ||'*') )";
        if(!businesstype.equals("all")){
            basic_sql+=" and a.rowid in (select rowid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"')";
        }

        String sql_count="select count(*)"+
                " from "+BusinessTable +" a,"+FamilyTable+" b, " + DivisionsTable+" c "+
                "where  "+basic_sql;
        //int totalnum =cd.getTotalCount(FamilyTable);

        String sql_list="select a.division,a.owername,c.divisionname,a.processstatus,a.processstatustype,a.businesstype,b.rowid,a.owerid,b.* "+
                " from "+BusinessTable +" a,"+FamilyTable+" b, " +  DivisionsTable+" c "+
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where CAST("+col_name+" AS real) >= "+value[i]+") ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where CAST("+col_name+" AS real) >= "+value[i]+") and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("<=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where CAST("+col_name+" AS real) <= "+value[i]+") ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where CAST("+col_name+" AS real) <= "+value[i]+") and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;
                }else if(compare[i].equals("=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+"  b.rowid in (select rowid from "+fulltable+" where "+col_name+" MATCH '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+"  (b.rowid in (select rowid from "+fulltable+" where "+col_name+" MATCH '"+value[i]+"') and ("+basic_sql+")) ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }else if(compare[i].equals("match")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+"  b.rowid in (select rowid from "+fulltable+" where "+col_name+" MATCH '"+value[i]+"*') ";

                    }else{
                        sql=" "+logic[i]+"  (b.rowid in (select rowid from "+fulltable+" where "+col_name+" MATCH '"+value[i]+"*') and ("+basic_sql+")) ";
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endyear+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endyear+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+endyear
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+endyear
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endmonth+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+endmonth+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+endmonth
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+endmonth
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+" where "+col_name+" Between '"+value[i]
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+"  where "+col_name+" Between '"+value[i]
                                +"' and  '"+enddate+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+"  where "+col_name+" Between '"+value[i]
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
                        sql=" "+logic[i]+" b.rowid in (select rowid from "+fulltable+"  where "+col_name+" Between '"+enddate
                                +"' and  '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+" (b.rowid in (select rowid from "+fulltable+"  where "+col_name+" Between '"+enddate
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

            sql_list+=" and (b.rowid in (select rowid from "+fulltable+"  where birthday Between '"+bgdate
                    +"' and  '"+enddate+"')  and ("+basic_sql+")) ";

            sql_count+=" and (b.rowid in (select rowid from "+fulltable+"  where birthday Between '"+bgdate
                    +"' and  '"+enddate+"')  and ("+basic_sql+")) ";

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

            sql_list+=" and (b.rowid in (select rowid from "+fulltable+"  where birthday Between '"+enddate
                    +"' and  '"+eddate+"')  and ("+basic_sql+")) ";

            sql_count+=" and (b.rowid in (select rowid from "+fulltable+"  where birthday Between '"+enddate
                    +"' and  '"+eddate+"')  and ("+basic_sql+")) ";

        }


        if (keyword!=null&&!keyword.equals("")){
            if(keyword.indexOf("and")>0){
                String[] arr=keyword.split("and");
                for(int i=0;i<arr.length;i++){
                    sql_list+=" and b.rowid in (select rowid from "+FamilyTable+" where "+FamilyTable+" MATCH '"+arr[i]+"*'"+
                            " UNION   SELECT a.ROWID FROM "+FamilyTable+" a,"+BusinessTable+" b WHERE a.businessid=b.rowid and "
                            +BusinessTable+" MATCH '"+arr[i]+"*' " +

                            ") ";
                    sql_count+=" and b.rowid in (select rowid from "+FamilyTable+" where "+FamilyTable+" MATCH '"+arr[i]+"*'"+
                            " UNION   SELECT a.ROWID FROM "+FamilyTable+" a,"+BusinessTable+" b WHERE a.businessid=b.rowid and "
                            +BusinessTable+" MATCH '"+arr[i]+"*' " +
                            ") ";
                }
            }
            else if(keyword.indexOf("or")>0){
                //sql_list+=" and "+FamilyTable+" MATCH '";
                sql_list+=" and b.rowid IN (";
                sql_count+=" and b.rowid IN (";
                String[] arr=keyword.split("or");
                for(int i=0;i<arr.length;i++){
                    sql_list+=
                            "    SELECT ROWID FROM "+FamilyTable+" WHERE "+FamilyTable+" MATCH '"+arr[i]+"*' " +
                                    "UNION "//;
                                    +"    SELECT a.ROWID FROM "+FamilyTable+" a,"+BusinessTable+" b WHERE a.businessid=b.rowid and "
                                    +BusinessTable+" MATCH '"+arr[i]+"*' " +
                                    "UNION ";

                    sql_count+=
                            "    SELECT ROWID FROM "+FamilyTable+" WHERE "+FamilyTable+" MATCH '"+arr[i]+"*' " +
                                    "UNION "
                            +"    SELECT a.ROWID FROM "+FamilyTable+" a,"+BusinessTable+" b WHERE a.businessid=b.rowid and "
                                    +BusinessTable+" MATCH '"+arr[i]+"*' " +
                                    "UNION ";


                }
                sql_list=sql_list.substring(0,sql_list.lastIndexOf("UNION"))+") ";
                sql_count=sql_count.substring(0,sql_count.lastIndexOf("UNION"))+") ";
            }
            else{
                //sql_list+=" and "+FamilyTable+" MATCH '"+keyword.toUpperCase()+"*' ";
                sql_list+=" and b.rowid in (select rowid from "+FamilyTable+" where "+FamilyTable+" MATCH '"+keyword+"*'" +
                        " UNION select d.rowid from "+BusinessTable+" c,"+FamilyTable+" d where " +
                        " c.rowid=d.businessid and "+BusinessTable+" MATCH '"+keyword+"*') ";

                sql_count+=" and b.rowid in (select rowid from "+FamilyTable+" where "+FamilyTable+" MATCH '"+keyword+"*'" +
                        " UNION select d.rowid from "+BusinessTable+" c,"+FamilyTable+" d where " +
                        " c.rowid=d.businessid and "+BusinessTable+" MATCH '"+keyword+"*') ";



            }

        }
        sql_list+="Limit "+limit+" Offset "+start;

        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

        Map<String,Object>res=new HashMap<String, Object>();
        int totalnum=cd.getTotalCountBySql(sql_count);
        for(Map<String,Object> map:list){
            map.put("process", ProcessType.UseProcessType.getNext(ProcessType.UseProcessType.
                    getProcessFromChinese(map.get("processstatus").toString())));
        }
        res.put("totalCount",totalnum);
        res.put("results",list);
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
            return "{isok:true,success:true}";
        }
        else{
            return "{isok:false,success:false}";
        }

    }
    public String delCommonbyid(int id,String idname,String tablename,boolean isrowid){
        BusinessProcessDao bpdao=new BusinessProcessDao();
        int result=bpdao.deldatabyid(id,tablename,idname,isrowid);
        if(result>0){
            return "{isok:true}";
        }
        else{
            return "{isok:false}";
        }

    }

    public String getMedicalStandardList(int start,int limit,String keyword,String type,String businesstype){

        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();
        int totalnum =0;

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
        sql_list+=" Limit "+limit+" Offset "+start;

        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);
        totalnum=cd.getTotalCountBySql(sql_count);
        Map<String,Object>res=new HashMap<String, Object>();
        res.put("totalCount",totalnum);
        res.put("results",list);
        return JSONObject.fromObject(res).toString();

    }

    public String getNeedTodoBusinessList(int start,int limit,String keyword,String type,
                                          String businesstype,boolean ispublicinfo,String bgdate,String edddate,String divisionpath){
        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();
        SimpleDateFormat sDayFormat   =   new SimpleDateFormat("yyyy-MM-dd");
        int totalnum =0;
        String sql_count="select count(*) from "+BusinessTable+" a  where 1=1 ";

        String sql_list="select a.*,a.rowid as businessid,b.displayname,(select count(*)  from " +
                FamilyTable+" c  where c.businessid MATCH a.rowid) as familynum" +
                ",(select count(*)  from " +FamilyTable+" i  where i.businessid = a.rowid and i.isenjoyed MATCH '享受') as enjoyednum" +
                ",(select count(*)  from " +
                FamilyHistoryTable+" g  where g.businessid MATCH a.rowid) as beforepeople"+
                ",(select totalhelpmoney  from " +
                BusinessChangeTable+" h  where h.businessid MATCH a.rowid order by time desc limit 1) as beforetotalhelpmoney"+
                ",(select d.time from " + ApprovalTable+" d where d.businessid MATCH a.rowid order by d.time desc limit 1"+
                " ) as approvaltime" +
                ",(select f.displayname from "+UserTable+" f where f.id=(select e.userid from " + ApprovalTable+" e where e.businessid MATCH a.rowid  order by e.time desc limit 1 "+
                " )) as approvaluser" +
                ",(select e.userid from " + ApprovalTable+" e where e.businessid MATCH a.rowid  order by e.time desc limit 1 "+
                " ) as approvaluserid" +
                " from "+BusinessTable +" a,"+UserTable+" b " +
                "where a.userid = b.id  ";

        sql_list+=" and a.rowid in  (select rowid from "+BusinessTable+" where division MATCH ( '"+divisionpath+"' ||'*') )";
        sql_count+=" and a.rowid in  (select rowid from "+BusinessTable+" where division MATCH ( '"+divisionpath+"' ||'*') )";

        if(!businesstype.equals("all")){
            sql_list+=" and a.businesstype MATCH '"+businesstype+"'";
            sql_count+=" and a.businesstype MATCH '"+businesstype+"' ";
        }
        //log.debug("---------------::"+ispublicinfo);
        if(ispublicinfo){
            SimpleDateFormat sDateFormat   =   new SimpleDateFormat("yyyy-MM-dd");
            String datenow=sDateFormat.format(new   java.util.Date());

            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(new java.util.Date());
            calendar.add(Calendar.MONTH, +1);    //得到下一个月
            String eddate=sDateFormat.format(calendar.getTime());

            sql_list+=" and a.rowid in  (select rowid from "+BusinessTable+" where publicityedtm Between '"
                    +datenow+"' and '"+eddate+"')";
            sql_count+=" and a.rowid in  (select rowid from "+BusinessTable+" where publicityedtm Between '"
                    +datenow+"' and '"+eddate+"')";


        }

        if(type!=null&&!type.equals("")){
            sql_list+=" and a.rowid in  (select rowid from "+BusinessTable+" where processstatustype MATCH '"+type+"')";
            sql_count+=" and a.rowid in  (select rowid from "+BusinessTable+" where processstatustype MATCH '"+type+"')";

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

            sql_list+=" and a.rowid in  (select rowid from "+BusinessTable+" where helpbgtime Between '"+bgdate
                    +"' and  '"+enddate+"' or changedate Between '"+bgdate+"' and '"+enddate+"' or logoutdate Between '"+bgdate+"' and '"+enddate+"')";
            sql_list+=" and a.rowid in  (select rowid from "+BusinessTable+" where helpbgtime Between '"+bgdate
                    +"' and  '"+enddate+"' or changedate Between '"+bgdate+"' and '"+enddate+"' or logoutdate Between '"+bgdate+"' and '"+enddate+"')";


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

            sql_list+=" and a.rowid in  (select rowid from "+BusinessTable+" where helpbgtime Between '"+enddate
                    +"' and  '"+edddate+"' or changedate Between '"+enddate+"' and '"+edddate+"' or logoutdate Between '"+enddate+"' and '"+edddate+"')";
            sql_count+=" and a.rowid in  (select rowid from "+BusinessTable+" where helpbgtime Between '"+enddate
                    +"' and  '"+edddate+"' or changedate Between '"+enddate+"' and '"+edddate+"' or logoutdate Between '"+enddate+"' and '"+edddate+"')";
        }


        if (keyword!=null&&!keyword.equals("")){
            if(keyword.indexOf("and")>0){
                String[] arr=keyword.split("and");
                for(int i=0;i<arr.length;i++){
                    sql_list+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+arr[i]+"*') ";
                    sql_count+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+arr[i]+"*') ";
                }
            }
            else if(keyword.indexOf("or")>0){

                String[] arr=keyword.split("or");
                sql_list+=" and a.rowid IN (";
                sql_count+=" and a.rowid IN (";
                for(int i=0;i<arr.length;i++){
                    //sql_list+=arr[i]+"* OR ";
                    sql_list+=
                            "    SELECT ROWID FROM "+BusinessTable+" WHERE "+BusinessTable+" MATCH '"+arr[i]+"*' " +
                                    "UNION ";

                    sql_count+=
                            "    SELECT ROWID FROM "+BusinessTable+" WHERE "+BusinessTable+" MATCH '"+arr[i]+"*' " +
                                    "UNION ";

                }
                sql_list=sql_list.substring(0,sql_list.lastIndexOf("UNION"))+") ";
                sql_count=sql_count.substring(0,sql_count.lastIndexOf("UNION"))+") ";

            }
            else{
                sql_list+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+keyword+"*') ";
                sql_count+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+keyword+"*') ";

            }

        }
        sql_list+="Limit "+limit+" Offset "+start;
		System.out.println("***************************************************************************************************");
		System.out.println(sql_list);
        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);
        for(Map<String,Object> map:list){
            map.put("process", ProcessType.UseProcessType.getNext(ProcessType.UseProcessType.
                    getProcessFromChinese(map.get("processstatus").toString())));
        }

        totalnum=cd.getTotalCountBySql(sql_count);
        Map<String,Object>res=new HashMap<String, Object>();
        res.put("totalCount",totalnum);
        res.put("results",list);
        return JSONObject.fromObject(res).toString();

    }




    public String getProcessHistorybid(int businessid,int start,int limit){
        ComonDao cd=new ComonDao();
        String sql="select count(*) from "+ApprovalTable +" where businessid MATCH "+businessid;
        int totalnum= cd.getTotalCountBySql(sql);
        String sql_list="select a.*,b.displayname from "+ApprovalTable +" a,"+UserTable+" b " +
                "where a.businessid  MATCH "+businessid
                +" and a.userid = b.id order by a.time desc Limit "+limit+" Offset "+start;
        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);
        Map<String,Object>res=new HashMap<String, Object>();
        res.put("totalCount",totalnum);
        res.put("results",list);
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
                bp.makeApproval(param);
                bp.changeStatus(Integer.parseInt(businessid), staus);
                conn.commit();
                conn.setAutoCommit(true);
                return "{success:true}";
            } catch (Exception e) {
                log.debug(e.getMessage());
                try {
                    conn.rollback();
                } catch (SQLException e1) {
                    e1.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }finally {
                    return"{success:false,msg:\""+e.getMessage()+"\"}";
                }
                //e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }

        }else{
            return"{success:false,msg:\"已操作\"}";

        }





    }
    public String changeBusinessStatus(int businessid,String status){
        BusinessProcess bp=new BusinessProcess();
        int result=bp.changeStatus(businessid,status);
        if(result>0)return "{success:true}";
        else  return "{success:false}";

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

    public String getNeedTodoList(int roleid,int userid,String divisionpath,int start,int limit ,String keyword){

        BusinessProcess bp=new BusinessProcess();
        int totalnum=bp.getNeedTodoCounts(roleid,userid,divisionpath,keyword);
        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        list=bp.getNeedTodoList(roleid,userid,divisionpath,start,limit,keyword);
        Map<String,Object>res=new HashMap<String, Object>();
        res.put("totalCount",totalnum);
        res.put("results",list);
        return JSONObject.fromObject(res).toString();

    }

    public String delBusinessbybid(int businessid){
        BusinessProcess bp=new BusinessProcess();
        int result=bp.delBusinessbybid(businessid);
        if(result>0)return "{success:true}";
        else  return "{success:false}";

    }
    public String logoutUpdateBusinessApply(int businessid,Map<String,Object> params,String familymembers,
                                            String affixfiles,String signatures){
        BusinessProcess bp=new BusinessProcess();
        Connection conn= JdbcFactory.getConn("sqlite");
        try {
            conn.setAutoCommit(false);
            this.changeStatusbybid(businessid,ProcessType.UseProcessType.getChineseSeason(ProcessType.Apply));
            bp.updateApplyBusiness(businessid,params);
            //bp.updateAffixFiles(affixfiles, businessid);
            //bp.updateFamilyMembers(familymembers,businessid);
            //bp.updateSignatures(signatures,businessid);
            conn.commit();
            conn.setAutoCommit(true);
            return "{success:true}";
        } catch (Exception e) {
            log.debug(e.getMessage());
            try {
                conn.rollback();
            } catch (SQLException e1) {
                e1.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }finally {
                return"{success:false}";
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
            this.changeStatusbybid(businessid,ProcessType.UseProcessType.getChineseSeason(ProcessType.Apply));
            bp.updateApplyBusiness(businessid,params);
            bp.updateAffixFiles(affixfiles, businessid);
            bp.updateFamilyMembers(familymembers,businessid);
            bp.updateSignatures(signatures,businessid);
            conn.commit();
            conn.setAutoCommit(true);
            return "{success:true}";
        } catch (Exception e) {
            log.debug(e.getMessage());
            try {
                conn.rollback();
            } catch (SQLException e1) {
                e1.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }finally {
                return"{success:false}";
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
            bp.updateAffixFiles(affixfiles, businessid);
            bp.updateFamilyMembers(familymembers,businessid);
            bp.updateSignatures(signatures,businessid);
            conn.commit();
            conn.setAutoCommit(true);

            return "{success:true}";
        } catch (Exception e) {
            log.debug(e.getMessage());
            try {
                conn.rollback();
            } catch (SQLException e1) {
                e1.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }finally {
                return"{success:false}";
            }
            //e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

    }
    public String saveCommonForm(Map<String,Object> params,String tablename){
        BusinessProcessDao bDao=new BusinessProcessDao();
        int result= bDao.insertTableVales(params, tablename);
        if(result>0)return "{success:true}";
        else  return "{success:false}";

    }
    public String saveNewBusinessApply(Map<String,Object> params,String familymembers,
                                       String affixfiles,String businessType,boolean isprocess){

        BusinessProcess bp=new BusinessProcess();
        params.put("businesstype",businessType);
        int businessid=bp.saveApplyBusiness(params,isprocess);
        bp.saveAffixFiles(affixfiles, businessid);
        bp.saveFamilyMembers(familymembers,businessid,FamilyTable);
        if(businessid>0)return "{success:true}";
        else  return "{success:false}";

    }


}