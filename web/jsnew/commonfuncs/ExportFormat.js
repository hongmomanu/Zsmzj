define(function(){
    var grantmoneyformat=['序号','户主姓名','户主身份证','申请类别','银行帐号','享受人数','救助金额','发放月份'];
    var f=function(array,value){
        for(var i=0;i< array.length; i++){
            if(array[i]==value){
                return i;
            }
        }
        return -1;
    }
    var a={
       format_grantmoney:function(columns,headers,index){
           for(var i=0;i<columns.length;i++){
               var column=columns[i];
               if(f(grantmoneyformat,column.title)>-1){
                   var item={name:column.title,value:column.field,columns:[],col:[index,index],row:[1,1]};
                   headers.push(item);
                   index++;
               }
           }
       }

    }

    return a;
})