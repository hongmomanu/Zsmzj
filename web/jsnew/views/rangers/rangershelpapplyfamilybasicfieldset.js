define(function () {

    function render(parameters,res) {
        require(['views/dbgl/dbglfamilybasicfieldset'],function(js){

            js.render(parameters,res);

        });
    }

    return {
        render: render
    };
});