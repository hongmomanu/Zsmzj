/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-6
 * Time: 下午1:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.charitablehelp.familyapplyFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.charitablehelpfamilyapplyfieldset',
    requires: [


    ],

    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                xtype: 'fieldset',
                cls:'fieldset-border',
                title: '<a>业务申请信息</a>',
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
                        searchtype:"dbglicomemonth",
                        name: 'icomemonth',

                        fieldLabel: '收入累计月份',
                        afterLabelTextTpl: required,
                        emptyText: '请选择累计月份',
                        blankText : '请选择累计月份',
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
                    }
                    ,
                    {
                        name: 'averageincome',
                        fieldLabel: '月人均收入',
                        afterLabelTextTpl: required,
                        value:0,
                        emptyText: '请输入家庭总收入',
                        blankText : '请输入家庭总收入',
                        allowBlank: false
                    },
                    {
                        name: 'helpunit',
                        fieldLabel: '救助单位',
                        afterLabelTextTpl: required,
                        emptyText: '请输入救助单位',
                        blankText : '请输入救助单位',
                        allowBlank: false
                    },
                    {
                        name: 'conectperson',
                        fieldLabel: '单位电话',
                        afterLabelTextTpl: required,
                        emptyText: '请输入单位电话',
                        blankText : '请输入单位电话',
                        allowBlank: false
                    }
                ]
            }
        );
        this.callParent(arguments);

    }

});
