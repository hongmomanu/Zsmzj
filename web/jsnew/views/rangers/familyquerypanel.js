/**
 * Created by jack on 13-12-31.
 */
define(function () {

    function render(parameters) {


        require(['views/dbgl/dbglgrantmoneypanel'],function(js){
            js.render();
        });

    }

    return {
        render: render

    };
});