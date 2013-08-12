/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.manager.RoleManager' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.rolemanagerpanel',
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
                enableTextSelection:true,
                stripeRows: true
            },

            //view: new Ext.grid.GridView({ scrollToTop: Ext.emptyFn }),

            //hideHeaders:true,
            columns: [


                {header: '角色名', dataIndex: 'rolename',flex: 1},
                {header: '角色id', dataIndex: 'roleid',width: 250,hidden:true}

            ],
            flex: 1,
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'manager.RoleManagers',
                displayInfo: true,
                displayMsg: '显示用户 {0} - {1} of {2}',
                emptyMsg: "没有用户",
                items:[
                    '-', {
                        text: '新增角色',
                        action:'addnewrole'

                    }]
            }),
            store: 'manager.RoleManagers'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.manager.RoleManager.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
