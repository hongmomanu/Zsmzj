define(function () {

    function render(parameters,res) {
        require(['commonfuncs/PersonidValidator'],function(PersonidValidator){

            if(res){
                require(['jqueryplugin/jquery-form'],function(AjaxFormjs){
                    $(parameters).form('load',res.form);
                    var affix=res.affixfile;
                    for(var i=0;i<affix.length;i++){
                        if(affix[i].attachmenttype=="accountimgpath"){
                            $('#personimg').attr('src',affix[i].results[0].attachmentpath);
                            break;
                        }
                    }

                });

            }

            $.parser.parse($(parameters));
            $.extend($.fn.validatebox.defaults.rules, {
                personid: {
                    validator: PersonidValidator.IdentityCodeValid,
                    message: '身份证不合法,请确认身份证是否正确输入!'
                }
            });

            $('#divisiontree').combotree({
                url:'ajax/gettreedivision.jsp?onlychild=true&node=-1',
                method: 'get',
                onLoadSuccess:function(){
                    if(!this.firstloaded&&!res){
                        $('#divisiontree').combotree('setValue', divisionpath);
                        this.firstloaded=true;
                    }
                },
                onBeforeExpand: function (node) {
                    $('#divisiontree').combotree("tree").tree("options").url
                        = "ajax/gettreedivision.jsp?onlychild=true&node=" + node.id;
                },
                onHidePanel: function () {
                    $('#divisiontree').combotree('setValue',
                        $('#divisiontree').combotree('tree').tree('getSelected').divisionpath);
                }
            });





            $('.lazy-combobox').combobox({
                onShowPanel: function () {
                    var searchtype = $(this).attr('searchtype');
                    var url = 'ajax/getenumbytype.jsp?type=' + searchtype;
                    $(this).combobox('reload', url);
                }

            });



            $('#personimg').click(function () {
                $('#imgwin').window('open');
            });

            $('#imgwin_cancel').bind('click', function () {
                $('#imgwin').window('close');
            });
            $('#imgwin_submit').bind('click', function () {
                require(['jqueryplugin/jquery-form'],function(AjaxFormjs){
                    var success=function(data, jqForm, options)
                    {
                        $('#personimg').attr('src', data.filepath);
                        $('#imgwin').window('close');
                    };
                    var options = {
                        //beforeSubmit:  showRequest,  // pre-submit callback
                        dataType:"json",
                        success: success,  // post-submit callback
                        timeout:   3000
                    };
                    $('#personimg_form').ajaxForm(options).submit() ;

                });
            });

           $('#owername').bind('blur',function(){
               $(':input[name=bankower]').val($(this).val())
           })
           //FamilyPersons
               $('#zhufangzmj').bind('blur',function(){
                   var avg=($(this).val()||0)/(Number($('#FamilyPersons').val())||1);
                   $('#zhufangavgmj').val(avg.toFixed(1))
               })

        })



    }

    return {
        render: render
    };
});