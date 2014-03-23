<%@ page import="Zsmzj.business.control.LocationMapGuid" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Enumeration" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    if(request.getParameter("businessid")==null||request.getParameter("mapguid")==null){
        out.print("缺少参数businessid,mapguid");
    }else{
        Integer businessid=Integer.parseInt(request.getParameter("businessid"));
        LocationMapGuid locationMapGuid=new LocationMapGuid();
        String mapguid=locationMapGuid.setMapGuidByBusinessId(businessid,request.getParameter("mapguid"));
        out.print(mapguid);
    }

%>