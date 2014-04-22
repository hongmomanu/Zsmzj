<%@ page import="Zsmzj.manager.usermanager.business.GetSingleplace" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 14-4-21
  Time: 下午4:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>

<%
    String type=request.getParameter("type");
    GetSingleplace gs = new GetSingleplace();
    out.print(gs.getPlace(type));
%>