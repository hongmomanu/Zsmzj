define(function () {

    function render(parameters,res) {
        /**这里添加住房绑定事件**/
        require(['views/dbgl/dbglfamilyapplyfieldset'],function(applyjs){
            applyjs.render(parameters,res);
        });


    }

    return {
        render: render
    };
});