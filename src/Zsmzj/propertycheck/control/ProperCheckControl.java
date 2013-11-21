package Zsmzj.propertycheck.control;

import Zsmzj.propertycheck.PropertyCheckDAO;
import Zsmzj.propertycheck.impl.PropertyCheckDAOImpl;
import net.sf.json.JSONObject;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-19
 * Time: 下午8:15
 * To change this template use File | Settings | File Templates.
 */
public class ProperCheckControl {
	private PropertyCheckDAO dao=null;
	public ProperCheckControl(){
		dao=new PropertyCheckDAOImpl();
	}

	public String saveFamliyPropertyInfo(Map<String,Map<String,Object>> params){
		int result=dao.doCreate(params);
		if(result>0){
			return "{success:true}";
		}
		else{
			return "{success:false}";
		}
	}

	/*
	*
	* 查询家庭财产信息
	*/
	public String getFamilyPropertyInfo(){
		Map<String,Object>res=new HashMap<String, Object>();
		ArrayList<Map<String, Object>> list=dao.findAll("", 0,1,0);
		res.put("totalCount",list.size());
		res.put("results",list);
		return JSONObject.fromObject(res).toString();
	}
}
