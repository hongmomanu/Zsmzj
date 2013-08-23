
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.NeedToDoGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.needtodopanel',
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

            //view: new Ext.grid.GridView({ scrollToTop: Ext.emptyFn }),

            //hideHeaders:true,
            columns: [


                {header: '用户名', dataIndex: 'username',width: 150},
                {header: '角色', dataIndex: 'rolename',width: 250},
                {header: '注册时间', dataIndex: 'time',width: 150, renderer: function (val, obj, record) {
                    var time = new Date(val);
                    val = Ext.util.Format.date(time, 'Y-m-d H:i');
                    return val;
                }}

            ],
            flex: 1,
            bbar: Ext.create('Ext.PagingToolbar', {
                /*store: 'dbfl.NeedToDos',*/
                displayInfo: true,
                displayMsg: '显示用户 {0} - {1} of {2}',
                emptyMsg: "没有用户",
                items:[
                    '-', {
                        text: '新增用户',
                        action:'addnewuser'

                    }]
            })/*,
            store: 'dbgl.NeedToDos'*/


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.dbgl.NeedToDoGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
