/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午1:35
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.manager.EditFuncWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.editfuncwin',
    requires: [
        //'Ext.form.*'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '编辑功能',
            height: 350,
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
                        fieldLabel: '功能名',
                        name: 'funcname'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '功能类型',
                        name: 'functype'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '功能标识',
                        name: 'label'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '功能图标',
                        name: 'imgurl'
                    }
                    ,
                    {
                        xtype: 'textfield',
                        fieldLabel: '排序号',
                        name: 'sortnum'
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