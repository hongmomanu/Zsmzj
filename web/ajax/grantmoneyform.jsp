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
    if(request.getParameter("userid")==null){
       out.print("缺少参数userid");
    }else if(request.getParameter("businesstype")==null){
        out.print("缺少参数businesstype");
    }
    else{
        int userid=Integer.parseInt(request.getParameter("userid"));
        String bgdate=request.getParameter("bgdate");
        String eddate=request.getParameter("eddate");
        String grantdate=request.getParameter("grantdate");
        String businesstype=request.getParameter("businesstype");
        BusinessProcessControl pc=new BusinessProcessControl();
        out.print(pc.grantmoneybytype(userid,bgdate,eddate,grantdate,businesstype));
    }
%>