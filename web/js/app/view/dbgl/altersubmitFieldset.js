/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-10-23
 * Time: 下午2:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.altersubmitFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.dbglaltersubmitfieldset',
    requires: [
    ],

    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                title: '<a>业务审批信息</a>',
                cls:'fieldset-border',
                defaultType: 'textfield',
                itemId:'businesscheckinfo',
                layout: {
                    type: 'table',
                    columns: 3,
                    tdAttrs:{style: "border:1px solid #2E2E2E;"},
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
                    /*{
                     xtype:'dbglaplytype',
                     searchtype:"dbglpoortype",
                     name: 'poortype',
                     fieldLabel: '分类管理',
                     afterLabelTextTpl: required,
                     emptyText: '请选择分类管理',
                     blankText : '请选择分类管理',
                     allowBlank: false
                     }*//*,
                     {
                     name: 'poorstandard',
                     fieldLabel: '低保标准(元)',
                     afterLabelTextTpl: required,
                     emptyText: '请输入低保标准',
                     blankText : '请输入低保标准',
                     allowBlank: false
                     }
                    , */
                    {
                        name: 'poorstandard',
                        itemId:'poorstandard',
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('moneychane', field);
                            }
                        },
                        fieldLabel: '低保标准(元)',
                        afterLabelTextTpl: required,
                        emptyText: '请输入低保标准',
                        blankText : '请输入低保标准',
                        allowBlank: false
                    },
                    {
                        name: 'aidnum',
                        afterLabelTextTpl: required,
                        emptyText: '请输入救助证编号',
                        blankText : '请输入救助证编号',
                        fieldLabel: '救助证编号',
                        allowBlank: false
                    }
                    ,
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
                        name:'enjoyednum',
                        itemId: 'enjoyPersons',
                        afterLabelTextTpl: required,
                        readOnly:true,
                        /*disabled:true,*/
                        allowBlank: false
                    },
                    {
                        name: 'disabledpersons',
                        itemId:'disabledpersons',
                        fieldLabel: '重残人数',
                        value:0,
                        listeners: {

                            "change":function(field,e){
                                //alert(1);
                                this.fireEvent('moneychane', field);
                            }
                        },
                        afterLabelTextTpl: required,
                        emptyText: '请输入重残人数',
                        blankText : '请输入重残人数',
                        allowBlank: false
                    },
                    {
                        name: 'disabledmoney',
                        fieldLabel: '重残低保金(元)',
                        hidden:true,
                        value:0,
                        allowBlank: true
                    },
                    {
                        name: 'othershelpmoney',
                        fieldLabel: '其他人员低保金(元)',
                        hidden:true,
                        value:0,
                        allowBlank: true
                    }
                    ,
                    {
                        name: 'totalhelpmoney',
                        itemId:'totalhelpmoney',
                        fieldLabel: '总救助金额(元/月/户)',
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
                        colspan:2,
                        allowBlank: true
                    }
                    ,{
                        name: 'helpreason',
                        fieldLabel: '救助原因',
                        colspan:3,
                        minWidth:300,
                        //width:600,
                        //draggable :true,
                        anchor : '100%',
                        width:800,
                        xtype : 'textarea',
                        grow : true,

                        afterLabelTextTpl: required,
                        emptyText: '输入救助原因',
                        emptyText: '输入救助原因',
                        allowBlank: false
                    },{
                        name: 'villageopinion',
                        fieldLabel: '社区/村意见',
                        colspan:3,
                        minWidth:300,
                        //width:600,
                        //draggable :true,
                        anchor : '100%',
                        width:800,
                        xtype : 'textarea',
                        grow : true,

                        allowBlank: true
                    },{
                        name: 'townopinion',
                        fieldLabel: '街道/乡镇意见',
                        colspan:3,
                        minWidth:300,
                        //width:600,
                        //draggable :true,
                        anchor : '100%',
                        width:800,
                        xtype : 'textarea',
                        grow : true,
                        allowBlank: true
                    },{
                        name: 'civilopinion',
                        fieldLabel: '民政局意见',
                        colspan:3,
                        minWidth:300,
                        width:600,
                        //draggable :true,
                        anchor : '100%',
                        width:800,
                        xtype : 'textarea',
                        grow : true,
                        allowBlank: true
                    }
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
                    /*{
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
                     name:'displayname',
                     //value:username,
                     readOnly: true


                     }
                     *//*   ]
                     }*/
                ]
            }
        );
        this.callParent(arguments);

    }

});
