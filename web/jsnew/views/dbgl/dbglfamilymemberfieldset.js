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


        }else{
            require(['commonfuncs/ShowBirthDay','jqueryplugin/easyui-form'], function (ShowBirthDay) {
                $('#owerid').bind('blur',function(){
                    var isValid=$(this).validatebox('isValid');
                    if(isValid){
                        var familydt=$('#familymembersgrid').datagrid('getData').rows;
                        for( var i=0;i<familydt.length;i++){
                            if(familydt[i].relationship=='户主'){
                                return;
                            }
                        }
                        var familynum=Number($(':input[name=familynum]').val()||0);
                        $(':input[name=familynum]').val(familynum+1);
                        var oweridvalue=$('#mainform').form('getValue','owerid');
                        var sex_birth=ShowBirthDay.showBirthday(oweridvalue);
                        var age=(new Date()).getFullYear()-parseInt(sex_birth.birthday.split("-")[0]);
                        if(sex_birth.birthday){
                            $('#familymembersgrid').datagrid('appendRow',
                                {
                                    name: $('#owername').val(),
                                    relationship:'户主',
                                    birthday:sex_birth.birthday,
                                    personid: oweridvalue,
                                    sex:sex_birth.sex,
                                    isenjoyed:'享受',
                                    persontype:'归正人员',
                                    jobstatus:'',
                                    bodystatus:'健康',

                                    age:age,
                                    monthlyincome: 0 ,
                                    jobstatus:age>=60?'老年人':''

                                }
                            );

                        }
                    }
                })

            });

        }




        $('#owerid,#owername').bind('change propertychange input',function () {

            require(['commonfuncs/ShowBirthDay','jqueryplugin/easyui-form'], function (ShowBirthDay) {
                var oweridvalue=$('#mainform').form('getValue','owerid');
                var sex_birth=ShowBirthDay.showBirthday(oweridvalue);
                $('#familymembersgrid').datagrid('updateRow',{
                    index: 0,
                    row: {
                        name: $('#owername').val(),
                        birthday:sex_birth.birthday,
                        sex:sex_birth.sex,
                        age:(new Date()).getFullYear()-parseInt(sex_birth.birthday.split("-")[0]),
                        personid: oweridvalue
                    }
                });

            });


        });



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
        function uniquePersonid(){
            var f=function(array,value){
                for(var i=0;i< array.length; i++){
                    if(array[i]==value){
                        return i;
                    }
                }
                return -1;
            }
            var ids=[];
            var rows=$('#familymembersgrid').datagrid('getData').rows;
            for(var i=0;i<rows.length;i++){
                if(rows[i].personid){
                    if(f(ids,rows[i].personid)>-1){
                        return false;
                    }else{
                        ids.push(rows[i].personid);
                    }
                }else{
                    var ed=$('#familymembersgrid').datagrid('getEditor', {index:i,field:'personid'})
                    if(ed){
                        var id=$(ed.target).val();
                        if(f(ids,id)>-1){
                            return false;
                        }else{
                            ids.push(id)
                        }
                    }
                }
            }
            return true;
        }

        $('#familymembersgrid').datagrid({
            width: $('#familymembersdiv').width()-15,
            onClickRow:function(index, rowData){
                if(rowData.relationship!='户主') $('#delfamilymemer_btn').linkbutton('enable');
                else $('#delfamilymemer_btn').linkbutton('disable');
                if (editIndex != index){
                    if (endEditing()){
                        $('#familymembersgrid').datagrid('selectRow', index)
                            .datagrid('beginEdit', index);
                        require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                            familygridfieldsbinds.personidbind(index);
                            familygridfieldsbinds.namebind(index);
                            familygridfieldsbinds.isenjoyedbind(index);
                        });
                        editIndex = index;
                    } else {
                        $('#familymembersgrid').datagrid('selectRow', editIndex);
                    }
                }

            }
        });

        $('#newfamilymemer_btn').bind('click', function () {
            $('#familymembersgrid').datagrid('appendRow', {name: '', relationship: '其它'});
            var editIndex = $('#familymembersgrid').datagrid('getRows').length - 1;
            $('#familymembersgrid').datagrid('selectRow', editIndex)
                .datagrid('beginEdit', editIndex);

            require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                familygridfieldsbinds.personidbind(editIndex);
                familygridfieldsbinds.namebind(editIndex);
                familygridfieldsbinds.isenjoyedbind(editIndex);
            });

            $('#FamilyPersons').val($('#familymembersgrid').datagrid('getRows').length);
            $(':input[name=housearea]').trigger('blur');
        });

        $('#delfamilymemer_btn').bind('click', function () {

            if(!$('#delfamilymemer_btn').linkbutton('options').disabled){
                var selectrow= $('#familymembersgrid').datagrid('getSelected');
                var index=$('#familymembersgrid').datagrid('getRowIndex',selectrow);
                $('#familymembersgrid').datagrid('deleteRow', index);
                $('#delfamilymemer_btn').linkbutton('disable');
                $('#FamilyPersons').val($('#familymembersgrid').datagrid('getRows').length);
                $(':input[name=housearea]').trigger('blur');
            }

        });
        $('#newfamilymemer_save').bind('click', function () {
            if(!uniquePersonid()){
                alert('存在重复的身份证号码');return;
            }
            if (endEditing()){
                $('#familymembersgrid').datagrid('acceptChanges');
                var rows=$('#familymembersgrid').datagrid('getRows');
                $('#FamilyPersons').val(rows.length);
                require(['commonfuncs/FilterGridrow'],function(FilterGridrow){
                    var isenjoyedrows=FilterGridrow.ByFields(rows,['isenjoyed'],[isenjoyedtype.yes]);
                    var disabledlevelrows=FilterGridrow.ByFields(rows,['disabledlevel'],disabledtype.heavy);
                    var enjoyPersons=$('#enjoyPersons');
                    var disabledpersons=$('#disabledpersons');
                    if(enjoyPersons.length>0)enjoyPersons.val(isenjoyedrows.length);
                    if(disabledpersons.length>0)disabledpersons.val(disabledlevelrows.length);
                });
            }
        });
    }

    return {
        render: render
    };
});