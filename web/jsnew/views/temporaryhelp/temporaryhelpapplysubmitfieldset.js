define( function () {

    function render(parameters,res) {
        /**这里添加审批信息绑定事件**/

        require(['views/dbgl/dbglapplysubmitfieldset'],function(submitjs){
            submitjs.render(parameters,res);
            $('.lazy-combobox').combobox({
                onShowPanel: function () {
                    var searchtype = $(this).attr('searchtype');
                    var url = 'ajax/getenumbytype.jsp?type=' + searchtype;
                    $(this).combobox('reload', url);
                }

            });

        });




    }

    return {
        render: render
    };
});