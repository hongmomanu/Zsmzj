define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        require(['views/dbgl/dbglbusinessalterform'],function(js){
            js.render(lookupname,folder,ajaxloading,res)
        })
        //window.setTimeout(hiddenfieldset,3000);
    }
    function hiddenfieldset(){
        alert(1)
    }
    return {
        render: render
    };
});