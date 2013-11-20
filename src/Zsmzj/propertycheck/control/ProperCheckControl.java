package Zsmzj.propertycheck.control;

import Zsmzj.propertycheck.PropertyCheckDAO;
import Zsmzj.propertycheck.impl.PropertyCheckDAOImpl;

import java.sql.Connection;
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

	public String saveFamliyPropertyInfo(Map<String,Object> params){
		int result=dao.doCreate(params);
		if(result>0){
			return "{success:true}";
		}
		else{
			return "{success:false}";
		}
	}

}
