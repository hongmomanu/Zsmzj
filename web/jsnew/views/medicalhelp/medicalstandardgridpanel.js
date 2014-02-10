/**
 * Created by jack on 13-12-31.
 */
define(function () {

    function render(parameters) {
        var type=null;
        var businesstype=$('#tabs').tabs('getSelected').panel('options').businesstype;
        require(['commonfuncs/BusinessGridCommon'],function(BusinessGridCommon){
            BusinessGridCommon.initbusinessgrid(type,businesstype);

            $('#businesstb .newmedical').bind('click',function(e){
                require(['views/medicalhelp/addnewmedicalwin'],function(js){
                    js.render();
                });
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