define(function(){
    var pagename=[
        {name:'主页',page:'main'},
        /*{name:'欢迎',page:'greet'},
        {name:'待办',page:'todolist'},
        {name:'公告',page:'notice'},
        {name:'下载',page:'filedownload'}*/
    ]
    var pagepath=(function(){
        var arr=[];
        for(var i in pagename){
            arr.push('text!views/homepage/'+pagename[i]['page']+'.htm')
        }
        return arr;
    })()
    var doChecked=function(dg,id,f){
        $.ajax({
            url:'ajax/setCheckedApprovalFail.jsp',
            data:{id:id},
            type:'post',
            success:function(){
               dg.datagrid('reload');
               if(f){
                   f();
               }
            }
        })
    }
    var getCount=function(){
        require(['commonfuncs/UpdateItemNum','commonfuncs/AjaxForm'],function(updateitem,ajaxform){
            var params = {
                roleid:roleid,
                userid:userid,
                divisionpath:divisionpath,
                type:'count'
            };
            var successFunc = function(res){
                var count=res.count;
                $('#homegreetcount').text(count).click(function(){
                    $('#domneedtodocount').trigger('click');
                });
                updateitem.updateitemnum($('#domneedtodocount'),count,"(",")");
            };

            ajaxform.ajaxsend("post","json","ajax/getneedtodos.jsp",params,successFunc,null);

        })
    }
    var f=function(s){
        require(pagepath,function(){
            for(var i=0;i<arguments.length;i++){
                $('#homepage').append(arguments[i]);
            }

            $('#hometodolist').datagrid({
                title:'未读消息',
                height:250,
                url:'ajax/getUnCheckedApprovalFail.jsp',
                queryParams: {
                    start: 0,
                    limit: 5,
                    userid:userid
                },
                fitColumns:true,
                onLoadSuccess:function(data){
                    var $table=$(this);
                    var checkedbtns=$('#tabs [action=checked]');
                    var owernames=$('#tabs [action=owername]');
                    var rows=data.rows;
                    for( var i in rows){
                        (function(index){
                           $(checkedbtns[index]).bind('click',function(){
                               doChecked($table,rows[index].businessid)
                           })
                        })(i);

                        (function(index){
                            $(owernames[index]).bind('click',function(){
                                var clickitem=$(this).attr('action','appformsubmit_alter');
                                var record=rows[index];
                                doChecked($table,rows[index].businessid,function(){
                                    require(['commonfuncs/ButtonsEvent'],function(ButtonsEvent){
                                        var data={record:record};
                                        ButtonsEvent.approvl_btns(clickitem,data);
                                    });
                                })
                            })
                        })(i);
                    }
                }
            }).closest('.panel').find('div.panel-tool')
                .append('<span  class="btn1 pbtn1" opt="refresh">刷新</span>')
                .find('[opt=refresh]').click(function(){
                    $('#hometodolist').datagrid('reload');// getCount();
                })
                .end()
                .find('[opt=more]').click(function(){
                    alert("more")
                })
            getCount();
            $('div[name=homegreetname]').text(displayname)
            $('span[name=homegreetname]').text(divisionpath)

            $('#homenotice').datagrid({
                title:'通知公告',
                fitColumns:true,
                url:'datagrid_data1.json',
                columns:[[
                    {field:'noteice',align:'center',width:100,fixed:false}
                ]]
            });

            $('#homefiledownload').datagrid({
                title:'文件下载',
                fitColumns:true,
                url:'datagrid_data1.json',
                columns:[[
                    {field:'filedownload',align:'center',width:100,fixed:false}
                ]]
            });
            $(window).resize(function(){
                //$('#hometodolist').datagrid('resize')
                $('#homenotice').datagrid('resize')
                $('#homefiledownload').datagrid('resize')
            })

        })
    }
    return {render:f}
})