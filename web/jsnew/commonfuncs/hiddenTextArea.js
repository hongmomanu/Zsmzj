define(function(){

    var readonlyaction=function(){
        var $tab=$('#tabs').tabs('getSelected');
        $tab.find(':input').attr('disabled','disabled');
        $tab.find('.easyui-combobox').combo('readonly');
        $tab.find('.easyui-datebox').combo('readonly');
    }
    var hidden=function(processstatus){

        if(processstatus=='审核'||processstatus=='提交'){
            readonlyaction();
            if(hiddenSomeTextArea=='审批'){
                $('textarea[name=villageopinion],textarea[name=townopinion]').attr({ 'disabled': 'disabled' });
                $('textarea[name=civilopinion]').attr({'disoption':'yes'});  //显示可编辑
            }else if(hiddenSomeTextArea=='审核'){
                $('textarea[name=civilopinion]').closest('tr').remove();
                $('textarea[name=villageopinion]').attr({ 'disabled': 'disabled' });
                $('textarea[name=townopinion]').attr({'disoption':'yes'});  //显示可编辑
            }else{
                $('textarea[name=civilopinion],textarea[name=townopinion]').closest('tr').remove();
            }
        }
        $('#tabs').tabs('getSelected').find('[disoption=yes]').removeAttr('disabled');
    }
    return {hidden:hidden,readonlyaction:readonlyaction}
})
