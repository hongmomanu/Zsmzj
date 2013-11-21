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

	public int doCreate(Map<String,Map<String,Object>> param);
	public int doUpdate(Map<String,Object> param);
	public int doDelete(int pid,int type);
	public ArrayList<Map<String,Object>> findAll(String owerid,int checksum,int item,int check);
	public int getCount(String keyword,int type);
	public Map<String,Object> findById(int pid,int type);
}
