define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        require(['views/dbgl/dbglbusinessalterform'],function(js){
            js.render(lookupname,folder,ajaxloading,res)
        })
    }

    return {
        render: render
    };
});