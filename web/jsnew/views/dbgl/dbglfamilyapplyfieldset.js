define(function () {

    function render(parameters,res) {
        /**这里添加绑定事件**/
        $.parser.parse($(parameters));

        $(parameters).find(".lazy-combobox").combobox({
            onShowPanel: function () {
                var searchtype = $(this).attr('searchtype');
                var url = 'ajax/getenumbytype.jsp?type=' + searchtype;
                $(this).combobox('reload', url);
            }

        });
        /*计算帮助金额*/
        require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
            familygridfieldsbinds.caculatehelpmoney();
        });

        if(res){
            $(parameters).form('load',res.form);
        }


    }

    return {
        render: render
    };
});