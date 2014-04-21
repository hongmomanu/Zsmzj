<%@ page import="Zsmzj.business.control.CheckApprovalFail" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    if(request.getParameter("start")==null){
        out.print("缺少分页参数start");
    }else if(request.getParameter("start")==null){
        out.print("缺少分页参数limit");
    }
    else{
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        String keyword=request.getParameter("keyword");
        String totalname = request.getParameter("totalname");
        String rowsname = request.getParameter("rowsname");

        CheckApprovalFail check=new CheckApprovalFail();
        out.print(check.getUnCheckedApprovalFail(limit,start));
    }
%>