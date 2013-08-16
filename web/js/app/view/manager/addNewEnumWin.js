/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午1:35
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.manager.addNewEnumWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.addnewenumwin',
    requires: [
        //'Ext.form.*'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '新增枚举',
            height: 260,
            width: 330,
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
                        name: 'enumlabel'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '枚举值',
                        name: 'enumvalue'
                    }
                    ,
                    {
                        xtype: 'textfield',
                        fieldLabel: '枚举类型',
                        name: 'enumtype'
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
                        text: '添加',
                        action: 'add'

                    }
                ],
                border: false
            }

        });
        this.callParent(arguments);
    }

});