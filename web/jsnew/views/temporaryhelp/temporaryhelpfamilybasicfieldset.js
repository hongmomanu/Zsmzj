define(function () {

    function render(parameters,res) {
        require(['views/dbgl/dbglfamilybasicfieldset'],function(js){
             js.render(parameters,res);
            $('#owerid').combogrid({
                panelWidth:300,
                url: 'ajax/searchbusinessbypid.jsp',
                idField:'businessid',
                textField:'owerid',
                mode:'remote',
                fitColumns:true,
                pagination:true,
                onBeforeLoad: function(param){
                    var options = $('#owerid').combogrid('options');
                    param.query=param.q;
                    param.type=[businessTableType.dbgl,businessTableType.dbbyh];
                    param.start = (options.pageNumber - 1) * options.pageSize;
                    param.limit = options.pageSize;
                },
                columns:[[
                    {field:'businessid',title:'',width:60,hidden:true},
                    {field:'owername',title:'户主姓名',width:80},
                    {field:'sex',title:'性别',align:'center',width:30},
                    {field:'businesstype',title:'类型',align:'center',width:100}
                ]]
            });
        });
    }

    return {
        render: render
    };
});