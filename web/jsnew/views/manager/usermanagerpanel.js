define(function () {

    function render(parameters) {
        $('#userpaneltb .keyword').bind('click keypress',function(e){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if($(this).attr("type")==='keyword'&&keycode!=13)return;

                $('#usermanagerpanel').datagrid('load',{keyword:$('#userpaneltb .keyword').val()});
            }
        );
        $('#usermanagerpanel').datagrid({
            singleSelect: true,
            collapsible: true,
            rownumbers: true,
            method:'post',
            url:'ajax/getusers.jsp',
            remoteSort: false,
            sortName:'time',
            sortOrder:'desc',
            fit:true,
            toolbar:'#userpaneltb',
            pagination:true,
            pageSize:10,
            onBeforeLoad: function (params) {
                var options = $('#usermanagerpanel').datagrid('options');
                params.start = (options.pageNumber - 1) * options.pageSize;
                params.limit = options.pageSize;
                params.totalname = "total";
                params.rowsname = "rows";
            },
            onClickRow:function(index, rowData){
                //alert(index);
                $('#userinfoform').form('load',rowData);
                $('#userformbtns .save,#userformbtns .del').linkbutton('enable');
            }

        });
        $('#userformbtns .save').click(function(){
           //alert(1);
        });

    }

    return {
        render: render

    };
});