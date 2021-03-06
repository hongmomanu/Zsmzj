/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-6
 * Time: 下午2:16
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.charitablehelp.applysubmitFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.charitablehelpapplysubmitfieldset',
    requires: [


    ],

    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                xtype: 'fieldset',
                cls:'fieldset-border',
                title: '<a>业务审批信息</a>',
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

                items: [

                    {
                        xtype:'dbglaplytype',
                        searchtype:"helpprojecttype",
                        name: 'helpprojecttype',
                        fieldLabel: '救助项目类型',
                        afterLabelTextTpl: required,
                        emptyText: '请选择救助项目类型',
                        blankText : '请选择救助项目类型',
                        allowBlank: false
                    },

                    {
                        name: 'helpbgtime',
                        fieldLabel: '救助开始日期',
                        afterLabelTextTpl: required,
                        emptyText: '请选择救助开始日期',
                        blankText : '请输选择救助开始日期',
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
                        fieldLabel: '享受人数',
                        value:0,
                        itemId: 'enjoyPersons',
                        afterLabelTextTpl: required,
                        //disabled:true,
                        readOnly:true,
                        name:'enjoyednum',
                        allowBlank: false
                    },
                    {
                        name: 'totalhelpmoney',
                        itemId:'totalhelpmoney',
                        fieldLabel: '总救助金额',
                        afterLabelTextTpl: required,
                        emptyText: '请输入救助金额',
                        blankText : '请输入救助金额',
                        afterLabelTextTpl: required,
                        value:0,
                        allowBlank: false
                    }
                    ,
                    {
                        name: 'publicityedtm',
                        fieldLabel: '公示结束日期',
                        xtype: 'datefield',
                        format: 'Y-m-d',
                        //colspan:2,
                        allowBlank: true
                    }
                    ,{
                        name: 'helpreason',
                        fieldLabel: '备注',
                        colspan:3,
                        minWidth:600,
                        width:800,
                        //draggable :true,
                        anchor : '100%',
                        //width:800,
                        xtype : 'textarea',
                        grow : true,

                        afterLabelTextTpl: required,
                        emptyText: '输入备注',
                        emptyText: '输入备注',
                        allowBlank: false
                    },{
                        name: 'villageopinion',
                        fieldLabel: '社区/村意见',
                        colspan:3,
                        minWidth:600,
                        width:800,
                        //draggable :true,
                        anchor : '100%',
                        //width:800,
                        xtype : 'textarea',
                        grow : true,

                        allowBlank: true
                    },{
                        name: 'townopinion',
                        fieldLabel: '街道/乡镇意见',
                        colspan:3,
                        minWidth:600,
                        width:800,
                        //draggable :true,
                        anchor : '100%',
                        //width:800,
                        xtype : 'textarea',
                        grow : true,
                        allowBlank: true
                    },{
                        name: 'civilopinion',
                        fieldLabel: '民政局意见',
                        colspan:3,
                        minWidth:600,
                        width:800,
                        //draggable :true,
                        anchor : '100%',
                        //width:800,
                        xtype : 'textarea',
                        grow : true,
                        allowBlank: true
                    }
                    ,{
                        name: 'helpunit',
                        fieldLabel: '慈善机构',
                        colspan:3,
                        minWidth:600,
                        width:800,
                        //draggable :true,
                        anchor : '100%',
                        //width:800,
                        xtype : 'textarea',
                        grow : true,
                        allowBlank: true
                    },{
                        name: 'helpunitopinion',
                        fieldLabel: '慈善机构意见',
                        colspan:3,
                        minWidth:600,
                        width:800,
                        //draggable :true,
                        anchor : '100%',
                        //width:800,
                        xtype : 'textarea',
                        grow : true,
                        allowBlank: true
                    },/*{
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
                        name:'mktime',
                        //columnWidth:.5,
                        readOnly: true,
                        value:Ext.Date.format(new Date(), 'Y-m-d')

                    }
                    ,{
                        xtype:'label',
                        text:''

                    }
                    ,

                    {
                        fieldLabel:"制表人",
                        name:'mkperson',
                        value:username,
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
