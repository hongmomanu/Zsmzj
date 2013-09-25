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
    if(request.getParameter("businesstype")==null){
       out.print("缺少参数businesstype");
    }
    else{
        BusinessProcessControl bp=new BusinessProcessControl();

        String type=request.getParameter("businesstype");
        String bgmonth=request.getParameter("bgmonth");
        String keyword=request.getParameter("keyword");
        out.print(bp.getGrantMoneyBytype(type,bgmonth,keyword));
    }
%>