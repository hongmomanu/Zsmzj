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
    if(request.getParameter("limit")==null){
       out.print("缺少参数limit");
    }if(request.getParameter("start")==null){
        out.print("缺少参数start");
    }
    else{
        BusinessProcessControl bp=new BusinessProcessControl();
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        String keyword=request.getParameter("keyword");
        String type=request.getParameter("type");

        out.print(bp.getFamilyInfoList(start,limit,keyword,type));
    }
%>