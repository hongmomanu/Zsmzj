define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        require(['views/dbgl/dbglbusinessapplyform'],function(applyjs){
            applyjs.render(lookupname,folder,ajaxloading,res);
        });
    }
    return {
        render: render
    };
});