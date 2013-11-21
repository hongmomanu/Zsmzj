<%@ page import="Zsmzj.propertycheck.control.ProperCheckControl" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Enumeration" %>
<%--
  Created by IntelliJ IDEA.
  User: weipan
  Date: 13-11-19
  Time: 下午14:32
  To change this template use File | Settings | File Templates.
--%>

<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(false&&request.getParameter("businesstype")==null){
       out.print("缺少参数businesstype");
    }
    else{

        Map<String,Object> params=new HashMap<String,Object>();

        /*
        *获取请求参数
        */
        Enumeration e  =(Enumeration) request.getParameterNames();
        while(e.hasMoreElements()){

            String  parName=(String)e.nextElement();

            params.put(parName,request.getParameter(parName));
        }

        ProperCheckControl propchk=new ProperCheckControl();
        out.print(propchk.getFamilyPropertyInfo());
    }
%>