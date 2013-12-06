/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-6
 * Time: 下午1:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.medicalhelp.familyapplyFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.medicalhelpfamilyapplyfieldset',
    requires: [


    ],

    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                xtype: 'fieldset',
                title: '<a>业务申请信息</a>',
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
                    xtype: 'dbglaplytype',
                    searchtype: "medicalapplyhelpway",
                    name: 'helpway',
                    fieldLabel: '申请类别',
                    afterLabelTextTpl: required,
                    emptyText: '请选申请类别',
                    blankText : '请选择申请类别',
                    allowBlank: false
                } ,
                    {
                        xtype:'dbglaplytype',
                        searchtype:"helpnature",
                        name: 'helpnature',
                        itemId:'helpnature',

                        fieldLabel: '救助性质',
                        afterLabelTextTpl: required,
                        emptyText: '请选择救助性质',
                        blankText : '请选择救助性质',
                        allowBlank: false
                    },
                    {
                        xtype:'dbglaplytype',
                        searchtype:"medicarenature",
                        name: 'medicarenature',

                        fieldLabel: '医保性质',
                        afterLabelTextTpl: required,
                        emptyText: '请选择医保性质',
                        blankText : '请选择医保性质',
                        allowBlank: false
                    },

                    {
                        name: 'familyincome',
                        fieldLabel: '家庭总收入',
                        afterLabelTextTpl: required,
                        value:0,
                        emptyText: '请输入家庭总收入',
                        blankText : '请输入家庭总收入',
                        allowBlank: false
                    } ,
                    {
                        xtype:'dbglaplytype',
                        searchtype:"writeofftype",
                        name: 'writeofftype',
                        fieldLabel: '报销类型',
                        afterLabelTextTpl: required,
                        emptyText: '请选择报销类型',
                        blankText : '请选择报销类型',
                        allowBlank: false
                    },
                    {
                        name: 'medicalhelptype',
                        xtype:'dbglaplytype',
                        searchtype:"medicalhelptype",
                        fieldLabel: '医疗救助类别',
                        emptyText: '请选择医疗救助类别',
                        blankText : '请选择医疗救助类别',
                        allowBlank: true
                    }

                ]
            }
        );
        this.callParent(arguments);

    }

});
