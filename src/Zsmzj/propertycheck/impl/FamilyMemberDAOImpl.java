package Zsmzj.propertycheck.impl;

import Zsmzj.propertycheck.FamilyMemberDAO;
import Zsmzj.propertycheck.PropertyCommonDAO;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-7
 * Time: 下午5:58
 * To change this template use File | Settings | File Templates.
 */
public class FamilyMemberDAOImpl implements FamilyMemberDAO {
     private Connection conn=null;
     private PropertyCommonDAO commdao=null;
     public FamilyMemberDAOImpl(Connection conn, PropertyCommonDAO commdao){
            this.conn=conn;
            this.commdao=commdao;

     }
    public int saveFamilyMembers(Map<String,Object> params,int fmy001){
        int result_num=0;
        JSONArray arr=JSONArray.fromObject(params.get("familymembers"));
        for(Object item:arr){
            JSONObject jsonitem=JSONObject.fromObject(item);
            Iterator<?> it = jsonitem.keys();
            Map<String,Object> mp=new HashMap<String, Object>();
            mp.put("fmy001",fmy001);

            while(it.hasNext()){//遍历JSONObject
                String name = (String) it.next().toString();
                if(name.equals("age"))continue;
                String value = jsonitem.getString(name);
                mp.put(name,value);

            }
            result_num=commdao.insertTableVales(mp, "fm02");

        }
        return result_num;
    }


}
