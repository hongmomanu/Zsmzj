package Zsmzj.propertycheck.control;

import Zsmzj.enums.ProcessType;
import Zsmzj.jdbc.JdbcFactory;
import Zsmzj.propertycheck.PropertyCheckDAO;
import Zsmzj.propertycheck.impl.PropertyCheckDAOImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.sql.Connection;
import java.sql.SQLException;
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
    private Connection conn=null;
	public ProperCheckControl(){
        conn=JdbcFactory.getConn("sqlite");
		dao=new PropertyCheckDAOImpl(conn );
	}
    private void closeConnection(){
            try{
                if(null!=conn){
                    conn.close();
                }
            }catch (SQLException e){
                e.printStackTrace();
            }
    }
    /*
    登记模块中保存家庭财产信息
     */
	public String saveFamliyPropertyInfo(Map<String,Object> params){
		int result= 0;
        try{
            result=dao.doCreate(params);
        } catch(Exception e){
            e.printStackTrace();
        } finally {
            closeConnection();
        }
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
	public String getFamilyPropertyInfo(Map paraMap){
		Map<String,Object>res=new HashMap<String, Object>();
		ArrayList<Map<String, Object>> list=dao.findAll(paraMap);
        for(Map<String,Object> map:list){
            map.put("process", ProcessType.UseProcessType.getNext(ProcessType.UseProcessType.
                    getProcessFromChinese(map.get("processstatus").toString())));
        }
		res.put("totalCount",list.size());
		res.put("results",list);
        closeConnection();          //负责创建连接并负责关闭连接
		return JSONObject.fromObject(res).toString();
	}
    /*
    核定操作人员进行的查询
     */
    public String getFamilyPropertyInfoByCheckRole(Map paraMap){
		Map<String,Object>res=new HashMap<String, Object>();
		ArrayList<Map<String, Object>> list=dao.findAllByCheckRole(paraMap);
		res.put("totalCount",list.size());
		res.put("results",list);
        closeConnection();
		return JSONObject.fromObject(res).toString();
	}
    /*
    根据owerid查询所有的核定信息
     */
    public String getPropertyCheckItemDatilByOwerId(Map paraMap){
		Map<String,Object>res=new HashMap<String, Object>();
		ArrayList<Map<String, Object>> list=dao.getPropertyCheckItemDatilByOwerId(paraMap);
		res.put("totalCount",list.size());
		res.put("results",list);
        closeConnection();
		return JSONObject.fromObject(res).toString();
	}
    /*
       各核定单位进行核定操作
     */
    public String doCheckItem(Map paraMap) {
        int result= 0;

        try{
            result=dao.doCheckItem(paraMap);
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            closeConnection();
        }

        if(result>0){
            return "{success:true}";
        }
        else{
            return "{success:false}";
        }
    }

    /*
       申请 -- 提交 状态的改变
     */
    public String changeBusinessStatus(Map paraMap){
        int result=dao.changeBusinessProcessStatus(paraMap);
        this.closeConnection();
        if(result>0)return "{success:true}";
        else  return "{success:false}";
    }

    /*
    审核审批
     */
    public String processCheck(Map paraMap){
        String result=dao.makeApproval(paraMap);
        this.closeConnection();
        return result;
    }
}
