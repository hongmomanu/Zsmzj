/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午1:35
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.processWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.processwin',
    requires: [
        //'Ext.form.*'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '流程记录',
            height: 560,
            width: 830,
            closeAction : 'hide',
            maximizable: true,
            resizable:false,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'panel',
                layout: {
                    type: 'vbox',

                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,
                //xtype: 'fieldset',

                items: [
                    {xtype:'processhistorygrid'},
                    {xtype:'processpicturepanel'}
                ],
                border: false
            }

        });
        this.callParent(arguments);
    }

});