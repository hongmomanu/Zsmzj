/**
 * Created by jack on 14-1-6.
 */

define(function(){
    var initTabCoseFlag=true;
    var currentMenu=null;
    var a={
        setCurrentMenu:function(menu){
            currentMenu=menu;
        },
        ShowContent:function(htmlfile,jsfile,title,value,folder,res,id,businesstype){
            require(['commonfuncs/LookupItemName','commonfuncs/LoadingMask'],function(LookupItemName,LoadingMask){
                LoadingMask.ajaxLoading();
                var require_render=function(htmlfile,jsfile){

                    if(initTabCoseFlag){
                        $('#tabs').tabs({
                            onClose:function(title,index){

                                var f=function(){
                                    if(($('#tabs').tabs('tabs').length)<2){
                                        if(currentMenu.name=='业务办理'&&title!='业务办理'){
                                            $(currentMenu.target).trigger('click');
                                        }
                                    }

                                }
                                window.setTimeout(f,1000);
                            }
                        });
                        initTabCoseFlag=!initTabCoseFlag;
                    }

                    var options= {
                        title: title,
                        content: htmlfile,
                        id:id,
                        businesstype:businesstype,
                        closable: true
                    };
                    if($('#tabs').tabs('exists',1)){

                        $('#tabs').tabs('select', 1);
                        $('#tabs').tabs('close',1);

                    }

                    $('#tabs').tabs('add',options);
                    var lookupname=LookupItemName.lookupitemname(formwidgettype,value);
                    if(lookupname){
                        var firstform=applyformviews[lookupname][0];
                        firstformhtml='text!'+folder+firstform+'.htm';
                        firstformjs=folder+firstform;
                        require([firstformhtml,firstformjs],function(firstformhtml,firstformjs){
                            $('#mainform').append(firstformhtml);
                            firstformjs.render($('#mainform').children()[0],res);
                            jsfile.render(lookupname,folder,LoadingMask,res);
                            LoadingMask.ajaxLoadEnd();
                        });
                    }
                    else{
                        LoadingMask.ajaxLoadEnd();

                        jsfile.render(lookupname,folder,LoadingMask,res);
                    }

                    //jsfile.render(lookupname,folder,LoadingMask,res);

                };
                require([htmlfile,jsfile],require_render);


            });


        }

    }

    return a;
});
