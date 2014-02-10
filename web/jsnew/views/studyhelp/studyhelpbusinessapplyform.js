define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        require(['views/temporaryhelp/temporaryhelpbusinessapplyform'],function(appformjs){
           appformjs.render(lookupname,folder,ajaxloading,res);
        });

    }
    return {
        render: render
    };
});