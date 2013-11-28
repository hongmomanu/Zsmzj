

Ext.define('ZSMZJ.view.propertycheck.processCheckWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.propertyprocesscheckwin',
    requires: [
        //'Ext.form.*'
        'ZSMZJ.view.dbgl.processCheckForm'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '审核操作',
            height: 460,
            width: 800,
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
                    {xtype:'processcheckform'},
                    {xtype:'processhistorygrid'}

                ],
                buttons:[
                    {
                       'text':'提交',
                       'action':'send'
                    }
                    ,
                    {
                        'text':'取消',
                        handler: function () {
                            this.up('window').hide();
                        }
                    }
                ],
                border: false
            }

        });
        this.callParent(arguments);
    }

});