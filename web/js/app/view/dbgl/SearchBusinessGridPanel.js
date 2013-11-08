/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-8
 * Time: 下午12:49
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.SearchBusinessGridPanel' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.dbglsearchbusinessgridpanel',
    cls:'navigation-grid',
    requires: [

    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('gridshowfresh',this);
        }
    },



    initComponent: function() {
        var me=this;
        Ext.apply(this, {

            items: [{
                xtype: 'textfield',
                width: 400,
                fieldLabel: '查询条件'

            }, {
                xtype: 'dbglsearchbusinessgrid'
            }]
        });
        this.callParent(arguments);

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
