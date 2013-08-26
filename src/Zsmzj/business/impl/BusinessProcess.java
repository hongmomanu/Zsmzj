package Zsmzj.business.impl;

import Zsmzj.business.dao.BusinessProcessDao;
import Zsmzj.business.intf.BusinessProcessIntf;
import Zsmzj.enums.ProcessType;
import Zsmzj.manager.usermanager.impl.FuncImplement;
import Zsmzj.manager.usermanager.impl.RoleImplement;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 下午2:36
 * To change this template use File | Settings | File Templates.
 */
public class BusinessProcess implements BusinessProcessIntf {
    private static final Logger log = Logger.getLogger(BusinessProcess.class);
    private static final String  BusinessTable="business";
    private static final String FamilyTable="familymembers" ;
    private static final String AttachmentTable="attachment";
    private static final String NeedKey="待办事务";
    @Override
    public int saveApplyBusiness(Map<String, Object> param) {
        String proStatus= ProcessType.UseProcessType.getChineseSeason(ProcessType.Apply);
        param.put("processstatus",proStatus);
        BusinessProcessDao bDao=new BusinessProcessDao();
        return bDao.insertTableVales(param, BusinessTable);


    }

    @Override
    public int saveFamilyMembers(String membersjson,int businessid) {

        int result_num=0;
        JSONArray arr=JSONArray.fromObject(membersjson);
        for(Object item:arr){
            JSONObject jsonitem=JSONObject.fromObject(item);
            Iterator<?> it = jsonitem.keys();
            Map<String,Object> mp=new HashMap<String, Object>();
            mp.put("businessid",businessid);

            while(it.hasNext()){//遍历JSONObject
                String name = (String) it.next().toString();
                if(name.equals("age"))continue;
                String value = jsonitem.getString(name);
                mp.put(name,value);

            }
            BusinessProcessDao bDao=new BusinessProcessDao();
            result_num=bDao.insertTableVales(mp, FamilyTable);

        }
        return result_num;
    }

    @Override
    public int saveAffixFiles(String filesjson,int businessid) {

        log.debug(filesjson);

        int result_num=0;
        JSONArray arr=JSONArray.fromObject(filesjson);
        for(Object item:arr){
            JSONObject jsonitem=JSONObject.fromObject(item);
            Iterator<?> it = jsonitem.keys();
            Map<String,Object> mp=new HashMap<String, Object>();
            mp.put("businessid",businessid);

            while(it.hasNext()){//遍历JSONObject
                String name = (String) it.next().toString();
                mp.put("attachmenttype",name);
                JSONArray value = jsonitem.getJSONArray(name);

                for(Object item_value:value){

                    JSONObject jsonitem_value=JSONObject.fromObject(item_value);
                    Iterator<?> it_value = jsonitem_value.keys();
                    while(it_value.hasNext()){//遍历JSONObject
                        String name_value = (String) it_value.next().toString();
                        String value_value=jsonitem_value.getString(name_value);
                        mp.put(name_value,value_value);
                    }

                    BusinessProcessDao bDao=new BusinessProcessDao();
                    result_num=bDao.insertTableVales(mp,AttachmentTable);
                }

            }


        }
        return result_num;


    }

    @Override
    public int getNeedTodoCounts(int roleid,String keyword) {
        FuncImplement func=new FuncImplement();
        ArrayList<Map<String, Object>> status_arr =func.getFuncsByRole(roleid, NeedKey);
        if(status_arr.size()==0)return 0;
        BusinessProcessDao bpDao=new BusinessProcessDao();
        return bpDao.getNeedToDoCounts(status_arr,keyword,BusinessTable);

    }

    @Override
    public ArrayList<Map<String, Object>> getNeedTodoList(int roleid,int start,int limit,String keyword) {
        FuncImplement func=new FuncImplement();
        ArrayList<Map<String, Object>> status_arr =func.getFuncsByRole(roleid, NeedKey);
        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        if(status_arr.size()==0)return list;
        BusinessProcessDao bpDao=new BusinessProcessDao();
        return bpDao.getNeedToDoLists(status_arr,start,limit,keyword,BusinessTable);



    }

    @Override
    public int changeStatus(int businessid, int type) {
        return 0;  //To change body of implemented methods use File | Settings | File Templates.
    }
}
