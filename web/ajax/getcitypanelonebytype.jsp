<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.business.control.BusinessProcessControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("type")==null){
       out.print("缺少参数type");
    }/*if(request.getParameter("node")==null){
        out.print("缺少参数node");
    }*/
    else{
        BusinessProcessControl bp=new BusinessProcessControl();
        String type=request.getParameter("type");
        String divisionpath=request.getParameter("divisionpath");
        String businesstype=request.getParameter("businesstype");
        String bgmonth=request.getParameter("bgmonth");
        int divisionpid=0;//Integer.parseInt(request.getParameter("node"));

        boolean isdefault=false;
        if(0==divisionpid){
            Object obj=request.getSession().getAttribute("divisionid");
            if(null==obj){
                divisionpid=9999;
            }else{
                divisionpid=(Integer)obj;
                isdefault=true;
            }
        }
        boolean isonlychild=request.getParameter("isonlychild")==null?
                false:Boolean.parseBoolean(request.getParameter("isonlychild"));
        out.print(bp.getCityPaneloneBytype(type,bgmonth,divisionpid,businesstype,divisionpath,isonlychild,isdefault));
    }
%>