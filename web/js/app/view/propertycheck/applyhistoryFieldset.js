 Ext.define('ZSMZJ.view.propertycheck.applyhistoryFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.propertycheckapplyhistoryfieldset',
    requires: [
    ],

    initComponent: function() {
        Ext.apply(this,
            {
                title: '<a>审批记录</a>',
                defaultType: 'textfield',
                cls:'fieldset-border',
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

                    }
                },

                items:[

                    {
                        itemId:'propertyprocesshistorygrid',
                        xtype:'propertyprocesshistorygrid',
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
                        value:username,
                        readOnly: true


                    }

                ]
            }
        );
        this.callParent(arguments);

    }

});
