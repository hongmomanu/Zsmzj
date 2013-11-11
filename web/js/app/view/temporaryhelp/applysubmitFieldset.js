/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-7
 * Time: 下午14:26
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.temporaryhelp.applysubmitFieldset', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.temporaryhelpapplysubmitfieldset',
    requires: [


    ],

    initComponent: function () {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                xtype: 'fieldset',
                title: '<a>业务审批信息</a>',
                cls:'fieldset-border',
                defaultType: 'textfield',
                itemId: 'businesscheckinfo',

                //layout: 'anchor',
                layout: {
                    type: 'table',

                    // The total column count must be specified here
                    columns: 3,
                    tableAttrs: {
                        border: 1,
                        cellpadding: 5,
                        cellspacing: 1,
                        width: '100%',
                        align: 'center',
                        style: "border:1px solid #2E2E2E;border-collapse:collapse;margin:0 auto;text-align:left;"
                        /*style: {
                         width: '100%'
                         }*/
                    }
                },

                items: [

                    {
                        xtype: 'dbglaplytype',
                        searchtype: "temporaryhelpway",
                        name: 'helpway',

                        fieldLabel: '救助方式',
                        afterLabelTextTpl: required,
                        emptyText: '请选择救助方式',
                        blankText: '请选择救助方式',
                        allowBlank: false
                    }
                    ,
                    {
                        name: 'losemoney',
                        fieldLabel: '受助金额(元)',
                        afterLabelTextTpl: required,
                        emptyText: '请输入受助金额',
                        blankText: '请输入受助金额',
                        allowBlank: false
                    }
                    ,
                    {
                        xtype: 'dbglaplytype',
                        searchtype: "temporaryfundsresource",
                        name: 'fundsresource',
                        fieldLabel: '资金来源',
                        afterLabelTextTpl: required,
                        emptyText: '请选择资金来源',
                        blankText: '请选择资金来源',
                        allowBlank: false
                    },
                    {
                        xtype: 'dbglaplytype',
                        searchtype: "temporaryhelpobject",
                        name: 'helpobject',
                        fieldLabel: '救助对象',
                        afterLabelTextTpl: required,
                        emptyText: '请选择救助对象',
                        blankText: '请选择救助对象',
                        allowBlank: false
                    }
                    ,
                    {
                        name: 'aidnum',
                        fieldLabel: '救助证编号',
                        allowBlank: true
                    }
                    ,
                    {
                        name: 'helpbgtime',
                        fieldLabel: '救助开始日期',
                        afterLabelTextTpl: required,
                        emptyText: '请选择救助开始日期',
                        blankText: '请输选择救助开始日期',
                        xtype: 'datefield',
                        //itemId: 'personbirthday',
                        format: 'Y-m-d',

                        value: Ext.Date.format(new Date(), 'Y-m-d'),
                        allowBlank: false
                    },
                    {
                        name: 'helpedtime',
                        fieldLabel: '救助结束日期',
                        xtype: 'datefield',
                        //itemId: 'personbirthday',
                        format: 'Y-m-d',
                        allowBlank: true
                    },
                    {
                        name: 'damagetime',
                        fieldLabel: '受灾日期',
                        afterLabelTextTpl: required,
                        xtype: 'datefield',
                        emptyText: '请选择受灾日期',
                        blankText: '请选择受灾日期',
                        //itemId: 'personbirthday',
                        value: Ext.Date.format(new Date(), 'Y-m-d'),
                        //itemId: 'personbirthday',
                        format: 'Y-m-d',
                        allowBlank: false
                    },
                    {
                        fieldLabel: '享受人数',
                        value: 0,
                        itemId: 'enjoyPersons',
                        afterLabelTextTpl: required,
                        disabled: true,
                        allowBlank: false
                    },
                    {
                        name: 'totalhelpmoney',
                        fieldLabel: '总救助金额(元/月/户)',
                        afterLabelTextTpl: required,
                        emptyText: '请输入救助金额',
                        blankText: '请输入救助金额',
                        afterLabelTextTpl: required,
                        value: 0,
                        allowBlank: false
                    }
                    ,
                    {
                        name: 'publicityedtm',
                        fieldLabel: '公示结束日期',
                        xtype: 'datefield',
                        format: 'Y-m-d',
                        colspan: 2,
                        allowBlank: true
                    }
                    ,
                    {
                        name: 'helpreason',
                        fieldLabel: '救助原因',
                        colspan: 3,
                        minWidth: 600,
                        width: 800,
                        //draggable :true,
                        anchor: '100%',
                        //width:800,
                        xtype: 'textarea',
                        grow: true,

                        afterLabelTextTpl: required,
                        emptyText: '输入救助原因',
                        emptyText: '输入救助原因',
                        allowBlank: false
                    },
                    {
                        name: 'villageopinion',
                        fieldLabel: '社区/村意见',
                        colspan: 3,
                        minWidth: 600,
                        width: 800,
                        //draggable :true,
                        anchor: '100%',
                        //width:800,
                        xtype: 'textarea',
                        grow: true,

                        allowBlank: true
                    },
                    {
                        name: 'townopinion',
                        fieldLabel: '街道/乡镇意见',
                        colspan: 3,
                        minWidth: 600,
                        width: 800,
                        //draggable :true,
                        anchor: '100%',
                        //width:800,
                        xtype: 'textarea',
                        grow: true,
                        allowBlank: true
                    },
                    {
                        name: 'civilopinion',
                        fieldLabel: '民政局意见',
                        colspan: 3,
                        minWidth: 600,
                        width: 800,
                        //draggable :true,
                        anchor: '100%',
                        //width:800,
                        xtype: 'textarea',
                        grow: true,
                        allowBlank: true
                    }
                    ,
                    {
                        name: 'helpunit',
                        fieldLabel: '救助单位',
                        colspan: 3,
                        minWidth: 600,
                        width: 800,
                        //draggable :true,
                        anchor: '100%',
                        //width:800,
                        xtype: 'textarea',
                        grow: true,
                        allowBlank: true
                    },
                    {
                        name: 'helpunitopinion',
                        fieldLabel: '救助单位意见',
                        colspan: 3,
                        minWidth: 600,
                        width: 800,
                        //draggable :true,
                        anchor: '100%',
                        //width:800,
                        xtype: 'textarea',
                        grow: true,
                        allowBlank: true
                    }
                    ,
                    /*{
                     colspan:3,
                     anchor : '100%',
                     width:'100%',
                     xtype : 'panel',
                     border:0,
                     defaults:{
                     border:0
                     },
                     layout:'column',
                     defaultType: 'textfield',

                     items:[*/
                    {
                        fieldLabel: '制表时间',
                        name: 'mktime',
                        //columnWidth:.5,
                        readOnly: true,
                        value: Ext.Date.format(new Date(), 'Y-m-d')

                    }
                    ,
                    {
                        xtype: 'label',
                        text: ''

                    }
                    ,

                    {
                        fieldLabel: "制表人",
                        name: 'mkperson',
                        value: displayname,
                        readOnly: true


                    }
                    /*   ]
                     }*/
                ]
            }
        );
        this.callParent(arguments);

    }

});
