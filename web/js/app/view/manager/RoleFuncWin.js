/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午1:35
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.manager.RoleFuncWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.rolefuncwin',
    requires: [
        //'Ext.form.*'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '角色功能',
            height: 300,
            width: 600,
            closeAction : 'hide',
            resizable:false,
            layout: 'fit',
            items: {
                xtype: 'rolefuncgrid',

                //bodyPadding: 10,

                border: false
            }

        });
        this.callParent(arguments);
    }

});