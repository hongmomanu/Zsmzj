/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-19
 * Time: 下午2:59
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.propertycheck.familyinputFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.propertycheckfamilyinputfieldset',
    requires: [


    ],

    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                title: '<a>家庭收入信息</a>',
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
                        name: 'interest',
                        value:0,
                        listeners: {

                            "blur":function(field,e){

                                this.fireEvent('moneychane', field);
                            }
                        },

                        fieldLabel: '利息、股息、红利',
                        regex :/^-?\d+$/,

                        regexText  : "只能输入数值",
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    }
                    ,{
                        name: 'wages',
                        value:0,
                        fieldLabel: '工资、薪金',
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('moneychane', field);
                            }
                        },
                        regex :/^-?\d+$/,

                        regexText  : "只能输入数值",
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'planting',
                        value:0,
                        fieldLabel: '种植、养殖、捕捞',
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
                        name: 'pension',
                        value:0,
                        fieldLabel: '离退休金、养老保险等',
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
                        name: 'management',
                        value:0,
                        fieldLabel: '承包经营',
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
                        name: 'alimony',
                        value:0,
                        fieldLabel: '赡（抚、扶）养费',
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
                        name: 'incidentalincome',
                        value:0,
                        fieldLabel: '赔偿、继承、赠与、偶然所得',
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
                        name: 'remuneration',
                        fieldLabel: '劳务报酬',
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
                        name: 'allowance',
                        fieldLabel: '各类生活补助',
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
                        name: 'paidservices',
                        fieldLabel: '生产经营、有偿服务',
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
                        name: 'propertylease',
                        regex :/^-?\d+$/,
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('moneychane', field);
                            }
                        },
                        regexText  : "只能输入数值",
                        fieldLabel: '财产租赁、转让',
                        value:0,
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'otherincome',
                        fieldLabel: '其他',
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
                        name: 'incomesum',
                        value:0,
                        regex :/^-?\d+$/,

                        regexText  : "只能输入数值",
                        fieldLabel: '合计',
                        itemId:'incomesum',
                        allowBlank: true
                    },{
                        name: 'incomesumarea',
                        regex :/^-?\d+$/,

                        regexText  : "只能输入数值",
                        fieldLabel: '家庭上年度月平均现金收入',
                        itemId:'incomesumarea',

                        value:0,
                        allowBlank: true
                    },
                    {
                        name: 'incomesumareaperson',
                        regex :/^-?\d+$/,
                        itemId:'incomesumareaperson',

                        regexText  : "只能输入数值",
                        value:0,
                        fieldLabel: '家庭上年度月人平均现金收入',
                        itemId:'incomesumareaperson',
                        allowBlank: true
                    }

                ]
            }
        );
        this.callParent(arguments);

    }

});
