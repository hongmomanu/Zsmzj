/**
 * Created by jack on 13-12-31.
 */
define(['views/MainTree','commonfuncs/LoadingMask'], function(MainTree,LoadingMask){

    function start(){
        MainTree.render({LoadingMask:LoadingMask});
        require(['commonfuncs/initFuncs','commonfuncs/initDisplay'],function(initFuncs,initDisplay){
            initFuncs.initProcessFromRole(roleid,"流程操作");
            initDisplay.initProcessFromRole(roleid,"显示操作");
        })
    }

    return {
        start:start
    };
});
