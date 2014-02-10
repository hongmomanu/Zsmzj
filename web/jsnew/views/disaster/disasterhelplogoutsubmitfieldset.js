define( function () {

    function render(parameters,res) {
        /**这里添加审批信息绑定事件**/

        require(['views/dbgl/dbglapplysubmitfieldset'],function(submitjs){
            $(parameters).find('.lazy-combobox').combobox({
                onShowPanel: function () {
                    var searchtype = $(this).attr('searchtype');
                    var url = 'ajax/getenumbytype.jsp?type=' + searchtype;
                    $(this).combobox('reload', url);
                }

            });
            submitjs.render(parameters,res);
            var clickitem=$('#appformsubmit_saveapplylogout');
            if(clickitem.length>0)clickitem.linkbutton('enable');

        });




    }

    return {
        render: render
    };
});