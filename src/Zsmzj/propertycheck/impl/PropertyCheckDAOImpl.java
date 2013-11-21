package Zsmzj.propertycheck.impl;

import Zsmzj.jdbc.JdbcFactory;
import Zsmzj.propertycheck.PropertyCheckDAO;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;

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
	public int doCreate(Map<String,Map<String, Object>> params) {
		Map<String, Object>param=params.get("fm01");
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

		/*val_str=val_str.substring(0,val_str.lastIndexOf(','));
		col_str=col_str.substring(0,col_str.lastIndexOf(','));*/
		col_str+="time";
		val_str+="?";

		String sql="insert into fm01("+col_str+")values("+val_str+")";
		PreparedStatement pstmt=null;
		SimpleDateFormat fmt=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			int i=0;
			pstmt=conn.prepareStatement(sql);
			for(;i<val_arr.size();i++){
				pstmt.setString(i+1,val_arr.get(i));
			}
			pstmt.setString(i+1,fmt.format(new java.util.Date()));
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
	public ArrayList<Map<String, Object>> findAll(String owerid, int checksum,int item,int check) {
		String sql="select a.* from fm01 a,fm02 b,fm03 c where a.owerid=? and a.owerid=b.owerid and a.owerid=c.owerid ";
		if(checksum==1){
			sql+=" and b.checkresult=1";//查询全部档核定通过的
		}else{
			sql+=" and b.checkresult=0 and c.checkitem=?  and c.checkresult=?";
		}								//查询某个核定项目
		ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
		PreparedStatement pstmt=null;
		try {
			pstmt=conn.prepareStatement(sql);
			pstmt.setString(1,owerid);
			if(checksum==0){
				pstmt.setInt(2,item);
				pstmt.setInt(3,check);
			}
			ResultSet rs = pstmt.executeQuery();
			ResultSetMetaData data=rs.getMetaData();
			int colnums=data.getColumnCount();
			while (rs.next()) {
				Map<String,Object> map=new HashMap<String, Object>();
				for(int i = 1;i<= colnums;i++){
					String columnName = data.getColumnName(i);
					String value=rs.getString(columnName);
					map.put(columnName,value);
				}
				list.add(map);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			try{
				if(null!=pstmt){
					pstmt.close();
				}if(null!=conn){
					conn.close();
				}
			}catch (SQLException e){
				e.printStackTrace();
			}
		}
		return list;
	}

	@Override
	public Map<String, Object> findById(int pid, int type) {
		return null;
	}

	@Override
	public int getCount(String keyword, int type) {
		String sql="select count(*) from fm01";
		int result=0;
		PreparedStatement pstmt=null;
		try {
			pstmt=conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				result++;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			try{
				if(null!=pstmt){
					pstmt.close();
				}if(null!=conn){
					conn.close();
				}
			}catch (SQLException e){
				e.printStackTrace();
			}
		}
		return result;
	}
}
