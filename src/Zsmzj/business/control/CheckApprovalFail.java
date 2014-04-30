package Zsmzj.business.control;

import Zsmzj.conmmon.CommQuery;
import Zsmzj.conmmon.ComonDao;
import Zsmzj.jdbc.JdbcFactory;
import net.sf.json.JSONObject;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Map;

/**
 * Created by Administrator on 2014/4/29.
 */
public class CheckApprovalFail
{
    ComonDao commonDao;
    public CheckApprovalFail()
    {
        commonDao = new ComonDao();
    }

    public String getUnCheckedApprovalFail(int page, int rows, int userid)
    {
        String sql = (new StringBuilder()).append("select b.*,b.id businessid,a.approvalopinion,u.username from business b,approvalprocess a,users u where a.businessid=b.id and (a.checkedflag<>'1' or a.checkedflag is null) and trim(a.approvalresult)='\u4E0D\u540C\u610F' and b.userid=").append(userid).append(" and u.id=b.userid").append(" order by b.id asc").toString();
        Map map = null;
        try
        {
            map = CommQuery.query(sql, rows, page);
        }
        catch(Exception e)
        {
            e.printStackTrace();
            return "\u67E5\u8BE2\u65F6\u53D1\u751F\u5F02\u5E38";
        }
        return JSONObject.fromObject(map).toString();
    }

    public String setCheckedApprovalFail(int businessid) throws SQLException {
        Connection connection;
        PreparedStatement pstmt;
        int count;
        connection = JdbcFactory.getConn("sqlite");
        pstmt = null;
        count = 0;
        try{
            pstmt = connection.prepareStatement("update approvalprocess set checkedflag='1' where businessid=?");
            pstmt.setString(1, (new StringBuilder()).append(businessid).append("").toString());
            count = pstmt.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
            count=-1;
        }finally {
            if(pstmt != null)
                try
                {
                    pstmt.close();
                }
                catch(SQLException e)
                {
                    e.printStackTrace();
                    count = -1;
                }
        }


        JSONObject jsonObject = new JSONObject();
        boolean success = count > -1;
        jsonObject.put("success", Boolean.valueOf(success));
        return jsonObject.toString();
    }


}
