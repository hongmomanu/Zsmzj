/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={
        render:function(item,datares){

            require(['commonfuncs/AjaxForm'],function(ajax){
               var params={userid:userid};
               var success=function(res){
                   require(['jqueryplugin/raphael-min'],function(js){
                       var paper = Raphael('signatures',200, 200);
                       var c = paper.image(res.signaturepath,0,0,200,200);
                       $('#signatures').draggable();

                   });
               };
               var errorfunc=function(){
                   $.messager.alert('操作失败', '无法获取签章图片');
               };
               ajax.ajaxsend('post','json','ajax/getsignaturebyuid.jsp',params,success,null,errorfunc);
            });
            /*console.log(item);
            console.log(datares);*/

        }

    }

    return a;
});
