package Zsmzj.manager.usermanager.business;

import Zsmzj.manager.usermanager.impl.FuncImplement;
import Zsmzj.manager.usermanager.impl.RoleImplement;
import Zsmzj.manager.usermanager.impl.UserImplement;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */
public class RoleControl {
    public String getRoles(int start,int limit,String keyword){

        RoleImplement role=new RoleImplement();
        return JSONArray.fromObject(role.getRoles(start, limit, keyword)).toString();

    }

    public String getRoleFuncs(int start,int limit,String keyword,int roleid){
        FuncImplement func=new FuncImplement();
        return JSONArray.fromObject(func.getFuncs(start, limit, keyword)).toString();

    }
    public String addNewRole(String rolename){
        RoleImplement role=new RoleImplement();
        Map<String,Object> res=new HashMap<String, Object>();
        int roleid=role.addnewRole(rolename);
        if(roleid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();

    }

    public String delRole(int roleid){
        RoleImplement role=new RoleImplement();
        Map<String,Object> res=new HashMap<String, Object>();
        int resultid=role.delRole(roleid);
        System.out.println(resultid);
        if(resultid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();

    }



}
