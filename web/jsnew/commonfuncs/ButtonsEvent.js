/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={
        approvl_btns:function(item,data){
            var action=$(item).attr('action');
            require(['commonfuncs/ButtonsEvents/'+action],function(action){
                action.render(item,data);
            });

        },
        changeapplystatus:function(businessid,status,callfunc){
            var params = {
                businessid:businessid,
                status:status
            };
            var successFunc = function(){
                if(callfunc)callfunc();
            };

            require(['commonfuncs/AjaxForm'],function(ajaxform){
                ajaxform.ajaxsend("post","json","ajax/changeapplystatus.jsp",params,successFunc,null);
            });

           // alert("shenpi");
            require(['views/dbgl/needtodopanel'],function(js){
                js.updateneedtodocount();
            })
        }

    }

    return a;
});
