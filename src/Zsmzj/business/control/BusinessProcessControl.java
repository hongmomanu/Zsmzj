package Zsmzj.business.control;

import Zsmzj.business.impl.BusinessProcess;
import Zsmzj.conmmon.ComonDao;
import Zsmzj.enums.ProcessType;
import Zsmzj.jdbc.JdbcFactory;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

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
    private final String ApprovalTable="approvalprocess";
    private final String FamilyTable="familymembers";
    private final String UserTable="users";

    public int getNeedTodoCounts(int roleid){
        BusinessProcess bp=new BusinessProcess();
        return bp.getNeedTodoCounts(roleid,null);

    }
    public String changeStatusbybid(int businessid,String status){
        BusinessProcess bp=new BusinessProcess();
        int result=bp.changeStatus(businessid,status);
        if(result>0)return "{success:true}";
        else  return "{success:false}";


    }
    public String getNeedTodoBusinessList(int start,int limit,String keyword){
        BusinessProcess bp=new BusinessProcess();
        ComonDao cd=new ComonDao();
        int totalnum =cd.getTotalCount(BusinessTable);
        String sql_list="select a.*,a.rowid as businessid,b.displayname,(select count(*)  from " +
                FamilyTable+" c  where c.businessid MATCH a.rowid) as familynum" +
                ",(select d.time from " + ApprovalTable+" d where d.businessid MATCH a.rowid order by d.time desc limit 1"+
                " ) as approvaltime" +
                ",(select f.displayname from "+UserTable+" f where f.id=(select e.userid from " + ApprovalTable+" e where e.businessid MATCH a.rowid  order by e.time desc limit 1 "+
                " )) as approvaluser" +
                " from "+BusinessTable +" a,"+UserTable+" b " +
                "where a.userid MATCH b.id Limit "+limit+" Offset "+start;

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
    public String getAffixfilebybid(int businessid){
        BusinessProcess bp=new BusinessProcess();
        ArrayList<Map<String,Object>> res =bp.getAffixfilebybid(businessid);
        return JSONArray.fromObject(res).toString();

    }
    public String getFamilymembersbybid(int businessid){
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

    public String saveUpdateBusinessApply(int businessid,Map<String,Object> params,String familymembers,
                                          String affixfiles){
        BusinessProcess bp=new BusinessProcess();
        Connection conn= JdbcFactory.getConn("sqlite");

        try {
            //conn.setAutoCommit(false);
            bp.updateApplyBusiness(businessid,params);
            bp.updateAffixFiles(affixfiles, businessid);
            bp.updateFamilyMembers(familymembers,businessid);
            //conn.commit();
            //conn.setAutoCommit(true);
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
            bp.saveFamilyMembers(familymembers,businessid);
            log.debug(businessType);
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
