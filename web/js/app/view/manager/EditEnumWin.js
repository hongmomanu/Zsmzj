/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午1:35
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.manager.EditEnumWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.editenumwin',
    requires: [
        //'Ext.form.*'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '编辑枚举',
            height: 300,
            width: 600,
            closeAction : 'hide',
            resizable:false,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'form',

                layout: {
                    type: 'vbox',

                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,
                //xtype: 'fieldset',

                fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },

                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: '枚举标识',
                        name: 'enumeratelabel'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '枚举类型',
                        name: 'enumeratetype'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '功能值',
                        name: 'enumeratevalue'
                    }
                ],
                buttons: [
                    {
                        text: '取消',
                        handler: function () {
                            //this.up('form').getForm().reset();
                            this.up('window').hide();
                        }
                    } ,
                    {
                        text: '保存',
                        action: 'save'

                    }
                ],
                border: false
            }

        });
        this.callParent(arguments);
    }

});