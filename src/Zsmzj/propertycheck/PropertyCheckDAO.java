package Zsmzj.propertycheck;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-19
 * Time: 下午7:57
 * To change this template use File | Settings | File Templates.
 */
public interface PropertyCheckDAO {

	public int doCreate(Map<String,Object> param);
	public int doUpdate(Map<String,Object> param);
	public int doDelete(int pid,int type);
	public ArrayList<Map<String,Object>> findAll(Map paraMap);
	public ArrayList<Map<String,Object>> findAllByCheckRole(Map paraMap);
	public int getCount(String keyword,int type);
	public Map<String,Object> findById(int pid,int type);
    public int changeBusinessProcessStatus(Map<String,Object> param);


    public int doCheckItem(Map<String,Object> param);
    public ArrayList<Map<String,Object>> getPropertyCheckItemDatilByOwerId(Map<String,Object> param) ;


    //审核流程
    public String makeApproval(Map<String,Object> param);

}
