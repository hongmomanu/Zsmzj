define(function(){
    var pagename=[
        {name:'主页',page:'main'},
        /*{name:'欢迎',page:'greet'},
        {name:'待办',page:'todolist'},
        {name:'公告',page:'notice'},
        {name:'下载',page:'filedownload'}*/
    ]
    var pagepath=(function(){
        var arr=[];
        for(var i in pagename){
            arr.push('text!views/homepage/'+pagename[i]['page']+'.htm')
        }
        return arr;
    })()

    var f=function(s){
        require(pagepath,function(){
            for(var i=0;i<arguments.length;i++){
                $('#homepage').append(arguments[i]);
            }

            $('#hometodolist').datagrid({
                title:'项目名称',
                height:250,
                url:'ajax/getUnCheckedApprovalFail.jsp',
                queryParams: {
                    start: 0,
                    limit: 5
                },
                fitColumns:true,
                columns:[[
                    {field:'owername',title:'人员',width:60,align:'center',fixed:true},
                    {field:'owerid',title:'身份证',width:130,align:'center',fixed:true},
                    {field:'businesstype',title:'名称',width:60,align:'center'},
                    {field:'time',title:'提交时间',width:100,align:'center',formatter:function(v,r,i){
                        return v.substr(5)
                    }},
                    {field:'username',title:'提交人',width:80,align:'center'},
                    {field:'approvalopinion',title:'原因',width:130,align:'right'}
                ]]
            }).closest('.panel').find('div.panel-tool')
                .append(
                    '<a href="javascript:void(0)" class="layout-button-right"></a><span style="margin-right: 3px;">更多</span>')

            $('#homenotice').datagrid({
                title:'通知公告',
                height:250,
                url:'datagrid_data1.json',
                columns:[[
                    {field:'unitcost',title:'Price',width:100,align:'right'}
                ]]
            });

            $('#homefiledownload').datagrid({
                title:'文件下载',
                height:250,
                url:'datagrid_data1.json',
                columns:[[
                    {field:'unitcost',title:'Price',width:100,align:'right'}
                ]]
            });


        })
    }
    return {render:f}
})