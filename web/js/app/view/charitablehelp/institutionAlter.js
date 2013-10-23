/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 下午1:25
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.charitablehelp.institutionAlter', {
    extend : 'Ext.form.Panel',
    alias : 'widget.charitablehelpinstitutionalterform',
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
                    title: '<a>【机构救助登记办理】救助机构基本信息</a>',
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
                            style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:left;"
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
                            fieldLabel: '救助机构名称',
                            afterLabelTextTpl: required,

                            blankText: '请输入救助机构名称',
                            emptyText: '请输入救助机构名称',
                            allowBlank: false
                        }
                        ,{
                            name: 'poorstandard',
                            fieldLabel: '救助机构标准',
                            afterLabelTextTpl: required,
                            emptyText: '请输入救助机构标准',
                            blankText: '请输入救助机构标准',
                            allowBlank: false
                        },{
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
                        },{
                            xtype:'dbglaplytype',
                            searchtype:"helpprojecttype",
                            name: 'helpprojecttype',
                            fieldLabel: '救助项目类型',
                            afterLabelTextTpl: required,
                            emptyText: '请选择救助项目类型',
                            blankText : '请选择救助项目类型',
                            allowBlank: false
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