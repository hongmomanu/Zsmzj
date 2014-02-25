define(function () {

    function render(lookupname,folder,ajaxloading,res) {
         require(['views/propertycheck/propertycheckfamilyinfoalter'],function(js){
                js.render(lookupname,folder,ajaxloading,res)
         })
         fn();
    }
    function fn(){

    }
    return {
        render: render
    };
});