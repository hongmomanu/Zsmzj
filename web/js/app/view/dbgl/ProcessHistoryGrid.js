/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.ProcessHistoryGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.processhistorygrid',
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
            //title:'审批流程记录',
            //view: new Ext.grid.GridView({ scrollToTop: Ext.emptyFn }),

            //hideHeaders:true,
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
                store: 'dbgl.ProcessHistorys',
                displayInfo: true,
                displayMsg: '显示审批记录 {0} - {1} of {2}',
                emptyMsg: "没有审批记录"/*,
                items:[
                    '-', {
                        text: '新增用户',
                        action:'addnewuser'

                    }]*/
            }),
            store: 'dbgl.ProcessHistorys'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.dbgl.ProcessHistoryGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
