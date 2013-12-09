 Ext.define('ZSMZJ.view.propertycheck.itemhistoryFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.propertycheckitemhistoryfieldset',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this,
            {
                title: '<a>核定记录</a>',
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
                        itemId:'propertycheckfamilypropertyitemgrid',
                        xtype:'propertycheckfamilypropertyitemgrid',
                        colspan:3
                    }
                ]
            }
        );
        this.callParent(arguments);

    }

});
