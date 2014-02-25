define( function () {

    function render(parameters,res) {
        $('.moneybasic').blur(function(){

            require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                familygridfieldsbinds.moneychange('.moneybasic');
            });

        });
        if(res){
            $(parameters).form('load',res.form);
        }
        require(['commonfuncs/PropertyCheck'],function(js){
            js.propertycheckfieldsetaddstyle();//设置不可编辑
        })
    }

    return {
        render: render
    };
});