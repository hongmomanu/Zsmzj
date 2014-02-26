define( function () {

    function render(parameters,res) {
        /**这里添加住房绑定事件**/
        $(parameters).find(".lazy-combobox").combobox({
            onShowPanel: function () {
                var searchtype = $(this).attr('searchtype');
                var url = 'ajax/getenumbytype.jsp?type=' + searchtype;
                $(this).combobox('reload', url);
            }

        });
        if(res){
            $(parameters).form('load',res.form);
        }
        require(['commonfuncs/PropertyCheck'],function(js){
            js.propertycheckfieldsetaddstyle();//设置不可编辑
        })
    }

    return {
        render: render
    };
});