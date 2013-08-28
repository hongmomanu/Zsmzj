/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-28
 * Time: 上午11:10
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.ProcessPicture' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.processpicturepanel',
    cls:'navigation-grid',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            border: false,




            items:[
                {html:'测试'},
                {
                    xtype:'dbglprocessvector'
                }

            ]



        });

        this.callParent(arguments);

    }

});