/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午1:35
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.uploadAffixFileWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.uploadaffixfilewin',
    requires: [
        //'Ext.form.*'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '上传附件',
            height: 360,
            width: 450,
            closeAction : 'hide',
            resizable:false,
            layout: 'fit',
            items: [
                {
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
                        name:'filename',
                        fieldLabel: '文件名'
                    },{
                        xtype: 'filefield',
                        emptyText: '选择照片',
                        fieldLabel: '照片',
                        name: 'filepath',
                        buttonText: '',
                        listeners: {
                            'change': function(fb, v){
                                //testobjs=fb;
                                var filename= v.slice(v.lastIndexOf("\\")+1);
                                fb.previousNode().setValue(filename);

                            }
                        },
                        validator: function(value){
                            var arr = value.split('.');
                            if(imgfiletype[arr[arr.length-1]]){
                                return true;
                            }else{
                                return '请上传图片文件';
                            }
                        },
                        buttonConfig: {
                            iconCls: 'upload-icon'
                        }
                    },
                    {"xtype":'affixfilesgrid'}
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

                    } ,
                    {
                        text: '确定',
                        action: 'confirm'

                    }
                ],
                border: false
            }

            ]

        });
        this.callParent(arguments);
    }

});