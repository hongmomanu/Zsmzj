package Zsmzj.propertycheck.impl;

import Zsmzj.jdbc.JdbcFactory;
import Zsmzj.propertycheck.PropertyCheckDAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-19
 * Time: 下午8:10
 * To change this template use File | Settings | File Templates.
 */
public class PropertyCheckDAOImpl implements PropertyCheckDAO {
	private Connection conn=null;
	public PropertyCheckDAOImpl(){
		this.conn= JdbcFactory.getConn("sqlite");
	}
	@Override
	public int doCreate(Map<String, Object> param) {
		int result=-1;
		String col_str="";
		String val_str="";
		ArrayList<String> val_arr=new ArrayList<String>();
		Iterator iter = param.keySet().iterator();
		while (iter.hasNext()) {
			String key = iter.next().toString();
			String val = param.get(key).toString();
			val_arr.add(val);//列的值
			val_str+="?,";	//列的占位符
			col_str+=key+",";//列名
		}

		val_str=val_str.substring(0,val_str.lastIndexOf(','));
		col_str=col_str.substring(0,col_str.lastIndexOf(','));

		String sql="insert into fm01("+col_str+")values("+val_str+")";
		PreparedStatement pstmt=null;
		try {
			pstmt=conn.prepareStatement(sql);
			for(int i=0;i<val_arr.size();i++){
				pstmt.setString(i+1,val_arr.get(i));
			}
			result=pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			try {
				if(null!=pstmt){
					pstmt.close();
				}
				if(null!=null){
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return result;
	}

	@Override
	public int doUpdate(Map<String, Object> param) {
		return 0;  //To change body of implemented methods use File | Settings | File Templates.
	}

	@Override
	public int doDelete(int pid, int type) {
		return 0;  //To change body of implemented methods use File | Settings | File Templates.
	}

	@Override
	public ArrayList<Map<String, Object>> findAll(String keyword, int type) {
		return null;  //To change body of implemented methods use File | Settings | File Templates.
	}

	@Override
	public Map<String, Object> findById(int pid, int type) {
		return null;  //To change body of implemented methods use File | Settings | File Templates.
	}
}
