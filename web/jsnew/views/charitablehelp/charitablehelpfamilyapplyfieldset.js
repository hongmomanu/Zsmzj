define(function () {

    function render(parameters,res) {
        /**这里添加绑定事件**/
        require(['views/dbgl/dbglfamilyapplyfieldset'],function(applyjs){
            applyjs.render(parameters,res);
        });


    }

    return {
        render: render
    };
});