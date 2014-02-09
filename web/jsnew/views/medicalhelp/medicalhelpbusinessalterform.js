define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        require(['views/dbgl/dbglbusinessalterform'],function(alterjs){
            alterjs.render(lookupname,folder,ajaxloading,res);
        });

    }
    return {
        render: render
    };
});