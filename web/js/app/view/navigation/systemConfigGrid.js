/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-8-8
 * Time: 下午2:50
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.navigation.systemConfigGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.systemconfiggrid',
    cls:'navigation-grid',
    requires: [

    ],
    initComponent: function() {
        Ext.apply(this, {
            border: false,

            hideHeaders:true,
            columns: [


                {header: 'Lable', dataIndex: 'label',flex:1,renderer:this.formatLable}

            ],
            flex: 1,
            store: 'navigation.SystemConfigs'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.navigation.systemConfigGrid.selectionModel = this.getSelectionModel();
    },
    formatLable:function(value, p, record) {
        return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
    }
});
