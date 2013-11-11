/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-10-23
 * Time: 下午2:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.familymemberFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.dbglfamilymemberfieldset',
    requires: [


    ],

    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                xtype: 'fieldset',
                title: '<a>家庭成员信息</a>',
                cls:'fieldset-border',
                defaultType: 'textfield',
                bodyStyle: 'padding:5px 5px 5px 5px',
                layout: 'fit',

                items:[
                    /* {
                     xtype:'panel',
                     layout: 'fit',
                     items:[*/
                    {
                        xtype:'familymembergrid',
                        itemId:'familymembergrid'

                    }
                    /* ]

                     }*/

                ]
            }
        );
        this.callParent(arguments);

    }

});
