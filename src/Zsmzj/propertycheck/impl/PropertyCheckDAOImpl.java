package Zsmzj.propertycheck.impl;

import Zsmzj.business.impl.BusinessProcess;
import Zsmzj.enums.ProcessType;
import Zsmzj.jdbc.JdbcFactory;
import Zsmzj.propertycheck.PropertyCheckDAO;
import Zsmzj.propertycheck.ResultInfo;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

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
        log.debug((String)params.get("fm01"));
        JSONObject jsonObj=  JSONObject.fromObject((String)params.get("fm01"));
        jsonObj.put("processstatus",proStatus) ;
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


		col_str+="time";
		val_str+="?";

		String sql="insert into fm01("+col_str+")values("+val_str+")";
        log.debug(sql);
		PreparedStatement pstmt=null;


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
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return result;
	}

	@Override
	public int doUpdate(Map<String, Object> param) {
        String sql_column="select * from fm01 where 1=0";
        JSONObject jsonFm01=JSONObject.fromObject((String)param.get("fm01"));
        Statement stmt=null;
        int result=1;
        try {
            stmt=conn.createStatement();
            ResultSet rs=stmt.executeQuery(sql_column);
            ResultSetMetaData md=rs.getMetaData();
            int count=md.getColumnCount();
            String setStr="";
            for(int i=1;i<=count;i++){
                String name=md.getColumnName(i);
                if("fmy001".equals(name)){
                    continue;
                }
                String value=(String)jsonFm01.get(name);
                if(null!=value){
                    setStr+=name+"='"+value+"',";
                }

            }
            setStr="update fm01 set "+setStr.substring(0,setStr.lastIndexOf(','))+ " where owerid='"+(String)jsonFm01.get("owerid")+"'";
            log.debug(setStr);

            stmt.execute(setStr);
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
            result=-1;
        } finally {
            try {
                if(null!=stmt)stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return result;
	}

	@Override
	public int doDelete(int pid, int type) {
		return 0;  //To change body of implemented methods use File | Settings | File Templates.
	}

	@Override
	public ResultInfo findAll(Map paraMap) {
        SimpleDateFormat sDayFormat   =   new SimpleDateFormat("yyyy-MM-dd");
        String addontype=(String)paraMap.get("addontype");
        String keyword=(String)paraMap.get("keyword");
        String bgdate=(String)paraMap.get("bgdate");
        String edddate=(String)paraMap.get("edddate");
        int start=Integer.parseInt((String)paraMap.get("start"));
        int limit=Integer.parseInt((String)paraMap.get("limit"));
        String sql="select a.rowid fmy001,a.*,0 addontype,b.displayname from fm01 a,users b where a.userid=b.id   ";
        String sql_count="select count(*) from fm01 a,users b where a.userid=b.id  ";

        if(bgdate!=null&&!bgdate.equals("")){
            Date date = null;
            try {
                date = sDayFormat.parse(bgdate);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.YEAR, +100);    //得到下一个月
            String enddate=sDayFormat.format(calendar.getTime());

            sql+=" and a.rowid in  (select rowid from fm01 where time Between '"+bgdate
                    +"' and  '"+enddate+"')";
            sql_count+=" and a.rowid in  (select rowid from fm01 where time Between '"+bgdate
                    +"' and  '"+enddate+"')";


        }
        if(edddate!=null&&!edddate.equals("")){

            Date date = null;
            try {
                date = sDayFormat.parse(edddate);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            java.util.Calendar   calendar=java.util.Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.YEAR, -100);    //得到下一个月
            String enddate=sDayFormat.format(calendar.getTime());

            sql+=" and a.rowid in  (select rowid from fm01 where time Between '"+bgdate
                    +"' and  '"+enddate+"')";
            sql_count+=" and a.rowid in  (select rowid from fm01 where time Between '"+bgdate
                    +"' and  '"+enddate+"')";
        }

        if(null!=keyword){
            sql+=  " and fm01 match '"+keyword+"*'";
            sql_count+=  " and fm01 match '"+keyword+"*'";
        }

        sql+= " order by a.rowid limit "+limit+" offset "+start ;
        sql_count+= " order by a.rowid limit "+limit+" offset "+start ;

        log.debug(sql);
        log.debug(sql_count);
		ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
		PreparedStatement pstmt=null;
		PreparedStatement pstmt_count=null;
        int count=0;
		try {
			pstmt=conn.prepareStatement(sql);
            /*pstmt.setInt(1,Integer.parseInt((String)paraMap.get("limit")));
            pstmt.setInt(2,Integer.parseInt((String)paraMap.get("start")));*/
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


            pstmt_count=conn.prepareStatement(sql_count);
            ResultSet rs2 = pstmt_count.executeQuery();
            if(rs2.next()){
                count=rs2.getInt(1);
            }

            rs.close();
            rs2.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			try{
				if(null!=pstmt){
					pstmt.close();
				}if(null!=pstmt_count){
                    pstmt_count.close();
				}
			}catch (SQLException e){
				e.printStackTrace();
			}
		}
		return new ResultInfo(count,list);
	}

    @Override
    public int changeBusinessProcessStatus(Map<String, Object> param) {
        JSONObject jsonObject=JSONObject.fromObject(param.get("rc"));
        String sql="update fm01 set processstatus=? where rowid=?";
        PreparedStatement pstmt=null;
        int result=0;
        try {
            pstmt=conn.prepareStatement(sql);
            pstmt.setString(1,(String)jsonObject.get("processstatus"));
            pstmt.setInt(2,Integer.parseInt((String)jsonObject.get("fmy001")));
            result=pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
	public ResultInfo findAllByCheckRole(Map paraMap) {
        String addontype=(String)paraMap.get("addontype");
        String checkitem=(String) paraMap.get("checkitem");
        String divisionpath=(String) paraMap.get("divisionpath");
        log.debug(checkitem);
        String t="1".equals(addontype)?"1":"0";
        t+=" addontype";
        String sql_comm="select a.rowid fmy001,a.*,"+ t+ ",b.checkitem checkitem,b.checkresult checkresult,b.checkcomment checkcomment  from fm01 a,fm03 b where a.rowid=b.fmy001 and b.checkitem =?"
                +" union  select a.rowid fmy001,a.*,"+ t+
                ",? checkitem,0 checkresult,'' checkcomment  from fm01 a where not exists (select * from fm03 c where c.fmy001=a.rowid and c.checkitem =?) order by checkresult,fmy001 desc";
                ;
        sql_comm="select * from ("+sql_comm+") y where y.division like '%"+divisionpath+"%'";
        String sql_count="select count(*) from ("+sql_comm+") ";
        String sql= sql_comm+" limit ? offset ?";
	    log.debug(sql);
		ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
		PreparedStatement pstmt=null;
		PreparedStatement pstmt_count=null;
        int count=0;
		try {
			pstmt=conn.prepareStatement(sql);
            pstmt.setString(1,checkitem);
            pstmt.setString(2,checkitem);
            pstmt.setString(3,checkitem);
            pstmt.setInt(4,Integer.parseInt((String)paraMap.get("limit")));
            pstmt.setInt(5,Integer.parseInt((String)paraMap.get("start")));
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

            pstmt_count=conn.prepareStatement(sql_count);
            pstmt_count.setString(1,checkitem);
            pstmt_count.setString(2,checkitem);
            pstmt_count.setString(3,checkitem);
            ResultSet rs2 = pstmt_count.executeQuery();
            if(rs2.next()){
                count=rs2.getInt(1) ;
            }

            rs.close();
            rs2.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			try{
				if(null!=pstmt){
					pstmt.close();
				}if(null!=pstmt_count){
                    pstmt_count.close();
				}
			}catch (SQLException e){
				e.printStackTrace();
			}
		}
		return new ResultInfo(count,list);
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
        String sql="select * from fm03 where fmy001=? and checkitem=?";

        String sql_updateFm03="update fm03 set checkresult=?,checkcomment=?,userid=?,userid=?,roleid=? where  fmy001=? and checkitem=?";
        String sql_insertFm03="insert into fm03(fmy001,checkitem,checkresult,checkitemstatus)values(?,?,0,0)";
        String sql2="select sum(checkresult) from fm03 where fmy001=?";
        String sql3="update fm01 set checkstatus=? where rowid=?";
        int result=0;
        PreparedStatement pstmt=null;
        PreparedStatement pstmt_updateFm03=null;
        PreparedStatement pstmt_insertFm03=null;
        PreparedStatement pstmt2=null;
        PreparedStatement pstmt3=null;

        Integer fmy001=Integer.parseInt(jsonObj.get("fmy001").toString()) ;
        try {
            pstmt=conn.prepareStatement(sql);
            pstmt.setInt(1,fmy001);
            pstmt.setString(2,(String) jsonObj.get("checkitem"));
            ResultSet rs1=pstmt.executeQuery();
            if(!rs1.next()){     //  如果fm03中没有相应的记录则新增一条
                rs1.close();
                pstmt_insertFm03=conn.prepareStatement(sql_insertFm03);
                pstmt_insertFm03.setInt(1,fmy001);
                pstmt_insertFm03.setString(2,(String) jsonObj.get("checkitem"));
                pstmt_insertFm03.execute();
            }
            pstmt_updateFm03=conn.prepareStatement(sql_updateFm03);
            pstmt_updateFm03.setInt(1,(Integer)jsonObj.get("checkresult"));
            pstmt_updateFm03.setString(2, (String) jsonObj.get("checkcomment"));
            pstmt_updateFm03.setInt(3, (Integer) jsonObj.get("userid"));
            pstmt_updateFm03.setInt(4, (Integer) jsonObj.get("userid"));
            pstmt_updateFm03.setInt(5, (Integer) jsonObj.get("roleid"));
            pstmt_updateFm03.setInt(6, fmy001);
            pstmt_updateFm03.setString(7, (String) jsonObj.get("checkitem"));

            result = pstmt_updateFm03.executeUpdate();  //更新fm03表

            pstmt2=conn.prepareStatement(sql2);
            pstmt2.setInt(1,fmy001);
            String checkstatus="";
            ResultSet rs=pstmt2.executeQuery();
            if(rs.next()){
                checkstatus=rs.getString(1);
                System.out.println(checkstatus);
            }

            pstmt3=conn.prepareStatement(sql3);
            pstmt3.setString(1,checkstatus);
            pstmt3.setInt(2,fmy001);
            pstmt3.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            try{
                if(null!=pstmt_updateFm03){
                    pstmt_updateFm03.close();
                }if(null!=pstmt_insertFm03){
                    pstmt_insertFm03.close();
                }if(null!=pstmt2){
                    pstmt2.close();
                }if(null!=pstmt3){
                    pstmt3.close();
                }if(null!=pstmt){
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
    public ResultInfo getPropertyCheckItemDatilByFmy001(Map<String, Object> param) {

        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        String sql="select * from fm03 where fmy001=?";
        PreparedStatement pstmt=null;
        Integer fmy001= Integer.parseInt((String)param.get("fmy001"));
        try {
            pstmt=conn.prepareStatement(sql);
            pstmt.setInt(1,fmy001);
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
        return new ResultInfo(list.size(),list);
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
        Integer fmy001=Integer.parseInt((String)jsonfm04.get("fmy001"));
        try {
            pstmt1=conn.prepareStatement("select processstatus from fm01 where rowid=?");
            pstmt1.setInt(1,fmy001);
            ResultSet rs=pstmt1.executeQuery();
            String rsstatus="";
            if(rs.next()){
                rsstatus=rs.getString(1);
                rs.close();
            }
            if(rsstatus.equals(processstatus)){
                conn.setAutoCommit(false);
                pstmt2=conn.prepareStatement("insert into fm04(fmy001,approvalname,approvalresult,userid,approvalopinion,submituid,time)values(?,?,?,?,?,?,?)");
                log.debug(jsonfm04.toString());
                pstmt2.setInt(1,fmy001);
                pstmt2.setString(2,(String)jsonfm04.get("approvalname"));
                pstmt2.setString(3,(String)jsonfm04.get("approvalresult"));
                pstmt2.setInt(4,(Integer)jsonfm04.get("userid"));
                pstmt2.setString(5,(String)jsonfm04.get("approvalopinion"));
                pstmt2.setInt(6,(Integer)jsonfm04.get("submituid"));
                pstmt2.setString(7,fmt.format(new java.util.Date()));
                pstmt2.execute();

                pstmt3=conn.prepareStatement("update fm01 set processstatus=? where rowid=?");
                pstmt3.setString(1,staus);
                log.debug(staus);
                pstmt3.setInt(2,fmy001);
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


    @Override
    public ResultInfo getPorcessCheck(Map<String, Object> param) {

        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        String sql="select * from fm04 where fmy001=?";
        PreparedStatement pstmt=null;
        Integer fmy001= Integer.parseInt((String)param.get("fmy001"));
        try {
            pstmt=conn.prepareStatement(sql);
            pstmt.setInt(1,fmy001);
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
        return new ResultInfo(list.size(),list);
    }
}
