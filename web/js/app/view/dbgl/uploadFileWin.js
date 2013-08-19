/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午1:35
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.uploadFileWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.uploadfilewin',
    requires: [
        //'Ext.form.*'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '上传文件',
            height: 260,
            width: 330,
            closeAction : 'hide',
            resizable:false,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'form',
                defaults: {
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',
                    labelWidth: 50
                },

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
                        fieldLabel: '文件名'
                    },{
                        xtype: 'filefield',
                        id: 'form-file',
                        emptyText: '选择文件',
                        fieldLabel: '文件',
                        name: 'filepath',
                        buttonText: '',
                        buttonConfig: {
                            iconCls: 'upload-icon'
                        }
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
                        text: '上传',
                        action: 'upload'

                    }
                ],
                border: false
            }

        });
        this.callParent(arguments);
    }

});