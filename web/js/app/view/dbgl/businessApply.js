/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 下午1:25
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.dbgl.businessApply', {
    extend : 'Ext.form.Panel',
    alias : 'widget.dbglbusinessapplyform',
    requires: [

    ],
    initComponent: function() {
        Ext.apply(this, {
            bodyPadding: 10,
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 90,
                msgTarget: 'qtip'
            },
            items: [{
                xtype: 'fieldset',
                title: '<a>【低保业务办理】家庭基本信息</a>',
                defaultType: 'textfield',
                //layout: 'anchor',
                layout: {
                    type: 'table',

                    // The total column count must be specified here
                    columns: 3,
                    tableAttrs: {
                        style: {
                            width: '100%'
                        }
                    }
                },

                items: [{
                        name: 'division',
                        fieldLabel: '行政区划',
                        emptyText: '请输入行政区划',
                        colspan:2,//合并列
                        allowBlank: false
                    },
                    {
                        xtype: 'component',
                        name:'accountimgpath',
                        id:'dbglaccountimg',
                        rowspan:2,
                        listeners: {
                            render: function(c){
                                c.getEl().on('click', function(){ this.fireEvent('imgclick', c); }, c);
                            }
                        },
                        autoEl: {
                            tag: 'img',
                            cls:'mouseover',
                            src : "img/noperson.gif"
                        }
                    }
                    ,{
                        name: 'applytype',
                        fieldLabel: '申请类别',
                        emptyText: '请输入申请类别',
                        allowBlank: false
                    },
                    ,{
                        name: 'applytype',
                        fieldLabel: '家庭类别',
                        emptyText: '请输入家庭类别',
                        allowBlank: false
                    }
                    ]

                }]

            });
        this.callParent(arguments);
    }

});