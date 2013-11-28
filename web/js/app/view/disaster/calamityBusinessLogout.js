/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-28
 * Time: 上午9:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.disaster.calamityBusinessLogout', {
    extend : 'Ext.form.Panel',
    alias : 'widget.disasterhelpcalamitybusinesslogoutform',
    requires: [


    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('initformaftershow',this);
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
                {
                    text: '提交申请',
                    action:'applysubmit'
                }
            ]

        });
        this.callParent(arguments);
    }

});
