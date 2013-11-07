/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-6
 * Time: 下午2:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.medicalhelp.altersubmitlogFieldset', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.medicalhelpaltersubmitlogfieldset',
    requires: [


    ],

    initComponent: function () {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                xtype: 'fieldset',
                title: '<a>审批记录</a>',
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

                items:[

                    {
                        itemId:'processhistorypanel',
                        xtype:'processhistorygrid',
                        colspan:3
                    },
                    {
                        fieldLabel: '制表时间',
                        name:'time',
                        //itemId: 'personbirthday',
                        //columnWidth:.5,
                        readOnly: true
                        //value:Ext.Date.format(new Date(), 'Y-m-d')

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

                ]
            }
        );
        this.callParent(arguments);

    }

});
