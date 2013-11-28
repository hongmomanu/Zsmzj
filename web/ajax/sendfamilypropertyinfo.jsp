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
        String tipName="事件名称-";
        String eventName=request.getParameter("eventName");
        if(null==eventName){
            out.print("要指明事件名称");
            return;
        }
        Map<String,Object> params=new HashMap<String,Object>();
        ProperCheckControl propchk=new ProperCheckControl();

        if("registerfamilyinfo".equals(eventName)){
            params.put("fm01",request.getParameter("fm01"));
            params.put("isprocess",request.getParameter("isprocess"));
            out.print(propchk.saveFamliyPropertyInfo(params));
        }else if("getfamilypropertyinfo".equals(eventName)){
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                  String name=(String)e.nextElement();
                  paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.getFamilyPropertyInfo(paraMap));
        }else if("getfamilypropertyinfobycheckrole".equals(eventName)){
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.getFamilyPropertyInfoByCheckRole(paraMap));
        }else if("checkpropertyitem".equals(eventName)){
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.doCheckItem(paraMap));
        }else if("getperopertycheckitemdetailbyowerid".equals(eventName)){
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.getPropertyCheckItemDatilByOwerId(paraMap));
        }else if("changebusinessprocessstatus".equals(eventName)){   //提交申请
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.changeBusinessStatus(paraMap));
        }
        else if("processcheck".equals(eventName)){      //processcheck   审核审批
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.processCheck(paraMap));
        }


         //无相应处理时的默认操作提示
        else{
            out.print("{success:'false',message:'无对应的操作'}");
        }
%>