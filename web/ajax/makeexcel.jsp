<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.conmmon.ExcelHelper" %>
<%@ page import="Zsmzj.conmmon.Config" %>
<%@ page import="Zsmzj.conmmon.StringHelper" %>
<%@ page import="java.util.Map" %>
<%@ page import="net.sf.json.JSONObject" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("headers")==null){
       out.print("{sucess:false,msg:\"缺少参数headers\"}");
    }
    else if(request.getParameter("rows")==null){
        out.print("{sucess:false,msg:\"缺少参数rows\"}");
    }
    else if(request.getParameter("sum")==null){
        out.print("{sucess:false,msg:\"缺少参数sum\"}");
    }
    else{

        String headers=request.getParameter("headers");
        String rows=request.getParameter("rows");
        String sum=request.getParameter("sum");
        ServletContext context = request.getServletContext();
        Config dbconfig = Config.getConfig("config.properties");
        String filedir = dbconfig.getValue("tempdirname");
        String filepath=context.getRealPath(filedir);
        String savename= StringHelper.getTimeStr()+".xls";
        Map<String,Object> map=ExcelHelper.writeExcel(filepath +"/"+ savename,headers,rows,sum);
        //result.put("filepath",filedir+"/"+result.get("filepath"));
        map.put("path",filedir+"/"+savename);
        out.print(JSONObject.fromObject(map).toString());
        //out.print("ok");
    }
%>