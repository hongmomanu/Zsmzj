define( function () {

    function render(parameters,res) {
        /**这里添加审批信息绑定事件**/

        require(['jqueryplugin/jquery-formatDateTime','commonfuncs/FilterGridrow'],
            function(timeplugin,FilterGridrow){
                $.parser.parse($(parameters));

                if(res){
                    $(parameters).form('load',res.form);
                }

                require(['jqueryplugin/jquery-formatDateTime'],function(timeplugin){
                    var now=new Date();
                    $("#helpbgtime").datebox("setValue", $.formatDateTime('yy-mm-dd', now));
                    $("#helpedtime").datebox("setValue", $.formatDateTime('yy-mm-dd', new Date(now.setDate(now.getDate()+7))));
                });
                var rows=[];
                if($('#familymembersgrid').length>0){
                    rows=$('#familymembersgrid').datagrid('getRows');

                    $('#FamilyPersons').val(rows.length);
                }

                require(['commonfuncs/FilterGridrow'],function(FilterGridrow){
                    var isenjoyedrows=FilterGridrow.ByFields(rows,['isenjoyed'],[isenjoyedtype.yes]);
                    var disabledlevelrows=FilterGridrow.ByFields(rows,['disabledlevel'],disabledtype.heavy);
                    var enjoyPersons=$('#enjoyPersons');
                    var disabledpersons=$('#disabledpersons');
                    if(enjoyPersons.length>0)enjoyPersons.val(isenjoyedrows.length);
                    if(disabledpersons.length>0)disabledpersons.val(disabledlevelrows.length);
                });




                $('#poorstandard').blur(function(){
                    //alert(2);
                    require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                        familygridfieldsbinds.caculatehelpmoney();
                    });
                });



            });

            require(['commonfuncs/hiddenTextArea','commonfuncs/applyStatusHiddenOpinion'],function(js1,js2){
                if(res){ /*审核审批时隐藏表单中的opinion*/
                    js1.hidden(res.form.processstatus);
                }else{   /*申请时隐藏表单中的审核审批栏*/
                    js2.hidden();
                }
            })



    }

    return {
        render: render
    };
});