/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-19
 * Time: 下午2:54
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.propertycheck.familyinfoAlter', {
    extend : 'Ext.form.Panel',
    alias : 'widget.propertycheckfamilyinfoalter',
    requires: [


    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('initformaftershow',this);
            this.fireEvent('alterapplyaftershow',this);
        }
    },
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';

        Ext.apply(this, {
            bodyPadding: 10,
            cls: 'shadowdiv',
            buttonAlign : 'center',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 100,
                msgTarget: 'side'
            },
            autoScroll: true,
            items:[

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
                {
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
                },
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