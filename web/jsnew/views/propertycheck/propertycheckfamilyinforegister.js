define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        $('#appformsubmitcancel').click(function(){
            $('#tabs').tabs('close',1);
        });

        /*$('#appformmore').click(function(){
            var isValid = $('#mainform').form('validate');
            if(isValid){
                require(['commonfuncs/FormAdd'],function(FormAdd){
                    FormAdd.addnewchild(lookupname,folder,ajaxloading,true,res,null);
                });

            }

        });*/

        function isscroll_func(){
            require(['commonfuncs/IsScroll'],function(IsScroll){
                if(!IsScroll.isYscroll('formcontentpanel')){
                    //$('#appformmore').click();
                    require(['commonfuncs/FormAdd'],function(FormAdd){
                        FormAdd.addnewchild(lookupname,folder,ajaxloading,false,res,isscroll_func);
                    });

                }else{

                    require(['jqueryplugin/jquery-paged-scroll'],function(scrolljs){
                        var settingsDiv = {
                            handleScroll:function (page,container,doneCallback) {
                                //alert(1);
                                if($('#mainform').children().length<applyformviews[lookupname].length){
                                    require(['commonfuncs/FormAdd'],function(FormAdd){
                                        FormAdd.addnewchild(lookupname,folder,ajaxloading,false,res,doneCallback);
                                    });
                                }else{
                                    doneCallback();
                                }


                            },
                            //        pagesToScroll : 5,
                            triggerFromBottom:'1',
                            loader:'<div class="loader"></div>',
                            debug  : false,
                            targetElement : $('#formcontentpanel'),
                            monitorTargetChange:false


                        };

                        $('#formcontentpanel').paged_scroll(settingsDiv);

                    });

                }
            });
        }
        isscroll_func();
        $('#appformsubmit').click(function(){
            //$('#tabs').tabs('close',1);
            require(['commonfuncs/PropertyCheck'],function(ajaxform){
                var sucfun=function(){
                    $('#tabs').tabs('close',1);
                };
                ajaxform.submitForm('new',null,sucfun);
            });
        });

    }
    return {
        render: render
    };
});