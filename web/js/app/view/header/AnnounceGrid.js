
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.header.AnnounceGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.announcegridpanel',
    cls:'navigation-grid',
    requires: [

    ],
    /*afterShow: function(animateTarget, cb, scope) {
        this.fireEvent('alterapplyaftershow',this);
    },*/
    listeners: {
        show: function(panel) {
            this.fireEvent('gridshowfresh',this);
        }
    },
    initComponent: function() {
        Ext.apply(this, {
            border: false,
            stype:'list',
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,
                stripeRows: true
            },

            plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl : new Ext.XTemplate(
                    '<p><b>Company:</b> </p>',
                    '<p><b>Change:</b> </p><br>',
                    '<p><b>Summary:</b></p>',
                    {
                        formatChange: function(v){
                            //var color = v >= 0 ? 'green' : 'red';
                            return '<span style="color: ' + color + ';">' + "22" + '</span>';
                        }
                    })
            }],
            //hideHeaders:true,
            columns: [


                //{header: '审批名称', dataIndex: 'rolename',width: 150},
                {header: '流程状态', dataIndex: 'processstatus',width: 150,hidden:true,renderer:function(val,obj,record){
                    return "已"+val;
                }},
                {header: '当前流程',dataIndex:'process',hidden:true},

                {header: '结果',dataIndex:'approvalresult'},
                {header: '意见',dataIndex:'approvalopinion'},
                {header: '提交时间',dataIndex:'time',width:200,renderer: function (val, obj, record) {
                    var time =Ext.Date.parse(val, "Y-m-d H:i:s");
                    //var time = new Date(val);
                    val = Ext.util.Format.date(time, 'Y-m-d H:i');
                    return val;
                }},
                {header: '消息人',dataIndex:'approvaluser'},
                {header: '业务id', width: 150,dataIndex:'businessid',hidden:true}


            ],
            flex: 1,
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'header.Announces',
                displayInfo: true,
                displayMsg: '显示公告消息 {0} - {1} of {2}',
                emptyMsg: "无公告消息"/*,
                items:[
                    '-', {
                        text: '新增用户',
                        action:'addnewuser'

                    }]*/
            }),
            store: 'header.Announces'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.header.AnnounceGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
