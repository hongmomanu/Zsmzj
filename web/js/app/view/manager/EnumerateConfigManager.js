/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.manager.EnumerateConfigManager' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.enumerateconfigmanager',
    cls:'navigation-grid',
    requires: [
        'Ext.PagingToolbar'
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


                {header: '枚举标识', dataIndex: 'enumlabel',width:250},
                {header: '枚举类别', dataIndex: 'enumtype',width:250},
                {header: '枚举值',   dataIndex: 'enumvalue',width:250},
                {header: '枚举配置id', dataIndex: 'enumid',width: 250,hidden:true}

            ],
            flex: 1,
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'manager.EnumerateConfigManagers',
                displayInfo: true,
                displayMsg: '显示枚举 {0} - {1} of {2}',
                emptyMsg: "没有功能可显示",
                items:[
                    '-', {
                        text: '新增枚举',
                        action:'addnewenumerate'

                    }]
            }),
            store: 'manager.EnumerateConfigManagers'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.manager.EnumerateConfigManager.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
