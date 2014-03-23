<%@ page import="Zsmzj.business.control.LocationMapGuid" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Enumeration" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    if(request.getParameter("mapguid")==null){
        out.print("缺少参数mapguid");
    }else{
        LocationMapGuid locationMapGuid=new LocationMapGuid();
        String message=locationMapGuid.setMapResult(request.getParameter("mapguid").toString());
        out.print(message);
    }

%>