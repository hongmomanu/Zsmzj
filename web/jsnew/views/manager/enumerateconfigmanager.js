define(function () {

    function render(parameters) {
        $('#enumpaneltb .keyword').bind('click keypress',function(e){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if($(this).attr("type")==='keyword'&&keycode!=13)return;

                $('#enummanagerpanel').datagrid('load',{keyword:$('#enumpaneltb .keyword').val()});
            }
        );
        $('#enummanagerpanel').datagrid({
            singleSelect: true,
            collapsible: true,
            rownumbers: true,
            method:'post',
            url:'ajax/getEnums.jsp',
            remoteSort: false,

            fit:true,
            toolbar:'#enumpaneltb',
            pagination:true,
            pageSize:10,
            onBeforeLoad: function (params) {
                var options = $('#enummanagerpanel').datagrid('options');
                params.start = (options.pageNumber - 1) * options.pageSize;
                params.limit = options.pageSize;
                params.totalname = "total";
                params.rowsname = "rows";
            },
            onClickRow:function(index, rowData){
                $('#enuminfoform').form('load',rowData);
                $('#enumformbtns .save,#enumformbtns .del').linkbutton('enable');
                $('#enummanagerlayout').layout('expand','east');
            }

        });

        $('#enumformbtns .del').click(function(){
            $.messager.confirm('确定要删除功能么?', '你正在试图删除功能?', function(r){
                if (r){
                    require(['jqueryplugin/easyui-form','commonfuncs/AjaxForm']
                        ,function(easyuifrom,ajaxfrom){
                            var params=$('#enuminfoform').form("serialize");
                            var success=function(){
                                $.messager.alert('操作成功','删除功能成功!');
                                $('#enummanagerpanel').datagrid('reload');
                            };
                            var errorfunc=function(){
                                $.messager.alert('操作失败','删除功能失败!');
                            }
                            ajaxfrom.ajaxsend('post','json','ajax/delenum.jsp',params,success,null,errorfunc)

                        });
                }
            });
        });
        $('#enumformbtns .save').click(function(){
            $.messager.confirm('确定要修改功能么?', '你正在试图修改功能?', function(r){
                    if (r){
                        require(['jqueryplugin/easyui-form','commonfuncs/AjaxForm']
                            ,function(easyform,ajaxfrom){


                            var params=$('#enuminfoform').form("serialize");

                            var success=function(){
                                $.messager.alert('操作成功','修改功能成功!');
                                $('#enummanagerpanel').datagrid('reload');
                            };
                            var errorfunc=function(){
                                $.messager.alert('操作失败','修改功能失败!');
                            };
                            ajaxfrom.ajaxsend('post','json','ajax/updatecommonbyid.jsp',params,success,null,errorfunc);

                        });
                    }
                }
            );

        });

        $('#enumpaneltb .newenum').click(function(){
            if($('#newenumwin').length>0){
                $('#newenumwin').dialog('open');
            }else{
                require(['text!views/manager/newenumwin.htm','views/manager/newenumwin'],
                    function(div,newenumjs){
                        $('body').append(div);
                        newenumjs.render();
                    });
            }

        });

    }

    return {
        render: render

    };
});