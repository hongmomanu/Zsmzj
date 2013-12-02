/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-19
 * Time: 下午2:59
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.propertycheck.familymoneyFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.propertycheckfamilymoneyfieldset',
    requires: [


    ],

    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                xtype: 'fieldset',
                title: '<a>家庭财产信息</a>',
                cls:'fieldset-border',
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
                        itemId:'cash',
                        value:0,
                        regex :/^-?\d+$/,
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('moneychane', field);
                            }
                        },
                        regexText  : "只能输入数值",
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    }
                    ,{
                        name: 'banksecurities',
                        fieldLabel: '银行存款及有价证券',
                        regex :/^-?\d+$/,
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('moneychane', field);
                            }
                        },
                        regexText  : "只能输入数值",
                        value:0,
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'debt',
                        fieldLabel: '债权',
                        value:0,
                        regex :/^-?\d+$/,
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('moneychane', field);
                            }
                        },
                        regexText  : "只能输入数值",
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'vehicle',
                        fieldLabel: '非生活机动车折价',
                        value:0,
                        regex :/^-?\d+$/,
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('moneychane', field);
                            }
                        },
                        regexText  : "只能输入数值",
                        allowBlank: true
                    },{
                        name: 'nonresidentialhouse',
                        fieldLabel: '非居住房产折价',
                        value:0,
                        regex :/^-?\d+$/,
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('moneychane', field);
                            }
                        },
                        regexText  : "只能输入数值",
                        allowBlank: true
                    },{
                        name: 'nolifeneededmachine',
                        fieldLabel: '非生活必须船只等机械类折价',
                        value:0,
                        regex :/^-?\d+$/,
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('moneychane', field);
                            }
                        },
                        regexText  : "只能输入数值",
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'insurance',
                        fieldLabel: '商业保险',
                        regex :/^-?\d+$/,
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('moneychane', field);
                            }
                        },
                        regexText  : "只能输入数值",
                        value:0,
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'registeredcapital',
                        fieldLabel: '工商注册资金（资本）',
                        value:0,
                        regex :/^-?\d+$/,
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('moneychane', field);
                            }
                        },
                        regexText  : "只能输入数值",
                        allowBlank: true
                    },{
                        name: 'propertysum',
                        itemId:'propertysum',
                        regex :/^-?\d+$/,

                        regexText  : "只能输入数值",
                        fieldLabel: '合计',
                        value:0,
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    }

                ]
            }
        );
        this.callParent(arguments);

    }

});
