define(function () {

    function render(parameters) {
        $('#userpaneltb .keyword').bind('click keypress',function(e){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if($(this).attr("type")==='keyword'&&keycode!=13)return;

                $('#usermanagerpanel').datagrid('load',{keyword:$('#userpaneltb .keyword').val()});
            }
        );
        $('#usermanagerpanel').datagrid({
            singleSelect: true,
            collapsible: true,
            rownumbers: true,
            method:'post',
            url:'ajax/getusers.jsp',
            remoteSort: false,
            sortName:'time',
            sortOrder:'desc',
            fit:true,
            toolbar:'#userpaneltb',
            pagination:true,
            pageSize:10,
            onBeforeLoad: function (params) {
                var options = $('#usermanagerpanel').datagrid('options');
                params.start = (options.pageNumber - 1) * options.pageSize;
                params.limit = options.pageSize;
                params.totalname = "total";
                params.rowsname = "rows";
            },
            onClickRow:function(index, rowData){
                $('#userinfoform').form('load',rowData);
                $('#userformbtns .save,#userformbtns .del').linkbutton('enable');
                $('#usermanagerlayout').layout('expand','east');
            }

        });
        $('#userformbtns .save').click(function(){
            $.messager.confirm('确定要修改用户么?', '你正在试图修改用户?', function(r){
                    if (r){
                        require(['commonfuncs/md5','jqueryplugin/easyui-form','commonfuncs/AjaxForm']
                            ,function(md5,easyform,ajaxfrom){


                            var params=$('#userinfoform').form("serialize");
                            params.password=CryptoJS.enc.Base64.stringify(CryptoJS.MD5(params.password));
                            params.iscommon=false;
                            var success=function(){
                                $.messager.alert('操作成功','修改用户成功!');
                                $('#usermanagerpanel').datagrid('reload');
                            };
                            var errorfunc=function(){
                                $.messager.alert('操作失败','修改用户失败!');
                            }
                            ajaxfrom.ajaxsend('post','json','ajax/edituser.jsp',params,success,null,errorfunc)

                        });
                    }
                }
            );

        });

        $('#userpaneltb .newuser').click(function(){
            if($('#newuserwin').length>0){
                $('#newuserwin').dialog('open');
            }else{
                require(['text!views/manager/newuserwin.htm','views/manager/newuserwin'],
                    function(div,newuserjs){
                        $('body').append(div);
                        newuserjs.render();
                    });
            }

        });

    }

    return {
        render: render

    };
});