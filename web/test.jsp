<%-- Created by IntelliJ IDEA. --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
      <script type="text/javascript" src="http://localhost/ext-4.2.1/examples/shared/include-ext.js"></script>
      <script type="text/javascript" src="http://localhost/ext-4.2.1/examples/shared/options-toolbar.js"></script>

      <script>
      Ext.onReady(function() {
          var tiger = Ext.create('Ext.draw.Component', {
              width: 153,
              height: 306,
              viewBox:true,
              /*cls: 'cursor-dragme',
              draggable: {
                  constrain: true,
                  constrainTo: Ext.getBody()
              },*/
              floating: {
                  shadow: false
              },
              layout: {
                  type: 'vbox'
              },
              renderTo: Ext.getBody(),
              items: [
                  {
                      type: "image",
                      viewBox:true,
                      src: "img/2013061301494220876442.gif",
                      width: 153,
                      height: 153
                  },
                  {
                      type: "ellipse",
                      radiusX: 100,
                      radiusY: 50,
                      stroke: 'red',
                      x: 100,
                      y: 100/*,
                      fill: 'red'
*/
                  },
                  {
                        type: 'circle',
                        fill: '#79BB3F',
                        radius: 20,
                        x: 10,
                        y: 10
                  },
                  {
                      type: 'circle',
                      fill: '#79BB3F',
                      radius: 20,
                      x: 40,
                      y: 40
                  },

                  {
                      type: "text",
                      text: '测试',
                      x:70,
                      y:70

                  }
                  , {
                      type: "path",
                      path: "M100 0  L200 0 Z",    //路径      L150 50
                      "stroke-width": "1",
                      stroke: "#000",
                      fill: "blue"
                  }

              ]
          });
      });

      </script>
    <title></title>
  </head>
  <body>
     <div>
         <textarea style="width: 100%;height: 500" >
             /home/jack/soft/apache-tomcat-7.0.34/bin/catalina.sh run
             Using CATALINA_BASE:   /home/jack/.IntelliJIdea12/system/tomcat/Unnamed_Zsmzj
             Using CATALINA_HOME:   /home/jack/soft/apache-tomcat-7.0.34
             Using CATALINA_TMPDIR: /home/jack/soft/apache-tomcat-7.0.34/temp
             Using JRE_HOME:        /home/jack/soft/jdk1.6.0_38
             Using CLASSPATH:       /home/jack/soft/apache-tomcat-7.0.34/bin/bootstrap.jar:/home/jack/soft/apache-tomcat-7.0.34/bin/tomcat-juli.jar
             [2013-08-07 10:12:38,057] Artifact web:war exploded: Server is not connected. Deploy is not available.
             2013-8-7 10:12:39 org.apache.catalina.core.AprLifecycleListener init
             信息: The APR based Apache Tomcat Native library which allows optimal performance in production environments was not found on the java.library.path: /home/jack/soft/jdk1.6.0_38/jre/lib/amd64/server:/home/jack/soft/jdk1.6.0_38/jre/lib/amd64:/home/jack/soft/jdk1.6.0_38/jre/../lib/amd64:/home/jack/soft/idea-IU-129.354/bin:/opt/instantclient:/usr/java/packages/lib/amd64:/usr/lib64:/lib64:/lib:/usr/lib
             2013-8-7 10:12:39 org.apache.catalina.startup.SetAllPropertiesRule begin
             警告: [SetAllPropertiesRule]{Server/Service/Connector} Setting property 'minProcessors' to '500' did not find a matching property.
             2013-8-7 10:12:39 org.apache.catalina.startup.SetAllPropertiesRule begin
             警告: [SetAllPropertiesRule]{Server/Service/Connector} Setting property 'maxProcessors' to '1500' did not find a matching property.
             2013-8-7 10:12:40 org.apache.coyote.AbstractProtocol init
             信息: Initializing ProtocolHandler ["http-nio-8080"]
             2013-8-7 10:12:40 org.apache.tomcat.util.net.NioSelectorPool getSharedSelector
             信息: Using a shared selector for servlet write/read
             2013-8-7 10:12:40 org.apache.coyote.AbstractProtocol init
             信息: Initializing ProtocolHandler ["ajp-bio-8009"]
             2013-8-7 10:12:40 org.apache.catalina.startup.Catalina load
             信息: Initialization processed in 1224 ms
             2013-8-7 10:12:40 org.apache.catalina.core.StandardService startInternal
             信息: Starting service Catalina
             2013-8-7 10:12:40 org.apache.catalina.core.StandardEngine startInternal
             信息: Starting Servlet Engine: Apache Tomcat/7.0.34
             2013-8-7 10:12:40 org.apache.coyote.AbstractProtocol start
             信息: Starting ProtocolHandler ["http-nio-8080"]
             2013-8-7 10:12:40 org.apache.coyote.AbstractProtocol start
             信息: Starting ProtocolHandler ["ajp-bio-8009"]
             2013-8-7 10:12:40 org.apache.catalina.startup.Catalina start
             信息: Server startup in 65 ms
             2013-8-7 10:12:50 org.apache.catalina.startup.HostConfig deployDirectory
             信息: Deploying web application directory /home/jack/soft/apache-tomcat-7.0.34/webapps/manager
             2013-8-7 10:12:51 org.apache.catalina.util.SessionIdGenerator createSecureRandom
             信息: Creation of SecureRandom instance for session ID generation using [SHA1PRNG] took [419] milliseconds.
             Connected to server
             [2013-08-07 10:13:07,725] Artifact web:war exploded: Artifact is being deployed, please wait...
             [2013-08-07 10:13:07,897] Artifact web:war exploded: Artifact is deployed successfully
             [2013-08-07 10:13:43,426] Artifact web:war exploded: Artifact is being deployed, please wait...
             [2013-08-07 10:13:44,504] Artifact web:war exploded: Artifact is deployed successfully
             [2013-08-07 10:14:28,785] Artifact web:war exploded: Artifact is being deployed, please wait...
             [2013-08-07 10:14:29,822] Artifact web:war exploded: Artifact is deployed successfully
             [2013-08-07 10:15:00,884] Artifact web:war exploded: Artifact is being deployed, please wait...
             [2013-08-07 10:15:01,944] Artifact web:war exploded: Artifact is deployed successfully
             [2013-08-07 10:19:12,690] Artifact web:war exploded: Artifact is deployed successfully
             [2013-08-07 10:19:34,590] Artifact web:war exploded: Artifact is deployed successfully
             [2013-08-07 10:19:47,371] Artifact web:war exploded: Artifact is being deployed, please wait...
             [2013-08-07 10:19:48,381] Artifact web:war exploded: Artifact is deployed successfully
             [2013-08-07 10:19:55,591] Artifact web:war exploded: Artifact is deployed successfully

         </textarea>

     </div>
  </body>
</html>