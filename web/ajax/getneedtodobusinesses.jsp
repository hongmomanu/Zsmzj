<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.usermanager.business.RoleControl" %>
<%@ page import="Zsmzj.business.control.BusinessProcessControl" %>
<%@ page import="java.util.Arrays" %>
<%@ page import="net.sf.json.JSONArray" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("limit")==null){
       out.print("缺少参数limit");
    }else if(request.getParameter("start")==null){
        out.print("缺少参数start");
    }
    else{
        BusinessProcessControl bp=new BusinessProcessControl();
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        String keyword=request.getParameter("keyword");
        String totalname=request.getParameter("totalname");
        String rowsname=request.getParameter("rowsname");
        String type=request.getParameter("type");
        String bgdate=request.getParameter("bgdate");
        String eddate=request.getParameter("eddate");
        String businesstype=request.getParameter("businesstype");
        String divisionpath=request.getParameter("divisionpath");
        boolean ispublicinfo=request.getParameter("ispublicinfo")!=null?Boolean.parseBoolean(request.getParameter("ispublicinfo")):false;

        String[] name=request.getParameterValues("name")!=null?
                request.getParameterValues("name"):request.getParameterValues("name[]");
        String[] compare=request.getParameterValues("compare")!=null?
                request.getParameterValues("compare"):request.getParameterValues("compare[]");
        String[] value=request.getParameterValues("value")!=null?
                request.getParameterValues("value"):request.getParameterValues("value[]");
        String[] logic=request.getParameterValues("logic")!=null?
                request.getParameterValues("logic"):request.getParameterValues("logic[]");
        name=name==null?new String[0]:(name.length==1&&name[0].indexOf("]")>0? Arrays.copyOf(JSONArray.fromObject(name[0]).toArray(), JSONArray.fromObject(name[0]).toArray().length, String[].class):name);
        compare=compare==null?new String[0]:(compare.length==1&&compare[0].indexOf("]")>0?Arrays.copyOf(JSONArray.fromObject(compare[0]).toArray(), JSONArray.fromObject(compare[0]).toArray().length, String[].class):compare);
        value=value==null?new String[0]:(value.length==1&&value[0].indexOf(']')>0?Arrays.copyOf(JSONArray.fromObject(value[0]).toArray(), JSONArray.fromObject(value[0]).toArray().length, String[].class):value);
        logic=logic==null?new String[0]:(logic.length==1&&logic[0].indexOf(']')>0?Arrays.copyOf(JSONArray.fromObject(logic[0]).toArray(), JSONArray.fromObject(logic[0]).toArray().length, String[].class):logic);


        String st=request.getParameter("statusType");


        out.print(bp.getNeedTodoBusinessList(start,limit,keyword,type,businesstype,ispublicinfo,bgdate,eddate,divisionpath,totalname,rowsname,st,name,compare,value,logic));
    }
    //out.print("ok");
%>