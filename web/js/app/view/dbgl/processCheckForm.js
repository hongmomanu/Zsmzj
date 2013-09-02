/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-9-2
 * Time: 下午4:21
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.processCheckForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.processcheckform',
    requires: [
        //'Ext.form.*'
    ],
    initComponent: function() {
        Ext.apply(this, {
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
                    xtype: 'radio',
                    checked: true,
                    fieldLabel: '审批结果',
                    boxLabel: '同意',
                    name: 'approvalresult',
                    inputValue: '同意'
                }, {
                    xtype: 'radio',
                    boxLabel: '不同意',
                    name: 'approvalresult',
                    inputValue: '不同意'
                },
                {
                    anchor : '100%',
                    //width:800,
                    xtype : 'textarea',
                    fieldLabel: '审批意见',
                    name: 'approvalopinion'
                }


            ],
            border: false


        });
        this.callParent(arguments);
    }

});
