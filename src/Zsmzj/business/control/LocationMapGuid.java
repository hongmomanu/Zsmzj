package Zsmzj.business.control;

import Zsmzj.jdbc.JdbcFactory;
import net.sf.json.JSONObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Random;

/**
 * User: Administrator
 * Date: 14-3-21
 * Time: 上午11:22
 */
public class LocationMapGuid {
    private static String str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private  String genString(){
        Random random = new Random();
        StringBuffer buf = new StringBuffer();
        for (int i = 0; i < 31; i++) {
            int num = random.nextInt(62);
            if(i==4||i==9||i==16){
                buf.append("-");
            }else{
                buf.append(str.charAt(num));
            }
        }
        return "zsmzj"+buf.toString();
    }

    public String setMapGuidByBusinessId(Integer businessid,String mapguid){
        //String mapguid=genString();
        Connection conn=JdbcFactory.getConn("'sqlite'");
        boolean success=true;
        PreparedStatement pstmt=null;
        try {
            pstmt=conn.prepareStatement("update business set mapguid=? where id=?");
            pstmt.setString(1,mapguid);
            pstmt.setInt(2,businessid);
            pstmt.execute();
        } catch (SQLException e) {
            e.printStackTrace();
            success=false;
        } finally {
            try {
                if(null!=pstmt)pstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("success",success);
        jsonObject.put("mapguid",mapguid);
        return jsonObject.toString();
    }

    public String setMapResult(String mapguid){
        //String mapguid=genString();
        String result=(String)sendQuery(mapguid).get("number");
        boolean success=true;
        if("1".equals(result)){   //查询定位结果,成功则保存成功结果
            Connection conn=JdbcFactory.getConn("'sqlite'");
            PreparedStatement pstmt=null;
            try {
                pstmt=conn.prepareStatement("update business set localtionresult=? where  mapguid=?");
                pstmt.setString(1,result);
                pstmt.setString(2,mapguid);
                pstmt.execute();
            } catch (SQLException e) {
                e.printStackTrace();
                success=false;
            } finally {
                try {
                    if(null!=pstmt)pstmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }else{
            success=false;
        }
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("success",success);
        return jsonObject.toString();
    }

    public static void main(String[] args) {
        LocationMapGuid map=new LocationMapGuid();
        System.out.println(map.setMapResult(""));
    }

    private JSONObject sendQuery(String mapguid){
        JSONObject jsonObject=new JSONObject();
        try {
            URL url = new URL("http://www.tianditu.com/wfssearch.shtml");
            url = new URL("http://localhost:80/geoserver/wfs");
            //url = new URL("http://192.168.2.141:8082/geoserver/wfs");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestProperty("Content-Type", "text/xml; charset=utf-8");   //附加上去的
            con.setDoOutput(true);
            con.setRequestMethod("POST");
            OutputStream out = con.getOutputStream();

            String strQuest = "<wfs:GetFeature service=\"WFS\" version=\"1.1.0\"" +
                    "  outputFormat=\"json\"" +
                    "  xmlns:topp=\"http://www.openplans.org/topp\"" +
                    "  xmlns:wfs=\"http://www.opengis.net/wfs\"" +
                    "  xmlns:ogc=\"http://www.opengis.net/ogc\"" +
                    "  xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"" +
                    "  xsi:schemaLocation=\"http://www.opengis.net/wfs" +
                    "                      http://schemas.opengis.net/wfs/1.1.0/wfs.xsd\">" +
                    "  <wfs:Query typeName=\"topp:states\">" +
                    "    <ogc:Filter>" +
                    "       <ogc:FeatureId fid=\"states.3\"/>" +
                    "    </ogc:Filter>" +
                    "    </wfs:Query>" +
                    "</wfs:GetFeature>";
            String strQuest22=
                    "<wfs:GetFeature service=\"WFS\" version=\"1.1.0\"" +
                    "  outputFormat=\"json\"" +
                    "  xmlns:tzdata=\"http://tzdata/\"" +
                    "  xmlns:wfs=\"http://www.opengis.net/wfs\"" +
                    "  xmlns:ogc=\"http://www.opengis.net/ogc\"" +
                    "  xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"" +
                    "  xsi:schemaLocation=\"http://www.opengis.net/wfs" +
                    "                      http://schemas.opengis.net/wfs/1.1.0/wfs.xsd\">" +
                    "  <wfs:Query typeName=\"tzdata:STL_DB\">" +
                    "    <ogc:Filter>" +
                    "      <ogc:PropertyIsEqualTo>" +
                    "      <ogc:PropertyName>tzdata:workid</ogc:PropertyName>" +
                    "      <ogc:Literal>"+mapguid+"</ogc:Literal>" +
                    "      </ogc:PropertyIsEqualTo>       " +
                    "    </ogc:Filter>" +
                    "    </wfs:Query>" +
                    "</wfs:GetFeature>";

            //strQuest=strQuest22;
            out.write(strQuest.getBytes());
            out.close();
            StringBuffer jsontext=new StringBuffer();
            BufferedReader br = new BufferedReader(new InputStreamReader(con
                    .getInputStream()));
            String line = "";
            for (line = br.readLine(); line != null; line = br.readLine()) {
                System.out.println(line);
                jsontext.append(line);
            }
            jsonObject=JSONObject.fromObject(jsontext.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}
