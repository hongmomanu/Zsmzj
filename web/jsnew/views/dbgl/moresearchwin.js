define(function () {
    return {
        grantmoney:function(btn){
            /*var form=$('#addnewgrantwin').find('.easyui-tabs').tabs('getSelected').find('form');
            var isnew=$(btn).linkbutton('options').isnew;
            require(['commonfuncs/AjaxForm'],function(ajax){
                var onsubmit=function(param){
                    if(form.attr('type')!='year'){
                        param.grantdate= $.formatDateTime('yy-mm-dd',new Date());
                    }
                    var businesstype=$('#tabs').tabs('getSelected').panel('options').businesstype;
                    param.isnew=isnew;
                    param.userid=userid;
                    param.businesstype=businesstype;
                    param.divisionpath=divisionpath;


                };
                var success=function(){
                    $.messager.alert('消息提示','资金发放成功');
                    $('#addnewgrantwin').dialog('close');
                    $('#businessgrid').datagrid('reload');
                };
                ajax.ajaxform(form,'ajax/grantmoneyform.jsp',onsubmit,success);
            });*/
        },
        render:function(searchtype){
            var me=this;
            var moresearchwindiv=$('#moresearchwin');
            if(moresearchwindiv.length>0){
                moresearchwindiv.dialog('open');
            }
            else{
                require(['text!views/dbgl/moresearchwin.htm'],function(windiv){
                    $('body').append(windiv);

                    $('#moresearchwin').dialog({
                        title: '高级搜索',
                        width: 450,
                        height: 250,
                        //fit:true,

                        closed: false,
                        cache: false,
                        onOpen:function(){

                        },
                        buttons:[{
                            text:'检索',
                            disabled:true,
                            handler:function(){
                                me.grantmoney(this);

                            }
                        },{
                            text:'新增',
                            handler:function(){
                                me.grantmoney(this);
                            }
                        },{
                            text:'取消',
                            handler:function(){
                                $('#moresearchwin').dialog('close');
                            }
                        }],
                        maximized:false,
                        modal:true
                    });
                    $.parser.parse($('#moresearchwin').parent());

                    $('#moresearchwin .moresearchcomb').combobox({
                        onShowPanel: function () {
                            var mysearchtype = $(this).attr('searchtype');
                            mysearchtype=mysearchtype?mysearchtype:searchtype;
                            if(mysearchtype=='compare')mysearchtype=searchtype
                                + $('#moresearchwin .name').combobox('getValue');
                            var url = 'ajax/getenumbytype.jsp?type=' + mysearchtype;
                            $(this).combobox('reload', url);
                        },
                        onSelect:function(record){
                            if(!$(this).attr('searchtype')){
                                $('#moresearchwin .compare').combobox('enable');
                            }
                        }

                    });

                    $('#moresearchwin .name').combobox({
                        valueField: 'value',
                        url:'ajax/getenumbytype.jsp?type='+searchtype,
                        width:60,
                        textField: 'label'
                    });

                });

            }


        }

    }


})