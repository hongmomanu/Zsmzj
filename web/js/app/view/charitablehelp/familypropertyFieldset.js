/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-6
 * Time: 下午1:12
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.charitablehelp.familypropertyFieldset', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.charitablehelpfamilypropertyfieldset',
    requires: [],

    initComponent: function () {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            xtype: 'fieldset',
            cls:'fieldset-border',
            title: '<a>家庭财产信息</a>',
            collapsible: true,
            collapsed:true,
            defaultType: 'textfield',
            bodyStyle: 'padding:5px 5px 5px 5px',
            //layout: 'anchor',
            layout: {
                type: 'table',
                tdAttrs:{style: "border:1px solid #2E2E2E;"},
                // The total column count must be specified here
                columns: 3,
                tableAttrs: {
                    border: 1,
                    cellpadding: 5,
                    cellspacing: 0,
                    width: '100%',
                    align: 'center',
                    style: "border:1px solid #2E2E2E;border-collapse:collapse;margin:0 auto;text-align:left;"
                    /*style: {
                     width: '100%'
                     }*/
                }
            },
            items:[
                {
                    name: 'cash',
                    fieldLabel: '现金',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                }
                ,{
                    name: 'banksecurities',
                    fieldLabel: '银行存款及有价证券',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'debt',
                    fieldLabel: '债权',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'vehicle',
                    fieldLabel: '机动车辆',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'nonresidentialhouse',
                    fieldLabel: '非居住类房屋',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'insurance',
                    fieldLabel: '商业保险',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'registeredcapital',
                    fieldLabel: '工商注册资金（资本）',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                }

            ]
        });

        this.callParent(arguments);
    }
})