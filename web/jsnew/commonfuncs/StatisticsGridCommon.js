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

            $('#businesstb .search,#businesstb .keyword').bind('click keypress',function(e){
                var keycode = (event.keyCode ? event.keyCode : event.which);

                if($(this).attr("type")==='keyword'&&keycode!=13)return;

                $('#businessgrid').treegrid('load',{

                    bgdate:$('#businesstb .bgdate').datebox('getValue'),
                    eddate:$('#businesstb .eddate').datebox('getValue'),
                    keyword:$('#businesstb .keyword').val()

                })
            });






        }

    }

    return a;
});
