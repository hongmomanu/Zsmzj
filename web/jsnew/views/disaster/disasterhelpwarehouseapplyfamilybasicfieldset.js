define(function () {

    function render(parameters,res) {
        require(['views/dbgl/dbglfamilybasicfieldset'],function(js){

            js.render(parameters,res);
            setHelpbgtime();
        });
    }
    function setHelpbgtime(){
        var d=new Date();
        var year=d.getFullYear();// 获取4位的年份
        var day=d.getDate();
        day=Number(day)>9?day:"0"+day;
        var month=d.getMonth();// 从0-11
        month=Number(month)>8?month+1:"0"+(month+1);
        var helpbgtime=year+"-"+(month)+"-"+day;
        $('input[name=helpbgtime]').val(helpbgtime);
    }
    return {
        render: render
    };
});