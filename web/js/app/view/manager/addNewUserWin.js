/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午1:35
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.manager.addNewUserWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.addnewuserwin',
    requires: [
        //'Ext.form.*'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '新增用户',
            height: 255,
            width: 300,
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
                        fieldLabel: '用户名',
                        name: 'username'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '用户密码',
                        name: 'password'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '密码确认',
                        name: 'passwordagain'
                    }
                    ,
                    {
                        xtype: 'textfield',
                        fieldLabel: '所属角色',
                        name: 'roleid'
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