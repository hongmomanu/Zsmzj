<%@ page import="Zsmzj.business.control.CheckApprovalFail" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    if(request.getParameter("id")==null){
        out.print("缺少参数id");
    }else{
        int id=Integer.parseInt(request.getParameter("id"));
        CheckApprovalFail check=new CheckApprovalFail();
        out.print(check.setCheckedApprovalFail(id));
    }
%>