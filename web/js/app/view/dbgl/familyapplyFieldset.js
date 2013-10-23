/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-10-23
 * Time: 下午2:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.familyapplyFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.dbglfamilyapplyfieldset',
    requires: [


    ],

    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                xtype: 'fieldset',
                title: '<a>业务申请信息</a>',
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
                    xtype:'dbglaplytype',
                    searchtype:"dbglicomemonth",
                    name: 'icomemonth',

                    fieldLabel: '现金收入累计月份',
                    afterLabelTextTpl: required,
                    emptyText: '请选择累计月份',
                    blankText : '请选择累计月份',
                    allowBlank: false
                },
                    {
                        name: 'familyincome',
                        fieldLabel: '家庭总收入',
                        itemId:'familyincome',
                        afterLabelTextTpl: required,
                        value:0,
                        emptyText: '请输入家庭总收入',
                        blankText : '请输入家庭总收入',
                        allowBlank: false
                    }
                    ,
                    {
                        name: 'averageincome',
                        itemId:'averageincome',
                        fieldLabel: '月人均收入',
                        afterLabelTextTpl: required,
                        value:0,
                        emptyText: '请输入家庭总收入',
                        blankText : '请输入家庭总收入',
                        allowBlank: false
                    }
                    ,
                    {
                        name: 'applymoney',
                        fieldLabel: '申请救济金(元/月/人)',
                        afterLabelTextTpl: required,
                        value:0,
                        emptyText: '请输入家庭总收入',
                        blankText : '请输入家庭总收入',
                        allowBlank: false
                    }

                ]
            }
        );
        this.callParent(arguments);

    }

});
