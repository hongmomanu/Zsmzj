define(function () {
    return {
        submitnew:function(btn){
            var form=$('#addnewmedicalwin').find('form');

            require(['commonfuncs/AjaxForm'],function(ajax){
                var onsubmit=function(param){


                    param.tablename="medicalstandard";

                };
                var success=function(){
                    $.messager.alert('消息提示','资金发放成功');
                    $('#addnewmedicalwin').dialog('close');
                    $('#businessgrid').datagrid('reload');
                };
                ajax.ajaxform(form,'ajax/sendformcommon.jsp',onsubmit,success);
            });
        },
        render:function(){
            var me=this;
            var addnewmedicalwindiv=$('#addnewmedicalwin');
            if(addnewmedicalwindiv.length>0){
                addnewmedicalwindiv.dialog('open');
            }
            else{
                require(['text!views/medicalhelp/addnewmedicalwin.htm'],function(windiv){
                    $('body').append(windiv);

                    $('#addnewmedicalwin').dialog({
                        title: '新增标准',
                        width: 450,
                        height: 370,
                        //fit:true,

                        closed: false,
                        cache: false,
                        onOpen:function(){

                        },
                        buttons:[{
                            text:'提交',
                            id:'newstaticsubmit',
                            disabled:true,
                            handler:function(){
                                me.submitnew(this);
                            }
                        },{
                            text:'取消',
                            handler:function(){
                                $('#addnewmedicalwin').dialog('close');
                            }
                        }],
                        maximized:false,
                        modal:true
                    });
                    $.parser.parse($('#addnewmedicalwin').parent());
                    var divitiontree=$('#addnewmedicalwin .easyui-combotree');
                    divitiontree.combotree({
                        url:'ajax/gettreedivision.jsp?onlychild=true&node=-1',
                        method: 'get',
                        onLoadSuccess:function(){
                            /*if(!this.firstloaded){
                             divitiontree.combotree('setValue', divisionpath);
                             this.firstloaded=true;
                             }*/
                        },
                        onBeforeExpand: function (node) {
                            divitiontree.combotree("tree").tree("options").url
                                = "ajax/gettreedivision.jsp?onlychild=true&node=" + node.id;
                        },
                        onHidePanel: function () {
                            divitiontree.combotree('setValue',
                                divitiontree.combotree('tree').tree('getSelected').id);
                        }
                    });

                    $('.lazy-combobox').combobox({
                        onShowPanel: function () {
                            var searchtype = $(this).attr('searchtype');
                            var url = 'ajax/getenumbytype.jsp?type=' + searchtype;
                            $(this).combobox('reload', url);
                        }

                    });

                    $('#addnewmedicalwin input').on('change',function(){
                        var form=$('#addnewmedicalwin form');
                        if(form.form('validate')){
                            $('#newstaticsubmit').linkbutton('enable');
                        }
                        else{
                            $('#newstaticsubmit').linkbutton('disable');
                        }
                    });



                });

            }


        }

    }


})