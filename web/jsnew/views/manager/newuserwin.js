define(function () {

    function render(parameters) {
        $('#newuserwin').dialog({
            title: '新增用户窗口',
            width: 300,
            height: 280,
            closed: false,
            cache: false,
            buttons:[{
                text:'保存',
                id:'savenewuserbtn',
                disabled:true,
                handler:function(){
                   alert(1);

                }
            },{
                text:'取消',
                handler:function(){

                }
            }],
            //href: 'get_content.php',
            modal: true
        });

        $.extend($.fn.validatebox.defaults.rules, {
            equals: {
                validator: function(value,param){
                    return value == $(param[0]).val();
                },
                message: '密码不一致！'
            }
        });
        var divitiontree=$('#newuserwin .easyui-combotree');
        divitiontree.combotree({
            url:'ajax/gettreedivision.jsp?onlychild=true&node=-1',
            method: 'get',
            onLoadSuccess:function(){
                if(!this.firstloaded){
                    divitiontree.combotree('setValue', divisionpath);
                    this.firstloaded=true;
                }
            },
            onBeforeExpand: function (node) {
                divitiontree.combotree("tree").tree("options").url
                    = "ajax/gettreedivision.jsp?onlychild=true&node=" + node.id;
            },
            onHidePanel: function () {
                divitiontree.combotree('setValue',
                    divitiontree.combotree('tree').tree('getSelected').divisionpath);
            }
        });


        $('#newuserwin .lazy-combobox').combobox({
            onShowPanel: function () {
                var url = 'ajax/getroles.jsp?start=0&limit=100' ;
                $(this).combobox('reload', url);
            }

        });


        $.parser.parse($('#newuserwin'));

        $('#newuserwin input').bind('change input',function(){
            var form=$('#newuserwin form');
            if(form.form('validate')){
                $('#savenewuserbtn').linkbutton('enable');
            }
            else{
                $('#savenewuserbtn').linkbutton('disable');
            }
        });

        $('#newuserwin .easyui-combobox,#newuserwin .easyui-combotree').combobox({
            onHidePanel:function(){
                var form=$('#newuserwin form');
                if(form.form('validate')){
                    $('#savenewuserbtn').linkbutton('enable');
                }else{
                    $('#savenewuserbtn').linkbutton('disable');
                }
            }
        })

    }

    return {
        render: render

    };
});