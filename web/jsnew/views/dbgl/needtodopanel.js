/**
 * Created by jack on 13-12-31.
 */
define(function () {
    var updateneedtodocount=function(){
        require(['commonfuncs/UpdateItemNum','commonfuncs/AjaxForm'],function(updateitem,js2){
            $.ajax({
                dataType:'json',
                url:'ajax/getneedtodos.jsp',
                data:{
                    roleid:roleid,
                    userid:userid,divisionpath:divisionpath,type:'count'
                },
                type:'post',
                success:function(res){
                    var count=res.count;
                    updateitem.updateitemnum($('#domneedtodocount'),count,"(",")");
                    $('#homegreetcount').text(count);
                }
            })
        })

    }


    var bulkoperationchangeprocessstatus=function(){
        var recordList=$('#businessgrid').datagrid('getSelections');
        var len=recordList.length;
        var changecheckapplystatus=function(recordList,n){
            if(n>=len){
                $('#businessgrid').datagrid('reload');
                updateneedtodocount();
                return;
            }
            var step=recordList[n].processstatus;
            var fun=function(response, action){
                changecheckapplystatus(recordList,n+1)
            }
            if(step==processdiction.stepone||step==processdiction.steptwo){
                var approvalname=null;
                if(step==processdiction.stepone){
                    approvalname='街道/乡镇审核';
                }else{
                    approvalname='区/县/市审批';
                }
                var params = {
                    businessid:recordList[n].businessid,
                    processstatus:recordList[n].processstatus,
                    userid:userid,
                    approvalresult:'同意',
                    approvalopinion:'通过',
                    approvalname:approvalname,
                    isapproval:true
                };
                $.ajax({ url: 'ajax/sendcheckform.jsp',type:'post',data:params,complete:fun })
            }else if(step==processdiction.stepzero){
                var params = {
                    businessid:recordList[n].businessid,
                    status:recordList[n].process
                };
                $.ajax({ url: 'ajax/changeapplystatus.jsp',type:'post',data:params,complete:fun })
            }
        }
        changecheckapplystatus(recordList,0)
    }


    function render(parameters) {
        var type='list';
        var businesstype=$('#tabs').tabs('getSelected').panel('options').businesstype;
        require(['commonfuncs/BusinessGridCommon'],function(BusinessGridCommon){
            BusinessGridCommon.initbusinessgrid(type,businesstype);

        });
        $('#businesstb .shenhe').bind('click',function(){
            bulkoperationchangeprocessstatus();
        })


    }

    function rowformater(value, rowData, rowIndex) {
        return '<a>查看</a>'
    }

    return {
        render: render,
        rowformater: rowformater ,
        updateneedtodocount:updateneedtodocount
    };
});