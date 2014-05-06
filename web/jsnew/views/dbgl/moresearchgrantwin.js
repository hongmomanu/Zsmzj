define(function () {

    return {


        search:function(){
            /**多条件数组**/
             conditions=$('#moresearchwin form').form('serialize');
            var options=$('#businessgrid').datagrid('options');
            for(var item in conditions){
                conditions[item]=conditions[item].split(",");
                options.search_params[item]=options.search_params[item]?options.search_params[item].concat(conditions[item]):conditions[item];
            }
             //console.log(conditions);
            var names=conditions['name'];
            for(var i in names){   //表里没有age字段
                if(names[i]=='age'){
                    names[i]=" strftime('%Y','now')-strftime('%Y',birthday) "
                }
            }

            vv=conditions;
            var division = "";
            for(var p in conditions){
                if(p!='bgdate'&&p!='eddate'&&p!='name'&&p!='compare'&&p!='value'&&p!='logic'&&conditions[p]!="") {
                    console.log(p);
                    if(p!='shi'&&p!='qu'&&p!='jie'&&p!='cun'){
                        conditions['name'].push(p);
                        conditions['compare'].push('match');
                        conditions['value'].push(conditions[p][0]);
                        conditions['logic'].push('and');
                    }else{
                        division = division + conditions[p][0];
                    }

                }
            }
            if(division!=""){
                conditions['name'].push('division');
                conditions['compare'].push('match');
                conditions['value'].push(division);
                conditions['logic'].push('and');
            }

            //console.log(conditions['name'])
            $('#businessgrid').datagrid('load',conditions);

        },
        newcondition:function(btn){
            var me=this;
            require(['text!views/dbgl/moresearchwinitem.htm','jqueryplugin/easyui-form'],function(itemhtml){
                $('#moresearchwin table').append(itemhtml);
                var newitem=$('#moresearchwin table').find('tr').last();
                var searchitems=newitem.find('.searchitem');
                searchitems.bind('change',function () {
                    var isvalid=$('#moresearchwin form').form('validate');
                    if(isvalid){
                        $('#moresearchwin_search').linkbutton('enable');
                    }else{
                        $('#moresearchwin_search').linkbutton('disable');
                    }
                });
                $.parser.parse(newitem);

                newitem.find('.moresearchcomb').combobox({
                    onShowPanel: function () {
                        var mysearchtype = $(this).attr('searchtype');
                        mysearchtype=mysearchtype?mysearchtype:me.searchtype;
                        if(mysearchtype=='compare'){
                            var previtem=$(this).parent().prev().find('.moresearchcomb');
                            mysearchtype=me.searchtype
                                + previtem.combobox('getValue');
                        }
                        var url = 'ajax/getenumbytype.jsp?type=' + mysearchtype;
                        $(this).combobox('reload', url);
                    },
                    onSelect:function(record){
                        if(!$(this).attr('searchtype')){
                            var nextitem=$(this).parent().next().find('.moresearchcomb');
                            nextitem.combobox('enable');
                        };

                        var isvalid=$('#moresearchwin form').form('validate');
                        if(isvalid){
                            $('#moresearchwin_search').linkbutton('enable');
                        }else{
                            $('#moresearchwin_search').linkbutton('disable');
                        }
                    }


                });

                newitem.find('.name').combobox({
                    valueField: 'value',
                    url:'ajax/getenumbytype.jsp?type='+me.searchtype,
                    textField: 'label'
                });
                newitem.find('img').click(function(){
                    $(this).parent().parent().remove();
                    if($('#moresearchwin table').find('tr').length==1){
                        $('#moresearchwin_search').linkbutton('disable');
                    }
                });
            });
        },
        render:function(searchtype){
            var me=this;
            me.searchtype=searchtype;

            var moresearchwindiv=$('#moresearchwin');
            if(moresearchwindiv.length>0){
                moresearchwindiv.dialog('open');
            }
            else{
                require(['text!views/dbgl/moresearchgrantwin.htm'],function(windiv,itemhtml){

                    $('body').append(windiv);

                    $('#moresearchwin').dialog({
                        title: '高级搜索',
                        width: 550,
                        height: 410,

                        //fit:true,

                        closed: false,
                        cache: false,
                        onOpen:function(){

                        },
                        onClose:function(){
                            $('#moresearchwin').dialog('destroy');
                        },
                        buttons:[{
                            text:'检索',
                            id:'moresearchwin_search',
                            /*disabled:true,*/
                            handler:function(){
                                me.search();

                            }
                        },{
                            text:'新增',

                            handler:function(){
                                me.newcondition(this);
                            }
                        },{
                            text:'取消',
                            handler:function(){
                                $('#moresearchwin').dialog('close');
                                $('#moresearchwin').dialog('destroy');
                            }
                        }],
                        maximized:false,
                        modal:true
                    });
                    $.parser.parse($('#moresearchwin').parent());

                    me.newcondition(null);



                });

            }


        }





    }




})