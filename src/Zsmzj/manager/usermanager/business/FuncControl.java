package Zsmzj.manager.usermanager.business;

import Zsmzj.manager.usermanager.impl.FuncImplement;
import Zsmzj.manager.usermanager.impl.RoleImplement;
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
public class FuncControl {
    public String getFuncs(int start,int limit,String keyword){

        FuncImplement func=new FuncImplement();
        return JSONArray.fromObject(func.getFuncs(start, limit, keyword)).toString();

    }

    public String getFuncsByRole(int roleid,String type){

        FuncImplement func=new FuncImplement();
        return JSONArray.fromObject(func.getFuncsByRole(roleid,type)).toString();


    }

    public String EditFunc(int funcid,String funcname,String functype,String label,String imgurl)
    {

        FuncImplement func=new FuncImplement();
        Map<String,Object> res=new HashMap<String, Object>();
        int resultid=func.EditFunc(funcid,funcname,functype,label,imgurl);
        if(resultid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();
    }

    public String addNewFunc(String funcname,String functype){
        FuncImplement func=new FuncImplement();
        Map<String,Object> res=new HashMap<String, Object>();
        int funcid=func.addnewFunc(funcname,functype);
        if(funcid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();

    }

    public String delFunc(int roleid){
        FuncImplement func=new FuncImplement();
        Map<String,Object> res=new HashMap<String, Object>();
        int resultid=func.delFunc(roleid);
        if(resultid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();

    }



}
