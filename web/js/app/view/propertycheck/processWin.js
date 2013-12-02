
Ext.define('ZSMZJ.view.propertycheck.processWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.propertyprocesswin',
    requires: [
        //'Ext.form.*'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '流程记录',
            height: 460,
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