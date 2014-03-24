/**
 * Created by weipan on 14-03-20.
 */

define(function(){

    var generateMapGuid=function(){
        var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var len=62;
        var buf = "";
        for (var i = 0; i < 31; i++) {
            var num = Number((Math.random()*len).toFixed(0));
            if(i==4||i==9||i==16){
                buf+='-';
            }else{
                buf+=str.charAt(num);
            }
        }
         return 'zsmzj'+buf;
    }

    var goToLocation=function(row,clickitem){
        var baseUrl= 'http://172.25.102.101:8091/index.html?';
        var realaddress=row.realaddress;
        var mapguid=row.mapguid;
        var genMapGuid=generateMapGuid();
        if(!realaddress||(realaddress&&realaddress.length>0)){
            realaddress='无实际居住地';
        }
        if(!mapguid||(mapguid&&mapguid.length<10)){
            $(row).attr('mapguid',genMapGuid);
            $.ajax({
                url:'ajax/locationMapGuid.jsp',
                type:'post',
                data:{
                    businessid:row.businessid,
                    mapguid:genMapGuid
                },
                success:function(res){
                    var obj=eval('('+res+')');
                    if(obj.success){

                    }
                }
            })
        }else{
            genMapGuid=mapguid;
        }
        var obj={
            MAPGUID:genMapGuid,
            PLACECODE:23510,
            DISTRICT_ID:330921103,
            CQR:row.owername,//'苏乞儿',
            BIAOZHUNMINGCHENG:realaddress,  //realaddress  '同心路'
            DENGJIDANWEI:displayname,
            PLACETYPE:row.businesstype
        }
        var formreturnparam='formreturnparam='+
            JSON.stringify(obj).replace(/\"/g,'').replace(/\,/g,';').replace(/:/g,'|').replace(/\{/g,'').replace(/\}/g,'');
        window.open(baseUrl+formreturnparam,'','');





        //http://172.25.102.101:8091/index.html?
        // formreturnparam=MAPGUID|e1448f74-b8bb-4c71-9331iii-22ee3a6a57a2;PLACECODE|23510;DISTRICT_ID|330921103;
        // BIAOZHUNMINGCHENG|同心路;DENGJIDANWEI|岱山县地名办;PLACETYPE|街巷
    }
    var locationResultQuery=function(row,clickitem){
        var mapguid=row.mapguid;
        if(mapguid&&mapguid.trim().length!=0){
            $.ajax({
                url:'ajax/locationResultQuery.jsp',
                type:'post',
                data:{
                    mapguid:mapguid
                },
                success:function(res){
                    var obj=eval('('+res+')');
                    if(obj.success){
                        $.messager.alert('提示','定位已成功');
                    }else{
                        $.messager.alert('提示','定位失败或重新验证');
                    }

                }
            })
        }else{
            $.messager.alert('提示','请先定位再验证定位结果');
        }
    }
    var a={
        initbusinessgrid:function(type,businesstype,columns,customparamfunc){
            $('#businessgrid').datagrid(
                {
                    singleSelect: true,
                    collapsible: true,
                    rownumbers: true,
                    method:'post',
                    columns:columns,
                    remoteSort: false,
                    sortName:'time',
                    sortOrder:'desc',
                    fit:true,
                    toolbar:'#businesstb',
                    pagination:true,
                    pageSize:10,
                    rowStyler:function(index,row){
                        //return 'color: black; ';
                        if(index%2==1){
                            return 'background-color: #F4F4F4; ';
                        }
                        return '';
                    },
                    onBeforeLoad: function (params) {
                        var options = $('#businessgrid').datagrid('options');
                        params.businesstype = businesstype;
                        params.type=type;
                        params.divisionpath = divisionpath;
                        params.start = (options.pageNumber - 1) * options.pageSize;
                        params.limit = options.pageSize;
                        params.totalname = "total";
                        params.rowsname = "rows";
                        params.roleid = roleid;
                        params.userid = userid;
                        if(customparamfunc){
                            customparamfunc(params);
                        }

                    },
                    onLoadSuccess:function(data){
                        var locationbtns=$('#tabs .locationbtn');
                        var locationbrsbtns=$('#tabs .locationbrsbtn');
                        var locationyzbtns=$('#tabs .locationyzbtn');
                        var btns_arr=[locationbtns,locationbrsbtns];
                        require(['commonfuncs/LookupItemName'], function(LookupItemName){
                            var rows=data.rows;
                            for(var i=0;i<rows.length;i++){
                                for(var j=0;j<btns_arr.length;j++){
                                    if(btns_arr[j].length>0){
                                        var classname=$(btns_arr[j][i]).attr("class");
                                        $(btns_arr[j][i]).linkbutton({ iconCls: 'icon-' + classname });
                                        (function(index,cls){
                                            $(btns_arr[j][i]).click(function(){
                                                var clickitem=this;
                                                var record=rows[index];
                                                if("locationyzbtn"==cls){
                                                    locationResultQuery(record,clickitem);
                                                }else{
                                                    goToLocation(record,clickitem);
                                                }

                                            });
                                        })(i,classname);
                                        $(btns_arr[j][i]).show();
                                    }

                                }
                                if(!rows[i].mapguid){
                                    $(btns_arr[1][i]).linkbutton('disable');
                                }

                            }
                            $('#mainlayoutpanel').layout('resize');
                            //sendWfs();
                        });
                    }

                });


            var options=$('#businessgrid').datagrid('options');
            options.search_params={
                businesstype:businesstype,
                type:type,
                divisionpath:divisionpath
            };

            if(options.type==='month'){
                options.search_params.name=['time'];
                options.search_params.compare=['month'];
                options.search_params.value=[$('#businesstb .year').combobox('getValue')+"-"+
                    ($('#businesstb .month').combobox('getValue')<10?'0'+
                        $('#businesstb .month').combobox('getValue'):$('#businesstb .month').combobox('getValue'))];
                options.search_params.logic =['and'];
            }

            $('#businesstb .search,#businesstb .keyword').bind('click keypress',function(e){
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if($(this).attr("type")==='keyword'&&keycode!=13)return;
                var search_params={
                    bgdate:$('#businesstb .bgdate').length>0?$('#businesstb .bgdate').datebox('getValue'):null,
                    eddate:$('#businesstb .eddate').length>0?$('#businesstb .eddate').datebox('getValue'):null,
                    keyword:$('#businesstb .keyword').val()
                };
                $('#businessgrid').datagrid('load',search_params);
                for(var item in search_params){
                    var options=$('#businessgrid').datagrid('options');
                    options.search_params[item]=search_params[item];
                }


            });

            require(['commonfuncs/LookupItemName'],function(lookjs){
                var isfind=lookjs.lookup(processRoleBtn,
                    {name:"name",value:"资金发放"});
                if(isfind){
                    $('#businesstb .newgrant').bind('click',function(e){
                        require(['views/dbgl/addnewgrantwin','jqueryplugin/jquery-formatDateTime'],function(js){
                            js.render();
                        });
                    });
                }else{
                    $('#businesstb .newgrant').hide();
                }
            });

            $('#businesstb .moresearch').bind('click',function(e){
                var searchtype=$(this).attr('searchtype');
                require(['views/dbgl/moresearchwin','jqueryplugin/jquery-formatDateTime'],function(js){
                    js.render(searchtype);
                });
            });

            $('#excelmenu_btn').menubutton({
                iconCls: 'icon-excel',
                menu: '#excelmenu'
            });
            $('#excelmenu').menu({
                onClick:function(item){
                    require(['commonfuncs/ExcelExport'],function(excel){
                        //console.log(item);
                        excel.exportbygrid($('#businessgrid'),item);
                    });

                }
            });
            var sendWfs=function(){
                require(['text!commonfuncs/gis/wfs.htm'],function(wfs){
                    $.ajax({
                        url:'http://localhost:80/geoserver/wfs',
                        type:'post',
                        data:{
                           url:'http://localhost:80/geoserver/wfs',
                           body:wfs+''
                        },success:function(res){alert(res)}
                    })
                })
            }

        }
    }
    return a;
});
