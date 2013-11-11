/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午1:35
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.manager.EditCommonUserWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.editcommonuserwin',
    requires: [
        //'Ext.form.*'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '编辑用户',
            height: 260,
            width: 400,
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
                        fieldLabel: '登录名',
                        allowBlank:false,
                        blankText   : '不能为空',
                        name: 'username'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '用户名',
                        allowBlank:false,
                        blankText   : '不能为空',
                        name: 'displayname'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '原用户密码',
                        blankText   : '不能为空',
                        allowBlank:false,
                        inputType: 'password',
                        name: 'oldpassword'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '新用户密码',
                        blankText   : '不能为空',
                        allowBlank:false,
                        inputType: 'password',
                        name: 'password'
                    }
                    /*{
                        xtype: 'textfield',
                        fieldLabel: '密码确认',
                        inputType: 'password',
                        allowBlank:false,
                        name: 'passwordagain',
                        validator: function(value) {
                            var password1 = this.previousSibling('[name=password]');
                            return (value === password1.getValue()) ? true : '前后密码不匹配.'
                        }
                    }
                    ,*/
                    /*{
                        fieldLabel: '行政区划',
                        //id:'testcombox',
                        name: 'divisionid',
                        //width:'200',
                        *//*xtype: 'combo',*//*
                        xtype:'dbgldivsioncombtree',
                        //xtype:,
                        allowBlank: false,
                        blankText: "不能为空",
                        displayField: 'text',
                        valueField: 'id',
                        emptyText: '请选择行政区划'

                    },
                    {
                        //columnWidth: 0.6,
                        fieldLabel: '所属角色',
                        name: 'roleid',
                        xtype: 'combo',
                        allowBlank: false,
                        blankText: "不能为空",
                        displayField: 'rolename',
                        valueField: 'roleid',
                        emptyText: '请选择角色',
                        listeners: {
                            scope: this,
                            'select': function (combo, records) {
                            }
                        },
                        //queryMode: 'local',
                        store:'manager.RoleManagers'

                    }*/
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