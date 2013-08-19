<%@ page import="Zsmzj.listener.SessionListener" %>
<%-- Created by IntelliJ IDEA. --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    if(request.getSession().getAttribute("username")==null) {
        response.sendRedirect("login.jsp");
    }

%>
<html>
  <head>

      <script type="text/javascript" src="js/config.js">

      </script>
      <script type="text/javascript">
          /*session全局变量*/
          var onlinenums=<%= SessionListener.size()%>;
          var userid=<%=request.getSession().getAttribute("userid")%>;
          var roleid=<%=request.getSession().getAttribute("roleid")%>;

      </script>
      <script>
         /**加载ext**/
         /*document.write('<script type="text/javascript"  src="'+extLocation+
                 'examples/shared/include-ext.js"><\/script>');
         document.write('<script type="text/javascript"  src="'+extLocation+
                 'examples/shared/options-toolbar.js"><\/script>');*/
         document.write('<script type="text/javascript"  src="'+extLocation+
                 'ext-all.js"><\/script>');
         document.write('<link rel="stylesheet" type="text/css" href="'+extLocation+
                 'resources/ext-theme-neptune/ext-theme-neptune-all.css"><\/>');

      </script>

      <link rel="stylesheet" type="text/css" href="css/main.css" />
      <link rel="stylesheet" type="text/css" href="css/data-view.css" />
     <%-- 加载web应用层--%>

      <script type="text/javascript" src="js/app.js"></script>

    <title></title>
  </head>
  <body>
  </body>
</html>