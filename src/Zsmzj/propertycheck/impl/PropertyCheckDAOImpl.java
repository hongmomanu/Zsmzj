package Zsmzj.propertycheck.impl;

import Zsmzj.business.impl.BusinessProcess;
import Zsmzj.enums.ProcessType;
import Zsmzj.jdbc.JdbcFactory;
import Zsmzj.propertycheck.PropertyCheckDAO;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;

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
    private static final Logger log = Logger.getLogger( PropertyCheckDAOImpl.class);
	private Connection conn=null;
    private String[] checkItemArray={"核定住房","核定收入","核定现有资产"};
    private SimpleDateFormat fmt=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public PropertyCheckDAOImpl(Connection conn){
		this.conn=conn;
	}
	@Override
	public int doCreate(Map<String, Object> params) {
        String proStatus="";
        String isprocess=(String)params.get("isprocess");
        if("true".equals(isprocess)){
            proStatus= ProcessType.UseProcessType.getChineseSeason(ProcessType.Apply);
        }else{
            proStatus= ProcessType.UseProcessType.getChineseSeason(ProcessType.NoProcess);
        }
        System.out.println ((String)params.get("fm01"))  ;
        JSONObject jsonObj=  JSONObject.fromObject((String)params.get("fm01"));
        jsonObj.put("processstatus",proStatus) ;
         String owerid=(String)jsonObj.get("owerid");
		int result=-1;
		String col_str="";
		String val_str="";
		ArrayList<String> val_arr=new ArrayList<String>();
		Iterator iter = jsonObj.keys();
        while(iter.hasNext()){
            String key=iter.next().toString();
            String val= jsonObj.get(key).toString();
            //System.out.println(key+":"+jsonObj.get(key));
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
		PreparedStatement pstmt2=null;


		try {
			int i=0;
			pstmt=conn.prepareStatement(sql);
			for(;i<val_arr.size();i++){
				pstmt.setString(i+1,val_arr.get(i));
			}
			pstmt.setString(i+1,fmt.format(new java.util.Date()));
			result=pstmt.executeUpdate();

            pstmt2=conn.prepareStatement("insert into fm03(owerid,checkitem,checkresult)values(?,?,?)");
            for(int j=0;j<checkItemArray.length;j++){
                pstmt2.setString(1, owerid);
                pstmt2.setString(2, checkItemArray[j]);
                pstmt2.setInt(3, 0);
                pstmt2.execute();
            }

		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			try {
				if(null!=pstmt){
					pstmt.close();
				}if(null!=pstmt2){
					pstmt2.close();
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
	public ArrayList<Map<String, Object>> findAll(Map paraMap) {
        String addontype=(String)paraMap.get("addontype");
        String sql="select a.*,0 addontype from fm01 a";

		ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
		PreparedStatement pstmt=null;
		try {
			pstmt=conn.prepareStatement(sql);
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
				}
			}catch (SQLException e){
				e.printStackTrace();
			}
		}
		return list;
	}

    @Override
    public int changeBusinessProcessStatus(Map<String, Object> param) {
        JSONObject jsonObject=JSONObject.fromObject(param.get("rc"));
        String sql="update fm01 set processstatus=? where owerid=?";
        PreparedStatement pstmt=null;
        int result=0;
        try {
            pstmt=conn.prepareStatement(sql);
            log.debug(jsonObject.toString());
            log.debug(jsonObject.get("processstatus"));
            log.debug(jsonObject.get("owerid"));
            pstmt.setString(1,(String)jsonObject.get("processstatus"));
            pstmt.setString(2,(String)jsonObject.get("owerid"));
            result=pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
	public ArrayList<Map<String, Object>> findAllByCheckRole(Map paraMap) {
        String addontype=(String)paraMap.get("addontype");
        String checkitem=(String) paraMap.get("checkitem");
        String t="1".equals(addontype)?"1":"0";
        t+=" addontype";
        String sql="select a.*,"+ t+ ",b.checkitem,b.checkresult,b.checkcomment  from fm01 a,fm03 b where a.owerid=b.owerid and b.checkitem=?";

										//查询某个核定项目
		ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
		PreparedStatement pstmt=null;
		try {
			pstmt=conn.prepareStatement(sql);
            pstmt.setString(1,checkitem);
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
				}
			}catch (SQLException e){
				e.printStackTrace();
			}
		}
		return result;
	}


    @Override
    public int doCheckItem(Map<String, Object> param) {
        JSONObject jsonObj=  JSONObject.fromObject((String)param.get("fm03"));
        log.debug(jsonObj.toString());

        String sql="update fm03 set checkresult=?,checkcomment=?,userid=?,userid=?,roleid=? where  owerid=? and checkitem=?";
        String sql2="select sum(checkresult) from fm03 where owerid=?";
        String sql3="update fm01 set checkstatus=? where owerid=?";
        int result=0;
        PreparedStatement pstmt=null;
        PreparedStatement pstmt2=null;
        PreparedStatement pstmt3=null;

        try {
            pstmt=conn.prepareStatement(sql);
            pstmt.setInt(1,(Integer)jsonObj.get("checkresult"));
            pstmt.setString(2, (String) jsonObj.get("checkcomment"));
            pstmt.setInt(3, (Integer) jsonObj.get("userid"));
            pstmt.setInt(4, (Integer) jsonObj.get("userid"));
            pstmt.setInt(5, (Integer) jsonObj.get("roleid"));
            pstmt.setString(6, (String) jsonObj.get("owerid"));
            pstmt.setString(7, (String) jsonObj.get("checkitem"));

            result = pstmt.executeUpdate();  //更新fm03表

            pstmt2=conn.prepareStatement(sql2);
            pstmt2.setString(1,(String)jsonObj.get("owerid"));
            String checkstatus="";
            ResultSet rs=pstmt2.executeQuery();
            if(rs.next()){
                checkstatus=rs.getString(1);
                System.out.println(checkstatus);
            }

            pstmt3=conn.prepareStatement(sql3);
            pstmt3.setString(1,checkstatus);
            pstmt3.setString(2,(String)jsonObj.get("owerid"));
            pstmt3.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            try{
                if(null!=pstmt){
                    pstmt.close();
                }
            }catch (SQLException e){
                e.printStackTrace();
            }
        }
        return result;
    }

     /*
     根据owerid查询fm03中的全部记录
      */
    @Override
    public ArrayList<Map<String,Object>> getPropertyCheckItemDatilByOwerId(Map<String, Object> param) {

        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        String sql="select * from fm03 where owerid=?";
        PreparedStatement pstmt=null;
        try {
            pstmt=conn.prepareStatement(sql);
            pstmt.setString(1,(String)param.get("owerid"));
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
        } finally{
            try{
                if(null!=pstmt){
                    pstmt.close();
                }
            }catch(SQLException e){
                 e.printStackTrace();
            }
        }
        return list;
    }


    @Override
    public String makeApproval(Map<String, Object> param) { //进入提交之后的审核审批流程
        //JSONObject jsonfm01=JSONObject.fromObject((String)param.get("fm01"));
        JSONObject jsonfm04=JSONObject.fromObject((String)param.get("fm04"));

        String processstatus=(String)jsonfm04.get("processstatus");
        Boolean isapproval=(Boolean)jsonfm04.get("isapproval");
        String staus="";
        if(isapproval)staus= ProcessType.UseProcessType.getNext
                (ProcessType.UseProcessType.getProcessFromChinese(processstatus));
        else staus= ProcessType.UseProcessType.getPrevious
                (ProcessType.UseProcessType.getProcessFromChinese(processstatus));
        //如果家庭信息表fm01的processstatus与传递过来的processstatus，则要把  staus 插入到 审核表中fm04,并更新fm01中的 processstatus的值 为  staus
        PreparedStatement pstmt1=null;
        PreparedStatement pstmt2=null;
        PreparedStatement pstmt3=null;
        String result=null;
        try {
            pstmt1=conn.prepareStatement("select processstatus from fm01 where owerid=?");
            pstmt1.setString(1,(String)jsonfm04.get("owerid"));
            ResultSet rs=pstmt1.executeQuery();
            String rsstatus="";
            if(rs.next()){
                rsstatus=rs.getString(1);
                rs.close();
            }
            if(rsstatus.equals(processstatus)){
                conn.setAutoCommit(false);
                pstmt2=conn.prepareStatement("insert into fm04(owerid,approvalname,approvalresult,userid,approvalopinion,submituid,time)values(?,?,?,?,?,?,?)");
                log.debug(jsonfm04.toString());
                pstmt2.setString(1,(String)jsonfm04.get("owerid"));
                pstmt2.setString(2,(String)jsonfm04.get("approvalname"));
                pstmt2.setString(3,(String)jsonfm04.get("approvalresult"));
                pstmt2.setInt(4,(Integer)jsonfm04.get("userid"));
                pstmt2.setString(5,(String)jsonfm04.get("approvalopinion"));
                pstmt2.setInt(6,(Integer)jsonfm04.get("submituid"));
                pstmt2.setString(7,fmt.format(new java.util.Date()));
                pstmt2.execute();

                pstmt3=conn.prepareStatement("update fm01 set processstatus=? where owerid=?");
                pstmt3.setString(1,staus);
                log.debug(staus);
                pstmt3.setString(2,(String)jsonfm04.get("owerid"));
                pstmt3.executeUpdate();

                conn.commit();
                conn.setAutoCommit(true);
                result= "{success:true}";
            }
        } catch (SQLException e) {
            e.printStackTrace();
            result="{success:false,msg:\""+e.getMessage()+"\"}";
        }catch(Exception e){
            e.printStackTrace();
            result="{success:false,msg:\""+e.getMessage()+"\"}";
        }
        finally{
            try {
                if(null!=pstmt3)pstmt3.close();
                if(null!=pstmt2)pstmt2.close();
                if(null!=pstmt1)pstmt1.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return result;
    }
}
