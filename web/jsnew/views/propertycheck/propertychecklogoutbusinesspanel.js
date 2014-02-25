
define(function () {

    function render(parameters) {
        var type=null;
        var businesstype=$('#tabs').tabs('getSelected').panel('options').businesstype;
        require(['commonfuncs/BusinessGridCommon'],function(BusinessGridCommon){
            BusinessGridCommon.initbusinessgrid(type,businesstype,'',function(params){
                params.processstatustype=processstatustype.logout;
            });

        });

    }

    function rowformater(value, rowData, rowIndex) {
        return '<a>查看</a>'
    }

    return {
        render: render,
        rowformater: rowformater
    };
});