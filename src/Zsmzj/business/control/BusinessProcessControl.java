package Zsmzj.business.control;

import Zsmzj.business.dao.BusinessProcessDao;
import Zsmzj.business.impl.BusinessProcess;
import Zsmzj.conmmon.ComonDao;
import Zsmzj.enums.ProcessType;
import Zsmzj.enums.StatisticsType;
import Zsmzj.jdbc.JdbcFactory;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
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
    public int getNeedTodoCounts(int roleid){
        BusinessProcess bp=new BusinessProcess();
        return bp.getNeedTodoCounts(roleid,null);

    }
    public String grantmoneybytype(int userid,String bgdate,String eddate,String grantdate,String businesstype){
        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();
        int totalnum=cd.getTotalCountBySql("select count(*) from "+GrantTable+" a,"+BusinessTable+
                " b where b.rowid=a.businessid and b.businesstype MATCH '"+businesstype+"'");
        if(totalnum>0){
           return "{success:true,msg:\"资金已发\"}";
        }
        else{
            String sql_list="select rowid as businessid from "+BusinessTable+" where businesstype MATCH '"+businesstype+"'";
            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);
            BusinessProcessDao bDao=new BusinessProcessDao();

            for(Map<String,Object> item:list){
                Map<String,Object> param=new HashMap<String, Object>();
                param.put("businessid",item.get("businessid"));
                param.put("eddate",eddate);
                param.put("bgdate",bgdate);
                param.put("grantdate",grantdate);
                param.put("userid",userid);
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

    public String getStatisticsBytype(String type,String bgmonth,int divisionpid){
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
                    "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and  division MATCH (a.divisionpath||'*')) as totalfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as totalperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and c.sex ='男' and b.division MATCH (a.divisionpath||'*')) as totalmen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and c.sex ='女' and b.division MATCH (a.divisionpath||'*')) as totalgirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and division MATCH (a.divisionpath||'*')) as totalmoney, "

            +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and familyaccount='城镇' and division MATCH (a.divisionpath||'*')) as cityfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='城镇' and b.division MATCH (a.divisionpath||'*')) as cityperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='城镇' and c.sex ='男' and b.division MATCH (a.divisionpath||'*')) as citymen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='城镇' and c.sex ='女' and b.division MATCH (a.divisionpath||'*')) as citygirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and familyaccount='城镇' and division MATCH (a.divisionpath||'*')) as citymoney,"


            +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and familyaccount='农村' and division MATCH (a.divisionpath||'*')) as villagefamily ,"
            +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
            "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='农村' and b.division MATCH (a.divisionpath||'*')) as villageperson, "
            +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
            "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='农村' and c.sex ='男' and b.division MATCH (a.divisionpath||'*')) as villagemen, "
            +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
            "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='农村' and c.sex ='女' and b.division MATCH (a.divisionpath||'*')) as villagegirls,"
            +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and familyaccount='农村' and division MATCH (a.divisionpath||'*')) as villagemoney "



                    +"  from "+DivisionsTable+" a where a.parentid MATCH "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);

        }
        else if(type.equals(StatisticsType.UseStatisticsType.getChineseSeason(StatisticsType.ComplexOne))){

            BusinessProcess bp=new BusinessProcess();
            ComonDao cd=new ComonDao();
            String sql_list="select a.divisionname  ,a.rowid as id," +
                    "(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and  division MATCH (a.divisionpath||'*')) as totalfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.division MATCH (a.divisionpath||'*')) as totalperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and c.jobstatus ='老年人' and b.division MATCH (a.divisionpath||'*')) as oldperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and c.jobstatus ='登记失业' and b.division MATCH (a.divisionpath||'*')) as loginnojob,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and c.jobstatus ='在校生' and b.division MATCH (a.divisionpath||'*')) as student,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and division MATCH (a.divisionpath||'*')) as totalmoney, "

                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and familyaccount='城镇' and division MATCH (a.divisionpath||'*')) as cityfamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='城镇' and b.division MATCH (a.divisionpath||'*')) as cityperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='城镇' and c.sex ='男' and b.division MATCH (a.divisionpath||'*')) as citymen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='城镇' and c.sex ='女' and b.division MATCH (a.divisionpath||'*')) as citygirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and familyaccount='城镇' and division MATCH (a.divisionpath||'*')) as citymoney,"


                    +"(select count(*) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and familyaccount='农村' and division MATCH (a.divisionpath||'*')) as villagefamily ,"
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='农村' and b.division MATCH (a.divisionpath||'*')) as villageperson, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='农村' and c.sex ='男' and b.division MATCH (a.divisionpath||'*')) as villagemen, "
                    +"(select count(*) from "+BusinessTable+" b,"+FamilyTable+" " +
                    "c where b.time Between '"+bgmonth+"' and  '"+edmonth+"' and c.businessid=b.rowid and b.familyaccount='农村' and c.sex ='女' and b.division MATCH (a.divisionpath||'*')) as villagegirls,"
                    +  "(select sum(CAST(totalhelpmoney AS real)) from "+BusinessTable+" where time Between '"+bgmonth+"' and  '"+edmonth+"' and familyaccount='农村' and division MATCH (a.divisionpath||'*')) as villagemoney "



                    +"  from "+DivisionsTable+" a where a.parentid MATCH "+divisionpid;

            ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

            res.put("divisionname","");
            res.put("children",list);



        }
        return JSONObject.fromObject(res).toString();

    }

    public String getFamilyInfoList(int start,int limit,String keyword){
        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();
        int totalnum =cd.getTotalCount(BusinessTable);

        String sql_list="select a.rowid as businessid,a.*,(select count(*)  from "+ FamilyTable+" b where " +
                "b.businessid MATCH a.rowid)  as familynum," +
                "(select count(*)  from "+ FamilyTable+" b where " +
                "b.businessid = a.rowid and isenjoyed MATCH '享受')  as enjoynum"+
                " from "+BusinessTable +" a where a.rowid>0 ";

        if (keyword!=null&&!keyword.equals("")){
            if(keyword.indexOf("and")>0){
                String[] arr=keyword.split("and");
                for(int i=0;i<arr.length;i++){
                    sql_list+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+arr[i]+"*') ";
                }
            }
            else if(keyword.indexOf("or")>0){
                sql_list+=" and "+BusinessTable+" MATCH '";

                String[] arr=keyword.split("or");
                for(int i=0;i<arr.length;i++){
                    sql_list+=arr[i]+"* OR ";
                }
                sql_list=sql_list.substring(0,sql_list.lastIndexOf("OR"))+"' ";
            }
            else{
                sql_list+=" and "+BusinessTable+" MATCH '"+keyword+"*' ";
                /*sql_list+=" and (b.rowid in (select rowid from "+FamilyTable+" where "+FamilyTable+" MATCH '"+keyword+"*')" +
                        " or b.rowid in (select d.rowid from "+BusinessTable+" c,"+FamilyTable+" d where " +
                        " c.rowid=d.businessid and "+BusinessTable+" MATCH '"+keyword+"*')) ";*/
            }

        }
        sql_list+="Limit "+limit+" Offset "+start;

        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

        Map<String,Object>res=new HashMap<String, Object>();
        res.put("totalCount",totalnum);
        res.put("results",list);
        return JSONObject.fromObject(res).toString();


    }
    public String getPeopleInfoList(int start ,int limit,String keyword){
        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();
        int totalnum =cd.getTotalCount(FamilyTable);

        String sql_list="select a.division,a.owername,b.rowid,a.owerid,b.* "+
                " from "+BusinessTable +" a,"+FamilyTable+" b " +
                "where a.rowid = b.businessid ";

        if (keyword!=null&&!keyword.equals("")){
            if(keyword.indexOf("and")>0){
                String[] arr=keyword.split("and");
                for(int i=0;i<arr.length;i++){
                    sql_list+=" and b.rowid in (select rowid from "+FamilyTable+" where "+FamilyTable+" MATCH '"+arr[i]+"*') ";
                }
            }
            else if(keyword.indexOf("or")>0){
                sql_list+=" and "+FamilyTable+" MATCH '";

                String[] arr=keyword.split("or");
                for(int i=0;i<arr.length;i++){
                    sql_list+=arr[i]+"* OR ";
                }
                sql_list=sql_list.substring(0,sql_list.lastIndexOf("OR"))+"' ";
            }
            else{
                //sql_list+=" and "+FamilyTable+" MATCH '"+keyword.toUpperCase()+"*' ";
                sql_list+=" and (b.rowid in (select rowid from "+FamilyTable+" where "+FamilyTable+" MATCH '"+keyword+"*')" +
                        " or b.rowid in (select d.rowid from "+BusinessTable+" c,"+FamilyTable+" d where " +
                        " c.rowid=d.businessid and "+BusinessTable+" MATCH '"+keyword+"*')) ";
            }

        }
        sql_list+="Limit "+limit+" Offset "+start;

        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);

        Map<String,Object>res=new HashMap<String, Object>();
        res.put("totalCount",totalnum);
        res.put("results",list);
        return JSONObject.fromObject(res).toString();

    }
    public String getNeedTodoBusinessList(int start,int limit,String keyword,String type){
        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();
        int totalnum =0;
        if(type!=null&&!type.equals("")){
            totalnum=cd.getTotalCountBySql("select count(*) from "+BusinessTable+" where processstatustype MATCH '"+type+"'");
        }else{
            totalnum=cd.getTotalCount(BusinessTable);
        }
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
                " from "+BusinessTable +" a,"+UserTable+" b " +
                "where a.userid = b.id ";

        if(type!=null&&!type.equals("")){
            sql_list+=" and a.rowid in  (select rowid from "+BusinessTable+" where processstatustype MATCH '"+type+"')";

        }
        if (keyword!=null&&!keyword.equals("")){
            if(keyword.indexOf("and")>0){
                String[] arr=keyword.split("and");
                for(int i=0;i<arr.length;i++){
                    sql_list+=" and a.rowid in (select rowid from "+BusinessTable+" where "+BusinessTable+" MATCH '"+arr[i]+"*') ";
                }
            }
            else if(keyword.indexOf("or")>0){
                sql_list+=" and "+BusinessTable+" MATCH '";

                String[] arr=keyword.split("or");
                for(int i=0;i<arr.length;i++){
                    sql_list+=arr[i]+"* OR ";
                }
                sql_list=sql_list.substring(0,sql_list.lastIndexOf("OR"))+"' ";
            }
            else{
                sql_list+=" and "+BusinessTable+" MATCH '"+keyword.toUpperCase()+"*' ";
            }

        }
        sql_list+="Limit "+limit+" Offset "+start;

        ArrayList<Map<String,Object>> list=cd.getTableList(sql_list);
        for(Map<String,Object> map:list){
            map.put("process", ProcessType.UseProcessType.getNext(ProcessType.UseProcessType.
                    getProcessFromChinese(map.get("processstatus").toString())));
        }

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
                +" and a.userid = b.id Limit "+limit+" Offset "+start;
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
        else staus= ProcessType.UseProcessType.getChineseSeason(ProcessType.Callback);

        Connection conn= JdbcFactory.getConn("sqlite");

        try {
            conn.setAutoCommit(false);
            bp.makeApproval(param);
            bp.changeStatus(Integer.parseInt(param.get("businessid").toString()), staus);
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

    public String getNeedTodoList(int roleid,int start,int limit ,String keyword){

        BusinessProcess bp=new BusinessProcess();
        int totalnum=bp.getNeedTodoCounts(roleid,keyword);
        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        list=bp.getNeedTodoList(roleid,start,limit,keyword);
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

    public String saveNewBusinessApply(Map<String,Object> params,String familymembers,
                                       String affixfiles,String businessType){

        BusinessProcess bp=new BusinessProcess();
        params.put("businesstype",businessType);
        Connection conn= JdbcFactory.getConn("sqlite");

        try {
            conn.setAutoCommit(false);
            int businessid=bp.saveApplyBusiness(params);
            bp.saveAffixFiles(affixfiles, businessid);
            bp.saveFamilyMembers(familymembers,businessid,FamilyTable);
            conn.commit();
            conn.setAutoCommit(true);
            return "{success:true}";
        } catch (SQLException e) {
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


}
