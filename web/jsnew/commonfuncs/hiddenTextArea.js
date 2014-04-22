define(function(){
    var hidden=function(processstatus){
        if(processstatus=='审核'||processstatus=='提交'){
            if(hiddenSomeTextArea=='审批'){
                $('textarea[name=villageopinion],textarea[name=townopinion]').attr('disabled','disabled');
            }else if(hiddenSomeTextArea=='审核'){
                $('textarea[name=civilopinion]').closest('tr').remove();
                $('textarea[name=villageopinion]').attr('disabled','disabled');
            }else{
                $('textarea[name=civilopinion],textarea[name=townopinion]').closest('tr').remove();
            }
        }
    }
    return {hidden:hidden}
})
