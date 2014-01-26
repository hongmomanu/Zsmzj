define(function () {

    function render(parameters) {

        $('#divisionmanagerpanel').treegrid({
            rownumbers: true,
            method:'post',
            url:'ajax/gettreedivision.jsp?onlychild=true',
            treeField:'text',
            idField:'id',
            onBeforeLoad: function (row,params) {
                if(!row)params.node=-1;
                else params.node=row.id;

            },
            onLoadSuccess : function(row,data) {
                require(['commonfuncs/treegridtip'],function(){
                    $("#divisionmanagerpanel").treegrid('tooltip',['text']);
                });

                //为每个节点增加描述

            },
            onClickRow:function(rowData){
                rowData.divisionname=rowData.text;
                rowData.divisionid=rowData.id;

                $('#divisioninfoform').form('load',rowData);

                $('#divisionformbtns .save,#divisionformbtns .del').linkbutton('enable');
                $('#divisionmanagerlayout').layout('expand','east');
            }

        });

        $('#divisionformbtns .del').click(function(){
            $.messager.confirm('确定要删除行政区划么?', '你正在试图删除行政区划?', function(r){
                if (r){
                    require(['jqueryplugin/easyui-form','commonfuncs/AjaxForm']
                        ,function(easyuifrom,ajaxfrom){
                            var params=$('#divisioninfoform').form("serialize");
                            var success=function(){
                                $.messager.alert('操作成功','删除行政区划成功!');
                                $('#divisionmanagerpanel').datagrid('reload');
                            };
                            var errorfunc=function(){
                                $.messager.alert('操作失败','删除行政区划失败!');
                            }
                            ajaxfrom.ajaxsend('post','json','ajax/deldivision.jsp',params,success,null,errorfunc)

                        });
                }
            });
        });
        $('#divisionformbtns .save').click(function(){
            $.messager.confirm('确定要修改角色配置么?', '你正在试图角色配置?', function(r){
                    if (r){
                        require(['jqueryplugin/easyui-form','commonfuncs/AjaxForm']
                            ,function(easyform,ajaxfrom){


                             var params=$('#divisioninfoform').form("serialize");
;



                            var success=function(){
                                $.messager.alert('操作成功','修改行政区划成功!');
                                //console.log(params.divisionid);
                                //var parentid=$('#divisionmanagerpanel').treegrid('getParent',params.divisionid) ;
                                //console.log(parentid);
                                $('#divisionmanagerpanel').treegrid('reload',params.parentid);
                            };
                            var errorfunc=function(){
                                $.messager.alert('操作失败','修改行政区划失败!');
                            };
                            ajaxfrom.ajaxsend('post','json','ajax/editdivision.jsp',params,success,null,errorfunc);
                        });
                    }
                }
            );

        });

        $('#divisionpaneltb .newdivision').click(function(){
            if($('#newdivisionwin').length>0){
                $('#newdivisionwin').dialog('open');
            }else{
                require(['text!views/manager/newdivisionwin.htm','views/manager/newdivisionwin'],
                    function(div,newdivisionjs){
                        $('body').append(div);
                        newdivisionjs.render();
                    });
            }

        });
        $('#divisioninfoform .resetchapter').click(function(){
            if($('#newchapterwin').length>0){
                $('#newchapterwin').dialog('open');
            }else{
                require(['text!views/manager/newchapter.htm','views/manager/newchapter'],
                    function(div,newchapterjs){
                        $('body').append(div);
                        newchapterjs.render();
                    });
            }

        });

    }

    return {
        render: render

    };
});