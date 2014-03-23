/**
 * Created by jack on 13-12-31.
 */
define(function () {

    function render(parameters) {
        var type=null;
        var businesstype=$('#tabs').tabs('getSelected').panel('options').businesstype;
        var title=$('#tabs').tabs('getSelected').panel('options').title;
        if(locationSystemName==title){
            require(['commonfuncs/LocationGridCommon'],function(LocationGridCommon){
                LocationGridCommon.initbusinessgrid(type,businesstype);
            });
        }else{
            require(['commonfuncs/BusinessGridCommon'],function(BusinessGridCommon){
                BusinessGridCommon.initbusinessgrid(type,businesstype);
            });
        }


    }

    function rowformater(value, rowData, rowIndex) {
        return '<a>查看</a>'
    }

    return {
        render: render,
        rowformater: rowformater
    };
});