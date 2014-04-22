
define(function(){

    var a={
        initProcessFromRole:function(roleid,type){
            var me=this;
            var params = {
                roleid:roleid,
                type:type
            };
            var successFunc = function (response) {

                hiddenSomeTextArea=(function(){
                    var arr=[];
                    for(var i in response){
                        var name=response[i]['name'];
                        if(name=='审批意见'){
                           return "审批";
                        }else if(name=='审核意见'){
                            arr.push(name)
                        }
                    }
                    if(arr.length==1){
                        return "审核";
                    }
                    return "";
                })();
            };

            $.ajax({
                type: "post",        //使用get方法访问后台
                dataType: "json",       //返回json格式的数据
                url: "ajax/getallfuncsbyrule.jsp",   //要访问的后台地址
                data: params,         //要发送的数据
                complete :function(){},      //AJAX请求完成时
                success: successFunc
            });


        }

    }

    return a;
});
