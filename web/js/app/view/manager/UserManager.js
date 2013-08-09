/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.manager.UserManager' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.usermanagerpanel',
    cls:'navigation-grid',
    requires: [

    ],
    initComponent: function() {
        Ext.apply(this, {
            border: false,
            viewConfig: {
                trackOver: false,
                loadMask: false,
                scrollToTop: Ext.emptyFn,
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
            store: 'UserManagers'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        CF.view.navigation.managerGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
