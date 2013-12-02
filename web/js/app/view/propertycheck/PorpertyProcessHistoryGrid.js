
Ext.define('ZSMZJ.view.propertycheck.PorpertyProcessHistoryGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.propertyprocesshistorygrid',
    cls:'navigation-grid',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            border: false,
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,
                stripeRows: true
            },
            columns: [
                {header: '审批名称', dataIndex: 'approvalname',width: 150},
                {header: '审批结果', dataIndex: 'approvalresult',width: 150},
                {header: '审批人', dataIndex: 'displayname',width: 150},
                {header: '审批时间', width: 150,dataIndex: 'time',renderer: function (val, obj, record) {
                    var time =Ext.Date.parse(val, "Y-m-d H:i:s");
                    //var time = new Date(val);
                    val = Ext.util.Format.date(time, 'Y-m-d H:i');
                    return val;
        }},
                {header: '审批意见', dataIndex: 'approvalopinion',flex:1}

            ],
            flex: 1,
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'propertycheck.ProcessHistorys',
                displayInfo: true,
                displayMsg: '显示审批记录 {0} - {1} of {2}',
                emptyMsg: "没有审批记录"
            }),
            store: 'propertycheck.ProcessHistorys'

        });
        this.callParent(arguments);
        ZSMZJ.view.propertycheck.PorpertyProcessHistoryGrid.selectionModel = this.getSelectionModel();

    }

});
