
define(function () {

    function render(parameters,res) {
        $.parser.parse($(parameters));
        var grid=$(parameters).find('.easyui-datagrid');
        var options = grid.datagrid('options');
        grid.datagrid(
            {
                onBeforeLoad: function (params) {
                    params.fmy001 =res.form.fmy001;
                    params.start = (options.pageNumber - 1) * options.pageSize;
                    params.limit = options.pageSize;
                    params.totalname = "total";
                    params.rowsname = "rows";
                },
                onLoadSuccess:function(data){

                    $.each($.find('#formcontentpanel fieldset[checkitemname]'),function(i,v){
                        $(v).css({ background: "darkgray" });
                    })
                }
            });
        if(res){
            $(parameters).form('load',res.form);
        }

    }


    return {
        render: render
    };
});