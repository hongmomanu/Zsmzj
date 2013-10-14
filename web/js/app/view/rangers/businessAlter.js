/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 下午1:25
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.rangers.businessAlter', {
    extend : 'Ext.form.Panel',
    alias : 'widget.rangershelpbusinessalterform',
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
                labelWidth: 180,
                msgTarget: 'side'
            },
            autoScroll: true,
            items: [
                {
                    xtype: 'fieldset',
                    title: '<a>【流浪救助信息登记办理】流浪者基本信息</a>',
                    defaultType: 'textfield',

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
                            style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:center;"
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
                    },


                        ,{
                            name: 'owername',
                            itemId:'owername',
                            fieldLabel: '姓名',
                            afterLabelTextTpl: required,

                            blankText: '请输入流浪者姓名',
                            emptyText: '请输入流浪者姓名',
                            allowBlank: false
                        },{
                            name: 'accountaddress',
                            fieldLabel: '户籍地',
                            colspan:2,

                            //afterLabelTextTpl: required,
                            blankText: '请输入户籍地',
                            emptyText: '请输入户籍地',
                            allowBlank: true
                        },{
                            name: 'helpbgtime',
                            fieldLabel: '救助时间',

                            //afterLabelTextTpl: required,
                            blankText: '请输入救助时间',
                            emptyText: '请输入救助时间',
                            allowBlank: true
                        },{
                            name: 'helpreason',
                            fieldLabel: '救助原因',
                            colspan:3,
                            minWidth:600,
                            width:800,
                            //draggable :true,
                            anchor : '100%',
                            //width:800,
                            xtype : 'textarea',
                            grow : true,

                            afterLabelTextTpl: required,
                            emptyText: '输入救助原因',
                            emptyText: '输入救助原因',
                            allowBlank: false
                        }

                    ]

                }

            ],
            buttons:[
                {text: '打印预览',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"打印预览"}),
                    action:'print'
                },
                {
                    text: '流程跟踪',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"流程跟踪"}),
                    action:'process'
                },
                /*{
                    text: '注销',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"注销"}),
                    action:'logout'
                },
                {
                    text: '变更',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"变更"}),
                    action:'change'
                },*/
                {
                    text: '提交审批',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"提交审批"}),
                    action:'sendbusiness'
                },
                {
                    text: '取消提交',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"取消提交"}),
                    action:'cancelsendbusiness'
                },
                {
                    text: '审核',
                    namevalue:'街道/乡镇审核',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"审核"}),
                    action:'checkbusiness'
                },
                {
                    text: '审批',
                    namevalue:'区/县/市审批',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"审批"}),
                    action:'checkbusiness'
                },
                {
                    text: '电子签章',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"电子签章"}),
                    action:'signature'
                },
                {
                    text: '删除签章',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"删除签章"}),
                    action:'unsignature'
                },
                {
                    text: '保存',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"保存"}),
                    action:'applysubmit'
                },
                {
                    text: '返回',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"返回"}),
                    action:'cancel'
                }
            ]

            });
        this.callParent(arguments);
    }

});