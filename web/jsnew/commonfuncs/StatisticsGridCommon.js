/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={

        initbusinessgrid:function(type,businesstype,columns){

            $('#staticsgrid').treegrid(
                {
                    singleSelect: true,
                    collapsible: true,
                    rownumbers: true,
                    method:'post',
                    columns:columns,
                    remoteSort: false,
                    idField:"id",
                    fit:true,

                    toolbar:'#businesstb',
                    onBeforeLoad: function (rows,params) {
                        console.log(rows);
                        var options = $('#staticsgrid').treegrid('options');

                        params.businesstype = businesstype;
                        params.type=type;
                        params.isonlychild=true;
                        params.divisionpath = divisionpath;
                        params.node=rows?rows.id:0;

                    }

                });

            $('#businesstb .bgmonth,#businesstb .search').bind('click keypress',function(e){

                var keycode = (event.keyCode ? event.keyCode : event.which);
                if($(this).attr("type")==='bgmonth'&&keycode!=13)return;
                $('#staticsgrid').treegrid('load',{
                    bgmonth:$('#businesstb .bgmonth').datebox('getValue')
                })
            });






        }

    }

    return a;
});
