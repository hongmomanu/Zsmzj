<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.business.control.BusinessProcessControl" %>
<%@ page import="java.util.Arrays" %>
<%@ page import="net.sf.json.JSONArray" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("limit")==null){
       out.print("缺少参数limit");
    }if(request.getParameter("start")==null){
        out.print("缺少参数start");
    }
    else{
        BusinessProcessControl bp=new BusinessProcessControl();
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        String bgdate=request.getParameter("bgdate");
        String eddate=request.getParameter("eddate");
        String keyword=request.getParameter("keyword");
        String type=request.getParameter("businesstype");
        String[] name=request.getParameterValues("name")!=null?
                request.getParameterValues("name"):request.getParameterValues("name[]");
        String[] compare=request.getParameterValues("compare")!=null?
                request.getParameterValues("compare"):request.getParameterValues("compare[]");
        String[] value=request.getParameterValues("value")!=null?
                request.getParameterValues("value"):request.getParameterValues("value[]");
        String[] logic=request.getParameterValues("logic")!=null?
                request.getParameterValues("logic"):request.getParameterValues("logic[]");

        name=name==null?new String[0]:(name.length==1? Arrays.copyOf(JSONArray.fromObject(name[0]).toArray(), JSONArray.fromObject(name[0]).toArray().length, String[].class):name);
        compare=compare==null?new String[0]:(compare.length==1?Arrays.copyOf(JSONArray.fromObject(compare[0]).toArray(), JSONArray.fromObject(compare[0]).toArray().length, String[].class):compare);
        value=value==null?new String[0]:(value.length==1?Arrays.copyOf(JSONArray.fromObject(value[0]).toArray(), JSONArray.fromObject(value[0]).toArray().length, String[].class):value);
        logic=logic==null?new String[0]:(logic.length==1?Arrays.copyOf(JSONArray.fromObject(logic[0]).toArray(), JSONArray.fromObject(logic[0]).toArray().length, String[].class):logic);



    String divisionpath=request.getParameter("divisionpath");
        String totalname=request.getParameter("totalname");
        String rowsname=request.getParameter("rowsname");

        out.print(bp.getFamilyInfoList(start,limit,keyword,type,name,compare,value,logic,bgdate,eddate,divisionpath,totalname,rowsname));
    }
%>