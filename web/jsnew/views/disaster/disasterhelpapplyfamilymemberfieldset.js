define(['commonfuncs/PersonidValidator'], function (PersonidValidator) {

    function render(parameters,res) {
        $.parser.parse($(parameters));

        if(res){
            //$('#mainform').form('load',res.form);
            var params = {
                businessid:res.form.id
            };
            var successFunc = function(data){
                $('#familymembersgrid').datagrid('loadData',data);

            };

            $.ajax({
                type: "post",        //使用get方法访问后台
                dataType: "json",       //返回json格式的数据
                url: "ajax/getfamilymembersbybid.jsp",   //要访问的后台地址
                data: params,         //要发送的数据
                complete :function(){},      //AJAX请求完成时
                success: successFunc
            });


        }
        else{
            $('#familymembersgrid').datagrid('appendRow',
                {
                    name: '默认对象',
                    relationship:'户主'
                });
        }

        var editIndex = undefined;
        function endEditing(){
            if (editIndex == undefined){return true}
            if ($('#familymembersgrid').datagrid('validateRow', editIndex)){

                $('#familymembersgrid').datagrid('endEdit', editIndex);
                editIndex = undefined;
                return true;
            } else {
                return false;
            }
        }

        $('#familymembersgrid').datagrid({
            width: $('#familymembersdiv').width()-15,
            onClickRow:function(index, rowData){
                $('#delfamilymemer_btn').linkbutton('enable');
                if (editIndex != index){
                    if (endEditing()){
                        $('#familymembersgrid').datagrid('selectRow', index)
                            .datagrid('beginEdit', index);
                        require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                            familygridfieldsbinds.personidbind(index);

                        });
                        editIndex = index;
                    } else {
                        $('#familymembersgrid').datagrid('selectRow', editIndex);
                    }
                }

            }
        });

        $('#newfamilymemer_btn').bind('click', function () {
            $('#familymembersgrid').datagrid('appendRow', {name: ''});
            var editIndex = $('#familymembersgrid').datagrid('getRows').length - 1;
            require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                familygridfieldsbinds.personidbind(editIndex);

            });
            $('#familymembersgrid').datagrid('selectRow', editIndex)
                .datagrid('beginEdit', editIndex);

        });

        $('#delfamilymemer_btn').bind('click', function () {

            if(!$('#delfamilymemer_btn').linkbutton('options').disabled){
                var selectrow= $('#familymembersgrid').datagrid('getSelected');
                var index=$('#familymembersgrid').datagrid('getRowIndex',selectrow);
                $('#familymembersgrid').datagrid('deleteRow', index);
                $('#delfamilymemer_btn').linkbutton('disable');
            }

        });
        $('#newfamilymemer_save').bind('click', function () {
            if (endEditing()){
                $('#familymembersgrid').datagrid('acceptChanges');
            }
        });
    }

    return {
        render: render
    };
});