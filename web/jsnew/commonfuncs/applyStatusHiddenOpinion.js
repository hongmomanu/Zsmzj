define(function(){
    var hidden=function(processstatus){
        $('textarea[name=civilopinion],textarea[name=townopinion]').closest('tr').remove();
    }
    return {hidden:hidden}
})
