define(function () {

    function render(parameters,res) {
        require(['views/temporaryhelp/temporaryhelpfamilybasicfieldset'],function(js){
            js.render(parameters,res);
        });
    }

    return {
        render: render
    };
});