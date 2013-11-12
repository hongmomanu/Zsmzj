/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 下午1:25
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.disaster.businessAlter', {
    extend : 'Ext.form.Panel',
    alias : 'widget.disasterhelpbusinessalterform',
    requires: [


    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('alterapplyaftershow',this);
        }
    },
   /* afterShow: function(animateTarget, cb, scope) {
        this.fireEvent('alterapplyaftershow',this);
    },*/
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            bodyPadding: 10,
            cls: 'shadowdiv',
            buttonAlign : 'center',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 80,
                msgTarget: 'side'
            },
            autoScroll: true,
            items: [
                {
                    xtype: 'fieldset',
                    title: '<a>【灾害场所信息登记办理】灾害基本信息</a>',
                    cls:'fieldset-border',
                    defaultType: 'textfield',

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

                    items: [{
                        name: 'division',
                        fieldLabel: '行政区划',
                        itemId:'divisiontype',
                        //width:300,
                        //id:'testobjcomb',
                        xtype:'dbgldivsioncombtreepath',
                        allowBlank: false,
                        blankText: "不能为空",
                        displayField: 'text',
                        valueField:'id',
                        afterLabelTextTpl: required,
                        emptyText: '请输入行政区划',
                        blankText : '请输入行政区划',
                        colspan:2,//合并列
                        allowBlank: false
                    }

                        ,{
                            name: 'owername',
                            itemId:'owername',
                            fieldLabel: '避灾安置场所名称',
                            afterLabelTextTpl: required,

                            blankText: '请输入避灾安置场所名称',
                            emptyText: '请输入避灾安置场所名称',
                            allowBlank: false
                        },{
                            name: 'coverage',
                            fieldLabel: '覆盖范围',

                            afterLabelTextTpl: required,
                            blankText: '请输入覆盖范围',
                            emptyText: '请输入覆盖范围号',
                            allowBlank: false
                        },
                        {
                            name: 'housearea',
                            fieldLabel: '建筑面积',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'houseusearea',
                            fieldLabel: '使用面积',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'escapingnum',
                            fieldLabel: '可避灾人数',
                            allowBlank: true
                        },{
                            name: 'housestructure',
                            fieldLabel: '结构',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'windresistance',
                            fieldLabel: '抗风能力',
                            afterLabelTextTpl: required,
                            blankText:'抗凤能力',
                            value:0,
                            allowBlank: false
                        },{
                            name: 'earthquakeresistance',
                            fieldLabel: '抗震能力',
                            afterLabelTextTpl: required,
                            blankText:'抗震能力',
                            value:0,
                            //emptyText: '低保户类型',
                            allowBlank: false
                        },{
                            name: 'conectperson',
                            fieldLabel: '联系人1',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        }
                        ,{
                            name: 'telnum',
                            fieldLabel: '联系电话1',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'conectperson2',
                            fieldLabel: '联系人2',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        }
                        ,{
                            name: 'telnum2',
                            fieldLabel: '联系电话2',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        }
                    ]

                },
                {
                    xtype: 'fieldset',
                    /*collapsible: true,
                     collapsed:false,*/
                    title: '<a>避灾对象信息</a>',
                    defaultType: 'textfield',
                    bodyStyle: 'padding:5px 5px 5px 5px',
                    layout: 'fit',
                    minHeight:160,

                    items:[

                        {
                            xtype:'escapingmembergrid',
                            itemId:'familymembergrid'

                        }


                    ]
                }


            ],
            buttons:[

                {
                    text: '保存',
                    action:'applysubmit'
                },
                {
                    text: '返回',
                    action:'cancel'
                }
            ]

            });
        this.callParent(arguments);
    }

});